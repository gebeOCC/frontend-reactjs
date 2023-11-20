import React, { useState } from 'react';
import axios from 'axios';

const DeleteItem = ({ id, onSuccess }) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            await axios.delete(`http://127.0.0.1:8000/api/informations/${id}`);
            // Call the onSuccess callback after successful deletion
            if (onSuccess) {
                onSuccess();
            }
            console.log(`Item with ID ${id} deleted successfully.`);
        } catch (error) {
            console.error('Error deleting item:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <button onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
    );
};

export default DeleteItem;
