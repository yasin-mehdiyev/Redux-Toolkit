import React, { useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";

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

// Includes Lazy Loadings (Code Splitting)
const Home = React.lazy(() => import("./pages/Home/Home"));
const UI = React.lazy(() => import("./pages/UI/UI"));
const Bucket = React.lazy(() => import("./pages/UI/Bucket"));
const Admin = React.lazy(() => import("./pages/Admin/Home/AdminHome"));
const AdminAdd = React.lazy(() => import("./pages/Admin/Create/AdminAdd"));
const AdminEdit = React.lazy(() => import("./pages/Admin/Edit/AdminEdit"));
const LoginPage = React.lazy(() => import("./pages/Auth/Login/LoginPage"));
const SignupPage = React.lazy(() => import("./pages/Auth/Signup/SignupPage"));
const ForgetPage = React.lazy(() => import("./pages/Auth/ForgottenPassword/ForgetPage"));

const App = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const loading = useSelector((state) => state.ui.loading);
  const hasToggleCart = useSelector((state) => state.ui.isToggleCart);
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
      <Suspense
        fallback={
          loading ? (
            <div className="loading">
              <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
            </div>
          ) : null
        }
      >
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

              <Route path="/ui/cart" exact>
                { hasToggleCart && <Bucket /> }
                { !hasToggleCart && <Redirect to='/ui' /> }
                
              </Route>

              <Route path="/ui/cart/*">
                <Redirect to='/ui' />
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
                    <LoginPage />
                  </Route>

                  <Route path="/auth/signup" exact>
                    <SignupPage />
                  </Route>

                  <Route path="/auth/signup/*">
                    <Redirect to="/auth" />
                  </Route>

                  <Route path="/auth/forget" exact>
                    <ForgetPage />
                  </Route>

                  <Route path="/auth/forget/*">
                    <Redirect to="/auth" />
                  </Route>

                  <Route path="/*">
                    <Redirect to="/" />
                  </Route>
                </Switch>
              )}

            </Switch>
          </>
        )}
      </Suspense>
    </React.Fragment>
  );
};

export default App;
