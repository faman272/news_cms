import React, { useEffect, useState } from 'react';
import Main from '../../layouts/Main';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditAuthor = ({ author }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    // Inisialisasi state dengan data penulis saat komponen dimuat
    useEffect(() => {
        if (author) {
            setName(author.name);
            setEmail(author.email);
        }
    }, [author]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            name: name,
            email: email,
        };

        try {
            // Kirim permintaan PUT untuk memperbarui penulis
            await axios.put(`/dashboard/authors/${author.id}`, formData);
            toast.success('Author updated successfully!');

            setTimeout(() => {
                window.location.href = '/dashboard/authors';
            }, 3000);
        } catch (error) {
            console.error('Error updating author:', error);
            toast.error('Failed to update author.');
        }
    };

    return (
        <Main>
            <div className="mt-8">
                <h4 className="text-4xl font-medium text-gray-600">Edit Author</h4>

                <div className="mt-4">
                    <div className="p-6 bg-white rounded-md shadow-md">
                        <h2 className="text-lg font-semibold text-gray-700 capitalize">Edit Author Details</h2>

                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-6 mt-4 sm:grid-cols-2">
                                <div>
                                    <label className="text-gray-700" htmlFor="authorName">Name</label>
                                    <input
                                        className="w-full mt-2 rounded-md form-input focus:border-indigo-600"
                                        type="text"
                                        id="authorName"
                                        value={name} // Gunakan state name
                                        onChange={(e) => setName(e.target.value)} // Update state saat input berubah
                                    />
                                </div>

                                <div>
                                    <label className="text-gray-700" htmlFor="authorEmail">Email</label>
                                    <input
                                        className="w-full mt-2 rounded-md form-input focus:border-indigo-600"
                                        type="email"
                                        id="authorEmail"
                                        value={email} // Gunakan state email
                                        onChange={(e) => setEmail(e.target.value)} // Update state saat input berubah
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 mt-10">
                                <a href='/dashboard/authors' className="px-4 py-2 rounded-md text-primary bg-primary30 focus:outline-none">Back</a>
                                <button type="submit" className="px-4 py-2 text-gray-200 rounded-md bg-primary hover:bg-tertiary focus:outline-none focus:bg-primary">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Main>
    );
}

export default EditAuthor;