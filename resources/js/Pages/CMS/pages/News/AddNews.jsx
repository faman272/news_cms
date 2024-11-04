import React, { useState } from 'react';
import Main from '../../layouts/Main';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { createSlug } from '../../utils/slug';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddNews = ({ categories, authors }) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [slug, setSlug] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [authorId, setAuthorId] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleEditorChange = (state) => {
        setEditorState(state);
    };

    const handleTitleChange = (e) => {
        const value = e.target.value;
        setTitle(value);
        setSlug(createSlug(value));
    };

    const handleSubtitleChange = (e) => {
        setSubtitle(e.target.value);
    };

    const handleCategoryChange = (e) => {
        const { value, checked } = e.target;
        setSelectedCategories(prevCategories =>
            checked ? [...prevCategories, value] : prevCategories.filter(category => category !== value)
        );
    };

    const handleAuthorChange = (e) => {
        setAuthorId(e.target.value);
    };

    const handleContentSubmit = async () => {
        const contentInHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()));

        const formData = new FormData();
        formData.append('title', title);
        formData.append('subtitle', subtitle);
        formData.append('slug', slug);
        formData.append('content', contentInHtml);
        formData.append('author_id', authorId);
        formData.append('image', image);

        selectedCategories.forEach((category, index) => {
            formData.append(`categories[${index}]`, category);
        });

        console.log(image)

        try {
            await axios.post('/dashboard/news/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            toast.success('News added successfully!');
            setTimeout(() => {
                window.location.href = '/dashboard/news';
            }, 3000)

        } catch (error) {
            console.error('Failed to add news:', error);
        }
    };

    return (
        <Main>
            <div className="mt-8">
                <h4 className="text-4xl font-medium text-gray-600">Add News</h4>

                <div className="mt-4">
                    <div className="p-6 bg-white rounded-md shadow-md">
                        <h2 className="text-lg font-semibold text-gray-700 capitalize">Detail News</h2>

                        <form onSubmit={(e) => { e.preventDefault(); handleContentSubmit(); }}>
                            <div className="grid grid-cols-2 gap-6 mt-4 sm:grid-cols-2">
                                <div>
                                    <label className="text-gray-700" htmlFor="title">Title</label>
                                    <input
                                        id="title"
                                        className="w-full mt-2 rounded-md form-input focus:border-indigo-600"
                                        type="text"
                                        value={title}
                                        onChange={handleTitleChange}
                                    />
                                </div>

                                <div>
                                    <label className="text-gray-700" htmlFor="slug">Slug</label>
                                    <input
                                        id="slug"
                                        className="w-full mt-2 rounded-md bg-slate-100 form-input focus:border-indigo-600"
                                        type="text"
                                        value={slug}
                                        disabled
                                    />
                                </div>
                            </div>

                            <div className="mt-4">
                                <label htmlFor="subtitle" className="text-gray-700">Subtitle</label>
                                <textarea
                                    id="subtitle"
                                    className="w-full mt-2 rounded-md resize-none form-input focus:border-indigo-600"
                                    rows="5"
                                    value={subtitle}
                                    onChange={handleSubtitleChange}
                                ></textarea>
                            </div>

                            <div className="mt-4">
                                <label className="text-gray-700" htmlFor="content">Content</label>
                                <Editor
                                    editorState={editorState}
                                    onEditorStateChange={handleEditorChange}
                                    toolbar={{
                                        options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'image', 'remove', 'history'],
                                    }}
                                    wrapperClassName="mt-2 border rounded-md"
                                    editorClassName="p-2 font-body"
                                    toolbarClassName="border-b"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6 mt-4 sm:grid-cols-2">
                                <div>
                                    <label className="text-gray-700" htmlFor="author">Author</label>
                                    <select name="author" id="author" className='w-full mt-2 rounded-md' onChange={handleAuthorChange}>
                                        <option value="" disabled selected>Select Author</option>
                                        {authors.map((author, index) => (
                                            <option key={index} value={author.id}>{author.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <h3 className='mb-2 text-gray-700'>Select Categories</h3>
                                    <div className='grid grid-cols-3 gap-2'>
                                        {categories.map((category, index) => (
                                            <div key={index} className='flex items-center gap-2 text-base'>
                                                <input
                                                    type="checkbox"
                                                    value={category.id}
                                                    onChange={handleCategoryChange}
                                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                />
                                                <label className="text-gray-700" htmlFor={`category-${index}`}>{category.name}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <label htmlFor="image" className="font-medium text-gray-700">Image</label>
                                <div
                                    className="p-4 mt-2 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400"
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                >
                                    <input
                                        id="image"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                    <label htmlFor="image" className="block text-center text-gray-500 cursor-pointer">
                                        {image ? <span className="text-gray-700">{image.name}</span> : <>Drag & Drop or <span className="text-primary hover:underline">Browse</span></>}
                                    </label>
                                </div>
                                {preview && <img src={preview} alt="Preview" className="mt-4 w-[300px] h-auto rounded-md" />}
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

export default AddNews;
