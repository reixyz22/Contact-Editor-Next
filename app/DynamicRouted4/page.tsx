'use client';
import React, { useState, useEffect } from 'react';
import ContactPage from '@/app/contacts/[email]/page';

const emails: string[] = ["%", "%", "%", "V@chiwae.com"];

export function setEmail(email: string) {
  for (let i = 0; i < emails.length; i++) {
    if (emails[i] === "%") {
      emails[i] = email;
      triggerEmailUpdate(); // Add this call to trigger update
      console.log(emails[i] + "added");
      break; // Stop the loop after setting the email
    }
  }
}

export function clearEmail(email: string) {
  for (let i = 0; i < emails.length; i++) {
    if (emails[i] === email) {
      emails[i] = "%";
      triggerEmailUpdate();
      console.log(email+ "removed from page");
      break;
    }
  }
}

// Add a global counter to trigger updates
let emailUpdateCounter = 0;
function triggerEmailUpdate() {
  emailUpdateCounter++;
}

const Dyna: React.FC = () => {
    const [, setEmailUpdate] = useState(0);

    // Effect to listen for changes in global email update counter
    useEffect(() => {
        const intervalId = setInterval(() => {
          setEmailUpdate(emailUpdateCounter);
        }, 10); // Check every 100 ms for changes
    }, []);

    return (
      <div style={{display: 'table', width: '100%', borderSpacing: '10px'}}>
        <div style={{display: 'table-row'}}>
          <div style={{display: 'table-cell', border: '2px solid black', padding: '20px', textAlign: 'center'}}>
              <ContactPage emailProp={emails[0]}/></div>
          <div style={{display: 'table-cell', border: '2px solid black', padding: '20px', textAlign: 'center'}}>
              <ContactPage emailProp={emails[1]}/></div>
        </div>
        <div style={{display: 'table-row'}}>
          <div style={{display: 'table-cell', border: '2px solid black', padding: '20px', textAlign: 'center'}}>
              <ContactPage emailProp={emails[2]}/></div>
          <div style={{display: 'table-cell', border: '2px solid black', padding: '20px', textAlign: 'center'}}>
              <ContactPage emailProp={emails[3]}/></div>
        </div>
      </div>
    );
};

export default Dyna;
