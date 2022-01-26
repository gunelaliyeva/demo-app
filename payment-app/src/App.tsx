import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {RouterPathEnum} from './enums/RouterPathEnum';
import {CategoryListScreen, ServiceProviderListScreen, PaymentFormScreen, ResultScreen} from './screens';

import './App.css';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={RouterPathEnum.CategoryList}/>}/>
          <Route path={RouterPathEnum.CategoryList} element={<CategoryListScreen/>}/>
          <Route path={RouterPathEnum.ServiceProviderList} element={<ServiceProviderListScreen/>}/>
          <Route path={RouterPathEnum.PaymentForm} element={<PaymentFormScreen/>}/>
          <Route path={RouterPathEnum.Result} element={<ResultScreen/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
