import React, { useState } from 'react';

const SyncIdEntry = ({ onSubmit }) => {
  const [syncId, setSyncId] = useState('');
  const [error, setError] = useState('');

  const validSyncIds = ['move2211', 'nono2322', 'giga0011', 'fart8989'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validSyncIds.includes(syncId)) {
      onSubmit(syncId);
    } else {
      setError('Invalid Sync ID. Please enter a valid ID.');
    }
  };

  return (
    <div className="sync-id-entry">
      <h2>Enter Sync ID</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="syncId">Sync ID:</label>
          <input
            type="text"
            id="syncId"
            value={syncId}
            onChange={(e) => setSyncId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Enter</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default SyncIdEntry;
