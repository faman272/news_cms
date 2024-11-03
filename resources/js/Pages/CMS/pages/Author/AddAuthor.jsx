import React, { useState } from 'react';
import Main from '../../layouts/Main';
import axios from 'axios';
import { toast } from 'react-toastify'; // Pastikan Anda mengimpor toast

const AddAuthor = () => {
    const [name, setName] = useState(''); // State untuk nama
    const [email, setEmail] = useState(''); // State untuk email

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            name: name,
            email: email, // Perbaiki typo dari 'emaill' menjadi 'email'
        };

        try {
            // Gunakan axios untuk melakukan permintaan POST
            await axios.post('/dashboard/authors', formData);
            toast.success('Author added successfully!'); // Tampilkan notifikasi sukses
            setName(''); // Reset input setelah berhasil
            setEmail(''); // Reset email setelah berhasil

            setTimeout(() => {
                window.location.href = '/dashboard/authors';
            }, 3000);

        } catch (error) {
            console.error('Error creating author:', error);
            toast.error('Failed to add author.'); // Tampilkan notifikasi error
        }
    };

    return (
        <Main>
            <div className="mt-8">
                <h4 className="text-4xl font-medium text-gray-600">Add Author</h4> {/* Ubah judul menjadi "Add Author" */}

                <div className="mt-4">
                    <div className="p-6 bg-white rounded-md shadow-md">
                        <h2 className="text-lg font-semibold text-gray-700 capitalize">Add Author Details</h2> {/* Ubah judul bagian */}

                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-6 mt-4 sm:grid-cols-2">
                                <div>
                                    <label className="text-gray-700" htmlFor="authorName">Name</label> {/* Ubah ID dan label menjadi lebih relevan */}
                                    <input
                                        className="w-full mt-2 rounded-md form-input focus:border-indigo-600"
                                        type="text"
                                        id="authorName"
                                        value={name} // Hubungkan dengan state
                                        onChange={(e) => setName(e.target.value)} // Update state saat input berubah
                                    />
                                </div>

                                <div>
                                    <label className="text-gray-700" htmlFor="authorEmail">Email</label> {/* Ubah ID dan label menjadi lebih relevan */}
                                    <input
                                        className="w-full mt-2 rounded-md form-input focus:border-indigo-600"
                                        type="email"
                                        id="authorEmail"
                                        value={email} // Hubungkan dengan state
                                        onChange={(e) => setEmail(e.target.value)} // Update state saat input berubah
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 mt-10">
                                <a href='/dashboard/authors' className="px-4 py-2 rounded-md text-primary bg-primary30 focus:outline-none">Back</a>
                                <button type="submit" className="px-4 py-2 text-gray-200 rounded-md bg-primary hover:bg-tertiary focus:outline-none focus:bg-primary">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Main>
    );
};

export default AddAuthor;