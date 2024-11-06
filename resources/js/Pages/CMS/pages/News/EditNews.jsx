import React, { useState, useEffect } from 'react';
import Main from '../../layouts/Main';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { createSlug } from '../../utils/slug';
import { toast } from 'react-toastify';
import axios from 'axios';

const EditNews = ({ news, authors, categories }) => {

    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [slug, setSlug] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [authorId, setAuthorId] = useState('');

    useEffect(() => {
        if (news) {
            const blocksFromHtml = htmlToDraft(news.content || '');
            const contentState = ContentState.createFromBlockArray(blocksFromHtml.contentBlocks);
            setEditorState(EditorState.createWithContent(contentState));

            setTitle(news.title);
            setSubtitle(news.subtitle);
            setSlug(news.slug);
            setAuthorId(news.author_id);
            const imagePath = news.image.startsWith('images/news/') ? `/storage/${news.image}` : `/${news.image}`;
            setPreview(imagePath);
            setSelectedCategories(news.categories.map((cat) => cat.id.toString()));
        }
    }, [news]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
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

    const handleEditorChange = (state) => setEditorState(state);

    const handleTitleChange = (e) => {
        const value = e.target.value;
        setTitle(value);
        setSlug(createSlug(value));
    };

    const handleCategoryChange = (e) => {
        const { value, checked } = e.target;
        setSelectedCategories(prevCategories =>
            checked ? [...prevCategories, value] : prevCategories.filter(category => category !== value)
        );
    };

    const handleContentSubmit = async (e) => {
        e.preventDefault();
        const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));

        const formData = {
            title: title,
            subtitle: subtitle,
            slug: slug,
            content: content,
            author_id: authorId,
            categories: selectedCategories,
        };

        try {

            await axios.put(`/dashboard/news/${news.id}`, formData);

            toast.success('News updated successfully!');

            setTimeout(() => {
                window.location.href = '/dashboard/news';
            }, 2000);

        } catch (error) {
            console.error(error);
            if (error.response && error.response.data.errors) {
                // Menampilkan kesalahan dari server
                const errors = error.response.data.errors;
                for (const key in errors) {
                    toast.error(errors[key].join(', '));
                }
            } else {
                toast.error('Failed to update news');
            }
        }
    };

    const handleImageUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await axios.post(`/dashboard/news/image/${news.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setPreview(response.data.url);
            toast.success('Image uploaded successfully!');
        } catch (error) {
            console.error(error);
            toast.error('Failed to upload image');
        }

    }

    return (
        <Main>
            <div className="mt-8">
                <h4 className="text-4xl font-medium text-gray-600">Edit News</h4>

                <div className="mt-4">
                    <div className="p-6 bg-white rounded-md shadow-md">
                        <h2 className="text-lg font-semibold text-gray-700 capitalize">Detail News</h2>

                        <form onSubmit={handleContentSubmit} encType='multipart/form-data'>
                            <div className="grid grid-cols-2 gap-6 mt-4 sm:grid-cols-2">
                                <div>
                                    <label className="text-gray-700" htmlFor="title">Title</label>
                                    <input
                                        id="title"
                                        name='title'
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
                                        name='slug'
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
                                    name='subtitle'
                                    className="w-full mt-2 rounded-md resize-none form-input focus:border-indigo-600"
                                    rows="5"
                                    value={subtitle}
                                    onChange={(e) => setSubtitle(e.target.value)}
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
                                    <select
                                        id="author"
                                        name='author'
                                        className="w-full mt-2 rounded-md"
                                        value={authorId}
                                        onChange={(e) => setAuthorId(e.target.value)}
                                    >
                                        <option value="" disabled>Select Author</option>
                                        {authors.map((author) => (
                                            <option key={author.id} value={author.id}>
                                                {author.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <h3 className="mb-2 text-gray-700">Select Categories</h3>
                                    <div className="grid grid-cols-3 gap-2">
                                        {categories.map((category) => (
                                            <div key={category.id} className="flex items-center gap-2 text-base">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedCategories.includes(category.id.toString())} // Pastikan tipe data cocok
                                                    name='category'
                                                    value={category.id}
                                                    onChange={handleCategoryChange}
                                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                />
                                                <label className="text-gray-700">{category.name}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 mt-10">
                                <a href="/dashboard/news" className="px-4 py-2 rounded-md text-primary bg-primary30 focus:outline-none">Back</a>
                                <button type="submit" className="px-4 py-2 text-gray-200 rounded-md bg-primary hover:bg-tertiary focus:outline-none focus:bg-primary">Save</button>
                            </div>
                        </form>

                        <form onSubmit={handleImageUpload}>
                            <div className="mt-4">
                                <label htmlFor="image" className="font-medium text-gray-700">Update Image</label>
                                <div
                                    className="p-4 mt-2 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400"
                                    onDrop={handleDrop}
                                    onDragOver={(e) => e.preventDefault()}
                                >
                                    <input
                                        id="image"
                                        name='image'
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                    <label htmlFor="image" className="block text-center text-gray-500 cursor-pointer">
                                        {image ? (
                                            <span className="text-gray-700">{image.name}</span>
                                        ) : (
                                            <>Drag & Drop or <span className="text-primary hover:underline">Browse</span></>
                                        )}
                                    </label>
                                </div>
                                {preview && <img src={`${preview}`} alt="Preview" className="mt-4 w-[300px] h-auto rounded-md" />}
                            </div>
                            <div className="flex justify-end gap-2 mt-10">
                                <button type="submit" className="px-4 py-2 text-gray-200 rounded-md bg-primary hover:bg-tertiary focus:outline-none focus:bg-primary">Update Image</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </Main>
    );
};

export default EditNews;
