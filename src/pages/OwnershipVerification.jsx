import { useState } from 'react'
import { FaSearch, FaCheckCircle, FaTimesCircle, FaSpinner, FaHistory, FaFileAlt } from 'react-icons/fa'
import './OwnershipVerification.css'

const OwnershipVerification = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchResult, setSearchResult] = useState(null)
  const [verificationHistory, setVerificationHistory] = useState([
    {
      id: 'V12345',
      propertyId: 'L12345',
      propertyTitle: 'Residential Plot #123',
      owner: 'John Doe',
      verifiedAt: '2025-03-10 14:30',
      status: 'verified',
      blockchainHash: '0x7f9e8d7c6b5a4e3d2c1b0a9f8e7d6c5b4a3f2e1d'
    },
    {
      id: 'V12346',
      propertyId: 'L12346',
      propertyTitle: 'Commercial Plot #456',
      owner: 'Jane Smith',
      verifiedAt: '2025-03-05 09:15',
      status: 'verified',
      blockchainHash: '0x3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4'
    },
    {
      id: 'V12347',
      propertyId: 'L12348',
      propertyTitle: 'Residential Plot #234',
      owner: 'Unknown',
      verifiedAt: '2025-03-01 11:45',
      status: 'unverified',
      blockchainHash: ''
    }
  ])
  
  // Mock verification result data
  const mockVerificationData = {
    'L12345': {
      propertyId: 'L12345',
      propertyTitle: 'Residential Plot #123',
      owner: 'John Doe',
      registrationDate: '2024-10-15',
      status: 'verified',
      blockchainHash: '0x7f9e8d7c6b5a4e3d2c1b0a9f8e7d6c5b4a3f2e1d',
      lastTransfer: '2024-12-20',
      documents: [
        { name: 'Deed.pdf', verified: true },
        { name: 'SurveyReport.pdf', verified: true },
        { name: 'TaxReceipt.pdf', verified: true }
      ]
    },
    'L12346': {
      propertyId: 'L12346',
      propertyTitle: 'Commercial Plot #456',
      owner: 'Jane Smith',
      registrationDate: '2024-11-05',
      status: 'verified',
      blockchainHash: '0x3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4',
      lastTransfer: '2025-01-10',
      documents: [
        { name: 'Deed.pdf', verified: true },
        { name: 'SurveyReport.pdf', verified: true },
        { name: 'TaxReceipt.pdf', verified: false }
      ]
    },
    'L12348': {
      propertyId: 'L12348',
      propertyTitle: 'Residential Plot #234',
      owner: 'Unknown',
      registrationDate: '2025-02-25',
      status: 'unverified',
      blockchainHash: '',
      lastTransfer: 'N/A',
      documents: [
        { name: 'Deed.pdf', verified: false },
        { name: 'SurveyReport.pdf', verified: false },
        { name: 'TaxReceipt.pdf', verified: false }
      ]
    }
  }
  
  const handleSearch = (e) => {
    e.preventDefault()
    
    if (!searchQuery.trim()) return
    
    setIsSearching(true)
    setSearchResult(null)
    
    // Simulate API call delay
    setTimeout(() => {
      const result = mockVerificationData[searchQuery] || null
      
      setSearchResult(result)
      setIsSearching(false)
      
      // Add to verification history if found
      if (result) {
        const newVerification = {
          id: `V${Math.floor(10000 + Math.random() * 90000)}`,
          propertyId: result.propertyId,
          propertyTitle: result.propertyTitle,
          owner: result.owner,
          verifiedAt: new Date().toLocaleString(),
          status: result.status,
          blockchainHash: result.blockchainHash
        }
        
        setVerificationHistory([newVerification, ...verificationHistory])
      }
    }, 2000)
  }
  
  return (
    <div className="ownership-verification">
      <div className="page-header">
        <h1>Ownership Verification</h1>
      </div>
      
      <div className="verification-search card">
        <h2>Verify Land Ownership</h2>
        <p className="search-description">
          Enter a property ID to verify its ownership status on the blockchain.
        </p>
        
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input">
            <input 
              type="text" 
              placeholder="Enter Property ID (e.g., L12345)" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              required
            />
            <button type="submit" disabled={isSearching}>
              {isSearching ? <FaSpinner className="spinner" /> : <FaSearch />}
              {isSearching ? 'Searching...' : 'Verify'}
            </button>
          </div>
        </form>
      </div>
      
      {isSearching && (
        <div className="verification-loading card">
          <FaSpinner className="spinner large" />
          <p>Verifying ownership on the blockchain...</p>
        </div>
      )}
      
      {!isSearching && searchResult && (
        <div className="verification-result card">
          <div className="result-header">
            <h2>Verification Result</h2>
            <div className={`status-badge ${searchResult.status}`}>
              {searchResult.status === 'verified' ? (
                <>
                  <FaCheckCircle />
                  <span>Verified</span>
                </>
              ) : (
                <>
                  <FaTimesCircle />
                  <span>Unverified</span>
                </>
              )}
            </div>
          </div>
          
          <div className="result-details">
            <div className="detail-row">
              <div className="detail-label">Property ID:</div>
              <div className="detail-value">{searchResult.propertyId}</div>
            </div>
            <div className="detail-row">
              <div className="detail-label">Title:</div>
              <div className="detail-value">{searchResult.propertyTitle}</div>
            </div>
            <div className="detail-row">
              <div className="detail-label">Owner:</div>
              <div className="detail-value">{searchResult.owner}</div>
            </div>
            <div className="detail-row">
              <div className="detail-label">Registration:</div>
              <div className="detail-value">{searchResult.registrationDate}</div>
            </div>
            <div className="detail-row">
              <div className="detail-label">Last Transfer:</div>
              <div className="detail-value">{searchResult.lastTransfer}</div>
            </div>
          </div>
          
          {searchResult.blockchainHash && (
            <div className="blockchain-info">
              <div className="detail-label">Blockchain Hash:</div>
              <div className="hash-value">{searchResult.blockchainHash}</div>
            </div>
          )}
          
          <div className="document-verification">
            <h3>Document Verification</h3>
            <div className="documents-list">
              {searchResult.documents.map((doc, index) => (
                <div key={index} className="document-item">
                  <div className="document-icon">
                    <FaFileAlt />
                  </div>
                  <div className="document-name">{doc.name}</div>
                  <div className={`document-status ${doc.verified ? 'verified' : 'unverified'}`}>
                    {doc.verified ? <FaCheckCircle /> : <FaTimesCircle />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {!isSearching && searchResult === null && searchQuery && (
        <div className="verification-not-found card">
          <FaTimesCircle className="not-found-icon" />
          <h3>Property Not Found</h3>
          <p>No property record found with ID: {searchQuery}</p>
          <p>Please check the ID and try again.</p>
        </div>
      )}
      
      <div className="verification-history card">
        <div className="history-header">
          <h2>Verification History</h2>
          <FaHistory />
        </div>
        
        <div className="history-list">
          {verificationHistory.map(item => (
            <div key={item.id} className="history-item">
              <div className="history-time">{item.verifiedAt}</div>
              <div className="history-details">
                <h4>{item.propertyTitle}</h4>
                <p>ID: {item.propertyId} | Owner: {item.owner}</p>
              </div>
              <div className={`history-status ${item.status}`}>
                {item.status === 'verified' ? <FaCheckCircle /> : <FaTimesCircle />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OwnershipVerification