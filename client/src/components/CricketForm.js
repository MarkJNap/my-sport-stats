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

export default function CricketForm () {
  const [formState, setFormState] = useState({ 
    runs: "", ballsFaced: "", sixes: "", overs: "", wickets: "", runsGiven: ""
  })

  const [formError, setFormError] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)

  const { data:sportData } = useQuery(QUERY_SPORT, { variables: { name: "Cricket" }});
  
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
        runs: "", ballsFaced: "", sixes: "", overs: "", wickets: "", runsGiven: "",
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
    <Form size="large" id="Cricket" onSubmit={handleFormSubmit}>
      <Segment raised textAlign="left">
      <Header as="h1">Cricket</Header>
        <Form.Group widths="equal">
          <Form.Input label="Runs" placeholder="0" type="number" min="0" name="runs" value={formState.runs} onChange={handleChange}/>
          <Form.Input label="Balls Faced" placeholder="0" type="number" min="0" name="ballsFaced" value={formState.ballsFaced} onChange={handleChange}/>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input label="6s" placeholder="0" type="number" min="0" name="sixes" value={formState.sixes} onChange={handleChange}/>
          <Form.Input label="Overs" placeholder="0" type="number" min="0" name="overs" value={formState.overs} onChange={handleChange}/>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input label="Wickets" placeholder="0" type="number" min="0" name="wickets" value={formState.wickets} onChange={handleChange}/>
          <Form.Input label="Runs Given" placeholder="0" type="number" min="0" name="runsGiven" value={formState.runsGiven} onChange={handleChange}/>
        </Form.Group>
        <Button color="green" size="large" type="submit">
          Submit
        </Button>
        {formErrorFunc()}
      </Segment>
    </Form>
  )
}
