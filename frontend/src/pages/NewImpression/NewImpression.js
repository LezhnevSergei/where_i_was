import React, {useEffect, useState} from 'react';
import ImpressionMap from "../../components/Map/ImpressionMap";
import {Link} from "react-router-dom";
import {addImpression} from "../../api";

const NewImpression = () => {
  const [fields, setFields] = useState({title: '', text: ''})
  const [coords, setCoords] = useState(null)

  useEffect(() => {
    if (coords) {
      setFields({
        ...fields,
        lat: coords[0].toFixed(7),
        lng: coords[1].toFixed(7),
      })
    }
  }, [coords])

  const addImpressionHandler = (e) => {
    if (fields.title && fields.comment && fields.lat && fields.lng) {
      addImpression(fields)
    } else {
      e.preventDefault()
    }
  }

  return (
    <div>
      <div className='impression'>
        <ImpressionMap
          getCoords={setCoords}
        />
        <div className="title">
          Заголовок<br/>
          <input
            type='text'
            className="impression__title"
            value={fields.title}
            onChange={(e) => {
              setFields({
                ...fields,
                title: e.target.value,
              })
            }}
          />
        </div>
        Комментарий
        <textarea
          className="impression__text"
          style={{margin: '0px', width: '775px', height: '65px',}}
          value={fields.comment}
          onChange={(e) => {
            setFields({
              ...fields,
              comment: e.target.value,
            })
          }}
        />
      </div>
      <Link
        to={''}
        className='impressions__add'
        onClick={(e) => addImpressionHandler(e)}
      >
        Добавить воспоминание
      </Link>
    </div>
  );
};

export default NewImpression;