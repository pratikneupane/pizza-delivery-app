import React, { useState } from "react";
import styles from "../styles/Add.module.css";
import axios from "axios";

const Edit = ({ setEditClose, id }) => {
  // we need the state to close/open modal as a prop

  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [prices, setPrices] = useState([]);
  const [extraOptions, setExtraOptions] = useState([]);
  const [extra, setExtra] = useState(null);

  const handleExtraInput = (e) => {
    setExtra({
      ...extra,
      [e.target.name]: e.target.value,
    });
  };

  const handleExtra = (e) => {
    setExtraOptions((prev) => [...prev, extra]);
  };

  const changePrice = (e, index) => {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };

  const handleCreate = async () => {
    const data = new FormData();

    data.append("file", file);
    data.append("upload_preset", "uploads");

    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/lordhendrix/image/upload",
        data
      );

      const { url } = uploadRes.data;
      const newProduct = {
        title,
        description,
        prices,
        extraOptions,
        image: url,
      };

      await axios.post("http://0.0.0.0:3000/api/products", newProduct);

      setClose(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => setEditClose(true)} className={styles.close}>
          X
        </span>

        <h1>Add a New Product</h1>

        <div className={styles.item}>
          <label className={styles.label}>Choose an image</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />{" "}
          {/* [0] means we can't choose multiple files */}
        </div>

        <div className={styles.item}>
          <label className={styles.label}>Title</label>
          <div className={styles.priceContainer}>
            <input
              className={styles.input}
              type="text"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className={styles.item}>
            <label className={styles.label}>Description</label>
            <textarea
              rows={10}
              type="text"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className={styles.item}>
            <label className={styles.label}>Prices</label>
            <div className={styles.priceContainer}>
              <input
                className={`${styles.input} ${styles.inputSmall}`}
                type="number"
                placeholder="Small"
                onChange={(e) => changePrice(e, 0)}
              />
              <input
                className={`${styles.input} ${styles.inputSmall}`}
                type="number"
                placeholder="Medium"
                onChange={(e) => changePrice(e, 1)}
              />
              <input
                className={`${styles.input} ${styles.inputSmall}`}
                type="number"
                placeholder="Large"
                onChange={(e) => changePrice(e, 2)}
              />
            </div>
          </div>
        </div>

        <div className={styles.item}>
          <label className={styles.label}>Extra</label>
          <div className={styles.extra}>
            <input
              className={`${styles.input} ${styles.inputSmall}`}
              type="text"
              placeholder="Item"
              name="text"
              onChange={handleExtraInput}
            />
            <input
              className={`${styles.input} ${styles.inputSmall}`}
              type="number"
              placeholder="Price"
              name="price"
              onChange={handleExtraInput}
            />

            <button className={styles.extraButton} onClick={handleExtra}>
              Add
            </button>
          </div>

          <div className={styles.extraItems}>
            {extraOptions.map((option) => (
              <span key={option.text} className={styles.extraItem}>
                {option.text}
              </span>
            ))}
          </div>
        </div>

        <button className={styles.addButton} onClick={handleCreate}>
          Create
        </button>
      </div>
    </div>
  );
};

export default Edit;
