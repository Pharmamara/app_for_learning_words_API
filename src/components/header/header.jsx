import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "./logo_1.png";
import style from "./header.module.css";

export default function Header() {
  return (
    <div className={style.container}>
      <div className={style.logo}>
        <NavLink end to="/" style={{ textDecoration: "none" }}>
          <img src={Logo} className={style.img} alt="logo" />
        </NavLink>
        <div className={style.title}>
          <NavLink
            end
            to="/"
            style={{ textDecoration: "none", color: "black" }}
          >
            {" "}
            VOCABULARY BOOST
          </NavLink>
        </div>
      </div>
      <div className={style.nav}>
        <div className={style.link}>
          <NavLink
            to="/wordTable"
            style={{ textDecoration: "none", color: "gray" }}
          >
            СПИСОК СЛОВ
          </NavLink>
        </div>
        <div className={style.link}>
          <NavLink
            to="/wordCards"
            style={{ textDecoration: "none", color: "gray" }}
          >
            КАРТОЧКИ СЛОВ
          </NavLink>
        </div>
        <div className={style.link}>
          <NavLink
            to="/wordTraining"
            style={{ textDecoration: "none", color: "gray" }}
          >
            ТРЕНАЖЕР
          </NavLink>
        </div>
      </div>
    </div>
  );
}
