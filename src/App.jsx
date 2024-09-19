import { useSelector, useDispatch } from "react-redux";
import ContactForm from "./components/ContactForm";
import ContactList from './components/ContactList';
import SearchBox from './components/SearchBox';
import { addContact, deleteContact } from './redux/contact';
import './App.css';
import { useEffect } from "react";

const LOCAL_STORAGE_KEY = 'yourContacts';

function App() {
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.filters.name);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedContacts = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedContacts) {
      const parsedContacts = JSON.parse(storedContacts);
      parsedContacts.forEach(contact => {
        dispatch(addContact(contact));  
      });
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toUpperCase().includes(filter.toUpperCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm addContact={(newContact) => dispatch(addContact(newContact))} />
      <SearchBox />
      <ContactList 
        contacts={filteredContacts} 
        deleteFromList={(contactToDelete) => dispatch(deleteContact(contactToDelete.id))} 
      />
    </div>
  );
}

export default App;
