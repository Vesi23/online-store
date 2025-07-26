import './Home.css';
const Home = () => {
    return (
        // min-h-screen and min-h-[50vh] регулират височината на контейнера
        // за да се осигури достатъчно място за съдържанието
        <div className="body min-h-[90vh] flex flex-col items-center ">
            <hr></hr>
            <div className="home-sectrion flex items-center justify-between w-full max-w-6xl px-8 py-12">
                {/* Ляв текст */}
                <div className='home-text'>
                    <h1 className="home-title">Искаш най-доброто съотношение <span className='highlight'>цена–качество? </span></h1>
                    <h3 className='home-subtitle'>Ние от Albayrak EOOD сме тук за теб!</h3>
                    <button className="home-btn text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300">
                        <a href="/about">СВЪРЖИ СЕ С НАС</a>
                    </button>
                </div>

                <div className="home-image-box">
                    <p className='image'>снимки на офиса
                        да се сменят сами постоянно</p>
                </div>
            </div>

        </div>
    );
};

export default Home;