import { useState } from "react";
import { addTodoAsync } from "../api/apiCalls";
import { useTodo } from "../context/TodoContext";
import type { Todo } from "../types/types";


const CreateNew = () => {
   const { todos, refetchTodos, loading: todosLoading } = useTodo();


   const [title, setTitle] = useState<string>("");
   const [description, setDescription] = useState<string>("");

   const [addTodoLoading, setAddTodoLoading] = useState<boolean>(todosLoading);


   const loading = addTodoLoading || todosLoading;



   const handleAddTodo = async () => {
      if (title.trim() === "" || description.trim() === "") {
         alert("Lütfen başlık ve açıklama girin.");
         return;
      }

      const newTodo: Omit<Todo, "id"> = {
         title: title.trim(),
         description: description.trim(),
         status: 0,
      };

      try {
         setAddTodoLoading(true);
         const isSuccess = await addTodoAsync(newTodo);

         if (isSuccess) {
            setTitle("");
            setDescription("");
            await refetchTodos();
         } else {
            alert("Görev eklenemedi. API bağlantısını kontrol et.");
         }
      } catch (error) {
         console.error("Görev eklenirken hata oluştu:", error);
         alert("Görev eklenirken hata oluştu.");
      } finally {
         setAddTodoLoading(false);
      }
   };
   return (
      <div className="form-card">
         <h2>Add New Task</h2>

         <div className="input-group">
            <input
               type="text"
               disabled={loading}
               placeholder="Task Title..."
               value={title}
               onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
               placeholder="Task Description..."
               value={description}
               onChange={(e) => setDescription(e.target.value)}
               rows={4}
               disabled={loading}
            />

            <button className="add-btn" onClick={handleAddTodo} disabled={loading}>
               ➕ Add Task
            </button>
         </div>

         <h3>Toplam Todo Sayisi= {todos.length}</h3>
      </div>
   )
}

export default CreateNew