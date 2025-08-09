import { ref, push, get, query, orderByChild } from 'firebase/database';
import { db } from '../config/firebase-config';


export const addProduct = async (title: string, description: string, imagePost: string, image: string, category: string) => {
    return push(ref(db, 'products'), {
        title,
        description,
        image,
        imagePost,
        category,
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
        imageUrl: snapshot.val().imageUrl,
    }))
        .filter(p => p.title?.toLowerCase().includes(search.toLowerCase()));

    return posts;
};


export const getProductById = async (id: string) => {

    const snapshot = await get(ref(db, `products/${id}`));
    if (!snapshot.exists()) {
        return null;
    }

    const product = [{
        id,
        ...snapshot.val(),
        createdOn: new Date(snapshot.val().createdOn).toString(),
        imageUrl: snapshot.val().imageUrl,
    }];

    return product;
};


