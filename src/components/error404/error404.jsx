import React from "react";
import { Link } from "react-router-dom";
import style from "./error404.module.css";

export default function Error404() {
  return (
    <body className={style.body}>
      <main className={style.main}>
        <div>
          <div>
            <span>ошибка&nbsp;404</span>
            <span>страница&nbsp;не&nbsp;найдена</span>
          </div>
          <svg viewBox="0 0 200 600">
            <polygon points="118.302698 8 59.5369448 66.7657528 186.487016 193.715824 14 366.202839 153.491505 505.694344 68.1413353 591.044514 200 591.044514 200 8"></polygon>
          </svg>
        </div>
        <svg className={style.crack} viewBox="0 0 200 600">
          <polyline points="118.302698 8 59.5369448 66.7657528 186.487016 193.715824 14 366.202839 153.491505 505.694344 68.1413353 591.044514"></polyline>
        </svg>
        <div>
          <svg viewBox="0 0 200 600">
            <polygon points="118.302698 8 59.5369448 66.7657528 186.487016 193.715824 14 366.202839 153.491505 505.694344 68.1413353 591.044514 0 591.044514 0 8"></polygon>
          </svg>
          <div>
            <span>мы&nbsp;устраняем&nbsp;ошибку!</span>
            <span>
              <Link
                to="/"
                style={{ textDecoration: "none" }}
                className={style.link}
              >
                <b>вернемся&nbsp;на главную страницу?</b>
              </Link>
            </span>
          </div>
        </div>
      </main>
    </body>
  );
}
