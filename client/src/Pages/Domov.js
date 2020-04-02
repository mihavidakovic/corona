import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/sl';
import _ from 'lodash';

import GraphCounrty from '../Graph/GraphCounrty.js';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";

// Layout
import Header from '../Components/Header.js';


//Compontents
import List from '../List/List.js';
import All from '../Components/All.js';
import Graph from '../Graph/Graph.js';


const countries = require('../Graph/countries.json');

const  Domov = (props) => {

	useEffect(() => {
		document.title = "Covid19.si - Zadnji podatki o posledicah virusa!"
	})

	return (
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

	);
}

export default Domov;