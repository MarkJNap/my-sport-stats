import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";

import appname from "../assets/AppNameLogo.png"
import backgroundimg2 from "../assets/backgroundsports.png"

// Base login/signup form layout from https://react.semantic-ui.com/layouts/login

export default function Signup() {
  const [formState, setFormState] = useState({ username: '', email: '', password: ''})
  const [addUser] = useMutation(ADD_USER);

  // TODO: Add client side validation
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addUser({
        variables: { ...formState },
      });
      Auth.login(data.addUser.token);

    } catch (e) {
      console.error(e);
    }
    setFormState({
      username: '',
      email: '',
      password: '',
    });
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  return (
    <>
      <Grid textAlign="center" style={{ height: "60vh", marginTop: "8em" }}>
        <Grid.Column style={{ maxWidth: 550, height: 500 }}>
        <Image centered size="large" src={appname} />
          <Header as="h2" color="blue" textAlign="center">
            Create an account
          </Header>
          <Message color="yellow">
            Already have an account? <Link to="/login">Login Here</Link>
          </Message>
          <Form size="large" onSubmit={handleFormSubmit}>
            <Segment raised textAlign="left">
              <Form.Input
                fluid
                label="Username"
                icon="user"
                iconPosition="left"
                placeholder="User"
                type="text"
                name="username"
                onChange={handleInputChange}
              />
              <Form.Input
                fluid
                label="Email"
                icon="mail"
                iconPosition="left"
                placeholder="E-mail address"
                type="email"
                name="email"
                onChange={handleInputChange}
              />
              <Form.Input
                fluid
                label="Password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                name="password"
                onChange={handleInputChange}
              />
              <Button color="green" size="large" disabled={!(formState.username && formState.email && formState.password)}>
                Sign Up
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
      <Image centered size="massive" src={backgroundimg2} />
    </>
  );
}
