import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import BasketballForm from "../components/BasketballForm";
import AFLForm from "../components/AFLForm";
import CricketForm from "../components/CricketForm";
import DashboardData from "../components/DashboardData";

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

    const [formType, setFormType] = useState('Basketball')

    // Changes the formType depending on the event
    const handleSportForm = (event) => {
      event.preventDefault();
      const { value } = event.target
      setFormType(value)
    }

    const { loading, data, refetch } = useQuery(QUERY_ME);
    const user = data?.me || [];
  
    useEffect(() => {
      if(!loading) {
        refetch();
      }
    }, [loading, refetch]);

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
      <Segment style={{ paddingTop: "8em", height: "100vh" }} vertical>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={5} textAlign="center">
              <DashboardData user={user} />
            </Grid.Column>
            <Grid.Column width={11} textAlign="center" style={{ padding: '4em 2em 0em 4em'}}>
                <Grid textAlign="center" verticalAlign="middle">
                  <Grid.Column >
                      <Segment textAlign="center">
                        <Header as="h2">Please select a sport to enter your stats</Header>
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