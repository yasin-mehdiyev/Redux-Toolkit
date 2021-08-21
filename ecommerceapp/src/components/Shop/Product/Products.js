import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../ProductItem/ProductItem";
import classes from "./Products.module.css";
import { fetchFoodData } from "../../../store/features/ui/uiAction";
import { useHistory } from "react-router-dom";

const Products = () => {
  
  const dispatch = useDispatch();
  const history = useHistory();
  const isToggleCart = useSelector((state) => state.ui.isToggleCart);
  const foods = useSelector((state) => state.ui.foods);

  useEffect(() => {
    dispatch(fetchFoodData());
  }, [dispatch]);

  const backHomePage = () => {
    history.replace('/');
  }

  const foodData =
    foods?.length > 0 &&
    foods.map((item, index) => (
      <ProductItem
        key={index}
        id={item.id}
        title={item.title}
        quantity={item.quantity}
        totalAmount={item.totalAmount}
        price={item.price}
        description={item.desc}
      />
    ));

  return (
    <>

      <div className={classes.btns}>
        <button onClick={backHomePage}>Back to home page</button>
      </div>

      {!isToggleCart && (
        <section className={classes.products}>
          {foodData ? (
            <>
              <h2>Buy your favorite products</h2>
              <ul>{foodData}</ul>
            </>
          ) : (
            <h2>It doesnt exist any foods</h2>
          )}
        </section>
      )}

    </>
  );
};

export default Products;
