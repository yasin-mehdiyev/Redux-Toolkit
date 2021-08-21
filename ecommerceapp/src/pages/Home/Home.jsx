import React from 'react';
import classes from './Home.module.css';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className={classes.wrapper}>
            <div>
                <h2>Welcome to my application</h2>
                <div className={classes.buttons}>
                    <Link to='/ui'>
                        <button>Go to UI</button>
                    </Link>
                    <Link to='/admin'>
                        <button>Go to Admin Panel</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home
