import React, {useEffect, useState} from "react";
import './Impressions.css'
import {getImpressions, removeImpression} from "../../api";
import ImpressionMap from "../../components/Map/ImpressionMap";
import {Link, NavLink} from "react-router-dom";
import Loader from "../../components/Loader/Loader";

function Impressions({user}) {
  const [impressions, setImpressions] = useState([])
  const [isLoading, setIsLoding] = useState(false)
  const [isEmptyList, setIsEmptyList] = useState(false)

  useEffect(() => {
    setIsLoding(true)
    getImpressions().then(impressions => {
      setIsEmptyList(!impressions.length)
      setIsLoding(prevState => !prevState)
      setImpressions(impressions)
    })
  }, [])

  const removeHandler = (id) => {
    removeImpression(id).then(() => {
      const current_impressions = impressions.filter(impression => impression.id !== id)
      setImpressions(current_impressions)
      if (!current_impressions.length) {
        setIsEmptyList(true)
      }
    })
  }

  return (
    <>
      <div className='impressions'>
        {
          impressions?.length ? (
            <>
              <Link
                to={'/add_impression'}
                className='impressions__add'
              >
                Добавить воспоминание
              </Link>
              {
                impressions?.map(impression => {
                  return (
                    <div
                      className='impression'
                      key={impression + Math.random()}
                    >
                      <div className="impression__title">{impression.title}</div>
                      <ImpressionMap coords={[impression.lat, impression.lng]}/>
                      <div className="impression__text">{impression.comment}</div>
                      <div
                        className="impression_remove"
                        onClick={() => removeHandler(impression.id)}
                      >&times;</div>
                    </div>
                  )
                })
              }
            </>
          ) : null

        }
        {
          isEmptyList && (
            <>
              <Link
                to={'/add_impression'}
                className='impressions__add'
              >
                Добавить воспоминание
              </Link>
              <div
                style={{
                  marginRight: '20px',
                }}
              >
                У вас нет ни одного воспоминания
              </div>
            </>
          )
        }
      </div>
    </>

  );
}

export default Impressions;
