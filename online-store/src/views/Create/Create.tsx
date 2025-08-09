import { useState } from "react";
import { addProduct } from "../../service/product";
import { uploadProductImage } from "../../utils/storage";

const Create = () => {
    const [product, setProduct] = useState({
        title: '',
        description: '',
        imagePost: '',
        image: '',
        category: ''
    });

    const [category, setCategory] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [uploadingImages, setUploadingImages] = useState(false);

    const handleCategory = (e: any) => {
        setCategory(e.target.value);
    }
    // Handle image selection and preview
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const totalFiles = selectedImages.length + files.length;
        if (totalFiles > 10) {
            alert("Може да качите максимум 10 снимки!");
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
            alert('Title must be between 3 and 60 characters');
        }

        if (product.description.length < 10 || product.description.length > 1500) {
            isValid = false;
            alert('Description must be between 10 and 1500 characters');
        }

        if (selectedImages.length === 0) {
            isValid = false;
            alert('Моля добавете поне една снимка');
        }

        // if (!category) {
        //     isValid = false;
        //     alert('Моля изберете категория');
        // }

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
                    alert(`Грешка при качване на снимка ${i + 1}`);
                    return;
                }
            }

            // Използвай първата снимка като главна (imagePost)
            const mainImage = imageUrls[0];
            // Останалите снимки като допълнителни (или всички като JSON string)
            const allImages = JSON.stringify(imageUrls);

            await addProduct(
                product.title,
                product.description,
                mainImage, // главна снимка
                allImages, // всички снимки като JSON
                category
            );

            setProduct({
                title: '',
                description: '',
                imagePost: '',
                image: '',
                category: ''
            });
            setCategory('');
            setSelectedImages([]);
            setImagePreviews([]);

            alert('Product created successfully');
        } catch (error) {
            alert('Error creating product');
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

                            {/* Category Select */}
                            <div className="space-y-2">
                                {/* Image Upload */}
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
                                <label className="block text-sm font-bold text-gray-700">
                                    Категория
                                </label>
                                <select
                                    value={category}
                                    onChange={handleCategory}
                                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-200 text-gray-700 bg-white"
                                >
                                    <option value="">Изберете категория</option>
                                    <option value="electronics">Електроника</option>
                                    <option value="fashion">Мода</option>
                                    <option value="home">Дом и градина</option>
                                    <option value="sports">Спорт</option>
                                    <option value="books">Книги</option>
                                    <option value="beauty">Красота</option>
                                </select>
                            </div>

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