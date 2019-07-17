import React, { Component } from "react";
// import logo from "./logo.svg";

import { CardList } from "./components/card-list/card-list.component";
import "./App.css";

import { SearchBox } from "./components/search-box/search-box.component";

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: ""
    };
  }

  // méthode appelée lorque le composant est monté ou rendu. Une modification du state appelera render
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(users => this.setState({ monsters: users }));
  }

  // la syntaxe arrow function permet d'attribuer le contexte de this à cette classe. (évite le bind
  // de la function dans le constructeur)
  handleChange = e => {
    // a chaque changement du searchField on met à jour l'état ce qui déclenche le render
    this.setState({ searchField: e.target.value });
  };

  render() {
    const { monsters, searchField } = this.state;

    // tableau filtré en fonction du searchField
    const filteredMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );

    return (
      <div className="App">
        <h1>Monster Rolodex</h1>

        <SearchBox
          placeholder="search monsters"
          handleChange={this.handleChange}
        />

        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
