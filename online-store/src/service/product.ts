import { ref, push, get, query, orderByChild, update, equalTo } from 'firebase/database';
import { db } from '../config/firebase-config';


export const addProduct = async ( title: string, description: string, imagePost: string, image: string, category: string) => {
    return push(ref(db, 'products'), {
        title,
        description,
        image,
        imagePost,
        category,
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
        // createdOn: new Date(snapshot.val()[key].createdOn).toString(),
        // likedBy: snapshot.val()[key].likedBy ? Object.keys(snapshot.val()[key].likedBy) : [],
        imageUrl: snapshot.val().imageUrl,
        // pagesRead: snapshot.val()[key].pagesRead, // updated this line
    // totalPages: snapshot.val()[key].totalPages, // updated this line
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
        likedBy: snapshot.val().likedBy ? Object.keys(snapshot.val().likedBy) : [],
        imageUrl: snapshot.val().imageUrl,
        pagesRead:snapshot.val().pagesRead,
        totalPages: snapshot.val().totalPages,
    }];

    return product;
};


