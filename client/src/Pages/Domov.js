import React from 'react';
import axios from 'axios';

//Compontents
import List from '../List/List.js';
import All from '../Components/All.js';
import Graph from '../Graph/Graph.js';



export default class Domov extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			all: [],
			countries: []
		}
	}

	componentDidMount() {
		document.title = "Covid19.si - Zadnji podatki o posledicah virusa!";

		let all = "https://corona.lmao.ninja/v2/all";
		let countries = "https://corona.lmao.ninja/v2/countries?yesterday=false&sort=deaths";

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
			.then(() => {
			});
	}

	render() {
		return (
			<section>
				<div className="two">
					<div className="graf">
						<Graph isDarkMode={this.props.isDarkMode} />
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