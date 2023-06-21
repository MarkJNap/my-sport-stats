import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import {
  Button,
  Header,
  Segment,
  Icon
} from "semantic-ui-react"

export default function DashboardData() {

  const { loading, data, refetch } = useQuery(QUERY_ME);
  const user = data?.me || [];

  useEffect(() => {
    if (!loading) {
      refetch();
    }
  }, [loading, refetch]);

  // Displayed if the page is still loading the user data
  if (loading) {
    return (
      <Segment loading>
        Loading...
      </Segment>
    )
  }

  const refreshPage = async (event) => {
    event.preventDefault();
    window.location.reload();
  }

  const isBasketball = user.stats.filter(stats => stats.sports.name === "Basketball")
  const isAFL = user.stats.filter(stats => stats.sports.name === "AFL")
  const isCricket = user.stats.filter(stats => stats.sports.name === "Cricket")

  const mostPlayed = () => {
    const isBasketballLength = isBasketball.length
    const isAFLLength = isAFL.length
    const isCricketLength = isCricket.length

    if (isBasketballLength > isAFLLength && isBasketballLength > isCricketLength) {
      return (
        <Segment>
          <h4>Most played sport:</h4>
          <b>Basketball</b> with <b>{isBasketballLength}</b> stats submitted!
        </Segment>
      )
    } else if (isAFLLength > isBasketballLength && isAFLLength > isCricketLength) {
      return (
        <Segment>
          <h4>Most played sport:</h4>
          <b>AFL</b> with <b>{isAFLLength}</b> stats submitted!
        </Segment>
      )
    } else if (isCricketLength > isBasketballLength && isCricketLength > isAFLLength) {
      return (
        <Segment>
          <h4>Most played sport:</h4>
          <b>Cricket</b> with <b>{isCricketLength}</b> stats submitted!
        </Segment>
      )
    } else {
      return (
        <Segment>
          You have a tie!
        </Segment>
      )
    }
  }

  const avgCalc = (array, stat) => {
    var average = 0
    for (var i = 0; i < array.length; i++) {
      average += Number(array[i][stat])
    }
    const statAvg = Math.round(average / array.length)
    return statAvg
  }

  const avgStatsBasketball = () => {
    if (isBasketball.length) {
      const avgPoints = avgCalc(isBasketball, "totalPoints")
      const avgRebounds = avgCalc(isBasketball, "rebounds")
      const avgAssists = avgCalc(isBasketball, "assists")

      return (
        <Segment>
          <h4>Average Basketball stats: </h4>
          <p>Points: {avgPoints}, Rebounds: {avgRebounds}, Assists: {avgAssists} </p>
        </Segment>
      )
    }
  }

  const avgStatsAFL = () => {
    if (isAFL.length) {
      const avgGoals = avgCalc(isAFL, "goals")
      const avgDisposals = avgCalc(isAFL, "disposals")
      const avgMarks = avgCalc(isAFL, "marks")
      return (
        <Segment>
          <h4>Average AFL stats: </h4>
          <p>Goals: {avgGoals}, Disposals: {avgDisposals}, Marks: {avgMarks}</p>
        </Segment>
      )
    }
  }

  const avgStatsCricket = () => {
    if (isCricket.length) {
      const avgRuns = avgCalc(isCricket, "runs")
      const avgSixes = avgCalc(isCricket, "sixes")
      const avgWickets = avgCalc(isCricket, "wickets")
      return (
        <Segment>
          <h4>Average Cricket Stats: </h4>
          <p>Runs: {avgRuns}, Sixes: {avgSixes}, Wickets: {avgWickets}</p>
        </Segment>
      )
    }
  }

  return (
    <div>
      <Segment.Group>
        <Segment>
          <Header as="h3" style={{ fontSize: "2em" }}>
            {user.username}"s Cool Stats!
          </Header>
          <Button icon color="green" size="small" type="button" labelPosition="left" onClick={refreshPage}> <Icon fitted name="refresh" />
            Refresh
          </Button>
        </Segment>
        <Segment>
          {mostPlayed()}
        </Segment>
        <Segment>
          <>
            {avgStatsBasketball()}
            {avgStatsAFL()}
            {avgStatsCricket()}
          </>
        </Segment>
      </Segment.Group>
    </div>
  )
}