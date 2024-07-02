'use client';
import React from 'react';
import ContactPage from '@/app/contacts/[email]/page';
import {useSelector } from 'react-redux';
import { RootState } from '../store';

const Dyna: React.FC = () => {
    const emails = useSelector((state: RootState) => state.email.emails);

    return (
      <div style={{display: 'table', width: '100%', borderSpacing: '10px'}}>
        <div style={{display: 'table-row'}}>
            <div style={styles.cell}>
                <ContactPage emailProp={emails[0]}/></div>
            <div style={styles.cell}>
                <ContactPage emailProp={emails[1]}/></div>
        </div>
          <div style={{display: 'table-row'}}>
              <div style={styles.cell}>
                  <ContactPage emailProp={emails[2]}/></div>
              <div style={styles.cell}>
                  <ContactPage emailProp={emails[3]}/></div>
          </div>
      </div>
    );
};

const styles = {
  cell: {
      display: 'table-cell',
      border: '2px solid black',
      padding: '20px',
  },};

export default Dyna;
