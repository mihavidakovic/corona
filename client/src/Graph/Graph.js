import React from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import 'moment/locale/sl';
import 'moment-timezone';

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';


export default class Graph extends React.Component {
	state = {
		loading: true,
		data: [],
		currentSort: 'default'
	}


	componentDidMount() {
		axios.get(process.env.REACT_APP_BASE_URL + '/api/data/graph')
		.then(res => {
			const data = res.data.data;
			this.setState({data});
			this.setState({loading: false});
		});
	}

	render() {
		return (
			<div>
		      <AreaChart
		        width={800}
		        height={400}
		        data={this.state.data}
		        margin={{
		          top: 10, right: 30, left: 0, bottom: 0,
		        }}
		      >
		        <CartesianGrid strokeDasharray="3 3" />
		        <XAxis dataKey="name" />
		        <YAxis />
		        <Tooltip />
		        <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
		      </AreaChart>
			</div>
		);
	}
}