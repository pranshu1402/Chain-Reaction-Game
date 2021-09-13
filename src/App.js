import './App.css';
import Auth from './components/auth/auth';
import Game from './components/game/Game';
import Layout from './components/layout/Layout';
import Support from './components/Help/Support';
import Landing from './components/landing/Landing';
import HelpModal from './components/Help/HelpModal';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

const App = () => (
	<Layout>
		<Switch>
			<Route component={Auth} path='/auth' />
			<Route component={HelpModal} path='/help' />
			<Route component={Support} path='/support' />
			<Route component={Game} path='/game' exact />
			<Route component={Landing} path='/' />
			<Redirect to='/' />
		</Switch>
	</Layout>
);

export default withRouter(App);
