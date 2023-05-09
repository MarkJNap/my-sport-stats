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
    // console.log(data);

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
                                        {stats.toReversed().slice(0,6).map((stat) => (
                                        <p key={stat._id} style={{ fontSize: "1.33em" }}>
                                            {stat.userId.username}| {stat.sport.name} 
                                            {stat.totalPoints ? (
                                                <>
                                                | Points: {stat.totalPoints} 
                                                </>
                                            ) : (
                                            <>
                                            
                                            </>)}
                                            {stat.assists ? (
                                                <>
                                                | Assists: {stat.assists}
                                                </>
                                            ) : (
                                            <>
                                            </>)}
                                            {stat.rebounds ? (
                                                <>
                                                | Rebounds: {stat.rebounds}
                                                </>
                                            ) : (
                                            <>
                                            </>)}
                                        </p>
                                        ))} 
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