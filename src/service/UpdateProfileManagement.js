import firestore from '@react-native-firebase/firestore';

export default class UpdateProfileManagement {
  updateCliqueName(newCliqueName) {
    return new Promise(async (resolve, reject) => {
      console.log(newCliqueName);
      if (typeof newCliqueName !== 'string' || newCliqueName === '') {
        reject({title: 'Error', message: 'Clique Name is empty.'});
        return;
      }
      try {
        await firestore()
          .collection('cliques')
          .where('cliqueInformation', '==', newCliqueName)
          .get()
          .then(snapshot => {
            if (snapshot.empty) {
              firestore()
                .collection('cliques')
                .doc('5GTHCvHFh3yC6Dc8O1MB') //hardcode need to change
                .update({
                  cliqueName: newCliqueName,
                });
            } else {
              reject({title: 'Error', message: 'Clique Name exists.'});
              return;
            }
          });
        resolve();
      } catch (e) {
        reject({title: 'Error', message: e.message});
      }
    });
  }

  updateCliqueInfo(newCliqueInfo) {
    return new Promise(async (resolve, reject) => {
      console.log(newCliqueInfo);
      try {
        await firestore()
          .collection('cliques')
          .doc('5GTHCvHFh3yC6Dc8O1MB') //hardcode need to change
          .update({
            cliqueName: newCliqueInfo,
          });

        resolve();
      } catch (e) {
        reject({title: 'Error', message: e.message});
      }
    });
  }
}
