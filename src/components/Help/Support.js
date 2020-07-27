import React, { useState } from 'react';
import Modal from '../ui/modal/Modal';
import './Help.css';

function encode(data) {
	return Object.keys(data)
		.map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
		.join('&');
}

const Support = props => {
	const [modalOpen, setModalState] = useState(true);
	const [formState, setFormState] = useState({
		name: '',
		email: '',
		message: ''
	});

	const submitForm = e => {
		fetch('/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: encode({ 'form-name': 'contact', ...formState })
		})
			.then(() => alert('Success!'))
			.catch(error => alert(error));

		e.preventDefault();
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
			<form className='support-form' name='contact' onSubmit={submitForm}>
				<div className='form-group'>
					<label htmlFor='userName'>Name:</label>
					<input
						id='userName'
						className='form-control'
						type='text'
						value={formState.name}
						onChange={e =>
							setFormState({ ...formState, [e.target.name]: e.target.value })
						}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='userEmail'>Email:</label>
					<input
						id='userEmail'
						className='form-control'
						type='email'
						value={formState.email}
						onChange={e =>
							setFormState({ ...formState, [e.target.name]: e.target.value })
						}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='userMessage'>Message:</label>
					<textarea
						id='userMessage'
						className='form-control'
						value={formState.message}
						onChange={e =>
							setFormState({ ...formState, [e.target.name]: e.target.value })
						}
					></textarea>
				</div>
				<div className='form-group'>
					<button type='submit' value='Submit'>
						Send
					</button>
				</div>
			</form>
		</Modal>
	);
};

export default Support;
