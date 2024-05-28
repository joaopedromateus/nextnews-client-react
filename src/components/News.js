import React from 'react';

const News = ({ slug, title, content, category, images, publishDate }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Data inválida';
    }

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} - ${hours}:${minutes}h`;
  };

  const formattedDate = publishDate ? formatDate(publishDate) : 'Data inválida';

  return (
    <div className="mb-8">
      {images && images.map((image, index) => (
        <div key={index} className="relative">
          <img
            src={`${image}`}
            alt={`Imagem de ${title}`}
            className="w-full rounded-lg object-cover"
            style={{ width: '500px', height: 'auto' }}
          />

          <a href={`/news/${slug}`}>
            <div className="absolute bottom-0 left-0 p-3 bg-black bg-opacity-50 w-full max-w-md rounded-b-lg">
              <h2 className="text-2xl font-semibold text-white hover:underline">
                {title}
              </h2>
            </div>
          </a>
        </div>
      ))}
      <p className="mt-2 text-gray-600">{content}</p>
      <div className="flex justify-between items-center">
        <p className="text-sm font-semibold">{category}</p>
        <p className="text-sm">{formattedDate}</p>
      </div>
    </div>
  );
};

export default News;
