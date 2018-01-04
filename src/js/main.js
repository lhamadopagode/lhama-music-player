import React from 'react';
import ReactDom from 'react-dom';
import Layout from './Layout';
import css from '../css/app.css';

let render = document.querySelector('.app');

ReactDom.render(
  <Layout />
  ,
  render
);