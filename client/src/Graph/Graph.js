import React from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment-timezone';
import 'moment/locale/sl';
import {
  Link
} from "react-router-dom";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import _ from 'lodash';
var dateFormat = require('dateformat');

const countries = require('./countries.json');

const tooltip = {
	background: '#fff',
	padding: '0.5rem 1rem',
	borderRadius: '3px',
	color: 'black',
	fontSize: '0.8rem',
	display: 'flex',
	flexFlow: 'column',
	lineHeight: 1.5
};

const CustomTooltip = ({ active, payload, label }) => {
  let labelFormated = moment(label).format('Do. MMMM')
  if (active && payload) {
    return (
      <div style={tooltip}>
      	<p style={{padding: 0, margin: 0, fontSize: "0.9rem"}}>{`${labelFormated}:`}</p>
        <span className="label" style={{color: 'black'}}><b>{`${payload[1].value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`} primerov</b></span>
        <span className="label" style={{color: 'red'}}><b>{`${payload[0].value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`} smrti</b></span>
        <span className="label" style={{color: 'green'}}><b>{`${payload[2].value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`} okrevanih</b></span>
      </div>
    );
  }

  return null;
};



export default class Graph extends React.Component {
	state = {
		loading: true,
		data: [],
		updated: "",
		cases: {},
		casesDates: {},
		recovered: {},
		recoveredDates: {},
		selectedCountry: "All",
		selectedCountrySlo: "all"

	}


	toObject(names, values) {
		var result = {};
		for (var i = 0; i < names.length; i++)
			result[names[i]] = values[i];
		return result;
	}

	getGraph(country) {
		if (country === "All") {
			console.log("its all")
			let url = "https://corona.lmao.ninja/v2/historical/all?lastdays=all";
			axios.get(url)
			.then(res => {

				// cases
				const casesKeys = Object.keys(res.data.cases);
				const deathsValues = Object.values(res.data.deaths);
				const recoveredValues = Object.values(res.data.recovered);
				var cases = Object.entries(res.data.cases).map(([date, Primerov, Okrevani]) => ({date,Primerov, Okrevani}));

				for (var key in cases) {
				    // skip loop if the property is from prototype
				    if (!cases.hasOwnProperty(key)) continue;

				    var obj = cases[key];
				    Object.assign(obj, {smrti: deathsValues[key]})
				    Object.assign(obj, {Okrevani: recoveredValues[key]})

				}

				let updated = Object.keys(res.data.cases);
				updated = _.last(updated)
		    	
				this.setState({data: res.data});
				this.setState({updated: updated});
				this.setState({cases: cases});
				this.setState({casesDates: casesKeys});
				this.setState({loading: false});
			});

		} else {
			let url = "https://corona.lmao.ninja/v2/historical/" + country + "/?lastdays=all";
			axios.get(url)
			.then(res => {
				const casesKeys = Object.keys(res.data.timeline.cases);
				const deathsValues = Object.values(res.data.timeline.deaths);
				const recoveredValues = Object.values(res.data.timeline.recovered);
				var cases = Object.entries(res.data.timeline.cases).map(([date, Primerov, Okrevani]) => ({date,Primerov, Okrevani}));

				for (var key in cases) {
				    // skip loop if the property is from prototype
				    if (!cases.hasOwnProperty(key)) continue;

				    var obj = cases[key];
				    Object.assign(obj, {smrti: deathsValues[key]})
				    Object.assign(obj, {Okrevani: recoveredValues[key]})

				}

				var allCases = cases

				let updated = Object.keys(res.data.timeline.cases);
				updated = _.last(updated)

		    	
				this.setState({data: res.data});
				this.setState({updated: updated});
				this.setState({cases: allCases});
				this.setState({casesDates: casesKeys});
				this.setState({loading: false});
			});

		}
	}

     change = (event) => {
     	let selected = {"name": event.target.value};

     	if (event.target.value !== "All") {
			let selectedSlo = _.find(countries, _.matches(selected));
			this.setState({
				selectedCountry: event.target.value,
				selectedCountrySlo: selectedSlo.url
			});

     	} else {
			this.setState({
				selectedCountry: "All",
				selectedCountrySlo: "all"
			});

     	}

		this.getGraph(event.target.value)
     }

	formatXAxis(tickItem) {
		return moment(tickItem).format('Do. MMM')
	}

	componentWillMount() {
		_.sortBy(countries, ['ime'])
		this.getGraph("All")
	}

	render() {
		return (
		<>
				<header className="section__header">
					<div class="header__select">
						<h2>Graf primerov v</h2>
						<div className="select_country">
							<select className="select_country--select" onChange={this.change} value={this.state.selectedCountry}>
								<optgroup>
									<option value="All" key="all">Cel svet</option>
									<option value="Slovenia" key="slovenia">Slovenija</option>
								</optgroup>
								<optgroup label="_______________________________" style={{textAlign: 'center'}}>
									{Object.keys(countries).map(function(i) {
										var country = countries[i];
											return (<option key={country.name} value={country.name}>{country.prevod}</option>)
										} 
									)}
								</optgroup>
							</select>
							<div className="select_country--icon">
								<i className="fa fa-chevron-down"></i>
							</div>
						</div>
					</div>
				</header>
				<div style={{width: '100%', height: 320, zIndex: 2, position: 'relative'}}>
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
						    <linearGradient id="colorOkrevanih" x1="0" y1="0" x2="0" y2="1">
						      <stop offset="0%" stopColor="rgba(83, 185, 41, 0.3)" stopOpacity={1}/>
						      <stop offset="100%" stopColor="rgba(83, 185, 41, 1)" stopOpacity={0}/>
						    </linearGradient>
						  </defs>
							<CartesianGrid stroke='rgba(255, 255, 255, 0.2)'/>
							<XAxis dataKey="date" stroke='rgba(255, 255, 255, 0.6)' tick={{fontSize: 10}}  tickFormatter={this.formatXAxis} />
							<YAxis stroke='rgba(255, 255, 255, 0.2)' tick={{fontSize: 10}}  />
	        				<Tooltip content={<CustomTooltip />} />
							<Area type="monotone" isAnimationActive={true} animationDuration={900} dataKey="smrti" stroke="rgba(239, 57, 57, 0.8)" fill="rgba(239, 57, 57, 0.8)" fillOpacity={1} fill="url(#colorSmrti)" />
							<Area type="monotone" isAnimationActive={true} animationDuration={900} dataKey="Primerov" stroke="rgba(255, 255, 255, 1)" fill="rgba(255, 255, 255, 0.7)" fillOpacity={1} fill="url(#colorPrimerov)" />
							<Area type="monotone" isAnimationActive={true} animationDuration={900} dataKey="Okrevani" stroke="rgba(83, 185, 41, 1)" fill="rgba(83, 185, 41, 0.7)" fillOpacity={1} fill="url(#colorOkrevanih)" />
						</AreaChart>
					</ResponsiveContainer>
					<div className="whiteModeBg"></div>
					<div className="below-graph">
						<p className="below-graph__updated">{this.state.updated ? ('Posodobljeno: ' + moment(new Date(this.state.updated)).add(1, 'd').format("D. MMMM YYYY, ob H:mm")) : ''}</p>
						{this.state.selectedCountrySlo === "all" ? '' : <Link className="more-button" to={{
													pathname: '/drzava/' + this.state.selectedCountrySlo,
												}}>
													Več podatkov za <span>{this.state.selectedCountrySlo}</span><i className="fa fa-chevron-right"></i>
												</Link>
						}
					</div>
				</div>
			</>
		);
	}
}