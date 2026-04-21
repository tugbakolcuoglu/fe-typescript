import TodoList from "../components/TodoList";
import { useTodo } from "../context/TodoContext";

const ActiveTasks = () => {
    const { todos, loading } = useTodo();

    const activeTodos = todos.filter((todo) => todo.status === 0);

    return (
        <div className="app-container">
            <div className="container">
                <section className="page-header">
                    <h1>Active Tasks</h1>
                    <p>Devam eden görevlerini burada görebilirsin.</p>
                </section>

                <TodoList todos={activeTodos} loading={loading} />
            </div>
        </div>
    );
};

export default ActiveTasks;