import React from 'react';

import './assets/style/main.scss';

import List from './List/List.js';
import Graph from './Graph/Graph.js';


function App() {
	const [darkMode, setDarkMode] = React.useState(getInitialMode());


	React.useEffect(() => {
		localStorage.setItem('dark', JSON.stringify(darkMode));
	}, [darkMode]);

	function getInitialMode() {
		const isReturningUser = "dark" in localStorage;
		const savedMode = JSON.parse(localStorage.getItem('dark'));
		const userPrefersDark = getPrefColorScheme();
		// if mode was saved -> dark / light
		if (isReturningUser) {
			return savedMode;
		} else if (userPrefersDark) {
			return true;
		} else {
			return false;
		}
		// if preferred color scheme dark -> dark
		// otherwise -> light

		return savedMode || false;
	}

	function getPrefColorScheme() {
		if (!window.matchMedia) return;

		return window.matchMedia("(prefers-color-scheme: dark)").matches;
	}

	return (
		<div className={darkMode ? "App dark" : "App light"}>
			<header>
				<div className="logo">
					<h1>Koronavirus</h1>
					<h2>Podrobni podatki o posledicah virusa</h2>
				</div>
				<div className="mode">
					<div className="mode__button" onClick={() => setDarkMode(prevMode => !prevMode)}>
						<i className={darkMode ? "fa fa-sun" : "fa fa-moon"}></i>
					</div>
				</div>
			</header>

			<section>
				<h3>Podatki</h3>
				<List />
			</section>

		</div>
	);
}

export default App;
