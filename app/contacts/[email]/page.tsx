'use client';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import {clearEmail} from '@/app/DynamicRouted4/page';

// Define the Contact type
type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

type ContactPageProps = {
  emailProp?: string; // Prop to accept email optionally
};

const ContactPage: React.FC<ContactPageProps> = ({ emailProp }) => {
  const params = useParams();
  const emailFromParams = decodeURIComponent(params.email as string); // Decode the email parameter from URL
  const email = emailProp || emailFromParams; // Use prop email if available, otherwise use URL parameter
  if (email === "%"){
    return <div><h1 style={{color: 'darkblue'}}>X Waiting</h1></div>
  }


  const [contact, setContact] = useState<Contact | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (email) {
      console.log('Fetching contact for email:', email); // Debugging: Log email before fetching
      fetch(`/api/contacts/${email}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok ' + error +' email ' + email);
          }
          return response.json();
        })
        .then((data: Contact) => {
          console.log('Fetched contact data:', data); // Debugging: Log fetched data
          setContact(data);
        })
        .catch(error => {
          console.error('Fetch error:', error); // Debugging: Log fetch error
          setError(error.message);
        });
    }
  }, [email]); // Depend on email, ensuring it re-runs the effect if the email prop changes

  if (error) {
    return <div>Error: {error}.
        <h1 style={{color: 'darkblue'}}>{email}</h1>
      </div>
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
