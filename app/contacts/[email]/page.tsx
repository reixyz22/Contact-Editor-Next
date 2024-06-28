'use client';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

// Define the Contact type
type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

const ContactPage: React.FC = () => {
  const params = useParams();
  const email = decodeURIComponent(params.email as string);
  const [contact, setContact] = useState<Contact | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (email) {
      fetch(`/api/contacts/${email}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok ' + error);
          }
          return response.json();
        })
        .then((data: Contact) => setContact(data))
        .catch(error => setError(error.message));
    }
  }, [email]);

  if (error) {
    return <div>Error: {error}
      <h1 style={{color: 'darkblue'}}>{email}</h1>
    </div>;
  }

  if (!contact) {
    return <div>Loading...</div>;
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
