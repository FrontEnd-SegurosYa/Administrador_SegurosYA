import NavbarElements from './NavbarElements';

import React, { useState } from 'react';

function Navbar({estado,informacionCuenta}) {
  console.log("el estado1 es"+estado);
  return (
    <React.Fragment>
			<NavbarElements estado={estado} informacionCuenta={informacionCuenta}/>
		</React.Fragment>
  );
}

export default Navbar;

