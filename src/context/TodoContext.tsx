/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { fetchTodosAsync } from "../api/apiCalls";
import type { Todo } from "../types/types";


type Props = {
   children: React.ReactNode;
}

type TodoContextType = {
   todos: Todo[];
   loading: boolean;
   refetchTodos: () => Promise<void>;
}


const TodoContext = createContext<TodoContextType>({
   todos: [],
   loading: false,
   refetchTodos: async () => { },
});


export const TodoContextProvider = ({ children }: Props) => {


   const [todos, setTodos] = useState<Todo[]>([]);
   const [loading, setLoading] = useState<boolean>(false);

   const loadTodos = async () => {
      try {
         setLoading(true);
         const data = await fetchTodosAsync();
         setTodos(data);
      } catch (error) {
         console.error("Todo listesi yuklenemedi:", error);
         alert("Görevler yüklenirken hata oluştu.");
      } finally {
         setLoading(false);
      }
   };


   useEffect(() => {
      const init = async () => {
         await loadTodos();
      };

      init();
   }, []);

   return (
      <TodoContext.Provider value={{ todos, loading, refetchTodos: loadTodos }}>
         {children}
      </TodoContext.Provider>
   );
}


export const useTodo = () => {
   const context = useContext(TodoContext);

   if (!context) {
      throw new Error("useTodo must be used within a TodoContextProvider");
   }
   return context;
}