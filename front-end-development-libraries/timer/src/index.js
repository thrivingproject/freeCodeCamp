import React from 'react';
import ReactDOM from 'react-dom/client';
import './site.css'

class App extends React.Component {
  render() {
    return (
      <div>hi mom</div>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
