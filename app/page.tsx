'use client';
import React from 'react';
import Contacts from './contacts/page';
import ContactSidebarNav from './SideNav/page';
const Page: React.FC = () => {
  return (
      <div>
          <h1 style={{color: 'darkblue'}}>Contact Editor</h1>
          <div style={{display: 'table'}}>
              <div style={{display: 'table-row'}}>
                  <div style={{width: '600px', display: 'table-cell'}}><ContactSidebarNav/></div> {/* left */}
                  <div style={{display: 'table-cell'}}><Contacts/></div> {/* right*/}
              </div>
          </div>
      </div>
  );
};

export default Page;
