import { ApolloProvider } from "@apollo/client";

import {ContactProvider} from "./Context/ContactContext";
import useApp from "./useApp";
import { ToastContainer } from 'react-toastify';

import "./App.css";
import Contact from "./features/Contact";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const { client } = useApp();

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
