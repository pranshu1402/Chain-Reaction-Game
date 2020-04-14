import React from 'react';
import Layout from './components/layout/Layout';
import Board from './components/board/Board';
import Landing from './components/landing/Landing';
import './App.css';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

const App = () => {
	return (
			<Layout>
				<Switch>
					<Route exact component={Board} path="/game" />
					<Route component={Landing} path="/" />
					<Redirect path="/"/>
				</Switch>
			</Layout>
	);
}

export default withRouter(App);
