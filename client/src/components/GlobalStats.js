import React from 'react';
import {
  // Button,
  // Container,
  // Grid,
  Header,
  // Image,
  Segment,
  // Form,
  // Message,
  // Select
} from 'semantic-ui-react'
import { useQuery } from '@apollo/client';
import { QUERY_STATS } from '../utils/queries';

export default function GlobalStats () {

  const { loading:statsLoading, data:statsData } = useQuery(QUERY_STATS);
  const stats = statsData?.stats || []

  if (statsLoading) {
    return <div>Loading...</div>;
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

  const statLoad = () => {
    if (stats) {
      return (
        <>
        {stats.toReversed().map((stat) => (
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

  return (
    <>
    <Header>
      All Users Statistics
    </Header>
      <Segment.Group style={{ height: "80vh", overflowY: "scroll", overflowX: "scroll" }}>
      {statLoad()}
    </Segment.Group>
    </>


  )
}
