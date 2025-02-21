import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../supabaseClient';

const DisplayData = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const { data: customerData, error: fetchError } = await supabase
                    .from('customers')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (fetchError) {
                    throw fetchError;
                }

                if (customerData) {
                    setData(customerData);
                } else {
                    setData({ error: 'No data found for this code.' });
                }
            } catch (error) {
                setError(error.message);
                console.error("Error fetching data:", error);
                setData({ error: 'Failed to fetch data.' });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
        return (
            <div>
                <div>Error: {error}</div>
            </div>
        );
    }

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
