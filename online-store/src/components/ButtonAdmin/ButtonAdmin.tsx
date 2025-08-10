import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase-config';
import { useAppContext } from '../../context/appContext';
import { useNavigate } from 'react-router-dom';

interface ButtonAdminProps {
    showLogin?: boolean;
    onClose?: () => void;
}

const ButtonAdmin = ({ showLogin = false, onClose }: ButtonAdminProps) => {
    const { setContext } = useAppContext();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;
            
            // Обновяваме контекста с потребителските данни
            setContext({
                admin: { email: user.email },
                adminData: { email: user.email }
            });
            
            // Затваряме модала
            closeModal();
            
            // Пренасочваме към create страницата
            navigate('/create');
        } catch (err: any) {
            setError('Невалидни данни за влизане');
        } finally {
            setIsLoading(false);
        }
    };

    const closeModal = () => {
        if (onClose) onClose();
        setFormData({ email: '', password: '' });
        setError('');
    };

    return (
        <>
            {/* Login Modal с модерен дизайн */}
            {showLogin && (
                <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100 animate-scaleIn">
                        {/* Header с градиент */}
                        <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-white p-8 rounded-t-3xl relative overflow-hidden">
                            {/* Background decoration */}
                            <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-emerald-600/20"></div>
                            <div className="absolute -top-10 -right-10 w-20 h-20 bg-white/10 rounded-full"></div>
                            <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-white/10 rounded-full"></div>
                            
                            <div className="relative flex justify-between items-center">
                                <div>
                                    <h2 className="text-3xl font-bold mb-2">Админ влизане</h2>
                                    <p className="text-green-100">Влезте за достъп до админ панела</p>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="text-white hover:text-gray-200 hover:bg-white/10 p-2 rounded-full transition-all duration-200"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Form с подобрен стилизиране */}
                        <form onSubmit={handleLogin} className="p-8 space-y-6">
                            {/* Error Message с анимация */}
                            {error && (
                                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-r-xl animate-slideIn">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="font-medium">{error}</span>
                                    </div>
                                </div>
                            )}

                            {/* Email Field с икона */}
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-gray-700">
                                    Имейл адрес
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                        </svg>
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="admin@example.com"
                                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-200 text-gray-700 placeholder-gray-400"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Field с икона */}
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-gray-700">
                                    Парола
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-200 text-gray-700 placeholder-gray-400"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Submit Button с анимации */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 relative overflow-hidden ${
                                    isLoading
                                        ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                                        : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white transform hover:scale-105 shadow-lg hover:shadow-2xl active:scale-95'
                                }`}
                            >
                                {/* Button shine effect */}
                                {!isLoading && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                )}
                                
                                {isLoading ? (
                                    <div className="flex items-center justify-center space-x-3">
                                        <svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Влизам...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center space-x-2">
                                        <span>Влез в системата</span>
                                        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                )}
                            </button>
                        </form>

                        {/* Footer с декорация */}
                        <div className="bg-gradient-to-r from-gray-50 to-green-50 px-8 py-6 rounded-b-3xl border-t border-gray-100">
                            <div className="flex items-center justify-center space-x-2 text-gray-600">
                                <p className="text-sm font-medium">
                                    🔒 Само за администратори
                                </p>
                             
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ButtonAdmin;