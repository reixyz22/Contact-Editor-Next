'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setEmail } from '../store';

// Define the Contact type
type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

const ContactSidebar = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const router = useRouter();

  useEffect(() => { // fetch list of all contacts and their details from api
      const fetchContacts = () => {
              fetch('/api/contacts').then(response => response.json())
              .then(data => {
                const sortedData = data.sort((a: Contact, b: Contact) => a.name.localeCompare(b.name)); //alphabetize
                setContacts(sortedData);
              })
              .catch(error => console.error('Error fetching contacts:', error));
      };

      fetchContacts();  // Initial fetch
      const intervalId = setInterval(fetchContacts, 10);  // Refresh every 10 ms (.1 second), so we catch new edits

      return () => clearInterval(intervalId);  // Cleanup on component unmount
    }, []);


  const dispatch = useDispatch(); //these two variables allow us to grab setEmail from redux
  const handleSetEmail = (email: string) => {
    dispatch(setEmail(email));
  };

  //these help us select and hover on the sidebar
  const selectedEmails = useSelector((state: RootState) => state.dynaEInx.emailInx.map(e => e.email));
  const [hoveredContactId, setHoveredContactId] = useState<number | null>(null);


 return (
    <div style={styles.sidebar}>
      <h1 style={styles.title}>Selection Bar</h1>
      <div style={styles.scrollContainer}>
        <ul style={styles.list}>
          {contacts.map(contact => ( //we're going to map all those contacts we fetched onto the sidebar now
            <li key={contact.id}
                style={{
                  ...styles.listItem,
                  backgroundColor: hoveredContactId === contact.id ? '#ff85b3' : selectedEmails.includes(contact.email) ? '#366477' : 'transparent',
                  color: hoveredContactId === contact.id || selectedEmails.includes(contact.email) ? 'white' : 'black'
                }} //this is tailwind so feel free to edit the colors on the side if your ide supports it!
                onMouseEnter={() => setHoveredContactId(contact.id)}
                onMouseLeave={() => setHoveredContactId(null)}
                onClick={() => handleSetEmail(contact.email)}>
              {contact.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  sidebar: {
    width: '250px',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    padding: '20px',
  },
  title: {
    marginBottom: '10px',
    color: 'darkBlue'
  },
  scrollContainer: {
    height: 'calc(100vh - 50px)',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    padding: '10px 0',
    borderBottom: '1px solid #ddd',
    cursor: 'pointer',
  },
};


export default ContactSidebar;
