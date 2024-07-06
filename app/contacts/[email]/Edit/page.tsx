'use client';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleHide } from '@/app/store'; // Ensure this import path matches your project structure

interface Contact {
    id: number;
    name: string;
    email: string;
    phone: string;
}

const EditPage: React.FC<{ emailProp?: string; editProp?: boolean }> = ({ emailProp, editProp }) => {
    const params = useParams();
    const email = emailProp || decodeURIComponent(params.email as string);
    const dispatch = useDispatch();

    // State to manage the form inputs
    const [newName, setNewName] = useState<string>('');
    const [newEmail, setNewEmail] = useState<string>('');
    const [newPhone, setNewPhone] = useState<string>('');

    const handleSave = async () => {
        const updateUrl = `/api/contacts/${email}/edit`;

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
