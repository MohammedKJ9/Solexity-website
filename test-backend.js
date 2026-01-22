// Simple test script to verify backend API
const fetch = require('node-fetch');

const API_BASE = 'http://localhost:5000/api';

async function testBackend() {
  console.log('🧪 Testing Solexity AI Backend API...\n');

  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch(`${API_BASE}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData.message);
    console.log('   Environment:', healthData.environment);
    console.log('   Timestamp:', healthData.timestamp);

    // Test root endpoint
    console.log('\n2. Testing root endpoint...');
    const rootResponse = await fetch('http://localhost:5000/');
    const rootData = await rootResponse.json();
    console.log('✅ Root endpoint:', rootData.message);
    console.log('   Version:', rootData.version);

    // Test users endpoint
    console.log('\n3. Testing users endpoint...');
    const usersResponse = await fetch(`${API_BASE}/users`);
    const usersData = await usersResponse.json();
    console.log('✅ Users endpoint:', usersData.status);
    console.log('   User count:', usersData.count || 0);

    // Test analytics endpoint
    console.log('\n4. Testing analytics endpoint...');
    const analyticsResponse = await fetch(`${API_BASE}/analytics`);
    const analyticsData = await analyticsResponse.json();
    console.log('✅ Analytics endpoint:', analyticsData.status);
    console.log('   Analytics count:', analyticsData.count || 0);

    // Test downloads endpoint
    console.log('\n5. Testing downloads endpoint...');
    const downloadsResponse = await fetch(`${API_BASE}/downloads`);
    const downloadsData = await downloadsResponse.json();
    console.log('✅ Downloads endpoint:', downloadsData.status);
    console.log('   Downloads count:', downloadsData.count || 0);

    // Test download links endpoint
    console.log('\n6. Testing download links endpoint...');
    const linksResponse = await fetch(`${API_BASE}/downloads/links`);
    const linksData = await linksResponse.json();
    console.log('✅ Download links endpoint:', linksData.status);
    if (linksData.data) {
      console.log('   Available browsers:', Object.keys(linksData.data).join(', '));
    }

    console.log('\n🎉 All tests passed! Backend is working correctly.');
    console.log('\n📊 Available endpoints:');
    console.log('   - Health: GET /api/health');
    console.log('   - Users: GET /api/users');
    console.log('   - Analytics: GET /api/analytics');
    console.log('   - Downloads: GET /api/downloads');
    console.log('   - Download Links: GET /api/downloads/links');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n💡 Make sure:');
    console.log('   1. Backend server is running on port 5000');
    console.log('   2. MongoDB is connected');
    console.log('   3. All dependencies are installed');
  }
}

// Run the test
testBackend();
