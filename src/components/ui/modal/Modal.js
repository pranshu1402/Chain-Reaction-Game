import React, { useState } from 'react';
import './Modal.css';

const Modal = props => {
	const [isOpen, handleModalState] = useState(props.shouldOpen);

	const closeModal = () => {
		handleModalState(false);
		props.history.replace('/');
	};

	return (
		<div className={`modal-window ${isOpen ? '-open' : ''}`}>
			<div className='modal-curtain' onClick={closeModal}></div>
			<div className='modal-content'>
				<header>
					<h3>{props.heading}</h3>
					<button className='close' onClick={closeModal}>
						x
					</button>
				</header>
				{props.children}
				{props.isDismissRequired ? (
					<button className='dismiss' onClick={closeModal}>
						DISMISS
					</button>
				) : (
					''
				)}
			</div>
		</div>
	);
};

export default Modal;
