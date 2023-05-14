import './App.css';
import LoginPage from './components/startingPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomerComponent from './components/customer/CustomerComponent';
import RestaurantComponent from './components/restautant/RestaurantComponent';
import DeliveryBoyComponent from './components/deliveryBoy/DeliveryBoyComponent';
import AddMenu from './components/restautant/AddMenu';
import YourRestaurant from './components/restautant/YourRestaurant';
import Header from './components/Header';
import ViewMenu from './components/restautant/ViewMenu';
import CustomerHeader from './components/customer/CustomerHeader';
import CategoryFilter from './components/customer/CategoryFilter';
import ViewMenuCustomer from './components/customer/ViewMenuCustomer';
import CustomerCart from './components/customer/CustomerCart';
import HeroSection from './components/customer/HeroSection';
import Checkout from './components/customer/Checkout';
import CustomerOrder from './components/customer/CustomerOrder';
import Footer from './components/Footer';
import ViewOrder from './components/restautant/ViewOrders';

function App() {
  return (
    <BrowserRouter>
      <div className='bg-primary'>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route exact path="/customerOrder" element={<CustomerOrder />} />
          <Route exact path="/footer" element={<Footer />} />

          <Route exact path="/customerHeader" element={<CustomerHeader />} />
          <Route exact path="/filter" element={<CategoryFilter />} />
          <Route path="/customer" element={<CustomerComponent />} />
          <Route path="/restaurant" element={<RestaurantComponent />} />
          <Route path="/addMenu" element={<AddMenu />} />
          <Route path="/viewMenu/:id" element={<ViewMenu />} />
          <Route path="/header" element={<Header />} />
          <Route path="/viewMenuCustomer/:id" element={<ViewMenuCustomer />} />
          <Route path="/customerCart" element={<CustomerCart />} />
          <Route path="/heroSection" element={<HeroSection />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/restaurantOrders" element={<ViewOrder />} />
          <Route path="/deliveryBoy" element={<DeliveryBoyComponent />} />


          <Route path="/yourRestaurant" element={(
            <div>

              <YourRestaurant />
            </div>
          )} />
          <Route path="/deliveryBoy" element={<DeliveryBoyComponent />} />
        </Routes>
      </div>
    </BrowserRouter >
  );
}

export default App
