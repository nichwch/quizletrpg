import React, { Component } from 'react'
import axios from 'axios';
import './style.css';
import Controls from "./Controls.js";
import EventControls from "./EventControls.js";
import Clock from "./clock.js";

var events =  require("./events.js").default;

var monster1 = require("./images/monster1.png");
var monster2 = require("./images/monster2.png");
var monster3 = require("./images/monster3.png");
var monster4 = require("./images/monster4.png");

var monsters = [monster1,monster2,monster3,monster4];
var background = require("./images/background.png");

var startEvent = {Title:"You wake up in a dark room.",
       Description:"There's a warp gun in front of you.",
       Options: [{Title:"Use the warp gun.",
                  Reference:"random",
                  Event:true
                },]
        };
var afterKill = {Title:"",
       Description:"Your opponent lays vanquished before you.",
       Options: [{Title:"Warp somewhere else",
                  Reference:"random",
                  Event:true
                }]
        };
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      appstate: "intro",
      playerHP:50,
      monster: {taunts:[]},
      taunt:"",
      URL: '',
      quizletSet: require("./dummyQuizlet").default,
      monsterHP: 20,
      monsterAT: 20,

      monsterIndex: 0,
      questionObject: {
        correctIndex: 0,
        buttons: ["s","s","s","s"]
      },

      //timer
      remainingTime: 6.0,

      //event
      event:startEvent
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.generateQuestion = this.generateQuestion.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
    this.generateMonster= this.generateMonster.bind(this);

    this.clickOne= this.clickOne.bind(this);
    this.clickTwo= this.clickTwo.bind(this);
    this.clickThree= this.clickThree.bind(this);
    this.clickFour= this.clickFour.bind(this);
    this.damageEnemy = this.damageEnemy.bind(this);
    this.damagePlayer = this.damagePlayer.bind(this);
    this.loadEvent = this.loadEvent.bind(this);
  }
  shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

  generateMonster(){
    axios.get('http://ec2-13-57-189-172.us-west-1.compute.amazonaws.com:5000/monsters')
    .then(data => {
      this.setState({monster: data.data,
        monsterIndex: Math.floor(Math.random() * (monsters.length)),
      monsterHP: data.data.hp,
      monsterAT: data.data.at,});
    })
    .catch(error => {
      console.log(error);
    });
  }
  generateQuestion()
  {
    var index = Math.floor(Math.random() * (this.state.quizletSet.length-1));
    let answer = this.state.quizletSet[index].definition;
    let wronganswer1 = this.state.quizletSet[Math.floor(Math.random() * (this.state.quizletSet.length))].definition;
    let wronganswer2 = this.state.quizletSet[Math.floor(Math.random() * (this.state.quizletSet.length))].definition;
    let wronganswer3 = this.state.quizletSet[Math.floor(Math.random() * (this.state.quizletSet.length))].definition;
    var answers = [answer,wronganswer1,wronganswer2,wronganswer3];
    this.shuffleArray(answers);
    this.setState({
      questionObject: {
        correctIndex: index,
        buttons: answers
      }
      })
  }

  tick() {
    if(this.state.remainingTime>0.1)
    {
      this.setState({
        remainingTime: this.state.remainingTime - 0.1
      });
    }
    else if(this.state.appstate == "combat"){
      this.damagePlayer();
    }

  }

  componentDidMount() {
    //your write request axios.write(blah blah blah)
    //have it log to console, then check dev tools to see if it worked
    //nothing will show up in UI, this is just for you to test server, don't commit to main branch
    this.generateQuestion();
    axios.get('http://ec2-13-57-189-172.us-west-1.compute.amazonaws.com:5000/monsters')
    .then(data => {
      this.setState({monster: data.data,
                    monsterHP: data.data.hp,
                    monsterAT: data.data.at});
    })
    .catch(error => {
      console.log(error);
    });

    //timer
    this.timerID = setInterval(
      () => this.tick(),
      100
    );
  }

    componentWillUnmount() {
      clearInterval(this.timerID);
    }


  handleChange(event) {
    this.setState({ URL: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.setState({ appstate: "event" })
    //get quizlet from user
    axios.get('http://ec2-13-57-189-172.us-west-1.compute.amazonaws.com:5000/quizlet?url='+this.state.URL)
    .then(data => {
      this.setState({quizletSet: data.data,});
      console.log(data);
    })
    .catch(error => {
      console.log(error);
    });
  }

  //Event
  loadEvent(ind){
    if(this.state.event.Options[ind].Event)
    {
      if(this.state.event.Options[ind].Reference === "random")
      {
        this.setState({
          event:events[Math.floor(Math.random() * (events.length))]
        })
      }
      else{
        this.setState({
          event:this.state.event.Options[ind].Reference
        })
      }
    }
    else {
      if(this.state.event.Options[ind].Reference === "random")
      {
        this.switchToCombat();
      }
    }
  }

  switchToCombat()
  {
    this.generateMonster();
    this.generateQuestion();
    this.setState({
      appstate:"combat",
      remainingTime:6.0
    });
  }

  switchToEvent()
  {
    this.setState({
      appstate:"event",
      event: afterKill
    });
  }

  //COMBAT
  damageEnemy(){
    //correct answer
    this.setState({
      monsterHP: this.state.monsterHP - 5,
      remainingTime:6.0,
      taunt:this.state.monster.hurts[Math.floor(Math.random() * (this.state.monster.hurts.length))]

    }, function() {
      if(this.state.monsterHP <= 0)
      {
        this.switchToEvent();
      }
    });

  }

  damagePlayer(){
    //correct answer
    this.setState({
      playerHP: this.state.playerHP - 5,
      remainingTime:6.0,
      taunt:this.state.monster.taunts[Math.floor(Math.random() * (this.state.monster.taunts.length))]
    }, function() {
      if(this.state.playerHP <= 0)
      {
        this.setState(
          {
            appstate: "dead"
          }
        )
      }
    });

  }

  clickOne(){
    if(this.state.quizletSet[this.state.questionObject.correctIndex].definition==this.state.questionObject.buttons[0])
    {
      this.damageEnemy();

      //wrong answer
    }
    else {
      //correct answer
      this.damagePlayer();
    }
    this.generateQuestion();

  }
  clickTwo(){
    if(this.state.quizletSet[this.state.questionObject.correctIndex].definition==this.state.questionObject.buttons[1])
    {
      this.damageEnemy();

      //wrong answer
    }
    else {
      //correct answer
      this.damagePlayer();
    }
    this.generateQuestion();
  }
  clickThree(){
    if(this.state.quizletSet[this.state.questionObject.correctIndex].definition==this.state.questionObject.buttons[2])
    {
      console.log("damage player");
      this.damageEnemy();

      //wrong answer
    }
    else {
      //correct answer
      this.damagePlayer();
    }
    this.generateQuestion();
  }
  clickFour(){
    if(this.state.quizletSet[this.state.questionObject.correctIndex].definition==this.state.questionObject.buttons[3])
    {
      this.damageEnemy();

      //wrong answer
    }
    else {
      //correct answer
      this.damagePlayer();
    }
    this.generateQuestion();
  }
  render() {
    var output = null;
    if(this.state.appstate == "intro")
    {
      output = (
            <div className="form-container">
              <label>
                Enter the Quizlet URL :
              </label>
              <div className="input">
                <input type="text" value={this.state.URL} onChange={this.handleChange} />
              </div>
              <div className="button">
                <button type="submit" onClick={this.handleSubmit} className="btn btn-primary">Submit</button>
              </div>
            </div>
      )
    }
    else if(this.state.appstate == "combat")
    {
      output = (
        <div className="combat-container">
            <div><img className='image' src={monsters[this.state.monsterIndex]} /></div>
            <div className="monster-stats">
              <div className='stats'>{this.state.monster.name}</div>
              <div className='stats'>Enemy HP: <Clock time = {this.state.monsterHP} max = {this.state.monster.hp}/></div>
              <div className='stats'>Your HP: <Clock time = {this.state.playerHP} max = {50}/></div>
              <div className='stats'>Enemy Attack: {this.state.monsterAT}</div>
              <br></br>
              <div className='flavortext'>{this.state.taunt}</div>
              <br></br>

        </div>

          <div className="question-container">
          <div>{"What is "+this.state.quizletSet[this.state.questionObject.correctIndex].term+"?"}</div>
          <Clock time = {this.state.remainingTime} max = {6}/>
            <Controls qObject = {this.state.questionObject}
                      clicks = {[this.clickOne,this.clickTwo,this.clickThree,this.clickFour]}/>
          </div>
        </div>)

    }
    else if(this.state.appstate == "event")
    {
      output = (
        <div>
            <div><img className='image' src={background} /></div>
            <div className="event-container">
              <h2 >{this.state.event.Title}</h2>
              <div >{this.state.event.Description}</div>
              <br></br>
              <br></br>

        </div>

          <div className="question-container">
            <EventControls options = {this.state.event.Options}
                          lEvent = {this.loadEvent}/>
          </div>
        </div>)

    }
    else if(this.state.appstate == "dead")
    {output = (
      <div className="question-container">
      <br></br>
      <div className = "stats">You died!</div>
      <a href="http://quizletrpg.s3-website.us-west-1.amazonaws.com/"><button>Try again</button></a>
      </div>
    )
    }
    return output;
  }
}
