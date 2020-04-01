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
	}

	render() {
		return (
		<>
				<div className="Subpage-country__graph--element" style={{width: '100%', height: 210}}>
					lol
				</div>
			</>
		);
	}
}