import { seedHartwell } from ".";
import { getStore } from "../../graph/store";

seedHartwell();
console.log(`Seeded ${getStore().nodes.size} Hartwell nodes`);
