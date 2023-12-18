import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Add from "../components/Add";
import ProductList from "../components/ProductList";
import Slider from "../components/Slider";
import styles from "../styles/Home.module.css";

export default function Home({ productList, admin }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza Delivery in Kathmandu</title>
        <meta name="description" content="Best pizza in the capital city" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Slider />
      <ProductList productList={productList} />
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }

  const res = await axios.get("https://pizza-delivery-app-mocha.vercel.app/api/products");
  return {
    props: {
      productList: res.data,
      admin,
    },
  };
};
