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
        <div className="min-h-screen bg-gradient-to-br">
            <div className="container mx-auto px-6 py-12">
                {/* Header с градиент и shadow */}
                <div className="bg-green-100 rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-800 to-blue-600 bg-clip-text text-transparent">
                                Обратна връзка
                            </h1>
                            <p className="text-gray-600 mt-2 text-lg">
                                Общо {feedbacks.length} съобщения
                            </p>
                        </div>

                        {/* Модерен филтър */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                            <label className="text-sm font-semibold text-gray-700">
                                Филтрирай по статус:
                            </label>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="px-4 py-3 border-2 border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 shadow-sm"
                            >
                                <option value="all">🗂️ Всички</option>
                                <option value="unread">🔴 Непрочетени</option>
                                <option value="read">🟢 Прочетени</option>
                                <option value="replied">🔵 Отговорени</option>
                            </select>
                        </div>
                    </div>
                </div>

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="bg-white rounded-2xl p-8 shadow-lg">
                        <div className="flex items-center space-x-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                            <p className="text-gray-700 font-medium">Зареждане на съобщения...</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredFeedbacks.length === 0 ? (
                        <div className="col-span-full text-center py-20">
                            <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-100">
                                <div className="text-6xl mb-4">📭</div>
                                <p className="text-gray-500 text-xl font-medium">Няма съобщения за показване</p>
                                <p className="text-gray-400 mt-2">Проверете филтъра или изчакайте нови съобщения</p>
                            </div>
                        </div>
                    ) : (
                        filteredFeedbacks.map((feedback) => (
                            <div
                                key={feedback.id}
                                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full"
                            >
                                {/* Модерен header с градиент */}
                                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 border-b border-gray-100">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                                👤 {feedback.name}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                📅 {new Date(feedback.createdOn).toLocaleString('bg-BG')}
                                            </p>
                                        </div>
                                        <span className={`px-4 py-2 rounded-full text-white text-sm font-semibold shadow-md ${getStatusColor(feedback.status)}`}>
                                            {getStatusText(feedback.status)}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6 flex-1 flex flex-col">
                                    {/* Контактна информация с икони */}
                                    <div className="grid grid-cols-1 gap-4 mb-6">
                                        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                                            <div className="text-blue-500 text-xl">📧</div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm text-gray-600 font-medium">Email</p>
                                                <a href={`mailto:${feedback.email}`} className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors block truncate">
                                                    {feedback.email}
                                                </a>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                                            <div className="text-green-500 text-xl">📱</div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm text-gray-600 font-medium">Телефон</p>
                                                <a href={`tel:${feedback.phone}`} className="text-green-600 hover:text-green-800 font-medium hover:underline transition-colors block truncate">
                                                    {feedback.phone}
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Съобщение със стилизиран дизайн */}
                                    <div className="mb-6 flex-1">
                                        <div className="flex items-center space-x-2 mb-3">
                                            <div className="text-purple-500 text-xl">💬</div>
                                            <p className="text-sm font-semibold text-gray-700">Съобщение</p>
                                        </div>
                                        <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-xl border-l-4 border-blue-500 h-full">
                                            <p className="text-gray-800 leading-relaxed text-sm">
                                                {feedback.message}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Компактни бутони на ред */}
                                    <div className="flex flex-wrap gap-2 pt-6 border-t border-gray-100 mt-auto">
                                        {feedback.status === 'unread' && (
                                            <button
                                                onClick={() => markAsRead(feedback.id)}
                                                className="flex items-center space-x-1 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-3 py-1.5 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 text-xs"
                                            >
                                                <span>Прочетен</span>
                                            </button>
                                        )}

                                        {feedback.status === 'read' && (
                                            <>
                                                <button
                                                    onClick={() => markAsReplied(feedback.id)}
                                                    className="flex items-center space-x-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 py-1.5 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 text-xs"
                                                >
                                                    <span>Отговорен</span>
                                                </button>
                                                <button
                                                    onClick={() => markAsUnread(feedback.id)}
                                                    className="flex items-center space-x-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-3 py-1.5 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 text-xs"
                                                >
                                                    <span>Непрочетен</span>
                                                </button>
                                            </>
                                        )}

                                        {feedback.status === 'replied' && (
                                            <button
                                                onClick={() => markAsUnread(feedback.id)}
                                                className="flex items-center space-x-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-3 py-1.5 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 text-xs"
                                            >
                                                <span>Непрочетен</span>
                                            </button>
                                        )}

                                        <button
                                            onClick={() => handleDelete(feedback.id)}
                                            className="flex items-center space-x-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-3 py-1.5 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 text-xs"
                                        >
                                            <span>🗑️</span>
                                            <span>Изтрий</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
            </div>
        </div>
    );
};

export default Feedback;