import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../supabaseClient';

const CustomerList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase.from('customers').select('*').order('date', { ascending: false });
        if (error) {
          throw error;
        }
        setCustomers(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);


  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

    if (loading) {
    return <div>Loading customers...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
