import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import wordStore from "../../WordStore";
import style from "./wordTable.module.css";

const WordTable = observer(({ wordItem }) => {
  const [isEditMode, setEditMode] = useState(false);
  const [name, setName] = useState(wordItem.english);
  const [nameRussian, setNameRussian] = useState(wordItem.russian);
  const [nameTranscription, setNameTranscription] = useState(
    wordItem.transcription
  );
  const [nameTag, setNameTag] = useState(wordItem.tags);
  const [errors, setErrors] = useState({});

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

  const validateFields = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = true;
    if (!nameRussian.trim()) newErrors.nameRussian = true;
    if (!nameTranscription.trim()) newErrors.nameTranscription = true;
    if (!nameTag.trim()) newErrors.nameTag = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveWithValidation = () => {
    if (validateFields()) {
      handleSave();
    }
  };

  return (
    <div className={style.tableContainer}>
      {isEditMode ? (
        <>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name && e.target.value.trim()) {
                setErrors((prev) => ({ ...prev, name: false }));
              }
            }}
          />
          <input
            className={`${style.input} ${
              errors.nameRussian ? style.errorInput : ""
            }`}
            value={nameRussian}
            onChange={(e) => {
              setNameRussian(e.target.value);
              if (errors.nameRussian && e.target.value.trim()) {
                setErrors((prev) => ({ ...prev, nameRussian: false }));
              }
            }}
          />

          <input
            className={`${style.input} ${
              errors.nameTranscription ? style.errorInput : ""
            }`}
            value={nameTranscription}
            onChange={(e) => {
              setNameTranscription(e.target.value);
              if (errors.nameTranscription && e.target.value.trim()) {
                setErrors((prev) => ({ ...prev, nameTranscription: false }));
              }
            }}
          />
          <input
            className={`${style.input} ${
              errors.nameTag ? style.errorInput : ""
            }`}
            value={nameTag}
            onChange={(e) => {
              setNameTag(e.target.value);
              if (errors.nameTag && e.target.value.trim()) {
                setErrors((prev) => ({ ...prev, nameTag: false }));
              }
            }}
          />
          <div className={style.buttons}>
            <button
              className={style.btn}
              onClick={handleSaveWithValidation}
              disabled={Object.keys(errors).length > 0}
            >
              Сохранить
            </button>
            <button className={style.btn} onClick={() => setEditMode(false)}>
              Отмена
            </button>
          </div>
        </>
      ) : (
        <>
          <div>{wordItem.english}</div>
          <div>{wordItem.russian}</div>
          <div>{wordItem.transcription}</div>
          <div>{wordItem.tags}</div>
          <div className={style.buttons}>
            <button className={style.btn} onClick={() => setEditMode(true)}>
              Редактировать
            </button>
            <button className={style.btn} onClick={handleDelete}>
              Удалить
            </button>
          </div>
        </>
      )}
    </div>
  );
});

export default WordTable;
