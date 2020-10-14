import React from 'react';
import local from '../images/local.svg'

import { Link } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'

import { Map, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import '../styles/pages/map.css'

function OrphanagesMap() {
    return (
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
                    center={[-12.9452397, -38.4534359]}
                    zoom={15}
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                >
                    <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                </Map>
                <Link to="/" className="link-add">
                    <FiPlus size="30px" color="rgba(0, 0, 0, .6)" />
                </Link>
            </div>
        </div>
    );
}

export default OrphanagesMap;
