import React from 'react';
import './App.css';

import Message from './components/Message';
import Navigation from './components/Navigation';
import Routes from './Routes';

export default () => {
  return (
    <div>
      <Navigation />
      <Routes />
      <Message />
    </div>
  )
}
