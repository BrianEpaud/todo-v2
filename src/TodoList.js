import React, { Component } from 'react'

const Header = ({change,add,input, placeholder}) => {
    return (
        <div>

     
        <form onSubmit={(e) => { e.preventDefault(); add() }}>
            <input
                onChange={(e) => change(e)}
                className="rounded"
                placeholder={placeholder}
                value={input}
            />
        
            <button className="rounded">Ajouter</button>
        </form>
        </div>
    )
}

const List = ({items, delet}) => {
    return(
        <ul className="theList">
        {items.map(item => {
            return (<li key={item.key} onClick={() => delet(item.key)}>{item.text} </li>)
        })}
    </ul>
    )
}

export default class Todo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            input: '',
            placeholder: "Merci d'ajouter une tâche"
        }
    }

    componentDidMount() {
        let items = JSON.parse(localStorage.getItem('items'))
        if (items){
            this.setState({ items: items })
            }
       
    }

    handleChange = (e) => {
        this.setState({ input: e.target.value })
    }

    add = () => {
        let isEmpty = !this.state.input.length ? 'Attention le champ est vide' : "Merci d'ajouter une tâche"
        this.setState({ placeholder: isEmpty })
        if (!this.state.input.length) {
            return
        }
        let newItem = { text: this.state.input, key: Date.now() }
        this.setState(state => ({
            items: [newItem].concat(state.items),
            input: ''
        }))
        localStorage.setItem('items', JSON.stringify([newItem].concat(this.state.items)))
    }

    handleDelete = (key) => {
        let filtered = this.state.items.filter(item => {
            if (key !== item.key) { return item }
        })
        this.setState({
            items: filtered
        })
        localStorage.setItem('items', JSON.stringify(filtered))
    }
    render() {
        return (
            <div id="container" className='container'>
              

                <div id='current' className="todoListMain">
                        <div className="header">
                            <Header 
                            change={this.handleChange} 
                            add={this.add} 
                            input={this.state.input}
                            placeholder={this.state.placeholder}
                            />
                            <List 
                            delet={this.handleDelete}
                            items={this.state.items}
                            />
                    </div>
                </div>
            </div>

        )
    }
}