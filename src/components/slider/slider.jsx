import React, { useEffect, useCallback, useRef } from "react";
import { observer } from "mobx-react-lite";
import wordStore from "../../WordStore";
import WordCard from "../wordCard/WordCard";
import Loader from "../loader/loader";
import ArrowLeft from "./arrow_left.svg";
import ArrowRight from "./arrow_right.svg";
import style from "./slider.module.css";

const Slider = observer(() => {
  const {
    words,
    isLoading,
    currentIndex,
    learnedCount,
    showPrevCard,
    showNextCard,
    incrementLearnedCount,
    fetchWords,
  } = wordStore;

  const memoizedFetchWords = useCallback(fetchWords, [fetchWords]);

  // Реф для кнопки BtnTranslate
  const btnTranslateRef = useRef(null);

  useEffect(() => {
    if (!words.length) {
      memoizedFetchWords();
    }
  }, [memoizedFetchWords, words.length]);

  // Устанавливаем фокус на кнопке при изменении currentIndex
  useEffect(() => {
    if (btnTranslateRef.current) {
      btnTranslateRef.current.focus();
    }
  }, [currentIndex]);

  if (isLoading) return <Loader />;
  if (!words.length)
    return <div className={style.error}>нет слов, доступных для изучения</div>;

  const currentWord = words[currentIndex];
  if (!currentWord) return null;

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

        <WordCard
          key={currentIndex} // Добавляем key для принудительной перерисовки WordCard
          word={currentWord.english}
          transcription={currentWord.transcription}
          translate={currentWord.russian}
          learned={currentWord.learned}
          onLearned={incrementLearnedCount}
          btnTranslateRef={btnTranslateRef} // Передаем реф
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
        Изучено {learnedCount} из {words.length} слов
      </div>
    </div>
  );
});

export default Slider;
