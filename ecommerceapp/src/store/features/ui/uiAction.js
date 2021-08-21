import { setFoods, setLoading, setNotifications } from './uiSlice';
import baseUrl from '../../../helpers/baseUrl';
import { toast } from 'react-toastify';

export const fetchFoodData = () => async (dispatch) => {

    const fetchFood = async () => {
        const response = await fetch(`${baseUrl}/food.json`);

        if (!response.ok) {
            throw new Error("Could not fetch food data!");
        }

        const data = await response.json();

        return data;
    };

    try {
        const data = await fetchFood();
        let loadingData = [];

        for (const key in data) {
            loadingData.push({
                id: data[key].id,
                title: data[key].title,
                quantity: data[key].quantity,
                totalAmount: data[key].totalAmount,
                price: data[key].price,
                desc: data[key].desc
            });
        }

        dispatch(setFoods(loadingData));

    } catch (error) {
        dispatch(setNotifications('1'));
        toast(error.message);
    }
    finally {
        setTimeout(() => {
            dispatch(setLoading(false));
        }, 2500);
    }
};
