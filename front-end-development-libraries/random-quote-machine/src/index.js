import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

const Text = (props) => <p className='text' id="text">{props.quote}</p>

const Author = (props) => <p id='author' className='author'>{props.author}</p>

const NewQuote = (props) => {
    return <button
        id='new-quote'
        onClick={props.handler}
        className='button'>
        New Quote</button>
}

const App = () => {
    const [state, setState] = useState({
        quotesArray: [],
        quote: '',
        author: ''
    })
    const newQuote = () => {
        let r = Math.floor(Math.random() * 103)
        setState(state => ({
            ...state,
            quote: state.quotesArray[r].quote,
            author: state.quotesArray[r].author
        }))
    }
    useEffect(() => {
        fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
            .then(response => response.json())
            .then(data => {
                setState(state => ({
                    ...state,
                    quotesArray: data.quotes
                }))
            })
            .then(() => newQuote())
    }, [])

    return (
        <div className='gridcontainer'>
            <section id='quote-box' className='gridcontainer'>
                <Text quote={state.quote} />
                <Author author={state.author} />
                <div id='buttons'>
                    <NewQuote handler={newQuote} />
                    <a
                        id='tweet-quote'
                        href='https://www.twitter.com/intent/tweet'>
                        <button>Tweet</button>
                    </a>
                </div>
            </section>
        </div>
    );
}

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
