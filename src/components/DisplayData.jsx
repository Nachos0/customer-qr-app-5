import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const DisplayData = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [newStatus, setNewStatus] = useState(''); // State for the new status
  const navigate = useNavigate();
  const location = useLocation();
    const syncId = localStorage.getItem('_sync_id');

    const getPrefixedKey = (key) => {
        return syncId ? `${syncId}_${key}` : key;
    }
    const prefixedId = getPrefixedKey(id); // Prefix the ID


  useEffect(() => {
        if (!syncId) {
            navigate('/');
            return;
        }
        const storedData = localStorage.getItem(prefixedId);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setData(parsedData);
      // Initialize newStatus with the current status, or from navigation state
      setNewStatus(location.state?.currentStatus || parsedData.status);
    } else {
      setData({ error: 'No data found for this code.' });
    }
  }, [prefixedId, syncId, navigate, location.state]);

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  const handleSaveChanges = () => {
    if (data && newStatus) {
            const updatedData = { ...data, status: newStatus };
            localStorage.setItem(prefixedId, JSON.stringify(updatedData));
      setData(updatedData); // Update the displayed data immediately
      alert('Status updated successfully!'); // Provide feedback
      //Optionally navigate back to customer list, or stay on the page
      // navigate('/customers');
    }
  };

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

      <div className="form-group">
        <label>Update Status:</label>
        <select value={newStatus} onChange={handleStatusChange} required>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Done/Completed">Done/Completed</option>
        </select>
      </div>
      <button onClick={handleSaveChanges}>Save Changes</button>
    </div>
  );
};

export default DisplayData;
