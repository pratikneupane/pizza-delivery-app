import Image from "next/image";
import React from "react";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container} id="footer">
      <div className={styles.item}>
        <Image src="/img/bg.png" layout="fill" alt="" />
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto}>
            Nothing&apos;s Quiet like Pappa&apos;s Pizza.
          </h2>
        </div>

        <div className={styles.card}>
          <h1 className={styles.title}>FIND OUR RESTAURANTS</h1>
          <p className={styles.text}>
            Rudramati Marga
            <br />
            Bhatkekopul Hadigaun
            <br />
            Kathmandu
            <br />
            9817956980
          </p>
          <p className={styles.text}>
            Seti Opi Marga
            <br />
            Koteshwor
            <br />
            Kathmandu
            <br />
            9817956980
          </p>
          <p className={styles.text}>
            Madan Bhandari Marga
            <br />
            Thapagaun
            <br />
            Kathmandu
            <br />
            9817956980
          </p>
        </div>

        <div className={styles.card}>
          <h1 className={styles.title}>WORKING HOURS</h1>
          <p className={styles.text}>
            Sunday - Friday <br />
            13.00 - 17.00 <br />
            20.00 - 00.00
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
