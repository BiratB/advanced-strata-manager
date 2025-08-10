// Mock API service for development
class StrataAPI {
  constructor() {
    this.users = [
      { email: 'thng0033@uni.sydney.edu.au', role: 'admin' },
      { email: 'alice@example.com', role: 'resident' },
      { email: 'bob@example.com', role: 'resident' }
    ];
    
    this.units = [
      { unit: '101', owner: 'Alice Johnson' },
      { unit: '102', owner: 'Bob Smith' },
      { unit: '103', owner: 'Carol Davis' },
      { unit: '201', owner: 'David Wilson' },
      { unit: '202', owner: 'Emma Brown' },
      { unit: '203', owner: 'Frank Miller' }
    ];
    
    this.currentUser = null;
  }

  async login(email) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.users.find(u => u.email === email);
        if (user) {
          this.currentUser = user;
          localStorage.setItem('strataUser', JSON.stringify(user));
          resolve({ success: true, role: user.role, email: user.email });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 500);
    });
  }

  async getDashboard() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.getCurrentUser();
        if (user) {
          const message = user.role === 'admin' 
            ? `Welcome Admin! You have full access to all strata management features.`
            : `Welcome Resident! You can view your unit information and submit maintenance requests.`;
          resolve({ message, role: user.role });
        } else {
          reject(new Error('Not authenticated'));
        }
      }, 300);
    });
  }

  async getStrataRoll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.units);
      }, 300);
    });
  }

  async submitMaintenanceRequest(unit, description) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ 
          status: 'success', 
          message: `Maintenance request for unit ${unit} has been submitted successfully.`,
          id: Math.random().toString(36).substr(2, 9)
        });
      }, 500);
    });
  }

  async sendEmail() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('Email confirmation sent successfully!');
      }, 800);
    });
  }

  getCurrentUser() {
    if (this.currentUser) return this.currentUser;
    const stored = localStorage.getItem('strataUser');
    if (stored) {
      this.currentUser = JSON.parse(stored);
      return this.currentUser;
    }
    return null;
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('strataUser');
  }
}

// Create global API instance
window.strataAPI = new StrataAPI();