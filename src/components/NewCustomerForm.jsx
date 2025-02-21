import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';

const NewCustomerForm = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('Pending');
  const [description, setDescription] = useState('');
  const [showQR, setShowQR] = useState(false);
  const navigate = useNavigate();
  const [customerQRValue, setCustomerQRValue] = useState('');
  const [ownerQRValue, setOwnerQRValue] = useState('');

    const syncId = localStorage.getItem('_sync_id'); // Get sync ID

    const getPrefixedKey = (key) => {
        return syncId ? `${syncId}_${key}` : key;
    }

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = Date.now().toString();
        const prefixedId = getPrefixedKey(id); // Prefix the ID
    const data = { id, name, date, status, description };
        localStorage.setItem(prefixedId, JSON.stringify(data));

    const customerData = { id: id, type: 'customer', name, date, status, description };
    const ownerData = { id: id, type: 'owner', name, date, status, description };
    setCustomerQRValue(JSON.stringify(customerData));
    setOwnerQRValue(JSON.stringify(ownerData));
    setShowQR(true);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Print QR Codes</title>
          <style>
            body { font-family: Arial, sans-serif; display: flex; justify-content: space-around; }
            .qr-container { margin: 20px; text-align: center; }
            img { width: 200px; height: 200px; }
          </style>
        </head>
        <body>
          <div class="qr-container">
            <h2>Customer QR Code</h2>
            <img src="${document.querySelector('#customer-qr canvas').toDataURL()}" alt="Customer QR" />
            <p>${name}</p>
          </div>
          <div class="qr-container">
            <h2>Owner QR Code</h2>
            <img src="${document.querySelector('#owner-qr canvas').toDataURL()}" alt="Owner QR" />
            <p>${name}</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.print();
    };
  };

  const handleDone = () => {
    navigate('/');
  };

  if (showQR) {
    return (
      <div className="qr-container">
        <div>
          <h2>Customer QR Code</h2>
          <QRCodeCanvas id="customer-qr" value={customerQRValue} size={256} level="H" />
          <p>Give this code to the customer</p>
        </div>
        <div>
          <h2>Owner QR Code</h2>
          <QRCodeCanvas id="owner-qr" value={ownerQRValue} size={256} level="H" />
          <p>Keep this code for the owner</p>
        </div>
        <button className='print-button' onClick={handlePrint}>Print</button>
        <button onClick={handleDone}>Done</button>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} required>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Done/Completed">Done/Completed</option>
          </select>
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            style={{ width: '100%', resize: 'vertical' }}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default NewCustomerForm;
