import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import moment from 'moment';
import 'moment-timezone';
import 'moment/locale/sl';

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
        <span className="label" style={{color: 'black'}}><b>{`${payload[0].value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`} primerov</b></span>
        <span className="label" style={{color: 'red'}}><b>{`${payload[1].value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`} smrti</b></span>
        <span className="label" style={{color: 'green'}}><b>{`${payload[2].value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`} okrevanih</b></span>
      </div>
    );
  }

  return null;
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

	formatXAxis(tickItem) {
		return moment(tickItem).format('Do. MMM')
	}


	render() {
		return (
			<>
				<div className="Subpage-country__graph--element" style={{width: '100%', height: 210, position: 'relative'}}>
					<ResponsiveContainer>
				    	<AreaChart width={600} height={400} data={this.state.data}
				            margin={{top: 10, right: 30, left: 0, bottom: 0}}>
				        <CartesianGrid strokeDasharray="3 3"/>
				        <XAxis dataKey="name"/>
				        <YAxis/>
				        <Tooltip/>
				        <Area type='monotone' dataKey='uv' stackId="1" stroke='#8884d8' fill='#8884d8' />
				        <Area type='monotone' dataKey='pv' stackId="1" stroke='#82ca9d' fill='#82ca9d' />
				        <Area type='monotone' dataKey='amt' stackId="1" stroke='#ffc658' fill='#ffc658' />
				      </AreaChart>
					</ResponsiveContainer>
					<div className="whiteModeBg"></div>
				</div>
			</>
		);
	}
}