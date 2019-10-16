import React from 'react';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [
        {text:"learn React", key:1},
        {text:"jojo la frite", key:2},
        {text:"jojo la bricole", key:3},
        {text:"jojo React", key:4},
      ],
      input:'',
      placeholder:"Merci d'ajouter une tâche"
    }
  }
  handleChange = (e) => {
    this.setState({input:e.target.value})
  }

  add = () => {
    // this.setState({
    //   items:this.state.items.concat( {text:this.state.input, key:Date.now()})
    // })
    let isEmpty = !this.state.input.length ? 'Attention le champ est vide' : "Merci d'ajouter une tâche"
    this.setState({placeholder: isEmpty})
    if(!this.state.input.length){
    
      return 
    }


    let newItem = {text:this.state.input, key:Date.now()}

    this.setState(state =>( {
      items:[newItem].concat(state.items),
      input : ''
    }))
    
  }

  handleDelete = (key) => {
    let filtered = this.state.items.filter(item => {
      if(key !== item.key) {return item}
    })
    this.setState({
      items: filtered
    })
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
              placeholder={this.state.placeholder}
              value={this.state.input}
              />
          <div></div>
              <button className="rounded">Ajouter</button>
            </form>
            <ul className="theList">
              {this.state.items.map(item => {
                return(<li key={item.key} onClick={() => this.handleDelete(item.key)}>{item.text} </li>)
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

