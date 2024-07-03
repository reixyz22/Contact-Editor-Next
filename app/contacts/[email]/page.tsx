'use client';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {clearEmail, toggleHide} from '@/app/store';

// Define the Contact type
type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

type ContactPageProps = {
  emailProp?: string;
  editProp: boolean;
};

const ContactPage: React.FC<ContactPageProps> = ({ emailProp, editProp }) => {

  //these lines handle getting email prop, either as an arg from dyna or from the url
  const params = useParams();
  const emailFromParams = decodeURIComponent(params.email as string); // Decode the email parameter from URL
  const email = emailProp || emailFromParams; // Use prop email if available, otherwise use URL parameter

  //now that you have your email you can set these up ahead of your api call
  const [contact, setContact] = useState<Contact | null>(null);
  const [error, setError] = useState<string | null>(null);

 useEffect(() => { //api call starts here
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

  // you'll need these three things to use our redux state, dispatch handle_clearEmail handle_toggleHide
  const dispatch = useDispatch();
  const handle_clearEmail = (email: string) => {
      dispatch(clearEmail(email));
  }
  const handle_toggleHide = (email: string) => {
      dispatch(toggleHide(email));
  }

  //error handles down to line 73
  if (email === "%") return <h1 style={{color: 'darkblue'}}> 📝 </h1>


  if (error) return <div>
      Error: {error}.<h1 style={{color: 'darkblue'}}>{email}</h1>
  </div>


  if (!contact) {
    return <div>Loading...</div>
  }

  if (!editProp)return (
      <div>
          <h1 style={{color: 'darkblue'}}>{email}</h1>
          <p><strong>Name:</strong> {contact.name}</p>
          <p><strong>Email:</strong> {contact.email}</p>
          <p><strong>Phone:</strong> {contact.phone}</p>
          <button onClick={() => handle_clearEmail(contact.email)}>📓 Reset</button>
          <button onClick={() => handle_toggleHide(contact.email)}>🖋 Edit</button>
      </div>
  )
};

export default ContactPage;
