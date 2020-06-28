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

// Style
import './assets/style/main.scss';

// Google Analytics
import { initGA, PageView, Event } from './Components/Tracking';

// Pages
import AdminPage from './Pages/Admin/AdminPage.js';

import Domov from './Pages/Domov.js';
import Drzava from './Pages/Drzava.js';

export default function App() {

	const [darkMode, setDarkMode] = useState(getInitialMode());
	const [IsNotificationVisible, setIsNotificationVisible] = useState(false);
	let location = useLocation();

	useEffect(() => {
		localStorage.setItem('dark', JSON.stringify(darkMode));

	    initGA('UA-133841417-2');
	    PageView();

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
				<div className={IsNotificationVisible ? "newBar visible" : "newBar"}>
					<svg className="newBar__notification" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bell" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z"></path></svg>
					<span><b><a href="">Covid19.si</a></b> ima novo podobo! Preizkusi jo zdaj</span>
					<svg className="newBar__icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path></svg>
				</div>
				<header className="main__header">
					<div className="logo">
						<Link to="/"><h1>Covid19.si</h1></Link>
						<h2>Podrobni podatki o posledicah virusa</h2>
					</div>
	
					<div className="share_div">
						<FacebookShareButton className="share_div__fb" url={location.pathname === "/" ? "https://covid19.si/" : ("https://covid19.si" + location.pathname)}>
							<img src={process.env.REACT_APP_BASE_URL + "/img/fb.png"} alt="share" />
							<span>Deli z drugimi</span>
							<span className="share_div__fb--count">541<FacebookShareCount className="" url={"https://covid19.si/"} /></span>
						</FacebookShareButton>

						<TwitterShareButton className="share_div__tw" url={location.pathname === '/' ? 'https://covid19.si/' : ('https://covid19.si' + location.pathname)}>
							<i className="fa fa-twitter"></i>
							<span>Tweet</span>
						</TwitterShareButton>
					</div>
					
					<div className="mode">
						<div className={darkMode ? "mode__button isDarkMode" : "mode__button"} onClick={() => 
							{
								setDarkMode(prevMode => !prevMode);
								Event("MODE", "Changed color mode " + getInitialMode(), "MODE_CHANGED");
							}
						}>
							<i className={darkMode ? "fa fa-sun" : "fa fa-moon"}></i>
							<span>{darkMode ? "Svetli" : "Temni"} način</span>
						</div>
					</div>
				</header>
				<Switch>
					<Route exact path="/" render={() => <Domov isDarkMode={darkMode} />} />
					<Route path="/drzava/:name" render={() => <Drzava isDarkMode={darkMode} />} />
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
