import { useState } from "react";
import { addProduct } from "../../service/product";
import { uploadProductImage } from "../../utils/storage";
import toast from 'react-hot-toast';

const Create = () => {
    const [product, setProduct] = useState({
        title: '',
        description: '',
        imagePost: '',
        image: '',
        category: '',
        price: '',
        size: ''
    });

    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [uploadingImages, setUploadingImages] = useState(false);

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
            subcategories: {}
        },
        'krepezhni-sistemi': {
            name: 'Крепежни системи',
            subcategories: {}
        },
        'kompresori': {
            name: 'Компресори',
            subcategories: {}
        },
        'pnevmatichni-instrumenti': {
            name: 'Пневматични инструменти',
            subcategories: {}
        },
        'skladova-tehnika': {
            name: 'Складова техника',
            subcategories: {}
        },
        'presi-otpadaci': {
            name: 'Преси за отпадъци',
            subcategories: {}
        }
    };

    const handleCategory = (e: any) => {
        setCategory(e.target.value);
        setSubcategory(''); // Нулираме подкатегорията при смяна на основната категория
    };

    const handleSubcategory = (e: any) => {
        setSubcategory(e.target.value);
    };
    // Handle image selection and preview
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const totalFiles = selectedImages.length + files.length;
        if (totalFiles > 10) {
            toast.error("Може да качите максимум 10 снимки!");
            return;
        }

        setSelectedImages(prev => [...prev, ...files]);

        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setImagePreviews(prev => [...prev, ev.target?.result as string]);
            };
            reader.readAsDataURL(file);
        });
    };

    // Remove image from preview and selected images
    const removeImage = (index: number) => {
        setSelectedImages(prev => prev.filter((_, i) => i !== index));
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
    };
    const createProduct = async () => {
        let isValid = true;

        if (product.title.length < 3 || product.title.length > 60) {
            isValid = false;
            toast.error('Заглавието трябва да е между 3 и 60 символа');
        }

        if (product.description.length < 10 || product.description.length > 1500) {
            isValid = false;
            toast.error('Описанието трябва да е между 10 и 1500 символа');
        }

        if (selectedImages.length === 0) {
            isValid = false;
            toast.error('Моля добавете поне една снимка');
        }

        if (!product.price || parseFloat(product.price) <= 0) {
            isValid = false;
            toast.error('Моля въведете валидна цена');
        }

        if (!product.size.trim()) {
            isValid = false;
            toast.error('Моля въведете размер');
        }

        if (!category) {
            isValid = false;
            toast.error('Моля изберете категория');
        }

        // Проверка за подкатегория само ако основната категория има подкатегории
        const selectedCategory = categories[category as keyof typeof categories];
        if (selectedCategory && Object.keys(selectedCategory.subcategories).length > 0 && !subcategory) {
            isValid = false;
            toast.error('Моля изберете подкатегория');
        }

        if (!isValid) {
            return;
        }

        setIsLoading(true);
        setUploadingImages(true);

        try {
            const productId = Date.now().toString();

            // Качи всички снимки
            const imageUrls: string[] = [];
            for (let i = 0; i < selectedImages.length; i++) {
                try {
                    const imageUrl = await uploadProductImage(selectedImages[i], productId);
                    imageUrls.push(imageUrl);
                } catch (error) {
                    console.error(`Error uploading image ${i + 1}:`, error);
                    toast.error(`Грешка при качване на снимка ${i + 1}`);
                    return;
                }
            }

            // Използвай първата снимка като главна (imagePost)
            const mainImage = imageUrls[0];
            // Останалите снимки като допълнителни (или всички като JSON string)
            const allImages = JSON.stringify(imageUrls);

            // Комбинираме категория и подкатегория
            const finalCategory = subcategory ? `${category}/${subcategory}` : category;

            await addProduct(
                product.title,
                product.description,
                mainImage, // главна снимка
                allImages, // всички снимки като JSON
                finalCategory,
                product.price,
                product.size
            );

            setProduct({
                title: '',
                description: '',
                imagePost: '',
                image: '',
                category: '',
                price: '',
                size: ''
            });
            setCategory('');
            setSubcategory('');
            setSelectedImages([]);
            setImagePreviews([]);

            toast.success('Продуктът е създаден успешно!');
        } catch (error) {
            console.error('Error creating product:', error);
            toast.error('Възникна грешка при създаване на продукта');
        } finally {
            setIsLoading(false);
            setUploadingImages(false);
        }
    }

    return (
        <div className=" my-10 py-12">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4 text-white">
                        Добави Нов Продукт
                    </h1>
                </div>

                {/* Form Container */}
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                        {/* Form Header */}
                        <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-white p-8">
                            <div className="flex items-center space-x-3">
                                <h2 className="text-2xl font-bold">Продукт Информация</h2>
                            </div>
                        </div>

                        {/* Form Body */}
                        <div className="p-8 space-y-6">
                            {/* Title Input */}
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-gray-700">
                                    Заглавие на продукта
                                </label>
                                <input
                                    type="text"
                                    placeholder="Въведете заглавие на продукта..."
                                    value={product.title}
                                    onChange={(e) => setProduct({ ...product, title: e.target.value })}
                                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-200 text-gray-700 placeholder-gray-400"
                                />
                            </div>

                            {/* Description Textarea */}
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-gray-700">
                                    Описание
                                </label>
                                <textarea
                                    placeholder="Въведете подробно описание на продукта..."
                                    value={product.description}
                                    onChange={(e) => setProduct({ ...product, description: e.target.value })}
                                    rows={5}
                                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-200 text-gray-700 placeholder-gray-400 resize-none"
                                />
                            </div>

                            {/* Price and Size Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Price Input */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-gray-700">
                                        Цена (лв.)
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            placeholder="0.00"
                                            value={product.price}
                                            onChange={(e) => setProduct({ ...product, price: e.target.value })}
                                            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-200 text-gray-700 placeholder-gray-400"
                                        />
                                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                            <span className="text-gray-500 font-medium">лв.</span>
                                        </div>
                                    </div>
                                    {product.price && parseFloat(product.price) > 0 && (
                                        <div className="text-sm text-gray-600 mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                                    </svg>
                                                    <span className="font-medium text-blue-700">Цена в евро:</span>
                                                </div>
                                                <span className="font-bold text-green-600">
                                                    €{(parseFloat(product.price) / 1.95583).toFixed(2)}
                                                </span>
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">
                                                Курс: 1 EUR = 1.95583 BGN
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Size Input */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-gray-700">
                                        Размер
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="напр. S, M, L или 42, 44..."
                                        value={product.size}
                                        onChange={(e) => setProduct({ ...product, size: e.target.value })}
                                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-200 text-gray-700 placeholder-gray-400"
                                    />
                                </div>
                            </div>

                            {/* Image Upload */}
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-gray-700">
                                    Снимки на продукта (до 10)
                                </label>
                                <div className="flex items-center justify-center w-full">
                                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg className="w-8 h-8 mb-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500">
                                                <span className="font-semibold">Кликни за качване</span> или влачи файл
                                            </p>
                                            <p className="text-xs text-gray-500">PNG, JPG, GIF (до 10 снимки)</p>
                                        </div>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>

                                {imagePreviews.length > 0 && (
                                    <div className="mt-4">
                                        <p className="text-sm text-gray-600 mb-2">
                                            Избрани снимки ({imagePreviews.length}/10):
                                        </p>
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                            {imagePreviews.map((url, idx) => (
                                                <div key={idx} className="relative group">
                                                    <img
                                                        src={url}
                                                        alt={`preview-${idx}`}
                                                        className="w-full h-24 object-cover rounded-lg border-2 border-gray-200"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeImage(idx)}
                                                        className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        ×
                                                    </button>
                                                    {idx === 0 && (
                                                        <div className="absolute bottom-1 left-1 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                                                            Главна
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Category and Subcategory Selection */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Main Category */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-gray-700">
                                        Основна категория
                                    </label>
                                    <select
                                        value={category}
                                        onChange={handleCategory}
                                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-200 text-gray-700 bg-white"
                                    >
                                        <option value="">Изберете категория</option>
                                        {Object.entries(categories).map(([key, cat]) => (
                                            <option key={key} value={key}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Subcategory - показва се само ако избраната категория има подкатегории */}
                                {category && categories[category as keyof typeof categories] && 
                                 Object.keys(categories[category as keyof typeof categories].subcategories).length > 0 && (
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-gray-700">
                                            Подкатегория
                                        </label>
                                        <select
                                            value={subcategory}
                                            onChange={handleSubcategory}
                                            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-200 text-gray-700 bg-white"
                                        >
                                            <option value="">Изберете подкатегория</option>
                                            {Object.entries(categories[category as keyof typeof categories].subcategories).map(([key, subcat]) => (
                                                <option key={key} value={key}>
                                                    {subcat.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>

                            {/* Показваме допълнителни опции ако подкатегорията има items */}
                            {subcategory && categories[category as keyof typeof categories] &&
                             categories[category as keyof typeof categories].subcategories[subcategory] &&
                             categories[category as keyof typeof categories].subcategories[subcategory].items.length > 0 && (
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-gray-700">
                                        Тип продукт
                                    </label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {categories[category as keyof typeof categories].subcategories[subcategory].items.map((item, index) => (
                                            <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                                                <input
                                                    type="checkbox"
                                                    id={`item-${index}`}
                                                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                                />
                                                <label htmlFor={`item-${index}`} className="text-sm text-gray-700 cursor-pointer">
                                                    {item}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                onClick={createProduct}
                                disabled={isLoading}
                                className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 relative overflow-hidden ${isLoading
                                    ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                                    : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white transform hover:scale-105 shadow-lg hover:shadow-2xl active:scale-95'
                                    }`}
                            >
                                {/* Button shine effect */}
                                {!isLoading && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-1000"></div>
                                )}

                                {isLoading ? (
                                    <div className="flex items-center justify-center space-x-3">
                                        <svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>
                                            {uploadingImages ? 'Качване на снимки...' : 'Създаване...'}
                                        </span>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center space-x-2">
                                        <span>Публикувай</span>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    </div>
                                )}
                            </button>
                        </div>


                        {/* Form Footer */}
                        <div className="bg-gradient-to-r from-gray-50 to-green-50 px-8 py-6 border-t border-gray-100">
                            <div className="flex items-center justify-center space-x-2 text-gray-600">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-sm font-medium">
                                    Моля, попълнете всички полета преди създаване
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Create;