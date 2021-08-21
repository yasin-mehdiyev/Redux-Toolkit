import classes from "./CartButton.module.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleHandler } from "../../../store/features/ui/uiSlice";
import { Link } from 'react-router-dom';

const CartButton = () => {
  const dispatch = useDispatch();

  const hasToggleCart = useSelector((state) => state.ui.isToggleCart);
  const totalQuantity = useSelector(state => state.cart.totalQuantity);

  const isToggleCart = () => {
    dispatch(toggleHandler());
  };

  return (
    <>
      <Link to={hasToggleCart ? '/ui' : '/ui/cart'}>
        <button className={classes.button} onClick={isToggleCart}>
          <span>{hasToggleCart ? 'Close Your Cart' :'My Cart'}</span>
          {!hasToggleCart && <span className={classes.badge}>{totalQuantity}</span>}
        </button>
      </Link>
    </>
  );
};

export default CartButton;
