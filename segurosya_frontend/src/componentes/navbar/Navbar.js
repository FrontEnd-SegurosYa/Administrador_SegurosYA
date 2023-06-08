import NavbarElements from './NavbarElements';

import React, { useState } from 'react';

function Navbar({estado,infomacionCuenta}) {
  console.log("el estado1 es"+estado);
  return (
    <React.Fragment>
			<NavbarElements estado={estado} informacionCuenta={infomacionCuenta}/>
		</React.Fragment>
  );
}

export default Navbar;

