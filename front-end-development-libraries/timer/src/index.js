import React from 'react';
import ReactDOM from 'react-dom/client';
import './site.css'

const LengthControl = (props) => {
  return(
    <div>
      <h2>{props.type} Length</h2>
      <div className='flex length-controls'>
        <button onClick={props.onClick} value='+'>+</button>
        <h3>{props.len}</h3>
        <button onClick={props.onClick} value='-'>-</button>
      </div>
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      breakLen: 5,
      sessionLen: 25
    }
  }

  setBreakLen = (e) => {
    const operator = e.target.value
    this.setState(state => ({
      breakLen: operator === '+' ? state.breakLen + 1 : state.breakLen - 1 
    }))
  
  }
  setSessionLen = (e) => {
    const operator = e.target.value
    this.setState(state => ({
      sessionLen: operator === '+' ? state.sessionLen + 1 : state.sessionLen - 1 
    }))
  }
  
  render() {
    return (
      <div className='flex' id='app'>
        <h1>Timer</h1>
        <div className='flex length-controls-panel'>
          <LengthControl 
            len={this.state.breakLen}
            type='Break'
            onClick={this.setBreakLen}
          />
          <LengthControl 
            len={this.state.sessionLen}
            type='Session'
            onClick={this.setSessionLen}
          />
        </div>
      </div>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <App />
);
