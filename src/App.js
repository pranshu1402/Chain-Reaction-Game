import React from 'react';
import Layout from './components/layout/Layout';
import Board from './components/board/Board';
import './App.css';

function App() {
		return (
				<React.Fragment>
					{/* Implementing routing here */}
					<Layout><Board/></Layout>
				</React.Fragment>
		);
}

export default App;
