'use client';

import { useEffect, useState } from 'react';

type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

export default function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    fetch('/api/contacts')
      .then(response => response.json())
      .then(data => setContacts(data))
      .catch(error => console.error('Error fetching contacts:', error));
  }, []);

  return (
    <div>
      <h1>Contact List</h1>
      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>
            {contact.name} - {contact.email} - {contact.phone}
          </li>
        ))}
      </ul>
    </div>
  );
}
