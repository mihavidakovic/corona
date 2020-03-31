import React, { useState } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/sl';
import _ from 'lodash';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

export default function AdminPageIp() {
	let { ip } = useParams();

	return (
		<div className="AdminPage">
			<h2>IP</h2>
		</div>
	);
}