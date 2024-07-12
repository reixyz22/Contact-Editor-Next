'use client';
import React from 'react';
import Dyna from './DynamicRouted/page';
import ContactSidebarNav from './SideNav/page';

const Page: React.FC = () => {
  return (
      <div>
          <div style={{display: 'table'}}>
              <div style={{display: 'table-row'}}>
                  <div style={{width: '600px', display: 'table-cell'}}><ContactSidebarNav/></div> {/* left */}
                  <div style={{display: 'table-cell'}}><Dyna/></div> {/* right*/}
              </div>
          </div>
      </div>
  );
};

export default Page;

