import React, {setState, useState, useEffect} from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import moment from 'moment';
import 'moment-timezone';
import 'moment/locale/sl';
import _ from "lodash";

export default function Graph(props) {

	const [DataRequest, setDataRequest] = useState({data: []});
	const [SortedData, setSortedData] = useState({sortedData: []});
	const [IsLoading, setIsLoading] = useState(true);

	async function getGraphData(name, rangeNum) {
		await fetch("https://corona.lmao.ninja/v2/historical/" + name + "/?lastdays=" + rangeNum)
			.then( response => {
				if (!response.ok) { throw response }
				return response.json()  //we only get here if there is no error
			})
			.then(json => {
				let data = json.timeline;

				const deathsValues = Object.values(data.deaths);
				const casesValues = Object.values(data.cases);
				const recoveredValues = Object.values(data.recovered);
				const cases = Object.entries(data.cases).map(([date, Primerov, Okrevanih]) => ({date,Primerov, Okrevanih}));
				
				for (var key in cases) {
				    // skip loop if the property is from prototype
				    if (!cases.hasOwnProperty(key)) continue;
				    var obj = cases[key];
				    Object.assign(obj, {Smrti: deathsValues[key]})
				    Object.assign(obj, {Okrevanih: recoveredValues[key]})

				}

				setDataRequest({data: cases})
				setSortedData({sortedData: cases})
				setIsLoading(false)
			})
			.catch( err => {
				console.log(err)
			});
	}


	useEffect(() => {
		getGraphData(props.name, "all");
	}, [props])

	let datas = DataRequest.data;
	let sortedData = SortedData.sortedData;
	let isLoading = IsLoading;
	let isDarkMode = props.isDarkMode;
	console.log(isDarkMode)

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
	  let labelFormated = moment(label).locale("sl").format('Do. MMMM')
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

	function formatXAxis(tickItem) {
		return moment(tickItem).locale("sl").format('Do. MMM')
	}

	function onChangeDays(event) {

		let num = event.target.value;
		if (num === "all") {
			let newData = datas;

			setSortedData({
				sortedData: newData
			})
		} else {
			let newData = datas.slice(-num);

			setSortedData({
				sortedData: newData
			})
		}
	}

	if (isLoading) {
		return (
				<div className="Subpage-country__graph">
					<div className="Graph__head">
						<h2 className="Graph__head--title">Graf statistike primerov in smrti</h2>
					</div>
					<div className="Subpage-country__graph--element" style={{width: '100%', height: 210, position: 'relative'}}>
					</div>
				</div>
		);
	} else {
		return (
			<>
				<div className="Subpage-country__graph">
					<div className="Graph__head">
						<h2 className="Graph__head--title">Graf statistike primerov in smrti</h2>
						<div className="Graph__select">
							<p>Zadnjih:</p>
							<div className="select_range">
								<select className="select_range--select" onChange={onChangeDays}>
									<option value="all" selected>Vse dni</option>
									<option value="3">3 dni</option>
									<option value="5">5 dni</option>
									<option value="10">10 dni</option>
									<option value="15">15 dni</option>
									<option value="20">20 dni</option>
									<option value="25">25 dni</option>
									<option value="30">30 dni</option>
									<option value="35">35 dni</option>
									<option value="40">40 dni</option>
									<option value="45">45 dni</option>
									<option value="60">60 dni</option>
									<option value="80">80 dni</option>
									<option value="100">100 dni</option>
								</select>
								<div className="select_range--icon">
									<i className="fa fa-chevron-down"></i>
								</div>
							</div>
						</div>
					</div>
					<div className="Subpage-country__graph--element" style={{width: '100%', height: 300, position: 'relative'}}>
						<ResponsiveContainer>
							<AreaChart
								height={100}
								data={sortedData}
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
							      <stop offset="0%" stopColor={isDarkMode ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)"} stopOpacity={1}/>
							      <stop offset="100%" stopColor={isDarkMode ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 1)"} stopOpacity={0}/>
							    </linearGradient>
							    <linearGradient id="colorOkrevanih" x1="0" y1="0" x2="0" y2="1">
							      <stop offset="0%" stopColor="rgba(83, 185, 41, 0.3)" stopOpacity={1}/>
							      <stop offset="100%" stopColor="rgba(83, 185, 41, 1)" stopOpacity={0}/>
							    </linearGradient>
							  </defs>
								<CartesianGrid stroke={isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'} />
								<XAxis dataKey="date" stroke={isDarkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.4)'} tick={{fontSize: 10}}  tickFormatter={formatXAxis} />
								<YAxis stroke={isDarkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.4)'} tick={{fontSize: 10}}  />
		        				<Tooltip content={<CustomTooltip />} />
								<Area type="monotone" isAnimationActive={true} animationDuration={900}  dataKey="Primerov" stroke={isDarkMode ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 0.7)"} fill="rgba(255, 255, 255, 0.7)" fillOpacity={1} fill="url(#colorPrimerov)" />
								<Area type="monotone" isAnimationActive={true} animationDuration={900}  dataKey="Smrti" stroke="rgba(239, 57, 57, 0.8)" fill="rgba(239, 57, 57, 0.8)" fillOpacity={1} fill="url(#colorSmrti)" />
								<Area type="monotone" isAnimationActive={true} animationDuration={900} dataKey="Okrevanih" stroke="rgba(83, 185, 41, 1)" fill="rgba(83, 185, 41, 0.7)" fillOpacity={1} fill="url(#colorOkrevanih)" />
							</AreaChart>
						</ResponsiveContainer>
					</div>
				</div>
			</>
		);

	}
}