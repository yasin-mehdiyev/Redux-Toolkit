import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Card from "../../Card/Card";
import classes from "./Add.module.css";
import { saveProduct } from "../../../../store/features/admin/adminAction";
import { Link, useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Add = () => {
  const title = useRef();
  const quantity = useRef();
  const price = useRef();
  const description = useRef();

  const dispatch = useDispatch();
  const history = useHistory();

  const [isDisabledBtn, setIsDisabledBtn] = useState(true);
  const [totalamount, settotalAmount] = useState(0);

  const resetFields = () => {
    title.current.value = "";
    quantity.current.value = "";
    price.current.value = "";
    description.current.value = "";
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const totalAmount =
      Number(quantity.current.value) * Number(price.current.value);

    const request = {
      id: uuidv4(),
      title: title.current.value,
      quantity: Number(quantity.current.value),
      price: Number(price.current.value),
      totalAmount: totalAmount,
      desc: description.current.value,
    };

    dispatch(saveProduct(request, 'Post'));
    history.push("/cabinet");
    resetFields();
  };

  const handleBlur = () => {
    if (
      quantity.current.value !== "" &&
      price.current.value !== "" &&
      Number(quantity.current.value) > 0 &&
      Number(price.current.value) > 0
    ) {
      const total =
        Number(quantity.current.value) * Number(price.current.value);
      settotalAmount(total);

      if (title.current.value !== "" && description.current.value !== "") {
        setIsDisabledBtn(false);
      } else {
        setIsDisabledBtn(true);
      }
    } else {
      settotalAmount(0);
      setIsDisabledBtn(true);
    }
  };

  return (
    <Card>
      <Link to="/admin">
        <div style={{ textAlign: "center" }}>
          <button>Back to admin page</button>
        </div>
      </Link>

      <h2 style={{ textAlign: "center" }}>Create New Product Form</h2>

      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.formControl}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder="Enter new title"
            id="title"
            ref={title}
            onBlur={handleBlur}
          />
        </div>

        <div className={classes.formControl}>
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            min="1"
            placeholder="Enter new quantity"
            id="quantity"
            ref={quantity}
            onBlur={handleBlur}
          />
        </div>

        <div className={classes.formControl}>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            min="1"
            placeholder="Enter new price"
            id="price"
            ref={price}
            onBlur={handleBlur}
          />
        </div>

        <div className={classes.formControl}>
          <label htmlFor="totalAmount">Total Amount</label>
          <input
            type="number"
            min="1"
            placeholder="Calculating TotalAmount"
            id="totalamount"
            value={totalamount}
            disabled
          />
        </div>

        <div className={classes.formControl}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            cols="30"
            rows="10"
            ref={description}
            onBlur={handleBlur}
          ></textarea>
        </div>

        <button className={classes.createBtn} disabled={isDisabledBtn}>
          Create
        </button>
      </form>
    </Card>
  );
};

export default Add;
