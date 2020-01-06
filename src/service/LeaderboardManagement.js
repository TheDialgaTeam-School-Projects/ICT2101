import firestore from '@react-native-firebase/firestore';

export default class LeaderboardManagement {

  //get top 10 users highest taskPoints with in descending and store to array
  leaderboardUsers() {
    return new Promise(async (resolve, reject) => {
      var database = await firestore()
        .collection('users')
        .orderBy('taskPoint', 'desc')
        .limit(10)
        .get();

      var userArray = [];

      database.forEach(document => {
        userArray.push(document.data());
      });

      resolve(userArray);
    });
  }

  //get top 10 users highest clique taskPoints with in descending and store to array
  leaderboardCliques() {
    return new Promise(async (resolve, reject) => {
      var database = await firestore()
        .collection('cliques')
        .orderBy('cliqueTaskPoint', 'desc')
        .limit(10)
        .get();

      var userArray = [];
      
      database.forEach(document => {
        userArray.push(document.data());
      });

      resolve(userArray);
    });
  }
}
