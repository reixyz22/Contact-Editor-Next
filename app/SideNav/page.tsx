'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
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

  useEffect(() => {
      const fetchContacts = () => {
              fetch('/api/contacts').then(response => response.json())
              .then(data => {// Sort contacts by name alphabetically
                const sortedData = data.sort((a: Contact, b: Contact) => a.name.localeCompare(b.name));
                setContacts(sortedData);
              })
              .catch(error => console.error('Error fetching contacts:', error));
      };

      fetchContacts();  // Initial fetch
      const intervalId = setInterval(fetchContacts, 10);  // Refresh every 10 ms (.1 second)

      return () => clearInterval(intervalId);  // Cleanup on component unmount
    }, []);

  const dispatch = useDispatch();

  const handleSetEmail = (email: string) => {
    dispatch(setEmail(email));
  };

  return (
    <div style={styles.sidebar}>
      <h1 style={styles.title}>Selection Bar</h1>
      <div style={styles.scrollContainer}>
        <ul style={styles.list}>
          {contacts.map(contact => (
              <li key={contact.id} style={styles.listItem} onClick={() => handleSetEmail(contact.email)}>
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
    height: 'calc(100vh - 50px)', // Adjust based on the title height
    overflowY: 'auto' as 'auto',
  },
  list: {
    listStyleType: 'none' as 'none',
    padding: 0,
  },
  listItem: {
    padding: '10px 0',
    borderBottom: '1px solid #ddd',
    cursor: 'pointer',
  },
};

export default ContactSidebar;
