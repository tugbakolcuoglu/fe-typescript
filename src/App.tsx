import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./index.css";
import CreateNew from "./pages/CreateNew";
import Home from "./pages/Home";
import Tugba from "./pages/Tugba";

function App() {

   return (
      <>
         <Navbar />


         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-new" element={<CreateNew />} />
            <Route path="/about" element={<Tugba />} />
         </Routes>

      </>
   );
}

export default App;