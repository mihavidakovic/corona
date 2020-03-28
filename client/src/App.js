import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';

import './assets/style/main.scss';

import Header from './Components/Header.js';

import List from './List/List.js';
import All from './Components/All.js';
import Graph from './Graph/Graph.js';


class App extends React.Component {
	constructor() {
		super();

		this.state = {
			darkMode: true,
		};
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
				<Header />

				<section>
					<div className="two">
						<div className="graf">
							<Graph />
						</div>
						<div className="all">
							<All />
						</div>
					</div>
					<div className="podatki">
						<List />
					</div>
				</section>

			</div>
		);

	}

}

export default App;
