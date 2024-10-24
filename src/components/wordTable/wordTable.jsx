/*import React, { useState, useContext } from "react";
import { updateWord, deleteWord } from "../../api/wordAPI";
import { WordsContext } from "../../context/WordsContext"; // Импортируем контекст
import Loader from "../loader/loader";
import style from "./wordTable.module.css";

export default function WordTable({ wordItem }) {
  const { setWords, loading } = useContext(WordsContext); // Данные из контекста
  const [errors, setErrors] = useState({
    name: false,
    nameRussian: false,
    nameTranscription: false,
    nameTag: false,
  });

  const { id, english, russian, transcription, tags } = wordItem || {};
  const [isEditMode, setEditMode] = useState(false);
  const [name, setName] = useState(english);
  const [nameRussian, setNameRussian] = useState(russian);
  const [nameTranscription, setNameTranscription] = useState(transcription);
  const [nameTag, setNameTag] = useState(tags);

  if (loading) return <Loader />;

  // Метод для сохранения изменений после обновления слова
  const handleSave = async () => {
    const updatedWord = {
      english: name,
      russian: nameRussian,
      transcription: nameTranscription,
      tags: nameTag,
    };

    try {
      const updated = await updateWord(id, updatedWord);
      setWords((prevWords) =>
        prevWords.map((word) => (word.id === id ? updated : word))
      );
      setEditMode(false); // Закрываем режим редактирования после сохранения
    } catch (error) {
      console.error("Ошибка при обновлении слова:", error);
    }
  };

  // Метод для удаления слова
  const handleDelete = async () => {
    try {
      await deleteWord(id);
      setWords((prevWords) => prevWords.filter((word) => word.id !== id));
    } catch (error) {
      console.error("Ошибка при удалении слова:", error);
    }
  };

  // Обработчики полей ввода
  const handleNameChange = (event) => {
    setName(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, name: !event.target.value }));
  };

  const handleNameRussianChange = (event) => {
    setNameRussian(event.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      nameRussian: !event.target.value,
    }));
  };

  const handleNameTranscriptionChange = (event) => {
    setNameTranscription(event.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      nameTranscription: !event.target.value,
    }));
  };

  const handleNameTagChange = (event) => {
    setNameTag(event.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      nameTag: !event.target.value,
    }));
  };

  const handleEditMode = () => {
    setEditMode(!isEditMode);
  };

  const handleCancel = () => {
    setEditMode(!isEditMode);
  };

  // Проверка на наличие пустых полей
  const isFormInvalid = !name || !nameRussian || !nameTranscription || !nameTag;

  const saveCancelBtns = () => {
    return (
      <>
        <input
          className={`${style.input} ${errors.name ? style.error : ""}`}
          placeholder="Введите слово"
          value={name}
          onChange={handleNameChange}
        />
        <input
          className={`${style.input} ${errors.nameRussian ? style.error : ""}`}
          placeholder="Введите перевод"
          value={nameRussian}
          onChange={handleNameRussianChange}
        />
        <input
          className={`${style.input} ${
            errors.nameTranscription ? style.error : ""
          }`}
          placeholder="Введите транскрипцию"
          value={nameTranscription}
          onChange={handleNameTranscriptionChange}
        />
        <input
          className={`${style.input} ${errors.nameTag ? style.error : ""}`}
          placeholder="Введите тэг"
          value={nameTag}
          onChange={handleNameTagChange}
        />
        <div className={style.buttons}>
          <button
            className={style.btn}
            onClick={handleSave}
            disabled={isFormInvalid} // Кнопка заблокирована, если хотя бы одно поле пустое
          >
            Сохранить
          </button>
          <button className={style.btn} onClick={handleCancel}>
            Отменить
          </button>
        </div>
      </>
    );
  };

  const editDeleteBtns = () => {
    return (
      <>
        <div className={style.wordItem}>{name}</div>
        <div className={style.wordItem}>{nameRussian}</div>
        <div className={style.wordItem}>{nameTranscription}</div>
        <div className={style.wordItem}>{nameTag}</div>
        <div className={style.buttons}>
          <button className={style.btn} onClick={handleEditMode}>
            Редактировать
          </button>
          <button className={style.btn} onClick={handleDelete}>
            Удалить
          </button>
        </div>
      </>
    );
  };

  return (
    <div className={style.tableContainer}>
      {isEditMode ? saveCancelBtns() : editDeleteBtns()}
    </div>
  );
}*/

import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import wordStore from "../../WordStore";
import style from "./wordTable.module.css";

const WordTable = observer(({ wordItem }) => {
  useEffect(() => {
    wordStore.fetchWords();
  }, []);
  if (wordStore.isLoading) {
    return <div>Loading...</div>;
  }
  if (wordStore.words.length === 0) {
    return <div>No words available</div>;
  }

  const [isEditMode, setEditMode] = useState(false);
  const [name, setName] = useState(wordItem.english);
  const [nameRussian, setNameRussian] = useState(wordItem.russian);
  const [nameTranscription, setNameTranscription] = useState(
    wordItem.transcription
  );
  const [nameTag, setNameTag] = useState(wordItem.tags);

  const handleSave = () => {
    wordStore.updateWord(wordItem.id, {
      english: name,
      russian: nameRussian,
      transcription: nameTranscription,
      tags: nameTag,
    });
    setEditMode(false);
  };

  const handleDelete = () => {
    wordStore.deleteWord(wordItem.id);
  };

  return (
    <div className={style.tableContainer}>
      {isEditMode ? (
        <>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <input
            value={nameRussian}
            onChange={(e) => setNameRussian(e.target.value)}
          />
          <input
            value={nameTranscription}
            onChange={(e) => setNameTranscription(e.target.value)}
          />
          <input value={nameTag} onChange={(e) => setNameTag(e.target.value)} />
          <button onClick={handleSave}>Сохранить</button>
          <button onClick={() => setEditMode(false)}>Отмена</button>
        </>
      ) : (
        <>
          <div>{wordItem.english}</div>
          <div>{wordItem.russian}</div>
          <div>{wordItem.transcription}</div>
          <div>{wordItem.tags}</div>
          <button onClick={() => setEditMode(true)}>Редактировать</button>
          <button onClick={handleDelete}>Удалить</button>
        </>
      )}
    </div>
  );
});

export default WordTable;
