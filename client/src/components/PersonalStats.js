import React, { useEffect } from "react";
import {
  Button,
  Header,
  Segment,
} from "semantic-ui-react"
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { DELETE_STATS } from "../utils/mutations"

export default function PersonalStats () {

  const { loading, data, refetch } = useQuery(QUERY_ME);
  const [deleteStat] = useMutation(DELETE_STATS);

  useEffect(() => {
    if(!loading) {
      refetch();
    }
  }, [loading, refetch]);

  if (loading) {
    return (
      <Segment loading>
        Loading...
      </Segment>
    )
  }

  const deleteStatBtn = async (event) => {
    event.preventDefault();
    const { value } = event.target
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
      <Segment style={{ fontSize: "1.33em" }}>      
      {eachStat.totalPoints > 0 ? (<>Points: {eachStat.totalPoints} | </>) : (<>Points: 0 | </>)}
      {eachStat.rebounds > 0 ? (<>Rebounds: {eachStat.rebounds} | </>) : (<>Rebounds: 0 | </>)}
      {eachStat.assists > 0 ? (<>Assists: {eachStat.assists} | </>) : (<>Assists: 0 | </>)}
      {eachStat.steals > 0 ? (<>Steals: {eachStat.steals} | </>) : (<>Steals: 0 | </>)}
      {eachStat.turnovers > 0 ? (<>Turnovers: {eachStat.turnovers} | </>) : (<>Turnovers: 0 | </>)}
      {eachStat.fouls > 0 ? (<>Fouls: {eachStat.fouls} </>) : (<>Fouls: 0  </>)}
      </Segment>
    )
  }

  const cricketStats = (stat) => {
    const eachStat = stat
    return (
      <Segment style={{ fontSize: "1.33em" }}>
      {eachStat.runs > 0 ? (<>Runs: {eachStat.runs} | </>) : (<>Runs: 0 | </>)}
      {eachStat.ballsFaced > 0 ? (<>Balls Faced: {eachStat.ballsFaced} | </>) : (<>Balls Faced: 0 | </>)}
      {eachStat.sixes > 0 ? (<>Sixes: {eachStat.sixes} | </>) : (<>Sixes: 0 | </>)}
      {eachStat.overs > 0 ? (<>Overs: {eachStat.overs} | </>) : (<>Overs: 0 | </>)}
      {eachStat.wickets > 0 ? (<>Wickets: {eachStat.wickets} | </>) : (<>Wickets: 0 | </>)}
      {eachStat.runsGiven > 0 ? (<>Runs Given: {eachStat.runsGiven}  </>) : (<>Runs Given: 0 </>)}
      </Segment>
    )
  }

  const aflStats = (stat) => {
    const eachStat = stat
    return (
      <Segment style={{ fontSize: "1.33em" }}>
      {eachStat.goals > 0 ? (<>Goals: {eachStat.goals} | </>) : (<>Goals: 0 | </>)}
      {eachStat.behinds > 0 ? (<>Behinds: {eachStat.behinds} | </>) : (<>Behinds: 0 | </>)}
      {eachStat.disposals > 0 ? (<>Disposals: {eachStat.disposals} | </>) : (<>Disposals: 0 | </>)}
      {eachStat.tackles > 0 ? (<>Tackles: {eachStat.tackles} | </>) : (<>Tackles: 0 | </>)} 
      {eachStat.marks > 0 ? (<>Marks: {eachStat.marks} | </>) : (<>Marks: 0 | </>)}
      {eachStat.kicks > 0 ? (<>Kicks: {eachStat.kicks}  </>) : (<>Kicks: 0  </>)}
      </Segment>
    )
  }

  const statLoad = (user) => {
    if (user) {
      return (
        <>
        {user.stats.toReversed().map((stat) => (
        <Segment.Group key={stat._id} horizontal>
          <Segment style={{ fontSize: "1.33em" }}>
            {new Date(parseInt(stat.creationDate)).toLocaleDateString()}
          </Segment>
          <Segment style={{ fontSize: "1.33em" }}>
            {stat.sports.name}
            </Segment>
            {stat.sports.name === "Basketball" ? (<> {basketballStats(stat)}</>) : (<></>)}
            {stat.sports.name === "AFL" ? (<> {aflStats(stat)}</>) : (<></>)}
            {stat.sports.name === "Cricket" ? (<> {cricketStats(stat)}</>) : (<></>)}
          <Button value={stat._id} basic color="red" size="tiny" onClick={deleteStatBtn}>❌</Button>
        </Segment.Group>
         ))}
        </>
      )
}}


if (data) {
  const user = data?.me || data?.user
  return (
    <>
    <Header>
      {user.username}"s Personal Statistics
    </Header>
      <Segment.Group style={{ height: "80vh", overflowY: "scroll", overflowX: "scroll" }}>
        {statLoad(user)}
      </Segment.Group>
    </>

  )
}}
  

