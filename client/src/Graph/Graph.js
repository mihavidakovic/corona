import React from 'react';
import axios from 'axios';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
var dateFormat = require('dateformat');
const tooltip = {
	background: '#fff',
	padding: '0.5rem 1rem',
	borderRadius: '3px',
	color: 'black',
	fontSize: '0.9rem',
	display: 'flex',
	flexFlow: 'column'
};


const CustomTooltip = ({ active, payload, label }) => {
  	let labelFormated = dateFormat(label, "dd.mm.yyyy")
  if (active) {
    return (
      <div style={tooltip}>
        <span className="label">{`${labelFormated}:`} <b>{`${payload[1].value}`} potrjenih primerov</b></span>
        <span className="label">{`${labelFormated}:`} <b>{`${payload[0].value}`} smrti</b></span>
      </div>
    );
  }

  return null;
};

const getPercent = (value, total) => {
	const ratio = total > 0 ? value / total : 0;
  
  return toPercent(ratio, 2);
};

const toPercent = (decimal, fixed = 0) => {
	return `${(decimal * 100).toFixed(fixed)}%`;
};

const countries = require('./countries.json');


export default class Graph extends React.Component {
	state = {
		loading: true,
		data: [],
		cases: {},
		casesDates: {},
		selectedCountry: "slovenia"

	}


	toObject(names, values) {
		var result = {};
		for (var i = 0; i < names.length; i++)
			result[names[i]] = values[i];
		return result;
	}

	getGraph(country) {
		let url = "https://corona.lmao.ninja/v2/historical/" + country;
		axios.get(url)
		.then(res => {
			const getData = res.data;
			const casesKeys = Object.keys(res.data.timeline.cases);
			const deathsValues = Object.values(res.data.timeline.deaths);
			var cases = Object.entries(res.data.timeline.cases).map(([date, Primerov]) => ({date,Primerov}));

			for (var key in cases) {
			    // skip loop if the property is from prototype
			    if (!cases.hasOwnProperty(key)) continue;

			    var obj = cases[key];
			    Object.assign(obj, {smrti: deathsValues[key]})

			}

			var allCases = cases.slice(40)

			console.log(allCases)
	    	
			this.setState({data: res.data});
			this.setState({cases: allCases});
			this.setState({casesDates: casesKeys});
			this.setState({loading: false});
		});
	}

     change = (event) => {
		this.setState({selectedCountry: event.target.value});
		this.getGraph(event.target.value)
     }


	componentWillMount() {
		this.getGraph("slovenia")
	}

	render() {
		return (
		<>
				<header className="section__header">
					<div class="header__select">
						<h2>Graf primerov v</h2>
						<div className="select_country">
							<select className="select_country--select" onChange={this.change} value={this.state.selectedCountry}>
								<option value="slovenia">Slovenia</option>
							{Object.keys(countries).map(function(i) {
								var country = countries[i];
									return (<option value={country.name}>{country.name}</option>)
								} 
								)}
							</select>
							<div className="select_country--icon">
								<i className="fa fa-chevron-down"></i>
							</div>
						</div>
					</div>
				</header>
				<div style={{width: '100%', height: 210}}>
					<ResponsiveContainer>
						<AreaChart
							height={100}
							data={this.state.cases}
							margin={{
							top: 0, right: 25, left: -15, bottom: 0,
							}}
						>
						  <defs>
						    <linearGradient id="colorSmrti" x1="0" y1="0" x2="0" y2="1">
						      <stop offset="0%" stopColor="red" stopOpacity={0.3}/>
						      <stop offset="100%" stopColor="red" stopOpacity={0}/>
						    </linearGradient>
						    <linearGradient id="colorPrimerov" x1="0" y1="0" x2="0" y2="1">
						      <stop offset="0%" stopColor="rgba(255, 255, 255, 0.3)" stopOpacity={1}/>
						      <stop offset="100%" stopColor="rgba(255, 255, 255, 1)" stopOpacity={0}/>
						    </linearGradient>
						  </defs>
							<CartesianGrid stroke='rgba(255, 255, 255, 0.2)'/>
							<XAxis dataKey="date" stroke='rgba(255, 255, 255, 0)' tickFormatter={toPercent} tick={{fontSize: 0}}  />
							<YAxis stroke='rgba(255, 255, 255, 0.2)' tick={{fontSize: 10}}  />
	        				<Tooltip content={<CustomTooltip />} />
							<Area type="monotone" isAnimationActive={true} animationDuration={900}  dataKey="smrti" stroke="rgba(239, 57, 57, 0.8)" fill="rgba(239, 57, 57, 0.8)" fillOpacity={1} fill="url(#colorSmrti)" />
							<Area type="monotone" isAnimationActive={true} animationDuration={900}  dataKey="Primerov" stroke="rgba(255, 255, 255, 1)" fill="rgba(255, 255, 255, 0.7)" fillOpacity={1} fill="url(#colorPrimerov)" />
						</AreaChart>
					</ResponsiveContainer>
				</div>
			</>
		);
	}
}