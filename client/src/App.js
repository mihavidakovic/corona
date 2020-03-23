import React from 'react';

import './assets/style/main.scss';

import List from './List/List.js';


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
					<div className="mode__button" onClick={() => setDarkMode(prevMode => !prevMode)}>
						<i className={darkMode ? "fa fa-sun" : "fa fa-moon"}></i>
						<span>{darkMode ? "Svetli" : "Temni"} način</span>
					</div>
				</div>
			</header>

			<section>
				<header className="section__header">
					<h3>Podatki</h3>
					<p className="data__update">Posodobljeno 23.3.2020 00:27</p>
				</header>
				<List />
			</section>

		</div>
	);
}

export default App;
