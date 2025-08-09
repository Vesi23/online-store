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
         <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="ml-4 text-gray-600">Loading products...</p>
        </div>
    );
}
return (
    <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Our Products</h1>
        
        {products.length === 0 ? (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products available</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div 
    key={product.id}
    onClick={() => navigate(`/product/${product.id}`)}
    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer"
>
                        <div className="aspect-square overflow-hidden">
                            <img
                                src={product.imagePost || '/images/placeholder.jpg'}
                                alt={product.title}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-800 text-center">
                                {product.title}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
);

};

export default Shop;