import { openDB } from "idb";
// Open a database or create it if it doesn't exist
// const dbPromise = openDB('EditoDB', 1, {
//   upgrade(db) {
//     // Create a store (a table in IndexedDB) if it doesn't exist
//     if (!db.objectStoreNames.contains('Users')) {
//       const myStore = db.createObjectStore('Users', { keyPath: 'id', autoIncrement: true });
//       // You can also create indexes for faster querying
//       myStore.createIndex('userName', 'userName', { unique: false });
//     }
//   }
// });

// Using the database
// async function addToDatabase(item) {
//   const db = await dbPromise;
//   const tx = db.transaction('Users', 'readwrite');
//   const store = tx.objectStore('Users');
//   await store.add(item);
//   await tx.done;
// }

class Store {
  constructor(o) {
    this.name = "EditoDB";
    this.version = 1
    this.store = this.init();
  }

  async init() {
    let store = await openDB(this.name, this.version, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("Users")) {
          const myStore = db.createObjectStore('Users', { keyPath: 'id' });
          myStore.createIndex('email', 'email', { unique: false });
        }
      }
    })
    return store
  }

  async addUser(user) {
    console.info(user);
    // const tx = await this.store.transaction('Users', 'readwrite');
    // const store = tx.objectStore('Users');
    const users = await this.store.get("Users");
    await this.store.put("Users",user)
    // await user.put(user);
  }
}

// Example usage


// export default addToDatabase;
// export { addToDatabase }
export { Store }
export default Store ;