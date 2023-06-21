import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import appImg from "../assets/AppTitle.png"
import backgroundImg from "../assets/BackgroundSports.png"

// Base login/signup form layout from https://react.semantic-ui.com/layouts/login

export default function Login() {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [showAlert, setShowAlert] = useState(false);
  const [login] = useMutation(LOGIN_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setShowAlert(false)
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      Auth.login(data.login.token);
    } catch (e) {
      console.log(e);
      setShowAlert(true)
    }
    setFormState({
      username: "",
      email: "",
      password: "",
    });
  };

  const handleInputChange = (event) => {
    setShowAlert(false)
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  return (
    <>
      <Grid textAlign="center" style={{ height: "60vh", marginTop: "8em" }}>
        <Grid.Column style={{ maxWidth: 550, height: 500 }}>
          <Image centered size="large" src={appImg} />
          <Header as="h2" color="blue" textAlign="center">
            Login
          </Header>
          <Message color="yellow">
            Want to create an account? <Link to="/signup">Sign Up</Link>
          </Message>
          <Form size="large" onSubmit={handleFormSubmit}>
            <Message hidden={!showAlert} color="red">
              Please log in with a valid account!
            </Message>
            <Segment raised textAlign="left">
              <Form.Input
                fluid
                label="Email"
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                type="email"
                name="email"
                onChange={handleInputChange}
                value={formState.email}
              />
              <Form.Input
                fluid
                label="Password"
                icon="lock"
                iconPosition="left"
                placeholder="*********"
                type="password"
                name="password"
                onChange={handleInputChange}
                value={formState.password}
              />
              <Button color="green" size="large" disabled={!(formState.email && formState.password)}>
                Login
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
      <Image centered size="massive" src={backgroundImg} />
    </>
  );
}
