import { setNotifications } from "../ui/uiSlice";
import { setInitialData } from "./cartSlice";
import { toast } from 'react-toastify';
import baseUrl from "../../../helpers/baseUrl";

export const fetchCartData = () => async (dispatch) => {
    
    const fetchData = async () => {
        let response = await fetch(`${baseUrl}/cart.json`);

        if (!response.ok) {
            throw new Error("Could not fetch cart data!");
        }

        const data = response.json();

        return data;
    };

    try {
        const carts = await fetchData();
        dispatch(
            setInitialData({
                items: carts.items || [],
                totalQuantity: carts.totalQuantity,
            })
        );
    }
    catch (error) {
        dispatch(setNotifications('1'));
        toast.error(error.message);
    }
};

export const sendRequestData = (cart) => async (dispatch) => {

    const sendData = async () => {
        let response = await fetch(`${baseUrl}/cart.json`,
            {
                method: "PUT",
                body: JSON.stringify(cart),
            }
        );

        if (!response.ok) {
            throw new Error("Could not send cart data!");
        }

        const data = response.json();

        return data;
    };

    try {
        await sendData();
    }
    catch (error) {
        dispatch(setNotifications('1'));
        toast.error(error.message);
    }
};

export const setCartData = (datas, method) => async (dispatch) => {

    const updateCartData = async () => {
        let response = await fetch(`${baseUrl}/cart.json`, {
          method: "PUT",
          body: JSON.stringify(datas),
        });
    
        if (!response.ok) {
          throw new Error(`Could not ${method} request in cart`);
        }
        const data = response.json();
    
        return data;
      };
    
      try {
        let responseCarts = await updateCartData();
        dispatch(setInitialData(responseCarts));
      } catch (error) {
        dispatch(setNotifications("1"));
        toast.error(error.message);
      }
}
      
