import React from 'react';
import axios from 'axios';
import moment from 'react-moment';
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

export default class Graph extends React.Component {
	state = {
		loading: true,
		data: [],
		cases: {},
		casesDates: {}

	}

	toObject(names, values) {
		var result = {};
		for (var i = 0; i < names.length; i++)
			result[names[i]] = values[i];
		return result;
	}



	componentWillMount() {
		axios.get('https://corona.lmao.ninja/v2/historical/slovenia')
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

		    for (var b = 0; b < cases[0].length; b++) {


		    }
			    console.log(cases)
	    	
			this.setState({data: res.data});
			this.setState({cases: cases});
			this.setState({casesDates: casesKeys});
			this.setState({loading: false});
		});
	}

	render() {
		return (
		<>
				<header className="section__header">
					<h2>Graf potrjenih primerov v Sloveniji</h2>
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
						      <stop offset="5%" stopColor="red" stopOpacity={0.3}/>
						      <stop offset="95%" stopColor="red" stopOpacity={0}/>
						    </linearGradient>
						    <linearGradient id="colorPrimerov" x1="0" y1="0" x2="0" y2="1">
						      <stop offset="5%" stopColor="rgba(255, 255, 255, 0.3)" stopOpacity={1}/>
						      <stop offset="95%" stopColor="rgba(255, 255, 255, 1)" stopOpacity={0}/>
						    </linearGradient>
						  </defs>
							<CartesianGrid stroke='rgba(255, 255, 255, 0.2)'/>
							<XAxis dataKey="date" stroke='rgba(255, 255, 255, 0)' tickFormatter={toPercent} />
							<YAxis stroke='rgba(255, 255, 255, 0.2)' />
	        				<Tooltip content={<CustomTooltip />} />
							<Area type="monotoneX" isAnimationActive={false}  dataKey="smrti" stroke="rgba(239, 57, 57, 0.8)" fill="rgba(239, 57, 57, 0.8)" fillOpacity={1} fill="url(#colorSmrti)" />
							<Area type="monotoneX" isAnimationActive={false}  dataKey="Primerov" stroke="rgba(255, 255, 255, 1)" fill="rgba(255, 255, 255, 0.7)" fillOpacity={1} fill="url(#colorPrimerov)" />
						</AreaChart>
					</ResponsiveContainer>
				</div>
			</>
		);
	}
}