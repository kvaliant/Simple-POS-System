import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/homePage";

import ProductsPage from "./pages/productsPage";
import AddProductPage from "./pages/addProductPage";
import EditProductPage from "./pages/editProductPage";

import StocksPage from "./pages/stocksPage";
import AddStockPage from "./pages/addStockPage";
import EditStockPage from "./pages/editStockPage";

import TransactionsPage from "./pages/transactionsPage";
import AddTransactionPage from "./pages/addTransactionPage";

import AdminPanelPage from "./pages/adminPanelPage";
import AddUserPage from "./pages/addUserPage";
import EditUserPage from "./pages/editUserPage";

import LoginPage from "./pages/loginPage";

import ProfilePage from "./pages/profilePage";
import MyTransactionsPage from "./pages/myTransactionsPage";
import TestPage from "./pages/test";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div id="app">
      <div className="container">
        <Routes>
          <Route exact path="/" element={<HomePage />} />

          <Route exact path="/products" element={<ProductsPage />} />
          <Route exact path="/products/:page" element={<ProductsPage />} />
          <Route exact path="/products/add" element={<AddProductPage />} />
          <Route exact path="/product/:sku" element={<EditProductPage />} />

          <Route path="/stocks" element={<StocksPage />} />
          <Route exact path="/stocks/add" element={<AddStockPage />} />
          <Route exact path="/stock/:id" element={<EditStockPage />} />

          <Route path="/transactions" element={<TransactionsPage />} />
          <Route exact path="/transactions/add" element={<AddTransactionPage />} />

          <Route exact path="/admin" element={<AdminPanelPage />} />
          <Route exact path="/admin/add" element={<AddUserPage />} />
          <Route exact path="/user/:id" element={<EditUserPage />} />

          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/profile" element={<ProfilePage />} />
          <Route exact path="/transactions/my" element={<MyTransactionsPage />} />

          <Route exact path="/test" element={<TestPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
