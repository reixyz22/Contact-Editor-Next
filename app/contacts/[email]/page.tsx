'use client';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {clearEmail} from '@/app/store';

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
  //these lines handle getting email prop, either as an arg from dyna or from the url
  const params = useParams();
  const emailFromParams = decodeURIComponent(params.email as string); // Decode the email parameter from URL
  const email = emailProp || emailFromParams; // Use prop email if available, otherwise use URL parameter
  //now that you have your email you can set these up ahead of your api call
  const [contact, setContact] = useState<Contact | null>(null);
  const [error, setError] = useState<string | null>(null);

 useEffect(() => {
  console.log('Current email:', email); // This will show what email is being used for fetching
  if (email && email !== "%") {
    fetch(`/api/contacts/${email}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok. Email: ${email}`);
        }
        return response.json();
      })
      .then((data: Contact) => {
        console.log('Fetched contact data:', data); // Debugging: Log fetched data
        setContact(data);
      })
      .catch(error => {
        console.error('Fetch error:', error);
        setError(`Fetch error: ${error.message}`);
      });
  }
}, [email]); // Make sure this effect runs whenever email changes
  // you'll need these two things to use our redux state, dispatch and handleClearEmail
  const dispatch = useDispatch();
  const handleClearEmail = (email: string) => {
      dispatch(clearEmail(email));
  }

  //error handles down to line 69
  if (email === "%"){
    return <div><h1 style={{color: 'darkblue'}}>X Waiting</h1></div>
  }

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
         <button onClick={() => handleClearEmail(contact.email)}>clear {contact.name} </button>
      </div>
    </div>
  );
};

export default ContactPage;
