import { toast } from "react-toastify";
import { setLogin, setLogout } from "./authSlice";
import authApiKey from "../../../helpers/authApiKey";

export const authProcess = (data, method) => async (dispatch) => {
    let url = '';

    if (method === 'login') {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${authApiKey}`;
    }
    else if(method === 'sign up') {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${authApiKey}`;
    }
    else if(method === 'sent reset link to email') {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${authApiKey}`;
    }

    const handlerAuth = async () => {

        let fetchData = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if(!fetchData.ok) {
            const err = await fetchData.json();
            // console.log(err)
            toast.error(err.error.message);
        }

        let response = fetchData.json();

        return response;
    }

    try {
        const data = await handlerAuth();
        // console.log(data);
        if(method === 'login') {
            dispatch(setLogin(data.idToken));
            sessionStorage.setItem('token',data.idToken);
        }
        toast.success(`Successfully ${method} process`);
    } catch (error) {
        console.log(error)
    }

};

export const logoutProcess = () => async (dispatch) => {
    dispatch(setLogout());
    sessionStorage.removeItem('token');
}