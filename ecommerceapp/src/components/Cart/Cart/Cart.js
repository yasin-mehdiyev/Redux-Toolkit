import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../../UI/Card/Card";
import classes from "./Cart.module.css";
import CartItem from "../CartItem/CartItem";

const Cart = () => {
  
  const hasToggleCart = useSelector((state) => state.ui.isToggleCart);
  const cartItem = useSelector((state) => state.cart.items);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    let yourBalance = 0;
    cartItem?.map((item) => (yourBalance += item.totalAmount));

    setBalance(yourBalance);
  }, [cartItem]);

  const hasExistProduct = cartItem?.length > 0;

  return (
    <>
      {hasToggleCart && (
        <>
          <Card className={classes.cart}>
            {hasExistProduct ? (
              <>
                <h2>Your Shopping Cart</h2>
                <ul>
                  {cartItem?.map((elem, index) => (
                    <CartItem
                      key={index}
                      item={{
                        id: elem.id,
                        title: elem.title,
                        quantity: elem.quantity,
                        totalAmount: elem.totalAmount,
                        price: elem.price,
                        description: elem.desc,
                      }}
                    />
                  ))}
                </ul>
              </>
            ) : (
              <h2 style={{ textAlign: "center" }}>
                Product doesn't exist in your cart
              </h2>
            )}
          </Card>

          {hasExistProduct && (
            <Card className={classes.cart_balance}>
              <h4>TOTAL EXCOME - {balance.toFixed(2)} $ </h4>
            </Card>
          )}
        </>
      )}
    </>
  );
};

export default Cart;
