import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/home';
import MessagePage from './pages/message';
import RegisterPage from './pages/register';
import LoginPage from './pages/login';
import Cart from './pages/cart';
import AdminHomePage from './pages/admin/home';
import AddFoodPage from './pages/admin/add food';
import AddOutletPage from './pages/admin/add outlet';
import AddServicePage from './pages/admin/add service';
import AddStaffPage from './pages/admin/add staff';
import StaffHomePage from './pages/staff/home';
import AdminLoginPage from './pages/admin/login';
import firebase from 'firebase/compat/app'
import 'firebase/storage';
import EditFoodPage from './pages/admin/edit food';
import EditOutletPage from './pages/admin/edit outlet';
import EditServicePage from './pages/admin/edit service';
import EditStaffPage from './pages/admin/edit staff';
import AdminMessagePage from './pages/admin/message';
import StaffLoginPage from './pages/staff/login';
import AddReservationPage from './pages/reservation page';
function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyD-9fTVA345Q3J9Mrym_me-Omi1mYBS1uw",
    authDomain: "offer-me-f2528.firebaseapp.com",
    projectId: "offer-me-f2528",
    storageBucket: "offer-me-f2528.appspot.com",
    messagingSenderId: "1065024084271",
    appId: "1:1065024084271:web:46c417382749633986e9da",
    measurementId: "G-XDMCBMMFXW"
  };
  

  firebase.initializeApp(firebaseConfig)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/queries" element={<MessagePage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/admin-login" element={<AdminLoginPage/>}/>
        <Route path="/cart" element={<Cart/>} />
        <Route path="admin/*" element={<AdminHomePage/>} />
        <Route path="/addFood" element={<AddFoodPage/>}/>
        <Route path="/editFood" element={<EditFoodPage/>}/>
        <Route path="/addOutlet" element={<AddOutletPage/>}/>
        <Route path="/editOutlet" element={<EditOutletPage/>}/>
        <Route path="/addService" element={<AddServicePage/>}/>
        <Route path="/editService" element={<EditServicePage/>}/>
        <Route path="/addReservation" element={<AddReservationPage/>}/>
        <Route path="/addStaff" element={<AddStaffPage/>}/>
        <Route path='/editStaff' element={<EditStaffPage/>}/>
        <Route path="/staff/*" element={<StaffHomePage/>}/>
        <Route path="/admin-message" element={<AdminMessagePage/>}/>
        <Route path="/staff-login" element={<StaffLoginPage/>}/>
        <Route path="*" element={<HomePage/>} />        
      </Routes>     
    </BrowserRouter>
  );
}

export default App;
