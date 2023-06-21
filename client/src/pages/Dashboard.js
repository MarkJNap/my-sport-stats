import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Auth from "../utils/auth";
import BasketballForm from "../components/BasketballForm";
import AFLForm from "../components/AFLForm";
import CricketForm from "../components/CricketForm";
import DashboardStats from "../components/DashboardData";
import {
    Button,
    Grid,
    Header,
    Image,
    Segment,
  } from "semantic-ui-react"
  import appImg from "../assets/AppTitle.png"

export default function Dashboard() {

  const [formType, setFormType] = useState("Basketball")

  // Changes the formType depending on the event
  const handleSportForm = (event) => {
    event.preventDefault();
    const { value } = event.target
    setFormType(value)
  }

  // If the user is not authenticated/logged in redirect to the login page
  if (!(Auth.loggedIn())) {
    return <Navigate to="/login" />
  }

  // Loads the appropriate form based on the formType
  const formLoad = () => {
    if (formType === "Basketball") {
      return <BasketballForm />
    } else if (formType === "AFL") {
      return <AFLForm />
    } else if (formType === "Cricket") {
      return <CricketForm />
    } else {
      return (
      <Segment>
        <Header as="h1">Please select a sport to load a form</Header>
      </Segment>
      );
    }
  }
    
  return (
    <Segment style={{ paddingTop: "4em", height: "100vh" }} vertical>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={6} textAlign="center">
          <Image centered size="large" src={appImg} style={{ paddingBottom: "4em" }} />
            <DashboardStats />
          </Grid.Column>
          <Grid.Column width={10} textAlign="center" style={{ padding: "4em 2em 0em 4em" }}>
            <Grid textAlign="center" verticalAlign="middle">
              <Grid.Column >
                <Segment textAlign="center">
                  <Header as="h2">
                    Please select a sport to enter your stats
                  </Header>
                  <Button color="orange" size="medium" value="Basketball" onClick={handleSportForm}>
                    Basketball
                  </Button>
                  <Button color="red" size="medium" value="AFL" onClick={handleSportForm}>
                    AFL
                  </Button>
                  <Button color="yellow" size="medium" value="Cricket" onClick={handleSportForm}>
                    Cricket
                  </Button>
                </Segment>
                {formLoad()}
              </Grid.Column>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
}