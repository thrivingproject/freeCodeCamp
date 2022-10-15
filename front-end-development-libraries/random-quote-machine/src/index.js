import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

// class Text extends React.Component {
//   constructor(props) {
//     super(props)
//   }

//   render() {
//     return (
//       <p className='text'>{this.props.quote}</p>
//     )
//   }
// }

const Text = (props) => <p className='text'>{props.quote}</p>

class Author extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <p className='author'>{this.props.author}</p>
    )
  }
}

class NewQuote extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <button onClick={this.props.handler} className='button'>New Quote</button>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
      .then(response => response.json())
      .then(data => {
        this.setState({
          quotesArray: data.quotes
        })
      })
      .then(() => this.newQuote())
  }

  newQuote = () => {
    let r = Math.floor(Math.random() * 103)
    this.setState((state) => ({
      quote: state.quotesArray[r].quote,
      author: state.quotesArray[r].author
    }))
  }

  render() {
    return (
      <div className='gridcontainer'>
        <section id='quote-box' className='gridcontainer'>
          <div id='text'><Text quote={this.state.quote} /></div>
          <div id='author'><Author author={this.state.author} /></div>
          <div id='new-quote'><NewQuote handler={this.newQuote} /></div>
          <a id='tweet-quote' href='https://www.twitter.com/intent/tweet'><button>Tweet</button></a>
        </section>
      </div>
    );
  }
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
