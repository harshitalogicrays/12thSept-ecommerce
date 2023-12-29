import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import Header from "./compoents/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Pagenotfound from "./pages/Pagenotfound";
import Products from "./compoents/Products";
import AdminDashboard from "./compoents/Admin/AdminDashboard";
import AddProduct from "./compoents/Admin/AddProduct";
import ViewProducts from "./compoents/Admin/ViewProducts";
import AddCategory from "./compoents/Admin/AddCategory";
import ViewCategories from "./compoents/Admin/ViewCategories";
import AddSliderImage from "./compoents/Admin/AddSliderImage";
import ViewSliderImages from "./compoents/Admin/ViewSliderImages";
import Cart from "./compoents/Cart";
import { Protected, ProtectedAdmin } from "./compoents/HiddenLinks";
import ProductDetails from "./compoents/ProductDetails";
import CheckoutDetails from "./compoents/CheckoutDetails";
import Checkout from "./compoents/Checkout";
import CheckoutSuccess from "./compoents/CheckoutSuccess";
import MyOrders from "./compoents/MyOrders";
import Orders from "./compoents/Admin/Orders";
import OrderDetails from "./compoents/OrderDetails";

function App() {
  return (
  <>
    <ToastContainer autoClose={2000} theme="colored"/>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      {/* <Route path='/products' element={<Protected><Products/></Protected>}/> */}
      <Route path='/products' element={<Products/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/admin' element={<ProtectedAdmin><AdminDashboard/></ProtectedAdmin>}>
          <Route path='addproduct' element={<AddProduct/>}/>
          <Route path='viewproducts' element={<ViewProducts/>}/>
          <Route path='addcategory' element={<AddCategory/>}/>
          <Route path='viewcategories' element={<ViewCategories/>}/>
          <Route path='edit/:id' element={<AddProduct/>}/>
          <Route path='addslider' element={<AddSliderImage/>}/>
          <Route path='viewsliders' element={<ViewSliderImages/>}/>
          <Route path='vieworders' element={<Orders/>}/>
          <Route path='order-details/:id' element={<OrderDetails/>}/>
      </Route>
      <Route path='/details/:id' element={<ProductDetails/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/checkout-details' element={<Protected> <CheckoutDetails/> </Protected>}/>
      <Route path='/checkout' element={<Protected> <Checkout/> </Protected>}/>
      <Route path='/checkoutsuccess' element={ <CheckoutSuccess/>}/>
      <Route path='/myorders' element={<Protected> <MyOrders/> </Protected>}/>
      <Route path="*" element={<Pagenotfound/>}/>
    </Routes>
  </>
  );
}

export default App;
