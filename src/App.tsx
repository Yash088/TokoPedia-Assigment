import { ApolloProvider } from "@apollo/client";

import {ContactProvider} from "./Context/ContactContext";
import useApp from "./useApp";
import { ToastContainer } from 'react-toastify';

import "./App.css";
import Contact from "./features/Contact";
import 'react-toastify/dist/ReactToastify.css';
import { initializeApp } from "firebase/app";


function App() {
  const { client } = useApp();
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsmTQI6zabxK6uzPvxi6yX0DaOe_yR5B0",
  authDomain: "assignment-3d4fa.firebaseapp.com",
  projectId: "assignment-3d4fa",
  storageBucket: "assignment-3d4fa.appspot.com",
  messagingSenderId: "676075795592",
  appId: "1:676075795592:web:b1b54d8c6e9a3a89fcdb3d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
  return (
    <ApolloProvider client={client}>
      <ContactProvider>
       <Contact/>
      </ContactProvider>
      <ToastContainer
          position='top-right'
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
        />
    </ApolloProvider>
  );
}

export default App;
