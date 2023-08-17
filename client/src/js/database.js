import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // connect database & make transaction
  const jateDB = await openDB("jate", 1);
  const transaction = jateDB.transaction("jate", "readwrite");
  // add content code
  const store = transaction.objectStore("jate");
  const request = store.add({ jate: content });
  // request confirmation
  const result = await request;
  console.log("Data Saved", result);
};
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // connect database
  const jateDB = await openDB("jate", 1);
  const tx = jateDB.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  // get all data from database
  const request = store.getAll;
  // request confirmation
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
