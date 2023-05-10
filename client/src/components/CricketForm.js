import React, { useState } from 'react';
import {
  Button,
  // Container,
  // Grid,
  Header,
  // Image,
  Segment,
  Form,
  // Message,
  // Select
} from 'semantic-ui-react'
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_SPORT } from '../utils/queries';
import { ADD_NEWSTATS } from '../utils/mutations';

export default function CricketForm () {
  const [formState, setFormState] = useState({ 
    runs: '', ballsFaced: '', sixes: '', overs: '', wickets: '', runsGiven: ''
  })

  const { data:sportData } = useQuery(QUERY_SPORT, { variables: { name: "Cricket" }});
  
  const [newStats] = useMutation(ADD_NEWSTATS)

  const handleChange = (event) => {
    const { name, value } = event.target;
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
      }
    }
    setFormState({
      runs: '', ballsFaced: '', sixes: '', overs: '', wickets: '', runsGiven: ''
    })
  };

  return (
    <Form size="large" id="Cricket" onSubmit={handleFormSubmit}>
      <Segment stacked textAlign="left">
      <Header as="h1">Cricket</Header>
        <Form.Group width="equal">
          <Form.Input label='Runs' placeholder='0' type="number" min="0" name='runs' value={formState.runs} onChange={handleChange}/>
          <Form.Input label='Balls Faced' placeholder='0' type="number" min="0" name='ballsFaced' value={formState.ballsFaced} onChange={handleChange}/>
          <Form.Input label='6s' placeholder='0' type="number" min="0" name='sixes' value={formState.sixes} onChange={handleChange}/>
        </Form.Group>
        <Form.Group>
          <Form.Input label='Overs' placeholder='0' type="number" min="0" name='overs' value={formState.overs} onChange={handleChange}/>
          <Form.Input label='Wickets' placeholder='0' type="number" min="0" name='wickets' value={formState.wickets} onChange={handleChange}/>
          <Form.Input label='Runs Given' placeholder='0' type="number" min="0" name='runsGiven' value={formState.runsGiven} onChange={handleChange}/>
        </Form.Group>
        <Button color="green" size="large">
          Submit
        </Button>
      </Segment>
    </Form>
  )
}
