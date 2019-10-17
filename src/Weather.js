import React, { Component } from 'react'
import './weather.css';
import Main from './Main'

const SearchBar = ({ query, change, fetch,placeholder }) => {
    return (
        <div id="current" className="wrapper">
            <nav className=" navbar-fixed-top">
                <div className="container margin-left" >
                    <form className="card my-6" onSubmit={(e) => { e.preventDefault(); fetch() }}>
                        <div className="card-body row no-gutters align-items-center">

                            <div className="col">
                                <input className="form-control form-control-lg form-control-borderless" type="search"
                                    placeholder={placeholder}   value={query} onChange={(e) => change(e)} />
                            </div>
                        </div>
                    </form>

                </div>
            </nav>
        </div>
    )
}

export default class Weather extends Component {
    constructor(props) {
        super(props)
        this.state = {
            baseURL: 'https://api.openweathermap.org/data/2.5/weather?',
            APIkey: 'ffe77524d7919ae2f90d39fbaa31f4eb',
            query: 'Nantes',
            forecast: {},
            placeholder: "Quel temps fait-il? ..." 
        }
    }

    componentDidMount() {
        this.query()
    }
    query = () => {
        let isEmpty = !this.state.query.length ? 'Attention le champ est vide' : "Quel temps fait-il? ..."
        this.setState({ placeholder: isEmpty })
        if (!this.state.query.length) {
            return
        }
        let url = this.state.baseURL + "q=" + this.state.query + "&lang=FR" + "&appid=" + this.state.APIkey
        fetch(url).then(response => {
            if (response.ok) {
                console.log('success');
                return response.json()
            }
        })
            .then(data => {
                let weather = data.weather[0]
                let main = data.main
                let system = data.sys
                let temp = main.temp
                let description = weather.description
                let icon = weather.icon
                let city = data.name
                let countryCode = system.country.toLowerCase()
                let forecast = { temp: temp, description: description, icon: icon, code: countryCode, city: city }
                this.setState({ forecast: forecast })
                this.setState({ query: '' })
            })
    }

    handleChange = (e) => {
        this.setState({ query: e.target.value })
    }

    render() {
        return (
            <div>
                <SearchBar
                    fetch={this.query}
                    change={this.handleChange}
                    query={this.state.query}
                    placeholder={this.state.placeholder}
                />
                <Main forecast={this.state.forecast} query={this.query} />
            </div>
        )
    }
}


