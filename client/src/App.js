import React from 'react';
import fs from 'fs';
import csvToJson  from 'convert-csv-to-json';
import logo from './logo.svg';
import './App.css';

import List from './List/List.js';


function App() {


	return (
		<div className="App">
			<List />
		</div>
	);
}

export default App;
