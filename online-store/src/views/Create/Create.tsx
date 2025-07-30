import { useState } from "react";
import { addProduct } from "../../service/product";

const Create = () => {
    const [product, setProduct] = useState({
        title: '',
        description: '',
        imagePost: '',
        image: '',
        category: ''
    });

    const [category, setCategory] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleCategory = (e: any) => {
        setCategory(e.target.value);
    }

    const createProduct = async () => {
        let isValid = true;

        if (product.title.length < 3 || product.title.length > 60) {
            isValid = false;
            alert('Title must be between 3 and 60 characters');
        }

        if (product.description.length < 10 || product.description.length > 1500) {
            isValid = false;
            alert('Description must be between 10 and 1500 characters');
        }

        if (!isValid) {
            return;
        }

        setIsLoading(true);

        try {
            await addProduct(
                product.title,
                product.description,
                product.imagePost,
                product.image,
                category
            );

            setProduct({
                title: '',
                description: '',
                imagePost: '',
                image: '',
                category: ''
            });
            setCategory('');
            alert('Product created successfully');
        } catch (error) {
            alert('Error creating product');
        } finally {
            setIsLoading(false);
        }
    }

 
}

export default Create;