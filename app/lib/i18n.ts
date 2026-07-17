import type { Language } from "./menu-data";

export const languageOptions: Array<{
  code: Language;
  label: string;
  nativeLabel: string;
}> = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "ar", label: "Arabic", nativeLabel: "العربية" },
];

export const externalLinks = {
  maps: "https://maps.app.goo.gl/qXakqWmumtpBbZjL7",
  instagram: "https://www.instagram.com/kopi.coffeeg/",
} as const;

export const copy = {
  en: {
    skipToMenu: "Skip to menu",
    brand: "Kopi",
    headerMenu: "Menu",
    location: "Location",
    instagram: "Instagram",
    openLocation: "Open Kopi on Google Maps",
    openInstagram: "Open Kopi on Instagram",
    switchLanguage: "Switch language",
    heroEyebrow: "Café menu",
    heroTitle: "Kopi Menu",
    heroDescription: "Coffee, matcha, bakery, salads, sandwiches, pizza, and desserts for QR guests.",
    categoryCount: "category",
    categoryCountPlural: "categories",
    categoryEyebrow: "Menu category",
    categoriesHeading: "Categories",
    categoriesLabel: "Menu categories",
    currentCategory: "Current category",
    menuHeading: "Menu",
    itemsCount: "items",
    itemCount: "item",
    priceUnit: "EGP",
    unavailableDescription: "Description unavailable",
    emptyCategory: "No items available in this category.",
    footerTagline: "Thanks for visiting Kopi.",
    footerNote: "Prices are shown exactly as provided in the menu source.",
  },
  ar: {
    skipToMenu: "تخطي إلى القائمة",
    brand: "Kopi",
    headerMenu: "القائمة",
    location: "الموقع",
    instagram: "إنستجرام",
    openLocation: "فتح موقع Kopi على خرائط Google",
    openInstagram: "فتح صفحة Kopi على إنستجرام",
    switchLanguage: "تغيير اللغة",
    heroEyebrow: "منيو الكافيه",
    heroTitle: "منيو Kopi",
    heroDescription: "قهوة وماتشا ومخبوزات وسلطات وساندويتشات وبيتزا وحلويات لضيوف QR.",
    categoryCount: "تصنيف",
    categoryCountPlural: "تصنيفات",
    categoryEyebrow: "تصنيف المنيو",
    categoriesHeading: "التصنيفات",
    categoriesLabel: "تصنيفات المنيو",
    currentCategory: "التصنيف الحالي",
    menuHeading: "القائمة",
    itemsCount: "أصناف",
    itemCount: "صنف",
    priceUnit: "ج.م",
    unavailableDescription: "الوصف غير متاح",
    emptyCategory: "لا توجد أصناف متاحة في هذا التصنيف.",
    footerTagline: "نورت Kopi.",
    footerNote: "الأسعار معروضة كما وردت في مصدر المنيو.",
  },
} satisfies Record<Language, Record<string, string>>;
