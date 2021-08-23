import React from 'react';
import classes from './Home.module.css';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    const dispatch = useDispatch();
    const history = useHistory();

    return (
        <div className={classes.wrapper}>
            <div>
                <h2>Welcome to your application</h2>
                <div className={classes.buttons}>
                    <Link to='/ui'>
                        <button>Go to UI</button>
                    </Link>
                    <Link to={isLoggedIn ? '/admin' : '/auth'}>
                        <button>Go to Admin Panel</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home
