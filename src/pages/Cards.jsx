import React from "react";
import Header from "../components/header";
import WordCard from "../components/wordCard";

export default function Cards() {
  return (
    <>
      <Header />
      <WordCard english={"word"} transcription={"[wɜːrd]"} russian={"слово"} />
    </>
  );
}
