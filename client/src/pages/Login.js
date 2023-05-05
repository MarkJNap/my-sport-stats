import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
// Base login/signup form layout from https://react.semantic-ui.com/layouts/login

export default function Login() {
  return (
    <section className="">
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 550, height: 500 }}>
          <Header as="h2" color="blue" textAlign="center">
            Login
          </Header>
          <Form size="large">
            <Segment stacked textAlign="left">
              <Form.Input
                fluid
                label="Email"
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
              />
              <Form.Input
                fluid
                label="Password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
              />
              <Button color="green" size="large">
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            Want to create an account? <Link to="/signup">Sign Up</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </section>
  );
}
