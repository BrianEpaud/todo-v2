import React from 'react';
import './App.css';

import TodoList from './TodoList'
import Weather from './Weather'

export default class App extends React.Component {


  render() {
    return (
      <div className='container-fluid'>


        <h1 className="mainTitle">Daily APP</h1>


        <div className="row">
          <div className="col-md-6">
            <h1>Mon aide mémoire</h1>
            <TodoList />
          </div>
          <div className="col-md-6">
            <h1>Quel temps fait-il?</h1>
            <Weather /></div>
        </div>
        <footer className="footer">
          <p>Weather Data from <a href="https://openweathermap.org" rel="noopener noreferrer" target="_blank">Openweathermap.org</a></p>
        </footer>
      </div>
    );
  }
}

