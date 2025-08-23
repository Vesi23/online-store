
import { useState } from 'react';
import { addFeedbackMessage } from '../../service/feedback';
import "./About.css";

const About = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await addFeedbackMessage(
                formData.name,
                formData.phone,
                formData.email,
                formData.message
            );
            setIsSubmitted(true);
            setFormData({
                name: '',
                phone: '',
                email: '',
                message: ''
            });
            // Hide success message after 5 seconds
            setTimeout(() => {
                setIsSubmitted(false);
            }, 5000);
        } catch (error) {
            console.error('Грешка при изпращане на съобщението:', error);
            alert('Възникна грешка при изпращане на съобщението. Моля опитайте отново.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen  via-white to-indigo-100 py-16 text-color ">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto px-6 mb-16 ">
                <div className="text-center">
                    <h1 className="text-5xl font-black mb-6 bg-gradient-to-r from-blue-600 via-green-400 to-indigo-700 bg-clip-text text-transparent">
                        За нас
                    </h1>
                    <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed text-justify">
                        Свържете се с нас и открийте как можем да ви помогнем да постигнете целите си
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Column 1 - Contact Form */}
                    <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1">
                        <div className="mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-3xl font-bold text-gray-800 mb-3">Свържете се с нас</h3>
                            <p className="text-gray-500 text-start">
                                Вашият имейл адрес няма да бъде публикуван. Задължителните полета са маркирани с *
                            </p>
                        </div>
                        
                        <form className="space-y-8 text-start text-gray-500" onSubmit={handleSubmit}>
                            {isSubmitted && (
                                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-800 px-6 py-4 rounded-2xl shadow-lg animate-pulse">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Съобщението е изпратено успешно! Ще се свържем с вас скоро.
                                    </div>
                                </div>
                            )}
                            
                            <div className="relative text-start">
                                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-3">
                                    Име и Фамилия *
                                </label>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        id="name" 
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required 
                                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 text-lg placeholder-gray-400"
                                        placeholder="Въведете вашето име"
                                    />
                                </div>
                            </div>
                            
                            <div className="relative text-start">
                                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-3">
                                    Телефон *
                                </label>
                                <input 
                                    type="tel" 
                                    id="phone" 
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required 
                                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 text-lg placeholder-gray-400"
                                    placeholder="+359 ..."
                                />
                            </div>
                            
                            <div className="relative">
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-3">
                                    Имейл *
                                </label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required 
                                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 text-lg placeholder-gray-400"
                                    placeholder="your.email@example.com"
                                />
                            </div>
                            
                            <div className="relative">
                                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-3">
                                    Съобщение *
                                </label>
                                <textarea 
                                    id="message" 
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required 
                                    rows={6}
                                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 text-lg placeholder-gray-400 resize-none"
                                    placeholder="Как можем да ви помогнем?"
                                ></textarea>
                            </div>
                            
                            <button 
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-green-600 to-blue-500 text-white py-4 px-6 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] shadow-xl hover:shadow-2xl"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Изпраща се...
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center ">
                                        Изпрати съобщението
                                    </div>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Column 2 - Contact Info */}
                    <div className="bg-gradient-to-br from-blue-100 to-green-200 rounded-3xl shadow-2xl p-10 border border-gray-300 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1">
                        <div className="mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                </svg>
                            </div>
                            <h3 className="text-3xl font-bold text-gray-800 mb-3 ">Тук сме, за да ви съдействаме</h3>
                            <p className="text-gray-700 text-lg leading-relaxed text-justify">
                                Нашата врата е винаги отворена за клиенти и партньори. Не се колебайте да се свържете с нас – ние сме тук, за да обсъдим вашите нужди и да предложим най-доброто решение.
                            </p>
                        </div>
                
                        {/* Contact Details */}
                        <div className="space-y-8 text-start">
                            {/* Address */}
                            <div className="flex items-start space-x-6 p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200 hover:bg-white/80 transition-all duration-300 shadow-lg">
                                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-gray-800 mb-2">Адрес</h4>
                                    <p className="text-gray-700 text-base">
                                        ул.Георги Герасимов 2<br />
                                        гр.Пазарджик
                                    </p>
                                </div>
                            </div>

                            {/* Email & Phone */}
                            <div className="flex items-start space-x-6 p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200 hover:bg-white/80 transition-all duration-300 shadow-lg">
                                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-gray-800 mb-2">Контакти</h4>
                                    <div className="space-y-1">
                                        <p className="text-gray-700 text-base">
                                        albayrak.ood@gmail.com
                                        </p>
                                        <p className="text-gray-700 text-base">
                                            📱 +359 882 042 698
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Working Hours */}
                            <div className="flex items-start space-x-6 p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200 hover:bg-white/80 transition-all duration-300 shadow-lg">
                                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-gray-800 mb-2">Работно време</h4>
                                    <div className="text-gray-700 text-base space-y-1">
                                        <p>🕘 Понеделник - Петък: 9:00 - 18:00</p>
                                        <p>🕐 Събота: 10:00 - 16:00</p>
                                        <p>🛌 Неделя: Почивен ден</p>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>

                {/* Map Section */}
                <div className="mt-16">
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                        {/* Map Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-green-500 px-8 py-6">
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mr-4">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white">Намерете ни на картата</h3>
                                    <p className="text-blue-100">ул.Георги Герасимов 2, гр.Пазарджик</p>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Map */}
                        <div className="relative">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2944.8234567890123!2d24.3333333!3d42.1969444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14acd1c2e123456c%3A0x7b8c9d0e1f234567!2z0YPQuy7Qk9C10L7RgNCz0Lgg0JPQtdGA0LDRgdC40LzQvtCyIDIsINCf0LDQt9Cw0YDQtNC20LjQug!5e0!3m2!1sen!2sbg!4v1234567890123!5m2!1sen!2sbg"
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="w-full"
                                title="Албайрак ЕООД - ул.Георги Герасимов 2, гр.Пазарджик"
                            ></iframe>
                            
                            {/* Map overlay with contact info */}
                            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-200 max-w-xs">
                                <div className="flex items-center mb-2">
                                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mr-2">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <h4 className="font-bold text-gray-800">Албайрак ЕООД</h4>
                                </div>
                                <p className="text-sm text-gray-600 mb-1 text-start">📍 ул.Георги Герасимов 2</p>
                                <p className="text-sm text-gray-600 mb-2 text-start">гр.Пазарджик</p>
                                <div className="text-xs text-gray-500 text-start">
                                    <p>📞 +359 882 042 698</p>
                                    <p>✉️ albayrak.ood@gmail.com</p>
                                </div>
                            </div>

                            {/* Directions button */}
                            <div className="absolute bottom-4 right-4">
                                <a
                                    href="https://www.google.com/maps/dir//ул.Георги+Герасимов+2,+Пазарджик"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                    </svg>
                                    Насоки
                                </a>
                            </div>
                        </div>

                        {/* Map Footer with additional info */}
                        <div className="bg-gray-50 px-8 py-6 border-t border-gray-100">
                            <div className="flex flex-wrap justify-center md:justify-between gap-4 text-center">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2">
                                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div className="text-left">
                                        <p className="text-xs font-semibold text-gray-800">Работни дни</p>
                                        <p className="text-xs text-gray-600">9:00 - 18:00</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        </svg>
                                    </div>
                                    <div className="text-left">
                                        <p className="text-xs font-semibold text-gray-800">Паркиране</p>
                                        <p className="text-xs text-gray-600">Безплатно</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-2">
                                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div className="text-left">
                                        <p className="text-xs font-semibold text-gray-800">Контакт</p>
                                        <p className="text-xs text-gray-600">24/7 поддръжка</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          
        </div>
    );
};

export default About;