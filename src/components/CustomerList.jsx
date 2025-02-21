import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CustomerList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [customers, setCustomers] = useState([]); // Local state for customers
    const syncId = localStorage.getItem('_sync_id');

    const getPrefixedKey = (key) => {
        return syncId ? `${syncId}_${key}` : key;
    }

  // Use useEffect to fetch and update the customer list
    useEffect(() => {
        if (!syncId) {
            navigate('/'); // Redirect to sync ID entry if not set
            return;
        }
    const getAllCustomers = () => {
      const fetchedCustomers = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key.startsWith(syncId + '_')) { // Check for prefixed keys
                    try {
                        const data = JSON.parse(localStorage.getItem(key));
              if (data && data.id) {
                fetchedCustomers.push(data);
              }
            } catch (error) {
              console.error("Error parsing customer data:", error);
            }
          }
        }

      fetchedCustomers.sort((a, b) => new Date(b.date) - new Date(a.date));
      return fetchedCustomers;
    };

    setCustomers(getAllCustomers()); // Update local state
  }, [syncId, navigate]); // Include syncId in the dependency array

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
