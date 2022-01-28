import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {RouterPathEnum} from './enums/RouterPathEnum';
import {CategoryListScreen, ServiceProviderListScreen, PaymentFormScreen, ResultScreen} from './screens';
import 'bootstrap/dist/css/bootstrap.min.css';


import './App.scss';

function App() {
  return (
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Navigate to={RouterPathEnum.CategoryList}/>}/>
                  <Route path={RouterPathEnum.CategoryList} element={<CategoryListScreen/>}/>
                  <Route path={RouterPathEnum.ServiceProviderList + '/:categoryId'} element={<ServiceProviderListScreen/>}/>
                  <Route path={RouterPathEnum.PaymentForm + '/:categoryId/:providerId'} element={<PaymentFormScreen/>}/>
                  <Route path={RouterPathEnum.Result} element={<ResultScreen/>}/>
              </Routes>
          </BrowserRouter>
  );
}

export default App;
