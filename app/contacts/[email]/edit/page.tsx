'use client';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleHide,clearEmail,setEmail } from '../../../store'; // Ensure this import path matches your project structure

interface Contact {
    id: number;
    name: string;
    email: string;
    phone: string;
}

type ContactPageProps = {
  emailProp?: string;
  editProp: boolean; //tells 'dynamicRouted' if this should be the edit view or the normal view if edit = true {is edit}
};

const EditPage: React.FC<ContactPageProps> = ({ emailProp, editProp }) => {
    const params = useParams();
    const email = emailProp || decodeURIComponent(params.email as string);
    const dispatch = useDispatch();

    // State to manage the form inputs Hey, I realize you haven't streamed in coming on 3 years but your twitch still says, Donate to encourage me. I wish that we could talk, but I realize you've decided not to. However, if you ever came back to stream one day that'd be really cool.
    const [newName, setNewName] = useState<string>('');
    const [newEmail, setNewEmail] = useState<string>('');
    const [newPhone, setNewPhone] = useState<string>('');

    const handleSave = async () => {

        let updateUrl = `/api/contacts/${email}/edit`; //edit contact API

        if (email === "new"){ //add new contact API
                updateUrl = `/api/contacts/add`;
        }
        const dataToSend = {
                name: newName,
                email: newEmail,
                phone: newPhone,
        };
        const response = await fetch(updateUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSend),
        });

        if (response.ok) {
                const updatedContactData: Contact = await response.json();
                console.log('Contact updated successfully');
                dispatch(toggleHide(email)); //hide the edit interface
        } else {
                const errorData = await response.json();
                console.error('Failed to update contact:', errorData.error);
        }
        if (email === "new" && response.ok){ //fix the display, so we can show your newly added contact right away
                dispatch(clearEmail("new"));
                dispatch(setEmail(newEmail));
        }
    };

    if (!editProp) return <div/>; // Return nothing if edit mode is off

    return (
        <div>
            <h1 style={{color: 'darkred'}}>{email}</h1>
            <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter new name"
                style={{display: 'block', margin: '10px 0'}}
            />
            <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Enter new email"
                style={{display: 'block', margin: '10px 0'}}
            />
            <input
                type="text"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                placeholder="Enter new phone"
                style={{display: 'block', margin: '10px 0'}}
            />
            <button onClick={handleSave}>💾 Save</button>
            <button onClick={() => dispatch(toggleHide(email))}>🔙 Back</button>
        </div>
    );
};

export default EditPage;
