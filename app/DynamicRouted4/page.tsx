import React from 'react';
import ContactPage from '@/app/contacts/[email]/page';

const emails: string[] = ["%","%","%","V@chiwae.com"];
export function setEmail(email: string) {
  for (let i = 0; i < emails.length; i++) {
    if (emails[i] === "%") {
      emails[i] = email;
      console.log(emails[i])
      break; // Stop the loop after setting the email
    }
  }
}

export function clearEmail(email: string) {
  for (let i = 0; i < emails.length; i++) {
    if (emails[i] === "email") {
      emails[i] = "%";
      break; // Stop the loop after setting the email
    }
  }
}

const Dyna: React.FC = () => {
    return (
      <div>
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
      </div>
  );
};


export default Dyna;
