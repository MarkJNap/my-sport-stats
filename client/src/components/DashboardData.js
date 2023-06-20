import React from 'react';
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
  // Select,
  Icon
} from 'semantic-ui-react'

export default function DashboardData (props) {
  // console.log(props.user.stats);

  // const playerStats = props.user.stats
  // console.log(playerStats);

  // const isBasketball = playerStats.filter(stats => stats.sports.name === 'Basketball')
  // const isAFL = playerStats.filter(stats => stats.sports.name === 'AFL')
  // const isCricket = playerStats.filter(stats => stats.sports.name === 'Cricket')

  // console.log('Basketball', isBasketball.length);
  // console.log('AFL', isAFL);
  // console.log('Cricket', isCricket);

  const refreshPage = async (event) => {
    event.preventDefault();
    window.location.reload();
  }
  

  return (
    <div>
      <Segment.Group>
      <Segment>
        <Header as="h3" style={{ fontSize: "2em" }}>
          Mark's Cool Stats!
        </Header>
        <Button icon color="green" size="small" type='button' labelPosition='left' onClick={refreshPage}> <Icon fitted name="refresh" />
          Refresh
        </Button>
      </Segment>
      <Segment>
        <h4>Most played sport:</h4>
        <p>Basketball (Image) 7 Games</p>
      </Segment>
      <Segment>
        
        <p>Bball Stats: Avg Points, Rebounds, Assists</p>
        <p>AFL Stats: Avg Goals, Disposals, Marks</p>
        <p>Cricket Stats: Avg Runs, 6s, Wickets</p>
      </Segment>
      </Segment.Group>
    </div>
  )
}

// {playerStats.toReversed().slice(0,6).map((stat) => (
//   <p key={stat._id} style={{ fontSize: "1.33em" }}>
//     {new Date(parseInt(stat.creationDate)).toLocaleDateString()} | {stat.sports.name}
//   </p>
//   ))}