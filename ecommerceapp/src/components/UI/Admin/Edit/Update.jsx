import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, useHistory, useParams } from "react-router-dom";
import NotFound from "../../../../pages/NotFound/NotFound";
import {
  getProductById,
  saveProduct,
} from "../../../../store/features/admin/adminAction";
import { setShowSearch } from "../../../../store/features/admin/adminSlice";
import { setCartData } from "../../../../store/features/cart/cartAction";
import Card from "../../Card/Card";
import classes from "../Create/Add.module.css";

const Update = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [food, setFood] = useState({});
  const [isDisabledBtn, setIsDisabledBtn] = useState(false);

  const foods = useSelector((state) => state.ui.foods);
  const carts = useSelector((state) => state.cart);
  const isShowSearch = useSelector((state) => state.admin.isShownSearch);
  let foodsId = useSelector((state) => state.admin.productById);

  useEffect(() => {
    dispatch(getProductById(foods, id));
  }, [dispatch]);

  useEffect(() => {
    setFood(foodsId);
  }, [foodsId]);

  const { title, quantity, price, totalAmount, desc } = food;

  const handleChange = (name, value) => {
    setFood({ ...food, [name]: value });
  };

  const handleBlur = () => {
    if (
      food.quantity !== "" &&
      food.price !== "" &&
      Number(food.quantity) > 0 &&
      Number(food.price) > 0
    ) {
      const total = Number(food.quantity) * Number(food.price);

      setFood({ ...food, totalAmount: total });

      if (food.title !== "" && food.desc !== "") {
        setIsDisabledBtn(false);
      } else {
        setIsDisabledBtn(true);
      }
    } else {
      setFood({ ...food, totalAmount: 0 });
      setIsDisabledBtn(true);
    }
  };

  const handleEdit = (ev) => {
    ev.preventDefault();

    dispatch(saveProduct(food, "Edit"));

    let cartFindIndex = carts.items?.findIndex((item) => item.id === food.id);

    if (cartFindIndex !== -1) {
      let data = carts.items?.filter((item) => item.id !== food.id);
      data?.splice(cartFindIndex, 0, food);

      const updateRequest = {
        items: data,
        totalQuantity: carts.totalQuantity,
      };

      dispatch(setCartData(updateRequest, "Edit"));
    }

    if (isShowSearch === true) {
      dispatch(setShowSearch(false));
    }

    history.push("/admin");
  };

  const isCheckingId = foods.findIndex((item) => item.id === id);

  return (
    <>
      {
        isCheckingId === -1 ? (
          <Route path='*'>
            <NotFound/>
          </Route>
        ) : (
          <Card>
          <h2 style={{ textAlign: "center" }}>Edit Product Form</h2>
  
          <form className={classes.form} onSubmit={handleEdit}>
            <div className={classes.formControl}>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                placeholder="Enter new title"
                id="title"
                name="title"
                value={title}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
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
                name="quantity"
                value={quantity}
                onChange={(e) =>
                  handleChange(e.target.name, Number(e.target.value))
                }
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
                name="price"
                value={price}
                onChange={(e) =>
                  handleChange(e.target.name, Number(e.target.value))
                }
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
                name="totalAmount"
                value={totalAmount}
                disabled
                onBlur={handleBlur}
              />
            </div>
  
            <div className={classes.formControl}>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                cols="30"
                rows="10"
                name="desc"
                value={desc}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                onBlur={handleBlur}
              ></textarea>
            </div>
  
            <button className={classes.createBtn} disabled={isDisabledBtn}>
              Update
            </button>
          </form>
        </Card>
        )
      }
    </>
  );
};

export default Update;
