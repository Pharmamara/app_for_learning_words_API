// API взаимодействие с сервером
export const API_URL = "https://itgirlschool.justmakeit.ru/api/words";

// Метод для обновления слова на сервере после редактирования
export const updateWord = async (wordId, updatedWord) => {
  const response = await fetch(`${API_URL}/${wordId}/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedWord),
  });
  if (!response.ok) {
    throw new Error("Ошибка обновления слова на сервере");
  }
  return await response.json();
};

// Метод для удаления слова с сервера
export const deleteWord = async (wordId) => {
  const response = await fetch(`${API_URL}/${wordId}/delete`, {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("Ошибка удаления слова с сервера");
  }
  return await response.json();
};
