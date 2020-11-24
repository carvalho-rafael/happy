import React, { useEffect, useState } from 'react';

import 'leaflet/dist/leaflet.css'

import '../../styles/pages/dashboard/orphanages.css'
import api from '../../services/api';
import NavBar from '../../components/navbar';

import history from './../../history'

interface Orphanage {
    id: number
    latitude: number
    longitude: number
    name: string
    about: string
    is_visible: boolean
    images: Array<{
        id: number
        url: string
    }>
}

function Orphanages() {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
    const [pendingOrphanages, setPendingOrphanages] = useState<Orphanage[]>([]);
    const [visibleOrphanages, setVisibleOrphanages] = useState<Orphanage[]>([]);
    const [currentOrphanages, setCurrentOrphanages] = useState<Orphanage[]>([]);

    const [listVisible, setListVisible] = useState(true);

    useEffect(() => {
        api.get('orphanages').then(response => {
            setOrphanages(response.data);
            console.log((response.data))
        })
    }, [])

    useEffect(() => {
        const pendingOrphanages = orphanages.filter(
            orphanage => !orphanage.is_visible
        )
        const visibleOrphanages = orphanages.filter(
            orphanage => orphanage.is_visible
        )
        setPendingOrphanages(pendingOrphanages)
        setVisibleOrphanages(visibleOrphanages)

        setCurrentOrphanages(visibleOrphanages)
    }, [orphanages])


    function handleListOrphanage(type: string) {
        if (type === 'visible') {
            setListVisible(true)
            setCurrentOrphanages(visibleOrphanages)
            return
        }
        setListVisible(false)
        setCurrentOrphanages(pendingOrphanages)
        return
    }

    return (
        <div>
            <NavBar />
            <div id="dashboard-page">
                <aside>
                    <header>
                        <h2>Listar Orfanatos</h2>
                    </header>
                    <main>
                        <button
                            className={listVisible ? 'active' : ''}
                            onClick={() => handleListOrphanage('visible')}
                        >
                            Aprovados
                        </button>
                        <button
                            className={!listVisible ? 'active' : ''}
                            onClick={() => handleListOrphanage('pending')}
                        >
                            Pendentes
                        </button>
                    </main>
                </aside>
                <div className="main-container">
                    <ul className="card-list">
                        {currentOrphanages.map(orphanage => {
                            return (
                                <li key={orphanage.id}
                                    className="card"
                                    onClick={() => history.push(`/dashboard/orphanages/${orphanage.id}`)
                                    }>
                                    <img src={orphanage.images[0]?.url} alt={orphanage.name} />
                                    <main>
                                        <h3>{orphanage.name}</h3>
                                        <p>{orphanage.about}</p>                                    </main>
                                </li>
                            )
                        })}
                    </ul>

                </div>
            </div>
        </div>
    );
}

export default Orphanages;
