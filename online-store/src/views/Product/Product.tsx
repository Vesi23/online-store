import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, updateProduct } from '../../service/product';
import { useAppContext } from '../../context/appContext';
import toast from 'react-hot-toast';

interface ProductType {
    id: string;
    title: string;
    description: string;
    imagePost: string;
    image: string;
    category: string;
    price: number;
    priceBGN: number;
    priceEUR: number;
    size: string;
    createdOn: string | number;
}
const Product = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { isLoggedIn } = useAppContext();
    const [product, setProduct] = useState<ProductType | null>(null);
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState<string[]>([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [editForm, setEditForm] = useState({
        title: '',
        description: '',
        category: '',
        price: '',
        size: '',
        imagePost: '',
        image: ''
    });

    // Структура с категории и подкатегории
    const categories = {
        'opakovachni-konsumativii': {
            name: 'Опаковъчни консумативи',
            subcategories: {
                'strech-folio': {
                    name: 'Стреч фолио',
                    items: ['Ръчно', 'Машинно']
                },
                'termosvivaemo-folio': {
                    name: 'Термосвиваемо фолио', 
                    items: ['Полиолефин', 'PVC фолио', 'Термо PE-фолио']
                },
                'plikove-aerofolio': {
                    name: 'Пликове с аерофолио',
                    items: []
                },
                'chember-lenti': {
                    name: 'Чембер ленти',
                    items: ['Метален чембер', 'Полиестерен чембер', 'Полипропиленов чембер', 'Никшов чембер']
                },
                'skovi-chember': {
                    name: 'Скоби за чембер',
                    items: []
                },
                'dispensari-chember': {
                    name: 'Диспенсъри за чембер',
                    items: []
                },
                'predpazni-vagli': {
                    name: 'Предпазни въгли',
                    items: []
                },
                'tikso': {
                    name: 'Тиксо',
                    items: ['Ръчно', 'Машинно']
                },
                'dispensari-tikso': {
                    name: 'Диспенсъри за тиксо',
                    items: []
                },
                'zashtitno-opakovane': {
                    name: 'Защитно опаковане',
                    items: ['Аерофолио', 'Разпенен полиетилен', 'За запълване на обеми', 'Предпазни торби']
                }
            }
        },
        'opakovachni-mashini': {
            name: 'Опаковъчни машини',
            subcategories: {
                'strech-mashini': {
                    name: 'Стреч машини',
                    items: ['Полуавтоматични', 'Автоматични', 'Роботизирани']
                },
                'vakuum-mashini': {
                    name: 'Вакуум машини',
                    items: ['Камерни', 'Външно засмукване', 'Двойно затваряне']
                },
                'termosvivaemi-mashini': {
                    name: 'Термосвиващи машини',
                    items: ['Тунелни', 'L-образни', 'Комбинирани']
                },
                'etiketirovachni': {
                    name: 'Етикетировачни машини',
                    items: ['Ръчни', 'Полуавтоматични', 'Автоматични']
                }
            }
        },
        'krepezhni-sistemi': {
            name: 'Крепежни системи',
            subcategories: {
                'chember-sistemi': {
                    name: 'Чембер системи',
                    items: ['Ръчни инструменти', 'Пневматични инструменти', 'Консумативи']
                },
                'vezivni-materiali': {
                    name: 'Вързващи материали',
                    items: ['Полипропиленови ленти', 'Полиестерни ленти', 'Стоманени ленти']
                },
                'zashtitni-elementi': {
                    name: 'Защитни елементи',
                    items: ['Ъглови предпазители', 'Защитни плочки', 'Амортизиращи материали']
                }
            }
        },
        'kompresori': {
            name: 'Компресори',
            subcategories: {
                'butalovi': {
                    name: 'Бутални компресори',
                    items: ['Едноцилиндрови', 'Двуцилиндрови', 'Многоцилиндрови']
                },
                'vintovi': {
                    name: 'Винтови компресори',
                    items: ['С ремъчна предавка', 'С директно задвижване', 'Променливи обороти']
                },
                'rezervoari': {
                    name: 'Въздушни резервоари',
                    items: ['Вертикални', 'Хоризонтални', 'Мобилни']
                }
            }
        },
        'pnevmatichni-instrumenti': {
            name: 'Пневматични инструменти',
            subcategories: {
                'udarnii': {
                    name: 'Ударни инструменти',
                    items: ['Пневматични чукове', 'Ударни гайковерти', 'Пневматични дълбачки']
                },
                'rotacionnii': {
                    name: 'Ротационни инструменти',
                    items: ['Пневматични бормашини', 'Шлайфмашини', 'Полирмашини']
                },
                'rezeshti': {
                    name: 'Режещи инструменти',
                    items: ['Пневматични ножици', 'Отрезни машини', 'Пили']
                }
            }
        },
        'skladova-tehnika': {
            name: 'Складова техника',
            subcategories: {
                'paletonosachi': {
                    name: 'Палетоносачи',
                    items: ['Ръчни', 'Електрически', 'Полуелектрически']
                },
                'motokari': {
                    name: 'Мотокари',
                    items: ['Електрически', 'Дизелови', 'Газови']
                },
                'skladovi-kolички': {
                    name: 'Складови колички',
                    items: ['Платформени', 'Кутийни', 'Специализирани']
                }
            }
        },
        'presi-otpadaci': {
            name: 'Преси за отпадъци',
            subcategories: {
                'vertikalni-presi': {
                    name: 'Вертикални преси',
                    items: ['Малки', 'Средни', 'Големи']
                },
                'horizontalni-presi': {
                    name: 'Хоризонтални преси',
                    items: ['Полуавтоматични', 'Автоматични', 'Непрекъснати']
                },
                'kompaktori': {
                    name: 'Компактори',
                    items: ['За контейнери', 'Стационарни', 'Мобилни']
                }
            }
        }
    };

    const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategory = e.target.value;
        setCategory(selectedCategory);
        setSubcategory('');
        
        // Parse current category from editForm to maintain structure
        const finalCategory = subcategory ? `${selectedCategory}/${subcategory}` : selectedCategory;
        setEditForm(prev => ({
            ...prev,
            category: finalCategory
        }));
    };

    const handleSubcategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedSubcategory = e.target.value;
        setSubcategory(selectedSubcategory);
        
        // Combine category and subcategory for final value
        const finalCategory = selectedSubcategory ? `${category}/${selectedSubcategory}` : category;
        setEditForm(prev => ({
            ...prev,
            category: finalCategory
        }));
    };

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;
            
            try {
                const productData = await getProductById(id);
                if (productData && productData.length > 0) {
                    setProduct(productData[0]);
                    
                    // Initialize edit form with current product data
                    setEditForm({
                        title: productData[0].title,
                        description: productData[0].description,
                        category: productData[0].category,
                        price: productData[0].price.toString(),
                        size: productData[0].size,
                        imagePost: productData[0].imagePost,
                        image: productData[0].image
                    });

                    // Parse category and subcategory from product
                    const productCategory = productData[0].category;
                    
                    // Find matching category and subcategory by name
                    let foundCategoryKey = '';
                    let foundSubcategoryKey = '';
                    
                    for (const [catKey, catData] of Object.entries(categories)) {
                        if (catData.name === productCategory) {
                            foundCategoryKey = catKey;
                            break;
                        }
                        
                        // Check subcategories
                        for (const [subKey, subData] of Object.entries(catData.subcategories)) {
                            if (subData.name === productCategory) {
                                foundCategoryKey = catKey;
                                foundSubcategoryKey = subKey;
                                break;
                            }
                        }
                        
                        if (foundCategoryKey) break;
                    }
                    
                    if (foundCategoryKey) {
                        setCategory(foundCategoryKey);
                        if (foundSubcategoryKey) {
                            setSubcategory(foundSubcategoryKey);
                        }
                    }
                    
                    // Parse images from JSON string
                    try {
                        const parsedImages = JSON.parse(productData[0].image || '[]');
                        setImages(Array.isArray(parsedImages) ? parsedImages : [productData[0].imagePost]);
                    } catch {
                        setImages([productData[0].imagePost]);
                    }
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveEdit = async () => {
        if (!id || !product) return;
        
        // Строим пълната категория
        let finalCategory = category;
        if (subcategory && categories[category as keyof typeof categories]) {
            const subcatData = (categories[category as keyof typeof categories].subcategories as any)[subcategory];
            if (subcatData) {
                finalCategory = subcatData.name;
            }
        } else if (category && categories[category as keyof typeof categories]) {
            finalCategory = categories[category as keyof typeof categories].name;
        }
        
        try {
            await updateProduct(
                id,
                editForm.title,
                editForm.description,
                editForm.imagePost,
                editForm.image,
                finalCategory || editForm.category,
                editForm.price,
                editForm.size
            );
            
            // Update local state
            setProduct({
                ...product,
                title: editForm.title,
                description: editForm.description,
                category: finalCategory || editForm.category,
                price: parseFloat(editForm.price),
                priceBGN: parseFloat(editForm.price),
                priceEUR: parseFloat(editForm.price) / 1.95583,
                size: editForm.size,
                imagePost: editForm.imagePost,
                image: editForm.image
            });
            
            setIsEditing(false);
            setCategory('');
            setSubcategory('');
            toast.success('Продуктът беше обновен успешно!');
        } catch (error) {
            console.error('Error updating product:', error);
            toast.error('Грешка при обновяване на продукта');
        }
    };

    const handleCancelEdit = () => {
        if (product) {
            setEditForm({
                title: product.title,
                description: product.description,
                category: product.category,
                price: product.price.toString(),
                size: product.size,
                imagePost: product.imagePost,
                image: product.image
            });
        }
        setCategory('');
        setSubcategory('');
        setIsEditing(false);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                <p className="ml-4 text-gray-600">Loading product...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h1>
                <button 
                    onClick={() => navigate('/shop')}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Back to Shop
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen  from-slate-800 via-slate-700 to-gray-800">
            {/* Back Button */}
            <div className="max-w-5xl mx-auto px-5 pt-5">
                <button 
                    onClick={() => navigate('/shop')}
                    className="group flex items-center bg-gradient-to-r from-emerald-600 to-green-600 text-white px-4 py-2 rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105 hover:from-emerald-500 hover:to-green-500 mb-6 border border-emerald-400/30"
                >
                    <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="font-semibold text-sm tracking-wide">Назад към продуктите</span>
                </button>
            </div>

            <div className="max-w-7xl mx-auto px-6 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left - Images Section */}
                    <div>
                        {/* Main Image */}
                        <div className="w-full max-w-sm lg:max-w-md mx-auto overflow-hidden rounded-2xl bg-gradient-to-br from-slate-200 to-slate-100 shadow-2xl relative group mb-4 ring-2 ring-slate-600/20">
                            <div className="aspect-square bg-gradient-to-br from-slate-100 to-white">
                                <img
                                    src={images[selectedImageIndex] || product.imagePost}
                                    alt={product.title}
                                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-lg"
                                />
                            </div>
                            
                            {/* Image counter */}
                            {images.length > 1 && (
                                <div className="absolute bottom-4 right-4 bg-slate-800/90 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm">
                                    {selectedImageIndex + 1} / {images.length}
                                </div>
                            )}
                            
                            {/* Navigation arrows for main image */}
                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={() => setSelectedImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-slate-800/80 hover:bg-slate-700 text-white rounded-full p-2 shadow-xl transition-all duration-200 opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => setSelectedImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-slate-800/80 hover:bg-slate-700 text-white rounded-full p-2 shadow-xl transition-all duration-200 opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </>
                            )}
                        </div>
                        
                        {/* Thumbnail Images Row - Bottom */}
                        {images.length > 1 && (
                            <div className="relative max-w-sm lg:max-w-md mx-auto">
                                <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 justify-center">
                                    {images.slice(0, 5).map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImageIndex(index)}
                                            className={`w-12 h-12 lg:w-16 lg:h-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all shadow-lg ${
                                                selectedImageIndex === index 
                                                    ? 'border-emerald-400 shadow-emerald-400/50 ring-2 ring-emerald-400/30' 
                                                    : 'border-slate-500 hover:border-slate-400 shadow-slate-500/30'
                                            }`}
                                        >
                                            <div className="w-full h-full bg-gradient-to-br from-slate-100 to-white">
                                                <img
                                                    src={image}
                                                    alt={`${product.title} ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </button>
                                    ))}
                                    
                                    {/* Show more indicator if there are more than 5 images */}
                                    {images.length > 5 && (
                                        <div className="w-12 h-12 lg:w-16 lg:h-16 flex-shrink-0 border-2 border-dashed border-slate-400 bg-slate-600/20 rounded-lg flex items-center justify-center text-slate-300 text-xs backdrop-blur-sm">
                                            +{images.length - 5}
                                        </div>
                                    )}
                                </div>
                                
                                {/* Scroll indicators */}
                                {images.length > 5 && (
                                    <div className="flex justify-center mt-2 gap-1">
                                        {Array.from({ length: Math.ceil(images.length / 5) }).map((_, pageIndex) => (
                                            <div
                                                key={pageIndex}
                                                className={`w-2 h-2 rounded-full transition-colors ${
                                                    Math.floor(selectedImageIndex / 5) === pageIndex 
                                                        ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50' 
                                                        : 'bg-slate-500'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right - Product Info Section */}
                    <div className="bg-white font-black  to-slate-900 rounded-2xl shadow-2xl p-4 lg:p-8 ring-1 ring-slate-600/50">
                        {/* Admin Edit Button */}
                        {isLoggedIn && (
                            <div className="mb-4 lg:mb-6 flex flex-col sm:flex-row gap-2">
                                {!isEditing ? (
                                    <button
                                        onClick={handleEditToggle}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 lg:px-4 py-2 rounded-lg text-xs lg:text-sm font-medium transition-colors duration-200 w-full sm:w-auto"
                                    >
                                        ✏️ Редактирай
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            onClick={handleSaveEdit}
                                            className="bg-green-500 hover:bg-green-600 text-white px-3 lg:px-4 py-2 rounded-lg text-xs lg:text-sm font-medium transition-colors duration-200 flex-1 sm:flex-none"
                                        >
                                            ✅ Запази
                                        </button>
                                        <button
                                            onClick={handleCancelEdit}
                                            className="bg-gray-500 hover:bg-gray-600 text-white px-3 lg:px-4 py-2 rounded-lg text-xs lg:text-sm font-medium transition-colors duration-200 flex-1 sm:flex-none"
                                        >
                                            ❌ Откажи
                                        </button>
                                    </>
                                )}
                            </div>
                        )}

                        {/* Category Selection */}
                        <div className="mb-4 lg:mb-6">
                            {isEditing ? (
                                <div className="bg-green-50 p-3 lg:p-4 rounded-2xl border-2 border-green-200 shadow-lg">
                                    <h4 className="text-sm lg:text-md font-bold text-green-800 mb-3 lg:mb-4 flex items-center">
                                        <svg className="w-4 h-4 lg:w-5 lg:h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                        Категория на продукта
                                    </h4>
                                    
                                    <div className="grid grid-cols-1 gap-3 lg:gap-4">
                                        {/* Main Category */}
                                        <div className="space-y-2">
                                            <label className="block text-xs lg:text-sm font-bold text-green-800 flex items-center">
                                                <span className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-green-600 rounded-full mr-2"></span>
                                                Основна категория
                                            </label>
                                            <div className="relative">
                                                <select
                                                    value={category}
                                                    onChange={handleCategory}
                                                    className="w-full px-2 lg:px-3 py-2 lg:py-2 border-2 border-green-300 rounded-lg lg:rounded-xl focus:border-green-500 focus:ring-2 lg:focus:ring-4 focus:ring-green-500/20 transition-all duration-200 text-green-800 bg-white shadow-sm appearance-none font-semibold text-sm lg:text-base"
                                                >
                                                    <option value="">📦 Изберете категория</option>
                                                    {Object.entries(categories).map(([key, cat]) => (
                                                        <option key={key} value={key}>
                                                            {cat.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 lg:pr-3 pointer-events-none">
                                                    <svg className="w-3 h-3 lg:w-4 lg:h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Subcategory - показва се само ако избраната категория има подкатегории */}
                                        {category && categories[category as keyof typeof categories] && 
                                         Object.keys(categories[category as keyof typeof categories].subcategories).length > 0 && (
                                            <div className="space-y-2">
                                                <label className="block text-xs lg:text-sm font-bold text-green-800 flex items-center">
                                                    <span className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-emerald-600 rounded-full mr-2"></span>
                                                    Подкатегория
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        value={subcategory}
                                                        onChange={handleSubcategory}
                                                        className="w-full px-2 lg:px-3 py-2 lg:py-2 border-2 border-green-300 rounded-lg lg:rounded-xl focus:border-green-500 focus:ring-2 lg:focus:ring-4 focus:ring-green-500/20 transition-all duration-200 text-green-800 bg-white shadow-sm appearance-none font-semibold text-sm lg:text-base"
                                                    >
                                                        <option value="">🏷️ Изберете подкатегория</option>
                                                        {Object.entries(categories[category as keyof typeof categories].subcategories).map(([key, subcat]) => (
                                                            <option key={key} value={key}>
                                                                {subcat.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 lg:pr-3 pointer-events-none">
                                                        <svg className="w-3 h-3 lg:w-4 lg:h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Показваме информация за избраната категория */}
                                        {category && (
                                            <div className="mt-2 p-2 bg-white rounded-lg border-2 border-green-300 shadow-sm">
                                                <div className="flex flex-col sm:flex-row sm:items-center text-xs lg:text-sm text-green-700 gap-1 sm:gap-0">
                                                    <div className="flex items-center">
                                                        <svg className="w-3 h-3 mr-1 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <span className="font-medium">Избрано:</span>
                                                    </div>
                                                    <div className="flex flex-wrap items-center gap-1 ml-4 sm:ml-2">
                                                        <span className="font-bold text-green-800">
                                                            {categories[category as keyof typeof categories]?.name || category}
                                                        </span>
                                                        {subcategory && categories[category as keyof typeof categories]?.subcategories && (
                                                            <>
                                                                <span className="text-green-600 mx-1">→</span>
                                                                <span className="font-bold text-emerald-700">
                                                                    {(categories[category as keyof typeof categories].subcategories as any)[subcategory]?.name || subcategory}
                                                                </span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <span className="inline-block bg-gradient-to-r from-emerald-500 to-green-500 text-white px-3 py-1.5 lg:px-4 lg:py-2 rounded-full text-xs lg:text-sm font-bold shadow-lg shadow-emerald-500/30">
                                    {product.category}
                                </span>
                            )}
                        </div>

                        {/* Product Title */}
                        <div className="mb-4 lg:mb-6">
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="title"
                                    value={editForm.title}
                                    onChange={handleInputChange}
                                    className="text-lg sm:text-xl lg:text-4xl font-black text-black leading-tight drop-shadow-lg w-full border-2 border-gray-300 rounded-lg p-2 lg:p-3"
                                    placeholder="Заглавие на продукта"
                                />
                            ) : (
                                <h1 className="text-xl sm:text-2xl lg:text-4xl font-black text-black leading-tight drop-shadow-lg">
                                    {product.title}
                                </h1>
                            )}
                        </div>

                        {/* Size Info */}
                        <div className="mb-4 lg:mb-6 p-3 lg:p-4 bg-gray-100 rounded-xl border border-gray-300 backdrop-blur-sm">
                            <div className="flex items-center">
                                <svg className="w-4 h-4 lg:w-5 lg:h-5 mr-2 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                <span className="text-black font-semibold text-sm lg:text-base">Размер: </span>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="size"
                                        value={editForm.size}
                                        onChange={handleInputChange}
                                        className="ml-1 text-sm lg:text-base border border-gray-300 rounded px-2 py-1"
                                        placeholder="Размер"
                                    />
                                ) : (
                                    <span className="text-gray-700 ml-1 text-sm lg:text-base">{product.size || 'Не е посочен'}</span>
                                )}
                            </div>
                        </div>

                        {/* Prices */}
                        <div className="mb-6 lg:mb-8 p-3 lg:p-6 bg-emerald-50 rounded-2xl border border-emerald-200 shadow-lg">
                            {isEditing ? (
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0">
                                    <span className="text-xs lg:text-sm font-medium text-emerald-700 mr-0 sm:mr-2">Цена (лв.):</span>
                                    <input
                                        type="number"
                                        name="price"
                                        value={editForm.price}
                                        onChange={handleInputChange}
                                        step="0.01"
                                        className="text-base sm:text-lg lg:text-2xl font-black text-emerald-700 border border-emerald-300 rounded px-2 py-1 w-full sm:w-auto max-w-32"
                                        placeholder="0.00"
                                    />
                                </div>
                            ) : (
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 lg:gap-6">
                                    <div className="flex flex-col text-center">
                                        <span className="text-base sm:text-lg lg:text-2xl font-black text-emerald-700">
                                            {product.priceBGN?.toFixed(2) || product.price?.toFixed(2) || '0.00'} лв.
                                        </span>
                                    </div>
                                    <div className="hidden sm:block h-8 lg:h-12 w-px bg-emerald-400 shadow-lg shadow-emerald-400/20"></div>
                                    <div className="flex flex-col text-center">
                                        <span className="text-base sm:text-lg lg:text-2xl font-black text-emerald-700">
                                            €{product.priceEUR?.toFixed(2) || (product.price / 1.95583).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>


                        {/* Description */}
                        <div className="mb-6 lg:mb-8">
                            <h3 className="text-base sm:text-lg lg:text-2xl font-bold text-black mb-3 lg:mb-4 flex items-center drop-shadow-lg">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2 lg:mr-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Описание
                            </h3>
                            <div className="p-3 lg:p-4 rounded-xl border border-gray-300 backdrop-blur-sm bg-white">
                                {isEditing ? (
                                    <textarea
                                        name="description"
                                        value={editForm.description}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className="w-full text-start leading-relaxed text-xs sm:text-sm lg:text-base border-none resize-none outline-none min-h-[80px] sm:min-h-[100px] lg:min-h-[120px]"
                                        placeholder="Описание на продукта..."
                                    />
                                ) : (
                                    <p className="text-justify text-gray-600 leading-relaxed whitespace-pre-wrap text-xs sm:text-sm lg:text-base">
                                        {product.description}
                                    </p>
                                )}
                            </div>  
                        </div>

                        {/* Product Info Footer */}
                        <div className="border-t border-gray-300 pt-4 lg:pt-6">
                            <div className="flex items-center text-xs lg:text-sm text-gray-600">
                                <svg className="w-3 h-3 lg:w-4 lg:h-4 mr-2 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-4 8a2 2 0 100-4 2 2 0 000 4zm0 0v4a2 2 0 002 2h.01M12 12h.01" />
                                </svg>
                                <span className="font-medium">Добавен на:</span>
                                <span className="ml-2">{new Date(product.createdOn).toLocaleDateString('bg-BG')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;