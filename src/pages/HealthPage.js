import React, { useEffect, useState } from 'react';
import News from '../components/News';
import MainLayout from '../layouts/MainLayout';

const HealthPage = () => {
  const [healthNews, setHealthNews] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/articles?category=Health')
      .then((response) => response.json())
      .then((data) => {
        const reversedData = data.reverse();
        setHealthNews(reversedData);
      })
      .catch((error) => {
        console.error('Erro ao buscar notícias de Saúde:', error);
      });
  }, []);

  const healthNewsFiltered = healthNews.filter((article) => article.category === 'Health');

  return (
    <MainLayout>
    <div>
      <h1 className='text-2xl font-semibold mb-3'>Notícias de Saúde</h1>
      {healthNewsFiltered.map((article) => (
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

export default HealthPage;
