import {
  openDB
} from 'idb';

class Store {
  constructor() {
    this.dbName = 'EditoDB';
    this.version = 1;
    this.storeName = 'Users';
    this.db = null;

    this.init();
  }

  async init() {
    try {
      this.db = await openDB(this.dbName, this.version, {
        upgrade: (db) => {
          if (!db.objectStoreNames.contains(this.storeName)) {
            const store = db.createObjectStore(this.storeName, {
              keyPath: 'id',
              autoIncrement: true,
            });

            store.createIndex('email', 'email', {
              unique: false
            });
          }
        },
      });
      console.log(`Database ${this.dbName} opened successfully!`);
    } catch (error) {
      console.error('Error initializing the database:', error);
    }
  }

  async addUser(user) {
    try {
      if (!this.db) {
        console.error('Database is not initialized.');
        return;
      }

      await this.db.add(this.storeName, user);
      console.log('User added successfully!');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  }

  async getAllUserIds() {
    try {
      if (!this.db) {
        console.error('Database is not initialized. Please wait for initialization.');
        return [];
      }

      const transaction = this.db.transaction(this.storeName, 'readonly');
      const store = transaction.objectStore(this.storeName);

      // Use getAllKeys to retrieve all keys (IDs) from the object store
      const userIds = await store.getAllKeys();

      console.log('All User IDs:', userIds);
      return userIds;
    } catch (error) {
      console.error('Error getting all user IDs:', error);
      return [];
    }
  }

  async getUserByEmail(email) {
    try {
      const index = this.db.transaction(this.storeName).store.index('email');
      const user = await index.get(email);
      console.log('User retrieved by email:', user);
    } catch (error) {
      console.error('Error retrieving user by email:', error);
    }
  }

  async getUserById(userId) {
    try {
      const user = await this.db.get(this.storeName, userId);
      console.log('User retrieved by ID:', user);
    } catch (error) {
      console.error('Error retrieving user by ID:', error);
    }
  }

  async updateUser(updatedUser) {
    try {
      if (!this.db) {
        console.error('Database is not initialized. Please wait for initialization.');
        return;
      }

      const transaction = this.db.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);
      
      // Check if 'id' property exists and is not null or undefined
      if (updatedUser.id !== null && updatedUser.id !== undefined) {
        // Use 'put' to update the user with the specified ID
        await store.put(updatedUser);
        console.log('User updated successfully!');
      } else {
        console.error('Cannot update user without a valid ID.');
      }

      await transaction.done;
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }

  async deleteUser(userId) {
    try {
      if (!this.db) {
        console.error('Database is not initialized. Please wait for initialization.');
        return;
      }

      await this.db.delete(this.storeName, userId);
      console.log('User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }
}

export default Store;