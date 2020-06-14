import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'


export default class MapCountry extends React.Component {
  constructor(props) {
	super(props);
	this.state = { 
		infoLat: 50,
		infoLong: 10,
		zoom: 5
	};

  }

  render() {
    const position = [this.props.lat, this.props.long]
	return (
	  <div className="map" style={{ width: "100%", height: "520px" }}>
		  <div className="Subpage-country__head">
		  	<h2 className="Subpage-country__title"><span role="img">📍🗺️</span> {this.props.name} na zemljevidu:</h2>
		  </div>
	      <Map className="map-element" style={{ width: "100%", height: "450px" }} center={position} zoom={this.state.zoom}>
	        <TileLayer
	          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
	        />
	        <Marker position={position}>
	          <Popup>
	            {this.props.name}
	          </Popup>
	        </Marker>
	      </Map>
      </div>
	);
  }

}
