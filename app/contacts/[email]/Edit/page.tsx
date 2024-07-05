'use client';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { toggleHide } from "@/app/store";

const EditPage: React.FC<{ emailProp?: string; editProp?: boolean }> = ({ emailProp, editProp }) => {
    const params = useParams();
    const emailFromParams = decodeURIComponent(params.email as string); // Decode the email parameter from URL
    const email = emailProp || emailFromParams; // Use prop email if available, otherwise use URL parameter
    const dispatch = useDispatch();
    
    // State to manage the form inputs
    const [newName, setNewName] = useState<string>('');
    const [newEmail, setNewEmail] = useState<string>('');
    const [newPhone, setNewPhone] = useState<string>('');

    const handleToggleHide = (email: string) => {
        dispatch(toggleHide(email));
    };

    const handleSave = async () => {
        const response = await fetch('/api/contacts/updateContact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                currentEmail: emailProp, // Assuming emailProp is the identifier
                newName,
                newEmail,
                newPhone
            }),
        });

        if (response.ok) {
            console.log('Contact updated successfully');
            handleToggleHide(email); //hide the edit menu automatically
        } else {
            console.error('Failed to update contact');
        }
    };


    if (!editProp) return <div></div>; // Return nothing if edit mode is off

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
            <button onClick={() => handleToggleHide(email)}>🔙 Back</button>
        </div>
    );
};

export default EditPage;
