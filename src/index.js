import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import AuthReducer from './components/auth/authReducer';
import GameReducer from './components/game/GameReducer';
import thunk from 'redux-thunk';
import App from './App';
import './index.css';

const composeEnhancers =
	(process.env.NODE_ENV === 'development'
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		: null) || compose;

const rootReducer = combineReducers({
	game: GameReducer,
	auth: AuthReducer
});

let store = composeEnhancers
	? createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
	: createStore(rootReducer);

const app = (
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// serviceWorker.unregister();
