export type Language = "en" | "ar";

export type LocalizedText = Record<Language, string>;

export interface MenuItem {
  id: string;
  name: LocalizedText;
  price: number;
  description?: LocalizedText;
  image?: string;
}

export interface MenuCategory {
  id: string;
  sourceHeading: string;
  name: LocalizedText;
  items: MenuItem[];
}

const item = (
  id: string,
  en: string,
  ar: string,
  price: number,
): MenuItem => ({
  id,
  name: { en, ar },
  price,
});

export const menuCategories: MenuCategory[] = [
  {
    id: "hot-coffee",
    sourceHeading: "Hot Coffee",
    name: { en: "Hot Coffee", ar: "قهوة ساخنة" },
    items: [
      item("espresso", "ESPRESSO", "إسبرسو", 90),
      item("americano", "AMERICANO", "أمريكانو", 100),
      item("macchitao", "MACCHITAO", "ماكياتو", 100),
      item("cortado", "CORTADO", "كورتادو", 105),
      item("flat-white", "FLAT WHITE", "فلات وايت", 110),
      item("cappuccino", "CAPPUCCINO", "كابتشينو", 110),
      item("latte", "LATTE", "لاتيه", 120),
      item("spanish-latte", "SPANISH LATTE", "سبانش لاتيه", 150),
      item("white-mocha-latte", "WHITE MOCHA LATTE", "وايت موكا لاتيه", 171),
      item("dark-mokha-latte", "DARK MOKHA LATTE", "دارك موكا لاتيه", 171),
      item("pistachio-latte", "PISTACHIO LATTE", "بيستاشيو لاتيه", 195),
      item("hazelnut-latte", "HAZELNUT LATTE", "هازلنات لاتيه", 145),
      item("salted-caramel-latte", "SALTED CARAMEL LATTE", "سولتد كراميل لاتيه", 155),
      item("caramel-latte", "CARAMEL LATTE", "كراميل لاتيه", 155),
      item("nutella-latte", "NUTELLA LATTE", "نوتيلا لاتيه", 163),
      item("peanut-butter-latte", "PEANUT BUTTER LATTE", "بينت بتر لاتيه", 155),
      item("lotus-latte", "LOTUS LATTE", "لوتس لاتيه", 175),
    ],
  },
  {
    id: "ice-coffee",
    sourceHeading: "Ice Coffe",
    name: { en: "Ice Coffee", ar: "قهوة مثلجة" },
    items: [
      item("ice-americana", "ICE AMERICANA", "آيس أمريكانا", 100),
      item("ice-latte", "ICE LATTE", "آيس لاتيه", 122),
      item("ice-spanish-latte", "ICE SPANISH LATTE", "آيس سبانش لاتيه", 150),
      item("ice-white-mocha-latte", "ICE WHITE MOCHA LATTE", "آيس وايت موكا لاتيه", 171),
      item("ice-dark-mocha-latte", "ICE DARK MOCHA LATTE", "آيس دارك موكا لاتيه", 171),
      item("ice-pistachio-latte", "ICE PISTACHIO LATTE", "آيس بيستاشيو لاتيه", 195),
      item("ice-hazelnut-latte", "ICE HAZELNUT LATTE", "آيس هازلنات لاتيه", 145),
      item("ice-salted-caramel-latte", "ICE SALTED CARAMEL LATTE", "آيس سولتد كراميل لاتيه", 150),
      item("ice-caramel", "ICE CARAMEL", "آيس كراميل", 150),
      item("ice-nutella-latte", "ICE NUTELLA LATTE", "آيس نوتيلا لاتيه", 163),
      item("ice-peanut-butter-latte", "ICE PEANUT BUTTER LATTE", "آيس بينت بتر لاتيه", 140),
      item("ice-lotus-latte", "ICE LOTUS LATTE", "آيس لوتس لاتيه", 167),
    ],
  },
  {
    id: "frappa-coffee",
    sourceHeading: "Frappa Coffee",
    name: { en: "Frappa Coffee", ar: "فرابيه قهوة" },
    items: [
      item("f-latte", "F/ LATTE", "فرابيه لاتيه", 129),
      item("f-spanish-latte", "F/ SPANISH LATTE", "فرابيه سبانش لاتيه", 158),
      item("f-white-mocha-latte", "F/ WHITE MOCHA LATTE", "فرابيه وايت موكا لاتيه", 176),
      item("f-dark-mocha-latte", "F/ DARK MOCHA LATTE", "فرابيه دارك موكا لاتيه", 176),
      item("f-pistachio-latte", "F/ PISTACHIO LATTE", "فرابيه بيستاشيو لاتيه", 202),
      item("f-hazelnut-latte", "F/ HAZELNUT LATTE", "فرابيه هازلنات لاتيه", 150),
      item("f-salted-caramel-latte", "F/ SALTED CARAMEL LATTE", "فرابيه سولتد كراميل لاتيه", 158),
      item("f-caramel", "F/ CARAMEL", "فرابيه كراميل", 158),
      item("f-nutella-latte", "F/ NUTELLA LATTE", "فرابيه نوتيلا لاتيه", 172),
      item("f-peanut-butter-latte", "F/ PEANUT BUTTER LATTE", "فرابيه بينت بتر لاتيه", 150),
      item("f-lotus-latte", "F/ LOTUS LATTE", "فرابيه لوتس لاتيه", 185),
    ],
  },
  {
    id: "filter-coffee",
    sourceHeading: "Filter Coffee",
    name: { en: "Filter Coffee", ar: "قهوة مقطرة" },
    items: [
      item("v60-hot", "V60 Hot", "V60 ساخن", 230),
      item("v60-ice", "V60 Ice", "V60 مثلج", 230),
    ],
  },
  {
    id: "hot-matcha",
    sourceHeading: "Hot Matcha",
    name: { en: "Hot Matcha", ar: "ماتشا ساخنة" },
    items: [
      item("matcha-latte", "MATCHA LATTE", "ماتشا لاتيه", 154),
      item("matcha-spanish", "MATCHA SPANISH", "ماتشا سبانش", 165),
      item("matcha-salted-caramel", "MATCHA SALTED CARAMEL", "ماتشا سولتد كراميل", 165),
      item("matcha-white-moka", "MATCHA WHITE MOKA", "ماتشا وايت موكا", 165),
    ],
  },
  {
    id: "ice-matcha",
    sourceHeading: "Ice Matcha",
    name: { en: "Ice Matcha", ar: "ماتشا مثلجة" },
    items: [
      item("ice-matcha-latte", "ICE MATCHA LATTE", "آيس ماتشا لاتيه", 156),
      item("ice-matcha-mango", "ICE MATCHA MANGO", "آيس ماتشا مانجو", 167),
      item("ice-matcha-strawberry", "ICE MATCHA STRAWBERRY", "آيس ماتشا ستروبيري", 167),
      item("ice-matcha-blueberry", "ICE MATCHA BLUEBERRY", "آيس ماتشا بلوبيري", 167),
      item("ice-matcha-salted-caramel", "ICE MATCHA SALTED CARAMEL", "آيس ماتشا سولتد كراميل", 167),
      item("ice-matcha-spanish", "ICE MATCHA SPANISH", "آيس ماتشا سبانش", 167),
    ],
  },
  {
    id: "frapaa-matcha",
    sourceHeading: "Frapaa Matcha",
    name: { en: "Frapaa Matcha", ar: "فرابيه ماتشا" },
    items: [
      item("f-matcha-latte", "F/ MATCHA LATTE", "فرابيه ماتشا لاتيه", 160),
      item("f-matcha-mango", "F/ MATCHA MANGO", "فرابيه ماتشا مانجو", 170),
      item("f-matcha-strawberry", "F/ MATCHA STRAWBERRY", "فرابيه ماتشا ستروبيري", 170),
      item("f-matcha-blueberry", "F/ MATCHA BLUEBERRY", "فرابيه ماتشا بلوبيري", 170),
      item("f-matcha-salted-caramel", "F/ MATCHA SALTED CARAMEL", "فرابيه ماتشا سولتد كراميل", 170),
      item("f-matcha-spanish", "F/ MATCHA SPANISH", "فرابيه ماتشا سبانش", 170),
    ],
  },
  {
    id: "soft-drink",
    sourceHeading: "Soft Drink",
    name: { en: "Soft Drink", ar: "مشروبات باردة" },
    items: [
      item("fresh-orange", "Fresh Orange", "عصير برتقال طازج", 85),
      item("red-bull", "Red Bull", "رد بول", 105),
      item("sparkling-water", "Sparkling Water", "مياه غازية", 55),
      item("water", "Water", "مياه", 22),
    ],
  },
  {
    id: "desert",
    sourceHeading: "Desert",
    name: { en: "Dessert", ar: "حلويات" },
    items: [
      item("tiramisu", "Tiramisu", "تيراميسو", 160),
      item("blueberry-cheesecake", "Blueberry Cheesecake", "تشيز كيك بلوبيري", 148),
      item("raspberry-cheesecake", "Raspberry Cheesecake", "تشيز كيك راسبيري", 148),
      item("lotus-cheesecake", "Lotus Cheesecake", "تشيز كيك لوتس", 148),
    ],
  },
  {
    id: "bakery",
    sourceHeading: "Bakery",
    name: { en: "Bakery", ar: "مخبوزات" },
    items: [
      item("plain-croissant", "Plain Croissant", "كرواسون سادة", 105),
      item("turkey-cheese-croissant", "Turkey Cheese Croissant", "كرواسون تركي بالجبنة", 195),
      item("almond-croissant", "Almond Croissant", "كرواسون لوز", 140),
      item("nutella-croissant", "Nutella Croissant", "كرواسون نوتيلا", 135),
      item("blueberry-danish", "Blueberry Danish", "دانش بلوبيري", 170),
      item("raspberry-danish", "Raspberry Danish", "دانش راسبيري", 170),
    ],
  },
  {
    id: "salad",
    sourceHeading: "Salad",
    name: { en: "Salad", ar: "سلطات" },
    items: [
      item("cannellini-salad", "Cannellini Salad", "سلطة كانيليني", 400),
      item("mista-mango-salad", "Mista Mango Salad", "سلطة ميستا مانجو", 450),
      item("caprese-salad", "Caprese Salad", "سلطة كابريزي", 350),
      item("burrata-salad", "Burrata Salad", "سلطة بوراتا", 400),
      item("quinoa-salad", "Quinoa Salad", "سلطة كينوا", 450),
      item("caesar-salad", "Caesar Salad", "سلطة سيزر", 350),
    ],
  },
  {
    id: "sandwiches",
    sourceHeading: "Sandwiches",
    name: { en: "Sandwiches", ar: "ساندويتشات" },
    items: [
      item("provolone-panini", "Provolone Panini", "بانيني بروفولون", 300),
      item("prosciutto-panini", "Prosciutto Panini", "بانيني بروسكيوتو", 400),
      item("smoked-kobi-baguette", "Smoked Kobi Baguette", "باجيت سموكد كوبي", 550),
      item("carpaccio-sourdough", "Carpaccio Sourdough", "سوردو كارباتشيو", 500),
      item("formaggio-panini", "Formaggio Panini", "بانيني فورماجيو", 350),
      item("pollo-panini", "Pollo Panini", "بانيني بولو", 580),
      item("frutti-di-mare-sourdough", "Frutti di Mare Sourdough", "سوردو فروتي دي ماري", 550),
    ],
  },
  {
    id: "pizza",
    sourceHeading: "Pizza",
    name: { en: "Pizza", ar: "بيتزا" },
    items: [
      item("margarita-pizza", "Margarita pizza", "بيتزا مارجريتا", 350),
      item("pizza-turkey-cheese-croissant", "Turkey Cheese Croissant", "كرواسون تركي بالجبنة", 380),
      item("quattro-formaggio-pizza", "Quattro formaggio pizza", "بيتزا كواترو فورماجيو", 380),
      item("smoking-kopi-pizza", "Smoking kopi pizza", "بيتزا سموكينج Kopi", 650),
      item("chicken-pasto-pizza", "Chicken pasto pizza", "بيتزا تشيكن باستو", 450),
    ],
  },
];

export const totalMenuItems = menuCategories.reduce(
  (total, category) => total + category.items.length,
  0,
);
