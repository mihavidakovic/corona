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
	fontSize: '0.9rem'
};


const CustomTooltip = ({ active, payload, label }) => {
  	let labelFormated = dateFormat(label, "dd.mm.yyyy")
  if (active) {
    return (
      <div style={tooltip}>
        <span className="label">{`${labelFormated}:`} <b>{`${payload[0].value}`} smrti</b></span>
      </div>
    );
  }

  return null;
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
		axios.get("https://corona.lmao.ninja/v2/historical/slovenia")
		.then(res => {
			const getData = res.data;
			const casesKeys = Object.keys(res.data.timeline.cases);
			const casesValues = Object.values(res.data.timeline.cases);
			var cases = Object.entries(res.data.timeline.cases).map(([date, Smrti]) => ({date,Smrti}));


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
					<h3>Graf smrtnih primerov v Sloveniji</h3>
				</header>
				<div style={{width: '100%', height: 300}}>
					<ResponsiveContainer>
						<AreaChart
							height={100}
							data={this.state.cases}
							margin={{
							top: 0, right: 25, left: -15, bottom: 0,
							}}
						>
							<CartesianGrid stroke='rgba(255, 255, 255, 0.2)'/>
							<XAxis dataKey="date" stroke='rgba(255, 255, 255, 0)' />
							<YAxis stroke='rgba(255, 255, 255, 0.2)' />
	        				<Tooltip content={<CustomTooltip />} />
							<Area type="monotone" dataKey="Smrti" stroke="rgba(255, 255, 255, 1)" fill="rgba(255, 255, 255, 0.7)" />
						</AreaChart>
					</ResponsiveContainer>
				</div>
			</>
		);
	}
}