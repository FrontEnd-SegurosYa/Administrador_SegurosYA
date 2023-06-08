import NavbarElements from './NavbarElements';

import React, { useState } from 'react';

function Navbar({estado}) {
  console.log("el estado1 es"+estado)
  return (
    <React.Fragment>
			<NavbarElements estado={estado}/>
		</React.Fragment>
  );
}

export default Navbar;

