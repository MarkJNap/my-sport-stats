import React from "react";
import {
  Container,
  List,
  Segment,
  Icon
} from "semantic-ui-react"
// Base footer design from https://react.semantic-ui.com/layouts/fixed-menu/

export default function Footer() {
  return (
    <Segment vertical style={{ marginTop: "2em", paddingTop: "1em", background: "#8A8A8A", left: "0", bottom: "0", width: "100%" }}>
      <Container textAlign="center">
        <List horizontal divided link size="large">
          <List.Item style={{ color: "white", fontSize: "14px" }} as="a" href="https://www.linkedin.com/in/mark-napolitano/" target="_blank"><Icon fitted color="black" name="linkedin" />
            Made by Mark Napolitano
          </List.Item>
          <List.Item style={{ color: "white", fontSize: "14px" }} as="a" href="https://github.com/MarkJNap/my-sport-stats" target="_blank"><Icon fitted color="black" name="github" />
            Github
          </List.Item>
          <List.Item style={{ color: "white", fontSize: "14px" }} as="a" href="mailto:156marknap@gmail.com"><Icon fitted color="black" name="mail" />
            Contact Me
          </List.Item>
        </List>
      </Container>
    </Segment>
  )
}