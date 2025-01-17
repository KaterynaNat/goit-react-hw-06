import "./App.css";
import ContactForm from "./components/ContactForm/ContactForm";
import SearchBox from "./components/SearchBox/SearchBox";
import ContactList from "./components/ContactList/ContactList";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="container">
      <h1>Phonebook</h1>
      {}
      <ContactForm />
      {}
      <SearchBox />
      {}
      <ContactList />
      {}
      <ToastContainer />
    </div>
  );
}

export default App;
