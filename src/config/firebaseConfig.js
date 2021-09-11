import firebase from 'firebase/compat/app';

const firebaseConfig = {
	apiKey: 'AIzaSyAQxwirRXXjN2520WYEb3PKetLu9-BUZd0',
	authDomain: 'chain-reaction-4250a.firebaseapp.com',
	databaseURL: 'https://chain-reaction-4250a.firebaseio.com',
	projectId: 'chain-reaction-4250a',
	storageBucket: 'chain-reaction-4250a.appspot.com',
	messagingSenderId: '1085126787207',
	appId: '1:1085126787207:web:a68f7c8520e8eff55bb822'
};

firebase.initializeApp(firebaseConfig);

export default firebase;
