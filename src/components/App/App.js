import React, { Component } from 'react';
import './App.css';
import {getOrders} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';
import {postOrders} from '../../apiCalls'
import {deleteOrders} from '../../apiCalls'

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      orders: [],
      error: ''
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

  deletOrder = (id) => {
    deleteOrders(id)
    .then(orderToDelete => {
      const filteredOrders = this.state.orders.filter(order => order.id !== id)
      this.setState({ orders: filteredOrders })
    })
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm addOrder={this.addOrder}/>
        </header>

        <Orders orders={this.state.orders} deletOrder={this.deletOrder}/>
      </main>
    );
  }
}


export default App;
