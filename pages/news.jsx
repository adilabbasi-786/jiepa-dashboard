import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const news = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleNewsSubmit = (e) => {
    e.preventDefault();

    setTitle("");
    setDescription("");
    setImage(null);
  };

  return (
    <>
      <Sidebar>
        <div className="bg-gray-100 min-h-screen">
          <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Add News</h2>
            <form onSubmit={handleNewsSubmit} className="max-w-lg m-auto">
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-600"
                >
                  Title:
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={handleTitleChange}
                  className="mt-1 p-2 border rounded w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-600"
                >
                  Description:
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={handleDescriptionChange}
                  rows="4"
                  className="mt-1 p-2 border rounded w-full"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-600"
                >
                  Image (.jpg):
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept=".jpg"
                  onChange={handleImageChange}
                  className="mt-1 p-2 border rounded w-full"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Submit News
              </button>
            </form>
          </div>
        </div>
      </Sidebar>
    </>
  );
};

export default news;
