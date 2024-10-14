import React from "react";
import BtnTranslate from "../btnTranslate/btnTranslate";
import style from "./WordCard.module.css";

export default function WordCard({
  word,
  transcription,
  translate,
  pressed,
  setPressed,
  countWords,
}) {
  return (
    <div className={style.wordContainer}>
      <h3 className={style.word}>{word}</h3>
      <h3 className={style.transcription}>{transcription}</h3>
      <BtnTranslate
        translate={translate}
        pressed={pressed}
        setPressed={setPressed}
        countWords={countWords} // передача счетчика в родительский компонент
      />
    </div>
  );
}
