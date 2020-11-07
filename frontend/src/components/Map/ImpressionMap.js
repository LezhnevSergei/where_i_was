import React, {useEffect, useState} from 'react';
import {Map, Marker, TileLayer} from "react-leaflet";
import '../../pages/Impressions/Impressions.css'

const ImpressionMap = (props) => {
  const isNewImpression = !Boolean(props.coords)
  const [center, setCenter] = useState(isNewImpression ? [50, 10] : props.coords)
  const zoom = isNewImpression ? 1.5 : 13
  const [coords, setCoords] = useState(props.coords)

  useEffect(() => {
    if (!isNewImpression) {
      setCenter(coords)
    }
  }, [coords])

  const addLocation = (e) => {
    const coords = [e.latlng.lat, e.latlng.lng]
    if (coords && isNewImpression)
      props.getCoords(coords)
      setCoords(coords)
  }

  return (
    <div className='impression__map'>
      <Map
        center={center}
        zoom={zoom}
        onClick={(event) => {
          addLocation(event)
        }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
          coords && (
            <Marker position={coords}/>
          )
        }
      </Map>
    </div>
  );
};

export default ImpressionMap;