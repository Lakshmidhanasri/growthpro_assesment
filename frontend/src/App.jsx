import { useState } from 'react';
import axios from 'axios';
import BusinessForm from './components/BusinessForm';
import BusinessCard from './components/BusinessCard';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [businessData, setBusinessData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/business-data', formData);
      setBusinessData({ ...formData, ...response.data });
    } catch (error) {
      console.error('Error fetching business data:', error);
    } finally {
      setLoading(false);
    }
  };

  const regenerateHeadline = async () => {
    if (!businessData) return;
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/regenerate-headline', {
        params: { name: businessData.name, location: businessData.location }
      });
      setBusinessData(prev => ({ ...prev, headline: response.data.headline }));
    } catch (error) {
      console.error('Error regenerating headline:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Local Business Dashboard</h1>
      <BusinessForm onSubmit={handleSubmit} />
      {loading && <LoadingSpinner />}
      {businessData && !loading && (
        <BusinessCard data={businessData} onRegenerate={regenerateHeadline} />
      )}
    </div>
  );
}

export default App;
