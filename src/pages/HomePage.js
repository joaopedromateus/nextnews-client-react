import React, { useEffect, useState } from 'react';
import News from '../components/News';
import MainLayout from '../layouts/MainLayout';


const Home = () => {



  const [newsData, setNewsData] = useState([]);

   useEffect(() => {
    fetch('http://localhost:5000/api/articles')
      .then((response) => response.json())
      .then((data) => {
        const reversedData = data.reverse();
        setNewsData(reversedData);
      })
      .catch((error) => {
        console.error("Erro ao buscar notícias:", error);
      });
  }, []);

  

  return (
    <MainLayout>
    
    <main className="flex flex-col items-center p-8">
      <section>
        <h2 className="text-2xl font-semibold mb-3">Notícias Recentes:</h2>
        {newsData.map((news) => (
          <News
            key={news._id}
            title={news.title}
            slug={news.slug}
            category={news.category}
            images={news.images}
            publishDate={news.publishDate}
            content={''} />
        ))}
      </section>
    </main>
    </MainLayout>
  );
};

export default Home;
