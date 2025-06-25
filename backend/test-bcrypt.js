const bcrypt = require('bcryptjs');

async function check() {
  const plain = '123456';
  const storedHash = 'P$2b$10$q0o63o31y2Q2j2nU3U1evO5Je4j29D4wnvmM6WiHnJfyW1z8R4z8a';  // 🔁 Use the fresh one

  const result = await bcrypt.compare(plain, storedHash);
  console.log('Password match:', result);
}

check();