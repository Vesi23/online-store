import { useEffect, useState } from "react";
import { getAllProducts } from "../../service/product";
import { useNavigate } from "react-router-dom";

interface Product {
    id: string;
    title: string;
    description: string;
    imagePost: string;
    image: string;
    category: string;
    createdOn: number;
}

const Shop = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

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

if(loading){
    return(
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-green-50 via-white to-gray-50">
            <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-transparent bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-border"></div>
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-transparent border-green-500 absolute top-0 left-0 animate-reverse"></div>
                <p className="mt-6 text-gray-700 font-bold text-xl animate-pulse">⚙️ Зареждане на машини...</p>
            </div>
        </div>
    );
}

return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-gray-50">
        {/* Industrial Hero Section */}
        <div className="relative overflow-hidden py-20 px-6">
            {/* Subtle geometric shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg opacity-10 animate-pulse"></div>
                <div className="absolute top-40 right-20 w-12 h-12 bg-gradient-to-br from-gray-400 to-green-500 rounded-full opacity-10 animate-bounce"></div>
                <div className="absolute bottom-40 left-1/4 w-8 h-8 bg-gradient-to-br from-green-500 to-gray-600 rotate-45 opacity-15 animate-pulse"></div>
            </div>
            
            <div className="max-w-7xl mx-auto text-center relative z-10">
                <div className="inline-block">
                    <h1 className="text-6xl md:text-7xl font-black mb-6 relative">
                        <span className="bg-gradient-to-r from-green-700 via-emerald-600 to-green-800 bg-clip-text text-transparent">
                        Нашите       продукти
                        </span>
                     
                    </h1>
                </div>
                <div className="flex justify-center">
                    <div className="w-32 h-2 bg-gradient-to-r from-green-600 via-emerald-500 to-green-700 rounded-full shadow-lg"></div>
                </div>
            </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 pb-20">
            {products.length === 0 ? (
                <div className="text-center py-20">
                    <div className="text-8xl mb-8 animate-bounce">�</div>
                    <h3 className="text-3xl font-bold text-gray-700 mb-6">Зареждаме машините!</h3>
                    <p className="text-xl text-gray-500">Скоро ще има налично оборудване! ⚙️</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {products.map((product, index) => (
                        <div 
                            key={product.id}
                            onClick={() => navigate(`/product/${product.id}`)}
                            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-3 border border-gray-200 hover:border-green-300"
                            style={{
                                animationDelay: `${index * 100}ms`,
                                animation: 'fadeInUp 0.6s ease-out forwards'
                            }}
                        >
                            {/* Industrial border accent */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                            
                            {/* Main card */}
                            <div className="relative bg-white rounded-2xl overflow-hidden">
                                {/* Green accent stripe */}
                                <div className="h-2 bg-gradient-to-r from-green-600 to-emerald-600"></div>
                                
                                {/* Image with professional effects */}
                                <div className="relative aspect-square overflow-hidden bg-gray-50">
                                    <img
                                        src={product.imagePost || '/images/placeholder.jpg'}
                                        alt={product.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    
                                    {/* Professional overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    
                                    {/* Industrial action button */}
                                    <div className="absolute bottom-4 right-4 w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    
                                    {/* Technical indicators */}
                                    <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                    </div>
                                </div>
                                
                                {/* Professional content */}
                                <div className="p-6 relative">
                                    <h3 className="text-lg font-bold text-gray-800 text-center mb-4 group-hover:text-green-700 transition-colors duration-300 line-clamp-2">
                                        {product.title}
                                    </h3>
                                    
                                    {/* Category with industrial styling */}
                                    {product.category && (
                                        <div className="flex justify-center mb-4">
                                            <span className="px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 rounded-lg font-medium text-sm border border-green-200">
                                                🔧 {product.category}
                                            </span>
                                        </div>
                                    )}
                                    
                                    {/* Professional CTA */}
                                    <div className="text-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                        <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg text-sm shadow-md hover:shadow-lg transition-all duration-300">
                                            � Детайли
                                        </span>
                                    </div>
                                    
                                    {/* Technical separator */}
                                    <div className="mt-4 flex justify-center">
                                        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
        
        {/* CSS Animations */}
        <style>{`
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `}</style>
    </div>
);

};

export default Shop;