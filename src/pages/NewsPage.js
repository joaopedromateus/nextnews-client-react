import React, { useEffect, useState } from 'react';
import { FaWhatsapp, FaFacebook, FaTelegramPlane, FaTwitter } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

const NewsPage = () => {
  const [article, setArticle] = useState(null);
  const { slug } = useParams();
  const shareUrl = window.location.href;
  const shareText = 'Confira esta notícia: ';
  const navigate = useNavigate();

  const shareToWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + shareUrl)}`);
  };

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`);
  };

  const shareToTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`);
  };

  const shareToTelegram = () => {
    window.open(`https://telegram.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} - ${hours}:${minutes}h`;
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:5000/api/articles/${slug}`);
        const articleData = await response.json();

        if (!articleData) {
          setArticle(null);
          return;
        }

        articleData.publishDate = formatDate(articleData.publishDate);

        setArticle(articleData);
      } catch (error) {
        console.error('Erro ao buscar detalhes da notícia:', error);
        setArticle(null);
      }
    }

    fetchData();
  }, [slug]);

  if (!article) {
    return (
      <div className="text-center mt-8">
        <p className="text-xl font-semibold">Carregando...</p>
      </div>
    );
  }

  return (
    <MainLayout>
    <div className="max-w-4xl mx-auto p-4 mb-3">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-600 mb-2">Categoria: {article.category}</p>
      <p className="text-gray-600 mb-2">Data de publicação: {article.publishDate} </p>
      <img
        src={`${article.images}`}
        alt="Imagem da notícia"
        className='w-[700px] rounded-md mb-4'
      />
      <p className="text-xl leading-7">{article.content}</p>
      <div className="flex justify-center mt-3 mb-3">
        <p className="mr-2">Compartilhar:</p>
        <button onClick={shareToWhatsApp} aria-label="Compartilhar no WhatsApp"><FaWhatsapp size={24} className="text-white" /></button>
        <button onClick={shareToFacebook} aria-label="Compartilhar no Facebook" className="mx-2"><FaFacebook size={24} className="text-white" /></button>
        <button onClick={shareToTwitter} aria-label="Compartilhar no Twitter" className="mx-2"><FaTwitter size={24} className="text-white" /></button>
        <button onClick={shareToTelegram} aria-label="Compartilhar no Telegram"><FaTelegramPlane size={24} className="text-white" /></button>
      </div>
    </div>
    </MainLayout>
  );
};

export default NewsPage;
