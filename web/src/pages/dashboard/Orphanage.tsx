import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";

import '../../styles/pages/orphanage.css';
import '../../styles/pages/dashboard/orphanage.css';
import mapIcon from "../../utils/mapicon";
import api from "../../services/api";
import NavBar from "../../components/navbar";

import history from './../../history'

interface Orphanage {
  id: number
  latitude: number
  longitude: number
  name: string
  about: string
  instructions: string
  opening_hours: string
  open_on_weekends: boolean
  is_visible: boolean
  images: Array<{
    id: number
    url: string
  }>
}

interface param {
  id: string
}

export default function Orphanage() {
  const params = useParams<param>();
  const [orphanage, setOrphanage] = useState<Orphanage>();
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  useEffect(() => {
    api.get(`orphanages/${params.id}`).then(response => {
      setOrphanage(response.data);
    })
  }, [params.id])

  if (!orphanage) {
    return <p>Carregando...</p>;
  }

  function acceptOrphanage() {
    const data = {
      is_visible: true
    }
    api.patch(`dashboard/orphanages/${params.id}`, data).then(response => {
      history.push('/dashboard/orphanages')
    })
  }

  function rejectOrphanage() {
    const data = {
      is_visible: false
    }
    api.patch(`dashboard/orphanages/${params.id}`, data).then(response => {
      history.push('/dashboard/orphanages')
    })
  }

  return (
    <div>
      <NavBar />
      <div id="page-orphanage">
        <main>
          <div className="orphanage-details">
            <img src={orphanage.images[activeImageIndex]?.url} alt={orphanage.name} />
            <div className="images">
              {orphanage.images.map((image, index) =>
                <button key={image.id}
                  className={activeImageIndex === index ? 'active' : ''}
                  type="button"
                  onClick={() => setActiveImageIndex(index)}>
                  <img src={image.url} alt={image.url} />
                </button>
              )}
            </div>

            <div className="orphanage-details-content">
              <h1>{orphanage.name}</h1>
              <p>{orphanage.about}</p>

              <div className="map-container">
                <Map
                  center={[orphanage.latitude, orphanage.longitude]}
                  zoom={14}
                  style={{ width: '100%', height: 280 }}
                  dragging={false}
                  touchZoom={false}
                  zoomControl={false}
                  scrollWheelZoom={false}
                  doubleClickZoom={false}
                >
                  <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                  <Marker interactive={false} icon={mapIcon} position={[orphanage.latitude, orphanage.longitude]} />
                </Map>

                <footer>
                  <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}>Ver rotas no Google Maps</a>
                </footer>
              </div>

              <hr />

              <h2>Instruções para visita</h2>
              <p>{orphanage.instructions}</p>

              <div className="open-details">
                <div className="hour">
                  <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                  {orphanage.opening_hours}
                </div>
                {orphanage.open_on_weekends ? (
                  <div className="open-on-weekends">
                    <FiInfo size={32} color="#39CC83" />
                    Atendemos <br />
                    fim de semana
                  </div>
                ) : (
                    <div className="open-on-weekends dont-open">
                      <FiInfo size={32} color="#FF669D" />
                    Não Atendemos <br />
                    fim de semana
                    </div>
                  )}
              </div>
              <div className="button-select">
                {!orphanage.is_visible
                  ? (
                    <button
                      type="button"
                      className="accept-button"
                      onClick={acceptOrphanage}
                    > Aprovar
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="reject-button"
                      onClick={rejectOrphanage}
                    > Reprovar
                    </button>
                  )
                }
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}