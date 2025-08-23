import { useEffect, useState } from "react";
import { getAllProducts } from "../../service/product";
import { useNavigate } from "react-router-dom";
import './Shop.css';
interface Product {
    id: string;
    title: string;
    description: string;
    imagePost: string;
    image: string;
    category: string;
    price: number;
    priceBGN: number;
    priceEUR: number;
    size: string;
    createdOn: number;
}

const Shop = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsData = await getAllProducts('');
                setProducts(productsData);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-green-50 via-white to-gray-50">
                <div className="relative">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-transparent bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-border"></div>
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-transparent border-green-500 absolute top-0 left-0 animate-reverse"></div>
                    <p className="mt-6 text-gray-700 font-bold text-xl animate-pulse">⚙️ Зареждане на машини...</p>
                </div>
            </div>
        );
    }

    // Филтрирани продукти
    const filteredProducts = products.filter(p =>
        (!search || p.title.toLowerCase().includes(search.toLowerCase())) &&
        (!category || p.category === category)
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-100">
            {/* Header & Search */}
            <div className=" mx-auto pt-10 pb-6 px-6 background-shop-header">
                <h1 className="text-4xl font-black text-center mb-6 bg-gradient-to-r from-green-700 via-emerald-600 to-green-800 bg-clip-text text-transparent">
                    Search Product
                </h1>
                
                {/* Search Bar */}
                <div className="flex gap-3 items-center mb-4 max-w-4xl mx-auto">
                    <div className="relative flex-1">
                        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Cleaners"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-lg"
                        />
                    </div>
                    <button 
                        onClick={() => setShowMobileFilters(!showMobileFilters)}
                        className="p-3 bg-gray-100 rounded-xl border border-gray-300 hover:bg-gray-200 transition-colors lg:hidden"
                    >
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                    </button>
                    {/* Desktop filter button (hidden on mobile) */}
                    <button className="hidden lg:block p-3 bg-gray-100 rounded-xl border border-gray-300 hover:bg-gray-200 transition-colors">
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                    </button>
                </div>

            </div>

            {/* Mobile Categories Filter - показва се само при натискане */}
            {showMobileFilters && (
                <div className="lg:hidden max-w-7xl mx-auto px-6 mb-6 mt-5">
                    <div className="bg-white rounded-xl shadow-lg p-4 border border-black animate-in slide-in-from-top-5 duration-300">
                        <div className="flex items-center justify-between mb-3 ">
                            <h4 className="font-semibold text-gray-700">Категории</h4>
                            <div className="flex items-center gap-3">
                                <span className="text-sm text-gray-500">{filteredProducts.length} резултата</span>
                                <button 
                                    onClick={() => setShowMobileFilters(false)}
                                    className="text-gray-400 hover:text-gray-600 p-1"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <button 
                                onClick={() => setCategory("")}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium ${category === "" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                            >
                                Всички
                            </button>
                            <button 
                                onClick={() => setCategory("electronics")}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium ${category === "electronics" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                            >
                                Електроника
                            </button>
                            <button 
                                onClick={() => setCategory("fashion")}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium ${category === "fashion" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                            >
                                Мода
                            </button>
                            <button 
                                onClick={() => setCategory("home")}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium ${category === "home" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                            >
                                Дом и градина
                            </button>
                            <button 
                                onClick={() => setCategory("sports")}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium ${category === "sports" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                            >
                                Спорт
                            </button>
                            <button 
                                onClick={() => setCategory("books")}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium ${category === "books" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                            >
                                Книги
                            </button>
                            <button 
                                onClick={() => setCategory("beauty")}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium ${category === "beauty" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                            >
                                Красота
                            </button>
                        </div>
                        <div className="flex gap-2 mt-3">
                            <button 
                                onClick={() => {
                                    setSearch("");
                                    setCategory("");
                                }}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
                            >
                                Изчисти филтрите
                            </button>
                            <button 
                                onClick={() => setShowMobileFilters(false)}
                                className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800"
                            >
                                Готово
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Products Container */}
            <div className="flex max-w-7xl mx-auto px-6 gap-6 ">
                {/* Left Sidebar - Hidden on mobile */}
                <div className="hidden lg:block w-64 flex-shrink-0">
                    <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4 mt-5 mb-5">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Found</h3>
                        <p className="text-3xl font-black text-gray-900 mb-6">{filteredProducts.length} Results</p>
                        
                        {/* Categories */}
                        <div className="mb-6">
                            <h4 className="font-semibold text-gray-700 mb-3">Категории</h4>
                            <div className="space-y-2">
                                <button 
                                    onClick={() => setCategory("")}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm ${category === "" ? "bg-gray-900 text-white" : "hover:bg-gray-100"}`}
                                >
                                    Всички
                                </button>
                                <button 
                                    onClick={() => setCategory("electronics")}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm ${category === "electronics" ? "bg-gray-900 text-white" : "hover:bg-gray-100"}`}
                                >
                                    Електроника
                                </button>
                                <button 
                                    onClick={() => setCategory("fashion")}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm ${category === "fashion" ? "bg-gray-900 text-white" : "hover:bg-gray-100"}`}
                                >
                                    Мода
                                </button>
                                <button 
                                    onClick={() => setCategory("home")}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm ${category === "home" ? "bg-gray-900 text-white" : "hover:bg-gray-100"}`}
                                >
                                    Дом и градина
                                </button>
                                <button 
                                    onClick={() => setCategory("sports")}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm ${category === "sports" ? "bg-gray-900 text-white" : "hover:bg-gray-100"}`}
                                >
                                    Спорт
                                </button>
                                <button 
                                    onClick={() => setCategory("books")}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm ${category === "books" ? "bg-gray-900 text-white" : "hover:bg-gray-100"}`}
                                >
                                    Книги
                                </button>
                                <button 
                                    onClick={() => setCategory("beauty")}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm ${category === "beauty" ? "bg-gray-900 text-white" : "hover:bg-gray-100"}`}
                                >
                                    Красота
                                </button>
                            </div>
                        </div>
                        
                        <div className="flex gap-2">
                            <button 
                                onClick={() => {
                                    setSearch("");
                                    setCategory("");
                                }}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
                            >
                                Reset
                            </button>
                            <button className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800">Apply</button>
                        </div>
                    </div>
                </div>
                
                {/* Right Content - Full width on mobile */}
                <div className="flex-1">
                    {filteredProducts.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="text-8xl mb-8 animate-bounce">🛒</div>
                            <h3 className="text-3xl font-bold text-gray-700 mb-6">Няма продукти</h3>
                            <p className="text-xl text-gray-500">Скоро ще има налични продукти!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6">
                            {filteredProducts.map((product) => (
                                <div 
                                    key={product.id}
                                    onClick={() => navigate(`/product/${product.id}`)}
                                    className="group rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-200 hover:border-green-300 flex flex-col mt-5 mb-5"
                                    style={{ backgroundColor: '#0c2529' }}
                                >
                                    <div className="relative aspect-square overflow-hidden bg-gray-50">
                                        <img
                                            src={product.imagePost || '/images/placeholder.jpg'}
                                            alt={product.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute top-2 left-2 bg-white/90 rounded-full px-2 py-1 text-xs font-medium text-gray-700 shadow">
                                            {product.category}
                                        </div>
                                        <div className="absolute bottom-2 right-2">
                                            <button 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    // Add to cart logic here
                                                }}
                                                className="bg-green-600 text-white rounded-full p-1.5 lg:p-2 shadow-lg hover:scale-110 transition-transform"
                                            >
                                                <svg className="w-3 h-3 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-3 lg:p-4 flex-1 flex flex-col">
                                        <h3 className="font-bold text-white mb-2 line-clamp-2 text-xs lg:text-sm">{product.title}</h3>
                                        <p className="text-xs text-gray-300 mb-2 hidden lg:block">Размер: {product.size || 'Не е посочен'}</p>
                                        <div className="mt-auto flex flex-col lg:flex-row lg:items-center lg:justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-sm lg:text-lg font-bold text-white">
                                                    {product.priceBGN?.toFixed(2) || product.price?.toFixed(2) || '0.00'} лв.
                                                </span>
                                                <span className="text-xs lg:text-sm text-gray-300">
                                                    €{product.priceEUR?.toFixed(2) || (product.price / 1.95583).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Shop;
