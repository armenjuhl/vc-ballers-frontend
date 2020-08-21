import React, {Component} from 'react';
import Header from "../core/HeaderComponent";
import {Button, Row, Col, Label} from 'reactstrap';
import {Redirect} from "react-router-dom";

class SigninComponent extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: "",
      redirectToReferer: false,
      loading: false
    }
  }
  handleChange = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  authenticate = (jwt, next) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("jwt", JSON.stringify(jwt));
      next();
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({loading: true});
    const { email, password } = this.state;
    const credentials = {email, password};
    this.signin(credentials)
        .then(data => {
          if (data.error) {
            this.setState({ error: data.error, loading: false });
          } else {
            this.authenticate(data, () => {
              this.setState({redirectToReferer: true })
          });
          }
        console.log(JSON.stringify(credentials));
        });
  };

  signin = (credentials) => {
    return fetch("http://localhost:8080/signin", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    })
        .then(response => {
          // event.target.reset();
          return response.json();
        })
        .catch(err => console.log(err))
  };

  signinForm = (email, password) => {
    return(
        <React.Fragment>
          <Row>
            <Col md={12}>
              <form id="signin-form" onSubmit={(values) => this.handleSubmit(values)}>
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
    const {email, password, error, redirectToReferer} = this.state;

    if (redirectToReferer) {
      return <Redirect to="/" />
    }
    return (
        <>
          <Header/>
          <div className="container">
            <Row>
              <Col md={12}>
                <h2 className="mt-5 mb-5">Signin</h2>
                <div className="alert alert-danger ml--15"
                     style={{display: error ? "" : "none"}}>
                  {error}
                </div>
              </Col>
              {this.signinForm(email, password)}
            </Row>
          </div>
        </>
    );
  }
}

export default SigninComponent;
