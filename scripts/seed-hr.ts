import { seedHR } from "../src/lib/fixtures/hr";
import { getStore } from "../src/lib/graph/store";

seedHR();
const store = getStore();
console.log(`Seeded ${store.nodes.size} HR nodes`);
