import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import './Modal.css';

/* PROPS: 
- shouldOpen
- handleModalClose (func) / history (obj)
- heading
*/
const Modal = props => {
	const [isOpen, handleModalState] = useState(props.shouldOpen);

	const closeModal = () => {
		handleModalState(false);
		if (props.handleModalClose) {
			props.handleModalClose(false);
		} else {
			props.history.replace('/');
		}
	};

	return (
		<div className={`modal-window ${isOpen ? '-open' : ''}`}>
			<div className='modal-curtain' onClick={closeModal}></div>
			<div className='modal-content'>
				<header>
					<h3 className='title'>{props.heading}</h3>
					<button className='modal-close-button' onClick={closeModal}>
						<FontAwesomeIcon icon={faTimesCircle} size={'lg'} color={'black'} />
					</button>
				</header>
				{props.children}
				{props.isDismissRequired ? (
					<button className='dismiss game-control' onClick={closeModal}>
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
