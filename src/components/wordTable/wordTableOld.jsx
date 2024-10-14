import React, { useState } from "react";
import style from "./wordTable.module.css";

export default function WordTable({ wordItem }) {
  // Для валидации полей
  const [errors, setErrors] = useState({
    name: false,
    nameRussian: false,
    nameTranscription: false,
    nameTag: false,
  });

  const { english, russian, transcription, tags } = wordItem || {};
  const [isEditMode, setEditMode] = useState(false);
  const [name, setName] = useState(english);
  const [nameRussian, setNameRussian] = useState(russian);
  const [nameTranscription, setNameTranscription] = useState(transcription);
  const [nameTag, setNameTag] = useState(tags);

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
            onClick={() => {
              setEditMode(!isEditMode);
            }}
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
          <button className={style.btn}>Удалить</button>
        </div>
      </>
    );
  };

  return (
    <div className={style.tableContainer}>
      {isEditMode ? saveCancelBtns() : editDeleteBtns()}
    </div>
  );
}
