import React, { useState, useEffect } from 'react';
import Main from '../../layouts/Main';
import { createSlug } from '../../utils/slug'; // Pastikan Anda memiliki fungsi createSlug
import axios from 'axios';
import { toast } from 'react-toastify';

const EditCategory = ({ category }) => {
    const [categoryName, setCategoryName] = useState('');
    const [slug, setSlug] = useState('');

    // Inisialisasi state dengan data kategori yang diterima
    useEffect(() => {
        if (category) {
            setCategoryName(category.name);
            setSlug(category.slug);
        }
    }, [category]);

    const handleCategoryNameChange = (event) => {
        const name = event.target.value;
        setCategoryName(name);
        setSlug(createSlug(name)); // Update slug secara otomatis
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Cegah pengiriman form secara default

        const formData = {
            name: categoryName,
            slug: slug,
        };

        try {
            // Gunakan axios untuk melakukan permintaan PUT
            await axios.put(`/dashboard/categories/${category.id}`, formData);
            toast.success('Category updated successfully!'); // Tampilkan notifikasi sukses
            setTimeout(() => {
                window.location.href = '/dashboard/categories';
            }, 3000)
        } catch (error) {
            console.error('Error updating category:', error);
            toast.error('Failed to update category.'); // Tampilkan notifikasi error
        }
    };

    return (
        <Main>
            <div className="mt-8">
                <h4 className="text-4xl font-medium text-gray-600">Edit Category</h4>

                <div className="mt-4">
                    <div className="p-6 bg-white rounded-md shadow-md">
                        <h2 className="text-lg font-semibold text-gray-700 capitalize">Edit Category</h2>

                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-6 mt-4 sm:grid-cols-2">
                                <div>
                                    <label className="text-gray-700" htmlFor="categoryName">Category Name</label>
                                    <input
                                        className="w-full mt-2 rounded-md form-input focus:border-indigo-600"
                                        type="text"
                                        id="categoryName"
                                        value={categoryName}
                                        onChange={handleCategoryNameChange} // Update state saat input berubah
                                    />
                                </div>

                                <div>
                                    <label className="text-gray-700" htmlFor="slug">Slug</label>
                                    <input
                                        disabled
                                        className="w-full mt-2 rounded-md bg-slate-100 form-input focus:border-indigo-600"
                                        type="text"
                                        id="slug"
                                        value={slug}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 mt-10">
                                <a href='/dashboard/categories' className="px-4 py-2 rounded-md text-primary bg-primary30 focus:outline-none">Back</a>
                                <button type="submit" className="px-4 py-2 text-gray-200 rounded-md bg-primary hover:bg-tertiary focus:outline-none focus:bg-primary">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Main>
    );
};

export default EditCategory;