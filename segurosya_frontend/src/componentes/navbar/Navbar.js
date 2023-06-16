import NavbarElements from './NavbarElements';

import React, { useState } from 'react';

function Navbar({estado,cuenta}) {
  console.log("el estado1 es"+estado);
  return (
    <React.Fragment>
			<NavbarElements estado={estado} cuenta={cuenta}/>
		</React.Fragment>
  );
}

export default Navbar;

