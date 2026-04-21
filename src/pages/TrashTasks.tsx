import TodoList from "../components/TodoList";
import { useTodo } from "../context/TodoContext";

const TrashTasks = () => {
    const { todos, loading } = useTodo();

    const trashTodos = todos.filter((todo) => todo.status === 2);

    return (
        <div className="app-container">
            <div className="container">
                <section className="page-header">
                    <h1>Trash Tasks</h1>
                    <p>Çöpe taşınan görevlerini burada görebilirsin.</p>
                </section>

                <TodoList todos={trashTodos} loading={loading} />
            </div>
        </div>
    );
};

export default TrashTasks;