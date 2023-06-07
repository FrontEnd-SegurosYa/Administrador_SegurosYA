import NavbarElements from './NavbarElements';

import React, { useState } from 'react';

function Tab({ title, active, onClick }) {
  return (
    <div
      className={`tab ${active ? 'active' : ''}`}
      onClick={onClick}
    >
      {title}
    </div>
  );
}

function TabContent({ activeTab }) {
  const content = {
    tab1: 'Contenido de la pestaña 1',
    tab2: 'Contenido de la pestaña 2',
    tab3: 'Contenido de la pestaña 3',
  };

  return (
    <div className="tab-content">
      {content[activeTab]}
    </div>
  );
}

function Navbar() {
  const [activeTab, setActiveTab] = useState('tab1');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <React.Fragment>
			<NavbarElements />
		</React.Fragment>
  );
}

export default Navbar;

