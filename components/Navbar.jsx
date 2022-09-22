import Image from "next/image";
import React from "react";
import styles from "../styles/Navbar.module.css";
import { useSelector } from "react-redux";
import Link from "next/link";

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);

  return (
    <div className={styles.container}>
      <Link href="/" passHref>
        <div className={styles.item}>
          <div className={styles.callButton}>
            <Image src="/img/telephone.png" alt="" width="32" height="32" />
          </div>
          <div className={styles.texts}>
            <div className={styles.text}>ORDER NOW!</div>
            <div className={styles.text}>9817956980</div>
          </div>
        </div>
      </Link>

      <div className={styles.item}>
        <ul className={styles.list}>
          <Link href="/" passHref>
            <li className={styles.listItem}>Homepage</li>
          </Link>
          <Link href="#products" passHref>
            <li className={styles.listItem}>Products</li>
          </Link>

          <Image
            src="/img/logo-no-bg.png"
            alt=""
            width="160px"
            height="110px"
          />
          <li className={styles.listItem}>
            <a
              target="_blank"
              href="https://github.com/pratikneupane/pizza-delivery-app"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </li>
          <Link href="/admin" passHref>
            <li className={styles.listItem}>Admin</li>
          </Link>
        </ul>
      </div>

      <Link href="/cart" passHref>
        <div className={styles.item}>
          <div className={styles.cart}>
            <Image src="/img/cart.png" alt="" width="30px" height="30px" />
            <div className={styles.counter}>{quantity}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
