import React, { Component } from 'react'
import axios from 'axios';
import './style.css';
export default class Controls extends Component{

  render(){
    return(
      <div>
      <div>
      <button className = "fourbutton" onClick = {this.props.clicks[0]}>{"1. "+this.props.qObject.buttons[0]}</button>
      <button className = "fourbutton" onClick = {this.props.clicks[1]}>{"2. "+this.props.qObject.buttons[1]}</button>
      </div>
      <div>
      <button className = "fourbutton" onClick = {this.props.clicks[2]}>{"3. "+this.props.qObject.buttons[2]}</button>
      <button className = "fourbutton" onClick = {this.props.clicks[3]}>{"4. "+this.props.qObject.buttons[3]}</button>
      </div>
      </div>

    )
  }

}
