import React, { useEffect, useState } from "react";
import classes from "./Admin.module.css";
import { Link, useHistory } from "react-router-dom";
import Card from "../../Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { getFilteredData, removeProduct } from "../../../../store/features/admin/adminAction";
import { fetchFoodData } from "../../../../store/features/ui/uiAction";
import { setCartData } from "../../../../store/features/cart/cartAction";
import { setShowSearch } from "../../../../store/features/admin/adminSlice";
import { logoutProcess } from "../../../../store/features/auth/authAction";

const Admin = () => {
  const foods = useSelector((state) => state.ui.foods);
  const carts = useSelector((state) => state.cart);
  const filteredData = useSelector(state => state.admin.searchFindData);
  const isShowSearch = useSelector((state) => state.admin.isShownSearch);

  const history = useHistory();
  const dispatch = useDispatch();

  const [searchData, setsearchData] = useState({});


  useEffect(() => {
    dispatch(fetchFoodData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFilteredData(searchData,foods));
  }, [foods,dispatch])

  const handlerLogout = () => {
    dispatch(logoutProcess());
    history.replace("/");
    if(isShowSearch === true) {
      dispatch(setShowSearch(false));
    }
  };

  const adminAddPage = () => {
    history.replace("/admin/add");
    if(isShowSearch === true) {
      dispatch(setShowSearch(false));
    }
  };

  const removeHandlerProduct = (id) => {
    dispatch(removeProduct(id));

    let data = carts.items?.filter((item) => item.id !== id);

    const updatedCart = {
      items: data,
      totalQuantity: carts.items?.length > 0 ? carts.items.length - 1 : 0,
    };

    dispatch(setCartData(updatedCart, "Delete"));

    if(isShowSearch === true) {
      dispatch(setShowSearch(false));
    }
  };

  const showSearchHandler = () => {
    if(isShowSearch === false) {
      dispatch(setShowSearch(true));
    }
    else{
      dispatch(setShowSearch(false));
    }
  };

  const handleSearchInputs = (name,value) => {
    setsearchData({...searchData,[name]:value});
  };

  const handleSearch = (ev) => {
    ev.preventDefault();
    const isEmptyFields = searchData.title !== '' && searchData.quantity !== '' && searchData.price !== '' && searchData.hasOwnProperty('title') && searchData.hasOwnProperty('quantity') && searchData.hasOwnProperty('price');

    if(isEmptyFields) {
      dispatch(getFilteredData(searchData,foods));
    }

    // setsearchData({});

  }

  let isExistFoods = foods != null && foods.length > 0 ? true : false;

  return (
    <div className={classes.layout}>
      <div className={classes.btns}>
        <button onClick={adminAddPage}>Create New Product</button>
        <button onClick={handlerLogout}>Logout</button>
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: "18px",
          marginBottom: "18px",
        }}
      >
        <button onClick={showSearchHandler}>Searching...</button>
      </div>

      {isShowSearch && (
        <Card>
          <form className={classes.searchForm} onSubmit={handleSearch}>
            <div className={classes.formControl}>
              <div className={classes.formInput}>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" value={searchData?.title} onChange={(e) => handleSearchInputs(e.target.name,e.target.value)} />
              </div>
              <div className={classes.formInput}>
                <label htmlFor="quantity">Quantity</label>
                <input type="number" min="1" id="quantity" name="quantity" value={searchData?.quantity} onChange={(e) => handleSearchInputs(e.target.name,e.target.value)} />
              </div>
              <div className={classes.formInput}>
                <label htmlFor="price">Price</label>
                <input type="number" min="1" id="price" name="price" value={searchData?.price} onChange={(e) => handleSearchInputs(e.target.name,e.target.value)} />
              </div>
            </div>
            <button>Search</button>
          </form>
        </Card>
      )}

      <Card>
        {isExistFoods ? (
          <>
            <h2 style={{ textAlign: "center" }}>Product List</h2>
            <table className={classes.customers}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>TotalAmount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.title}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price} $</td>
                      <td>{item.totalAmount} $</td>
                      <td>
                        <span>
                          <Link to={`/admin/edit/${item.id}`}>
                            <AiFillEdit />
                          </Link>
                        </span>
                        <span onClick={() => removeHandlerProduct(item.id)}>
                          <AiFillDelete />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        ) : (
          <h2 style={{ textAlign: "center" }}>It doesnt exist any food</h2>
        )}
      </Card>
    </div>
  );
};

export default Admin;
