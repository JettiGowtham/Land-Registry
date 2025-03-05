import { useState } from 'react'
import { FaPlus, FaSearch, FaFilter, FaEdit, FaTrash, FaEye } from 'react-icons/fa'
import './LandRegistry.css'

const LandRegistry = () => {
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  
  // Mock land registry data
  const [lands, setLands] = useState([
    { 
      id: 'L12345', 
      title: 'Residential Plot #123', 
      owner: 'John Doe', 
      location: '123 Main St, City', 
      area: '1200 sq ft', 
      status: 'registered',
      registrationDate: '2025-01-15'
    },
    { 
      id: 'L12346', 
      title: 'Commercial Plot #456', 
      owner: 'Jane Smith', 
      location: '456 Business Ave, City', 
      area: '2500 sq ft', 
      status: 'pending',
      registrationDate: '2025-02-20'
    },
    { 
      id: 'L12347', 
      title: 'Agricultural Land #789', 
      owner: 'Robert Johnson', 
      location: 'Rural Route 7, County', 
      area: '5 acres', 
      status: 'registered',
      registrationDate: '2024-11-05'
    },
    { 
      id: 'L12348', 
      title: 'Residential Plot #234', 
      owner: 'Emily Davis', 
      location: '234 Oak St, City', 
      area: '1500 sq ft', 
      status: 'disputed',
      registrationDate: '2025-03-10'
    }
  ])
  
  const [formData, setFormData] = useState({
    title: '',
    owner: '',
    location: '',
    area: '',
    coordinates: '',
    description: '',
    documents: null
  })
  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }
  
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      documents: e.target.files[0]
    })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would send data to the blockchain/backend
    const newLand = {
      id: `L${Math.floor(10000 + Math.random() * 90000)}`,
      title: formData.title,
      owner: formData.owner,
      location: formData.location,
      area: formData.area,
      status: 'pending',
      registrationDate: new Date().toISOString().split('T')[0]
    }
    
    setLands([...lands, newLand])
    setFormData({
      title: '',
      owner: '',
      location: '',
      area: '',
      coordinates: '',
      description: '',
      documents: null
    })
    setShowForm(false)
  }
  
  const filteredLands = lands.filter(land => {
    const matchesSearch = land.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         land.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         land.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterStatus === 'all' || land.status === filterStatus
    
    return matchesSearch && matchesFilter
  })
  
  return (
    <div className="land-registry">
      <div className="page-header">
        <h1>Land Registry</h1>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          <FaPlus /> Register New Land
        </button>
      </div>
      
      {showForm && (
        <div className="registration-form card">
          <h2>Register New Land</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="title">Land Title</label>
                <input 
                  type="text" 
                  id="title" 
                  name="title" 
                  className="form-control" 
                  value={formData.title} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="owner">Owner Name</label>
                <input 
                  type="text" 
                  id="owner" 
                  name="owner" 
                  className="form-control" 
                  value={formData.owner} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input 
                  type="text" 
                  id="location" 
                  name="location" 
                  className="form-control" 
                  value={formData.location} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="area">Area</label>
                <input 
                  type="text" 
                  id="area" 
                  name="area" 
                  className="form-control" 
                  value={formData.area} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="coordinates">GPS Coordinates</label>
              <input 
                type="text" 
                id="coordinates" 
                name="coordinates" 
                className="form-control" 
                value={formData.coordinates} 
                onChange={handleInputChange} 
                placeholder="e.g., 40.7128° N, 74.0060° W" 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea 
                id="description" 
                name="description" 
                className="form-control" 
                value={formData.description} 
                onChange={handleInputChange} 
                rows="3"
              ></textarea>
            </div>
            
            <div className="form-group">
              <label htmlFor="documents">Upload Documents</label>
              <input 
                type="file" 
                id="documents" 
                name="documents" 
                className="form-control" 
                onChange={handleFileChange} 
              />
              <small>Upload property deeds, surveys, or other relevant documents</small>
            </div>
            
            <div className="form-actions">
              <button type="button" className="btn-danger" onClick={() => setShowForm(false)}>Cancel</button>
              <button type="submit" className="btn-success">Register Land</button>
            </div>
          </form>
        </div>
      )}
      
      <div className="filter-section">
        <div className="search-box">
          <FaSearch />
          <input 
            type="text" 
            placeholder="Search by title, owner, or ID..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>
        
        <div className="filter-box">
          <FaFilter />
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="registered">Registered</option>
            <option value="pending">Pending</option>
            <option value="disputed">Disputed</option>
          </select>
        </div>
      </div>
      
      <div className="lands-table-container">
        <table className="lands-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Owner</th>
              <th>Location</th>
              <th>Area</th>
              <th>Status</th>
              <th>Registration Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLands.map(land => (
              <tr key={land.id}>
                <td>{land.id}</td>
                <td>{land.title}</td>
                <td>{land.owner}</td>
                <td>{land.location}</td>
                <td>{land.area}</td>
                <td>
                  <span className={`status-badge ${land.status}`}>
                    {land.status.charAt(0).toUpperCase() + land.status.slice(1)}
                  </span>
                </td>
                <td>{land.registrationDate}</td>
                <td className="actions">
                  <button className="action-btn view" title="View Details">
                    <FaEye />
                  </button>
                  <button className="action-btn edit" title="Edit">
                    <FaEdit />
                  </button>
                  <button className="action-btn delete" title="Delete">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredLands.length === 0 && (
          <div className="no-results">
            <p>No land records found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default LandRegistry