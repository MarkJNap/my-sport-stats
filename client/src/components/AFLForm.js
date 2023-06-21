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

// AFLForm, BasketballForm, and the CricketForm component are close to identical just with specific stats to each sport
// Comments will just be in this file for them
export default function AFLForm () {
  const [formState, setFormState] = useState({ 
    goals: "", behinds: "", disposals: "", tackles: "", marks: "", kicks: "",
  })

  const [formError, setFormError] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)

  // Query the sport with the name AFL
  const { data:sportData } = useQuery(QUERY_SPORT, { variables: { name: "AFL" }});
  
  const [newStats] = useMutation(ADD_NEWSTATS)

  // When the user changes the data on the form update the formState
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormError(false)
    setFormSuccess(false)
    setFormState({
      ...formState,
      [name]: value,
    });
  }

  // On submit if sportData query has data, add the stats from the formState with the id of the sport
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
        goals: "", behinds: "", disposals: "", tackles: "", marks: "", kicks: "",
      })
      setFormSuccess(true)
    }
  };

  // If the submit fails display the error message
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
    <Form size="large" id="AFL" onSubmit={handleFormSubmit}>
      <Segment raised textAlign="left">
        <Header as="h1">AFL</Header>
        <Form.Group widths="equal">
          <Form.Input label="Goals" placeholder="0" type="number" min="0" name="goals" value={formState.goals} onChange={handleChange} />
          <Form.Input label="Behinds" placeholder="0" type="number" min="0" name="behinds" value={formState.behinds} onChange={handleChange} />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input label="Disposals" placeholder="0" type="number" min="0" name="disposals" value={formState.disposals} onChange={handleChange} />
          <Form.Input label="Tackles" placeholder="0" type="number" min="0" name="tackles" value={formState.tackles} onChange={handleChange} />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input label="Marks" placeholder="0" type="number" min="0" name="marks" value={formState.marks} onChange={handleChange} />
          <Form.Input label="Kicks" placeholder="0" type="number" min="0" name="kicks" value={formState.kicks} onChange={handleChange} />
        </Form.Group>
        <Button color="green" size="large" type="submit">
          Submit
        </Button>
        {formErrorFunc()}
      </Segment>
    </Form>
  )
}