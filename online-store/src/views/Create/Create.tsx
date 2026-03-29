import { useState } from "react";
import { addProduct } from "../../service/product";
import { uploadProductImage } from "../../utils/storage";
import { auth } from "../../config/firebase-config";
import toast from 'react-hot-toast';

const Create = () => {
    const [product, setProduct] = useState({
        title: '',
        description: '',
        imagePost: '',
        image: '',
        category: '',
        price: '',
        size: '',
        color: '',
        innerDiameterMm: '',
        piecesPerBox: '',
        tensileStrengthKg: '',
        rollLengthM: '',
        stapleType: '',
        chamberSizes: '',
        diameter: '',
        unwind: ''
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
        'mashini': {
            name: 'Машини',
            subcategories: {}
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

        // Price validation disabled per request
        /*
        if (!product.price || parseFloat(product.price) <= 0) {
            isValid = false;
            toast.error('Моля въведете валидна цена');
        }
        */

        if (!product.size.trim()) {
            isValid = false;
            toast.error('Моля въведете размер');
        }

        // color and the additional technical fields are optional

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
            const currentUser = auth.currentUser;
            if (!currentUser) {
                toast.error('Моля влезте в профила си, за да качите продукти');
                setIsLoading(false);
                setUploadingImages(false);
                return;
            }

            // Use user's UID as the top-level folder so rules like
            // "match /products/{userId}/{allFiles=**} { allow write: if request.auth.uid == userId }"
            // will allow authenticated users to write only into their own folder.
            const productId = `${currentUser.uid}/${Date.now().toString()}`;

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
                // price omitted by request
                product.size,
                product.color,
                product.innerDiameterMm,
                product.piecesPerBox,
                product.tensileStrengthKg,
                product.rollLengthM,
                product.stapleType,
                product.chamberSizes,
                product.diameter,
                product.unwind
            );

            setProduct({
                title: '',
                description: '',
                imagePost: '',
                image: '',
                category: '',
                price: '',
                size: '',
                color: '',
                innerDiameterMm: '',
                piecesPerBox: '',
                tensileStrengthKg: '',
                rollLengthM: '',
                stapleType: '',
                chamberSizes: '',
                diameter: '',
                unwind: ''
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
                                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-200 text-gray-700 placeholder-gray-400 dark:bg-white dark:text-black dark:placeholder-gray-500"
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
                                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-200 text-gray-700 placeholder-gray-400 resize-none dark:bg-white dark:text-black dark:placeholder-gray-500"
                                />
                            </div>

                            {/* Price and Size Row */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            

                              
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-gray-700">
                                        Размер
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="напр. S, M, L или 42, 44..."
                                        value={product.size}
                                        onChange={(e) => setProduct({ ...product, size: e.target.value })}
                                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-200 text-gray-700 placeholder-gray-400 dark:bg-white dark:text-black dark:placeholder-gray-500"
                                    />
                                </div>

                             
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-gray-700">
                                        Цвят
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="напр. Червен, Син или #ffffff"
                                        value={product.color}
                                        onChange={(e) => setProduct({ ...product, color: e.target.value })}
                                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-200 text-gray-700 placeholder-gray-400 dark:bg-white dark:text-black dark:placeholder-gray-500"
                                    />
                                </div>
                            </div>

                            {/* Additional technical parameters (optional) */}
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-gray-700 dark:text-black">Допълнителни параметри (опционално)</label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-xl border-2 border-gray-200">
                                    <div className="space-y-2">
                                        <label className="block text-xs font-medium text-gray-700 dark:text-black">Вътрешен диаметър на ролката (мм)</label>
                                        <input type="text" placeholder="мм" value={product.innerDiameterMm} onChange={e => setProduct({ ...product, innerDiameterMm: e.target.value })} className="w-full px-3 py-2 border rounded placeholder-gray-400 dark:bg-white dark:text-black dark:placeholder-gray-500" />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-xs font-medium text-gray-700 dark:text-black">Бр./кашон</label>
                                        <input type="text" placeholder="напр. 10" value={product.piecesPerBox} onChange={e => setProduct({ ...product, piecesPerBox: e.target.value })} className="w-full px-3 py-2 border rounded placeholder-gray-400 dark:bg-white dark:text-black dark:placeholder-gray-500" />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-xs font-medium text-gray-700 dark:text-black">Сила на опън при скъсване (кг)</label>
                                        <input type="text" placeholder="кг" value={product.tensileStrengthKg} onChange={e => setProduct({ ...product, tensileStrengthKg: e.target.value })} className="w-full px-3 py-2 border rounded placeholder-gray-400 dark:bg-white dark:text-black dark:placeholder-gray-500" />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-xs font-medium text-gray-700 dark:text-black">Дължина на ролка (м)</label>
                                        <input type="text" placeholder="м" value={product.rollLengthM} onChange={e => setProduct({ ...product, rollLengthM: e.target.value })} className="w-full px-3 py-2 border rounded placeholder-gray-400 dark:bg-white dark:text-black dark:placeholder-gray-500" />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-xs font-medium text-gray-700 dark:text-black">Тип скоби</label>
                                        <input type="text" placeholder="напр. Метални" value={product.stapleType} onChange={e => setProduct({ ...product, stapleType: e.target.value })} className="w-full px-3 py-2 border rounded placeholder-gray-400 dark:bg-white dark:text-black dark:placeholder-gray-500" />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-xs font-medium text-gray-700 dark:text-black">Подходящи за чембер размери</label>
                                        <input type="text" placeholder="напр. 400x600" value={product.chamberSizes} onChange={e => setProduct({ ...product, chamberSizes: e.target.value })} className="w-full px-3 py-2 border rounded placeholder-gray-400 dark:bg-white dark:text-black dark:placeholder-gray-500" />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-xs font-medium text-gray-700 dark:text-black">Диаметър</label>
                                        <input type="text" placeholder="мм" value={product.diameter} onChange={e => setProduct({ ...product, diameter: e.target.value })} className="w-full px-3 py-2 border rounded placeholder-gray-400 dark:bg-white dark:text-black dark:placeholder-gray-500" />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-xs font-medium text-gray-700 dark:text-black">Развиване</label>
                                        <input type="text" placeholder="описание" value={product.unwind} onChange={e => setProduct({ ...product, unwind: e.target.value })} className="w-full px-3 py-2 border rounded placeholder-gray-400 dark:bg-white dark:text-black dark:placeholder-gray-500" />
                                    </div>
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
                            <div className="bg-green-50 p-6 rounded-2xl border-2 border-green-200 shadow-lg">
                                <h3 className="text-lg font-bold text-green-800 mb-6 flex items-center">
                                    <svg className="w-6 h-6 mr-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                    Категоризация на продукта
                                </h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Main Category */}
                                    <div className="space-y-3">
                                        <label className="block text-sm font-bold text-green-800 flex items-center">
                                            <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                                            Основна категория
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={category}
                                                onChange={handleCategory}
                                                className="w-full px-4 py-4 border-2 border-green-300 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-200 text-green-800 bg-white shadow-sm appearance-none font-semibold"
                                            >
                                                <option value="">📦 Изберете категория</option>
                                                {Object.entries(categories).map(([key, cat]) => (
                                                    <option key={key} value={key}>
                                                        {cat.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Subcategory - показва се само ако избраната категория има подкатегории */}
                                    {category && categories[category as keyof typeof categories] && 
                                     Object.keys(categories[category as keyof typeof categories].subcategories).length > 0 && (
                                        <div className="space-y-3">
                                            <label className="block text-sm font-bold text-green-800 flex items-center">
                                                <span className="w-2 h-2 bg-emerald-600 rounded-full mr-2"></span>
                                                Подкатегория
                                            </label>
                                            <div className="relative">
                                                <select
                                                    value={subcategory}
                                                    onChange={handleSubcategory}
                                                    className="w-full px-4 py-4 border-2 border-green-300 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-200 text-green-800 bg-white shadow-sm appearance-none font-semibold"
                                                >
                                                    <option value="">🏷️ Изберете подкатегория</option>
                                                    {Object.entries(categories[category as keyof typeof categories].subcategories).map(([key, subcat]) => (
                                                        <option key={key} value={key}>
                                                            {subcat.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Показваме информация за избраната категория */}
                                {category && (
                                    <div className="mt-6 p-4 bg-white rounded-lg border-2 border-green-300 shadow-sm">
                                        <div className="flex items-center text-sm text-green-700">
                                            <svg className="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Избрана категория: <span className="font-bold text-green-800 ml-1">{categories[category as keyof typeof categories].name}</span>
                                            {subcategory && (
                                                <>
                                                    <span className="mx-2 text-green-600">→</span>
                                                    <span className="font-bold text-emerald-700">
                                                        {(categories[category as keyof typeof categories].subcategories as any)[subcategory].name}
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Показваме допълнителни опции ако подкатегорията има items */}
                            {subcategory && category && categories[category as keyof typeof categories] &&
                             (categories[category as keyof typeof categories].subcategories as any)[subcategory] &&
                             (categories[category as keyof typeof categories].subcategories as any)[subcategory].items.length > 0 && (
                                <div className="bg-emerald-50 p-6 rounded-2xl border-2 border-emerald-200 shadow-lg">
                                    <h3 className="text-lg font-bold text-emerald-800 mb-4 flex items-center">
                                        <svg className="w-6 h-6 mr-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a1.414 1.414 0 01-2.828 0l-7-7A1.414 1.414 0 013 12V7a4 4 0 014-4z" />
                                        </svg>
                                        Специализация на продукта
                                        <span className="ml-3 text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-medium border border-emerald-300">
                                            Опционално
                                        </span>
                                    </h3>
                                    
                                    <p className="text-sm text-emerald-700 mb-6 font-medium bg-white p-3 rounded-lg border border-emerald-200">
                                        💡 Изберете един или повече типове, които описват вашия продукт най-точно
                                    </p>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {(categories[category as keyof typeof categories].subcategories as any)[subcategory].items.map((item: string, index: number) => (
                                            <div key={index} className="group relative">
                                                <input
                                                    type="checkbox"
                                                    id={`item-${index}`}
                                                    className="sr-only peer"
                                                />
                                                <label
                                                    htmlFor={`item-${index}`}
                                                    className="flex items-center space-x-3 p-4 bg-white rounded-xl border-2 border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50 transition-all duration-200 cursor-pointer group-hover:shadow-md peer-checked:border-emerald-500 peer-checked:bg-emerald-50 peer-checked:shadow-lg"
                                                >
                                                    <div className="flex-shrink-0">
                                                        <div className="w-5 h-5 border-2 border-emerald-300 rounded peer-checked:border-emerald-500 peer-checked:bg-emerald-500 flex items-center justify-center transition-colors">
                                                            <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <span className="text-sm font-bold text-emerald-800 group-hover:text-emerald-700 peer-checked:text-emerald-700 transition-colors">
                                                            {item}
                                                        </span>
                                                    </div>
                                                    <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 peer-checked:opacity-100 transition-opacity">
                                                        <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <div className="mt-6 p-4 bg-green-100 rounded-lg border-2 border-green-300">
                                        <div className="flex items-start">
                                            <svg className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <p className="text-sm text-green-800 font-bold">
                                                <strong>Съвет:</strong> Колкото по-точно опишете продукта си, толкова по-лесно клиентите ще го намерят при търсене.
                                            </p>
                                        </div>
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