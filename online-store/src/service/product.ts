import { ref, push, get, query, orderByChild, remove, update } from 'firebase/database';
import { db } from '../config/firebase-config';


export const addProduct = async (title: string, description: string, imagePost: string, image: string, category: string, price: string, size: string, color: string) => {
    // Конвертиране от лева към евро с фиксирания курс
    const exchangeRate = 1.95583;
    const priceBGN = parseFloat(price);
    const priceEUR = priceBGN / exchangeRate;

    return push(ref(db, 'products'), {
        title,
        description,
        image,
        imagePost,
        category,
        color,
        price: priceBGN,
        priceBGN: Math.round(priceBGN * 100) / 100, // закръгляне до 2 знака
        priceEUR: Math.round(priceEUR * 100) / 100, // закръгляне до 2 знака
        size,
        createdOn: Date.now()
    });
};

export const getAllProducts = async (search: string) => {
    const snapshot = await get(query(ref(db, 'products'), orderByChild('createdOn')));
    if (!snapshot.exists()) {
        return [];
    }

    const posts = Object.keys(snapshot.val()).map(key => ({
        id: key,
        ...snapshot.val()[key],
        title: snapshot.val()[key].title,
        description: snapshot.val()[key].description,
        image: snapshot.val()[key].image,
        imagePost: snapshot.val()[key].imagePost,
        category: snapshot.val()[key].category,
        color: snapshot.val()[key].color,
        price: snapshot.val()[key].price,
        priceBGN: snapshot.val()[key].priceBGN,
        priceEUR: snapshot.val()[key].priceEUR,
        size: snapshot.val()[key].size,
        createdOn: snapshot.val()[key].createdOn,
        imageUrl: snapshot.val()[key].imageUrl,
    }))
        .filter(p => p.title?.toLowerCase().includes(search.toLowerCase()));

    return posts;
};


export const getProductById = async (id: string) => {
    const snapshot = await get(ref(db, `products/${id}`));
    if (!snapshot.exists()) {
        return null;
    }

    const productData = snapshot.val();
    const product = [{
        id,
        title: productData.title,
        description: productData.description,
        image: productData.image,
        imagePost: productData.imagePost,
        category: productData.category,
        color: productData.color,
        price: productData.price,
        priceBGN: productData.priceBGN,
        priceEUR: productData.priceEUR,
        size: productData.size,
        createdOn: new Date(productData.createdOn).toString(),
        imageUrl: productData.imageUrl,
    }];

    return product;
};

// Delete product
export const deleteProduct = async (id: string) => {
    try {
        await remove(ref(db, `products/${id}`));
        return true;
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};

// Update product
export const updateProduct = async (id: string, title: string, description: string, imagePost: string, image: string, category: string, price: string, size: string, color: string) => {
    const exchangeRate = 1.95583;
    const priceBGN = parseFloat(price);
    const priceEUR = priceBGN / exchangeRate;

    try {
        const productRef = ref(db, `products/${id}`);
        const updates = {
            title,
            description,
            image,
            imagePost,
            category,
            color,
            price: priceBGN,
            priceBGN: Math.round(priceBGN * 100) / 100,
            priceEUR: Math.round(priceEUR * 100) / 100,
            size,
            updatedOn: Date.now()
        };
        
        await update(productRef, updates);
        return true;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};


