import * as firebase from 'firebase/app'

import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDeFtrO3F38kK9ONW-9Xsg60fKM-IaAPew",
    authDomain: "question-app-aa9b3.firebaseapp.com",
    projectId: "question-app-aa9b3",
    storageBucket: "question-app-aa9b3.appspot.com",
    messagingSenderId: "364061975852",
    appId: "1:364061975852:web:9fe8e9ec0ede0bbca33889"
}

firebase.initializeApp(firebaseConfig)

export default firebase