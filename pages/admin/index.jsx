import axios from "axios";
import Image from "next/image";
import AddButton from "../../components/AddButton";
import Add from "../../components/Add";
// import Edit from "../../components/Edit";
// import EditButton from "../../components/EditButton";
import React, { useState } from "react";
import styles from "../../styles/Admin.module.css";

const Index = ({ orders, products }) => {
  const [productList, setProductList] = useState(products);
  const [close, setClose] = useState(true);
  const [orderList, setOrderList] = useState(orders);
  // const [edit, setEdit] = useState(false);
  // const [editId, setEditId] = useState(false);
  // const [formData, setFormData] = useState({});
  const status = ["preparing", "on the way", "delivered"];

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete("http://0.0.0.0:3000/api/products/" + id);
      setProductList(productList.filter((product) => product._id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  const handleStatus = async (id) => {
    const item = orderList.filter((order) => order._id === id)[0];
    const currentStatus = item.status;

    try {
      const res = await axios.put("http://0.0.0.0:3000/api/orders/" + id, {
        status: currentStatus + 1,
      });

      setOrderList([
        res.data,
        ...orderList.filter((order) => order._id !== id),
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <AddButton setClose={setClose} />
      {!close && <Add setClose={setClose} />}
      <div className={styles.container}>
        <div className={styles.item}>
          <h1 className={styles.title}>Products</h1>

          <table className={styles.table}>
            <tbody>
              <tr className={styles.trTitle}>
                <th>Image</th>
                <th>Id</th>
                <th>Title</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </tbody>

            {productList.map((product) => (
              <tbody key={product._id}>
                <tr className={styles.trTitle}>
                  <td>
                    <Image
                      src={product.image}
                      width={50}
                      height={50}
                      objectFit="cover"
                      alt=""
                    />
                  </td>
                  <td>{product._id.slice(0, 5)}...</td>
                  <td>{product.title}</td>
                  <td>Rs. {product.prices[0]}</td>
                  {/* <td>
                    <EditButton setEdit={setEdit} setEditId={product._id} />
                  </td> */}
                  <td>
                    <button
                      className={styles.button}
                      onClick={() => console.log(product._id)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className={styles.button}
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>

        <div className={styles.item}>
          <h1 className={styles.title}>Orders</h1>

          <table className={styles.table}>
            <tbody>
              <tr className={styles.trTitle}>
                <th>Id</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </tbody>

            {orderList.map((order) => (
              <tbody key={order._id}>
                <tr className={styles.trTitle}>
                  <td>{order._id.slice(0, 5)}...</td>
                  <td>{order.customer}</td>
                  <td>Rs. {order.total}</td>
                  <td>
                    {order.paymentMethod === 0 ? (
                      <span>cash</span>
                    ) : (
                      <span>paid</span>
                    )}
                  </td>
                  <td>{status[order.status]}</td>
                  <td>
                    <button
                      className={styles.button}
                      onClick={() => handleStatus(order._id)}
                    >
                      Next Stage
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  // ctx = context
  const myCookie = ctx.req?.cookies || "";

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  const productRes = await axios.get("http://0.0.0.0:3000/api/products");
  const orderRes = await axios.get("http://0.0.0.0:3000/api/orders");

  return {
    props: {
      orders: orderRes.data,
      products: productRes.data,
    },
  };
};

export default Index;
