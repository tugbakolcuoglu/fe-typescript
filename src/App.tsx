import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ActiveTasks from "./pages/ActiveTasks";
import CompletedTasks from "./pages/CompletedTasks";
import TrashTasks from "./pages/TrashTasks";
import CreateNew from "./pages/CreateNew";
import About from "./pages/About";

function App() {
   return (
      <>
         <Navbar />

         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/active" element={<ActiveTasks />} />
            <Route path="/completed" element={<CompletedTasks />} />
            <Route path="/trash" element={<TrashTasks />} />
            <Route path="/create-new" element={<CreateNew />} />
            <Route path="/about" element={<About />} />
         </Routes>
      </>
   );
}

export default App;