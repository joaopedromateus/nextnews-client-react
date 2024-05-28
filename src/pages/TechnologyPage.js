import React, { useEffect, useState } from 'react';
import News from '../components/News';
import MainLayout from '../layouts/MainLayout';

const TechnologyPage = () => {
  const [technologyNews, setTechnologyNews] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/articles?category=Technology')
      .then((response) => response.json())
      .then((data) => {
        const reversedData = data.reverse();
        setTechnologyNews(reversedData);
      })
      .catch((error) => {
        console.error('Erro ao buscar notícias de Tecnologia:', error);
      });
  }, []);

  const technologyNewsFiltered = technologyNews.filter((article) => article.category === 'Technology');

  return (
    <MainLayout>
    <div>
      <h1 className='text-2xl font-semibold mb-3'>Notícias de Tecnologia</h1>
      {technologyNewsFiltered.map((article) => (
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

export default TechnologyPage;
