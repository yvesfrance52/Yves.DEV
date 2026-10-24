#!/usr/bin/env node
// Encode une coordonnée pour src/data/contact.js (elle n'apparaît jamais en clair dans le bundle).
// Usage : node scripts/encode-contact.mjs "valeur"
import { encode } from "../src/lib/obfuscate.js";
const value = process.argv[2];
if (!value) { console.error('Usage : node scripts/encode-contact.mjs "valeur"'); process.exit(1); }
console.log(JSON.stringify(encode(value)));
