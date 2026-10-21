import type { SiteContent } from "./types";

export const site: SiteContent = {
  name: "GS Caribbean Cuisine",
  tagline: "Haitian & Caribbean cooking on the Westside",
  description:
    "GS Caribbean Cuisine is a Haitian and Caribbean restaurant at 6336 San Juan Ave in Jacksonville, FL, known for griot, legume, diri djon djon and generous portions. Call (904) 243-8910.",
  heroKicker: "Westside · Jacksonville",
  logo: null,

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
  mapQuery: "GS Caribbean Cuisine, 6336 San Juan Ave, Jacksonville, FL 32210",
  mapUrl: "",
  geo: { latitude: null, longitude: null },
  locationHint: "",

  phone: {
    display: "(904) 243-8910",
    tel: "tel:+19042438910",
    e164: "+19042438910",
  },

  hours: {
    timezone: "America/New_York",
    summary: "",
    openTime: null,
    closeTime: null,
    byDay: {},
  },
  closedNotice: "",
  priceRange: "",
  paymentNote: "",

  orderingLinks: [],
  deliveryNote: "",
  socials: [],

  rating: null,
  extraRatings: [],
  testimonials: [],

  menuNote: "",
  menu: [
    {
      id: "haitian-favorites",
      name: "Haitian Favorites",
      items: [
        {
          id: "griot",
          name: "Griot",
          description: "Haitian fried pork",
          tags: ["signature"],
        },
        {
          id: "legume",
          name: "Legume",
          description: "Haitian vegetable stew",
          tags: ["signature"],
        },
        {
          id: "diri-djon-djon",
          name: "Diri Djon Djon",
          description: "Haitian black mushroom rice",
          tags: ["signature"],
        },
      ],
    },
  ],

  heroImages: [],
  gallery: [],

  about: {
    heading: "Haitian cooking, served generously",
    paragraphs: [
      "GS Caribbean Cuisine brings Haitian and Caribbean cooking to San Juan Avenue on Jacksonville's Westside.",
      "Regulars come back for the griot, the legume and the diri djon djon, and for portions that never leave anyone hungry.",
    ],
  },

  servesCuisine: ["Haitian", "Caribbean"],

  seo: {
    title: "GS Caribbean Cuisine · Haitian & Caribbean Food in Jacksonville, FL",
    description:
      "Haitian and Caribbean food at 6336 San Juan Ave, Jacksonville, FL 32210. Griot, legume, diri djon djon and generous portions. Call (904) 243-8910.",
  },

  footerCredit: "Built by nicklopacki.com",
};
