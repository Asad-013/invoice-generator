import React, { useState } from 'react';
import './InvoiceForm.css'; // Ensure you have this file for styling

const InvoiceForm = () => {
  const [customerName, setCustomerName] = useState('');
  const [items, setItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [taxRate, setTaxRate] = useState(0.1);
  const [orderDateTime, setOrderDateTime] = useState('');

  // Sample menu items (you can replace this with your actual menu data)
  const menuItems = [
    { id: 1, name: 'Burger', price: 12 },
    { id: 2, name: 'Pizza', price: 15 },
    { id: 3, name: 'Salad', price: 8 },
    { id: 4, name: 'Pasta', price: 14 },
    { id: 5, name: 'Steak', price: 20 }
  ];

  const handleAddItem = (menuItem) => {
    const newItem = {
      id: items.length + 1,
      name: menuItem.name,
      quantity: 1,
      price: menuItem.price
    };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (id) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
  };

  const handleQuantityChange = (id, newQuantity) => {
    const updatedItems = items.map(item => {
      if (item.id === id) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const handleGenerateInvoice = () => {
    let calculatedSubtotal = 0;
    items.forEach(item => {
      calculatedSubtotal += item.quantity * item.price;
    });
    const calculatedTax = calculatedSubtotal * taxRate;
    const total = calculatedSubtotal + calculatedTax;
    setSubtotal(calculatedSubtotal.toFixed(2));

    const now = new Date();
    const formattedDateTime = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
    setOrderDateTime(formattedDateTime);

    alert(`Invoice generated!\nDate & Time: ${formattedDateTime}\nSubtotal: $${calculatedSubtotal.toFixed(2)}\nTax: $${calculatedTax.toFixed(2)}\nTotal: $${total.toFixed(2)}`);
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  return (
    <div className="invoice-form">
      <h2>Restaurant Invoice</h2>
      <div className="form-group">
        <label>Customer Name:</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
      </div>
      <div className="menu">
        <h3>Menu</h3>
        <div className="menu-items">
          {menuItems.map(item => (
            <div key={item.id} className="menu-item">
              <span>{item.name}</span>
              <span>${item.price.toFixed(2)}</span>
              <button onClick={() => handleAddItem(item)}>Add</button>
            </div>
          ))}
        </div>
      </div>
      <div className="order-summary">
        <h3>Order Summary</h3>
        <div className="order-items">
          {items.map(item => (
            <div key={item.id} className="order-item">
              <span>{item.name}</span>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
              />
              <span>${(item.quantity * item.price).toFixed(2)}</span>
              <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
            </div>
          ))}
        </div>
      </div>
      <div className="order-details">
        {orderDateTime && (
          <div className="order-info">
            <strong>Order Date & Time:</strong> {orderDateTime}
          </div>
        )}
      </div>
      <div className="actions">
        <button onClick={handleGenerateInvoice}>Generate Invoice</button>
        <button onClick={handlePrintInvoice}>Print Invoice</button>
      </div>
    </div>
  );
};

export default InvoiceForm;
