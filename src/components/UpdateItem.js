import React, { useState } from 'react';
import axios from 'axios';
import './css/Create.css';

const UpdateItem = ({ itemId, initialData, onSuccess }) => {
    const [formData, setFormData] = useState({
        fname: initialData.fname,
        lname: initialData.lname,
        age: initialData.age,
        phone: initialData.phone,
        email: initialData.email,
    });
    const [isUpdating, setIsUpdating] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            setIsUpdating(true);
            await axios.put(`http://127.0.0.1:8000/api/informations/${itemId}`, formData);
            if (onSuccess) {
                onSuccess();
            }
            console.log('Item updated successfully');
        } catch (error) {
            console.error('Error updating item:', error);
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div>
            <h2>Update Item</h2>
            <form onSubmit={handleUpdate}>
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
                <button type="submit" disabled={isUpdating}>
                    {isUpdating ? 'Updating...' : 'Update Item'}
                </button>
            </form>
        </div>
    );
};

export default UpdateItem;
