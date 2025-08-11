// Enhanced API service with CRM functionality
class StrataAPI {
  constructor() {
    this.users = [
      { 
        email: 'thng0033@uni.sydney.edu.au', 
        role: 'admin',
        name: 'System Administrator',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
      },
      { 
        email: 'alice@example.com', 
        role: 'resident',
        name: 'Alice Johnson',
        unit: '101',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
      },
      { 
        email: 'bob@example.com', 
        role: 'resident',
        name: 'Bob Smith',
        unit: '102',
        avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
      }
    ];
    
    this.units = [
      { unit: '101', owner: 'Alice Johnson', type: '2BR', levy: 850, status: 'current' },
      { unit: '102', owner: 'Bob Smith', type: '1BR', levy: 650, status: 'current' },
      { unit: '103', owner: 'Carol Davis', type: '2BR', levy: 850, status: 'overdue' },
      { unit: '201', owner: 'David Wilson', type: '3BR', levy: 1200, status: 'current' },
      { unit: '202', owner: 'Emma Brown', type: '2BR', levy: 850, status: 'current' },
      { unit: '203', owner: 'Frank Miller', type: '1BR', levy: 650, status: 'pending' },
      { unit: '301', owner: 'Grace Lee', type: '2BR', levy: 850, status: 'current' },
      { unit: '302', owner: 'Henry Chen', type: '1BR', levy: 650, status: 'current' },
      { unit: '303', owner: 'Sarah Wilson', type: '2BR', levy: 850, status: 'current' }
    ];
    
    this.maintenanceRequests = [
      { id: 'MR001', unit: '101', type: 'Plumbing', status: 'pending', priority: 'high', date: '2025-01-15' },
      { id: 'MR002', unit: '203', type: 'Electrical', status: 'in-progress', priority: 'medium', date: '2025-01-14' },
      { id: 'MR003', unit: '102', type: 'HVAC', status: 'completed', priority: 'low', date: '2025-01-13' }
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
          resolve({ success: true, user: user });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 800);
    });
  }

  async getDashboard() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.getCurrentUser();
        if (user) {
          const dashboardData = {
            user: user,
            stats: {
              totalUnits: this.units.length,
              activeRequests: this.maintenanceRequests.filter(r => r.status !== 'completed').length,
              overduePayments: this.units.filter(u => u.status === 'overdue').length,
              totalRevenue: this.units.reduce((sum, unit) => sum + unit.levy, 0)
            },
            recentActivity: [
              { type: 'maintenance', message: 'New plumbing request from Unit 101', time: '2 hours ago' },
              { type: 'payment', message: 'Levy payment received from Unit 202', time: '4 hours ago' },
              { type: 'communication', message: 'Monthly newsletter sent to all residents', time: '1 day ago' }
            ],
            upcomingTasks: [
              { task: 'Quarterly levy notices', due: '2025-02-01' },
              { task: 'Building inspection', due: '2025-02-15' },
              { task: 'AGM preparation', due: '2025-03-01' }
            ]
          };
          resolve(dashboardData);
        } else {
          reject(new Error('Not authenticated'));
        }
      }, 500);
    });
  }

  async getStrataRoll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.units);
      }, 300);
    });
  }

  async getMaintenanceRequests() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.maintenanceRequests);
      }, 400);
    });
  }

  async submitMaintenanceRequest(unit, description, priority = 'medium') {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newRequest = {
          id: 'MR' + String(Date.now()).slice(-3),
          unit: unit,
          type: this.categorizeRequest(description),
          description: description,
          status: 'pending',
          priority: priority,
          date: new Date().toISOString().split('T')[0]
        };
        this.maintenanceRequests.unshift(newRequest);
        resolve({ 
          status: 'success', 
          message: `Maintenance request submitted successfully!`,
          id: newRequest.id,
          estimatedResponse: '24-48 hours'
        });
      }, 600);
    });
  }

  categorizeRequest(description) {
    const keywords = {
      'Plumbing': ['water', 'leak', 'pipe', 'drain', 'toilet', 'sink'],
      'Electrical': ['light', 'power', 'outlet', 'electrical', 'switch'],
      'HVAC': ['heating', 'cooling', 'air', 'temperature', 'ventilation'],
      'General': ['door', 'window', 'paint', 'wall', 'floor']
    };
    
    for (const [category, words] of Object.entries(keywords)) {
      if (words.some(word => description.toLowerCase().includes(word))) {
        return category;
      }
    }
    return 'General';
  }

  async sendEmail(recipients = 'all', subject = 'Strata Communication', message = '') {
    return new Promise((resolve) => {
      setTimeout(() => {
        const recipientCount = recipients === 'all' ? this.units.length : 1;
        resolve({
          status: 'success',
          message: `Email sent successfully to ${recipientCount} recipient(s)`,
          deliveryTime: new Date().toLocaleTimeString()
        });
      }, 1000);
    });
  }

  async generateLevy(quarter = 'Q1 2025') {
    return new Promise((resolve) => {
      setTimeout(() => {
        const levyData = {
          quarter: quarter,
          totalAmount: this.units.reduce((sum, unit) => sum + unit.levy, 0),
          units: this.units.map(unit => ({
            ...unit,
            dueDate: '2025-03-31',
            lateFee: unit.status === 'overdue' ? 50 : 0
          }))
        };
        resolve(levyData);
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