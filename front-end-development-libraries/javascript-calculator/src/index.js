import React from 'react';
import ReactDOM from 'react-dom/client';
import './site.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

const Button = (props) => {
  return (
    <button value={props.value} onClick={props.clicked} id={props.id}>{props.value}</button>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      display: '0',
      evaluated: false
    }
  }

  handleClick = (e) => {
    const value = e.target.value
    const { display, evaluated } = this.state
    const lastPress = display.charAt(display.length - 1)
    const index = display.search(/[*/+]-*[*/+]/)

    // Check if decimal already present
    if (display.includes('.') && value === '.') {
      let checkSlice = display.slice(display.lastIndexOf('.'))
      if (checkSlice.search(/[*/+-]/g) == -1) {
        return
      }
    }

    this.setState({
      display: display === '0' || evaluated && !operators.includes(value)
        ? value
        : index !== -1
          ? display.slice(0, index) + lastPress + value
          : display + value,
      evaluated: false
    })
  }

  clearDisplay = () => {
    this.setState({
      display: '0'
    })
  }

  calculate = () => {
    let expression = this.state.display.replace('--', '+')
    let last = expression[expression.length - 1]
    if (['+', '-', '*', '/'].includes(last)) {
      expression += '0'
    }
    let evaluation = Math.round(1000000 * eval(expression)) / 1000000
    this.setState({
      display: evaluation.toString(),
      evaluated: true
    })
  }

  render() {
    return (
      <div id='calculator'>
        <div id="display">{this.state.display}</div>

        <Button clicked={this.handleClick} value={0} id='zero' />
        <Button clicked={this.handleClick} value={1} id='one' />
        <Button clicked={this.handleClick} value={2} id='two' />
        <Button clicked={this.handleClick} value={3} id='three' />
        <Button clicked={this.handleClick} value={4} id='four' />
        <Button clicked={this.handleClick} value={5} id='five' />
        <Button clicked={this.handleClick} value={6} id='six' />
        <Button clicked={this.handleClick} value={7} id='seven' />
        <Button clicked={this.handleClick} value={8} id='eight' />
        <Button clicked={this.handleClick} value={9} id='nine' />

        <Button clicked={this.handleClick} value='+' id='add' />
        <Button clicked={this.handleClick} value='-' id='subtract' />
        <Button clicked={this.handleClick} value='/' id='divide' />
        <Button clicked={this.handleClick} value='*' id='multiply' />

        <Button clicked={this.handleClick} value='.' id='decimal' />
        <Button clicked={this.clearDisplay} value='clear' id='clear' />
        <button onClick={this.calculate} id="equals">=</button>
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

