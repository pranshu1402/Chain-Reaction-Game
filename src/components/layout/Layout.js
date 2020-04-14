import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import './Layout.css';

const Layout = props => {
    return (
        <>
          <Header/>
          <main>
              {props.children}
          </main>
          <Footer/>  
        </>
    );
};

export default Layout;