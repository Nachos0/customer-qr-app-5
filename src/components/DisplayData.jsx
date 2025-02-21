import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DisplayData = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem(id);
    if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      setData({ error: 'No data found for this code.' });
    }
  }, [id]);

  if (!data) {
    return <div>Loading...</div>;
  }

  if (data.error) {
    return (
      <div>
        <div>Error: {data.error}</div>
      </div>
    );
  }

  return (
        <div className="display-data">
        <h2>Customer Information</h2>
        <p><strong>Name:</strong> {data.name}</p>
        <p><strong>Date:</strong> {data.date}</p>
        <p><strong>Status:</strong> {data.status}</p>
        <p><strong>Description:</strong> {data.description}</p>
        </div>
  );
};

export default DisplayData;
