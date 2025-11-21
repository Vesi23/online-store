import { useEffect, useState } from "react";
import { getAllProducts, deleteProduct } from "../../service/product";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import toast from "react-hot-toast";
import './Shop.css';

interface Product {
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
    createdOn: number;
}

const Shop = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [subcategory, setSubcategory] = useState("");
    const [showMobileFilters, setShowMobileFilters] = useState(false);

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

    const navigate = useNavigate();
    const { isLoggedIn } = useAppContext();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsData = await getAllProducts('');
                setProducts(productsData);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-green-50 via-white to-gray-50">
                <div className="relative">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-transparent bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-border"></div>
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-transparent border-green-500 absolute top-0 left-0 animate-reverse"></div>
                    <p className="mt-6 text-gray-700 font-bold text-xl animate-pulse">⚙️ Зареждане на машини...</p>
                </div>
            </div>
        );
    }

    // Helper to match product category stored in different formats
    const productMatchesSelectedCategory = (productCategoryRaw: string) => {
        const pCat = (productCategoryRaw || '').toString();

        // If no category selected, everything matches
        if (!category) return true;

        const catKey = category; // selected category key (slug)
        const catData = categories[catKey as keyof typeof categories];
        const catName = catData?.name || '';

        // If subcategory selected, check several possible stored formats:
        // - display name (e.g. 'Стреч фолио')
        // - slug path (e.g. 'opakovachni-konsumativii/strech-folio')
        // - just subkey (e.g. 'strech-folio')
        if (subcategory) {
            const subKey = subcategory;
            const subName = (catData?.subcategories as any)?.[subKey]?.name || '';

            if (!pCat) return false;
            if (pCat === subName) return true;
            if (pCat === `${catKey}/${subKey}`) return true;
            if (pCat === subKey) return true;
            // Sometimes saved as "catKey/subName" — check that too
            if (pCat === `${catKey}/${subName}`) return true;
            // Also consider if stored as "catName / subName"
            if (pCat === `${catName} / ${subName}`) return true;

            return false;
        }

        // No subcategory selected — match main category in different formats:
        // - display name (e.g. 'Опаковъчни консумативи')
        // - slug key (e.g. 'opakovachni-konsumativii')
        // - slug path starting with catKey (e.g. 'opakovachni-konsumativii/...')
        // - product saved as one of the subcategory display names
        if (!pCat) return false;

        if (pCat === catName) return true;
        if (pCat === catKey) return true;
        if (pCat.startsWith(`${catKey}/`)) return true;

        // if productCategory is one of the display names of the subcategories
        const subcats = (catData?.subcategories) || {};
        const subcatNames = Object.values(subcats).map((s: any) => s.name);
        if (subcatNames.includes(pCat)) return true;

        return false;
    };

    // Филтрирани продукти
    const filteredProducts = products.filter(p => {
        const matchesSearch = !search || p.title.toLowerCase().includes(search.toLowerCase());
        if (!matchesSearch) return false;

        // If no category filter selected, include
        if (!category) return true;

        return productMatchesSelectedCategory(p.category || '');
    });

    // Handle delete product
    const handleDeleteProduct = (productId: string, productTitle: string) => {
        toast((t) => (
            <div className="flex flex-col space-y-3">
                <div className="flex items-center space-x-2">
                    <span className="text-red-500 text-xl">🗑️</span>
                    <span className="font-semibold">Потвърждение за изтриване</span>
                </div>
                <p className="text-gray-600">
                    Сигурни ли сте, че искате да изтриете "{productTitle}"?
                </p>
                <div className="flex space-x-2 pt-2">
                    <button
                        onClick={async () => {
                            toast.dismiss(t.id);
                            try {
                                await deleteProduct(productId);
                                setProducts(prev => prev.filter(p => p.id !== productId));
                                toast.success(`Продуктът "${productTitle}" беше изтрит успешно`, {
                                    icon: '✅',
                                    duration: 3000,
                                });
                            } catch (error) {
                                console.error('Error deleting product:', error);
                                toast.error('Грешка при изтриване на продукта', {
                                    icon: '❌',
                                    duration: 4000,
                                });
                            }
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                        Изтрий
                    </button>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                        Отказ
                    </button>
                </div>
            </div>
        ), {
            duration: Infinity,
            style: {
                maxWidth: '400px',
                padding: '20px',
            },
        });
    };

    return (
        <div className="min-h-screen">
            {/* Header & Search */}
            <div className=" mx-auto pt-10 pb-6 px-6 background-shop-header">
                <h1 className="text-4xl font-black text-center mb-6 bg-gradient-to-r from-green-700 via-emerald-600 to-green-800 bg-clip-text text-transparent">
                    Нашите продукти
                </h1>

                {/* Search Bar */}
                <div className="flex gap-3 items-center mb-4 max-w-4xl mx-auto">
                    <div className="relative flex-1">
                        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Cleaners"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-lg"
                        />
                    </div>
                    <button
                        onClick={() => setShowMobileFilters(!showMobileFilters)}
                        className="p-3 bg-gray-100 rounded-xl border border-gray-300 hover:bg-gray-200 transition-colors lg:hidden"
                    >
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                    </button>
                    {/* Desktop filter button (hidden on mobile) */}
                    <button className="hidden lg:block p-3 bg-gray-100 rounded-xl border border-gray-300 hover:bg-gray-200 transition-colors">
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                    </button>
                </div>

            
            </div>

            {/* Mobile Categories Filter - показва се само при натискане */}
            {showMobileFilters && (
                <div className="lg:hidden max-w-7xl mx-auto px-6 mb-6 mt-5">
                    <div className="bg-white rounded-xl shadow-lg p-4 border border-black animate-in slide-in-from-top-5 duration-300">
                        <div className="flex items-center justify-between mb-3 ">
                            <h4 className="text-lg font-black text-gray-800">Категории</h4>
                            <div className="flex items-center gap-3">
                                <span className="text-sm text-gray-500">{filteredProducts.length} резултата</span>
                                <button
                                    onClick={() => setShowMobileFilters(false)}
                                    className="text-gray-400 hover:text-gray-600 p-1"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <button
                                onClick={() => {
                                    setCategory("");
                                    setSubcategory("");
                                }}
                                className={`w-full px-3 py-1.5 rounded-lg text-xs font-medium text-left ${category === "" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                            >
                                Всички категории
                            </button>
                            {Object.entries(categories).map(([key, cat]) => (
                                <div key={key} className="space-y-1">
                                    <button
                                        onClick={() => {
                                            if (category === key) {
                                                setCategory("");
                                                setSubcategory("");
                                            } else {
                                                setCategory(key);
                                                setSubcategory("");
                                            }
                                        }}
                                        className={`w-full px-3 py-1.5 rounded-lg text-xs font-medium text-left flex items-center justify-between ${category === key ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                                    >
                                        <span>{cat.name}</span>
                                        {Object.keys(cat.subcategories).length > 0 && (
                                            <svg
                                                className={`w-4 h-4 transform transition-transform ${category === key ? "rotate-90" : ""}`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        )}
                                    </button>

                                    {/* Подкатегории - показват се веднага под категорията */}
                                    {category === key && Object.keys(cat.subcategories).length > 0 && (
                                        <div className="ml-4 space-y-1 animate-in slide-in-from-top-2 duration-200">
                                            <button
                                                onClick={() => setSubcategory("")}
                                                className={`w-full px-2 py-1 rounded text-xs font-medium text-left ${subcategory === "" ? "bg-green-700 text-white" : "bg-green-100 text-green-700 hover:bg-green-200"}`}
                                            >
                                                • Всички
                                            </button>
                                            {Object.entries(cat.subcategories).map(([subKey, subcat]) => (
                                                <button
                                                    key={subKey}
                                                    onClick={() => setSubcategory(subKey)}
                                                    className={`w-full px-2 py-1 rounded text-xs font-medium text-left ${subcategory === subKey ? "bg-green-600 text-white" : "bg-green-100 text-green-700 hover:bg-green-200"}`}
                                                >
                                                    • {subcat.name}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2 mt-3">
                            <button
                                onClick={() => {
                                    setSearch("");
                                    setCategory("");
                                    setSubcategory("");
                                }}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
                            >
                                Изчисти филтрите
                            </button>
                            <button
                                onClick={() => setShowMobileFilters(false)}
                                className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800"
                            >
                                Готово
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Products Container */}
            <div className="flex max-w-7xl mx-auto px-6 gap-6 ">
                {/* Left Sidebar - Hidden on mobile */}
                <div className="hidden lg:block w-64 flex-shrink-0">
                    <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4 mt-5 mb-5">

                        {/* Categories */}
                        <div className="mb-6">
                            <h4 className="text-lg font-black text-gray-800 mb-3">Категории</h4>
                            <div className="space-y-2">
                                <button
                                    onClick={() => {
                                        setCategory("");
                                        setSubcategory("");
                                    }}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm ${category === "" ? "bg-gray-900 text-white" : "hover:bg-gray-100"}`}
                                >
                                    Всички категории
                                </button>
                                {Object.entries(categories).map(([key, cat]) => (
                                    <div key={key} className="space-y-1">
                                        <button
                                            onClick={() => {
                                                if (category === key) {
                                                    setCategory("");
                                                    setSubcategory("");
                                                } else {
                                                    setCategory(key);
                                                    setSubcategory("");
                                                }
                                            }}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between group ${category === key ? "bg-gray-900 text-white" : "hover:bg-gray-100"}`}
                                        >
                                            <span>{cat.name}</span>
                                            {Object.keys(cat.subcategories).length > 0 && (
                                                <svg
                                                    className={`w-4 h-4 transform transition-transform ${category === key ? "rotate-90" : ""}`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            )}
                                        </button>

                                        {/* Подкатегории - показват се веднага под категорията */}
                                        {category === key && Object.keys(cat.subcategories).length > 0 && (
                                            <div className="ml-4 space-y-1 animate-in slide-in-from-top-2 duration-200">
                                                <button
                                                    onClick={() => setSubcategory("")}
                                                    className={`w-full text-left px-2 py-1.5 rounded text-xs ${subcategory === "" ? "bg-green-600 text-white" : "bg-green-50 text-green-700 hover:bg-green-100"}`}
                                                >
                                                    • Всички
                                                </button>
                                                {Object.entries(cat.subcategories).map(([subKey, subcat]) => (
                                                    <button
                                                        key={subKey}
                                                        onClick={() => setSubcategory(subKey)}
                                                        className={`w-full text-left px-2 py-1.5 rounded text-xs ${subcategory === subKey ? "bg-green-600 text-white" : "bg-green-50 text-green-700 hover:bg-green-100"}`}
                                                    >
                                                        • {subcat.name}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => {
                                    setSearch("");
                                    setCategory("");
                                    setSubcategory("");
                                }}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Content - Full width on mobile */}
                <div className="flex-1">
                    {filteredProducts.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="text-8xl mb-8 animate-bounce">🛒</div>
                            <h3 className="text-3xl font-bold text-gray-700 mb-6">Няма продукти</h3>
                            <p className="text-xl text-gray-500">Скоро ще има налични продукти!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6">
                            {filteredProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="group rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-emerald-400 flex flex-col mt-5 mb-5 bg-white hover:-translate-y-1 relative"
                                >
                                    {/* Admin delete button */}
                                    {isLoggedIn && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteProduct(product.id, product.title);
                                            }}
                                            className="absolute top-2 right-2 z-10 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-colors duration-200"
                                            title="Изтрий продукт"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    )}

                                    <div
                                        onClick={() => navigate(`/product/${product.id}`)}
                                        className="cursor-pointer flex flex-col h-full"
                                    >
                                        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-white min-h-[180px]">
                                            <img
                                                src={product.imagePost || '/images/placeholder.jpg'}
                                                alt={product.title}
                                                onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/images/placeholder.jpg'; }}
                                                className="w-full h-full object-contain bg-white p-4 group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute top-3 left-3 bg-emerald-500 text-white rounded-full px-3 py-1 text-xs font-bold shadow-lg whitespace-nowrap">
                                                {product.size || ''}
                                            </div>
                                        </div>

                                        <div className="p-4 pt-6 flex-1 flex flex-col bg-gray-50">
                                            <h3 className="font-bold text-gray-800 mb-3 line-clamp-2 text-sm lg:text-base leading-tight">{product.title}</h3>

                                            <div className="mt-auto">
                                                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 rounded-lg p-2">
                                                    {/* VAT badge - responsive: shown as pill, moves above prices on small screens */}
                                                    <div className="order-0 flex items-center gap-2 mb-1">
                                                        <span className="inline-flex items-center bg-emerald-100 text-emerald-800 text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
                                                            <span className="whitespace-nowrap">Цена с ДДС:</span>
                                                        </span>
                                                    </div>

                                                    {/* Prices */}
                                                    <div className="order-0 sm:order-1 flex items-center gap-3">
                                                        <div className="flex flex-col text-center">
                                                            <span className="text-sm font-bold">{product.priceBGN?.toFixed(2) || product.price?.toFixed(2) || '0.00'} лв.</span>
                                                        </div>
                                                        <div className="h-4 w-px bg-gray-300"></div>
                                                        <div className="flex flex-col text-center">
                                                            <span className="text-sm font-bold">€{product.priceEUR?.toFixed(2) || (product.price / 1.95583).toFixed(2)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Shop;
