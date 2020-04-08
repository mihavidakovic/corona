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
        <span className="label" style={{color: 'black'}}><b>{`${payload[1].value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`} primerov</b></span>
        <span className="label" style={{color: 'red'}}><b>{`${payload[0].value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`} smrti</b></span>
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
						    <linearGradient id="colorOkrevanih" x1="0" y1="0" x2="0" y2="1">
						      <stop offset="0%" stopColor="rgba(83, 185, 41, 0.3)" stopOpacity={1}/>
						      <stop offset="100%" stopColor="rgba(83, 185, 41, 1)" stopOpacity={0}/>
						    </linearGradient>
						  </defs>
							<CartesianGrid stroke='rgba(255, 255, 255, 0.2)'/>
							<XAxis dataKey="date" stroke='rgba(255, 255, 255, 0.6)' tick={{fontSize: 10}}  tickFormatter={this.formatXAxis} />
							<YAxis stroke='rgba(255, 255, 255, 0.3)' tick={{fontSize: 10}}  />
	        				<Tooltip content={<CustomTooltip />} />
							<Area type="monotone" isAnimationActive={true} animationDuration={900}  dataKey="Primerov" stroke="rgba(255, 255, 255, 1)" fill="rgba(255, 255, 255, 0.7)" fillOpacity={1} fill="url(#colorPrimerov)" />
							<Area type="monotone" isAnimationActive={true} animationDuration={900}  dataKey="smrti" stroke="rgba(239, 57, 57, 0.8)" fill="rgba(239, 57, 57, 0.8)" fillOpacity={1} fill="url(#colorSmrti)" />
							<Area type="monotone" isAnimationActive={true} animationDuration={900} dataKey="Okrevanih" stroke="rgba(83, 185, 41, 1)" fill="rgba(83, 185, 41, 0.7)" fillOpacity={1} fill="url(#colorOkrevanih)" />
						</AreaChart>
					</ResponsiveContainer>
					<div className="whiteModeBg"></div>
				</div>
			</>
		);
	}
}