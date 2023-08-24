import React from 'react';
import { Outlet } from 'react-router-dom';
import AppBarMenu from './menuu/appbar/Menu';
import ButtonUp from './ButtonUp';
import Footer from './Footer';



export default function Layout() {
  return (
    <>
      <AppBarMenu />
      <Outlet /> 
      <ButtonUp />
      <Footer />
    </>
  );
}