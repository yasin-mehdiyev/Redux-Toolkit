import { useDispatch, useSelector } from "react-redux";
import classes from "./CartItem.module.css";
import { addItem, removeItem } from "../../../store/features/cart/cartSlice";

const CartItem = (props) => {
  
  const { id, title, quantity, totalAmount, price, description } = props.item;

  const dispatch = useDispatch();

  const notifications = useSelector((state) => state.ui.notifyEnum);

  const removedItem = () => {
    if (notifications !== '1') {
      dispatch(removeItem(id));
    }
  };

  const addedItem = () => {
    if (notifications !== '1') {
      dispatch(
        addItem({
          id,
          title,
          quantity,
          totalAmount,
          price,
          description,
        })
      );
    }
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${totalAmount.toFixed(2)}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removedItem}>-</button>
          <button onClick={addedItem}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
