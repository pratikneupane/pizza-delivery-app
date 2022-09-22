import React, { useState } from "react";
import styles from "../styles/CashModal.module.css";

const CashModal = ({ total, createOrder }) => {
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");

  const handleClick = () => {
    createOrder({
      customer,
      address,
      total,
      paymentMethod: 0,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>You will pay 12€ after delivery.</h1>

        <div className={styles.item}>
          <label className={styles.label}>Name Surname</label>
          <input
            type="text"
            placeholder="Sergio Díaz"
            className={styles.input}
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>

        <div className={styles.item}>
          <label className={styles.label}>Phone Number</label>
          <input
            type="text"
            placeholder="651 23 45 67"
            className={styles.input}
          />
        </div>

        <div className={styles.item}>
          <label className={styles.label}>Address</label>
          <textarea
            rows={5}
            type="text"
            placeholder="Av/ de las Ciencias, n10, 1A"
            className={styles.textarea}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <button className={styles.button} onClick={handleClick}>
          Order
        </button>
      </div>
    </div>
  );
};

export default CashModal;
