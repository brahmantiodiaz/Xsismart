import firebase from 'firebase/app'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyA1cDPncJwZk2Zjw_njut0KgYOtKaS73_U",
    authDomain: "xsismart-b68c3.firebaseapp.com",
    projectId: "xsismart-b68c3",
    storageBucket: "xsismart-b68c3.appspot.com",
    messagingSenderId: "689014909271",
    appId: "1:689014909271:web:85cf6a7acd9e1f6a127612",
    measurementId: "G-70LXD98J0J"
};

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export { storage, firebase as default }