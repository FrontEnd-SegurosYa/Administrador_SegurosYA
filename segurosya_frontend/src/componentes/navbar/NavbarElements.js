import './Navbar.css'
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import logo from '../../img/logoNombre.png';
import { Link } from 'react-router-dom';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={10}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: "#FE6B8B",
    borderRadius: 5,
   
  },
}));

const NavbarElements = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return(
    <>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <a className="navbar-brand logo mx-2" href="#">
            <img src = {logo} alt="" width="80" height="40" className="d-inline-block align-text-top"/>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-3">
              <li className="nav-item dropdown">
              </li>
              <li className="nav-item">
              </li>
            </ul>
            <form className="d-flex mx-3 ">
              <Link to={"/iniciarSesion"}>
                <button type="button" className="btnGeneral btnInicioSesion">Ingresa a tu Cuenta</button>
              </Link>
            </form>
          </div>
        </div>
      </nav>
      <br/>
      <AppBar position="static">
        <Tabs value={value}  onChange={handleChange} aria-label="simple tabs example" centered>
          <Tab label="Inicio"  {...a11yProps(0)} />
          <Tab label="Cliente" {...a11yProps(1)} />
          <Tab label="Polizas" {...a11yProps(2)} />
          <Tab label="Cotizaciones" {...a11yProps(2)} />
          <Tab label="Usuarios" {...a11yProps(2)} />
          <Tab label="Reportes" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </>
  )
}

export default NavbarElements;

