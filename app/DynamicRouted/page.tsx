'use client';
import React from 'react';
import ContactPage from '@/app/contacts/[email]/page';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, RootState } from '../store';

const Dyna: React.FC = () => {
    const emails = useSelector((state: RootState) => state.email.emails);
    const dispatch = useDispatch();
    const handleSetEmail = (email: string) => {
        dispatch(setEmail(email));
    };
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
