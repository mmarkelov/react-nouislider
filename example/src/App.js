import React from 'react';

import Header from './components/Header';
import Slider from './components/Slider';
import Code from './components/Code';
import Options from './components/Options';
import Footer from './components/Footer';

import './App.css';

const App = () => (
  <div className="root">
    <Header />
    <Slider />
    <Code />
    <Options />
    <Footer />
  </div>
);

export default App;
