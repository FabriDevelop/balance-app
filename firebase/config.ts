import { initializeApp, getApp, getApps, FirebaseApp } from 'firebase/app'

let app: FirebaseApp

const firebaseConfig = {
  apiKey: 'AIzaSyAiiAimuVOfNg9onmbvT7Y61x--zOTF01g',
  authDomain: 'balance-c7069.firebaseapp.com',
  projectId: 'balance-c7069',
  storageBucket: 'balance-c7069.appspot.com',
  messagingSenderId: '514440607511',
  appId: '1:514440607511:web:625caf315770a452aea952',
}

if (getApps().length) {
  app = getApp()
} else {
  app = initializeApp(firebaseConfig)
}

export default app
