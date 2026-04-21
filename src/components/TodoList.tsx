import { deleteTodoAsync, restoreTodoStatusAsync } from "../api/apiCalls";
import { useTodo } from "../context/TodoContext";
import type { Todo } from "../types/types";

type Props = {
   todos: Todo[];
   loading: boolean;
};

const TodoList = ({ todos, loading }: Props) => {
   const { refetchTodos } = useTodo();

   const handleDeleteTodo = async (id: string) => {
      try {
         const isSuccess = await deleteTodoAsync(id);

         if (isSuccess) {
            await refetchTodos();
         } else {
            alert("Görev silinemedi.");
         }
      } catch (error) {
         console.error("Görev silinirken hata oluştu:", error);
         alert("Görev silinirken hata oluştu.");
      }
   };

   const handleComplete = async (id: string) => {
      try {
         const isSuccess = await restoreTodoStatusAsync(id, 1);

         if (isSuccess) {
            await refetchTodos();
         } else {
            alert("Görev tamamlandı durumuna alınamadı.");
         }
      } catch (error) {
         console.error("Durum güncellenirken hata oluştu:", error);
         alert("Durum güncellenirken hata oluştu.");
      }
   };

   const handleMoveToTrash = async (id: string) => {
      try {
         const isSuccess = await restoreTodoStatusAsync(id, 2);

         if (isSuccess) {
            await refetchTodos();
         } else {
            alert("Görev çöpe taşınamadı.");
         }
      } catch (error) {
         console.error("Görev çöpe taşınırken hata oluştu:", error);
         alert("Görev çöpe taşınırken hata oluştu.");
      }
   };

   const handleRestore = async (id: string) => {
      try {
         const isSuccess = await restoreTodoStatusAsync(id, 0);

         if (isSuccess) {
            await refetchTodos();
         } else {
            alert("Görev geri yüklenemedi.");
         }
      } catch (error) {
         console.error("Görev geri yüklenirken hata oluştu:", error);
         alert("Görev geri yüklenirken hata oluştu.");
      }
   };

   const renderButtons = (todo: Todo) => {
      switch (todo.status) {
         case 0:
            return (
               <>
                  <button
                     className="action-btn complete-btn"
                     onClick={() => handleComplete(todo.id)}
                  >
                     ✅ Complete
                  </button>
                  <button
                     className="action-btn trash-btn"
                     onClick={() => handleMoveToTrash(todo.id)}
                  >
                     🗑️ Trash
                  </button>
               </>
            );

         case 1:
            return (
               <>
                  <button
                     className="action-btn restore-btn"
                     onClick={() => handleRestore(todo.id)}
                  >
                     ♻️ Restore
                  </button>
                  <button
                     className="action-btn trash-btn"
                     onClick={() => handleMoveToTrash(todo.id)}
                  >
                     🗑️ Trash
                  </button>
               </>
            );

         case 2:
            return (
               <>
                  <button
                     className="action-btn restore-btn"
                     onClick={() => handleRestore(todo.id)}
                  >
                     ♻️ Restore
                  </button>
                  <button
                     className="action-btn delete-btn"
                     onClick={() => handleDeleteTodo(todo.id)}
                  >
                     ❌ Delete
                  </button>
               </>
            );

         default:
            return null;
      }
   };

   if (loading) {
      return (
         <div className="empty-state">
            <h3>Loading...</h3>
            <p>Görevler yükleniyor.</p>
         </div>
      );
   }

   if (todos.length === 0) {
      return (
         <div className="empty-state">
            <h3>No tasks here yet 👀</h3>
            <p>Bu sayfada henüz görev bulunmuyor.</p>
         </div>
      );
   }

   return (
      <div className="todo-list">
         {todos.map((todo) => (
            <div key={todo.id} className="todo-item">
               <div className="todo-content">
                  <h3>{todo.title}</h3>
                  <p>{todo.description}</p>
               </div>

               <div className="todo-actions">{renderButtons(todo)}</div>
            </div>
         ))}
      </div>
   );
};

export default TodoList;