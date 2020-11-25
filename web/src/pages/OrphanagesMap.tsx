import React, { useEffect, useState } from 'react';
import local from '../images/local.svg'

import { Link } from 'react-router-dom'
import { FiArrowRight, FiPlus } from 'react-icons/fi'

import { Map, Marker, TileLayer, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import mapIcon from '../utils/mapicon';

import '../styles/pages/map.css'
import api from '../services/api';
import NavBar from '../components/navbar';

interface Orphanage {
    id: number
    latitude: number
    longitude: number
    name: string
}

function OrphanagesMap() {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
    const [initialPosition, SetInitialPosition] = useState<[number, number]>([0, 0])

    useEffect(() => {
        api.get('orphanages').then(response => {
            setOrphanages(response.data);
        })
    }, [])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            SetInitialPosition([
                position.coords.latitude,
                position.coords.longitude
            ])
        })
    }, [])

    return (
        <div>
            <NavBar />
            <div id="page-map">
                <aside>
                    <header>
                        <img src={local} alt="logo" />
                    </header>
                    <main>
                        <h1>Escolha um orfanato no mapa</h1>
                        <p>Muitas crianças estão esperando a sua visita :)</p>
                    </main>
                    <footer>
                        <strong>Salvador - </strong> <span>Bahia</span>
                    </footer>
                </aside>
                <div className="map-container">
                    <Map
                        center={initialPosition}
                        zoom={15}
                        style={{
                            width: '100%',
                            height: '100%'
                        }}
                    >
                        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        {orphanages.map(orphanage => {
                            return (
                                <Marker
                                    key={orphanage.id}
                                    position={[orphanage.latitude, orphanage.longitude]}
                                    icon={mapIcon}
                                >
                                    <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                                        {orphanage.name}
                                        <Link to={`orphanages/${orphanage.id}`} >
                                            <FiArrowRight size="25px" color="rgba(255, 255, 255, .8)" />
                                        </Link>
                                    </Popup>
                                </Marker>
                            )
                        })}
                    </Map>
                    <Link to="/orphanages/create" className="link-add">
                        <FiPlus size="30px" color="rgba(0, 0, 0, .6)" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default OrphanagesMap;
