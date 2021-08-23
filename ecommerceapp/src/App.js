import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";

// Includes Pages
import Admin from "./pages/Admin/Home/AdminHome";
import Home from "./pages/Home/Home";
import UI from "./pages/UI/UI";
import Bucket from "./pages/UI/Bucket";

// Includes Spinner Package
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

// Includes Toastify Package
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Includes App.css
import "./App.css";

// Includes UI Action - Redux Toolkit
import { fetchFoodData } from "./store/features/ui/uiAction";

// Includes Cart Action - Redux Toolkit
import {
  fetchCartData,
  sendRequestData,
} from "./store/features/cart/cartAction";
import AdminAdd from "./pages/Admin/Create/AdminAdd";
import AdminEdit from "./pages/Admin/Edit/AdminEdit";
import Login from "./pages/Auth/Login/LoginPage";
import ForgetPage from "./pages/Auth/ForgottenPassword/ForgetPage";

const App = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const loading = useSelector((state) => state.ui.loading);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // Fetching Cart and Food Data
  useEffect(() => {
    dispatch(fetchCartData());
    dispatch(fetchFoodData());
  }, [dispatch]);

  // PUT Request Cart Data
  useEffect(() => {
    if (cart.isChangedCart) {
      dispatch(
        sendRequestData({
          items: cart.items,
          totalQuantity: cart.totalQuantity,
        })
      );
    }
  }, [cart, dispatch]);

  return (
    <React.Fragment>
      {loading ? (
        <div className="loading">
          <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
        </div>
      ) : (
        <>
          <ToastContainer autoClose={2000} position="bottom-right" />

          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>

            <Route path="/cabinet">
              <Redirect to="/" />
            </Route>

            <Route path="/ui" exact>
              <UI />
            </Route>

            <Route path="/ui/cart">
              <Bucket />
            </Route>

            {isLoggedIn && (
              <Switch>
                <Route path="/admin" exact>
                  <Admin />
                </Route>

                <Route path="/admin/add">
                  <AdminAdd />
                </Route>

                <Route path="/admin/edit/:id">
                  <AdminEdit />
                </Route>

                <Route path="*">
                  <Redirect to="/admin" />
                </Route>
              </Switch>
            )}

            {!isLoggedIn && (
              <Switch>
                <Route path="/auth" exact>
                  <Login />
                </Route>

                <Route path="/auth/forget" exact>
                  <ForgetPage />
                </Route>

                <Route path="/auth/forget/*">
                  <Redirect to="/" />
                </Route>

                <Route path="/*">
                  <Redirect to="/" />
                </Route>
              </Switch>
            )}
          </Switch>
        </>
      )}
    </React.Fragment>
  );
};

export default App;
