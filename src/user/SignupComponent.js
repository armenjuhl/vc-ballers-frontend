import React, {Component} from 'react';
import {Button, Label, Col, Row, Input} from 'reactstrap';
import Header from "../core/HeaderComponent";
import '../App.css';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      verifyPassword: "",
      error: "",
      open: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.signup = this.signup.bind(this);
  };

  handleChange = (name) => (event) => {
    this.setState({[name]: event.target.value})
  };

  handleSubmit = event => {
    event.preventDefault();
    // event.persist();
    const {firstName, lastName, email, password, verifyPassword} = this.state;
    if (password !== verifyPassword) return this.setState({error: "Passwords do not match"});
    const name = `${firstName} ${lastName}`;
    const user = {
      name,
      email,
      password
    };
    this.signup(user)
        .then(data => {
          if (data.error) this.setState({error: data.error});
          else this.setState({
                error: "",
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                verifyPassword: "",
                open: true
              });
          console.log(JSON.stringify(user));
        });
  };

  signup = user => {
    return fetch("http://localhost:8080/signup", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
        .then(response => {
          // event.target.reset();
          return response.json();
        })
        .catch(err => console.log(err))
  };

  signupForm = (firstName, lastName, email, password, verifyPassword) => {
    return(
    <React.Fragment>
    <Row>
      <Col md={12}>
        <form id="signup-form" onSubmit={(values) => this.handleSubmit(values)}>
          <Row className="form-group">
            <Label htmlFor="name" md={4}>First Name</Label>
            <Col md={8}>
              <Input id="firstName"
                     value={firstName}
                     name="firstName"
                     placeholder="First Name"
                     className="form-control"
                     type="text"
                     onChange={this.handleChange("firstName")}
              />
            </Col>
          </Row>
          <Row className="form-group">
            <Label htmlFor="name" md={4}>Last Name</Label>
            <Col md={8}>
              <input id="lastName"
                     value={lastName}
                     name="lastName"
                     placeholder="Last Name"
                     className="form-control"
                     type="text"
                     onChange={this.handleChange("lastName")}
              />
            </Col>
          </Row>
          <Row className="form-group">
            <Label htmlFor="email" md={4}>Email</Label>
            <Col md={8}>
              <input id="email"
                     name="email"
                     type="email"
                     className="form-control"
                     value={email}
                     placeholder="Email"
                     onChange={this.handleChange("email")}
              />
            </Col>
          </Row>
          <Row className="form-group">
            <Label htmlFor="password" md={4}>Password</Label>
            <Col md={8}>
              <input id="password"
                     name="password"
                     type="password"
                     className="form-control"
                     value={password}
                     placeholder="Password"
                     onChange={this.handleChange("password")}
              />
            </Col>
          </Row>
          <Row className="form-group">
            <Label htmlFor="verifyPassword" md={4}>Verify Password</Label>
            <Col md={8}>
              <input id="verifyPassword"
                     name="verifyPassword"
                     type="password"
                     className="form-control"
                     value={verifyPassword}
                     placeholder="Verify Password"
                     onChange={this.handleChange("verifyPassword")}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Button onClick={this.handleSubmit} className="btn btn-raised btn-primary">
                Submit
              </Button>
            </Col>
          </Row>
        </form>
      </Col>
    </Row>
    </React.Fragment>
    )
  };

  render() {
    const {firstName, lastName, email, password, verifyPassword, error, open} = this.state;
    return (
        <>
          <Header/>
          <div className="container">
            <Row>
              <Col md={12}>
                <h2 className="mt-5 mb-5">Signup</h2>
                <div className="alert alert-danger ml--15"
                     style={{display: error ? "" : "none"}}>
                  {error}
                </div>
                <div className="alert alert-info ml--15"
                     style={{display: open ? "" : "none"}}>
                  New account successfully created
                </div>
              </Col>
                {this.signupForm(firstName, lastName, email, password, verifyPassword)}
            </Row>
          </div>
        </>
    );
  }
}

export default Signup;
