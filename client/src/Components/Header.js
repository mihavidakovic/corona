import React from 'react';
import {
  Link,
  useLocation
} from "react-router-dom";

import {
  FacebookShareButton,
  FacebookIcon,
  FacebookShareCount,
  TwitterShareButton,
} from "react-share";
import MessengerSendToMessenger from 'react-messenger-send-to-messenger';


function Header() {
	
	const [darkMode, setDarkMode] = React.useState(getInitialMode());
	let location = useLocation();

 

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

		console.log(savedMode || false);
	}

	function getPrefColorScheme() {
		if (!window.matchMedia) return;

		return window.matchMedia("(prefers-color-scheme: dark)").matches;
	}

		return(
			<>
				<header className="main__header">
					<div className="logo">
						<Link to="/"><h1>Covid19.si</h1></Link>
						<h2>Podrobni podatki o posledicah virusa</h2>
					</div>
					<div className="share_div">
						<FacebookShareButton className="share_div__fb" url={location.pathname === "/" ? "https://covid19.si/" : ("https://covid19.si" + location.pathname)}>
							<img src={process.env.REACT_APP_BASE_URL + "/img/fb.png} alt="share" />
							<span>Deli z drugimi</span>
							<FacebookShareCount className="share_div__fb--count" url={"https://covid19.si/"} />
						</FacebookShareButton>

						<TwitterShareButton className="share_div__tw" url={location.pathname === '/' ? 'https://covid19.si/' : ('https://covid19.si' + location.pathname)}>
							<i className="fa fa-twitter"></i>
							<span>Tweet</span>
						</TwitterShareButton>

					</div>
				</header>
			</>
		)
}

export default Header;