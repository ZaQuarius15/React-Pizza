import React, { Component } from "react";

export default class PizzaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pizza: {
        id: props.currentPizza.id,
        topping: props.currentPizza.topping,
        size: props.currentPizza.size,
        vegetarian: props.currentPizza.vegetarian,
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentPizza.id !== this.state.pizza.id) {
      this.setState({
        pizza: {
          id: nextProps.currentPizza.id,
          topping: nextProps.currentPizza.topping,
          size: nextProps.currentPizza.size,
          vegetarian: nextProps.currentPizza.vegetarian,
        },
      });
    }
  }

  handleToppingInput = (e) => {
    this.setState({
      pizza: {
        ...this.state.pizza,
        topping: e.target.value,
      },
    });
  };

  handleSizeInput = (e) => {
    this.setState({
      pizza: {
        ...this.state.pizza,
        size: e.target.value,
      },
    });
  };

  handleVegetarianInput = (e) => {
    this.setState({
      pizza: {
        ...this.state.pizza,
        vegetarian: e.target.value === "Vegetarian",
      },
    });
  };

  render() {
    return (
      <div className="form-row">
        <div className="col-5">
          <input
            type="text"
            onChange={this.handleToppingInput}
            className="form-control"
            placeholder="Pizza Topping"
            value={this.state.pizza.topping}
          />
        </div>
        <div className="col">
          <select
            onChange={this.handleSizeInput}
            value={this.state.pizza.size}
            className="form-control"
          >
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col" onChange={this.handleVegetarianInput}>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              value="Vegetarian"
              checked={this.state.pizza.vegetarian}
            />
            <label className="form-check-label">Vegetarian</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              value="Not Vegetarian"
              checked={!this.state.pizza.vegetarian}
            />
            <label className="form-check-label">Not Vegetarian</label>
          </div>
        </div>
        <div className="col">
          <button
            type="submit"
            className="btn btn-success"
            onClick={() => {
              this.props.updatePizza(this.state.pizza);
            }}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}
