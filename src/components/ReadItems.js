// components/ReadItems.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Table.css';
import DeleteItem from './DeleteItem';
import CreateItem from './CreateItem';
import UpdateItem from './UpdateItem';

const ReadItems = () => {
    const [informations, setInformations] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState(null);

    const refreshData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/informations');
            setInformations(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        refreshData();
    }, []);

    const handleEdit = (id) => {
        setSelectedItemId(id);
    };

    const handleCancelEdit = () => {
        setSelectedItemId(null);
    };

    return (
        <div>

            {selectedItemId ? (
                <UpdateItem
                    itemId={selectedItemId}
                    initialData={informations.find((item) => item.id === selectedItemId)}
                    onSuccess={() => {
                        handleCancelEdit();
                        refreshData();
                    }}
                />
            ) : (
                <CreateItem onSuccess={refreshData} />
            )}

            <h2>Information List</h2>

            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Age</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {informations.map((information) => (
                    <tr key={information.id}>
                        <td>{information.id}</td>
                        <td>{information.fname}</td>
                        <td>{information.lname}</td>
                        <td>{information.age}</td>
                        <td>{information.phone}</td>
                        <td>{information.email}</td>
                        <td>
                            <button onClick={() => handleEdit(information.id)}>Edit</button>
                            <DeleteItem id={information.id} onSuccess={refreshData} />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReadItems;
