import React from 'react';
import ReactDOM from 'react-dom/client';
import './site.css'

const LengthPanel = (props) => {
  return (
    <div className='flex length-controls-panel'>
      <LengthController
        len={props.sLen}
        type='Session'
        onClick={props.sClick}
      />
      <LengthController
        len={props.bLen}
        type='Break'
        onClick={props.bClick}
      />
    </div>
  )
}
const LengthController = (props) => {
  const type = props.type.toLowerCase()
  return (
    <div>
      <h2 id={`${type}-label`}>{props.type} Length</h2>
      <div className='flex length-controls'>
        <button id={`${type}-increment`} onClick={props.onClick} value='+'>+</button>
        <h3 id={`${type}-length`}>{props.len}</h3>
        <button id={`${type}-decrement`} onClick={props.onClick} value='-'>-</button>
      </div>
    </div>
  )
}
const Session = (props) => {
  return (
    <div id='session' className='flex'>
      <h3 id='timer-label'>Session</h3>
      <p id='time-left'>25{props.timeLeft}</p>
      <button>
        <i className="fa fa-play" />
        <i className="fa fa-pause" />
      </button>
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      breakLen: 5,
      sessionLen: 25,
      timeLeft: 1500
    }
  }
  setBreakLen = (e) => {
    const operator = e.target.value
    this.setState(state => ({
      breakLen: operator === '+'
        ? state.breakLen + 1
        : state.breakLen === 0
          ? 0
          : state.breakLen - 1
    }))

  }
  setSessionLen = (e) => {
    const operator = e.target.value
    this.setState(state => ({
      sessionLen: operator === '+'
        ? state.sessionLen + 1
        : state.sessionLen === 0
          ? 0
          : state.sessionLen - 1
    }))
  }
  clock = () => {

  }
  render() {
    return (
      <div className='flex' id='app'>
        <LengthPanel
          bClick={this.setBreakLen}
          sClick={this.setSessionLen}
          sLen={this.state.sessionLen}
          bLen={this.state.breakLen}
        />
        <Session timeLeft={this.clock} />
      </div>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <App />
);
