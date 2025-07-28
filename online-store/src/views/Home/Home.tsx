import './Home.css';
import { useState, useEffect } from 'react';

const Home = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentProductIndex, setCurrentProductIndex] = useState(0);
    const [autoPlay] = useState(true); // Добавете това

    const mediaFiles = [
        { src: "/images/office1.jpg", type: "image", alt: "Office 1" },
        { src: "/images/office2.jpg", type: "image", alt: "Office 2" },
        { src: "/images/officeVideo1.mp4", type: "video", alt: "Office Video" }
    ];

    // Автоматично сменяне на снимките
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaFiles.length);
        }, 3000); // Сменя на всеки 3 секунди

        return () => clearInterval(interval);
    }, [mediaFiles.length]);

    // Автоматично сменяне на продуктите
    useEffect(() => {
        if (!autoPlay) return;

        const interval = setInterval(() => {
            setCurrentProductIndex((prev) => (prev + 1) % 8);
        }, 4000); // Сменя на всеки 4 секунди

        return () => clearInterval(interval);
    }, [autoPlay]);

    return (
        <div className="body min-h-[90vh] flex flex-col items-center">
            <hr></hr>
            {/* Responsive layout - хоризонтално на desktop, вертикално на mobile */}
            <div className="home-section flex flex-col lg:flex-row items-center justify-between w-full max-w-6xl px-8 py-12 gap-8">
                {/* Ляв текст */}
                <div className='home-text '>
                    <h1 className="home-title">Искаш най-доброто съотношение <span className='highlight'>цена–качество? </span></h1>
                    <h3 className='home-subtitle'>Ние от Albayrak EOOD сме тук за теб!</h3>
                    <button className="home-btn text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300">
                        <a href="/about">СВЪРЖИ СЕ С НАС</a>
                    </button>
                </div>

                {/* Автоматично сменящи се медия файлове */}
                <div className="flex-1 relative overflow-hidden rounded-lg shadow-lg max-w-md w-full">
                    <div className="relative w-full h-80">
                        {mediaFiles.map((media, index) => (
                            <div
                                key={index}
                                className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                                    }`}
                            >
                                {media.type === "image" ? (
                                    <img
                                        src={media.src}
                                        alt={media.alt}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                ) : (
                                    <video
                                        src={media.src}
                                        className="w-full h-full object-cover rounded-lg"
                                        autoPlay
                                        muted
                                        loop
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Индикатори */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {mediaFiles.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? 'bg-white shadow-lg'
                                    : 'bg-white/50 hover:bg-white/75'
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Навигационни бутони */}
                    <button
                        onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + mediaFiles.length) % mediaFiles.length)}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaFiles.length)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Секция с предимства */}
            {/* from-blue-50 to-green-200  преливане на цветовете */}
            <div className="w-full h-[150hv] bg-gradient-to-br from-blue-50 to-green-200 py-16">
                <div className="max-w-6xl mx-auto px-8">
                    <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
                        Защо да изберете <span className="text-green-600">Albayrak EOOD</span>?
                    </h2>
                    <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                        Ние предлагаме най-доброто съчетание от качество, скорост и професионализъм за вашия бизнес
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Първа колонка - Бърза доставка */}
                        {/* Първа колонка - Бърза доставка */}
                        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                            <div className="text-center">
                                {/* Икона */}
                                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 576 512">
                                        <path d="M64 80c-8.8 0-16 7.2-16 16l0 288c0 8.8 7.2 16 16 16l3.3 0c10.4-36.9 44.4-64 84.7-64s74.2 27.1 84.7 64l102.6 0c4.9-17.4 15.1-32.7 28.7-43.9L368 96c0-8.8-7.2-16-16-16L64 80zm3.3 368L64 448c-35.3 0-64-28.7-64-64L0 96C0 60.7 28.7 32 64 32l288 0c35.3 0 64 28.7 64 64l0 32 55.4 0c17 0 33.3 6.7 45.3 18.7l40.6 40.6c12 12 18.7 28.3 18.7 45.3L576 384c0 35.3-28.7 64-64 64l-3.3 0c-10.4 36.9-44.4 64-84.7 64s-74.2-27.1-84.7-64l-102.6 0c-10.4 36.9-44.4 64-84.7 64s-74.2-27.1-84.7-64zM416 256l112 0 0-23.4c0-4.2-1.7-8.3-4.7-11.3l-40.6-40.6c-3-3-7.1-4.7-11.3-4.7l-55.4 0 0 80zm0 48l0 32.4c2.6-.2 5.3-.4 8-.4 40.3 0 74.2 27.1 84.7 64l3.3 0c8.8 0 16-7.2 16-16l0-80-112 0zM152 464a40 40 0 1 0 0-80 40 40 0 1 0 0 80zm272 0a40 40 0 1 0 0-80 40 40 0 1 0 0 80z" />
                                    </svg>
                                </div>

                                <h4 className="text-lg font-semibold text-gray-800 mb-3">
                                    Бърза доставка
                                </h4>
                                <p className="text-gray-600 text-sm">
                                    Получавате поръчките си навреме, без излишно чакане. Гарантираме експресна доставка до 24 часа.
                                </p>

                                {/* Детайл */}
                                <div className="mt-4">
                                    <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                                        До 24 часа
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Втора колонка - Коректно обслужване */}
                        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                            <div className="text-center">
                                {/* Икона */}
                                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>

                                <h4 className="text-lg font-semibold text-gray-800 mb-3">
                                    Коректно обслужване
                                </h4>
                                <p className="text-gray-600 text-sm">
                                    Винаги сме на разположение да отговорим на вашите въпроси и да помогнем при избор на най-подходящото решение.
                                </p>

                                {/* Детайл */}
                                <div className="mt-4">
                                    <span className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full">
                                        24/7 Поддръжка
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Трета колонка - Изгодни цени */}
                        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                            <div className="text-center">
                                {/* Икона */}
                                <div className="w-12 h-12 bg-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>

                                <h4 className="text-lg font-semibold text-gray-800 mb-3">
                                    Изгодни цени
                                </h4>
                                <p className="text-gray-600 text-sm">
                                    Предлагаме отличен баланс между цена и надеждност на продуктите. Най-конкурентни цени на пазара.
                                </p>

                                {/* Детайл */}
                                <div className="mt-4">
                                    <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                                        Най-добра цена
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Секция с продукти */}
           <div className='home-products w-full min-h-[90vh] py-16 flex justify-center items-center'>
                <div className="max-w-6xl mx-auto px-8">

                    {/* Заглавие с модерен дизайн */}
                    <div className="text-center mb-16">
                        <div className="relative inline-block">
                            <h1 className="font-extrabold text-5xl lg:text-6xl text-white mb-4 tracking-tight leading-tight">
                                Нашите <span className='text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 animate-pulse'>Продукти</span>
                            </h1>
                            {/* Декоративна линия под заглавието */}
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full shadow-lg"></div>
                        </div>
        
                    </div>
                    {/* Основно съдържание */}
                    <div className="flex flex-col lg:flex-row gap-12 items-center">

                        {/* Лява част - групирани снимки */}
                        {/* Лява част - интерактивен carousel */}
                        <div className="flex-1">
                            <div className="relative">
                                {/* Главна показвана снимка с по-добро aspect ratio */}
                                <div className="relative overflow-hidden rounded-2xl  mb-6 ">
                                    <div className="w-full h-[500px] flex items-center justify-center"> {/* Увеличена височина */}
                                        <img
                                            src={`/images/home${currentProductIndex + 1}.jpg`}
                                            alt={`Product ${currentProductIndex + 1}`}
                                            className="max-w-full max-h-full object-contain transition-all duration-500"
                                        />
                                    </div>
                                 {/* Навигационни стрелки - по-малки */}
<button
    onClick={() => setCurrentProductIndex((prev) => prev === 0 ? 7 : prev - 1)}
    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
>
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
</button>

<button
    onClick={() => setCurrentProductIndex((prev) => prev === 7 ? 0 : prev + 1)}
    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
>
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
</button>

                                  
                                </div>
                                
                                {/* Thumbnail navigation с по-добър размер */}
                                <div className="grid grid-cols-8 gap-2">
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num, index) => (
                                        <div
                                            key={index}
                                            onClick={() => setCurrentProductIndex(index)}
                                            className={`group relative cursor-pointer transition-all duration-300 transform hover:scale-110 ${currentProductIndex === index
                                                ? 'scale-110 ring-2 ring-green-400'
                                                : 'hover:scale-105'
                                                }`}
                                        >
                                            <div className="aspect-square rounded-lg overflow-hidden shadow-lg">
                                                <img
                                                    src={`/images/home${num}.jpg`}
                                                    alt={`Product ${num}`}
                                                    className={`w-full h-full object-cover transition-all duration-300 ${currentProductIndex === index
                                                        ? 'brightness-100'
                                                        : 'brightness-75 group-hover:brightness-90'
                                                        }`}
                                                />
                                            </div>

                                        </div>
                                    ))}
                                </div>

                                {/* Dot индикатори */}
                                <div className="flex justify-center mt-6 space-x-2">
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentProductIndex(index)}
                                            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentProductIndex === index
                                                ? 'bg-green-400 scale-125'
                                                : 'bg-white/40 hover:bg-white/60 hover:scale-110'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* Дясна част - текст с бял изпъкнал фон */}
                        <div className="home-product-right flex-1 lg:pl-8">
                            <div className="bg-white rounded-2xl p-8 shadow-2xl border border-gray-100 transform hover:scale-105 transition-all duration-300">
                                <p className="home-product-t-l text-xl leading-relaxed mb-8 text-gray-800">
                                    <span className=" font-bold text-gray-900">В Albayrak EOOD</span> знаем колко е важно
                                    опаковането да бъде <span className="text-green-600 font-semibold">сигурно, удобно
                                        и бързо.</span>
                                </p>

                                <p className="home-product-text text-lg leading-relaxed mb-10 text-gray-600 ">
                                    Затова предлагаме подбрана гама от продукти, които отговарят на
                                    нуждите на всеки бизнес – от малки складове до големи логистични
                                    центрове.
                                </p>

                                <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-xl transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 w-full">
                                    <a href="/shop" className="flex items-center justify-center space-x-2">
                                        <span>Нашите Продукти</span>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </a>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;