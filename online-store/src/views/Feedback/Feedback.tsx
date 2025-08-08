import { useEffect, useState } from 'react';
// import { database } from '../../config/firebase-config';
import { ref, onValue, remove, update } from 'firebase/database';
import { db } from '../../config/firebase-config';

interface FeedbackData {
    id: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    status: string;
    createdOn: number;
}

const Feedback = () => {
    const [feedbacks, setFeedbacks] = useState<FeedbackData[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState<string>('all');


    useEffect(() => {
        const feedbacksRef = ref(db, 'feedbacks');

        const unsubscribe = onValue(feedbacksRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const feedbacksList = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                setFeedbacks(feedbacksList);
            } else {
                // Ако няма данни, покажи празен масив
                setFeedbacks([]);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this feedback?')) {
            try {
                const feedbackRef = ref(db, `feedbacks/${id}`);
                await remove(feedbackRef);
                console.log('Feedback deleted successfully');
            } catch (error) {
                console.error("Error deleting feedback:", error);
                alert('Грешка при изтриване на feedback-а');
            }
        }
    };
    // Филтрирай feedback-ите
    const filteredFeedbacks = filterStatus === 'all'
        ? feedbacks
        : feedbacks.filter(f => f.status === filterStatus);

    // Функция за маркиране като прочетен
    const markAsRead = async (id: string) => {
        try {
            const feedbackRef = ref(db, `feedbacks/${id}`);
            await update(feedbackRef, { status: 'read', readAt: Date.now() });
        } catch (error) {
            console.error("Error marking feedback as read:", error);
        }
    };

    // Функция за маркиране като отговорен
    const markAsReplied = async (id: string) => {
        try {
            const feedbackRef = ref(db, `feedbacks/${id}`);
            await update(feedbackRef, {
                status: 'replied',
                repliedAt: Date.now()
            })
        } catch (error) {
            console.error("Error marking feedback as replied:", error);
        }
    };

    // Функция за връщане към непрочетен
    const markAsUnread = async (id: string) => {
        try {
            const feedbackRef = ref(db, `feedbacks/${id}`);
            await update(feedbackRef, { status: 'unread' });
        } catch (error) {
            console.error('Error marking as unread:', error);
        }
    }

    //   css 
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'unread': return 'bg-red-500';
            case 'read': return 'bg-teal-500';
            case 'replied': return 'bg-blue-500';
            default: return 'bg-gray-500';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'unread': return 'Непрочетен';
            case 'read': return 'Прочетен';
            case 'replied': return 'Отговорен';
            default: return status;
        }
    };


    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">
                    Feedbacks ({feedbacks.length})
                </h1>

                {/* Филтриране по статус */}
                <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-gray-700">
                        Филтрирай по статус:
                    </label>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">Всички</option>
                        <option value="unread">Непрочетени</option>
                        <option value="read">Прочетени</option>
                        <option value="replied">Отговорени</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    <p className="ml-4 text-gray-600">Loading...</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredFeedbacks.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">Няма feedback-и за показване</p>
                        </div>
                    ) : (
                        filteredFeedbacks.map((feedback) => (
                            <div
                                key={feedback.id}
                                className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6"
                            >
                                {/* Header с име и статус */}
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-semibold text-gray-800">
                                        {feedback.name}
                                    </h3>
                                    <span className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getStatusColor(feedback.status)}`}>
                                        {getStatusText(feedback.status)}
                                    </span>
                                </div>

                                {/* Информация */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">Email:</span>
                                            <a href={`mailto:${feedback.email}`} className="text-blue-600 hover:underline ml-1">
                                                {feedback.email}
                                            </a>
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">Phone:</span>
                                            <a href={`tel:${feedback.phone}`} className="text-blue-600 hover:underline ml-1">
                                                {feedback.phone}
                                            </a>
                                        </p>
                                    </div>
                                </div>

                                {/* Съобщение */}
                                <div className="mb-4">
                                    <p className="text-sm text-gray-600 mb-1">
                                        <span className="font-medium">Message:</span>
                                    </p>
                                    <p className="text-gray-800 bg-gray-50 p-3 rounded-md">
                                        {feedback.message}
                                    </p>
                                </div>

                                {/* Дата */}
                                <p className="text-xs text-gray-500 mb-4">
                                    <span className="font-medium">Created:</span> {new Date(feedback.createdOn).toLocaleString()}
                                </p>

                                {/* Бутони за управление */}
                                <div className="flex flex-wrap gap-2">
                                    {feedback.status === 'unread' && (
                                        <button
                                            onClick={() => markAsRead(feedback.id)}
                                            className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                        >
                                            Маркирай като прочетен
                                        </button>
                                    )}

                                    {feedback.status === 'read' && (
                                        <>
                                            <button
                                                onClick={() => markAsReplied(feedback.id)}
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                            >
                                                Маркирай като отговорен
                                            </button>
                                            <button
                                                onClick={() => markAsUnread(feedback.id)}
                                                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                            >
                                                Върни в непрочетени
                                            </button>
                                        </>
                                    )}

                                    {feedback.status === 'replied' && (
                                        <button
                                            onClick={() => markAsUnread(feedback.id)}
                                            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                        >
                                            Върни в непрочетени
                                        </button>
                                    )}

                                    <button
                                        onClick={() => handleDelete(feedback.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                    >
                                        Изтрий
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default Feedback;