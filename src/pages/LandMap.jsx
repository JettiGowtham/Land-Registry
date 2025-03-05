import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMap } from 'react-leaflet'
import { FaSearch, FaLayerGroup, FaDrawPolygon, FaMapMarkerAlt, FaRuler } from 'react-icons/fa'
import './LandMap.css'

// Component to set map view
const SetViewOnLoad = ({ center, zoom }) => {
  const map = useMap()
  useEffect(() => {
    map.setView(center, zoom)
  }, [center, zoom, map])
  return null
}

const LandMap = () => {
  const [mapCenter, setMapCenter] = useState([28.6139, 77.2090]) // Default: New Delhi
  const [mapZoom, setMapZoom] = useState(13)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeLayer, setActiveLayer] = useState('satellite')
  const [drawMode, setDrawMode] = useState(false)
  const [measureMode, setMeasureMode] = useState(false)
  
  // Mock land plot data
  const landPlots = [
    {
      id: 'P1',
      owner: 'John Doe',
      title: 'Residential Plot #123',
      coordinates: [
        [28.6139, 77.2090],
        [28.6150, 77.2100],
        [28.6145, 77.2110],
        [28.6135, 77.2100]
      ],
      status: 'registered',
      color: '#27ae60'
    },
    {
      id: 'P2',
      owner: 'Jane Smith',
      title: 'Commercial Plot #456',
      coordinates: [
        [28.6160, 77.2070],
        [28.6170, 77.2080],
        [28.6165, 77.2090],
        [28.6155, 77.2080]
      ],
      status: 'pending',
      color: '#f39c12'
    },
    {
      id: 'P3',
      owner: 'Robert Johnson',
      title: 'Agricultural Land #789',
      coordinates: [
        [28.6120, 77.2050],
        [28.6130, 77.2060],
        [28.6125, 77.2070],
        [28.6115, 77.2060]
      ],
      status: 'disputed',
      color: '#e74c3c'
    }
  ]
  
  const handleSearch = (e) => {
    e.preventDefault()
    // In a real app, this would search for coordinates or addresses
    // For demo, we'll just set a new center
    setMapCenter([28.6129, 77.2295]) // Connaught Place
    setMapZoom(15)
  }
  
  const toggleDrawMode = () => {
    setDrawMode(!drawMode)
    if (measureMode) setMeasureMode(false)
  }
  
  const toggleMeasureMode = () => {
    setMeasureMode(!measureMode)
    if (drawMode) setDrawMode(false)
  }
  
  return (
    <div className="land-map-page">
      <div className="map-sidebar">
        <div className="map-search">
          <h3>Search Location</h3>
          <form onSubmit={handleSearch}>
            <div className="search-input">
              <input 
                type="text" 
                placeholder="Enter address or coordinates" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit">
                <FaSearch />
              </button>
            </div>
          </form>
        </div>
        
        <div className="map-layers">
          <h3>Map Layers</h3>
          <div className="layer-options">
            <button 
              className={activeLayer === 'satellite' ? 'active' : ''}
              onClick={() => setActiveLayer('satellite')}
            >
              Satellite
            </button>
            <button 
              className={activeLayer === 'street' ? 'active' : ''}
              onClick={() => setActiveLayer('street')}
            >
              Street
            </button>
            <button 
              className={activeLayer === 'terrain' ? 'active' : ''}
              onClick={() => setActiveLayer('terrain')}
            >
              Terrain
            </button>
          </div>
        </div>
        
        <div className="map-tools">
          <h3>Tools</h3>
          <div className="tool-buttons">
            <button 
              className={drawMode ? 'active' : ''}
              onClick={toggleDrawMode}
              title="Draw Plot"
            >
              <FaDrawPolygon /> Draw
            </button>
            <button 
              className={measureMode ? 'active' : ''}
              onClick={toggleMeasureMode}
              title="Measure Distance"
            >
              <FaRuler /> Measure
            </button>
            <button title="Add Marker">
              <FaMapMarkerAlt /> Mark
            </button>
            <button title="Toggle Layers">
              <FaLayerGroup /> Layers
            </button>
          </div>
        </div>
        
        <div className="land-plots-list">
          <h3>Land Plots</h3>
          <div className="plots">
            {landPlots.map(plot => (
              <div key={plot.id} className="plot-item">
                <div className="plot-color" style={{ backgroundColor: plot.color }}></div>
                <div className="plot-info">
                  <h4>{plot.title}</h4>
                  <p>Owner: {plot.owner}</p>
                  <span className={`status-badge ${plot.status}`}>
                    {plot.status.charAt(0).toUpperCase() + plot.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="map-container">
        <MapContainer 
          center={mapCenter} 
          zoom={mapZoom} 
          style={{ height: '100%', width: '100%' }}
        >
          <SetViewOnLoad center={mapCenter} zoom={mapZoom} />
          
          {/* Choose tile layer based on active layer */}
          {activeLayer === 'satellite' && (
            <TileLayer
              url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
              maxZoom={20}
              subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
              attribution="&copy; Google Maps"
            />
          )}
          
          {activeLayer === 'street' && (
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
              maxZoom={19}
            />
          )}
          
          {activeLayer === 'terrain' && (
            <TileLayer
              url="https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}"
              maxZoom={20}
              subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
              attribution="&copy; Google Maps"
            />
          )}
          
          {/* Display land plots as polygons */}
          {landPlots.map(plot => (
            <Polygon 
              key={plot.id}
              positions={plot.coordinates}
              pathOptions={{ 
                color: plot.color,
                fillOpacity: 0.4,
                weight: 2
              }}
            >
              <Popup>
                <div>
                  <h3>{plot.title}</h3>
                  <p><strong>Owner:</strong> {plot.owner}</p>
                  <p><strong>Status:</strong> {plot.status}</p>
                  <p><strong>ID:</strong> {plot.id}</p>
                </div>
              </Popup>
            </Polygon>
          ))}
          
          {/* Center marker */}
          <Marker position={mapCenter}>
            <Popup>
              <div>
                <h3>Selected Location</h3>
                <p>Latitude: {mapCenter[0].toFixed(4)}</p>
                <p>Longitude: {mapCenter[1].toFixed(4)}</p>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
        
        {drawMode && (
          <div className="draw-instructions">
            <p>Click on the map to start drawing a plot. Double-click to finish.</p>
          </div>
        )}
        
        {measureMode && (
          <div className="measure-instructions">
            <p>Click on the map to start measuring. Click again to end.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default LandMap