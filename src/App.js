import React from 'react';
import './App.css';
import Header from './components/Header';
import TodoContainer from './components/TodoContainer';


function App() {
  return (
    <div className="App">
      <Header></Header>
      <TodoContainer />
    </div>
  );
}

export default App;
