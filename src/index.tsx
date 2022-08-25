import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import App from './App';

const Global = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font: 16px/19px "Helvetica Neue", sans-serif;
  color: #1F1F1F;
}
`;

const element = document.getElementById('root');
if (element) {
  const root = ReactDOM.createRoot(element);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <>
          <Global />
          <App />
        </>
      </BrowserRouter>
    </React.StrictMode>,
  );
}
