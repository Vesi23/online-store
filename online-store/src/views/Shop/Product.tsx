import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../../service/product';

interface ProductType {
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
    createdOn: string | number;
}
const Product = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<ProductType | null>(null);
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState<string[]>([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;
            
            try {
                const productData = await getProductById(id);
                if (productData && productData.length > 0) {
                    setProduct(productData[0]);
                    
                    // Parse images from JSON string
                    try {
                        const parsedImages = JSON.parse(productData[0].image || '[]');
                        setImages(Array.isArray(parsedImages) ? parsedImages : [productData[0].imagePost]);
                    } catch {
                        setImages([productData[0].imagePost]);
                    }
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                <p className="ml-4 text-gray-600">Loading product...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h1>
                <button 
                    onClick={() => navigate('/shop')}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Back to Shop
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen  from-slate-800 via-slate-700 to-gray-800">
            {/* Back Button */}
            <div className="max-w-5xl mx-auto px-5 pt-5">
                <button 
                    onClick={() => navigate('/shop')}
                    className="group flex items-center bg-gradient-to-r from-emerald-600 to-green-600 text-white px-4 py-2 rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105 hover:from-emerald-500 hover:to-green-500 mb-6 border border-emerald-400/30"
                >
                    <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="font-semibold text-sm tracking-wide">Назад към продуктите</span>
                </button>
            </div>

            <div className="max-w-7xl mx-auto px-6 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left - Images Section */}
                    <div>
                        {/* Main Image */}
                        <div className="w-full max-w-sm lg:max-w-md mx-auto overflow-hidden rounded-2xl bg-gradient-to-br from-slate-200 to-slate-100 shadow-2xl relative group mb-4 ring-2 ring-slate-600/20">
                            <div className="aspect-square bg-gradient-to-br from-slate-100 to-white">
                                <img
                                    src={images[selectedImageIndex] || product.imagePost}
                                    alt={product.title}
                                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-lg"
                                />
                            </div>
                            
                            {/* Image counter */}
                            {images.length > 1 && (
                                <div className="absolute bottom-4 right-4 bg-slate-800/90 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm">
                                    {selectedImageIndex + 1} / {images.length}
                                </div>
                            )}
                            
                            {/* Navigation arrows for main image */}
                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={() => setSelectedImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-slate-800/80 hover:bg-slate-700 text-white rounded-full p-2 shadow-xl transition-all duration-200 opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => setSelectedImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-slate-800/80 hover:bg-slate-700 text-white rounded-full p-2 shadow-xl transition-all duration-200 opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </>
                            )}
                        </div>
                        
                        {/* Thumbnail Images Row - Bottom */}
                        {images.length > 1 && (
                            <div className="relative max-w-sm lg:max-w-md mx-auto">
                                <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 justify-center">
                                    {images.slice(0, 5).map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImageIndex(index)}
                                            className={`w-12 h-12 lg:w-16 lg:h-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all shadow-lg ${
                                                selectedImageIndex === index 
                                                    ? 'border-emerald-400 shadow-emerald-400/50 ring-2 ring-emerald-400/30' 
                                                    : 'border-slate-500 hover:border-slate-400 shadow-slate-500/30'
                                            }`}
                                        >
                                            <div className="w-full h-full bg-gradient-to-br from-slate-100 to-white">
                                                <img
                                                    src={image}
                                                    alt={`${product.title} ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </button>
                                    ))}
                                    
                                    {/* Show more indicator if there are more than 5 images */}
                                    {images.length > 5 && (
                                        <div className="w-12 h-12 lg:w-16 lg:h-16 flex-shrink-0 border-2 border-dashed border-slate-400 bg-slate-600/20 rounded-lg flex items-center justify-center text-slate-300 text-xs backdrop-blur-sm">
                                            +{images.length - 5}
                                        </div>
                                    )}
                                </div>
                                
                                {/* Scroll indicators */}
                                {images.length > 5 && (
                                    <div className="flex justify-center mt-2 gap-1">
                                        {Array.from({ length: Math.ceil(images.length / 5) }).map((_, pageIndex) => (
                                            <div
                                                key={pageIndex}
                                                className={`w-2 h-2 rounded-full transition-colors ${
                                                    Math.floor(selectedImageIndex / 5) === pageIndex 
                                                        ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50' 
                                                        : 'bg-slate-500'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right - Product Info Section */}
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-4 lg:p-8 ring-1 ring-slate-600/50">
                        {/* Category Badge */}
                        <div className="mb-4 lg:mb-6">
                            <span className="inline-block bg-gradient-to-r from-emerald-500 to-green-500 text-white px-3 py-1.5 lg:px-4 lg:py-2 rounded-full text-xs lg:text-sm font-bold shadow-lg shadow-emerald-500/30">
                                {product.category}
                            </span>
                        </div>

                        {/* Product Title */}
                        <h1 className="text-2xl lg:text-4xl font-black text-white mb-4 lg:mb-6 leading-tight drop-shadow-lg">
                            {product.title}
                        </h1>

                        {/* Size Info */}
                        <div className="mb-4 lg:mb-6 p-3 lg:p-4 bg-slate-700/50 rounded-xl border border-slate-600 backdrop-blur-sm">
                            <div className="flex items-center">
                                <svg className="w-4 h-4 lg:w-5 lg:h-5 mr-2 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                <span className="text-slate-200 font-semibold text-sm lg:text-base">Размер: </span>
                                <span className="text-slate-300 ml-1 text-sm lg:text-base">{product.size || 'Не е посочен'}</span>
                            </div>
                        </div>

                        {/* Prices */}
                        <div className="mb-6 lg:mb-8 p-4 lg:p-6 bg-gradient-to-r from-emerald-900/30 to-green-900/30 rounded-2xl border border-emerald-600/30 backdrop-blur-sm shadow-lg">
                            <div className="flex items-center justify-center gap-4 lg:gap-6">
                                <div className="flex flex-col text-center">
                                    <span className="text-lg lg:text-2xl font-black text-emerald-300 drop-shadow-lg">
                                        {product.priceBGN?.toFixed(2) || product.price?.toFixed(2) || '0.00'} лв.
                                    </span>
                                </div>
                                <div className="h-8 lg:h-12 w-px bg-emerald-400/50 shadow-lg shadow-emerald-400/20"></div>
                                <div className="flex flex-col text-center">
                                    <span className="text-lg lg:text-2xl font-black text-emerald-300 drop-shadow-lg">
                                        €{product.priceEUR?.toFixed(2) || (product.price / 1.95583).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>


                        {/* Description */}
                        <div className="mb-6 lg:mb-8">
                            <h3 className="text-lg lg:text-2xl font-bold text-white mb-3 lg:mb-4 flex items-center drop-shadow-lg">
                                <svg className="w-5 h-5 lg:w-6 lg:h-6 mr-2 lg:mr-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Описание
                            </h3>
                            <div className="p-3 lg:p-4 bg-slate-700/50 rounded-xl border border-slate-600 backdrop-blur-sm">
                                <p className="text-slate-200 leading-relaxed whitespace-pre-wrap text-sm lg:text-base">
                                    {product.description}
                                </p>
                            </div>
                        </div>

                        {/* Product Info Footer */}
                        <div className="border-t border-slate-600 pt-4 lg:pt-6">
                            <div className="flex items-center text-xs lg:text-sm text-slate-400">
                                <svg className="w-3 h-3 lg:w-4 lg:h-4 mr-2 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-4 8a2 2 0 100-4 2 2 0 000 4zm0 0v4a2 2 0 002 2h.01M12 12h.01" />
                                </svg>
                                <span className="font-medium">Добавен на:</span>
                                <span className="ml-2">{new Date(product.createdOn).toLocaleDateString('bg-BG')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;