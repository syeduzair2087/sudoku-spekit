import React from 'react';
import { Layout } from 'antd';
import AppRoutes from './routes';

import './App.scss';

const { Header, Footer, Content } = Layout;

const App = () => (
  <Layout>
    <Header>
      <h1>Sudoku - Coding Challenge</h1>
    </Header>
    <Content>
      <AppRoutes />
    </Content>
    <Footer>
      <img src="https://spekit.com/wp-content/themes/spekit2021/assets/spekit-logo.svg" alt="spekit"></img>
    </Footer>
  </Layout>
);

export default App;
