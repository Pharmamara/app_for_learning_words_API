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
  const [isEditMode, setIsEditMode] = useState(false);
  const [errors, setErrors] = useState({});

  // Обработчики изменения полей
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewWord((prevWord) => ({
      ...prevWord,
      [name]: value,
    }));

    // Убираем ошибку при вводе значения
    if (errors[name] && value.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
    }
  };

  // Валидация полей
  const validateFields = () => {
    const newErrors = {};
    if (!newWord.english.trim()) newErrors.english = true;
    if (!newWord.russian.trim()) newErrors.russian = true;
    if (!newWord.transcription.trim()) newErrors.transcription = true;
    if (!newWord.tags.trim()) newErrors.tags = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
    setErrors({}); // Сбрасываем ошибки при отмене
  };

  const handleAddWord = () => {
    if (validateFields()) {
      wordStore.addWord(newWord);
      setNewWord({
        english: "",
        russian: "",
        transcription: "",
        tags: "",
      });
      setErrors({});
    }
  };

  return (
    <div className={style.container}>
      {isEditMode ? (
        <>
          <input
            type="text"
            name="english"
            className={`${style.input} ${
              errors.english ? style.errorInput : ""
            }`}
            placeholder="Введите слово"
            value={newWord.english}
            onChange={handleChange}
          />
          <input
            type="text"
            name="russian"
            className={`${style.input} ${
              errors.russian ? style.errorInput : ""
            }`}
            placeholder="Введите перевод"
            value={newWord.russian}
            onChange={handleChange}
          />
          <input
            type="text"
            name="transcription"
            className={`${style.input} ${
              errors.transcription ? style.errorInput : ""
            }`}
            placeholder="Введите транскрипцию"
            value={newWord.transcription}
            onChange={handleChange}
          />
          <input
            type="text"
            name="tags"
            className={`${style.input} ${errors.tags ? style.errorInput : ""}`}
            placeholder="Введите тэг"
            value={newWord.tags}
            onChange={handleChange}
          />
          <div className={style.buttons}>
            <button
              className={style.btn}
              onClick={handleAddWord}
              disabled={Object.keys(errors).some((key) => errors[key])}
            >
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
});

export default AddWord;
