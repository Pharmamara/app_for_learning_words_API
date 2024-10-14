import React, { useState, useContext } from "react";
import WordCard from "../wordCard/WordCard";
import { WordsContext } from "../../context/WordsContext"; // Импортируем контекст
import Loader from "../loader/loader";
import ArrowLeft from "./arrow_left.svg";
import ArrowRight from "./arrow_right.svg";
import style from "./slider.module.css";

export default function Slider() {
  const { words, loading, error } = useContext(WordsContext); // Получаем данные из контекста
  const [pressed, setPressed] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [learned, setLearned] = useState(0);

  // Проверяем, если слова еще загружаются или произошла ошибка
  if (loading) return <Loader />;
  if (error) return <div className={style.error}>{error}</div>;
  if (!words.length)
    return <div className={style.error}>нет слов, доступных для изучения</div>;

  const showPrevCard = () => {
    let index = cardIndex;

    if (index !== 0) {
      index--;
      setCardIndex(index);
    } else if (index === 0) {
      setCardIndex(0);
    }
    setPressed(false);
  };

  const showNextCard = () => {
    let index = cardIndex;

    if (index !== words.length - 1) {
      index++;
      setCardIndex(index);
    } else if (index === words.length - 1) {
      setCardIndex(words.length - 1);
    }
    setPressed(false);
  };

  // Функция для увеличения количества изученных слов
  const countWords = () => {
    let learnedWords = learned;

    if (learnedWords !== words.length) {
      setLearned(learnedWords + 1);
    }
  };

  return (
    <div className={style.main}>
      <div className={style.container}>
        <button onClick={showPrevCard} className={style.prev_btn}>
          <img
            src={ArrowLeft}
            alt="Предыдущая карточка"
            className={style.nav_btn}
          />
        </button>

        {/* Передаем данные из контекста в WordCard */}
        <WordCard
          word={words[cardIndex].english}
          transcription={words[cardIndex].transcription}
          translate={words[cardIndex].russian}
          pressed={pressed}
          setPressed={setPressed}
          countWords={countWords}
        />

        <button onClick={showNextCard} className={style.next_btn}>
          <img
            src={ArrowRight}
            alt="Следующая карточка"
            className={style.nav_btn}
          />
        </button>
      </div>

      <div className={style.wordCounter}>
        Изучено {learned} из {words.length} слов
      </div>
    </div>
  );
}
