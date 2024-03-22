import { features } from '@config';
import firebase from 'firebase/app';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

require('firebase/auth');
require('firebase/messaging');

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: publicRuntimeConfig.firebaseApiKey,
    ...features.firebase.config,
};

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
