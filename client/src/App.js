import React from 'react';

import './assets/style/main.scss';

import List from './List/List.js';


function App() {


	return (
		<div className="App dark">
			<div className="logo">
				<h1>Koronavirus</h1>
				<h2>Podrobni podatki o posledicah virusa</h2>
			</div>
			<List />
		</div>
	);
}

export default App;
