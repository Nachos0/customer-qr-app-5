import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CustomerList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const getAllCustomers = () => {
    const customers = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      try {
        const data = JSON.parse(localStorage.getItem(key));
        if (data && data.id) {
          customers.push(data);
        }
      } catch (error) {
        console.error("Error parsing customer data:", error);
      }
    }
    customers.sort((a, b) => new Date(b.date) - new Date(a.date));
    return customers;
  };

  const customers = getAllCustomers();

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2 className="customer-list-heading">Customers List</h2>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="customer-list">
        {filteredCustomers.length === 0 ? (
          <p>No customers to display.</p>
        ) : (
          filteredCustomers.map((customer) => (
            <Link to={`/display/${customer.id}`} key={customer.id} className="customer-card">
              <div>
                <strong>Name:</strong> {customer.name}
              </div>
              <div>
                <strong>Status:</strong> {customer.status}
              </div>
              <div>
                <strong>Date:</strong> {customer.date}
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default CustomerList;
