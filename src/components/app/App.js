import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import Card from '../card/Card';
import Modal from '../modal/Modal';
import NavBar from '../navbar/NavBar';
import Spinner from '../spinner/Spinner';

const App = () => {
  // state and update function for our products data
  const [products, setProducts] = useState([]);
  // state and update function for our orders data
  const [orders, setOrders] = useState([]);
  // state and update function for when data is being fetched to display spinner
  const [loading, setLoading] = useState(false);
  // state and update function for api errors to show error modal
  const [apiError, setApiError] = useState(false);

  // useEffect Hook where we can run any code that has side-effects (like calls to a server)
  useEffect(() => {
    // define async function to fetch products and orders
    const fetchData = async () => {
      try {
        // GET request to mockapi using the browser built in Fetch API
        const productResponse = await fetch('http://localhost:8080/products');
        const orderResponse = await fetch('http://localhost:8080/orders');
        // when api returns a response, check status
        if (!productResponse.ok || !orderResponse.ok) {
          // if not 2xx, throw Error to move into catch block
          throw new Error('Something went wrong');
        }
        // convert products response from JSON to JS
        const productData = await productResponse.json();
        // convert orders response from JSON to JS
        const orderData = await orderResponse.json();
        // set loading flag to false now that api call is completed
        setLoading(false);
        // add product data to state array
        setProducts(productData);
        // add order data to state array
        setOrders(orderData);
      } catch (error) {
        // set loading flag to false now that api call is completed
        setLoading(false);
        // toggle api error state so error modal will pop up
        setApiError(true);
      }
    }
    // set loading flag to true so spinner shows
    setLoading(true);
    // call fetch function to get products and orders
    fetchData();
    /*
      we pass an empty array at end of the useEffect to let React know that this function
      isn't dependant on changes in state or props and should only run when our App component
      is first created
    */
  }, []);

  // function to create a Card component for each product that displays the name, price, and description
  const createProductCards = () => products.map(product => (
    <Card className='card' key={product.id}>
      <div className='container'>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>${product.price}</p>
      </div>
    </Card>)
  );

  // function to create a Card component for each order that displays the total price
  const createOrderCards = () => orders.map(order => (
    <Card className='card' key={order.id}>
      <div className='container'>
        <p>#{order.id}</p>
        <p>product ID: {order.items.productId} | qty: {order.items.quantity}</p>
        <h3>order total ${order.orderTotal}</h3>
      </div>
    </Card>)
  );

  return (
    <>
      <NavBar></NavBar>
      <div className={styles.container}>
        {/* if loading is true, display the spinner component */}
        {loading && <Spinner />}
        {/* if apiError is true, display the Modal component */}
        {apiError && <Modal message="Oops! Something went wrong." reset={() => setApiError(false)} />}
        {/* run functions to create Card components */}
        <Routes>
          <Route path="/" element={<div className={styles.row}>
          {createOrderCards()}
        </div>}></Route>
          <Route path="/food" element={<div className={styles.row}>
          {createProductCards()}
        </div>}></Route>
          <Route path="/dessert" element={<div className={styles.row}>
          {createProductCards()}
        </div>}></Route>
          <Route path="/beverages" element={<div className={styles.row}>
          {createProductCards()}
        </div>}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
