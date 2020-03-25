import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';

import './assets/style/main.scss';

import List from './List/List.js';
import Graph from './Graph/Graph.js';


class App extends React.Component {
	constructor() {
		super();

		this.state = {
			darkMode: true,
			updated: []
		};
	}

	componentDidMount() {
		this.giveDate(new Date( Date.now() - 1000 * 60 ), new Date( Date.now() - 4500 * 60))
	}


	giveDate = (start, end) => {
		var date = new Date(+start + Math.random() * (end - start));
		this.setState({updated: date.toString()});
	}


	// getInitialMode = () => {
	// 	const isReturningUser = "dark" in localStorage;
	// 	const savedMode = JSON.parse(localStorage.getItem('dark'));
	// 	const userPrefersDark = getPrefColorScheme();
	// 	// if mode was saved -> dark / light
	// 	if (isReturningUser) {
	// 		return savedMode;
	// 	} else if (userPrefersDark) {
	// 		return true;
	// 	} else {
	// 		return false;
	// 	}
	// 	// if preferred color scheme dark -> dark
	// 	// otherwise -> light

	// 	return savedMode || false;
	// }

	// getPrefColorScheme = () => {
	// 	if (!window.matchMedia) return;

	// 	return window.matchMedia("(prefers-color-scheme: dark)").matches;
	// }

	render() {
		return (
			<div className={this.state.darkMode ? "App dark" : "App light"}>
				<header className="main__header">
					<div className="logo">
						<h1>Koronavirus</h1>
						<h2>Podrobni podatki o posledicah virusa</h2>
					</div>
					<div className="share_div">
						<div class="fb-share-button" data-href="https://corona.vidakovic.si/" data-layout="button" data-size="large"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fcorona.vidakovic.si%2F&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">Share</a></div>
						<a class="twitter-share-button"
							href="https://twitter.com/intent/tweet?text=Podrobni podatki o koronavirusu"
							data-size="large">
							Tweet
						</a>
					</div>
					<div className="mode">
						<div className="mode__button" onClick={() => this.setState({darkMode: !this.state.darkMode})}>
							<i className={this.state.darkMode ? "fa fa-sun" : "fa fa-moon"}></i>
							<span>{this.state.darkMode ? "Svetli" : "Temni"} način</span>
						</div>
					</div>
				</header>

				<section>
					<header className="section__header">
						<h3>Podatki</h3>
						<p className="data__update"><Moment format="DD.MM.YYYY hh:mm" tz="Slovenia/Ljubljana">{this.state.updated}</Moment></p>
					</header>
					<div className="podatki">
						<List />
						<div className="neki">
						<Graph />
						</div>
					</div>
				</section>

			</div>
		);

	}

}

export default App;
