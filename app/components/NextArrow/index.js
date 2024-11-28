"use client";

import React, { useEffect, useRef } from "react";
import styles from "./NextArrow.module.css";
import gsap from "gsap";

export default function NextArrow({ onClickHandler }) {

  return (
    <div className={styles.arrowsBH} onClick={onClickHandler}>
        <i className={styles.arrowBH}></i>
        <i className={styles.arrowBH}></i>
        <i className={styles.arrowBH}></i>
    </div>
  );
}
