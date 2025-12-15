// Simple test to verify API connection
const testAPI = async () => {
  try {
    console.log('Testing API connection...');
    const response = await fetch('http://127.0.0.1:8000/api/announcements', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'include'
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
    
    const data = await response.json();
    console.log('Response data:', data);
    console.log('Number of announcements:', data.length);
    
    if (data.length > 0) {
      console.log('First announcement:', data[0]);
    }
    
  } catch (error) {
    console.error('API test failed:', error);
  }
};

testAPI();
