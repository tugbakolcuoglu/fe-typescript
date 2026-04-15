import { useState } from "react";
import TodoList from "../components/TodoList";
import { useTodo } from "../context/TodoContext";
import "../index.css";



const Home = () => {



   const [currentTab, setCurrentTab] = useState<number>(0);

   const { todos, loading } = useTodo();

   const filteredTodos = (status: number) => {
      return todos.filter((todo) => todo.status === status);
   };


   return (
      <div className="app-container">


         <div className="container">


            <div className="tabs">
               <button
                  onClick={() => setCurrentTab(0)}
                  className={currentTab === 0 ? "tab-btn active" : "tab-btn"}
               >
                  Active ({filteredTodos(0).length})
               </button>

               <button
                  onClick={() => setCurrentTab(1)}
                  className={currentTab === 1 ? "tab-btn active" : "tab-btn"}
               >
                  Completed ({filteredTodos(1).length})
               </button>

               <button
                  onClick={() => setCurrentTab(2)}
                  className={currentTab === 2 ? "tab-btn active" : "tab-btn"}
               >
                  Trash ({filteredTodos(2).length})
               </button>
            </div>

            <TodoList todos={filteredTodos(currentTab)} loading={loading} />

         </div>
      </div>
   )
}

export default Home