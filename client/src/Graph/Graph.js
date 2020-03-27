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

	}


	componentWillMount() {
		axios.get("https://corona.lmao.ninja/v2/historical/slovenia")
		.then(res => {
			const getData = res.data;
			this.setState({data: getData});
			this.setState({loading: false});
		});
	}

	render() {
		return (
			<div>
			</div>
		);
	}
}