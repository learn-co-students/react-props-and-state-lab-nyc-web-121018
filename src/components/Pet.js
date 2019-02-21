import React from "react";

class Pet extends React.Component {
  render() {
    return (
      <div className="card">
        <div className="content">
          <a className="header">
            {/*'♀' OR '♂' */}
            {this.props.pet.name}
          </a>
          <div className="meta">
            <span className="date">{this.props.pet.type}</span>
          </div>
          <div className="description">
            <p>Age: {this.props.pet.age}</p>
            <p>Weight: {this.props.pet.weight}</p>
            <p>Gender: {this.props.pet.gender}</p>
          </div>
        </div>
        <div className="extra content">
          <button
            onClick={this.props.onAdoptPet}
            data-id={this.props.pet.id}
            className={
              this.props.isAdopted ? "ui disabled button" : "ui primary button"
            }
          >
            {this.props.isAdopted ? "Already Adopted" : "Adopt Pet"}
          </button>
        </div>
      </div>
    );
  }
}

export default Pet;
