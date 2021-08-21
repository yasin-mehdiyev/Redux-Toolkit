import baseUrl from "../../../helpers/baseUrl";
import { setNotifications } from "../ui/uiSlice";
import { setProduct, setSearchData } from "./adminSlice";
import { fetchFoodData } from "../ui/uiAction";
import { toast } from "react-toastify";

export const saveProduct = (product, action) => async (dispatch) => {
  const saveProduct = async () => {
    let response = await fetch(`${baseUrl}/food/${product.id}.json`, {
      method: "PUT",
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error(`Could not ${action} product data!`);
    }

    const data = response.json();

    return data;
  };

  try {
    await saveProduct();
    dispatch(setNotifications("2"));
    if (action === "Edit") {
      dispatch(fetchFoodData());
    }
    toast.success(`Request data was ${action} with successfully...`);
  } catch (error) {
    dispatch(setNotifications("1"));
    toast.error(error.message);
  }
};

export const removeProduct = (id) => async (dispatch) => {
  const removeProduct = async () => {
    let response = await fetch(`${baseUrl}/food/${id}.json`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Could not remove product data!");
    }

    const data = response.json();

    return data;
  };

  try {
    await removeProduct();
    dispatch(setNotifications("2"));
    dispatch(fetchFoodData());
    toast.success("Request data was remove with successfully...");
  } catch (error) {
    dispatch(setNotifications("1"));
    toast.error(error.message);
  }
};

export const getProductById = (state, productId) => async (dispatch) => {
  const findProductById = state.find((item) => item.id === productId);
  try {
    dispatch(setProduct(findProductById));
  } catch (error) {
    console.log(error);
  }
};

export const getFilteredData = (searchParam, food) => (dispatch) => {
  if(searchParam.title !== undefined && searchParam.quantity !== undefined && searchParam.price !== undefined){
    const filteredData = food.filter(item => item.title.toLowerCase().includes(searchParam?.title?.toLowerCase()) && item.quantity.toString().includes(searchParam?.quantity) && item.price.toString().includes(searchParam?.price));
    dispatch(setSearchData(filteredData));
  }
  else{
    dispatch(setSearchData(food));
  }
};
