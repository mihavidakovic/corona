import React from 'react';
import fs from 'fs';
import csvToJson  from 'convert-csv-to-json';
import logo from './logo.svg';
import './App.css';


function getConfirmed() {

	let json = csvToJson.getJsonFromCsv("confirmed.csv");
	for(let i=0; i<json.length;i++){
	    console.log(json[i]);
	}

}

function App() {

	getConfirmed();

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					CORONAAAA
				</p>
			</header>
		</div>
	);
}

export default App;
