import React from 'react';
import './App.css';
import InvoiceForm from './components/InvoiceForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Invoice Generator App</h1>
      </header>
      <main>
        <InvoiceForm />
      </main>
    </div>
  );
}

export default App;
