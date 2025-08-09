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
        <div className="container mx-auto px-4 py-8">
            <button 
                onClick={() => navigate('/shop')}
                className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
            >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Shop
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Images Section */}
                <div>
                    <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                        <img
                            src={images[selectedImageIndex] || product.imagePost}
                            alt={product.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    
                    {/* Thumbnail Images */}
                    {images.length > 1 && (
                        <div className="grid grid-cols-4 gap-2">
                            {images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImageIndex(index)}
                                    className={`aspect-square overflow-hidden rounded border-2 ${
                                        selectedImageIndex === index 
                                            ? 'border-blue-500' 
                                            : 'border-gray-200'
                                    }`}
                                >
                                    <img
                                        src={image}
                                        alt={`${product.title} ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Info Section */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        {product.title}
                    </h1>
                    
                    <div className="mb-4">
                        <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                            {product.category}
                        </span>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Description</h3>
                        <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                            {product.description}
                        </p>
                    </div>

                    <div className="mb-6">
                        <p className="text-sm text-gray-500">
                            Added on: {new Date(product.createdOn).toLocaleDateString()}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
                            Contact for Price
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;