import firestore from '@react-native-firebase/firestore';

export class Model {
  /**
   * Create a new model object.
   * @param structure Model structure for setting up this model.
   */
  constructor(structure) {
    this.collectionId = structure.collectionId;
    this.docId = '';
    this.docData = {};
    this.docDataChanged = {};
    this.docFields = structure.docFields;

    const docFieldsKeys = Object.keys(this.docFields);

    for (let i = 0; i < docFieldsKeys.length; i++) {
      let docFieldKey = docFieldsKeys[i];

      // Define document field default value.
      this.docData[docFieldKey] = this.docFields[docFieldKey].propertyDefaultValue;

      // Define document field.
      Object.defineProperty(this, this.docFields[docFieldKey].propertyName, {
        configurable: true,
        enumerable: true,
        get() {
          const value = this.docData[docFieldKey];
          if (value === undefined) {
            return this.docFields[docFieldKey].propertyDefaultValue;
          } else {
            return value;
          }
        },
        set(value) {
          if (value === undefined) {
            this.docData[docFieldKey] = this.docFields[docFieldKey].propertyDefaultValue;
            this.docDataChanged[docFieldKey] = this.docFields[docFieldKey].propertyDefaultValue;
          } else {
            this.docData[docFieldKey] = value;
            this.docDataChanged[docFieldKey] = value;
          }
        },
      });
    }

    this.getCollectionId = this.getCollectionId.bind(this);
    this.getDocId = this.getDocId.bind(this);

    // Firestore functions.
    this.deserializeFromFirestore = this.deserializeFromFirestore.bind(this);
    this.createDoc = this.createDoc.bind(this);
    this.updateDoc = this.updateDoc.bind(this);
    this.deleteDoc = this.deleteDoc.bind(this);
    this.refreshDoc = this.refreshDoc.bind(this);

    // Device Cache functions.
    this.serializeToCache = this.serializeToCache.bind(this);
    this.deserializeFromCache = this.deserializeFromCache.bind(this);
  }

  /**
   * Get the collection id of this model.
   * @returns {string}
   */
  getCollectionId() {
    return this.collectionId;
  }

  /**
   * Get the document id of this model.
   * @returns {string}
   */
  getDocId() {
    return this.docId;
  }

  /**
   * Deserialize firestore document into the model.
   * @param documentSnapshot Firestore document snapshot.
   */
  deserializeFromFirestore(documentSnapshot) {
    this.docId = documentSnapshot.id;
    this.docData = documentSnapshot.data();
  }

  /**
   * Create a firestore document from this model.
   * @returns {Promise<void>}
   */
  createDoc() {
    return new Promise(async (resolve, reject) => {
      try {
        if (typeof this.collectionId !== 'string' || this.collectionId === '') {
          reject({
            title: 'Error',
            message: 'Unable to create document as collection id is not defined.',
          });
          return;
        }

        if (Object.keys(this.docData).length === 0) {
          reject({
            title: 'Error',
            message: 'Unable to create document as document data is empty.',
          });
          return;
        }

        if (typeof this.docId !== 'string' || this.docId === '') {
          let documentReference = await firestore()
            .collection(this.collectionId)
            .add(this.docData);

          this.docId = documentReference.id;
        } else {
          await firestore()
            .collection(this.collectionId)
            .doc(this.docId)
            .set(this.docData);
        }

        this.docDataChanged = {};
        resolve();
      } catch (e) {
        reject({title: 'Error', message: e.message});
      }
    });
  }

  /**
   * Update firestore document from this model.
   * @returns {Promise<void>}
   */
  updateDoc() {
    return new Promise(async (resolve, reject) => {
      try {
        if (typeof this.collectionId !== 'string' || this.collectionId === '') {
          reject({
            title: 'Error',
            message: 'Unable to update document as collection id is not defined.',
          });
          return;
        }

        if (Object.keys(this.docDataChanged).length === 0) {
          reject({
            title: 'Error',
            message: 'Unable to update document as document data is remain unchanged.',
          });
          return;
        }

        await firestore()
          .collection(this.collectionId)
          .doc(this.docId)
          .update(this.docDataChanged);

        this.docDataChanged = {};
        resolve();
      } catch (e) {
        reject({title: 'Error', message: e.message});
      }
    });
  }

  /**
   * Delete firestore document from this model.
   * @returns {Promise<void>}
   */
  deleteDoc() {
    return new Promise(async (resolve, reject) => {
      try {
        if (typeof this.collectionId !== 'string' || this.collectionId === '') {
          reject({
            title: 'Error',
            message: 'Unable to delete document as collection id is not defined.',
          });
          return;
        }

        if (typeof this.docId !== 'string' || this.docId === '') {
          reject({
            title: 'Error',
            message: 'Unable to delete document as document id is not defined.',
          });
          return;
        }

        await firestore()
          .collection(this.collectionId)
          .doc(this.docId)
          .delete();

        this.docDataChanged = {};
        resolve();
      } catch (e) {
        reject({title: 'Error', message: e.message});
      }
    });
  }

  /**
   * Refresh this model using new data from firestore.
   */
  refreshDoc() {
    return new Promise(async (resolve, reject) => {
      try {
        if (typeof this.collectionId !== 'string' || this.collectionId === '') {
          reject({
            title: 'Error',
            message: 'Unable to refresh document as collection id is not defined.',
          });
          return;
        }

        if (typeof this.docId !== 'string' || this.docId === '') {
          reject({
            title: 'Error',
            message: 'Unable to refresh document as document id is not defined.',
          });
          return;
        }

        let documentSnapshot = await firestore()
          .collection(this.collectionId)
          .doc(this.docId)
          .get();

        this.deserializeFromFirestore(documentSnapshot);
        resolve();
      } catch (e) {
        reject({title: 'Error', message: e.message});
      }
    });
  }

  /**
   * Serialize this model to json string representation that works perfectly for device cache.
   * @returns {string}
   */
  serializeToCache() {
    return JSON.stringify({
      docId: this.docId,
      docData: this.docData,
    });
  }

  /**
   * Deserialize cache json data into the model.
   * @param {string} cache Json string data.
   */
  deserializeFromCache(cache) {
    const cacheString = JSON.parse(cache);

    this.docId = cacheString.docId;
    this.docData = cacheString.docData;
  }
}
