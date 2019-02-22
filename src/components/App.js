import React from 'react';

import Filters from './Filters';
import PetBrowser from './PetBrowser';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    };
  }

  onChangeType = type => {
    this.setState(
      {
        filters: {
          ...this.state.filters,
          type: type
        }
      },
      () => console.log(this.state)
    );
  };

  onFindPetsClick = () => {
    // console.log('clicked');
    if (this.state.filters.type === 'all') {
      fetch('/api/pets')
        .then(r => r.json())
        .then(pets => this.setState({ pets: pets }));
    } else {
      fetch(`/api/pets?type=${this.state.filters.type}`)
        .then(r => r.json())
        .then(pets => this.setState({ pets: pets }));
    }
  };

  onAdoptPet = id => {
    const pets = this.state.pets.map(p => {
      return p.id === id ? { ...p, isAdopted: true } : p;
    });
    this.setState({ pets });
  };
  // onAdoptPet = id => {
  //   let newPets = [...this.state.pets];
  //   let pet = newPets.find(pet => pet.id === id);
  //   // console.log(pet.isAdopted);
  //   pet.isAdopted = !pet.isAdopted;

  //   // console.log(pet.isAdopted);
  //   // console.log(pet.isAdopted);
  //   this.setState(
  //     {
  //       pets: newPets
  //     },
  //     () => console.log(this.state)
  //   );
  // };

  render() {
    // console.log(this.state);
    return (
      <div className='ui container'>
        <header>
          <h1 className='ui dividing header'>React Animal Shelter</h1>
        </header>
        <div className='ui container'>
          <div className='ui grid'>
            <div className='four wide column'>
              <Filters
                onChangeType={this.onChangeType}
                onFindPetsClick={this.onFindPetsClick}
                state={this.state}
              />
            </div>
            <div className='twelve wide column'>
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
