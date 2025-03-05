import { useState } from 'react'
import { FaPlus, FaSearch, FaFilter, FaEye, FaCheck, FaTimes, FaSpinner } from 'react-icons/fa'
import './PropertyTransactions.css'

const PropertyTransactions = () => {
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  
  // Mock transaction data
  const [transactions, setTransactions] = useState([
    {
      id: 'TX12345',
      propertyId: 'L12345',
      propertyTitle: 'Residential Plot #123',
      seller: 'John Doe',
      buyer: 'Jane Smith',
      amount: '$250,000',
      date: '2025-03-15',
      status: 'completed',
      blockchainHash: '0x7f9e8d7c6b5a4e3d2c1b0a9f8e7d6c5b4a3f2e1d'
    },
    {
      id: 'TX12346',
      propertyId: 'L12346',
      propertyTitle: 'Commercial Plot #456',
      seller: 'Robert Johnson',
      buyer: 'Emily Davis',
      amount: '$500,000',
      date: '2025-03-20',
      status: 'pending',
      blockchainHash: ''
    },
    {
      id: 'TX12347',
      propertyId: 'L12347',
      propertyTitle: 'Agricultural Land #789',
      seller: 'Michael Wilson',
      buyer: 'Sarah Brown',
      amount: '$150,000',
      date: '2025-03-10',
      status: 'processing',
      blockchainHash: '0x3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4'
    },
    {
      id: 'TX12348',
      propertyId: 'L12348',
      propertyTitle: 'Residential Plot #234',
      seller: 'David Miller',
      buyer: 'Lisa Anderson',
      amount: '$320,000',
      date: '2025-03-05',
      status: 'rejected',
      blockchainHash: ''
    }
  ])
  
  const [formData, setFormData] = useState({
    propertyId: '',
    propertyTitle: '',
    seller: '',
    buyer: '',
    amount: '',
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
    const newTransaction = {
      id: `TX${Math.floor(10000 + Math.random() * 90000)}`,
      propertyId: formData.propertyId,
      propertyTitle: formData.propertyTitle,
      seller: formData.seller,
      buyer: formData.buyer,
      amount: formData.amount,
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
      blockchainHash: ''
    }
    
    setTransactions([...transactions, newTransaction])
    setFormData({
      propertyId: '',
      propertyTitle: '',
      seller: '',
      buyer: '',
      amount: '',
      description: '',
      documents: null
    })
    setShowForm(false)
  }
  
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.propertyTitle.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         transaction.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterStatus === 'all' || transaction.status === filterStatus
    
    return matchesSearch && matchesFilter
  })
  
  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed':
        return <FaCheck className="status-icon completed" />
      case 'rejected':
        return <FaTimes className="status-icon rejected" />
      case 'processing':
        return <FaSpinner className="status-icon processing" />
      case 'pending':
        return <FaSpinner className="status-icon pending" />
      default:
        return null
    }
  }
  
  return (
    <div className="property-transactions">
      <div className="page-header">
        <h1>Property Transactions</h1>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          <FaPlus /> New Transaction
        </button>
      </div>
      
      {showForm && (
        <div className="transaction-form card">
          <h2>New Property Transaction</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="propertyId">Property ID</label>
                <input 
                  type="text" 
                  id="propertyId" 
                  name="propertyId" 
                  className="form-control" 
                  value={formData.propertyId} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="propertyTitle">Property Title</label>
                <input 
                  type="text" 
                  id="propertyTitle" 
                  name="propertyTitle" 
                  className="form-control" 
                  value={formData.propertyTitle} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="seller">Seller</label>
                <input 
                  type="text" 
                  id="seller" 
                  name="seller" 
                  className="form-control" 
                  value={formData.seller} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="buyer">Buyer</label>
                <input 
                  type="text" 
                  id="buyer" 
                  name="buyer" 
                  className="form-control" 
                  value={formData.buyer} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="amount">Transaction Amount</label>
              <input 
                type="text" 
                id="amount" 
                name="amount" 
                className="form-control" 
                value={formData.amount} 
                onChange={handleInputChange} 
                required 
                placeholder="e.g., $250,000"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Transaction Details</label>
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
              <small>Upload sale agreements, payment proofs, or other relevant documents</small>
            </div>
            
            <div className="form-actions">
              <button type="button" className="btn-danger" onClick={() => setShowForm(false)}>Cancel</button>
              <button type="submit" className="btn-success">Submit Transaction</button>
            </div>
          </form>
        </div>
      )}
      
      <div className="filter-section">
        <div className="search-box">
          <FaSearch />
          <input 
            type="text" 
            placeholder="Search by property, buyer, seller, or ID..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>
        
        <div className="filter-box">
          <FaFilter />
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>
      
      <div className="transactions-container">
        {filteredTransactions.map(transaction => (
          <div key={transaction.id} className="transaction-card">
            <div className="transaction-header">
              <div className="transaction-id">{transaction.id}</div>
              <div className={`transaction-status ${transaction.status}`}>
                {getStatusIcon(transaction.status)}
                <span>{transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}</span>
              </div>
            </div>
            
            <div className="transaction-body">
              <div className="property-info">
                <h3>{transaction.propertyTitle}</h3>
                <p className="property-id">Property ID: {transaction.propertyId}</p>
              </div>
              
              <div className="transaction-details">
                <div className="detail-row">
                  <div className="detail-label">Seller:</div>
                  <div className="detail-value">{transaction.seller}</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Buyer:</div>
                  <div className="detail-value">{transaction.buyer}</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Amount:</div>
                  <div className="detail-value">{transaction.amount}</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Date:</div>
                  <div className="detail-value">{transaction.date}</div>
                </div>
              </div>
              
              {transaction.blockchainHash && (
                <div className="blockchain-info">
                  <div className="detail-label">Blockchain Hash:</div>
                  <div className="hash-value">{transaction.blockchainHash}</div>
                </div>
              )}
            </div>
            
            <div className="transaction-footer">
              <button className="btn-primary">
                <FaEye /> View Details
              </button>
            </div>
          </div>
        ))}
        
        {filteredTransactions.length === 0 && (
          <div className="no-results">
            <p>No transactions found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PropertyTransactions