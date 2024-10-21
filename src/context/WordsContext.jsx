import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Создаем контекст
export const WordsContext = createContext();

// URL API для получения слов
const API_URL = "https://itgirlschool.justmakeit.ru/api/words";

// Провайдер для контекста
export const WordsProvider = ({ children }) => {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Функция для загрузки данных из API
  const fetchWords = async () => {
    try {
      const response = await axios.get(API_URL);
      setWords(response.data); // Предполагаем, что ответ содержит массив слов
      setLoading(false);
    } catch (err) {
      setError("Ошибка при загрузке данных");
      setLoading(false);
    }
  };

  // Загружаем данные при монтировании компонента
  useEffect(() => {
    fetchWords();
  }, []);

  return (
    <WordsContext.Provider value={{ setWords, words, loading, error }}>
      {children}
    </WordsContext.Provider>
  );
};
