// 1️⃣ Interfaces
interface User {
  id: number;
  name: string;
  email: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

// 2️⃣ Données
const users: User[] = [{ id: 1, name: "Mickael", email: "mickael@test.com" }];

const products: Product[] = [
  { id: 1, name: "Clavier", price: 49 },
  { id: 2, name: "Souris", price: 29 },
];

// 3️⃣ Fonctions
function getTotalPrice(items: Product[]): number {
  let total = 0;

  for (const item of items) {
    total += item.price;
  }

  return total;
}

// 4️⃣ Exécution
console.log("Utilisateurs :", users);
console.log("Total produits :", getTotalPrice(products));
// 5️⃣ Exercice – Produits avancés

interface ProductEx {
  id: number;
  name: string;
  price: number;
}

const productList: ProductEx[] = [
  { id: 1, name: "Écran", price: 199 },
  { id: 2, name: "Casque", price: 89 },
];

function calculateTotal(products: ProductEx[]): number {
  let total = 0;

  for (const product of products) {
    total += product.price;
  }

  return total;
}

console.log("Total exercice :", calculateTotal(productList));
