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
  if (active && payload) {
    return (
      <div style={tooltip}>
        <span className="label">{`${labelFormated}:`} <b>{`${payload[0].value}`} potrjenih primerov</b></span>
        <span className="label">{`${labelFormated}:`} <b>{`${payload[1].value}`} smrti</b></span>
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
	constructor(props){
		super(props)
		this.state = {
			loading: true,
			data: [],
		};
	}

	toObject(names, values) {
		var result = {};
		for (var i = 0; i < names.length; i++)
			result[names[i]] = values[i];
		return result;
	}

	componentWillMount() {
		this.setState({data: this.props.data})
		setTimeout(() => {
			this.setState({data: this.props.data})
		}, 1000)
	}

	render() {
		return (
		<>
				<div className="Subpage-country__graph--element" style={{width: '100%', height: 210, position: 'relative'}}>
					<ResponsiveContainer>
						<AreaChart
							height={100}
							data={this.state.data}
							margin={{
							top: 0, right: 1, left: -35, bottom: 0,
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
							<Area type="monotone" isAnimationActive={true} animationDuration={900}  dataKey="Primerov" stroke="rgba(255, 255, 255, 1)" fill="rgba(255, 255, 255, 0.7)" fillOpacity={1} fill="url(#colorPrimerov)" />
							<Area type="monotone" isAnimationActive={true} animationDuration={900}  dataKey="smrti" stroke="rgba(239, 57, 57, 0.8)" fill="rgba(239, 57, 57, 0.8)" fillOpacity={1} fill="url(#colorSmrti)" />
						</AreaChart>
					</ResponsiveContainer>
					<div className="whiteModeBg"></div>
				</div>
			</>
		);
	}
}