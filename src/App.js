import React from 'react';
import * as firebase from 'firebase';
import DataList from './DataList';
import Graph from './Graph'
import './App.css';

const config = {
    //apiKey: process.env.npm_package_config_apiKey,
    authDomain: "react-time-7352a.firebaseapp.com",
    databaseURL: "https://react-time-7352a.firebaseio.com",
    storageBucket: "react-time-7352a.appspot.com",
    messagingSenderId: "442340448027"
};
const fb = firebase.initializeApp(config).database().ref();



var App = React.createClass({
  render: function() {
    return (
      <div className="App">
        <input type="submit" value="Create Data" onClick={this.startData}/>
        <input type="submit" value="Start Subscription" onClick={this.startSubscription}/>
        <input type="submit" value="Stop!" onClick={this.stopData}/>
        <br/>
        <p>Sending: {this.state.curNum}</p>
        <br/>
        <Graph data={this.state.data} />
        <br/>
        <DataList data={this.state.data} />

      </div>
    );
  },
  getInitialState: function() {
    return {data: []};
  },
  startSubscription: function(){
    fb.child('data/'+this.state.session).on("child_added", function(dataSnapshot) {
      console.log('child added!');
      this.setState({data: this.state.data.concat(dataSnapshot.val())});
    }.bind(this));
  },
  startData: function(){
    var time = Math.floor(Date.now() / 1000);
    this.setState({session: time});
    var timer = setInterval(
      function(){
        var rando = Math.random();
        this.setState({curNum: rando});
        fb.child('data/'+this.state.session).push().set({num: rando});
      }.bind(this), Math.random()*2000
    );
    this.setState({timer: timer});
  },
  stopData: function(){
    clearInterval(this.state.timer);
  },
  componentWillUnmount: function() {
    fb.off();
  }
})

export default App;
