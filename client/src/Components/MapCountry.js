import React from 'react';
import OlMap from "ol/Map";
import OlView from "ol/View";
import OlLayerTile from "ol/layer/Tile";
import OlSourceOSM from "ol/source/OSM";
import * as olProj from 'ol/proj';


export default class MapCountry extends React.Component {
  constructor(props) {
	super(props);

	console.log(this.props)


	this.state = { infoLat: 0, infoLong: 0 };

  }

  componentDidMount() {
  	console.log(this.props)
	this.olmap = new OlMap({
	  target: null,
	  layers: [
		new OlLayerTile({
		  source: new OlSourceOSM()
		})
	  ],
	  view: new OlView({
		center: olProj.fromLonLat([this.props.long, this.props.lat]), 
		zoom: 5
	  })
	});
	this.olmap.setTarget("map");

	setTimeout(() => {
		this.olmap.getView().setCenter(olProj.fromLonLat([this.props.long, this.props.lat]))
		console.log("updated map")
	}, 2000)


	// Listen to map changes
	this.olmap.on("moveend", () => {
	  let center = this.olmap.getView().getCenter();
	  let zoom = this.olmap.getView().getZoom();
	});
  }

  shouldComponentUpdate(nextProps, nextState) {
    let center = this.olmap.getView().getCenter();
    let zoom = this.olmap.getView().getZoom();
    if (this.props !== this.state) return false;
  }

  render() {
	return (
	  <div id="map" style={{ width: "100%", height: "360px" }}>
	  </div>
	);
  }

}
