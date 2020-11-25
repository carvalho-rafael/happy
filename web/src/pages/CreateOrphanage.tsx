import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from "leaflet";

import { FiPlus } from "react-icons/fi";

import '../styles/pages/create-orphanage.css';
import mapIcon from "../utils/mapicon";
import api from "../services/api";
import NavBar from "../components/navbar";

export default function CreateOrphanage() {
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(false);
  const [images, setImages] = useState<File[]>([])
  const [imagesPreview, setImagesPreview] = useState<string[]>([])

  const [initialPosition, SetInitialPosition] = useState<[number, number]>([0, 0])

  const history = useHistory();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      SetInitialPosition([
        position.coords.latitude,
        position.coords.longitude
      ])
    })
  }, [])

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;
    setPosition({ latitude: lat, longitude: lng });
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const { latitude, longitude } = position;

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));

    images.forEach(image => {
      data.append('images', image)
    })

    api.post('orphanages', data).then(response => {
      history.push('/app')
    })
  }

  function handleSelectedImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return
    }

    const selectedImages = Array.from(event.target.files)

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    })

    setImagesPreview(selectedImagesPreview);
  }

  return (
    <div>
      <NavBar />
      <div id="page-create-orphanage">
        <main>
          <form className="create-orphanage-form" onSubmit={handleSubmit}>
            <fieldset>
              <legend>Dados</legend>

              <Map
                center={initialPosition}
                style={{ width: '100%', height: 280 }}
                zoom={15}
                onclick={handleMapClick}
              >

                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {position.latitude !== 0 &&
                  (
                    <Marker
                      interactive={false}
                      icon={mapIcon}
                      position={[position.latitude, position.longitude]} />
                  )
                }
              </Map>

              <div className="input-block">
                <label htmlFor="name">Nome</label>
                <input id="name" value={name} onChange={event => setName(event.target.value)} />
              </div>

              <div className="input-block">
                <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
                <textarea id="name" value={about} onChange={event => setAbout(event.target.value)} maxLength={300} />
              </div>

              <div className="input-block">
                <label htmlFor="images">Fotos</label>

                <div className="images-container">
                  {imagesPreview.map((image, index) => {
                    return (
                      <img className="image-item" key={index} src={image} alt="" />
                    )
                  })}
                  <label htmlFor="image" className="new-image">
                    <FiPlus size={24} color="#15b6d6" />
                  </label>
                </div>
                <input type="file" id="image" multiple onChange={handleSelectedImages} />
              </div>
            </fieldset>

            <fieldset>
              <legend>Visitação</legend>

              <div className="input-block">
                <label htmlFor="instructions">Instruções</label>
                <textarea id="instructions" value={instructions} onChange={event => setInstructions(event.target.value)} />
              </div>

              <div className="input-block">
                <label htmlFor="opening_hours">Opening Hours</label>
                <input id="opening_hours" value={opening_hours} onChange={event => setOpeningHours(event.target.value)} />
              </div>

              <div className="input-block">
                <label htmlFor="open_on_weekends">Atende fim de semana</label>

                <div className="button-select">
                  <button
                    type="button"
                    className={open_on_weekends ? 'active' : ''}
                    onClick={() => setOpenOnWeekends(true)}
                  >
                    Sim
                </button>
                  <button
                    type="button"
                    className={!open_on_weekends ? 'active' : ''}
                    onClick={() => setOpenOnWeekends(false)}
                  >
                    Não
                </button>
                </div>
              </div>
            </fieldset>

            <button className="confirm-button" type="submit">
              Confirmar
          </button>
          </form>
        </main>
      </div>
    </div>
  );
}