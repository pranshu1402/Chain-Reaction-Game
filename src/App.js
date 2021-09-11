import Layout from './components/layout/Layout';
import Game from './components/game/Game';
import Landing from './components/landing/Landing';
import HelpModal from './components/Help/HelpModal';
import Support from './components/Help/Support';
import './App.css';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

const App = () => (
	<Layout>
		<Switch>
			<Route component={HelpModal} path='/help' />
			<Route component={Support} path='/support' />
			<Route exact component={Game} path='/game' />
			<Route component={Landing} path='/' />
			<Redirect to='/' />
		</Switch>
	</Layout>
);

export default withRouter(App);
