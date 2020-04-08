import React, { useState, useEffect } from 'react';
import * as topojson from 'topojson-client';
import { scaleQuantize } from '@vx/scale';
import { Mercator, Graticule } from '@vx/geo';
import topology from './world-topo.json';

const world = topojson.feature(topology, topology.objects.units);
const color = scaleQuantize({
  domain: [
    Math.min(...world.features.map(f => f.geometry.coordinates.length)),
    Math.max(...world.features.map(f => f.geometry.coordinates.length))
  ],
  range: ['#ffb01d', '#ffa020', '#ff9221', '#ff8424', '#ff7425', '#fc5e2f', '#f94b3a', '#f63a48']
});



function Map(props) {

	const centerX = props.width / 2;
	const centerY = props.height / 2;
	const scale = props.width / 630 * 100;

	return (
		<div className="map">
		    <svg width={props.width} height={props.height}>
		      <rect x={0} y={0} width={props.width} height={props.height} fill={props.bg} rx={14} />
		      <Mercator data={world.features} scale={scale} translate={[centerX, centerY + 50]}>
		        {mercator => {
		          return (
		            <g>
		              <Graticule graticule={g => mercator.path(g)} stroke={'rgba(33,33,33,0.05)'} />
		              {mercator.features.map((feature, i) => {
		                const { feature: f } = feature;
		                return (
		                  <path
		                    key={`map-feature-${i}`}
		                    d={mercator.path(f)}
		                    fill={color(f.geometry.coordinates.length)}
		                    stroke={props.bg}
		                    strokeWidth={0.5}
		                    onClick={event => {
		                      console.log(`clicked: ${f.properties.name} (${f.id})`);
		                    }}
		                  />
		                );
		              })}
		            </g>
		          );
		        }}
		      </Mercator>
		    </svg>
		</div>
	);
}

export default Map;