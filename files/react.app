import React, { useState } from 'react';
import axios from 'axios';

const DemandForm = () => {
    const [formData, setFormData] = useState({
        actDemand: '',
        emailAdmin: '',
        emailUser: '',
        numAct: '',
        province: '',
        commune: '',
        name: '',
        firstName: '',
        dateOfBirth: '',
        placeOfBirth: '',
    });

    const [files, setFiles] = useState([]);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setFiles(Array.from(e.target.files)); // Prend tous les fichiers
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('actDemand', formData.actDemand);
        data.append('emailAdmin', formData.emailAdmin);
        data.append('emailUser', formData.emailUser);
        data.append('numAct', formData.numAct);
        data.append('province', formData.province);
        data.append('commune', formData.commune);
        data.append('name', formData.name);
        data.append('firstName', formData.firstName);
        data.append('dateOfBirth', formData.dateOfBirth);
        data.append('placeOfBirth', formData.placeOfBirth);
        
        // Ajoute les fichiers à FormData
        files.forEach(file => {
            data.append('files', file); // Assurez-vous que 'files' correspond à ce que votre middleware multer attend
        });

        try {
            const response = await axios.post('http://localhost:3005/create', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage(response.data.msg);
        } catch (error) {
            setMessage('Erreur lors de la création de la demande');
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Créer une Demande</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="actDemand" placeholder="Acte de Demande" value={formData.actDemand} onChange={handleChange} required />
                <input type="email" name="emailAdmin" placeholder="Email de l'Administrateur" value={formData.emailAdmin} onChange={handleChange} required />
                <input type="email" name="emailUser" placeholder="Email de l'Utilisateur" value={formData.emailUser} onChange={handleChange} required />
                <input type="text" name="numAct" placeholder="Numéro d'Acte" value={formData.numAct} onChange={handleChange} required />
                <input type="text" name="province" placeholder="Province" value={formData.province} onChange={handleChange} required />
                <input type="text" name="commune" placeholder="Commune" value={formData.commune} onChange={handleChange} required />
                <input type="text" name="name" placeholder="Nom" value={formData.name} onChange={handleChange} required />
                <input type="text" name="firstName" placeholder="Prénom" value={formData.firstName} onChange={handleChange} required />
                <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
                <input type="text" name="placeOfBirth" placeholder="Lieu de Naissance" value={formData.placeOfBirth} onChange={handleChange} required />
                <input type="file" onChange={handleFileChange} multiple required />
                <button type="submit">Créer la Demande</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default DemandForm;
