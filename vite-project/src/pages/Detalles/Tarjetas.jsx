import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./Tarjetas.css";

function Tarjetas({ id, Nombre, onUpdate = {} }) {
    const [nombre, setNombre] = useState(Nombre);
    const [descripcion, setDescripcion] = useState('');
    const [imagen, setImagen] = useState('');
    const [tipo, setTipo] = useState('');
    const [preparacion, setPreparacion] = useState('');
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3000/dishes/${id}`)
          .then(response => response.json())
          .then(data => {
            setNombre(data.name || Nombre);
            setDescripcion(data.description || '');
            setTipo(data.type || '');
            setImagen(data.image || '');
            setPreparacion(data.preparation || '');
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, [id]);

    function handleBorrar() {
        fetch(`http://localhost:3000/dishes/${id}`, {
            method: 'DELETE',
        })
        .then(() => onUpdate(id))
        .catch(error => console.error('Error deleting recipe:', error));
    }

    function handleDetalles() {
        navigate(`/Detalles/${id}`);
    }

    function handleGuardar(e) {
        e.preventDefault();
        fetch(`http://localhost:3000/dishes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nombre,
                description: descripcion,
                type: tipo,
                image: imagen,
                preparation: preparacion
            })
        })
        .then(response => response.json())
        .then(data => {
            setShowForm(false);
            onUpdate(id, data);
        })
        .catch(error => console.error('Error updating recipe:', error));
    }

    return (
        <div id="Tarjeta">
            <h1 id="Nombre">{nombre}</h1>
            <p id="Tipo">Tipo: {tipo}</p>
            <button id="Detalles" onClick={handleDetalles}>Ver Detalles</button>
            <button id="Borrar" onClick={handleBorrar}>Borrar</button>
            <button id="Editar" onClick={() => setShowForm(!showForm)}>Editar</button>

            {showForm && (
                <form onSubmit={handleGuardar}>
                    <div>
                        <label>Nombre:</label>
                        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    </div>
                    <div>
                        <label>Descripción:</label>
                        <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                    </div>
                    <div>
                        <label>Imagen:</label>
                        <input type="text" value={imagen} onChange={(e) => setImagen(e.target.value)} />
                    </div>
                    <div>
                        <label>Tipo:</label>
                        <input type="text" value={tipo} onChange={(e) => setTipo(e.target.value)} />
                    </div>
                    <div>
                        <label>Preparación:</label>
                        <textarea value={preparacion} onChange={(e) => setPreparacion(e.target.value)}></textarea>
                    </div>
                    <button type="submit">Guardar</button>
                </form>
            )}
        </div>
    );
}

export default Tarjetas;