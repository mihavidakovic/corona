import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  Redirect,
  useLocation
} from "react-router-dom";
import axios from 'axios';
import {
  FacebookShareButton,
  FacebookShareCount,
  TwitterShareButton,
} from "react-share";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons'


// Style
import './assets/style/main.scss';

// Pages
import AdminPage from './Pages/Admin/AdminPage.js';

import Domov from './Pages/Domov.js';
import Drzava from './Pages/Drzava.js';

// Components
import Donate from './Components/Donate.js';

export default function App() {

	const [darkMode, setDarkMode] = useState(getInitialMode());
	let location = useLocation();

	useEffect(() => {
		localStorage.setItem('dark', JSON.stringify(darkMode));

	}, [darkMode]);

	function getInitialMode() {
		const isReturningUser = 'dark' in localStorage;
		const savedMode = JSON.parse(localStorage.getItem('dark'));
		const userPrefersDark = getPrefColorScheme();

		if (isReturningUser) {
			return savedMode
		} else if (userPrefersDark) {
			return true;
		} else {
			return false;
		}
	}

	function getPrefColorScheme() {
		if (!window.matchMedia) return;

		return window.matchMedia('(prefers-color-scheme: dark)');
	}

	if (process.env.NODE_ENV !== "development") {
		axios.get("https://corona.vidakovic.si/api/ip", {crossDomain: true})
			.then(res => {
				console.log("logged");
		})
	}


	return (
		<BrowserRouter>
			<div className={darkMode ? "App dark" : "App light"}>
				<header className="main__header">
					<div className="logo">
						<Link to="/"><h1>Covid19.si</h1></Link>
						<h2>Podrobni podatki o posledicah virusa</h2>
					</div>
	
					<div className="share_div">
						<FacebookShareButton className="share_div__fb" url={location.pathname === "/" ? "https://covid19.si/" : ("https://covid19.si" + location.pathname)}>
							<img src={process.env.REACT_APP_BASE_URL + "/img/fb.png"} alt="share" />
							<span>Deli z drugimi</span>
							<FacebookShareCount className="share_div__fb--count" url={"https://covid19.si/"} />
						</FacebookShareButton>

						<TwitterShareButton className="share_div__tw" url={location.pathname === '/' ? 'https://covid19.si/' : ('https://covid19.si' + location.pathname)}>
						<FontAwesomeIcon icon="sun" />
							<span>Tweet</span>
						</TwitterShareButton>
					</div>
					
					<div className="mode">
						<div className="mode__button" onClick={() => setDarkMode(prevMode => !prevMode)}>
							<i className={darkMode ? "fa fa-sun" : "fa fa-moon"}></i>
							<span>{darkMode ? "Svetli" : "Temni"} način</span>
						</div>
					</div>
				</header>
				<Switch>
					<Route exact path="/" render={() => <Domov />} />
					<Route path="/drzava/:name" render={() => <Drzava />} />
					<Route path="/admin" render={() => <AdminPage />} />
					<Route path="/404" component={notFound} />
					<Redirect to="/404" />
				</Switch>

			</div>
		</BrowserRouter>
	);
}


function notFound() {
	return (
		<div className="notFound">
			<h1>Ta stran ni bila najdena :(</h1>
		</div>
	);
}
