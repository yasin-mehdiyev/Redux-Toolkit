import { useDispatch, useSelector } from "react-redux";
import Card from "../../UI/Card/Card";
import classes from "./ProductItem.module.css";
import { addToCart } from "../../../store/features/cart/cartSlice";
import { toast } from "react-toastify";

const ProductItem = (props) => {
  const { id, title, quantity, totalAmount, price, description } = props;

  const dispatch = useDispatch();

  const notifications = useSelector((state) => state.ui.notifyEnum);

  const addedItem = () => {
    if (notifications !== "1") {
      dispatch(
        addToCart({
          id,
          title,
          quantity,
          totalAmount,
          price,
          description,
        })
      );
    } else {
      toast.error("Something went failed");
    }
  };

  return (
    <>
      <li className={classes.item}>
        <Card>
          <header>
            <h3>{title}</h3>
            <div className={classes.price}>${price.toFixed(2)}</div>
          </header>
          <p>{description}</p>
          <div className={classes.actions}>
            <button onClick={addedItem}>Add to Cart</button>
          </div>
        </Card>
      </li>
    </>
  );
};

export default ProductItem;
