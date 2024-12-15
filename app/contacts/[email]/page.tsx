'use client';
import {useParams} from 'next/navigation';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {clearEmail, toggleHide} from '../../store';
import {env} from "std-env";

// Define the Contact type
type Contact = {
    id: number;
    name: string;
    email: string;
    phone: string;
};

type ContactPageProps = {
    emailProp?: string;
    editProp: boolean; //tells 'dynamicRouted' if this should be the edit view or the normal view if edit = true {is edit}
};

const ContactPage: React.FC<ContactPageProps> = ({emailProp, editProp}) => {
    const baseUrl = "http://localhost:3000";
    //these lines handle getting email prop, either as an arg from dyna or from the url
    const params = useParams();
    let emailFromParams;
    if (params) {
        const emailFromParams = decodeURIComponent(params.email as string); // Decode the email parameter from URL
    }
    const email = emailProp || emailFromParams; // Use prop email if available, otherwise use URL parameter

    //now that you have your email you can set these up ahead of your api call
    const [contact, setContact] = useState<Contact | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => { //api call starts here
        console.log('Current email:', email); // This will log what email is being used for fetching; useful to debug
        if (email && email !== "%" && email !== "new") {
            const fetchContact = () => {
                fetch(`${baseUrl}/api/contacts/${email}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Network response was not ok. Email: ${email}`);
                        }
                        return response.json();
                    })
                    .then((data: Contact) => {
                        setContact(data);
                    })
                    .catch(error => {
                        console.error('Fetch error:', error);
                        setError(`Fetch error: ${error.message}`);
                    });
            };
            const intervalId = setInterval(fetchContact, 100);  // Refresh every 100 ms (.1 second), so we catch new edits

            return () => clearInterval(intervalId);  // Cleanup on component unmount
        }
    }, [email]); // Make sure this effect runs whenever email changes


  // you'll need these three things to use our redux state, dispatch handle_clearEmail handle_toggleHide
  const dispatch = useDispatch() || undefined;
  const handle_clearEmail = (email: string) => {
      dispatch(clearEmail(email));
  }
  const handle_toggleHide = (email: string) => {
      dispatch(toggleHide(email));
  }

    if (editProp) return <div></div> //if email edit mode don't render this page at all

    if (email === "%") return <h1 style={{color: 'darkblue'}}> 📝 </h1> //default screen seen on homepage + after resets

    if (error) return <div>
        Error: {error}.<h1 style={{color: 'darkblue'}}>{email}</h1>
    </div>

    if (!contact) {
        return <div>Loading Contact...</div>
    }

    return (
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