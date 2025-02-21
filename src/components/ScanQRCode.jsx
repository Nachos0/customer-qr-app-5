import React, { useState, useRef, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom';

const ScanQRCode = () => {
  const scannerRef = useRef(null);
  const navigate = useNavigate();
    const [scannerActive, setScannerActive] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');


  useEffect(() => {
      console.log("useEffect running");
      if (!scannerActive) {
          console.log("Scanner not active");
          return;
      }
    const html5QrcodeScanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: 250 },
       false);

    html5QrcodeScanner.render(onScanSuccess, onScanError);

    function onScanSuccess(decodedText, decodedResult) {
      console.log(`Scan result: ${decodedText}`, decodedResult);
        setErrorMessage('');
        try {
            const parsedData = JSON.parse(decodedText);
            if (parsedData && parsedData.id) {
                if (parsedData.type === 'customer') {
                    // Get current status from localStorage
                    const storedData = localStorage.getItem(parsedData.id);
                    const currentStatus = storedData ? JSON.parse(storedData).status : null;

                    // Navigate and pass the current status
                    navigate(`/display/${parsedData.id}`, { state: { currentStatus } });
                } else {
                    navigate(`/display/${parsedData.id}`);
                }
            } else {
                setErrorMessage('Invalid QR Code data.');
            }

        } catch (error) {
            console.error("Failed to parse QR code data:", error);
            setErrorMessage('Failed to parse QR code data.');
        }

      html5QrcodeScanner.clear().then(() => {
          setScannerActive(false);
      }).catch((error) => {
          console.error("Failed to clear scanner:", error);
      });
    }

    function onScanError(error) {
      console.error("Scan error:", error);
    }

      return () => {
          console.log("useEffect cleanup");
          if (scannerActive) {
              html5QrcodeScanner.clear().catch((error) => {
                  console.error("Failed to clear scanner:", error);
              });
          }
      };
  }, [navigate, scannerActive]);

  return (
      <>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <div id="qr-reader" style={{ width: '100%' }}></div>
      </>
  );
};

export default ScanQRCode;
