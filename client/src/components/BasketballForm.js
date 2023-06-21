import React, { useState } from "react";
import {
  Button,
  Header,
  Segment,
  Form,
  Message,
} from "semantic-ui-react"
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_SPORT } from "../utils/queries";
import { ADD_NEWSTATS } from "../utils/mutations";

export default function BasketballForm () {
  const [formState, setFormState] = useState({ 
    totalPoints: "", rebounds: "", assists: "", steals: "", turnovers: "", fouls: "",
  })

  const [formError, setFormError] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)

  const { data:sportData } = useQuery(QUERY_SPORT, { variables: { name: "Basketball" }});
  
  const [newStats] = useMutation(ADD_NEWSTATS)

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormError(false)
    setFormSuccess(false)
    setFormState({
      ...formState,
      [name]: value,
    });
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (sportData) {
      try {
        await newStats({
          variables: { input: { ...formState, sports: sportData.sport._id } },
        });
      } catch (e) {
        console.log(e);
        setFormError(true)
        return
      }
      setFormState({
        totalPoints: "", rebounds: "", assists: "", steals: "", turnovers: "", fouls: "",
      })
      setFormSuccess(true)
    }
  };

  const formErrorFunc = () => {
    if (formError) {
      return <Message color="red">
      There was an error, please refresh and try again
    </Message>
    } else if (formSuccess) {
      return <Message color="green">
      Stats succesfully submitted!
    </Message>
    }
  }

  return (
    <Form size="large" id="Basketball" onSubmit={handleFormSubmit}>
      <Segment raised textAlign="left">
        <Header as="h1">Basketball</Header>
        <Form.Group widths="equal">
          <Form.Input label="Points" placeholder="0" type="number" min="0" name="totalPoints" value={formState.totalPoints} onChange={handleChange} />
          <Form.Input label="Rebounds" placeholder="0" type="number" min="0" name="rebounds" value={formState.rebounds} onChange={handleChange} />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input label="Assists" placeholder="0" type="number" min="0" name="assists" value={formState.assists} onChange={handleChange} />
          <Form.Input label="Steals" placeholder="0" type="number" min="0" name="steals" value={formState.steals} onChange={handleChange} />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input label="Turnovers" placeholder="0" type="number" min="0" name="turnovers" value={formState.turnovers} onChange={handleChange} />
          <Form.Input label="Fouls" placeholder="0" type="number" min="0" name="fouls" value={formState.fouls} onChange={handleChange} />
        </Form.Group>
        <Button color="green" size="large" type="submit">
          Submit
        </Button>
        {formErrorFunc()}
      </Segment>
    </Form>
  )
}
