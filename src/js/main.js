import React from 'react';
import ReactDom from 'react-dom';
import Layout from './Layout';
import Sass from '../scss/main.scss';

const appContainer = document.querySelector('.app');

ReactDom.render(
  <Layout />
  ,
  appContainer
);