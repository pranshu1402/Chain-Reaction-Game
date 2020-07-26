import React, { useState } from 'react';
import Modal from '../ui/modal/Modal';
import './Help.css';

const Support = props => {
	const [modalOpen, setModalState] = useState(true);

	const submitForm = () => {
		console.log('form-submitted');
		setModalState(false);
		props.history.replace('/');
	};

	return (
		<Modal
			heading='Contact Us'
			isDismissRequired={false}
			shouldOpen={modalOpen}
			{...props}
		>
			<form
				className='support-form'
				name='contact'
				method='POST'
				data-netlify='true'
			>
				<div className='form-group'>
					<label htmlFor='userName'>Name:</label>
					<input id='userName' className='form-control' type='text' />
				</div>
				<div className='form-group'>
					<label htmlFor='userEmail'>Email:</label>
					<input id='userEmail' className='form-control' type='email' />
				</div>
				<div className='form-group'>
					<label htmlFor='userMessage'>Message:</label>
					<textarea id='userMessage' className='form-control'></textarea>
				</div>
				<div className='form-group'>
					<button type='submit' value='Submit' onClick={submitForm}>
						Send
					</button>
				</div>
			</form>
		</Modal>
	);
};

export default Support;
