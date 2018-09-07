import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Random Quote Machine</h1>
        </header>
        <p className="App-intro">
          Random Quotes!
        </p>
        <MyComponent />
      </div>
    );
  }
}

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      quote: "",
      author: "",
      timerID: 0
    };
  }

  updateQuote() {
    console.log(this.timerID);
    fetch("https://talaikis.com/api/quotes/random/")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            quote: result.quote,
            author: result.author
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  componentDidMount() {
    this.updateQuote();
    this.timerID = setInterval(
      () => this.updateQuote(),
      10000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }


  render() {
    const { error, isLoaded, quote, author } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading Quote...</div>;
    } else {
      return (
        <div className="wrapper">
          <p className="quote-text">{quote}</p>
        <h6 className="author">{author}</h6>
        </div>
      );
    }
  }
}



export default App;

