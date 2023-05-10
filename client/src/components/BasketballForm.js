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

export default function BasketballForm () {
  const [formState, setFormState] = useState({ 
    totalPoints: '', rebounds: '', assists: '', steals: '', turnovers: '', fouls: '',
  })

  const { data:sportData } = useQuery(QUERY_SPORT, { variables: { name: "Basketball" }});
  
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
  };

  return (
    <Form size="large" id="Basketball" onSubmit={handleFormSubmit}>
      <Segment stacked textAlign="left">
      <Header as="h1">Basketball</Header>
        <Form.Group width="equal">
          <Form.Input label='Points' name='totalPoints' placeholder='0' type="number" min="0" value={formState.totalPoints} onChange={handleChange}/>
          <Form.Input label='Rebounds' name='rebounds' placeholder='0' type="number" min="0" value={formState.rebounds} onChange={handleChange}/>
          <Form.Input label='Assists' name='assists' placeholder='0' type="number" min="0" value={formState.assists} onChange={handleChange}/>
        </Form.Group>
        <Form.Group>
          <Form.Input label='Steals' name='steals' placeholder='0' type="number" min="0" value={formState.steals} onChange={handleChange}/>
          <Form.Input label='Turnovers' name='turnovers' placeholder='0' type="number" min="0" value={formState.turnovers} onChange={handleChange}/>
          <Form.Input label='Fouls' name='fouls' placeholder='0' type="number" min="0" value={formState.fouls} onChange={handleChange}/>
        </Form.Group>
        <Button color="green" size="large">
          Submit
        </Button>
      </Segment>
    </Form>
  )
}
