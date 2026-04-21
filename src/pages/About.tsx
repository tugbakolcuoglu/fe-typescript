const About = () => {
    return (
        <div className="app-container">
            <div className="container">
                <section className="page-header">
                    <h1>About</h1>
                    <p>Bu sayfa uygulama hakkında kısa bilgi içerir.</p>
                </section>

                <div className="dashboard-box">
                    <h2>My Todo App</h2>
                    <p>
                        Bu proje React, TypeScript ve React Router kullanılarak hazırlanmış
                        bir Todo uygulamasıdır. Görev ekleme, tamamlama, çöpe taşıma ve geri
                        yükleme işlemlerini destekler.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;