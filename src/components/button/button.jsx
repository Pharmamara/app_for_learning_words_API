import React from 'react'
import style from './button.css'

export default function Button(props) {
    return (
        <div className={style.btn}>
            <span className={style.text}>{props.text}</span>
        </div>
    )
}