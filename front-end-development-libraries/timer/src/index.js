import React from 'react';
import ReactDOM from 'react-dom/client';
import './site.css'

const LengthPanel = (props) => {
  return (
    <div className='flex length-controls-panel'>
      <LengthControl
        len={props.sLen}
        type='Session'
        onClick={props.sClick}
      />
      <LengthControl
        len={props.bLen}
        type='Break'
        onClick={props.bClick}
      />
    </div>
  )
}
const LengthControl = (props) => {
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
      breakLen: operator === '+'
        ? state.breakLen + 1
        : state.breakLen == 0
          ? 0
          : state.breakLen - 1
    }))

  }
  setSessionLen = (e) => {
    const operator = e.target.value
    this.setState(state => ({
      sessionLen: operator === '+'
        ? state.sessionLen + 1
        : state.sessionLen == 0
          ? 0
          : state.sessionLen - 1
    }))
  }

  render() {
    return (
      <div className='flex' id='app'>
        <h1>Timer</h1>
        <LengthPanel
          bClick={this.setBreakLen}
          sClick={this.setSessionLen}
          sLen={this.state.sessionLen}
          bLen={this.state.breakLen}
        />
        {/* <Session /> */}
      </div>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <App />
);
