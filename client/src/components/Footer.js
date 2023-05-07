import React from 'react';
import {
    Container,
    // Image,
    List,
    Segment,
  } from 'semantic-ui-react'
// Base footer design from https://react.semantic-ui.com/layouts/fixed-menu/

export default function Footer() {
    return (
        <Segment vertical style={{ margin: '3em 0em 0em', padding: '2em 0em' }}>
        <Container textAlign='center'>
          {/* <Image centered size='mini' src='/logo.png' /> */}
          <List horizontal divided link size='large'>
            <List.Item>
              Made by Mark Napolitano
            </List.Item>
            <List.Item as='a' href='https://github.com/MarkJNap/project-3' target="_blank">
            Github
            </List.Item>
            <List.Item as='a' href='mailto:156marknap@gmail.com'>
            Contact Me
            </List.Item>
          </List>
        </Container>
      </Segment>
    )
}