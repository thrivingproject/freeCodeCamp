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
const TimerPanel = (props) => {
  return (
    <div id='timer-panel' className='flex'>
      <h2 id='timer-label'>{props.stage}</h2>
      <p id='time-left'>{props.timeLeft}</p>
      <div id='start-stop-reset' className='flex'>
        <button id='start_stop' onClick={props.startPause}>
          <i className="fa fa-play" />
          <i className="fa fa-pause" />
        </button>
        <button onClick={props.reset} id='reset'>
          <i className='fa fa-refresh' />
        </button>
      </div>
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      breakLen: 5,
      sessionLen: 25,
      timeLeft: 5,
      countdown: false,
      breakSession: 'Session'
    }
  }
  decrement = () => {
    if (this.state.timeLeft) {
      this.setState(state => ({
        timeLeft: state.timeLeft -= 1
      }))
    } else {
      this.setState(state => ({
        timeLeft: state.breakLen * 60,
        breakSession: 'Break'
      }))
    }
  }
  format = () => {
    let minutes = Math.floor(this.state.timeLeft / 60)
    let seconds = this.state.timeLeft - minutes * 60
    if (seconds < 10) seconds = '0' + seconds
    if (minutes < 10) minutes = '0' + minutes
    return minutes + ':' + seconds
  }
  setBreakLen = (e) => {
    const operator = e.target.value
    const len = this.state.breakLen

    this.setState({
      breakLen: operator === '+'
        ? len === 60
          ? 60
          : len + 1
        : len === 1
          ? 1
          : len - 1
    })
  }
  setSessionLen = (e) => {
    const operator = e.target.value
    const len = this.state.sessionLen

    this.setState({
      sessionLen: operator === '+'
        ? len === 60
          ? 60
          : len + 1
        : len === 1
          ? 1
          : len - 1
    })
    this.setState(state => ({
      timeLeft: state.sessionLen * 60
    }))
  }
  startStop = () => {
    if (!this.state.countdown) {
      const intervalID = setInterval(this.decrement, 1000)
      this.setState(state => ({
        countdown: !state.countdown,
        intervalID: intervalID
      }))
    } else {
      clearInterval(this.state.intervalID)
      this.setState(state => ({
        countdown: !state.countdown
      }))
    }
  }
  reset = () => {
    this.setState({
      breakLen: 5,
      sessionLen: 25,
      timeLeft: 1500,
      countdown: false,
      breakSession: 'Session'
    })
    clearInterval(this.state.intervalID)
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
        <TimerPanel
          timeLeft={this.format()}
          startPause={this.startStop}
          reset={this.reset}
          stage={this.state.breakSession}
        />
      </div>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <App />
);
