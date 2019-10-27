import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Button from "components/CustomButtons/Button.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { Toolbar } from "@material-ui/core";
import Login from "views/Login/Login.jsx"
import logo from "assets/img/reactlogo.png";
import AppBar from '@material-ui/core/AppBar';

class Homepage extends React.Component {
  state = {
    value: 0,
    text: "Next",
    persons: {}
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  login = () => {
    this.setState({ showLoginWindow: true })
  }

  closeForgetPassword = () => {

  }

  showForgetPasswordPopup = () => {
    this.setState({ showForgetPasswordPopup: true })
  }

  render() {
    const { classes, ...rest } = this.props;
    const { text } = this.state //destucture state
    return (
      <div style={{ margin: "0px !important" }}>
        {!this.state.showLoginWindow &&
          <AppBar style={{ background: '#9c27b0' }} position="static">
            <Toolbar>
              <div className={classes.logoImage + " " + classes.flex + " " + classes.leftAlign}>
                <img src={logo} alt="logo" className={classes.img} />
                Cara Crachá
              </div>
              <div className={classes.rightAlign}>
                <Button style={{color: "#9c27b0", 
                                backgroundColor: "white",
                                fontWeight: "bold",
                                fontSize: "medium"}} 
                                round
                                onClick={() => this.login()}>
                  Registre-se
                </Button>
                <Button color="primary" round onClick={() => this.login()}>Entrar</Button>
              </div>
            </Toolbar>
          </AppBar>
        }
        {this.state.showLoginWindow &&
          <Login />
        }
      </div>
    );
  }
}

Homepage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Homepage);
