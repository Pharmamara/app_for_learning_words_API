import React from "react";
import { useRef, useEffect } from "react";
import style from "./btnTranslate.module.css";

export default function BtnTranslate(props) {
  const btnReference = useRef(null);
  useEffect(() => {
    if (btnReference.current) {
      btnReference.current.focus();
    }
    //если не добавить условие в массив зависимостей, фокус сработает на кнопке btnTranslate только после отрисовки 1-ой карточки
  }, [props.translate]);

  const handleClick = () => {
    props.setPressed(!props.pressed);
    props.countWords();
  };
  return (
    <div className={style.btn}>
      {props.pressed ? (
        <span className={style.translate}>{props.translate}</span>
      ) : (
        <button ref={btnReference} className={style.btn} onClick={handleClick}>
          показать перевод
        </button>
      )}
    </div>
  );
}
