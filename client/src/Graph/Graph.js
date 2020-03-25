import React from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import 'moment/locale/sl';
import 'moment-timezone';

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';


export default class Graph extends React.Component {
	state = {
		loading: true,
		data: {},
		currentSort: 'default'
	}


	componentDidMount() {
		axios.get("https://corona.lmao.ninja/historical/slovenia")
		.then(res => {
			const data = res.data;
			this.setState({data});
			this.setState({loading: false});
		});
	}

	render() {
		return (
			<div className="graf">
		      <LineChart
		        width={500}
		        height={300}
		        data={this.state.data}
		        margin={{
		          top: 5, right: 30, left: 20, bottom: 5,
		        }}
		      >
		        <CartesianGrid strokeDasharray="3 3" />
		        <XAxis dataKey="standardizedCountryName" />
		        <YAxis />
		        <Tooltip />
		        <Legend />
		        <Line type="monotone" dataKey="timeline.deaths" stroke="#82ca9d" />
		      </LineChart>
			</div>
		);
	}
}