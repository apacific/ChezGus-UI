import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import { Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import Card from '../card/Card';
import Modal from '../modal/Modal';
import NavBar from '../navbar/NavBar';
import Spinner from '../spinner/Spinner';
import '../../assets/fonts/Inter-VariableFont_slnt,wght.ttf'

const App = () => {
  // state and update function for our products data
  const [products, setProducts] = useState([]);
  // state and update function for when data is being fetched to display spinner
  const [loading, setLoading] = useState(false);
  // state and update function for api errors to show error modal
  const [apiError, setApiError] = useState(false);
  const imageSuffix = '.jpg';
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
        // set loading flag to false now that api call is completed
        setLoading(false);
        // add product data to state array
        setProducts(productData);
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
  const createFoodCards = () => products.filter(product => product.type==="food").map(product => (
    <Card key={product.id} data-type={product.type}>
      <div>
        <h3>{product.name}</h3>
        <Popup trigger={<button>details</button>} position="center center">
          <div>
            <div className={styles.text}>
            <p style={{"marginBottom": "-20px"}}>{product.description}</p><p>${product.price}</p></div>
            <div className={styles.image}><img src={require(`../../../public/images/${product.imageName}${imageSuffix}`)} style={{ width: '188px', height: '222px', objectFit: 'cover' }} alt='product' /></div>
          </div>
        </Popup>
      </div>
    </Card>)
  );

  // function to create a Card component for each product that displays the name, price, and description
  const createDessertCards = () => products.filter(product => product.type==="dessert").map(product => (
    <Card key={product.id} data-type={product.type}>
      <div>
        <h3>{product.name}</h3>
        <Popup trigger={<button>details</button>} position="center center">
          <div>
            <div className={styles.text}>
            <p style={{"marginBottom": "-20px"}}>{product.description}</p><p>${product.price}</p></div>
            <div className={styles.image}><img src={require(`../../../public/images/${product.imageName}${imageSuffix}`)} style={{ width: '188px', height: '222px', objectFit: 'cover' }} alt='product' /></div>
          </div>
        </Popup>
      </div>
    </Card>)
  );

  // function to create a Card component for each product that displays the name, price, and description
  const createBeverageCards = () => products.filter(product => product.type==="beverage").map(product => (
    <Card key={product.id} data-type={product.type}>
      <div>
        <h3>{product.name}</h3>
        <Popup trigger={<button>details</button>} position="center center">
          <div>
            <div className={styles.text}>
              <p style={{"marginBottom": "-20px"}}>{product.description}</p><p>${product.price}</p></div>
            <div className={styles.image}><img src={require(`../../../public/images/${product.imageName}${imageSuffix}`)} style={{ width: '188px', height: '222px', objectFit: 'cover' }} alt='product' /></div>
          </div>
        </Popup>
      </div>
    </Card>)
  );
 
  return (
    <>
      <div className={styles.header}>
        <NavBar />
      </div>
      <div className={styles.container}>
        {/* if loading is true, display the spinner component */}
        {loading && <Spinner />}
        {/* if apiError is true, display the Modal component */}
        {apiError && <Modal message="Oops! Something went wrong." reset={() => setApiError(false)} />}
        {/* run functions to create Card components */}
        <Routes>
          <Route
            path="/">
          </Route>
          <Route
            path="/food"
            element={
              <div className={styles.row}>
                {createFoodCards()}
              </div>}>
          </Route>
          <Route
            path="/dessert"
            element={
              <div className={styles.row}>
              {createDessertCards()}
            </div>}>
          </Route>
          <Route
            path="/beverages"
            element={
              <div className={styles.row}>
                {createBeverageCards()}
              </div>}>
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
