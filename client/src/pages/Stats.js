import React, { useState } from "react";
import {
    Button,
    Grid,
    Header,
    Segment,
  } from "semantic-ui-react"
import PersonalStats from "../components/PersonalStats";
import GlobalStats from "../components/GlobalStats";

export default function Stats() {
    const [statType, setStatType] = useState("personal")

    const handleStatType = (event) => {
        event.preventDefault();
        const { value } = event.target
        setStatType(value)
      }


    const statLoad = () => {
        if (statType === "personal") {
          return <PersonalStats />
        } else if (statType === "global") {
          return <GlobalStats />
        } else {
          return <Segment>
            <Header as="h1">Please select a leaderboard</Header>
          </Segment>
        }
    }

  return (
    <Segment style={{ padding: "1em 0em", height: "100vh" }} vertical >
      <Grid container stackable verticalAlign="middle" textAlign="center">
        <Grid.Row>
          <Grid.Column width={14} style={{ padding: "1em 0em" }}>
            <Grid verticalAlign="middle">
              <Grid.Column>
                <Segment raised>
                  <Button color="orange" size="medium" value="personal" onClick={handleStatType}>
                    Personal
                  </Button>
                  <Button color="green" size="medium" value="global" onClick={handleStatType}>
                    Global
                  </Button>
                    {statLoad()}
                </Segment>
              </Grid.Column>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
}

