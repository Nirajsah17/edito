import {
  openDB
} from 'idb';


const schema = {
  dbName: 'Edito',
  version: 1,
  stores: [
    {
      name: 'Users',
      index: 'email',
      unique: true
    },
    {
      name: 'Directory',
      index: 'email',
      unique: true
    },
    {
      name: 'file',
      index: 'email',
      unique: true
    }
  ]
}

class Store {
  constructor() {
    this.dbName = 'EditoDB';
    this.version = 1;
    this.storeName = 'Users';
    this.db = null;

    this.init();
  }

  async init(dbName, store) {
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




class EditoDb {
  constructor() {
    this.dbSchema = schema;
    this.Users = null
  }

  async init() {
    const storeName = Object.keys(this.dbSchema);
    try {
      this.db = await openDB(this.dbSchema.dbName, this.dbSchema.version, {
        upgrade: (db) => {
          this.dbSchema.stores.forEach(store => {
            if (!db.objectStoreNames.contains(store.name)) {
              const objectStore = db.createObjectStore(store.name, {
                keyPath: 'id',
                autoIncrement: true
              });
              objectStore.createIndex(store.index, store.index, {
                unique: store.unique
              });
              console.log(`${store.name} is successfully created !!!`)
            }
          })
        }
      });
    } catch (err) {
      console.log(err);
    }
    return this.db
  }

}


class Users {
  constructor(db, name) {
    this.db = db;
    this.name = name;
  }

  async getUser(user) {

  }

  async deleteUser(email) {
    try {
      await this.db.delete(this.name, email);
      console.log(`${email} is deleted successfully`);
    } catch (error) {
      console.log("Error while deleting user : ", email);
    }
  }

  async updateUser(updatedUser) {
    // TODO: fix me
    await this.db.get(this.name,)
    console.log('user updated');
  }

  async addUser(user) {co
    try {
      if (!this.db) {
        console.log("database is not created");
        return;
      }
      await this.db.add(this.name, user);
      console.log("User added is inserted successfully");
    } catch (error) {
      console.log("Error while adding user : ", error);
    }
  }

}

class Directory {

  constructor() {
  }
}


class File {
  constructor() {

  }
}

class MainStore {
  constructor() {
    let dbInit = new EditoDb();
    this.db = dbInit.init();
    this.UsersStore = new Users(this.db, 'Users');
    this.DirectoryStore = new Directory(this.db, 'Users');
    this.FileStore = new File(this.db, 'Users');
  }



}

// export default Store;
export default EditoDb;