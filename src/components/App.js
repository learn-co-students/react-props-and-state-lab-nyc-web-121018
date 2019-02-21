import React from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: "all"
      }
    };
  }

  changeFilterType = event => {
    let value = event.target.value;
    this.setState({
      filters: {
        type: value
      }
    });
    console.log(event.target);
  };

  fetchPets = () => {
    if (this.state.filters.type === "all") {
      fetch("/api/pets")
        .then(r => {
          return r.json();
        })
        .then(r => this.setState({ pets: r }));
    } else {
      fetch(`/api/pets?type=${this.state.filters.type}`)
        .then(r => {
          return r.json();
        })
        .then(r => this.setState({ pets: r }));
    }
  };

  adoptPet = event => {
    let id = event.target.dataset.id;
    let petsCopy = this.state.pets;

    let foundPet = petsCopy.find(function(element) {
      return element.id === id;
    });

    foundPet.isAdopted = true;
    this.setState({ pets: petsCopy });
  };

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.changeFilterType}
                onFindPetsClick={this.fetchPets}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} adoptPet={this.adoptPet} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
