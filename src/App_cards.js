import React, { useState } from "react";
import WordCard from "./components/wordCard/WordCard";
import { words } from "./components/Dictionary";
import style from "./App.module.css";

function App() {
  //блок Карточки слов
  const [pressed, setPressed] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);

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

  return (
    <div className={style.main}>
      <div className={style.container}>
        <button onClick={showPrevCard} className={style.prev_btn}>
          <img src="./assets/arrow_left.svg" alt="" className={style.nav_btn} />
        </button>
        <WordCard
          word={words[cardIndex].english}
          transcription={words[cardIndex].transcription}
          translate={words[cardIndex].russian}
          pressed={pressed}
          setPressed={setPressed}
        />
        <button onClick={showNextCard} className={style.next_btn}>
          <img
            src="./assets/arrow_right.svg"
            alt=""
            className={style.nav_btn}
          />
        </button>
      </div>
    </div>
  );
}

export default App;
