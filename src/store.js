import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAkBheV4QAdPvFc9U_qWcQlavfW-f_iXhs',
  authDomain: 'reactclientpanel-af0a5.firebaseapp.com',
  databaseURL: 'https://reactclientpanel-af0a5.firebaseio.com',
  projectId: 'reactclientpanel-af0a5',
  storageBucket: 'reactclientpanel-af0a5.appspot.com',
  messagingSenderId: '938860614767'
};

//react redux firebase config

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

//Initilize firebase instance
firebase.initializeApp(firebaseConfig);

//Init Firestore
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase)
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

//Create initial State
const initialState = {};

//Create Store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
