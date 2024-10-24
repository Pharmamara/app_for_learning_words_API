/*import React, { useState, useContext } from "react";
import { WordsContext } from "../../context/WordsContext"; // Подключаем контекст
import { API_URL } from "./../../api/wordAPI";
import style from "./addWord.module.css";

export default function AddWord() {
  const { setWords } = useContext(WordsContext); // Достаем функцию обновления слов
  const [isEditMode, setIsEditMode] = useState(false);
  const [newWord, setNewWord] = useState({
    english: "",
    russian: "",
    transcription: "",
    tags: "",
  });

  // Обработчики изменения полей
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewWord((prevWord) => ({
      ...prevWord,
      [name]: value,
    }));
  };

  // Функция добавления слова в API
  const handleAddWord = async () => {
    try {
      const response = await fetch(`${API_URL}/add`, {
        method: "POST",
        body: JSON.stringify(newWord), // Отправляем новое слово на сервер
      });

      if (!response.ok) {
        throw new Error("Ошибка при добавлении слова");
      }

      const addedWord = await response.json(); // Получаем добавленное слово

      // Обновляем состояние контекста
      setWords((prevWords) => [...prevWords, addedWord]);

      // Сбрасываем режим редактирования и очищаем поля
      setIsEditMode(false);
      setNewWord({
        english: "",
        russian: "",
        transcription: "",
        tags: "",
      });
    } catch (error) {
      console.error("Ошибка при добавлении слова:", error);
    }
  };

  const handleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setNewWord({
      english: "",
      russian: "",
      transcription: "",
      tags: "",
    });
  };

  return (
    <div className={style.container}>
      {isEditMode ? (
        <>
          <input
            type="text"
            name="english"
            className={style.input}
            placeholder="Введите слово"
            value={newWord.english}
            onChange={handleChange}
          />
          <input
            type="text"
            name="russian"
            className={style.input}
            placeholder="Введите перевод"
            value={newWord.russian}
            onChange={handleChange}
          />
          <input
            type="text"
            name="transcription"
            className={style.input}
            placeholder="Введите транскрипцию"
            value={newWord.transcription}
            onChange={handleChange}
          />
          <input
            type="text"
            name="tags"
            className={style.input}
            placeholder="Введите тэг"
            value={newWord.tags}
            onChange={handleChange}
          />
          <div className={style.buttons}>
            <button className={style.btn} onClick={handleAddWord}>
              Сохранить
            </button>
            <button className={style.btn} onClick={handleCancel}>
              Отмена
            </button>
          </div>
        </>
      ) : (
        <>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div className={style.buttons}>
            <div className={style.pseudoBtn}></div>
            <button className={style.btn} onClick={handleEditMode}>
              Добавить
            </button>
          </div>
        </>
      )}
    </div>
  );
}*/

import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import wordStore from "../../WordStore";
import style from "./addWord.module.css";

const AddWord = observer(() => {
  const [newWord, setNewWord] = useState({
    english: "",
    russian: "",
    transcription: "",
    tags: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewWord((prevWord) => ({
      ...prevWord,
      [name]: value,
    }));
  };

  const handleAdd = () => {
    wordStore.addWord(newWord);
    setNewWord({
      english: "",
      russian: "",
      transcription: "",
      tags: "",
    });
  };

  return (
    <div className={style.container}>
      <input
        type="text"
        name="english"
        value={newWord.english}
        onChange={handleChange}
        placeholder="Введите слово"
      />
      <input
        type="text"
        name="russian"
        value={newWord.russian}
        onChange={handleChange}
        placeholder="Введите перевод"
      />
      <input
        type="text"
        name="transcription"
        value={newWord.transcription}
        onChange={handleChange}
        placeholder="Введите транскрипцию"
      />
      <input
        type="text"
        name="tags"
        value={newWord.tags}
        onChange={handleChange}
        placeholder="Введите тэг"
      />
      <button onClick={handleAdd}>Добавить слово</button>
    </div>
  );
});

export default AddWord;
