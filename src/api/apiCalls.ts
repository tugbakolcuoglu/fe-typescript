import type { Todo } from "../types/types";

const BASE_URL = "http://localhost:5165/Todos";

// Tum gorevleri getir
export const fetchTodosAsync = async (): Promise<Todo[]> => {
  try {
    const response = await fetch(BASE_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Görevler alınamadı: ${errorText}`);
    }

    const data: Todo[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    return [];
  }
};

// Yeni gorev ekle
export const addTodoAsync = async (
  todo: Omit<Todo, "id">
): Promise<boolean> => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Add todo failed:", errorText);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error adding todo:", error);
    return false;
  }
};

// Status guncelle
export const restoreTodoStatusAsync = async (
  id: string,
  status: number
): Promise<boolean> => {
  try {
    const response = await fetch(`${BASE_URL}/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Update status failed:", errorText);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error updating todo status:", error);
    return false;
  }
};

// Kalici sil
export const deleteTodoAsync = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Delete todo failed:", errorText);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error deleting todo:", error);
    return false;
  }
};