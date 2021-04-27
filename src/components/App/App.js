import React, { Component } from 'react';
import './App.css';
import {getOrders} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';
import {postOrders} from '../../apiCalls'

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      orders: []
    }
  }

  componentDidMount() {
    getOrders()
      .then(orders => {
        this.setState({ orders: orders.orders })
      })
      .catch(err => console.error('Error fetching:', err));
  }

  addOrder = (newOrder) => {
    postOrders(newOrder)
    .then(order => this.setState({ orders: [...this.state.orders, order]}))
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm addOrder={this.addOrder}/>
        </header>

        <Orders orders={this.state.orders}/>
      </main>
    );
  }
}


export default App;
