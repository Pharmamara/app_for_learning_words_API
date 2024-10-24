import { makeAutoObservable, runInAction } from "mobx";

class WordStore {
  words = [];
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  // Получение слов с сервера
  async fetchWords() {
    this.isLoading = true;
    try {
      console.log("Fetching words..."); // Лог при вызове
      const response = await fetch(
        "http://itgirlschool.justmakeit.ru/api/words"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch words");
      }
      const data = await response.json();
      runInAction(() => {
        this.words = data;
        console.log("Words loaded:", data); // Лог после успешной загрузки
      });
    } catch (error) {
      console.error("Ошибка при загрузке слов:", error);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  // Добавление слова
  async addWord(newWord) {
    try {
      const response = await fetch(
        "http://itgirlschool.justmakeit.ru/api/words/add",
        {
          method: "POST",

          body: JSON.stringify(newWord),
        }
      );
      const addedWord = await response.json();
      runInAction(() => {
        this.words.push(addedWord);
      });
    } catch (error) {
      console.error("Ошибка при добавлении слова:", error);
    }
  }

  // Удаление слова
  async deleteWord(id) {
    try {
      await fetch(`http://itgirlschool.justmakeit.ru/api/words/${id}/delete`, {
        method: "POST",
      });
      runInAction(() => {
        this.words = this.words.filter((word) => word.id !== id);
      });
    } catch (error) {
      console.error("Ошибка при удалении слова:", error);
    }
  }

  // Изменение слова
  async updateWord(id, updatedWord) {
    try {
      await fetch(`http://itgirlschool.justmakeit.ru/api/words/${id}/update`, {
        method: "POST",

        body: JSON.stringify(updatedWord),
      });
      runInAction(() => {
        const index = this.words.findIndex((word) => word.id === id);
        if (index !== -1) {
          this.words[index] = { id, ...updatedWord };
        }
      });
    } catch (error) {
      console.error("Ошибка при обновлении слова:", error);
    }
  }
}

const wordStore = new WordStore();
export default wordStore;
