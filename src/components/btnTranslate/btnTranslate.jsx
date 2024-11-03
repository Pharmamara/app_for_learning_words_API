import React, { useState, forwardRef, useEffect } from "react";
import style from "./btnTranslate.module.css";

const BtnTranslate = forwardRef(({ translate, onLearned }, ref) => {
  const [isTranslationShown, setIsTranslationShown] = useState(false);
  const [isLearnedCounted, setIsLearnedCounted] = useState(false);

  // Функция для переключения состояния отображения перевода
  const handleToggleTranslation = () => {
    setIsTranslationShown(true);

    // Вызываем onLearned только при первом нажатии для текущей карточки
    if (!isLearnedCounted && onLearned) {
      onLearned();
      setIsLearnedCounted(true); // Отмечаем, что слово изучено
    }
  };

  // Сбрасываем состояние кнопки при каждой новой карточке
  useEffect(() => {
    setIsTranslationShown(false);
    setIsLearnedCounted(false);
  }, [ref]);

  return (
    <button ref={ref} onClick={handleToggleTranslation} className={style.btn}>
      {isTranslationShown ? translate : "Показать перевод"}
    </button>
  );
});

export default BtnTranslate;
