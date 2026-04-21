import TodoList from "../components/TodoList";
import { useTodo } from "../context/TodoContext";

const CompletedTasks = () => {
    const { todos, loading } = useTodo();

    const completedTodos = todos.filter((todo) => todo.status === 1);

    return (
        <div className="app-container">
            <div className="container">
                <section className="page-header">
                    <h1>Completed Tasks</h1>
                    <p>Tamamlanan görevlerini burada görebilirsin.</p>
                </section>

                <TodoList todos={completedTodos} loading={loading} />
            </div>
        </div>
    );
};

export default CompletedTasks;