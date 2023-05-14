import React from 'react'
import AddRestaurant from './AddRestaurant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import Header from '../Header';

function RestaurantComponent() {

    return (
        <>
            <Header></Header>
            <header style={styles.headerContainer}>
                <div style={{ marginLeft: "1000px", paddingTop: "20px" }}>
                    <AddRestaurant></AddRestaurant>
                </div>
            </header>
        </>
    );



}

const styles = {
    ':root': {
        '--primary-color': '#1e90ff',
        '--secondary-color': '#ffffff',
        '--background-image': 'url(\'your-image-url.jpg\')'
    },
    headerContainer: {
        backgroundImage: "url('https://images.pexels.com/photos/1660030/pexels-photo-1660030.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100%",

        alignItems: "center",

    },
    headerBranding: {
        flexGrow: '1'
    },
    headerLogo: {
        fontSize: '28px',
        fontWeight: 'bold',
        color: 'var(--secondary-color)',
        textDecoration: 'none'
    },
    headerMenu: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerMenuUl: {
        listStyle: 'none',
        margin: '0',
        padding: '0',
        display: 'flex'
    },
    headerMenuLi: {
        margin: '0 20px'
    },
    headerMenuA: {
        fontSize: '18px',
        color: 'var(--secondary-color)',
        textDecoration: 'none',
        transition: 'color 0.2s ease'
    },
    headerMenuAHover: {
        color: 'var(--primary-color)'
    },
    headerProfile: {
        fontSize: '24px',
        color: 'var(--secondary-color)',
        marginLeft: '20px'
    },
    headerMenuIcon: {
        display: 'none',
        fontSize: '24px',
        color: 'var(--secondary-color)',
        cursor: 'pointer'
    },
    '@media only screen and (max-width: 768px)': {
        headerMenu: {
            display: 'none'
        },
        headerMenuIcon: {
            display: 'block'
        }
    }
};

export default RestaurantComponent