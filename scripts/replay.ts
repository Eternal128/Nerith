// Streams live events every 10s for demo purposes
import { getStore } from "../src/lib/graph/store";

const store = getStore();
let i = 0;
const nodes = Array.from(store.nodes.values());
setInterval(() => {
  const node = nodes[i % nodes.length];
  if (node) console.log(`[replay] ${new Date().toISOString()} ${node.type} ${node.id}: ${node.label}`);
  i++;
}, 10000);
console.log("Replay started. Press Ctrl+C to stop.");
