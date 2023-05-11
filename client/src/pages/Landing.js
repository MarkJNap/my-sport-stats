import React from 'react';
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import {
    Button,
    // Container,
    Grid,
    Header,
    Image,
    Segment,
  } from 'semantic-ui-react'

import { useQuery } from '@apollo/client';
import { QUERY_STATS } from '../utils/queries';
// import bballimg from "../assets/basketball.jpg"
import bballcourtimg from "../assets/basketball-court.jpg"

// Base layout from https://react.semantic-ui.com/layouts/homepage/
// Images "https://www.freepik.com/free-photo/basketball-hardwood-court-floor_8364601.htm#query=basketball&position=8&from_view=search&track=sph" Image by master1305 on Freepik
//        "https://www.freepik.com/free-photo/basketball-court-with-people-fan-sport-arena-render-3d-illustration_29155780.htm#query=basketball&position=19&from_view=search&track=sph" Image by viarprodesign on Freepik

export default function Landing() {

    const { loading, data } = useQuery(QUERY_STATS);
    const stats = data?.stats || []

    const statLoad = () => {
        if (stats) {
          return (
            <>
            {stats.toReversed().slice(0,4).map((stat) => (
            <Segment key={stat._id} style={{ fontSize: "1.33em" }}>
              {new Date(parseInt(stat.creationDate)).toLocaleDateString()} | {stat.sports.name} | {stat.userId.username} |
              {stat.sports.name === "Basketball" ? (<> {basketballStats(stat)}</>) : (<></>)}
              {stat.sports.name === "AFL" ? (<> {aflStats(stat)}</>) : (<></>)}
              {stat.sports.name === "Cricket" ? (<> {cricketStats(stat)}</>) : (<></>)}
            </Segment>
             ))}
            </>
          )
    }}

    const basketballStats = (stat) => {
        const eachStat = stat
        return (
          <>Points {eachStat.totalPoints}  | Assists: {eachStat.assists} | Steals: {eachStat.steals} </>
        )
      }
    
      const cricketStats = (stat) => {
        const eachStat = stat
        return (
          <>Runs {eachStat.runs}  | Sixes: {eachStat.sixes} | Wickets: {eachStat.wickets} </>
        )
    
      }
      const aflStats = (stat) => {
        const eachStat = stat
        return (
          <>Goals: {eachStat.goals} | Disposals: {eachStat.disposals} | Marks: {eachStat.marks}</>
        )
      }

    return (
        <div>
            <Header as='h1' style={{ fontSize: '2em', padding: '4em 0em 2em 3em'}}>
                My Sport Stats
            </Header>
            <Segment style={{ padding: '1em 0em' }} vertical>
                <Grid container stackable verticalAlign='middle'>
                    <Grid.Row>
                        <Grid.Column width={8} textAlign='center'>
                            <Header as='h3' style={{ fontSize: '2em' }}>
                                See our users newest updates!
                            </Header>
                            <Segment>
                                {loading ? (
                                    <div>
                                        Loading ...
                                    </div>
                                ) : (
                                    <div>
                                        {statLoad()}                                        
                                    </div>
                                )}                             
                            </Segment>

                        </Grid.Column>
                        <Grid.Column floated='right' width={8} textAlign='center'>
                            <Image bordered rounded size='massive' src={bballcourtimg} />
                            <Header as='h3' style={{ fontSize: '2em' }}>
                                We've made stat tracking simple
                            </Header>
                            <p style={{ fontSize: '1.33em' }} >
                                With the ability to view all your statistics you can break down easily how best to improve and hit your goals.
                            </p>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        {Auth.loggedIn() ? (
                        <Grid.Column style={{ padding: '4em 0em 0em 0em' }} textAlign='center'>
                            <Link to="/dashboard"><Button size='huge' color='green'>Continue to Profile</Button></Link>
                        </Grid.Column>
                        ) 
                        : (
                        <Grid.Column style={{ padding: '4em 0em 0em 0em' }} textAlign='center'>
                            <Link to="/signup"><Button size='huge' color='blue'>Sign Up Now!</Button></Link>
                        </Grid.Column>
                        )}
                    </Grid.Row>
                </Grid>
            </Segment>
        </div>
    )
}