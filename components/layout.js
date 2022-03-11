import React from "react";
import 'semantic-ui-css/semantic.min.css'
import Head from 'next/head';
import Header from "./header"
import { Container } from "semantic-ui-react";
const Layout = (props) => {
  return (
   <Container>
      <Header />
      {props.children}

    </Container>
  );
};
export default Layout;

