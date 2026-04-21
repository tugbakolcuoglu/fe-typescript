import { Link } from "react-router-dom";
import { useTodo } from "../context/TodoContext";

const Home = () => {
   const { todos, loading } = useTodo();

   const activeCount = todos.filter((todo) => todo.status === 0).length;
   const completedCount = todos.filter((todo) => todo.status === 1).length;
   const trashCount = todos.filter((todo) => todo.status === 2).length;
   const totalCount = todos.length;

   if (loading) {
      return (
         <div className="app-container">
            <div className="container">
               <div className="empty-state">
                  <h3>Loading Dashboard...</h3>
                  <p>Genel bilgiler yükleniyor.</p>
               </div>
            </div>
         </div>
      );
   }

   return (
      <div className="app-container">
         <div className="container">
            <section className="dashboard-header">
               <h1>Welcome Back 👋</h1>
               <p>Görevlerinin genel durumunu buradan takip edebilirsin.</p>
            </section>

            {totalCount === 0 && (
               <section className="first-task-section">
                  <div className="first-task-card">
                     <span className="first-task-badge">Getting Started</span>
                     <h2>İlk görevini oluştur</h2>
                     <p>
                        Todo uygulamanı kullanmaya başlamak için ilk görevini ekle.
                     </p>
                     <p className="first-task-note">
                        Sonraki görevlerini <strong>Create New</strong> sayfasından
                        oluşturmaya devam edebilirsin.
                     </p>

                     <Link to="/create-new" className="first-task-btn">
                        ➕ Create First Task
                     </Link>
                  </div>
               </section>
            )}

            <section className="dashboard-cards">
               <div className="dashboard-card total-card">
                  <div className="dashboard-card-top">
                     <span className="dashboard-icon">📋</span>
                     <h3>Total Tasks</h3>
                  </div>
                  <span className="dashboard-number">{totalCount}</span>
                  <p className="dashboard-text">Sistemdeki toplam görev sayısı</p>
               </div>

               <div className="dashboard-card active-card">
                  <div className="dashboard-card-top">
                     <span className="dashboard-icon">🔥</span>
                     <h3>Active Tasks</h3>
                  </div>
                  <span className="dashboard-number">{activeCount}</span>
                  <p className="dashboard-text">Devam eden görevlerin</p>
               </div>

               <div className="dashboard-card completed-card">
                  <div className="dashboard-card-top">
                     <span className="dashboard-icon">✅</span>
                     <h3>Completed Tasks</h3>
                  </div>
                  <span className="dashboard-number">{completedCount}</span>
                  <p className="dashboard-text">Tamamlanan görevlerin</p>
               </div>

               <div className="dashboard-card trash-card">
                  <div className="dashboard-card-top">
                     <span className="dashboard-icon">🗑️</span>
                     <h3>Trash Tasks</h3>
                  </div>
                  <span className="dashboard-number">{trashCount}</span>
                  <p className="dashboard-text">Çöpte bekleyen görevlerin</p>
               </div>
            </section>

            <section className="quick-actions">
               <div className="section-title-row">
                  <h2>Quick Actions</h2>
                  <p>En sık kullanacağın alanlar</p>
               </div>

               <div className="quick-actions-grid compact">
                  <Link to="/create-new" className="quick-action-card">
                     <span className="quick-action-icon">➕</span>
                     <div>
                        <h3>Create New Task</h3>
                        <p>Yeni görev ekleme ekranına git</p>
                     </div>
                  </Link>

                  <Link to="/active" className="quick-action-card">
                     <span className="quick-action-icon">🔥</span>
                     <div>
                        <h3>View Active Tasks</h3>
                        <p>Devam eden görevleri görüntüle</p>
                     </div>
                  </Link>
               </div>
            </section>
         </div>
      </div>
   );
};

export default Home;