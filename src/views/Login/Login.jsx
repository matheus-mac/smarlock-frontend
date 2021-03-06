import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import { Link, Switch, Route, Redirect } from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import Info from "@material-ui/icons/InfoOutlined"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import logo from "assets/img/reactlogo.png";
import Axios from "axios";
const actualHost = "https://52.54.145.159:443"

class Login extends React.Component {
  state = {
    showForgetPasswordPopup: false,
    snackBarSuccess: false,
    cpfcnpj: "",
    senha:"",
    snackMessage:"",
    forgetCPFCNPJ:""
  };

  closeForgetPassword() {

  }

  actionShowForgetPassword = () => {
    this.setState({ showForgetPasswordPopup: true })
  }

  handleClosePopup = () => {
    this.setState({ showForgetPasswordPopup: false })
  }

  handleSuccessNotification = () => {
    this.setState({ snackbarSuccess: true });
    this.handleClosePopup()
    this.alertTimeout = setTimeout(
      function () {
        this.setState({ snackbarSuccess: false });
      }.bind(this),
      6000
    );
  };

  handleCloseSuccessNotification = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ snackbarSuccess: false });
  };

  handleFailNotification = (snackMessage) => {
    this.setState({ snackBarFail: true });
    this.setState({snackMessage: snackMessage});
    this.alertTimeout = setTimeout(
      function () {
        this.setState({ snackBarFail: false });
      }.bind(this),
      6000
    );
  };

  handleCloseFailNotification = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ snackBarFail: false });
  };
  
  handleAccountChange = (event) =>{
    this.setState({cpfcnpj: event.target.value})
  }
  
  handlePasswordChange = (event) =>{
    this.setState({senha: event.target.value})
  }

  handleClickLogin = () =>{
    if (this.state.cpfcnpj === ""|| this.state.senha ===""){
      this.handleFailNotification("Insira seu usuário e senha.")
    }
    else{
      Axios.get(actualHost + `/api/Usuarios/Login`, {params:
        {
          cpfcnpj: this.state.cpfcnpj,
          senha: this.state.senha
        }}
      ).then(res=>{
        localStorage.setItem('@cara-cracha/username', res.data.NomeDoUsuario)
        localStorage.setItem('@cara-cracha/id', res.data.Id)
        localStorage.setItem('@cara-cracha/Perfil', res.data.Perfil)
        localStorage.setItem('@cara-cracha/LoggedIn', res.data.LoggedIn)
        if (res.data.LoggedIn){
          this.props.redirectProp()
        }else{
          this.handleFailNotification("Usuário ou senha incorretos.")
        }
      })
      .catch(res=> {
        this.handleFailNotification("Um erro ocorreu. Entre em contato com o suporte")
      })
    }
  }

  handleForgetCPFCNPJ = (event) =>{
    this.setState({forgetCPFCNPJ: event.target.value})
  }

  handleForgetPassword = () =>{
    if (this.state.forgetCPFCNPJ === ""){
      this.handleFailNotification("Insira um email válido.")
    }
    else{
      Axios.get(actualHost + `/api/Usuarios/EsqueciMinhaSenha`, {params:
        {
          cpfcnpj: this.state.forgetCPFCNPJ
        }}
      ).then(res=>{
        this.handleSuccessNotification()
      })
      .catch(res=> {
        this.handleFailNotification("Um erro ocorreu. Entre em contato com o suporte")
      })
    }
  }

  render() {
    const { classes } = this.props;
    const { text } = this.state //destucture state
    return (
      <div>
        <AppBar style={{ background: '#9c27b0' }} position="static">
          <Toolbar>
            <div className={classes.logoImage + " " + classes.flex}>
              <img src={logo} alt="logo" className={classes.img} />
              Cara crachá
            </div>
          </Toolbar>
        </AppBar>
        <GridContainer noMargin>
          <GridItem xs={12} sm={12} md={4}>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card>
              <CardHeader color="primary">
                <center>
                  <h4>BEM VINDO!</h4>
                  <p className={classes.cardCategoryWhite}>Faça seu login ou registre-se</p>
                </center>
              </CardHeader>
              <CardBody>
                <GridContainer className={classes.flex}>
                  <GridItem xs={12} sm={12} md={2} />
                  <GridItem xs={12} sm={12} md={8}>
                    <CustomInput
                      labelText="CPF/CNPJ:"
                      id="cpfcnpj"
                      formControlProps={{
                        fullWidth: true,
                        onChange: this.handleAccountChange
                      }}
                      inputProps={{
                        type: "number"
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer className={classes.flex}>
                  <GridItem xs={12} sm={12} md={2} />
                  <GridItem xs={12} sm={12} md={8}>
                    <CustomInput
                      labelText="Senha"
                      id="password"
                      formControlProps={{
                        fullWidth: true,
                        onChange: this.handlePasswordChange
                      }}
                      inputProps={{
                        type: "password"
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <GridContainer style={{ flex: "1" }}>
                  <GridItem xs={12} sm={12} md={3}></GridItem>
                  <GridItem xs={12} sm={12} md={5}>
                    <Button color="transparent" onClick={this.actionShowForgetPassword}>
                      <div>
                        <a>Esqueceu sua senha?</a>
                      </div>
                    </Button>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4} className={classes.rightAlign}>
                    {/* <Link to="admin/dashboard"> */}
                      <Button color="primary" onClick={this.handleClickLogin} round>Login</Button>
                    {/* </Link> */}
                  </GridItem>
                </GridContainer>
              </CardFooter>
            </Card>
          </GridItem>
          <Dialog open={this.state.showForgetPasswordPopup} onClose={this.closeForgetPassword} aria-labelledby="form-dialog-title">
            <DialogTitle>Esqueceu sua senha?</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Tudo bem, informe seu CPF ou CNPJ que resolvemos!
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="cpf-cnpj"
                label="CPF/CNPJ"
                type="number"
                onChange={this.handleForgetCPFCNPJ}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClosePopup} color="primary">
                Cancelar
              </Button>
              <Button onClick={this.handleForgetPassword} color="primary">
                Enviar
              </Button>
            </DialogActions>}
          </Dialog>

          <Snackbar
            place="br"
            color="success"
            icon={Info}
            message="A senha foi enviada para o email cadastrado!"
            open={this.state.snackbarSuccess}
            closeNotification={this.handleCloseSuccessNotification}
            close
          />

          <Snackbar
            place="br"
            color="danger"
            icon={Info}
            message={this.state.snackMessage}
            open={this.state.snackBarFail}
            closeNotification={this.handleCloseFailNotification}
            close
          />
        </GridContainer>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Login);
