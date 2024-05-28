import React, { useState, useEffect } from "react";
import MainLayout from '../layouts/MainLayout';

const AdminPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState(null);
  const [newsList, setNewsList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [redirectMessage, setRedirectMessage] = useState("");

  const handleGenerateSlug = () => {
    const slugValue = title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    setSlug(slugValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMG_BB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const imageData = await response.json();
      const imageUrl = imageData.data.url;

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          category,
          slug,
          images: [imageUrl],
        }),
      });

      alert("Artigo criado com sucesso!");
    } catch (err) {
      alert("Erro ao criar o artigo.");
      console.error(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      fetchNewsList();
    } else {
      setRedirectMessage(
        "Você não está logado. Redirecionando para a página de login..."
      );
      setTimeout(() => {
        window.location.href = "/login";
      }, 0);
    }
  }, []);

  const fetchNewsList = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/articles");
      if (response.ok) {
        const data = await response.json();
        setNewsList(data);
      } else {
        console.error("Erro ao buscar a lista de notícias");
      }
    } catch (error) {
      console.error("Erro ao conectar ao servidor:", error);
    }
  };

  const handleDeleteNews = async (slug) => {
    const confirmDelete = window.confirm(
      "Deseja realmente excluir esta notícia?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/articles/${slug}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          fetchNewsList();
        } else {
          console.error("Erro ao excluir a notícia");
        }
      } catch (error) {
        console.error("Erro ao conectar ao servidor:", error);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day}/${month}/${year} - ${hours}:${minutes}h`;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setRedirectMessage(
      "Você fez logout. Redirecionando para a página de login..."
    );
    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
  };

  return (
    <MainLayout>
    <div className={`flex flex-col items-center ${isLoggedIn ? "" : "hidden"}`}>
      {isLoggedIn ? (
        <div className="container p-4 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4">Criar Artigo</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="text-gray-700">Título:</span>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="block w-full mt-1 p-2 text-black border border-gray-300 rounded-md"
              />
            </label>
            <label className="block flex items-center">
              <span className="text-gray-700 mr-2">Slug:</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="flex-1 p-2 text-black border border-gray-300 rounded-md"
              />
              <button
                type="button"
                onClick={handleGenerateSlug}
                className="bg-blue-500 text-white rounded-md px-3 py-2 ml-2"
              >
                GERAR
              </button>
            </label>
            <label className="block">
              <span className="text-gray-700">Conteúdo:</span>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="block w-full mt-1 p-2 text-black border border-gray-300 rounded-md"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Categoria:</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="block w-full mt-1 p-2 text-black border border-gray-300 rounded-md"
              >
                <option value="">Selecione uma categoria</option>
                <option value="Health">Saúde</option>
                <option value="Security">Segurança</option>
                <option value="Internet">Internet</option>
                <option value="Technology">Tecnologia</option>
                {/* Adicione mais opções de categoria conforme necessário */}
              </select>
            </label>

            <label className="block">
              <span className="text-gray-700">Imagem:</span>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="block w-full mt-1 p-2 border border-gray-300 text-white rounded-md"
              />
            </label>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Criar Artigo
            </button>
          </form>
          <div className="w-full max-w-md mt-4">
            <h2 className="text-lg font-semibold mb-2">
              Lista de Notícias</h2>
            <ul>
              {newsList.map((news, index) => (
                <li
                  key={news.slug}
                  className={`flex justify-between items-center mb-2 rounded-lg p-2 ${index % 2 === 0 ? "bg-black" : "bg-gray-800"
                    }`}
                >
                  <div>
                    <p>{news.title}</p>
                    <p>Data de Publicação: {formatDate(news.publishDate)}</p>
                  </div>
                  <div>
                    <button
                      className="text-red-500"
                      onClick={() => handleDeleteNews(news.slug)}
                    >
                      X
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white rounded-md px-4 mt-3 py-2 mb-10"
          >
            Sair
          </button>
        </div>
      ) : (
        <div className="text-center mt-8 text-gray-700">
          <p>{redirectMessage}</p>
        </div>
      )}
    </div>
    </MainLayout>
  );
};

export default AdminPage;
