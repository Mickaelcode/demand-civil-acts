import React, { useState } from 'react';
import axios from 'axios';

const ActForm = () => {
    const [formData, setFormData] = useState({
        numAct: '',
        typeActe: '',
        province: '',
        nameCit: '',
        firstNameCit: '',
        dateOB: '',
        placeOB: '',
        delivrance: '',
        father: '',
        mother: '',
    });

    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('numAct', formData.numAct);
        data.append('typeActe', formData.typeActe);
        data.append('province', formData.province);
        data.append('nameCit', formData.nameCit);
        data.append('firstNameCit', formData.firstNameCit);
        data.append('dateOB', formData.dateOB);
        data.append('placeOB', formData.placeOB);
        data.append('delivrance', formData.delivrance);
        data.append('father', formData.father);
        data.append('mother', formData.mother);
        if (file) {
            data.append('files', file); // Changez 'files' en fonction de votre middleware multer
        }

        try {
            const response = await axios.post('http://localhost:3005/createAct', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Erreur lors de la création de l\'acte');
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Créer un Acte</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="numAct" placeholder="Numéro d'Acte" value={formData.numAct} onChange={handleChange} required />
                <input type="text" name="typeActe" placeholder="Type d'Acte" value={formData.typeActe} onChange={handleChange} required />
                <input type="text" name="province" placeholder="Province" value={formData.province} onChange={handleChange} required />
                <input type="text" name="nameCit" placeholder="Nom du Citoyen" value={formData.nameCit} onChange={handleChange} required />
                <input type="text" name="firstNameCit" placeholder="Prénom du Citoyen" value={formData.firstNameCit} onChange={handleChange} required />
                <input type="date" name="dateOB" value={formData.dateOB} onChange={handleChange} required />
                <input type="text" name="placeOB" placeholder="Lieu de Naissance" value={formData.placeOB} onChange={handleChange} required />
                <input type="text" name="delivrance" placeholder="Délivrance" value={formData.delivrance} onChange={handleChange} required />
                <input type="text" name="father" placeholder="Nom du Père" value={formData.father} onChange={handleChange} required />
                <input type="text" name="mother" placeholder="Nom de la Mère" value={formData.mother} onChange={handleChange} required />
                <input type="file" onChange={handleFileChange} required />
                <button type="submit">Créer l'Acte</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ActForm;
