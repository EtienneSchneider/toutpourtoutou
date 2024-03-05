import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, "database.json");

export async function loadUsers() {
  try {
    const users = await fs.readFile(dbPath, "utf-8");
    return JSON.parse(users);
  } catch (error) {
    return [0];
  }
}

export async function saveUsers(users) {
  try {
    await fs.writeFile(dbPath, JSON.stringify(users, null, 2), "utf-8");
  } catch (error) {
    alert(error);
  }
}
