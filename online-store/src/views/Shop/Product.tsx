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
    createdOn: number;
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
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-gray-50">
            {/* Back Button */}
            <div className="max-w-7xl mx-auto px-6 pt-6">
                <button 
                    onClick={() => navigate('/shop')}
                    className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Назад към продуктите
                </button>
            </div>

            <div className="max-w-7xl mx-auto px-6 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left - Images Section */}
                    <div>
                        {/* Main Image */}
                        <div className="w-full max-w-md mx-auto overflow-hidden rounded-2xl bg-white shadow-lg relative group mb-4">
                            <div className="aspect-square">
                                <img
                                    src={images[selectedImageIndex] || product.imagePost}
                                    alt={product.title}
                                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            
                            {/* Image counter */}
                            {images.length > 1 && (
                                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                                    {selectedImageIndex + 1} / {images.length}
                                </div>
                            )}
                            
                            {/* Navigation arrows for main image */}
                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={() => setSelectedImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => setSelectedImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
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
                            <div className="relative max-w-md mx-auto">
                                <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 justify-center">
                                    {images.slice(0, 5).map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImageIndex(index)}
                                            className={`w-16 h-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                                                selectedImageIndex === index 
                                                    ? 'border-green-500 shadow-lg ring-2 ring-green-200' 
                                                    : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                        >
                                            <img
                                                src={image}
                                                alt={`${product.title} ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                    
                                    {/* Show more indicator if there are more than 5 images */}
                                    {images.length > 5 && (
                                        <div className="w-16 h-16 flex-shrink-0 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-500 text-xs">
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
                                                className={`w-2 h-2 rounded-full ${
                                                    Math.floor(selectedImageIndex / 5) === pageIndex 
                                                        ? 'bg-green-500' 
                                                        : 'bg-gray-300'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right - Product Info Section */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <div className="mb-4">
                            <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                {product.category}
                            </span>
                        </div>

                        <h1 className="text-3xl font-bold text-gray-800 mb-4">
                            {product.title}
                        </h1>

                        <div className="text-sm text-gray-500 mb-4">Size: 7,60 fl oz / 225ml</div>

                        {/* Rating */}
                        <div className="flex items-center mb-6">
                            <div className="flex text-yellow-400 text-lg mr-2">
                                {"★".repeat(4)}{"☆"}
                            </div>
                            <span className="text-sm text-gray-600">(103 Reviews)</span>
                        </div>

                        {/* Price */}
                        <div className="text-4xl font-bold text-gray-900 mb-8">
                            ${Math.floor(Math.random()*20+5)}.99
                        </div>

                        {/* Quantity and Add to Cart */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex items-center border border-gray-300 rounded-lg">
                                <button className="px-3 py-2 hover:bg-gray-100 transition-colors">-</button>
                                <span className="px-4 py-2 border-x border-gray-300">1</span>
                                <button className="px-3 py-2 hover:bg-gray-100 transition-colors">+</button>
                            </div>
                            <button className="flex-1 bg-gray-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                                Add to Cart
                            </button>
                        </div>

                        {/* Description */}
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Description</h3>
                            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                                {product.description}
                            </p>
                        </div>

                        <div className="border-t border-gray-200 pt-4">
                            <p className="text-sm text-gray-500">
                                Added on: {new Date(product.createdOn).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;