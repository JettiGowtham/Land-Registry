import { useState, useEffect } from 'react'
import { FaFileAlt, FaMapMarkedAlt, FaExchangeAlt, FaCheckCircle } from 'react-icons/fa'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js'
import { Pie, Bar } from 'react-chartjs-2'
import './Dashboard.css'

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title)

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalLands: 0,
    registeredLands: 0,
    pendingTransactions: 0,
    verifiedOwners: 0
  })

  // Mock data loading
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats({
        totalLands: 1245,
        registeredLands: 987,
        pendingTransactions: 32,
        verifiedOwners: 756
      })
    }, 1000)
  }, [])

  // Pie chart data
  const landStatusData = {
    labels: ['Registered', 'Pending', 'Disputed'],
    datasets: [
      {
        data: [70, 20, 10],
        backgroundColor: ['#27ae60', '#f39c12', '#e74c3c'],
        borderWidth: 0
      }
    ]
  }

  // Bar chart data
  const monthlyTransactionsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Transactions',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: '#3498db'
      }
    ]
  }

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Transactions'
      }
    }
  }

  // Recent activities mock data
  const recentActivities = [
    { id: 1, action: 'Land Registration', property: 'Plot #12345', user: 'John Doe', time: '2 hours ago' },
    { id: 2, action: 'Ownership Transfer', property: 'Plot #54321', user: 'Jane Smith', time: '1 day ago' },
    { id: 3, action: 'Boundary Verification', property: 'Plot #98765', user: 'Robert Johnson', time: '2 days ago' },
    { id: 4, action: 'Document Upload', property: 'Plot #45678', user: 'Emily Davis', time: '3 days ago' }
  ]

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon">
            <FaFileAlt />
          </div>
          <div className="stat-details">
            <h3>Total Lands</h3>
            <p className="stat-number">{stats.totalLands}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <FaMapMarkedAlt />
          </div>
          <div className="stat-details">
            <h3>Registered Lands</h3>
            <p className="stat-number">{stats.registeredLands}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <FaExchangeAlt />
          </div>
          <div className="stat-details">
            <h3>Pending Transactions</h3>
            <p className="stat-number">{stats.pendingTransactions}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <FaCheckCircle />
          </div>
          <div className="stat-details">
            <h3>Verified Owners</h3>
            <p className="stat-number">{stats.verifiedOwners}</p>
          </div>
        </div>
      </div>
      
      <div className="charts-container">
        <div className="chart-card">
          <h3>Land Status</h3>
          <div className="chart-wrapper">
            <Pie data={landStatusData} />
          </div>
        </div>
        
        <div className="chart-card">
          <h3>Transaction History</h3>
          <div className="chart-wrapper">
            <Bar data={monthlyTransactionsData} options={barOptions} />
          </div>
        </div>
      </div>
      
      <div className="recent-activities">
        <h3>Recent Activities</h3>
        <div className="activities-list">
          {recentActivities.map(activity => (
            <div key={activity.id} className="activity-item">
              <div className="activity-details">
                <h4>{activity.action}</h4>
                <p>Property: {activity.property}</p>
                <p>User: {activity.user}</p>
              </div>
              <div className="activity-time">
                {activity.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard