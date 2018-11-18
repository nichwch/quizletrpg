import React, { Component } from 'react';
import './App.css';

class Clock extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className = "progress-bar">
        <div className = "bar"  style={{width: `${(this.props.time/this.props.max)*100}%`}}  ></div>
        </div>
      </div>
    );
  }
}
export default Clock;
