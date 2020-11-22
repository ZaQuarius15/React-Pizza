import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import PizzaForm from "./components/PizzaForm";
import PizzaList from "./containers/PizzaList";
class App extends Component {
  constructor() {
    super();
    this.state = {
      pizzas: [],
      currentPizza: {
        id: null,
        topping: "",
        size: "",
        vegetarian: true,
      },
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/pizzas")
      .then((resp) => resp.json())
      .then((pizzas) => this.setState({ pizzas: pizzas }));
  }

  setCurrentPizza = (editPizza) => {
    this.setState({ currentPizza: editPizza });
  };

  updatePizza = (pizza) => {
    fetch(`http://localhost:3000/pizzas/${pizza.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pizza),
    })
      .then((resp) => resp.json())
      .then((respPizza) => {
        const { pizzas } = this.state;
        const updatedPizzas = pizzas.map((pizza) => {
          if (pizza.id === respPizza.id) {
            return respPizza;
          } else {
            return pizza;
          }
        });
        this.setState({ pizzas: updatedPizzas });
      });
  };

  render() {
    return (
      <Fragment>
        <Header />
        <PizzaForm
          currentPizza={this.state.currentPizza}
          updatePizza={this.updatePizza}
        />
        <PizzaList
          pizzas={this.state.pizzas}
          setCurrentPizza={this.setCurrentPizza}
        />
      </Fragment>
    );
  }
}

export default App;
