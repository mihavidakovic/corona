import React from 'react';
import axios from 'axios';

//Compontents
import List from '../List/List.js';
import All from '../Components/All.js';
import Graph from '../Graph/Graph.js';



export default class Domov extends React.Component{
	constructor(props) {
		super(props);
		this.handler = this.handler.bind(this)
		this.state = {
			all: [],
			countries: []
		}
	}



	componentDidMount() {
		document.title = "Covid19.si - Zadnji podatki o posledicah virusa!";

		let all = "https://corona.lmao.ninja/v2/all";
		let countries = "https://corona.lmao.ninja/v2/countries?yesterday=false&sort=cases";

		const requestAll = axios.get(all);
		const requestCountries = axios.get(countries);

		axios.all([requestAll, requestCountries], {crossDomain: true})
			.then(axios.spread((...responses) => {
				let all = responses[0];
				let countries = responses[1];
				
				this.setState({
					all: all.data,
					countries: countries.data
				})
			}))
			.catch(err => {
				console.log(err)
			})
	}

	handler(name, ime) {

		let url = "https://disease.sh/v2/countries/" + name;
		fetch(url)
			.then(res => res.json())
			.then(response => {
				this.setState({
					all: {
						name: ime,
						cases: response.cases,
						todayCases: response.todayCases,
						deaths: response.deaths,
						todayDeaths: response.todayDeaths,
						recovered: response.recovered,
						critical: response.critical,
						active: response.active,
						tests: response.tests,
						updated: response.updated
					}
				})
			})
	}

	render() {
		return (
			<section>
				<div className="two">
					<div className="graf">
						<Graph isDarkMode={this.props.isDarkMode} handler={this.handler} />
					</div>
					<div className="all">
						<All data={this.state.all} />
					</div>
				</div>
				<div className="podatki">
					<List data={this.state.countries} />
				</div>
			</section>

	);

	}
}