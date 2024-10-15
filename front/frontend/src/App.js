import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductListPage from "./pages/ProductsListPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import HomePage from "./pages/HomePage";
import CheckoutPage from "./pages/CheckoutPage";
import NavBar from "./components/Navbar";
import PaymentStatus from "./components/PaymentStatus";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import CardUpdatePage from "./pages/CardUpdatePage";
import CardDetailsPage from "./pages/CardDetailsPage";
import AccountPage from "./pages/AccountPage";
import AccountUpdatePage from "./pages/AccountUpdatePage";
import DeleteUserAccountPage from "./pages/DeleteUserAccountPage";
import AllAddressesOfUserPage from "./pages/AllAddressesOfUserPage";
import AddressUpdatePage from "./pages/AddressUpdatePage";
import OrdersListPage from "./pages/OrdersListPage";
import ProductCreatePage from "./pages/ProductCreatePage";
import ProductUpdatePage from "./pages/ProductUpdatePage";
import NotFound from "./pages/NotFoundPage";

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<HomePage />} exact />
            <Route path="/shop" element={<ProductListPage />} exact />
            <Route path="/new-product/" element={<ProductCreatePage />} exact />
            <Route
              path="/product/:id/"
              element={<ProductDetailsPage />}
              exact
            />
            <Route
              path="/product-update/:id/"
              element={<ProductUpdatePage />}
              exact
            />
            <Route
              path="/product/:id/checkout/"
              element={<CheckoutPage />}
              exact
            />
            <Route path="/payment-status" element={<PaymentStatus />} exact />
            <Route path="/login" element={<Login />} exact />
            <Route path="/register" element={<Register />} exact />
            <Route path="/account" element={<AccountPage />} exact />
            <Route
              path="/account/update/"
              element={<AccountUpdatePage />}
              exact
            />
            <Route
              path="/account/delete/"
              element={<DeleteUserAccountPage />}
              exact
            />
            <Route path="/card-details" element={<CardDetailsPage />} exact />
            <Route path="/card-update" element={<CardUpdatePage />} exact />
            <Route
              path="/all-addresses/"
              element={<AllAddressesOfUserPage />}
              exact
            />
            <Route
              path="/all-addresses/:id/"
              element={<AddressUpdatePage />}
              exact
            />
            <Route path="/all-orders/" element={<OrdersListPage />} exact />
            <Route path="" element={<NotFound />} exact />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
