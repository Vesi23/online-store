import "./Footer.css";
import { useState } from 'react';
import ButtonAdmin from "../ButtonAdmin/ButtonAdmin";

const Footer = () => {
    const [showAdminModal, setShowAdminModal] = useState(false);
    return (
        <footer className="bg-gradient-to-br from-green-100 via-emerald-50 to-green-200 text-black py-16 mt-auto relative overflow-hidden border-t border-green-300">
            {/* Background decoration with tree elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-96 h-96 bg-green-400 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-400 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
                
                {/* Tree elements */}
                <div className="absolute top-10 left-10 text-green-300/30 transform rotate-12">
                    <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"/>
                        <path d="M11 12V22H13V12H11Z" fill="currentColor" opacity="0.8"/>
                    </svg>
                </div>
                
                <div className="absolute bottom-16 right-20 text-green-300/25 transform -rotate-45">
                    <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 6,18C7.15,18.5 8.5,18.75 10,18.75C10.4,18.75 10.8,18.7 11.2,18.65L12.5,16C13,14 12.8,11.5 11,10.5C15,10.5 19,10.5 17,8Z"/>
                    </svg>
                </div>
                
                <div className="absolute top-1/2 left-1/4 text-green-200/20">
                    <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12,6A3,3 0 0,0 9,9A3,3 0 0,0 12,12A3,3 0 0,0 15,9A3,3 0 0,0 12,6M12,8A1,1 0 0,1 13,9A1,1 0 0,1 12,10A1,1 0 0,1 11,9A1,1 0 0,1 12,8Z"/>
                        <path d="M12,3L8,7H16L12,3Z"/>
                        <path d="M11,22H13V12H11V22Z"/>
                    </svg>
                </div>
                
                <div className="absolute bottom-1/3 left-1/2 text-emerald-300/15 transform rotate-90">
                    <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12,2L15.09,8.26L22,9L17,14L18.18,21L12,17.77L5.82,21L7,14L2,9L8.91,8.26L12,2Z"/>
                        <rect x="11" y="12" width="2" height="10" fill="currentColor" opacity="0.7"/>
                    </svg>
                </div>
            </div>
            
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Logo & Company Section */}
                    <div className="text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start mb-6">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full blur opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
                                <img
                                    src="/images/logo.JPG"
                                    alt="Logo"
                                    className="relative h-16 w-16 rounded-full border-2 border-black cursor-pointer transform hover:scale-110 transition-all duration-300 shadow-2xl"
                                    onClick={() => setShowAdminModal(true)}
                                />
                            </div>
                            <div className="ml-4">
                                <h3 className="text-2xl font-black bg-gradient-to-r from-black to-gray-800 bg-clip-text text-transparent">
                                    Albayrak EOOD
                                </h3>
                                <p className="text-black text-sm mt-1">Качество и доверие</p>
                            </div>
                        </div>
                        <p className="text-black leading-relaxed max-w-sm mx-auto md:mx-0">
                            Водещ доставчик на професионални услуги и решения. Вашият партньор за успех от 2020 година.
                        </p>
                    </div>



                    {/* Contact Information */}
                    <div className="text-center md:text-left">
                        <h4 className="text-xl font-bold mb-6 text-black flex items-center justify-center md:justify-start">
                            <svg className="w-5 h-5 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Информация за контакт
                        </h4>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                            <div className="flex items-center group">
                                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-2 group-hover:scale-110 transition-transform">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-black hover:text-gray-700 transition-colors text-sm">+359 882 042 698</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center group">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-2 group-hover:scale-110 transition-transform">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-black hover:text-gray-700 transition-colors text-sm">albayrak.ood@gmail.com</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center group">
                                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-2 group-hover:scale-110 transition-transform">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-black hover:text-gray-700 transition-colors text-sm">
                                        ул.Георги Герасимов 2, гр.Пазарджик
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Social Media & Links */}
                    <div className="text-center md:text-left">
                        <h4 className="text-xl font-bold mb-6 text-black flex items-center justify-center md:justify-start">
                            <svg className="w-5 h-5 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                           Свържи се с нас
                        </h4>
                        
                        {/* Social Media Icons */}
                        <div className="flex justify-center md:justify-start space-x-4 mb-8">
                            {/* Instagram */}
                            <a
                                href="https://www.instagram.com/albayrak_eood/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative"
                            >
                                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-30 group-hover:opacity-70 transition-all duration-300"></div>
                                <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-2xl">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </div>
                            </a>

                            {/* Facebook */}
                            <a
                                href="https://www.facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative"
                            >
                                <div className="absolute -inset-1 bg-blue-600 rounded-xl blur opacity-30 group-hover:opacity-70 transition-all duration-300"></div>
                                <div className="relative bg-blue-600 p-3 rounded-xl transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-2xl">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </div>
                            </a>

                            {/* WhatsApp */}
                            <a
                                href="https://wa.me/359882042698"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative"
                            >
                                <div className="absolute -inset-1 bg-green-500 rounded-xl blur opacity-30 group-hover:opacity-70 transition-all duration-300"></div>
                                <div className="relative bg-green-500 p-3 rounded-xl transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-2xl">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                                    </svg>
                                </div>
                            </a>

                            {/* TikTok */}
                            <a
                                href="https://www.tiktok.com/@albayrak.eood"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative"
                            >
                                <div className="absolute -inset-1 bg-black rounded-xl blur opacity-30 group-hover:opacity-70 transition-all duration-300"></div>
                                <div className="relative bg-black p-3 rounded-xl transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-2xl">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                                    </svg>
                                </div>
                            </a>
                        </div>
                        
                        {/* Working Hours */}
                        <div className="bg-white rounded-2xl p-6 border border-black">
                            <h5 className="text-lg font-semibold mb-4 text-black flex items-center">
                                <svg className="w-5 h-5 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Работно време
                            </h5>
                            <div className="space-y-2 text-black">
                                <p className="flex justify-between items-center">
                                    <span>Понеделник - Събота:</span>
                                    <span className="text-green-600 font-medium">9:00 - 18:00</span>
                                </p>
                                {/* <p className="flex justify-between items-center">
                                    <span>Събота:</span>
                                    <span className="text-yellow-600 font-medium"></span>
                                </p> */}
                                <p className="flex justify-between items-center">
                                    <span>Неделя:</span>
                                    <span className="text-yellow-600 font-medium">10:00 - 16:00</span>
                                </p>
                            </div>
                        </div>  
                    </div>
                </div>


             
            </div>

            {/* Admin Modal */}
            {showAdminModal && (
                <ButtonAdmin showLogin={true} onClose={() => setShowAdminModal(false)} />
            )}
        </footer>
    );
};

export default Footer;