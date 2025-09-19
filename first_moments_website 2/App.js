import React, { useState, useEffect } from "react";
import "./App.css";

const translations = {
  en: {
    siteTitle: "First Moments",
    tagline: "Elegant bouquets for life's first celebrations",
    shopNow: "Shop Now",
    products: "Products",
    about: "About",
    contact: "Contact",
    cart: "Cart",
    emptyCart: "Your cart is empty",
    addToCart: "Add to cart",
    viewDetails: "View details",
    checkout: "Checkout",
    total: "Total",
    close: "Close",
    language: "عربي",
  },
  ar: {
    siteTitle: "First Moments",
    tagline: "زهور أنيقة لأول لحظات الحياة",
    shopNow: "تسوق الآن",
    products: "المنتجات",
    about: "من نحن",
    contact: "تواصل معنا",
    cart: "العربة",
    emptyCart: "سلة التسوق فارغة",
    addToCart: "أضف إلى العربة",
    viewDetails: "عرض التفاصيل",
    checkout: "الدفع",
    total: "المجموع",
    close: "إغلاق",
    language: "English",
  },
};

const sampleProducts = [
  {
    id: 1,
    title_en: "Blush Rose Bouquet",
    title_ar: "باقة ورود وردية",
    price: 79,
    img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80",
    desc_en: "A delicate bouquet of blush roses wrapped in luxurious paper.",
    desc_ar: "باقة ناعمة من الورود الوردية مغلفة بورق فخم.",
  },
  {
    id: 2,
    title_en: "White & Cream Box",
    title_ar: "صندوق أبيض وكريمي",
    price: 99,
    img: "https://images.unsplash.com/photo-1505577058444-a3dab1f5a6b0?w=800&q=80",
    desc_en: "Premium preserved flowers in a gift box — timeless keepsake.",
    desc_ar: "أزهار محفوظة داخل صندوق هدية فخم — ذكرى تدوم.",
  },
  {
    id: 3,
    title_en: "Sunny Wildflowers",
    title_ar: "زهور برية مشمسة",
    price: 59,
    img: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=800&q=80",
    desc_en: "Bright wildflowers arranged for a radiant, joyful gift.",
    desc_ar: "زهور برية مشرقة مرتبة كهدية مبهجة.",
  },
];

export default function App() {
  const [lang, setLang] = useState("en");
  const [cart, setCart] = useState([]);
  const t = translations[lang];

  useEffect(() => {
    if (lang === "ar") {
      document.documentElement.dir = "rtl";
      document.documentElement.lang = "ar";
    } else {
      document.documentElement.dir = "ltr";
      document.documentElement.lang = "en";
    }
  }, [lang]);

  const addToCart = (product) => {
    setCart((c) => {
      const found = c.find((p) => p.id === product.id);
      if (found) {
        return c.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...c, { ...product, qty: 1 }];
    });
  };

  const total = cart.reduce((s, p) => s + p.price * p.qty, 0);

  return (
    <div className="min-h-screen bg-cream-50 text-gray-800 font-sans">
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <h1 className="text-lg font-medium">{t.siteTitle}</h1>
        <button onClick={() => setLang((l) => (l === "en" ? "ar" : "en"))}>
          {t.language}
        </button>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-serif text-rose-700 mb-6">{t.products}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleProducts.map((p) => (
            <div key={p.id} className="bg-white rounded-xl shadow p-4">
              <img
                src={p.img}
                alt={lang === "en" ? p.title_en : p.title_ar}
                className="rounded-lg mb-4"
              />
              <h4 className="text-lg font-medium mb-1">
                {lang === "en" ? p.title_en : p.title_ar}
              </h4>
              <p className="text-sm text-gray-500 mb-3">
                {lang === "en" ? p.desc_en : p.desc_ar}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold">${p.price}</span>
                <button
                  onClick={() => addToCart(p)}
                  className="px-3 py-2 bg-rose-600 text-white rounded-md"
                >
                  {t.addToCart}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-12 bg-white border-t text-center py-6">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} {t.siteTitle}
        </p>
      </footer>

      <style>{`
        :root { --rose-600: #c95966; --cream-50: #fbf7f4; }
        .bg-cream-50 { background-color: var(--cream-50); }
        .text-rose-700 { color: #9a3a47; }
        .bg-rose-600 { background-color: var(--rose-600); }
      `}</style>
    </div>
  );
}
