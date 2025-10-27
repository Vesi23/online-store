import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Превод ресурси
const resources = {
  bg: {
    translation: {
      // Header
      "home": "Начало",
      "shop": "Магазин",
      "about": "За нас",
      "categories": "Категории",
      "feedback": "Обратна връзка",
      // Admin
      "admin": "Админ",
      "create_product": "Създай продукт",
      "logout": "Изход",
      
      // Home страница
      "welcome": "Добре дошли в нашия онлайн магазин",
      "featured_products": "Препоръчани продукти",
      "shop_now": "Пазарувай сега",
      "learn_more": "Научи повече",
      "best_quality_price": "Искаш най-доброто съотношение",
      "price_quality": "цена–качество?",
      "we_are_here": "Ние от Albayrak EOOD сме тук за теб!",
      "contact_us_btn": "СВЪРЖИ СЕ С НАС",
      "our_products_title": "Нашите",
      "products": "Продукти",
      "albayrak_about": "В Albayrak EOOD",
      "packaging_importance": "знаем колко е важно опаковането да бъде",
      "safe_convenient_fast": "сигурно, удобно и бързо.",
      "product_range_text": "Затова предлагаме подбрана гама от продукти, които отговарят на нуждите на всеки бизнес – от малки складове до големи логистични центрове.",
      "our_products_btn": "Нашите Продукти",
      
      // Shop страница
      "search_products": "Търси продукти...",
      "all_categories": "Всички категории", 
      "found_products": "Намерени продукти",
      "no_products_found": "Няма намерени продукти",
      "confirm_delete": "Сигурни ли сте, че искате да изтриете този продукт?",
      "product_deleted": "Продуктът е изтрит успешно!",
      "delete_error": "Грешка при изтриване на продукт",
      "translating": "Превеждане",
      
      // About страница
      "about_us": "За нас",
      "our_story": "Нашата история",
      "our_mission": "Нашата мисия",
      
      // Footer
      "contact_info": "Контактна информация",
      "phone": "Телефон",
      "email": "Имейл",
      "address": "Адрес",
      "follow_us": "Последвайте ни",
      
      // Общи
      "loading": "Зарежда...",
      "error": "Грешка",
      "success": "Успех",
      "cancel": "Отказ",
      "save": "Запази",
      "delete": "Изтрий",
      "edit": "Редактирай",
      "add": "Добави",
      "price": " Цена с ДДС",
      "category": "Категория",
      "description": "Описание",
      "name": "Име",
      "image": "Изображение"
    }
  },
  en: {
    translation: {
      // Header
      "home": "Home",
      "shop": "Shop",
      "about": "About",
      "categories": "Categories",
      "feedback": "Feedback",
      // Admin
      "admin": "Admin",
      "create_product": "Create Product",
      "logout": "Logout",
      
      // Home page
      "welcome": "Welcome to our online store",
      "featured_products": "Featured Products",
      "shop_now": "Shop Now",
      "learn_more": "Learn More",
      "best_quality_price": "Want the best",
      "price_quality": "price-quality ratio?",
      "we_are_here": "We from Albayrak EOOD are here for you!",
      "contact_us_btn": "CONTACT US",
      "our_products_title": "Our",
      "products": "Products",
      "albayrak_about": "At Albayrak EOOD",
      "packaging_importance": "we know how important packaging is to be",
      "safe_convenient_fast": "safe, convenient and fast.",
      "product_range_text": "That's why we offer a curated range of products that meet the needs of every business - from small warehouses to large logistics centers.",
      "our_products_btn": "Our Products",
      
      // Shop page
      "search_products": "Search products...",
      "all_categories": "All categories",
      "found_products": "Products found",
      "no_products_found": "No products found",
      "confirm_delete": "Are you sure you want to delete this product?",
      "product_deleted": "Product deleted successfully!",
      "delete_error": "Error deleting product",
      "translating": "Translating",
      
      // About page
      "about_us": "About Us",
      "our_story": "Our Story",
      "our_mission": "Our Mission",
      
      // Footer
      "contact_info": "Contact Information",
      "phone": "Phone",
      "email": "Email",
      "address": "Address",
      "follow_us": "Follow Us",
      
      // Common
      "loading": "Loading...",
      "error": "Error",
      "success": "Success",
      "cancel": "Cancel",
      "save": "Save",
      "delete": "Delete",
      "edit": "Edit",
      "add": "Add",
      "price": "Price",
      "category": "Category",
      "description": "Description",
      "name": "Name",
      "image": "Image"
    }
  },
  tr: {
    translation: {
      // Header
      "home": "Ana Sayfa",
      "shop": "Mağaza",
      "about": "Hakkımızda",
      "categories": "Kategoriler",
      "feedback": "Geri Bildirim",
      // Admin
      "admin": "Yönetici",
      "create_product": "Ürün Oluştur",
      "logout": "Çıkış",
      
      // Home page
      "welcome": "Online mağazamıza hoş geldiniz",
      "featured_products": "Öne Çıkan Ürünler",
      "shop_now": "Şimdi Alışveriş Yap",
      "learn_more": "Daha Fazla Öğren",
      "best_quality_price": "En iyi",
      "price_quality": "fiyat-kalite oranını mı istiyorsunuz?",
      "we_are_here": "Albayrak EOOD olarak sizin için buradayız!",
      "contact_us_btn": "BİZİMLE İLETİŞİME GEÇİN",
      "our_products_title": "Bizim",
      "products": "Ürünlerimiz",
      "albayrak_about": "Albayrak EOOD'de",
      "packaging_importance": "ambalajın ne kadar önemli olduğunu biliyoruz",
      "safe_convenient_fast": "güvenli, kullanışlı ve hızlı.",
      "product_range_text": "Bu nedenle küçük depolardan büyük lojistik merkezlere kadar her işletmenin ihtiyaçlarını karşılayan özenle seçilmiş bir ürün yelpazesi sunuyoruz.",
      "our_products_btn": "Ürünlerimiz",
      
      // Shop page
      "search_products": "Ürün ara...",
      "all_categories": "Tüm kategoriler",
      "found_products": "Bulunan ürünler",
      "no_products_found": "Ürün bulunamadı",
      "confirm_delete": "Bu ürünü silmek istediğinizden emin misiniz?",
      "product_deleted": "Ürün başarıyla silindi!",
      "delete_error": "Ürün silinirken hata oluştu",
      "translating": "Çevriliyor",
      
      // About page
      "about_us": "Hakkımızda",
      "our_story": "Hikayemiz",
      "our_mission": "Misyonumuz",
      
      // Footer
      "contact_info": "İletişim Bilgileri",
      "phone": "Telefon",
      "email": "E-posta",
      "address": "Adres",
      "follow_us": "Bizi Takip Edin",
      
      // Common
      "loading": "Yükleniyor...",
      "error": "Hata",
      "success": "Başarılı",
      "cancel": "İptal",
      "save": "Kaydet",
      "delete": "Sil",
      "edit": "Düzenle",
      "add": "Ekle",
      "price": "Fiyat",
      "category": "Kategori",
      "description": "Açıklama",
      "name": "İsim",
      "image": "Resim"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'bg',
    debug: false,

    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage'],
    },
  });

export default i18n;
