import { Login } from './components/login';
import { ManageProduct} from './components/ManageProduct';
import { Detailsproduct } from './components/Detailsproduct';
import { Order } from './components/Order';
import {BagProduct}  from'./components/BagProduct';
import {BagProductHistory}  from'./components/BagProductHistory';
import {Register} from './components/Register'
import {Managepointuser} from './components/Managepointuser'
import {Profile} from './components/Profile'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';

function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/ManageProduct" element={<ManageProduct/>}/>
          <Route path="/Detailsproduct/:id" element={<Detailsproduct/>}/>
          <Route path="/Profile" element={<Profile/>}/><Route path="/Managepointuser" element={<Managepointuser/>}/>
          <Route path="/Order" element={<Order/>}/>
          <Route path="/BagProduct" element={<BagProduct/>}/>
          <Route path="/BagProductHistory/:id" element={<BagProductHistory/>}/>
          
        </Routes>
      </Router>
    </div>
  );
}
export default App;
