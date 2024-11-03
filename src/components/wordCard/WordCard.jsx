import React from "react";
import BtnTranslate from "../btnTranslate/btnTranslate";
import style from "./WordCard.module.css";

export default function WordCard({
  word,
  transcription,
  translate,
  learned,
  onLearned,
  btnTranslateRef, // Получаем реф от Slider
}) {
  return (
    <div className={style.wordContainer}>
      <h3 className={style.word}>{word}</h3>
      <h3 className={style.transcription}>{transcription}</h3>
      <BtnTranslate
        translate={translate}
        onLearned={onLearned}
        ref={btnTranslateRef} // Передаем реф на кнопку
      />
      {learned && <p className={style.learned}>Изучено</p>}
    </div>
  );
}
