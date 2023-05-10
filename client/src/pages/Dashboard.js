import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import BasketballForm from "../components/BasketballForm";
import AFLForm from "../components/AFLForm";
import CricketForm from "../components/CricketForm";
import {
    Button,
    // Container,
    Grid,
    Header,
    // Image,
    Segment,
    // Form,
    // Message,
    // Select
  } from 'semantic-ui-react'

export default function Dashboard() {
    const [formType, setFormType] = useState('')

    // Changes the formType depending on the event
    const handleSportForm = (event) => {
      event.preventDefault();
      const { value } = event.target
      setFormType(value)
    }

  const { _id: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { _id: userParam },
  });

  const user = data?.me || data?.user || {};

  // If the user is not authenticated/logged in redirect to the login page
  if (!(Auth.loggedIn())) {
    return <Navigate to="/login" />
  }

  // Displayed if the page is still loading the user data
  if (loading) {
    return <div>Loading...</div>;
  }

  // Loads the appropriate form based on the formType
  const FormLoad = () => {
    if (formType === 'Basketball') {
      return <BasketballForm />
    } else if (formType === 'AFL') {
      return <AFLForm />
    } else if (formType === 'Cricket') {
      return <CricketForm />
    } else {
      return <Segment>
        <Header as="h1">Please select a sport to load a form</Header>
      </Segment>
    }
}
    
  return (
      <Segment style={{ padding: "8em 0em", height: "100vh" }} vertical>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={5} textAlign="center">
              <Header as="h3" style={{ fontSize: "2em" }}>
                Most recent sports
              </Header>
              <Segment>
                {user.stats.toReversed().slice(0,6).map((stat) => (
                     <p key={stat._id} style={{ fontSize: "1.33em" }}>
                         {new Date(parseInt(stat.creationDate)).toLocaleDateString()} | {stat.sports.name}
                    </p>
                ))}
              </Segment>
            </Grid.Column>
            <Grid.Column floated="right" width={10} textAlign="center" style={{ padding: '4em 0em 0em 0em'}}>
                <Grid textAlign="center" verticalAlign="middle">
                  <Grid.Column >
                      <Segment textAlign="center">
                         <Button  color="orange" size="medium" value="Basketball" onClick={handleSportForm}>
                          Basketball
                        </Button>
                        <Button  color="green" size="medium" value="AFL" onClick={handleSportForm}>
                          AFL
                        </Button>
                        <Button  color="yellow" size="medium" value="Cricket" onClick={handleSportForm}>
                          Cricket
                        </Button>
                      </Segment>
                      {FormLoad()} 
                  </Grid.Column>
                </Grid>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row></Grid.Row>
        </Grid>
      </Segment>
  );
}