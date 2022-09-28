import React from 'react';
import ReactDOM from 'react-dom/client';
import './site.css'

const root = ReactDOM.createRoot(document.getElementById('root'));

class Button extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress);
    }

    handleKeyPress = e => {
        if (e.keyCode === this.props.source.code) {
            this.playSound();
        }
    }

    playSound = () => {
        const sound = document.getElementById(this.props.source.letter);
        sound.currentTime = 0;
        sound.play();
        this.props.whenPlayed(this.props.source.id.replace(/-/g, ' '))
    }

    render() {
        return (
            <button onClick={this.playSound} className='drum-pad' id={this.props.source.id}>
                {this.props.source.letter}
                <audio className='clip' src={this.props.source.url} id={this.props.source.letter} />
            </button>
        )
    }

}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            display: ''
        }
    }

    updateDisplay = (name) => {
        this.setState({
            display: name
        })
    }

    render() {
        return (
            <div id='drum-machine' className='container'>
                <div id="display"><h1>{this.state.display}</h1></div>
                <Button source={sources.Q} whenPlayed={this.updateDisplay}/>
                <Button source={sources.W} whenPlayed={this.updateDisplay}/>
                <Button source={sources.E} whenPlayed={this.updateDisplay}/>
                <Button source={sources.A} whenPlayed={this.updateDisplay}/>
                <Button source={sources.S} whenPlayed={this.updateDisplay}/>
                <Button source={sources.D} whenPlayed={this.updateDisplay}/>
                <Button source={sources.Z} whenPlayed={this.updateDisplay}/>
                <Button source={sources.X} whenPlayed={this.updateDisplay}/>
                <Button source={sources.C} whenPlayed={this.updateDisplay}/>
            </div>
        )
    }
}

const sources = {
    'Q': {
        'url': 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
        'id': 'heater-1',
        'letter': 'Q',
        'code': 81
    },
    'W': {
        'url': 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
        'id': 'heater-2',
        'letter': 'W',
        'code': 87
    },
    'E': {
        'url': 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
        'id': 'heater-3',
        'letter': 'E',
        'code': 69
    },
    'A': {
        'url': 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
        'id': 'heater-4',
        'letter': 'A',
        'code': 65
    },
    'S': {
        'url': 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
        'id': 'clap',
        'letter': 'S',
        'code': 83
    },
    'D': {
        'url': 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
        'id': 'open-hh',
        'letter': 'D',
        'code': 68
    },
    'Z': {
        'url': 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
        'id': 'kick-n-hat',
        'letter': 'Z',
        'code': 90
    },
    'X': {
        'url': 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
        'id': 'kick',
        'letter': 'X',
        'code': 88
    },
    'C': {
        'url': 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
        'id': 'closed-hh',
        'letter': 'C',
        'code': 67
    }
}

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
