import firestore from '@react-native-firebase/firestore';
import UserManagement from './UserManagement';

export default class TaskManagement {
  taskDaily() {
    return new Promise(async (resolve, reject) => {
      var database = await firestore()
        .collection('tasks')
        .where('type', '==', 'daily')
        .get();

      var userArray = [];
      database.forEach(document => {
        userArray.push(document.data());
      });
      resolve(userArray);
      console.log(userArray);
    });
  }

  taskWeekly() {
    return new Promise(async (resolve, reject) => {
      var database = await firestore()
        .collection('tasks')
        .where('type', '==', 'weekly')
        .get();

      var userArray = [];
      database.forEach(document => {
        userArray.push(document.data());
      });
      resolve(userArray);
      console.log(userArray);
    });
  }

  taskClique() {
    return new Promise(async (resolve, reject) => {
      var database = await firestore()
        .collection('tasks')
        .where('type', '==', 'clique')
        .get();

      var cliqueArray = [];
      database.forEach(document => {
        cliqueArray.push(document.data());
      });
      resolve(cliqueArray);
      console.log(cliqueArray);
    });
  }
}

export async function updateTask(commuteMethod, distanceCover) {
  let allLower;
  let commuteMethodConvert;
  allLower = commuteMethod.toLowerCase();
  commuteMethodConvert = allLower.charAt(0).toUpperCase() + allLower.slice(1);

  const userNameArray = await UserManagement.getCurrentUserModel(true);
  let getUserName = userNameArray.username;
  let userData = await firestore()
    .collection('users')
    .where('username', '==', getUserName)
    .get();
  let userDocId;
  let userArray;
  userData.forEach(doc => {
    userArray = doc.data();
    userDocId = doc.id;
  });

  //console.log(userArray.Daily1.commuteMethod);
  //console.log(task[0]);
  if (userArray.Daily1.commuteMethod == commuteMethodConvert) {
    if (userArray.Daily1.taskCompleted == false) {
      if (userArray.Daily1.progress + distanceCover > userArray.Daily1.target) {
        firestore()
          .collection('users')
          .doc(userDocId)
          .update({'Daily1.progress': userArray.Daily1.target});
        firestore()
          .collection('users')
          .doc(userDocId)
          .update({'Daily1.taskCompleted': true});
        firestore()
          .collection('users')
          .doc(userDocId)
          .update({taskPoint: firestore.FieldValue.increment(userArray.Daily1.taskPoint)});
      } else {
        firestore()
          .collection('users')
          .doc(userDocId)
          .update({'Daily1.progress': firestore.FieldValue.increment(distanceCover)});
      }
    } //if not completed, update progress and check if it will be more
  }

  if (userArray.Daily2.commuteMethod == commuteMethodConvert) {
    if (userArray.Daily2.taskCompleted == false) {
      if (userArray.Daily2.progress + distanceCover > userArray.Daily2.target) {
        firestore()
          .collection('users')
          .doc(userDocId)
          .update({'Daily2.progress': userArray.Daily2.target});
        firestore()
          .collection('users')
          .doc(userDocId)
          .update({'Daily2.taskCompleted': true});
        firestore()
          .collection('users')
          .doc(userDocId)
          .update({taskPoint: firestore.FieldValue.increment(userArray.Daily2.taskPoint)});
      } else {
        firestore()
          .collection('users')
          .doc(userDocId)
          .update({'Daily2.progress': firestore.FieldValue.increment(distanceCover)});
      }
    } //if not completed, update progress and check if it will be more
  }

  if (userArray.Daily3.commuteMethod == commuteMethodConvert) {
    if (userArray.Daily3.taskCompleted == false) {
      if (userArray.Daily3.progress + distanceCover > userArray.Daily3.target) {
        firestore()
          .collection('users')
          .doc(userDocId)
          .update({'Daily3.progress': userArray.Daily3.target});
        firestore()
          .collection('users')
          .doc(userDocId)
          .update({'Daily3.taskCompleted': true});
        firestore()
          .collection('users')
          .doc(userDocId)
          .update({taskPoint: firestore.FieldValue.increment(userArray.Daily3.taskPoint)});
      } else {
        firestore()
          .collection('users')
          .doc(userDocId)
          .update({'Daily3.progress': firestore.FieldValue.increment(distanceCover)});
      }
    } //if not completed, update progress and check if it will be more
  }

  if (userArray.Weekly1.commuteMethod == commuteMethodConvert) {
    if (userArray.Weekly1.taskCompleted == false) {
      if (userArray.Weekly1.progress + distanceCover > userArray.Weekly1.target) {
        firestore()
          .collection('users')
          .doc(userDocId)
          .update({'Weekly1.progress': userArray.Weekly1.target});
        firestore()
          .collection('users')
          .doc(userDocId)
          .update({'Weekly1.taskCompleted': true});
        firestore()
          .collection('users')
          .doc(userDocId)
          .update({taskPoint: firestore.FieldValue.increment(userArray.Weekly1.taskPoint)});
      } else {
        firestore()
          .collection('users')
          .doc(userDocId)
          .update({'Weekly1.progress': firestore.FieldValue.increment(distanceCover)});
      }
    } //if not completed, update progress and check if it will be more
  }

  if (userArray.Weekly2.commuteMethod == commuteMethodConvert) {
    if (userArray.Weekly2.taskCompleted == false) {
      if (userArray.Weekly2.progress + distanceCover > userArray.Weekly2.target) {
        firestore()
          .collection('users')
          .doc(userDocId)
          .update({'Weekly2.progress': userArray.Weekly2.target});
        firestore()
          .collection('users')
          .doc(userDocId)
          .update({'Weekly2.taskCompleted': true});
        firestore()
          .collection('users')
          .doc(userDocId)
          .update({taskPoint: firestore.FieldValue.increment(userArray.Weekly2.taskPoint)});
      } else {
        firestore()
          .collection('users')
          .doc(userDocId)
          .update({'Weekly2.progress': firestore.FieldValue.increment(distanceCover)});
      }
    } //if not completed, update progress and check if it will be more
  }

  if (userArray.Weekly3.commuteMethod == commuteMethodConvert) {
    if (userArray.Weekly3.taskCompleted == false) {
      if (userArray.Weekly3.progress + distanceCover > userArray.Weekly3.target) {
        firestore()
          .collection('users')
          .doc(userDocId)
          .update({'Weekly3.progress': userArray.Weekly3.target});
        firestore()
          .collection('users')
          .doc(userDocId)
          .update({'Weekly3.taskCompleted': true});
        firestore()
          .collection('users')
          .doc(userDocId)
          .update({taskPoint: firestore.FieldValue.increment(userArray.Weekly3.taskPoint)});
      } else {
        firestore()
          .collection('users')
          .doc(userDocId)
          .update({'Weekly3.progress': firestore.FieldValue.increment(distanceCover)});
      }
    } //if not completed, update progress and check if it will be more
  } //end of Weekly3

  if (userArray.cliqueId !== '') {
    cliqueData = await firestore()
      .collection('cliques')
      .where('cliqueName', '==', userArray.cliqueId)
      .get();
    let cliqueDocId;
    let cliqeuArray;
    cliqueData.forEach(doc => {
      cliqeuArray = doc.data();
      cliqueDocId = doc.id;
    });
    if (cliqeuArray.cliqueTask1.commuteMethod == commuteMethodConvert) {
      if (cliqeuArray.cliqueTask1.taskCompleted == false) {
        if (cliqeuArray.cliqueTask1.progress + distanceCover > cliqeuArray.cliqueTask1.target) {
          firestore()
            .collection('cliques')
            .doc(cliqueDocId)
            .update({'cliqueTask1.progress': cliqeuArray.cliqueTask1.target});
          firestore()
            .collection('cliques')
            .doc(cliqueDocId)
            .update({'cliqueTask1.taskCompleted': true});
          firestore()
            .collection('cliques')
            .doc(cliqueDocId)
            .update({cliqueTaskPoint: firestore.FieldValue.increment(cliqeuArray.cliqueTask1.taskPoint)});
        } else {
          firestore()
            .collection('cliques')
            .doc(cliqueDocId)
            .update({'cliqueTask1.progress': firestore.FieldValue.increment(distanceCover)});
        }
      } //if not completed, update progress and check if it will be more
    }

    if (cliqeuArray.cliqueTask2.commuteMethod == commuteMethodConvert) {
      if (cliqeuArray.cliqueTask2.taskCompleted == false) {
        if (cliqeuArray.cliqueTask2.progress + distanceCover > cliqeuArray.cliqueTask2.target) {
          firestore()
            .collection('cliques')
            .doc(cliqueDocId)
            .update({'cliqueTask2.progress': cliqeuArray.cliqueTask2.target});
          firestore()
            .collection('cliques')
            .doc(cliqueDocId)
            .update({'cliqueTask2.taskCompleted': true});
          firestore()
            .collection('cliques')
            .doc(cliqueDocId)
            .update({cliqueTaskPoint: firestore.FieldValue.increment(cliqeuArray.cliqueTask2.taskPoint)});
        } else {
          firestore()
            .collection('cliques')
            .doc(cliqueDocId)
            .update({'cliqueTask2.progress': firestore.FieldValue.increment(distanceCover)});
        }
      } //if not completed, update progress and check if it will be more
    } //end of clique task 2

    if (cliqeuArray.cliqueTask3.commuteMethod == commuteMethodConvert) {
      if (cliqeuArray.cliqueTask3.taskCompleted == false) {
        if (cliqeuArray.cliqueTask3.progress + distanceCover > cliqeuArray.cliqueTask3.target) {
          firestore()
            .collection('cliques')
            .doc(cliqueDocId)
            .update({'cliqueTask3.progress': cliqeuArray.cliqueTask3.target});
          firestore()
            .collection('cliques')
            .doc(cliqueDocId)
            .update({'cliqueTask3.taskCompleted': true});
          firestore()
            .collection('cliques')
            .doc(cliqueDocId)
            .update({cliqueTaskPoint: firestore.FieldValue.increment(cliqeuArray.cliqueTask3.taskPoint)});
        } else {
          firestore()
            .collection('cliques')
            .doc(cliqueDocId)
            .update({'cliqueTask3.progress': firestore.FieldValue.increment(distanceCover)});
        }
      } //if not completed, update progress and check if it will be more
    } //end clique task 3
  } //if user have clique
} //end of updateTask function
