
const About = () => {
    return (
        <div className="min-h-screen  py-12">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Column 1 - Contact Form */}
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Свържете се с нас</h3>
                        <p className="text-gray-600 mb-6">
                            Вашият имейл адрес няма да бъде публикуван. Задължителните полета са маркирани с *
                        </p>
                        
                        <form className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Име и Фамилия *
                                </label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    required 
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700 mb-2">
                                    Телефон *
                                </label>
                                <input 
                                    type="tel" 
                                    id="phone-number" 
                                    name="phone-number" 
                                    required 
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Имейл *
                                </label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    required 
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                    Съобщение *
                                </label>
                                <textarea 
                                    id="message" 
                                    name="message" 
                                    required 
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                ></textarea>
                            </div>
                            
                            <button 
                                type="submit"
                                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
                            >
                                Изпрати
                            </button>
                        </form>
                    </div>

                    {/* Column 2 - Contact Info */}
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Тук сме, за да ви съдействаме</h3>
                        <p className="text-gray-600 mb-8">
                            Нашата врата е винаги отворена за клиенти и партньори. Не се колебайте да се свържете с нас – ние сме тук, за да обсъдим вашите нужди и да предложим най-доброто решение.
                        </p>
                
                        {/* Contact Details */}
                        <div className="space-y-6">
                            {/* Address */}
                            <div className="flex items-start space-x-6">
                                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-800">Адрес</h4>
                                    <p className="text-gray-600">
                                     ул.Георги Герасимов 2 гр.Пазрджик
                                    </p>
                                </div>
                            </div>

                            {/* Email & Phone */}
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-800">Контакти</h4>
                                    <p className="text-gray-600">
                                        Email: albayrak.ood@gmail.com<br />
                                        Телефон:   +359 882 042 698
                                    </p>
                                </div>
                            </div>

                            {/* Working Hours */}
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-800">Работно време</h4>
                                    <p className="text-gray-600">
                                        Понеделник - Петък: 9:00 - 18:00<br />
                                        Събота: 10:00 - 16:00<br />
                                        Неделя: Почивен ден
                                    </p>
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