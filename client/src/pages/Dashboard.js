import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import {
    Button,
    // Container,
    Grid,
    Header,
    // Image,
    Segment,
    Form,
    // Message,
    // Select
  } from 'semantic-ui-react'


export default function Dashboard() {
    const [handleFormType, setHandleFormType] = useState('')

    const handleSportForm = (event) => {
        const { key, value } = event.target
    }

  const { _id: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { _id: userParam },
  });

  const user = data?.me || data?.user || {};

  if (!(Auth.loggedIn())) {
    return <Navigate to="/login" />
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const options = [
    { key: 'Basketball', text: 'Basketball', value: 'basketball' },
    { key: 'AFL', text: 'AFL', value: 'afl' },
    { key: 'Cricket', text: 'Cricket', value: 'cricket' },
  ]

  return (
      <Segment style={{ padding: "8em 0em", height: "100vh" }} vertical>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={5} textAlign="center">
              <Header as="h3" style={{ fontSize: "2em" }}>
                Most recent sports
              </Header>
              <Segment>
                {user.stats.slice(0,6).map((stat) => (
                    <p key={stat._id} style={{ fontSize: "1.33em" }}> 
                        {new Date(parseInt(stat.creationDate)).toLocaleDateString()} | {stat.sport.name}
                    </p>
                ))}
              </Segment>
            </Grid.Column>
            <Grid.Column floated="right" width={8} textAlign="center">
              <section className="">
                <Grid textAlign="center" verticalAlign="middle">
                  <Grid.Column >
                    <Form size="large">
                      <Segment stacked textAlign="left">
                        <Form.Select
                            width={6}
                            label='Pick a sport:'
                            options={options}
                            // value={}
                            placeholder='Sport'
                            onChange={handleSportForm}
                        />
                        <Form.Input
                          fluid
                          label="Email"
                          icon="user"
                          iconPosition="left"
                          placeholder="E-mail address"
                          type="email"
                          name="email"
                        />
                        <Form.Input
                          fluid
                          label="Password"
                          icon="lock"
                          iconPosition="left"
                          placeholder="*********"
                          type="password"
                          name="password"
                        />
                        <Button color="green" size="large">
                          Submit
                        </Button>
                      </Segment>
                    </Form>
                  </Grid.Column>
                </Grid>
              </section>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row></Grid.Row>
        </Grid>
      </Segment>
  );
}