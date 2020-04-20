import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import HomePageReducer from './components/landing/HomePageReducer';
import GameReducer from './components/game/GameReducer';

const composeEnhancers =
	process.env.NODE_ENV === 'development'
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		: null || compose;

const rootReducer = combineReducers({
	home: HomePageReducer,
	game: GameReducer,
	/* auth: authReducer */
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
