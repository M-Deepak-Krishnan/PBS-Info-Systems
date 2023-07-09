import { Route,Routes } from 'react-router-dom';
import Login from "./Login/Login";
import NavPage from "./Navigation/NavPage";
function App() {
  return (
    // <div className="App">
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/nav' element={<NavPage />}></Route>
      </Routes>
    // </div>
  );
}

export default App;
