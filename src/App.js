import React, { Component } from 'react';
import './App.css';
import './style/styles.scss';
import { createStore, applyMiddleware } from "redux";
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './Home';
import Tikcer from './components/Ticker';
import { Provider } from "react-redux";
import reducers from "./redux/reducers";
import thunk from 'redux-thunk';
import Companies from './components/Companies';

const store = createStore(reducers, applyMiddleware(thunk));

class App extends Component {
  // constats = Constants;
  render() {
    return (
      
      <Provider store={store}>
        <header>
          <Header />
        </header>
        <div>
          <Tikcer />
          <Companies />
        </div>
        <footer>
          <Footer />
        </footer>
      </Provider>
    );
  }
}

export default App;
