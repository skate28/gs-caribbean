import type { SiteContent } from "./types";

const MAP_URL = "https://maps.google.com/?cid=2588011060579382368";

export const site: SiteContent = {
  name: "GS Caribbean Cuisine",
  tagline: "Haitian & Caribbean kitchen on the Westside",
  description:
    "GS Caribbean Cuisine is a Haitian and Caribbean restaurant at 6336 San Juan Ave on Jacksonville's Westside, serving griot, legume, kabrit, tasso, oxtail, lalo, kalalou, pate kòde, weekday lunch specials and soup joumou on Sundays. Dine in, take out, or call (904) 243-8910 for delivery.",
  heroKicker: "Westside · Jacksonville",
  logo: { src: "/images/logo.png", alt: "GS Caribbean Cuisine logo: a smiling chef holding a plate in front of palm trees and a sunset", width: 800, height: 800 },

  address: {
    street: "6336 San Juan Ave",
    suite: "",
    neighborhood: "Westside",
    city: "Jacksonville",
    region: "FL",
    postalCode: "32210",
    country: "US",
    full: "6336 San Juan Ave, Jacksonville, FL 32210",
  },
  mapQuery: "6336 San Juan Ave, Jacksonville, FL 32210",
  mapUrl: MAP_URL,
  geo: { latitude: 30.281848, longitude: -81.7474913 },
  locationHint: "On San Juan Avenue near Jammes Road, on Jacksonville's Westside.",

  phone: {
    display: "(904) 243-8910",
    tel: "tel:+19042438910",
    e164: "+19042438910",
  },

  hours: {
    timezone: "America/New_York",
    summary: "Mon–Thu 10 AM–4 PM · Fri–Sat 9 AM–11 PM · Sun from 11 AM",
    openTime: null,
    closeTime: null,
    byDay: {
      mon: { openTime: "10:00", closeTime: "16:00" },
      tue: { openTime: "10:00", closeTime: "16:00" },
      wed: { openTime: "10:00", closeTime: "16:00" },
      thu: { openTime: "10:00", closeTime: "16:00" },
      fri: { openTime: "09:00", closeTime: "23:00" },
      sat: { openTime: "09:00", closeTime: "23:00" },
      sun: { openTime: "11:00", closeTime: null },
    },
  },
  closedNotice: "We're closed right now. Give us a call at (904) 243-8910 and we'll tell you when we're cooking next.",
  priceRange: "$$",
  paymentNote: "",

  orderingLinks: [{ label: "Call to order", url: "tel:+19042438910", platform: "phone" }],
  deliveryNote: "Delivery available. Call (904) 243-8910 to order.",
  socials: [],

  rating: { value: 3.9, count: 15, source: "Google", sourceUrl: MAP_URL },
  extraRatings: [],

  testimonials: [
    {
      quote:
        "No pictures because I immediately started eating but this is a 10/10. Service is great and they sent so much food! … Legume 10/10. Griot 10/10 Diri Djon Djon 10/10",
      rating: 5,
      sourceLabel: "Google",
      sourceUrl: MAP_URL,
    },
    {
      quote: "Friendly staff. My 2nd time here and the food was amazing and delicious food!!",
      rating: 5,
      sourceLabel: "Google",
      sourceUrl: MAP_URL,
    },
    {
      quote: "nice lady good food and an new experience for me",
      rating: 5,
      sourceLabel: "Google",
      sourceUrl: MAP_URL,
    },
  ],

  menuNote: "Prices from our in-store menu board and subject to change. Call (904) 243-8910 for today's market prices.",
  menu: [
    {
      id: "breakfast",
      name: "Breakfast",
      description: "Haitian breakfast favorites, from pate kòde to diri kole.",
      items: [
        { id: "spaghetti", name: "Spaghetti", description: "Haitian-style breakfast spaghetti.", price: 16.95 },
        { id: "pate-kode-aranso", name: "Pate Kòde (Aransò)", description: "Crispy fried pastry filled with smoked herring.", price: 10 },
        { id: "pate-kode-meat", name: "Pate Kòde (Meat)", description: "Crispy fried pastry with a meat filling.", price: 10 },
        { id: "sandwich-with-egg", name: "Sandwich", description: "With egg.", price: 10 },
        { id: "pate-fete-meat", name: "Pate Fete (Meat)", description: "Flaky puff-pastry patty filled with meat.", price: 2 },
        { id: "pate-fete-bwat-12", name: "Pate Fete (Bwat 12)", description: "Meat. A box of 12 meat patties.", price: 20 },
        { id: "salad", name: "Salad", price: 9 },
        { id: "rice-and-beans-breakfast", name: "Rice and Beans", description: "Diri kole. Rice cooked together with beans.", price: 8.5 },
        { id: "fries", name: "Fries", description: "Pomme de terre.", price: 3 },
      ],
    },
    {
      id: "lunch-dinner",
      name: "Lunch & Dinner",
      description: "Haitian platters, stews and sides.",
      items: [
        { id: "legume-platter", name: "Legume Platter", description: "Haitian braised vegetable stew.", price: 20.7, tags: ["signature"] },
        { id: "turkey-platter", name: "Turkey Platter", description: "Haitian-style turkey.", price: 19.95 },
        { id: "fish-platter", name: "Fish Platter (Pwason)", description: "Haitian-style fish.", price: 25 },
        {
          id: "rice-and-beans",
          name: "Rice and Beans",
          description: "Diri kole. Rice cooked together with beans.",
          price: 8.5,
          tags: ["signature"],
          image: { src: "/images/hero-diri-kole-plantain-salad-plate.jpg", alt: "Diri kole with fried plantain, fresh salad and a small cup of slaw in a takeout box", width: 1500, height: 1160 },
        },
        { id: "fish-platter-medium", name: "Fish Platter (Pwason), Medium", description: "Haitian-style fish, medium size.", price: 30 },
        { id: "fish-platter-large", name: "Fish Platter (Pwason), Large", description: "Haitian-style fish, large size.", price: 40 },
        { id: "kabrit-platter", name: "Kabrit Platter", description: "Goat, Haitian style.", price: 25.95 },
        { id: "chicken-wings", name: "Chicken Wings", price: 15.95 },
        { id: "chicken-platter", name: "Chicken Platter", description: "Haitian-style chicken.", price: 18.5 },
        { id: "tasso-beef", name: "Tasso Beef", description: "Seasoned beef, fried Haitian style.", price: 25.95 },
        { id: "oxtail", name: "Oxtail", price: 25.95 },
        { id: "griot-pork-platter", name: "Griot Pork Platter", description: "Griot: marinated pork, fried until crisp.", price: 17.5, tags: ["signature"] },
        { id: "side-diri-sos-pwa", name: "Side Diri + Sos Pwa", description: "Rice + bean sauce.", price: 12.5 },
        { id: "side-banana", name: "Side Banana 5 PCS", description: "Five pieces of plantain.", price: 3.5 },
        { id: "boulette", name: "Boulette", description: "Meat ball.", price: 20 },
        { id: "kalalou-platter", name: "Kalalou Platter", description: "Okra. Haitian okra stew.", price: 21.5 },
        { id: "lalo-platter", name: "Lalo Platter", description: "Haitian jute-leaf stew, with diri blan or diri kole.", price: 22 },
        { id: "side-acra", name: "Side Acra", description: "Crispy Haitian fritters.", price: 6.21 },
        { id: "ragout", name: "Ragout", description: "Haitian-style stew.", price: 18.99 },
        { id: "lambie-kreyol", name: "Lambie Kreyol", description: "Conch in Creole sauce.", price: "Variable" },
        { id: "fritay", name: "Fritay", description: "Haitian fried favorites.", price: "Variable" },
        { id: "bouillon-kabrit", name: "Bouillon Kabrit", description: "Goat soup.", price: 20.7 },
      ],
    },
    {
      id: "lunch-specials",
      name: "Lunch Specials",
      description: "Weekly specials at a lunch price.",
      items: [],
      groups: [
        {
          label: "Monday to Thursday",
          note: "11 AM to 2 PM",
          items: [
            { id: "special-legume", name: "Legume", description: "Haitian braised vegetable stew.", price: 15.99 },
            { id: "special-chicken", name: "Chicken", price: 15.99 },
            { id: "special-turkey", name: "Turkey", price: 15.99 },
          ],
        },
        {
          label: "Every Saturday",
          note: "11 AM to 2 PM",
          items: [
            { id: "special-mais", name: "Mais", description: "Haitian cornmeal.", price: 15.99 },
            { id: "special-bouyon", name: "Bouyon", description: "Hearty Haitian soup.", price: 15.99 },
          ],
        },
        {
          label: "Every Sunday",
          note: "From 11 AM",
          items: [
            { id: "special-soup-joumou", name: "Soup Joumou", description: "Haitian pumpkin soup.", price: 15.99 },
          ],
        },
      ],
    },
    {
      id: "beverages",
      name: "Beverages",
      items: [
        { id: "mystic", name: "Mystic", price: 2 },
        { id: "robusto", name: "Robusto", price: 4 },
        { id: "cola-couronne", name: "Cola Couronne", description: "Haitian fruit-champagne soda.", price: 2.5 },
        { id: "coke", name: "Coke", price: 3 },
        { id: "toro", name: "Toro", price: 5 },
        { id: "atomic-drink", name: "Atomic Drink", price: 5 },
        { id: "ragaman", name: "Ragaman", price: 4 },
        { id: "malta", name: "Malta", description: "Malt soda.", price: 3 },
      ],
    },
    {
      id: "natural-juices",
      name: "Natural Juice",
      items: [
        { id: "corossol-juice", name: "Corossol Juice", description: "Soursop.", price: 5 },
        { id: "grenadia-juice", name: "Grenadia Juice", description: "Passion fruit.", price: 5 },
        { id: "lemon-juice", name: "Lemon Juice", price: 5 },
        { id: "ak-100", name: "AK-100", price: 3 },
        { id: "melon-juice", name: "Melon Juice", price: 5 },
        { id: "fruit-punch", name: "Fruit Punch", price: 2 },
      ],
    },
  ],

  heroImages: [
    { src: "/images/hero-diri-kole-plantain-salad-plate.jpg", alt: "Diri kole with fried plantain, fresh salad and a small cup of slaw in a takeout box", width: 1500, height: 1160 },
    { src: "/images/fried-meat-onions-sauce-tray.jpg", alt: "Fried meat topped with sliced onions and red sauce in a foil tray", width: 1500, height: 1400 },
    { src: "/images/diri-kole-and-side-takeout.jpg", alt: "Diri kole next to a covered tray of saucy fried meat and onions", width: 1500, height: 1000 },
  ],
  gallery: [
    { src: "/images/hero-diri-kole-plantain-salad-plate.jpg", alt: "Diri kole with fried plantain, fresh salad and a small cup of slaw in a takeout box", width: 1500, height: 1160 },
    { src: "/images/fried-meat-onions-sauce-tray.jpg", alt: "Fried meat topped with sliced onions and red sauce in a foil tray", width: 1500, height: 1400 },
    { src: "/images/diri-kole-and-side-takeout.jpg", alt: "Diri kole next to a covered tray of saucy fried meat and onions", width: 1500, height: 1000 },
  ],

  about: {
    heading: "Haitian cooking, new to the Westside",
    paragraphs: [
      "GS Caribbean Cuisine is one of the newest kitchens on Jacksonville's Westside, cooking Haitian and Caribbean food at 6336 San Juan Ave.",
      "Mornings start with pate kòde, pate fete and diri kole. Later, the platters come out: griot, legume, kabrit, tasso beef, oxtail, lalo, kalalou and bouillon kabrit, with lunch specials during the week and soup joumou on Sundays.",
      "Eat in, take it to go, or call (904) 243-8910 for delivery.",
    ],
    image: { src: "/images/interior-dining-room-booths.jpg", alt: "Dining room with booths, black tablecloths and pink curtains", width: 1200, height: 1600 },
  },

  servesCuisine: ["Haitian", "Caribbean"],

  seo: {
    title: "GS Caribbean Cuisine | Haitian Food on San Juan Ave, Jacksonville",
    description:
      "Griot, legume, kabrit, tasso, oxtail, pate kòde and Sunday soup joumou at 6336 San Juan Ave, Jacksonville, FL. Lunch specials Mon–Thu 11 AM–2 PM. Call (904) 243-8910 for delivery.",
  },

  footerCredit: "Built by nicklopacki.com",
};
