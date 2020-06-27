import React from 'react';
import Layout from './components/layout/Layout';
import Game from './components/game/Game';
import Landing from './components/landing/Landing';
import './App.css';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

const App = () => {
	return (
		<Layout>
			<Switch>
				<Route exact component={Game} path='/game' />
				<Route component={Landing} path='/' />
				<Redirect to='/' />
			</Switch>
		</Layout>
	);
};

export default withRouter(App);
