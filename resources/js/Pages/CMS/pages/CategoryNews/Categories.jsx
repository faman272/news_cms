import React, { useState } from 'react';
import Main from '../../layouts/Main';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline, MdOutlineAddCircle } from 'react-icons/md';
import axios from 'axios';
import { toast } from 'react-toastify';


const Categories = ({ categories: initialCategories }) => {
  const [categories, setCategories] = useState(initialCategories);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);



  const handleDeleteModal = (id) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`/dashboard/categories/${deleteId}`);
      setCategories(categories.filter(category => category.id !== deleteId));
      setIsDeleteModalOpen(false);
      setDeleteId(null);
      toast.success('Category deleted successfully!');
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error('Failed to delete category');
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setDeleteId(null);
  };

  return (
    <>
      <Main>
        <h3 className="text-3xl font-medium text-gray-700">Data Categories</h3>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-1/3 p-6 text-center bg-white rounded-lg shadow-lg">
              <div className='flex justify-center w-full py-4'>
                <MdDeleteOutline size={56} className="text-gray-400" />
              </div>
              <h3 className="py-2 text-xl text-gray-700">
                Are you sure you want to delete data?
              </h3>
              <div className="flex justify-center gap-4 mt-4">
                <button onClick={handleDeleteCancel} className="px-4 py-2 text-gray-700 bg-gray-200 border border-gray-400 rounded hover:bg-gray-300">
                  No, Cancel
                </button>
                <button onClick={handleDeleteConfirm} className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-500">
                  Yes, I'am Sure
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8">

          <div class="mt-6">

            <div class="mt-3 flex flex-col sm:flex-row">

              <div class="flex justify-between w-full">

                {/* Search bar */}
                <div class="block relative  mt-2 sm:mt-0">
                  <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                    <svg viewBox="0 0 24 24" class="h-4 w-4 fill-current text-gray-500">
                      <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                    </svg>
                  </span>

                  <input placeholder="Search" class="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-lg placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
                </div>

              </div>

              <div>
                <a href='/dashboard/categories/create' class="flex items-center gap-2 px-6 py-2 bg-green-600 rounded-md text-white font-medium tracking-wide hover:bg-green-500 ml-3">
                  Add <MdOutlineAddCircle size={20} />
                </a>
              </div>




            </div>






          </div>

          <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
            <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 text-lg font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                      No.
                    </th>
                    <th className="px-5 py-3 text-lg font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                      Name
                    </th>
                    <th className="px-5 py-3 text-lg font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                      Slug
                    </th>
                    <th className="px-5 py-3 text-lg font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category, index) => (
                    <tr key={category.id}>
                      <td className="px-5 py-5 text-lg bg-white border-b border-gray-200">{index + 1}</td>
                      <td className="px-5 py-5 text-lg font-medium bg-white border-b border-gray-200">{category.name}</td>
                      <td className="px-5 py-5 text-lg bg-white border-b border-gray-200">{category.slug}</td>
                      <td className="px-5 py-5 text-lg bg-white border-b border-gray-200">
                        <div className="inline-flex mt-2 xs:mt-0">
                          <a href={`/dashboard/categories/${category.id}`} className="px-4 py-2 font-semibold rounded-l bg-slate-200 hover:bg-slate-300 text-primary">
                            <FaRegEdit size={18} />
                          </a>
                          <button onClick={() => handleDeleteModal(category.id)} className="px-4 py-2 font-semibold text-red-600 rounded-r bg-slate-200 hover:bg-slate-300">
                            <MdDeleteOutline size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Main>
    </>
  );
};

export default Categories;
