'use client';
import React from 'react';
import ContactPage from '@/app/contacts/[email]/page';
import {useSelector } from 'react-redux';
import { RootState } from '../store';
import EditPage from "@/app/contacts/[email]/edit/page";

const Dyna: React.FC = () => {
    const emailInx = useSelector((state: RootState) => state.dynaEInx.emailInx);
    return (
      <div style={{display: 'table', width: '100%', borderSpacing: '10px'}}>
        <div style={{display: 'table-row'}}>
            <div style={styles.cell}>
                <ContactPage emailProp={emailInx[0].email} editProp = {emailInx[0].edit}/>
                <EditPage emailProp={emailInx[0].email} editProp = {emailInx[0].edit}/>
            </div>
            <div style={styles.cell}>
                <ContactPage emailProp={emailInx[1].email} editProp = {emailInx[1].edit}/>
                <EditPage emailProp={emailInx[1].email} editProp = {emailInx[1].edit}/>
            </div>
        </div>
          <div style={{display: 'table-row'}}>
              <div style={styles.cell}>
                  <ContactPage emailProp={emailInx[2].email} editProp = {emailInx[2].edit}/>
                  <EditPage emailProp={emailInx[2].email} editProp = {emailInx[2].edit}/>
              </div>
              <div style={styles.cell}>
                  <ContactPage emailProp={emailInx[3].email} editProp = {emailInx[3].edit}/>
                  <EditPage emailProp={emailInx[3].email} editProp = {emailInx[3].edit}/>
              </div>
          </div>
      </div>
    );
};

const styles = {
  cell: {
      display: 'table-cell',
      border: '2px solid blue',
      padding: '20px',
  },};

export default Dyna;
