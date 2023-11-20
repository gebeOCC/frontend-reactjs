import React, { useState } from 'react';
import axios from 'axios';
import './css/Create.css';

const CreateItem = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        age: '',
        phone: '',
        email: '',
    });
    const [isCreating, setIsCreating] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsCreating(true);
            await axios.post('http://127.0.0.1:8000/api/informations', formData);
            // Call the onSuccess callback after successful creation
            if (onSuccess) {
                onSuccess();
            }
            console.log('Item created successfully');
            // Reset the form inputs
            setFormData({
                fname: '',
                lname: '',
                age: '',
                phone: '',
                email: '',
            });
        } catch (error) {
            console.error('Error creating item:', error);
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <div>
            <h1>User informations</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <input
                        type="text"
                        name="fname"
                        value={formData.fname}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Last Name:
                    <input
                        type="text"
                        name="lname"
                        value={formData.lname}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Age:
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Phone:
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit" disabled={isCreating}>
                    {isCreating ? 'Creating...' : 'Create Item'}
                </button>
            </form>
        </div>
    );
};

export default CreateItem;
