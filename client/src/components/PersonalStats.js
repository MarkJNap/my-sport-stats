import React, { useEffect } from 'react';
import {
  Button,
  Header,
  // Container,
  // Grid,
  // Header,
  // Image,
  Segment,
  // Form,
  // Message,
  // SegmentGroup,
  // Select
} from 'semantic-ui-react'
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { DELETE_STATS } from '../utils/mutations'

export default function PersonalStats () {

  const { loading, data, refetch } = useQuery(QUERY_ME);

  useEffect(() => {
    if(!loading) {
      refetch();
    }
  }, []);

  const [deleteStat] = useMutation(DELETE_STATS);

  const deleteStatBtn = async (event) => {
    event.preventDefault();
    const { value } = event.target
    // console.log(value);
    try {
      await deleteStat({
        variables: { statsId: value },
      });
    } catch (e) {
      console.log(e);
    }
    window.location.reload();
  }



  const basketballStats = (stat) => {
    const eachStat = stat
    return (
      <>Points {eachStat.totalPoints}  | Rebounds: {eachStat.rebounds} | Assists: {eachStat.assists} | Steals: {eachStat.steals} | Turnovers: {eachStat.turnovers} | Fouls: {eachStat.fouls} </>
    )
  }

  const cricketStats = (stat) => {
    const eachStat = stat
    return (
      <>Runs {eachStat.runs}  | Balls Faced: {eachStat.ballsFaced} | Sixes: {eachStat.sixes} | Overs: {eachStat.overs} | Wickets: {eachStat.wickets} | Runs Given: {eachStat.runsGiven} </>
    )

  }
  const aflStats = (stat) => {
    const eachStat = stat
    return (
      <>Goals: {eachStat.goals}  | Behinds: {eachStat.behinds} | Disposals: {eachStat.disposals} | Tackles: {eachStat.tackles} | Marks: {eachStat.marks} | Kicks: {eachStat.kicks} </>
    )
  }

  const statLoad = (user) => {
    if (user) {
      // console.log(user);
      return (
        <>
        {user.stats.toReversed().map((stat) => (
        <Segment.Group key={stat._id} horizontal>
        <Segment  style={{ fontSize: "1.33em" }}>
          {new Date(parseInt(stat.creationDate)).toLocaleDateString()} | {stat.sports.name} | 
          {stat.sports.name === "Basketball" ? (<> {basketballStats(stat)}</>) : (<></>)}
          {stat.sports.name === "AFL" ? (<> {aflStats(stat)}</>) : (<></>)}
          {stat.sports.name === "Cricket" ? (<> {cricketStats(stat)}</>) : (<></>)}
        </Segment>
        <Segment>
          <Button value={stat._id} basic color='red' onClick={deleteStatBtn}>❌</Button> 
        </Segment>
        </Segment.Group>
         ))}
        </>
      )
}}

if (loading) {
  return <div>Loading...</div>;
}

if (!loading) {
  const user = data?.me || data?.user
  // console.log(user.stats);
  return (
    <>
    <Header>
      {user.username}'s Personal Statistics
    </Header>
      <Segment.Group style={{ height: "80vh", overflowY: "scroll", overflowX: "scroll" }}>
        {statLoad(user)}
      </Segment.Group>
    </>

  )
}}
  

