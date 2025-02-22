// admin.js - Admin-specific scripts for monitoring and mock data display

document.addEventListener('DOMContentLoaded', () => {
  // Simulate fraud detection alerts
  const fraudAlerts = [
      { id: 1, description: 'Duplicate biometric scan detected', timestamp: '2023-10-01 09:55 AM' },
      { id: 2, description: 'Unusual GPS location detected', timestamp: '2023-10-01 10:07 AM' },
  ];

  const fraudAlertList = document.getElementById('fraud-alert-list');
  if (fraudAlertList) {
      fraudAlerts.forEach(alert => {
          const alertItem = document.createElement('li');
          alertItem.innerHTML = `
              <strong>${alert.timestamp}</strong>: ${alert.description}
          `;
          fraudAlertList.appendChild(alertItem);
      });
  }




  // Simulate real-time updates
  setInterval(() => {
      console.log('Simulating real-time updates...');
      // You can add logic here to refresh data periodically
  }, 5000);
});
