import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import NewCustomerForm from './components/NewCustomerForm';
import ScanQRCode from './components/ScanQRCode';
import DisplayData from './components/DisplayData';
import CustomerList from './components/CustomerList';
import SyncIdEntry from './components/SyncIdEntry';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [syncId, setSyncId] = React.useState(localStorage.getItem('_sync_id') || '');

  React.useEffect(() => {
    if (syncId) {
      localStorage.setItem('_sync_id', syncId);
    } else {
      localStorage.removeItem('_sync_id');
    }
  }, [syncId]);

  const handleSyncIdSubmit = (id) => {
    setSyncId(id);
    navigate('/customers'); // Navigate to customer list after setting sync ID
  };



    return (
        <div className="container">
            <h1>تطبيق QR للعملاء</h1>
            <div className="page-content">
                <Routes>
                    <Route path="/" element={syncId ? <Home navigate={navigate}  /> : <SyncIdEntry onSubmit={handleSyncIdSubmit} />} />
                    <Route path="/new-customer" element={<NewCustomerForm />} />
                    <Route path="/scan" element={<ScanQRCode />} />
                    <Route path="/display/:id" element={<DisplayData />} />
                    <Route path="/customers" element={<CustomerList />} />
                </Routes>
            </div>
            {syncId && location.pathname !== '/' && (
                <div className="back-button-container">
                    <button onClick={() => navigate(-1)}>Back</button>

                </div>
            )}
        </div>
    );
}

function Home({ navigate }) {
    const [showPasswordInput, setShowPasswordInput] = React.useState(false);
    const [password, setPassword] = React.useState('');
    const [passwordError, setPasswordError] = React.useState('');
     const handleLogout = () => {
        setShowPasswordInput(true); // Show password input
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (password === '121234') {
            localStorage.removeItem('_sync_id');
            navigate('/');
        } else {
            setPasswordError('Incorrect password.');
        }
    };
  return (
    <div className="home-buttons-container">
      <button onClick={() => navigate('/new-customer')}>New Customer</button>
      <button onClick={() => navigate('/scan')}>Scan QR</button>
      <button onClick={() => navigate('/customers')}>View Customers</button>
            {showPasswordInput ? (
                <form onSubmit={handlePasswordSubmit}>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        required
                    />
                    <button type="submit" style={{ backgroundColor: 'red', color: 'white' }}>Confirm</button>
                    {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                </form>
            ) : (
                <button onClick={handleLogout} style={{ backgroundColor: 'red', color: 'white' }}>Change Group</button>
            )}
    </div>
  );
}

export default App;
