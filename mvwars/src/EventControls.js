import React, { Component } from 'react'
import axios from 'axios';
import './style.css';
export default class EventControls extends Component{
  constructor(props){
    super(props);
    this.onClick1 = this.onClick1.bind(this);
    this.onClick2 = this.onClick2.bind(this);
    this.onClick3 = this.onClick3.bind(this);
    this.onClick4 = this.onClick4.bind(this);
  }
  onClick1(){
    this.props.lEvent(0);
  }
  onClick2(){
    this.props.lEvent(1);
  }
  onClick3(){
    this.props.lEvent(2);
  }
  onClick4(){
    this.props.lEvent(3);
  }
  render(){

    return(
      <div>
      <div>
      <button className = "fourbutton" onClick = {this.onClick1}>{this.props.options[0].Title}</button>
      {this.props.options.length>1? <button className = "fourbutton" onClick = {this.onClick2}>{this.props.options[1].Title}</button>:null}
      </div>
      <div>
      {this.props.options.length>2? <button className = "fourbutton" onClick = {this.onClick3}>{this.props.options[2].Title}</button>:null}
      {this.props.options.length>3? <button className = "fourbutton" onClick = {this.onClick4}>{this.props.options[3].Title}</button>:null}
      </div>
      </div>

    )
  }

}
