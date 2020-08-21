import React, {Component} from 'react';
import {
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  NavItem,
  Jumbotron,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col
} from 'reactstrap';
import {NavLink} from 'react-router-dom';
import logo from '../assets/images/VCBallers_Logo-flat.png';
import '../App.css';
import Signin from "../user/SigninComponent";
import LinkButton from "../core/LinkButtonComponent";

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggleNav = this.toggleNav.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.state = {
      isNavOpen: false,
      isModalOpen: false
    };
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    });
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleLogin(event) {
    this.toggleModal();
    alert("Username: " + this.username.value + " Password: " + this.password.value + " Remember: " + this.remember.checked);
    event.preventDefault();
  }

  render() {
    return (
        <div className="jumbotron align-items-center"
             style={{backgroundColor: "black", height: "2em", padding: "0em 0em 4.25em 0em", borderRadius: "0px"}}>
          <div className="container mr-0 ml-0" style={{minWidth: "100%"}}>
            <Row>
              <Navbar dark expand="md" className="w-100">
                <NavbarToggler onClick={this.toggleNav}/>
                <Col md={4}>
                  <NavbarBrand className="mobile-header-logo ml-md-0 d-none d-md-block" href="/"><img src={logo} width="25%" alt='VC Ballers company'/></NavbarBrand>
                </Col>
                <Col md={4} className="align-items-md-center">
                  <Collapse isOpen={this.state.isNavOpen} navbar>
                    <Nav navbar className="mr-auto ml-auto">
                      <NavItem>
                        <NavLink className="nav-link" to='/'><span
                            className="fa fa-home fa-lg"></span> Home</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink className="nav-link" to='/aboutus'><span className="fa fa-info fa-lg"></span> About
                          Us</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink className="nav-link" to='/menu'><span
                            className="fa fa-list fa-lg"></span> Menu</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink className="nav-link" to='/contactus'><span
                            className="fa fa-address-card fa-lg"></span> Contact Us</NavLink>
                      </NavItem>
                    </Nav>
                  </Collapse>
                </Col>
                <Col md={4} style={{textAlign: "right", marginRight: "0"}}>
                  <LinkButton to='/signin'>Login</LinkButton>
                  {/*<Button outline onClick={this.toggleModal}>*/}
                  {/*  <span className="fa fa-sign-in fa-lg text-white"> Login</span>*/}
                  {/*</Button>*/}
                </Col>
              </Navbar>
            </Row>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
              <ModalBody>
                <Form onSubmit={this.handleLogin}>
                  <FormGroup>
                    <Label htmlFor="username">Username</Label>
                    <Input type="text" id="username" name="username" innerRef={(input) => this.username = input}/>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input type="text" id="password" name="password" innerRef={(input) => this.password = input}/>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input type="checkbox" name="remember" innerRef={(input) => this.remember = input}/>
                      Remember Me
                    </Label>
                  </FormGroup>
                  <Button type="submit" value="submit" className="btn btn-danger mt-2">Login</Button>
                </Form>
              </ModalBody>
            </Modal>
          </div>
        </div>
    );
  }
}

export default Header;
