import React, { Component } from "react";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import Score from "./components/Score";
import baseballs from "./cards.json";
import "./app.css";

class App extends Component {
  // Setting this.state.pups to the cards json array
  state = {
    baseballs,
    clickedBaseballIds: [],
    score: 0,
    goal: 8,
    status: ""
  };

  //shuffle the pup cards in the browser when clicked
  shuffleScoreCard = id => {
    let clickedBaseballIds = this.state.clickedBaseballIds;

    if(clickedBaseballIds.includes(id)){
      this.setState({ clickedBaseballIds: [], score: 0, status:  "You lost, game over. Time to Play again!" });
      return;
    }else{
      clickedBaseballIds.push(id)

      if(clickedBaseballIds.length === 8){
        this.setState({score: 8, status: "You Won! Click to play again!", clickedBaseballIds: []});
        console.log('You Win');
        return;
      }

      this.setState({ baseballs, clickedBaseballIds, score: clickedBaseballIds.length, status: " " });

      for (let i = baseballs.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [baseballs[i], baseballs[j]] = [baseballs[j], baseballs[i]];
      }
    }
  }

  // Map over this.state.cards and render a Card component for each card object
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">The Baseball Clicker Game</h1>
          <p className="App-intro">
            Don't click the same item twice, or you will lose.
          </p>
        </header>
        <Score total={this.state.score}
               goal={8}
               status={this.state.status}
               />
        <Wrapper>
          {this.state.baseballs.map(baseball => (
            <Card
              shuffleScoreCard={this.shuffleScoreCard}
              id={baseball.id}
              key={baseball.id}
              image={baseball.image}
            />
          ))}
        </Wrapper>
        <footer>
          <p>Savanna Dubell 2019<a href="https://github.com/savannadubell/Clicky-Game" target="_blank" rel="noopener noreferrer"> here</a>.</p>
        </footer>
    </div>
    );
  }
}

export default App;