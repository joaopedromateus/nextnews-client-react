import React, { useEffect, useState } from 'react';
import News from '../components/News';
import MainLayout from '../layouts/MainLayout';

const InternetPage = () => {
  const [internetNews, setInternetNews] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/articles?category=Internet')
      .then((response) => response.json())
      .then((data) => {
        const reversedData = data.reverse();
        setInternetNews(reversedData);
      })
      .catch((error) => {
        console.error('Erro ao buscar notícias de Internet:', error);
      });
  }, []);

  const internetNewsFiltered = internetNews.filter((article) => article.category === 'Internet');

  return (
    <MainLayout>
    <div>
      <h1 className='text-2xl font-semibold mb-3'>Notícias de Internet</h1>
      {internetNewsFiltered.map((article) => (
        <News
          key={article._id}
          slug={article.slug}
          title={article.title}
          category={article.category}
          images={article.images.map(img => img.replace(/\\/g, '/'))}
          publishDate={article.publishDate}
          content={''}
        />
      ))}
    </div>
  </MainLayout>
  );
};

export default InternetPage;
