import React from "react";
import { Routes, Route } from "react-router-dom";
/*import words from "./components/Dictionary";*/
import { WordsProvider } from "./context/WordsContext";
import Header from "./components/header/header";
import Error404 from "./components/error404/error404";
import Slider from "./components/slider/slider";
import WordList from "./components/wordList/wordList";
import Training from "./components/training/training";
import style from "./App.module.css";

function App() {
  return (
    <WordsProvider>
      <div className={style.App}>
        <Header />
        <Routes>
          <Route path="/" element={<WordList />}>
            Список слов
          </Route>
          <Route path="/wordTable" element={<WordList />}>
            Список слов
          </Route>
          <Route path="/wordCards" element={<Slider />}>
            Карточки слов
          </Route>
          <Route path="/wordTraining" element={<Training />}>
            Тренировка
          </Route>
          <Route path="*" element={<Error404 />}></Route>
        </Routes>
      </div>
    </WordsProvider>
  );
}

export default App;
