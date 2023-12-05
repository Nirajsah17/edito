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
class EditoDb {
  constructor() {
    this.dbSchema = schema;
    this.Users = null;
    this.Directory = null;
    this.File = null;
  }

  async init() {
    const storeName = Object.keys(this.dbSchema);
    try {
      this.db = await openDB(this.dbSchema.dbName, this.dbSchema.version, {
        upgrade: async (db) => {
          this.dbSchema.stores.forEach(store => {
            if (!db.objectStoreNames.contains(store.name)) {
              const objectStore = db.createObjectStore(store.name, {
                keyPath: 'uuid',
              });
              objectStore.createIndex(store.index, store.index, {
                unique: store.unique
              });
              console.log(`${store.name} is successfully created !!!`)
            }
          })
        }
      });

      this.Users =  new Users(this.db, 'Users');
      console.log(this.db);
      this.Directory =  new Directory(this.db, 'Directory');
      this.File =  new File(this.db, 'File');
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

  async getUserByEmail(email) {
    try {
      const index = this.db.transaction(this.name).store.index('email');
      const user = await index.get(email);
      return user;
    } catch (error) {
      console.error('Error retrieving user by email:', error);
    }
  }

  async getUserById(userId) {
    try {
      const user = await this.db.get(this.name, userId);
      console.log('User retrieved by ID:', user);
      return user;
    } catch (error) {
      console.error('Error retrieving user by ID:', error);
    }
  }

  async deleteUser(userId) {
    try {
      if (!this.db) {
        console.error('Database is not initialized. Please wait for initialization.');
        return;
      }
      await this.db.delete(this.name, userId);
      console.log('User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }

  async updateUser(updatedUser) {
    // TODO: fix me
    await this.db.get(this.name)
    console.log('user updated');
  }

  async addUser(user) {
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
  constructor(db, name) {
    this.dbm = db | {};
    this.name = name;
  }

  getFolderById(){

  }

  async addRoot(user) {
    console.log(this.dbm, this.name);
    try {
      if (!this.dbm) {
        console.log("database is not created");
        return;
      }
      await this.dbm.add(this.name, user);
      console.log("User Root is created successfully");
    } catch (error) {
      console.log("Error while creating user Root : ", error);
    }
  }
}


class File {
  constructor() {

  }
}


// export default Store;
export default EditoDb;