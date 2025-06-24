import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDd76N_QILSi3xTKYSR1gVYVAhnRCxN6tg',
  authDomain: 'note-damn.firebaseapp.com',
  projectId: 'note-damn',
  storageBucket: 'note-damn.appspot.com',
  messagingSenderId: '902012701587',
  appId: '1:902012701587:web:abcd062212d3c72b79f666',
  measurementId: 'G-9RX5DV6R45',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };
