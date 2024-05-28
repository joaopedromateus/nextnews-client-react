import React from 'react';

const NewsModal = ({ newsItem, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="text-2xl font-bold">{newsItem.title}</h2>
        <p className="mt-2">{newsItem.content}</p>
        {newsItem.images.map((image, index) => (
          <img key={index} src={image} alt={newsItem.title} className="mt-2" />
        ))}
        <p className="mt-2">Category: {newsItem.category}</p>
        <button onClick={onClose} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default NewsModal;
