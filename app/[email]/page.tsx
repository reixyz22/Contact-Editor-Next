'use client';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

// Define the Contact type
type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

const ContactPage: React.FC = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const [contact, setContact] = useState<Contact | null>(null);

  useEffect(() => {
    if (email) {
      fetch(`/api/contacts/${email}`)
        .then(response => response.json())
        .then((data: Contact) => setContact(data))
        .catch(error => console.error('Error fetching contact:', error));
    }
  }, [email]);

  if (!contact) {
    return <div>Loading...${email}</div>;
  }

  return (
    <div>
      <h1 style={{ color: 'darkblue' }}>{email}</h1>
      <div>
        <p><strong>Name:</strong> {contact.name}</p>
        <p><strong>Email:</strong> {contact.email}</p>
        <p><strong>Phone:</strong> {contact.phone}</p>
      </div>
    </div>
  );
};

export default ContactPage;
