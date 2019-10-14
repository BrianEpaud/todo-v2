import React from 'react';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [
        {text:"learn React", key:Date.now()}
      ],
      input:''
    }
  }
  handleChange = (e) => {
    this.setState({input:e.target.value})
  }

  add = () => {
    // this.setState({
    //   items:this.state.items.concat( {text:this.state.input, key:Date.now()})
    // })

    let newItem = {text:this.state.input, key:Date.now()}

    this.setState(state =>( {
      items:[newItem].concat(state.items),
      input : ''
    }))
    
  }
  render() {
    return (
      <div id="container">
        <div className="todoListMain">
          <div className="header">
            <form onSubmit={(e) => {e.preventDefault(); this.add()}}>
              <input 
              onChange={(e) => this.handleChange(e)} 
              className="rounded" 
              placeholder="Ajouter une tâche"
              value={this.state.input}
              />
              <button className="rounded">Ajouter</button>
            </form>
            <ul className="theList">
              {this.state.items.map(item => {
                return(<li key={item.key}>{item.text} </li>)
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

