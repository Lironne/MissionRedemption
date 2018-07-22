import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { YouDidIt } from "./YouDidIt.js";
import {
  // BrowserRouter as Router,
  Route
  // Link
} from 'react-router-dom'

//var url = "";

class MyLink extends Component {

  render() {
    console.log(this.props.url);
    return <a href={this.props.url}>Fitbit Login</a>;
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    // ADD STATE TO SAVE THE MESSAGE, THEN PUT INTO APP TITLE, MAKING SURE THAT PROXY WORKS
    this.state = { message: "initial message", url: "no url yet" };
  }

  componentDidMount() {
    console.log("fetching");
    fetch('/main')
      .then(res => res.json())
      .then(response => {
        console.log("response from main: " + response);
        this.setState({ message: response && response.message }, () => {
          fetch('/authorize/url')
             .then(auth => auth.json())
             .then(myUrl => this.setState({ url: myUrl.requestedUrl }, () => {
               console.log("url set: " + this.state.url);
             }));
        });

      });


  }

  render() {
    console.log("rendering App.js")
    console.log("App's url: " + this.state.url);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{this.state.message}</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <MyLink url={this.state.url} />
      </div>
    );
  }
}

const myDiv = () => {
  return (
    <div>
      <Route exact path='/' component={App} />
      <Route  path='/success' component={YouDidIt} />
    </div>
  );
}

export default myDiv;

// import React from 'react';
// import './App.css';
// import {
//   // BrowserRouter as Router,
//   Route
//   // Link
// } from 'react-router-dom'
// require('dotenv').config();
// var FitBitApiCLient = require("fitbit-node");
//
// console.log({
//     clientId: process.env.clientId,
//     clientSecret: process.env.clientSecret,
//     // host: host,
//     // callback: callbackRoute
// })
// const client = new FitBitApiCLient({
//     clientId: process.env.clientId,
//     clientSecret: process.env.clientSecret,
//     apiVersion: "1.2"
// })
//
// const callbackRoute = "http://localhost:3001/authorize/callback";
// var authUrl = client.getAuthorizeUrl('activity heartrate location nutrition profile settings sleep social weight', callbackRoute);
//
//
// import React, { Component } from 'react';
// import './App.css';
//
// class App extends Component {
//     constructor(props) {
//       super(props);
//       // ADD STATE TO SAVE THE MESSAGE, THEN PUT INTO APP TITLE, MAKING SURE THAT PROXY WORKS
//       this.state = { message: "initial message", url: "none yet" };
//     }
//
//   componentDidMount() {
//     // const callbackRoute = "http://localhost:3001/authorize/callback";
//     // var authUrl = client.getAuthorizeUrl('activity heartrate location nutrition profile settings sleep social weight', callbackRoute);
//     //
//  fetch('/authorize/url')
//     .then(res => res.json())
//     .then(response => this.setState({ message: response.message, url: response.requestedUrl }, () => {
//       console.log(this.state.url);
//     }));
//     // // fetch('/authorize');
//     // <Route path='/fitbit' component={() => window.location = authUrl} />
//   }
//
//   render() {
//     return (
//       <div className="App">
//         <h1>Users</h1>
//         {this.state.message}
//       </div>
//     );
//   }
// }
//
// export default App;

// const App = () => {
//   return (<div className="App">
    // <h1>Users</h1>
    // "Lauren is great"
    // <Route path='/fitbit' component={() => window.location = authUrl} />
//   </div>);
// }



// import React from 'react'


// const Home = () => (
//   <div>
//     <h2>Home</h2>
//   </div>
// )
//
// const About = () => (
//   <div>
//     <h2>About</h2>
//   </div>
// )
//
// const Topic = ({ match }) => (
//   <div>
//     <h3>{match.params.topicId}</h3>
//   </div>
// )
//
// const Topics = ({ match }) => (
//   <div>
//     <h2>Topics</h2>
//     <ul>
//       <li>
//         <Link to={`${match.url}/rendering`}>
//           Rendering with React
//         </Link>
//       </li>
//       <li>
//         <Link to={`${match.url}/components`}>
//           Components
//         </Link>
//       </li>
//       <li>
//         <Link to={`${match.url}/props-v-state`}>
//           Props v. State
//         </Link>
//       </li>
//     </ul>
//
//     <Route path={`${match.path}/:topicId`} component={Topic}/>
//     <Route exact path={match.path} render={() => (
//       <h3>Please select a topic.</h3>
//     )}/>
//   </div>
// )
//
// const BasicExample = () => (
//   <Router>
//     <div>
//       <ul>
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/about">About</Link></li>
//         <li><Link to="/topics">Topics</Link></li>
//       </ul>
//
//       <hr/>
//
//       <Route exact path="/" component={Home}/>
//       <Route path="/about" component={About}/>
//       <Route path="/topics" component={Topics}/>
//     </div>
//   </Router>
// )
//
//
//
// export default BasicExample
