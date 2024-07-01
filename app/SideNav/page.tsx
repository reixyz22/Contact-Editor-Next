'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {setEmail} from '@/app/DynamicRouted4/page';

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
    fetch('/api/contacts')
      .then(response => response.json())
      .then(data => setContacts(data))
      .catch(error => console.error('Error fetching contacts:', error));
  }, []);

  return (
    <div style={styles.sidebar}>
      <h1 style={styles.title}>Selection Bar</h1>
      <div style={styles.scrollContainer}>
        <ul style={styles.list}>
          {contacts.map(contact => (
              <li key={contact.id} style={styles.listItem} onClick={() => setEmail(contact.email)}>
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
