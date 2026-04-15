import { useEffect, useState } from "react";
import type { Todo } from "./types/types";
import {
  fetchTodosAsync,
  addTodoAsync,
  restoreTodoStatusAsync,
  deleteTodoAsync,
} from "./api/apiCalls";
import "./index.css";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const getInitialDarkMode = (): boolean => {
    const savedMode = localStorage.getItem("isDarkMode");
    return savedMode === "true";
  };

  const [darkMode, setDarkMode] = useState<boolean>(getInitialDarkMode);

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
    if (darkMode) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }

    localStorage.setItem("isDarkMode", darkMode.toString());
  }, [darkMode]);

  useEffect(() => {
    const init = async () => {
      await loadTodos();
    };

    init();
  }, []);

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
      const isSuccess = await addTodoAsync(newTodo);

      if (isSuccess) {
        setTitle("");
        setDescription("");
        await loadTodos();
      } else {
        alert("Görev eklenemedi. API bağlantısını kontrol et.");
      }
    } catch (error) {
      console.error("Görev eklenirken hata oluştu:", error);
      alert("Görev eklenirken hata oluştu.");
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      const isSuccess = await deleteTodoAsync(id);

      if (isSuccess) {
        await loadTodos();
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
        await loadTodos();
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
        await loadTodos();
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
        await loadTodos();
      } else {
        alert("Görev geri yüklenemedi.");
      }
    } catch (error) {
      console.error("Görev geri yüklenirken hata oluştu:", error);
      alert("Görev geri yüklenirken hata oluştu.");
    }
  };

  const filteredTodos = (status: number) => {
    return todos.filter((todo) => todo.status === status);
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

  return (
    <div className="app-container">
      <div className="top-bar">
        <h1 className="app-title">📝 My Todo App</h1>

        <button className="theme-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <div className="container">
        <div className="form-card">
          <h2>Add New Task</h2>

          <div className="input-group">
            <input
              type="text"
              placeholder="Task Title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              placeholder="Task Description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />

            <button className="add-btn" onClick={handleAddTodo}>
              ➕ Add Task
            </button>
          </div>
        </div>

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

        <div className="todo-list">
          {loading ? (
            <div className="empty-state">
              <h3>Loading...</h3>
              <p>Görevler yükleniyor.</p>
            </div>
          ) : filteredTodos(currentTab).length === 0 ? (
            <div className="empty-state">
              <h3>No tasks here yet 👀</h3>
              <p>Bu sekmede henüz görev bulunmuyor.</p>
            </div>
          ) : (
            filteredTodos(currentTab).map((todo) => (
              <div key={todo.id} className="todo-item">
                <div className="todo-content">
                  <h3>{todo.title}</h3>
                  <p>{todo.description}</p>
                </div>

                <div className="todo-actions">{renderButtons(todo)}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;