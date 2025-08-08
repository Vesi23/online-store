import { get, orderByChild, push, query, ref } from "@firebase/database";
import { db } from '../config/firebase-config';

// Add feedback form data to Firebase
export const addFeedbackMessage = async (
    name: string,
    phone: string,
    email: string,
    message: string
) => {
    return push(ref(db, 'feedbacks'), {
        name,
        phone,
        email,
        message,
        createdOn: Date.now(),
        status: 'unread'
    });
};

// Get all feedback messages for admin
export const getAllFeedbacks = async () => {
    const snapshot = await get(query(ref(db, 'feedbacks'), orderByChild('createdOn')));
    if (!snapshot.exists()) {
        return [];
    }

    const contacts = Object.keys(snapshot.val()).map(key => ({
        id: key,
        ...snapshot.val()[key],
        createdOn: new Date(snapshot.val()[key].createdOn).toString(),
    })).reverse(); // Most recent first

    return contacts;
};