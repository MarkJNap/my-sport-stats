import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import {
    Button,
    // Container,
    Grid,
    Header,
    Image,
    Segment,
    Icon,
  } from 'semantic-ui-react'

import { useQuery } from '@apollo/client';
import { QUERY_STATS } from '../utils/queries';

// import bballimg from "../assets/basketball.jpg"
import bballcourtimg from "../assets/basketball-court.jpg"
import cricketimg from "../assets/cricketimg.jpg"
import appname from "../assets/AppNameLogo.png"


// Base layout from https://react.semantic-ui.com/layouts/homepage/
// Images "https://www.freepik.com/free-photo/basketball-hardwood-court-floor_8364601.htm#query=basketball&position=8&from_view=search&track=sph" Image by master1305 on Freepik
//        "https://www.freepik.com/free-photo/basketball-court-with-people-fan-sport-arena-render-3d-illustration_29155780.htm#query=basketball&position=19&from_view=search&track=sph" Image by viarprodesign on Freepik

export default function Landing() {

  const { loading, data, refetch } = useQuery(QUERY_STATS);
  const stats = data?.stats || []

  useEffect(() => {
    if (!loading) {
      refetch();
    }
  }, [loading, refetch]);

  const statLoad = () => {
    if (stats) {
      return (
        <>
          {stats.toReversed().slice(0, 5).map((stat) => (
            <Segment color='red' key={stat._id} style={{ fontSize: "1.5em", borderColor: "red" }}>
              {new Date(parseInt(stat.creationDate)).toLocaleDateString()} | {stat.sports.name} | {stat.userId.username} <br></br>
              {stat.sports.name === "Basketball" ? (<> {basketballStats(stat)}</>) : (<></>)}
              {stat.sports.name === "AFL" ? (<> {aflStats(stat)}</>) : (<></>)}
              {stat.sports.name === "Cricket" ? (<> {cricketStats(stat)}</>) : (<></>)}
            </Segment>
          ))}
        </>
      )
    }
  }

  const basketballStats = (stat) => {
    const eachStat = stat
    return (
      <>
        {eachStat.totalPoints > 0 ? (<>Points: {eachStat.totalPoints} <br></br></>) : (<></>)}
        {eachStat.assists > 0 ? (<>Assists: {eachStat.assists} <br></br></>) : (<></>)}
        {eachStat.steals > 0 ? (<>Steals: {eachStat.steals} <br></br></>) : (<></>)}
      </>
    )
  }

  const cricketStats = (stat) => {
    const eachStat = stat
    return (
      <>
        {eachStat.runs > 0 ? (<>Runs: {eachStat.runs} <br></br></>) : (<></>)}
        {eachStat.sixes > 0 ? (<>Sixes: {eachStat.sixes} <br></br></>) : (<></>)}
        {eachStat.wickets > 0 ? (<>Wickets: {eachStat.wickets} <br></br></>) : (<></>)}
      </>
    )

  }

  const aflStats = (stat) => {
    const eachStat = stat
    return (
      <>
        {eachStat.goals > 0 ? (<>Goals: {eachStat.goals} <br></br></>) : (<></>)}
        {eachStat.disposals > 0 ? (<>Disposals: {eachStat.disposals} <br></br></>) : (<></>)}
        {eachStat.marks > 0 ? (<>Marks: {eachStat.marks} <br></br></>) : (<></>)}
      </>
    )
  }

  return (
    <>
      <Segment style={{ minHeight: "100vh", padding: '3em 0em 0em 0em' }} vertical>
        <Grid container stackable>
          <Grid.Row>
            <Grid.Column width={8} textAlign='center' style={{ padding: "0em 2em 0em 0em "}}>
              <Image centered size="large" src={appname} />
              <Header as='h3' style={{ fontSize: '2.5em', marginTop: "2em", textDecoration: "underline" }}>
                See our users latest updates!
              </Header>
              <Segment basic style={{ borderColor: "black" }}>
                {loading ? (
                  <Segment loading>
                    Loading ...
                  </Segment>
                ) : (
                  <>
                    {statLoad()}
                  </>
                )}
              </Segment>

            </Grid.Column>
            <Grid.Column width={8} textAlign='center'>
              <Image rounded centered size='massive' src={bballcourtimg} />
              <Header as='h3' style={{ fontSize: '2em' }}>
                We've made stat tracking straight forward
              </Header>
              <p style={{ fontSize: '1.33em' }} >
                With the ability to track your statistics you can break down easily how best to improve and hit your goals.<br></br>
                Using our technology users can even view their friends stats to compete for the top scores. 
              </p>
              {Auth.loggedIn() ? (
                <Grid.Column style={{ padding: '2em 0em' }} textAlign='center'>
                  <Link to="/dashboard"><Button size='huge' color='blue'>View your Profile</Button></Link>
                </Grid.Column>
              ) : (
                <Grid.Column style={{ padding: '1em 0em' }} textAlign='center'>
                  <Link to="/signup"><Button size='huge' color='green'>Sign Up Now!</Button></Link>
                </Grid.Column>
              )}
              <Image rounded centered size='large' src={cricketimg} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </>
  )
}