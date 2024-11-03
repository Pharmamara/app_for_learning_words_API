import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import wordStore from "../../WordStore";
import WordTable from "../wordTable/wordTable";
import Loader from "../loader/loader";
import style from "./wordList.module.css";
import AddWord from "../addWord/addWord";

const WordList = observer(() => {
  useEffect(() => {
    wordStore.fetchWords(); // Загрузка слов при монтировании компонента
  }, []);

  if (wordStore.isLoading) {
    return <Loader />;
  }
  if (wordStore.words.length === 0) {
    return <div>Нет доступных слов</div>;
  }

  return (
    <div className={style.container}>
      <ul className={style.listContainer}>
        <li className={style.wordItem}>Слово</li>
        <li className={style.wordItem}>Перевод</li>
        <li className={style.wordItem}>Транскрипция</li>
        <li className={style.wordItem}>Тэг</li>
        <li className={style.wordItem}>Действия</li>
      </ul>
      <AddWord />
      {wordStore.words.map((wordItem) => (
        <WordTable key={wordItem.id} wordItem={wordItem} />
      ))}
    </div>
  );
});

export default WordList;
