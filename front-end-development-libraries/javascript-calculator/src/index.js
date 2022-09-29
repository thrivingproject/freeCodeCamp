import React from 'react';
import ReactDOM from 'react-dom/client';
import './site.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

const Button = (props) => {
  return (
    <button onClick={() => props.clicked(props.label)} id={props.id}>{props.label}</button>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      display: '',
      lastClicked: ''
    }
  }

  updateDisplay = (label) => {
    const display = this.state.display
    const prevVal = display.charAt(display.length - 1)

    // Check if decimal already present
    if (display.includes('.') && label === '.') {
      return
    }

    // Check for consecutive operators
    if (operators.includes(prevVal) && operators.includes(label)) {
      if (prevVal !== label) {

      }
    }

    this.setState((state, props) => ({
      display: state.display + label,
    }))
  }

  clearDisplay = () => {
    this.setState({
      display: ''
    })
  }

  calculate = () => {

  }

  render() {
    return (
      <div id='calculator'>
        <div id="display"><h1>{this.state.display}</h1></div>

        <Button clicked={this.updateDisplay} label={0} id='zero' />
        <Button clicked={this.updateDisplay} label={1} id='one' />
        <Button clicked={this.updateDisplay} label={2} id='two' />
        <Button clicked={this.updateDisplay} label={3} id='three' />
        <Button clicked={this.updateDisplay} label={4} id='four' />
        <Button clicked={this.updateDisplay} label={5} id='five' />
        <Button clicked={this.updateDisplay} label={6} id='six' />
        <Button clicked={this.updateDisplay} label={7} id='seven' />
        <Button clicked={this.updateDisplay} label={8} id='eight' />
        <Button clicked={this.updateDisplay} label={9} id='nine' />

        <Button clicked={this.updateDisplay} label='+' id='add' />
        <Button clicked={this.updateDisplay} label='-' id='subtract' />
        <Button clicked={this.updateDisplay} label='/' id='divide' />
        <Button clicked={this.updateDisplay} label='*' id='multiply' />

        <Button clicked={this.updateDisplay} label='.' id='decimal' />
        <Button clicked={this.clearDisplay} label='clear' id='clear' />
        <button clicked={this.calculate} id="equals">=</button>
      </div>
    )
  }
}

const operators = ['+', '/', '*']

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

