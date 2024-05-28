import React, { useEffect, useState } from 'react';
import News from '../components/News';
import MainLayout from '../layouts/MainLayout';

const SecurityPage = () => {
  const [securityNews, setSecurityNews] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/articles?category=Security')
      .then((response) => response.json())
      .then((data) => {
        const reversedData = data.reverse();
        setSecurityNews(reversedData);
      })
      .catch((error) => {
        console.error('Erro ao buscar notícias de Segurança:', error);
      });
  }, []);

  const securityNewsFiltered = securityNews.filter((article) => article.category === 'Security');

  return (
    <MainLayout>
    <div>
      <h1 className='text-2xl font-semibold mb-3'>Notícias de Segurança</h1>
      {securityNewsFiltered.map((article) => (
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

export default SecurityPage;
