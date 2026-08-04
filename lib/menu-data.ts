export interface MenuItem {
  name: string;
  description?: string;
  price: string;
  note?: string;
  image?: string;
}

export interface MenuCategory {
  slug: string;
  label: string;
  image?: string;
  items: MenuItem[];
}

export const menuCategories: MenuCategory[] = [
  {
    slug: "entrees",
    label: "Entrées",
    image: "/assets/menu/entrees.jpg",
    items: [
      { name: "Gyoza Poulet", price: "5,50 €", image: "/assets/menu/items/entree-gyoza-poulet.jpg" },
      { name: "Gyoza Scampi", price: "5,70 €", image: "/assets/menu/items/gyoza-scampi.jpg" },
      { name: "Yakitori de Poulet", price: "5,50 €", image: "/assets/menu/items/entree-yakitori-poulet.jpg" },
      { name: "Karaage Poulet", price: "6,00 €", image: "/assets/menu/items/entree-karaage-poulet.jpg" },
      { name: "Tempura Scampi", price: "6,50 €", image: "/assets/menu/items/entree-tempura-scampi.jpg" },
      { name: "Dynamite Shrimp", price: "6,50 €", image: "/assets/menu/items/entree-dynamite-shrimp.jpg" },
    ],
  },
  {
    slug: "baos",
    label: "Baos",
    image: "/assets/menu/baos.jpg",
    items: [
      { name: "Bao Poulet Katsu", description: "Poulet Katsu, concombre, roquette, sauces spicy & unagi", price: "6,00 €", image: "/assets/menu/items/bao-poulet-katsu.jpg" },
      { name: "Bao Yakitori Poulet", description: "Yakitori poulet, concombre, roquette, sauces spicy & truffe", price: "6,50 €", image: "/assets/menu/items/bao-yakitori-poulet.jpg" },
      { name: "Bao Boeuf Épicé Caramélisé", description: "Boeuf épicé, concombre, roquette, sauces spicy & unagi", price: "7,00 €", image: "/assets/menu/items/bao-boeuf-epice-caramelise.jpg" },
      { name: "Bao Tempura Scampi", description: "Tempura scampi, concombre, roquette, sauce spicy", price: "6,50 €", image: "/assets/menu/items/bao-tempura-scampi.jpg" },
    ],
  },
  {
    slug: "baos-burger",
    label: "Baos Burger",
    image: "/assets/menu/baos-burger.jpg",
    items: [
      { name: "Bao Burger Poulet Katsu", description: "Poulet katsu, concombre, roquette, sauces spicy & truffe", price: "12,90 €", image: "/assets/menu/items/bao-burger-poulet-katsu.jpg" },
      { name: "Bao Burger Boeuf", description: "Boeuf, concombre, roquette, sauce spicy", price: "13,90 €", image: "/assets/menu/items/bao-burger-boeuf.jpg" },
      { name: "Bao Burger Veggie", description: "Galette de pomme de terre, concombre, roquette, sauce spicy", price: "11,90 €", image: "/assets/menu/items/bao-burger-veggie.jpg" },
    ],
  },
  {
    slug: "classic-rolls",
    label: "Classic Rolls",
    image: "/assets/menu/classic-rolls.jpg",
    items: [
      { name: "Veggie", description: "Avocat, mangue, carottes, concombre", price: "6,50 €", image: "/assets/menu/items/veggie.jpg" },
      { name: "Salmon Avocado", description: "Saumon, avocat", price: "7,40 €", image: "/assets/menu/items/salmon-avocado.jpg" },
      { name: "Salmon Mango", description: "Saumon, mangue", price: "7,40 €", image: "/assets/menu/items/salmon-mango.jpg" },
      { name: "Salmon Cheese", description: "Saumon, avocat, fromage", price: "7,40 €", image: "/assets/menu/items/salmon-cheese.jpg" },
      { name: "Mango Chicken", description: "Poulet, mangue", price: "7,40 €", image: "/assets/menu/items/mango-chicken.jpg" },
      { name: "Tempura Mango", description: "Tempura scampi, mangue", price: "7,40 €", image: "/assets/menu/items/tempura-mango.jpg" },
      { name: "Sweet Chicken", description: "Poulet, concombre, mangue", price: "7,60 €", image: "/assets/menu/items/sweet-chicken.jpg" },
      { name: "Sweet Tempura", description: "Tempura scampi, concombre, mangue", price: "7,60 €", image: "/assets/menu/items/sweet-tempura.jpg" },
      { name: "Spicy Tempura", description: "Tempura scampi, mangue, concombre, fromage", price: "7,60 €", image: "/assets/menu/items/spicy-tempura.jpg" },
    ],
  },
  {
    slug: "special-rolls",
    label: "Spécial Rolls",
    image: "/assets/menu/special-rolls.jpg",
    items: [
      { name: "Yellow", description: "Poulet, concombre / mangue, sauce spicy, ciboulette", price: "8,70 €", image: "/assets/menu/items/yellow.jpg" },
      { name: "Pink Lady", description: "Tempura scampi, avocat, fromage / saumon snacké, sauces spicy & unagi", price: "8,90 €", image: "/assets/menu/items/pink-lady.jpg" },
      { name: "Red Pepper", description: "Tempura scampi, avocat / épices japonaises, sauces spicy & unagi, piment", price: "8,50 €", image: "/assets/menu/items/red-pepper.jpg" },
      { name: "Tuna Mayo", description: "Thon cuit, concombre / sauces spicy & unagi, oignons frits", price: "8,50 €", image: "/assets/menu/items/tuna-mayo.jpg" },
      { name: "The Rocket", description: "Yakitori poulet, concombre, roquette / sauce truffe, grenade", price: "8,70 €", image: "/assets/menu/items/the-rocket.jpg" },
      { name: "Chicken Chili", description: "Poulet, concombre, fromage / sauces spicy & chili, oignons frits", price: "8,50 €", image: "/assets/menu/items/chicken-chili.jpg" },
    ],
  },
  {
    slug: "crusty-rolls",
    label: "Crusty Rolls",
    image: "/assets/menu/crusty-rolls.jpg",
    items: [
      { name: "Crusty Chicken", description: "Poulet, poivron, sauce unagi", price: "8,50 €", image: "/assets/menu/items/crusty-chicken.jpg" },
      { name: "Crusty Shrimp", description: "Tempura scampi, avocat, sauce spicy", price: "8,50 €", image: "/assets/menu/items/crusty-shrimp.jpg" },
      { name: "Crusty Cheese", description: "Fromage & miel", price: "7,50 €", image: "/assets/menu/items/crusty-cheese.jpg" },
    ],
  },
  {
    slug: "plateaux",
    label: "Plateaux",
    image: "/assets/menu/plateaux.jpg",
    items: [
      { name: "Salmon Plateau", description: "Salmon Avocado, Salmon Mango, Salmon Cheese", price: "21,00 €", image: "/assets/menu/items/salmon-plateau.jpg" },
      { name: "Louki Plateau", description: "Red Pepper, Pink Lady, Yellow, Chicken Chili", price: "32,00 €", image: "/assets/menu/items/louki-plateau.jpg" },
      { name: "Woki Plateau", description: "Spicy Tempura, Mango Chicken, Salmon Cheese, Tuna Spicy", price: "29,00 €", image: "/assets/menu/items/woki-plateau.jpg" },
    ],
  },
  {
    slug: "poke-bowls",
    label: "Poke Bowls",
    image: "/assets/menu/poke-bowls.jpg",
    items: [
      {
        name: "Poke Poulet Katsu",
        description: "Sauce unagi, concombre, mangue, avocat, carottes, poulet, sauce spicy, oignons frits, grenade, sésame",
        price: "13,70 €",
        image: "/assets/menu/items/poke-poulet-katsu.jpg",
      },
      {
        name: "Poke Tempura Scampi",
        description: "Sauce unagi, concombre, mangue, avocat, carottes, tempura scampi, sauce spicy, oignons frits, grenade, sésame",
        price: "13,90 €",
        image: "/assets/menu/items/poke-tempura-scampi.jpg",
      },
      {
        name: "Poke Salmon",
        description: "Sauce unagi, mangue, avocat, salade d'algues, carottes, saumon, oignons frits, grenade, sésame",
        price: "14,30 €",
        image: "/assets/menu/items/poke-salmon.jpg",
      },
    ],
  },
  {
    slug: "donburi",
    label: "Donburi",
    image: "/assets/menu/donburi-udon.jpg",
    items: [
      { name: "Poulet Katsu", price: "13,50 €", image: "/assets/menu/items/donburi-poulet-katsu.jpg" },
      { name: "Poulet Teriyaki", price: "13,50 €", image: "/assets/menu/items/donburi-poulet-teriyaki.jpg" },
      { name: "Poulet Karaage", price: "13,50 €", image: "/assets/menu/items/donburi-poulet-karaage.jpg" },
      { name: "Boeuf Caramélisé", price: "14,50 €", image: "/assets/menu/items/donburi-boeuf-caramelise.jpg" },
      { name: "Scampi Teriyaki", price: "14,00 €", image: "/assets/menu/items/donburi-scampi-teriyaki.jpg" },
      { name: "Saumon Frit", price: "14,50 €", note: "uniquement en donburi", image: "/assets/menu/items/donburi-saumon-frit.jpg" },
      { name: "Dynamite Shrimp", price: "14,50 €", note: "uniquement en donburi", image: "/assets/menu/items/donburi-dynamite-shrimp.jpg" },
      { name: "Poulet Crousty", price: "13,50 €", note: "uniquement en donburi", image: "/assets/menu/items/donburi-poulet-crousty.jpg" },
    ],
  },
  {
    slug: "udon",
    label: "Udon",
    image: "/assets/menu/donburi-udon.jpg",
    items: [
      { name: "Poulet Katsu", price: "13,50 €", image: "/assets/menu/items/udon-poulet-katsu.jpg" },
      { name: "Poulet Teriyaki", price: "13,50 €", image: "/assets/menu/items/udon-poulet-teriyaki.jpg" },
      { name: "Poulet Karaage", price: "13,50 €", image: "/assets/menu/items/udon-poulet-karaage.jpg" },
      { name: "Boeuf Caramélisé", price: "14,50 €", image: "/assets/menu/items/udon-boeuf-caramelise.jpg" },
      { name: "Scampi Teriyaki", price: "14,00 €", image: "/assets/menu/items/udon-scampi-teriyaki.jpg" },
    ],
  },
  {
    slug: "tasty",
    label: "Tasty",
    image: "/assets/menu/tasty.jpg",
    items: [
      { name: "Tasty Crousty Chicken", description: "Sauce au choix (classique, curry, piquante)", price: "12,00 €", image: "/assets/menu/items/tasty-crousty-chicken.jpg" },
      { name: "Tasty Crousty Scampi", description: "Sauce au choix (classique, curry, piquante)", price: "12,00 €", image: "/assets/menu/items/tasty-crousty-scampi.jpg" },
    ],
  },
  {
    slug: "accompagnements",
    label: "Accompagnements",
    image: "/assets/menu/accompagnements.jpg",
    items: [
      { name: "Riz Nature", price: "3,20 €", image: "/assets/menu/items/riz-nature.jpg" },
      { name: "Riz Épicé", price: "3,20 €", image: "/assets/menu/items/riz-epice.jpg" },
      { name: "Riz Vinaigré", price: "3,20 €", image: "/assets/menu/items/riz-nature.jpg" },
      { name: "Edamame", price: "3,50 €", image: "/assets/menu/items/edamame.jpg" },
      { name: "Salade de Choux", price: "2,90 €", image: "/assets/menu/items/salade-de-choux.jpg" },
      { name: "Salade d'Algues", price: "3,60 €", image: "/assets/menu/items/salade-dalgues.jpg" },
      { name: "Frites de Patates Douces", price: "3,40 €", image: "/assets/menu/items/frites-de-patates-douces.jpg" },
    ],
  },
  {
    slug: "desserts",
    label: "Desserts",
    image: "/assets/menu/desserts.jpg",
    items: [
      { name: "Tiramisu Spéculoos Caramel", price: "5,00 €", image: "/assets/menu/items/tiramisu-speculoos-caramel.jpg" },
      { name: "Tiramisu Pistache", price: "5,00 €", image: "/assets/menu/items/tiramisu-pistache.jpg" },
    ],
  },
  {
    slug: "boissons",
    label: "Boissons",
    image: "/assets/menu/boissons.jpg",
    items: [
      { name: "Eau Spa", description: "Plate ou pétillante", price: "2,00 €", image: "/assets/menu/items/eau-spa.jpg" },

      { name: "Oasis Tropical", price: "2,50 €", image: "/assets/menu/items/oasis-tropical.jpg" },
      { name: "Oasis Pomme Poire", price: "2,50 €", image: "/assets/menu/items/oasis-pomme-poire.jpg" },
      { name: "Oasis Fraise Framboise", price: "2,50 €", image: "/assets/menu/items/oasis-fraise-framboise.jpg" },
      { name: "Oasis Pomme Cassis Framboise", price: "2,50 €", image: "/assets/menu/items/oasis-pomme-cassis-framboise.jpg" },
      { name: "Oasis Ice Tea Pêche", price: "2,50 €", image: "/assets/menu/items/oasis-ice-tea-peche.jpg" },

      { name: "Schweppes Agrumes", price: "2,50 €", image: "/assets/menu/items/schweppes-agrumes.jpg" },
      { name: "Schweppes Lemon", price: "2,50 €", image: "/assets/menu/items/schweppes-lemon.jpg" },
      { name: "Schweppes Mojito", price: "2,50 €", image: "/assets/menu/items/schweppes-mojito.jpg" },

      { name: "Palés Pêche Blanche & Violette", price: "2,50 €", image: "/assets/menu/items/pales-peche-violette.jpg" },
      { name: "Palés Orange & Grenadine", price: "2,50 €", image: "/assets/menu/items/pales-orange-grenadine.jpg" },
      { name: "Palés Mojito Myrtille & Fraise", price: "2,50 €", image: "/assets/menu/items/pales-mojito.jpg" },
      { name: "Palés Cola", price: "2,50 €", image: "/assets/menu/items/pales-cola.jpg" },
      { name: "Palés Cola Zero", price: "2,50 €", image: "/assets/menu/items/pales-cola-zero.jpg" },

      { name: "Ramune Classique", price: "3,20 €", image: "/assets/menu/items/ramune-classique.jpg" },
      { name: "Ramune Fraise", price: "3,20 €", image: "/assets/menu/items/ramune-fraise.jpg" },
      { name: "Ramune Litchi", price: "3,20 €", image: "/assets/menu/items/ramune-litchi.jpg" },
      { name: "Ramune Melon", price: "3,20 €", image: "/assets/menu/items/ramune-melon.jpg" },

      { name: "Arizona Watermelon", price: "3,20 €", image: "/assets/menu/items/arizona-watermelon.jpg" },
      { name: "Arizona Pomegranate Green Tea", price: "3,20 €", image: "/assets/menu/items/arizona-pomegranate.jpg" },
      { name: "Arizona Green Tea Honey", price: "3,20 €", image: "/assets/menu/items/arizona-green-tea.jpg" },
      { name: "Arizona Blueberry White Tea", price: "3,20 €", image: "/assets/menu/items/arizona-blueberry.jpg" },

      { name: "Mojito Classique", price: "5,50 €", image: "/assets/menu/items/mojito-classique.jpg" },
      { name: "Mojito Fraise", price: "5,50 €", image: "/assets/menu/items/mojito-fraise.jpg" },
      { name: "Mojito Passion", price: "5,50 €", image: "/assets/menu/items/mojito-passion.jpg" },
      { name: "Mojito Pêche", price: "5,50 €", image: "/assets/menu/items/mojito-peche.jpg" },
      { name: "Mojito Violette", price: "5,50 €", image: "/assets/menu/items/mojito-violette.jpg" },
    ],
  },
];
