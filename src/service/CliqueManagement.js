import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Clique} from '../model/Clique';
import UserManagement from './UserManagement';

export default class CliqueManagement {
  /**
   * Create a new clique.
   * @param {string} cliqueName The name of the clique to create.
   * @param {string} cliqueSynopsis The clique synopsis.
   * @returns {Promise<Clique>}
   */
  static createClique(cliqueName, cliqueSynopsis) {
    return new Promise(async (resolve, reject) => {
      try {
        const currentUser = auth().currentUser;

        if (currentUser === null) {
          reject({title: 'Error', message: 'User is not logged in.'});
          return;
        }

        if (cliqueName === '') {
          reject({title: 'Error', message: 'Please enter a clique name.'});
          return;
        }

        if (typeof cliqueSynopsis !== 'string') {
          reject({
            title: 'Error',
            message: 'Clique synopsis require to be a string type.',
          });
          return;
        }

        const userModel = await UserManagement.getCurrentUserModel(true);

        if (userModel.cliqueId !== '') {
          reject({
            title: 'Error',
            message: 'This user is already in a clique.',
          });
          return;
        }

        const allClique = await this.getAllCliques();

        for (let i = 0; i < allClique.length; i++) {
          let clique = allClique[i];

          if (clique.cliqueName === cliqueName) {
            reject({
              title: 'Error',
              message: 'This clique name is already taken.',
            });
            return;
          }
        }
        //console.log(userModel.username);
        const cliqueModel = new Clique();
        cliqueModel.cliqueName = cliqueName;
        cliqueModel.cliqueSynopsis = cliqueSynopsis;
        cliqueModel.cliqueLeader = userModel.username;
        cliqueModel.cliqueMembers.push(userModel.username);
        cliqueModel.cliqueVacancy = true;
        var database = firestore().collection('tasks').where('type', '==', 'Clique');
        let taskArray = [];
        let snapShot = await database.get();
        snapShot.forEach(document=> {
                  taskArray.push(document.data());
          });
          //console.log(taskArray[0])
          cliqueModel.cliqueTask1 = taskArray[0];
          cliqueModel.cliqueTask2 = taskArray[1];
          cliqueModel.cliqueTask3 = taskArray[2];
          //console.log(taskArray[0]);
          await cliqueModel.createDoc();
          var getUserId;
          userDB = firestore().collection('users').where('username', '==', userModel.username);

          getSnapShot = await userDB.get();
          getSnapShot.forEach(data=>{
              getUserId = data.id;
          });
          firestore().collection('users').doc(getUserId).update({cliqueId: cliqueName});
          //call the method getCurrentUserModel to true

        resolve(cliqueModel);
      } catch (e) {
        reject({title: 'Error', message: e.message});
      }
    });
  }

  /**
   * Get all the cliques formed.
   * @returns {Promise<Clique[]>}
   */
  static getAllCliques() {
    return new Promise(async (resolve, reject) => {
      try {
        const querySnapshot = await firestore()
          .collection('cliques')
          .get();
        let result = [];
        querySnapshot.forEach(documentSnapshot => {
          const cliqueModel = new Clique();
          cliqueModel.deserializeFromFirestore(documentSnapshot);
          result.push(cliqueModel);

        });
        //console.log(result);
        resolve(result);
      } catch (e) {
        reject({title: 'Error', message: e.message});
      }
    });
  }//end of getAllClique
  static getOneClique(getCliqueName){
        return new Promise(async (resolve, reject) => {
              try{
                    const querySnap = await firestore().collection('cliques').where('cliqueName','==',getCliqueName).get();
                    let result;
                    querySnap.forEach(documentSnapshot=>{
                      const cliqueModel = new Clique();
                      cliqueModel.deserializeFromFirestore(documentSnapshot);
                      result = cliqueModel;
                      //console.log(result);

                    });
                    resolve(result);

              } catch (e) {
                reject({title: 'Error', message: e.message});
              }
        });
  }//end of one clique


  static joinClique(getUserName,getCliqueName) {
      try {

          let result = [];
          //collect the clique database
          firestore().collection('cliques').where('cliqueName', '==', getCliqueName).get().then(cliqueCollect=>{

            cliqueCollect.forEach(doc => {
              const cliqueModel = new Clique();
              cliqueModel.deserializeFromFirestore(doc);
              //console.log(cliqueModel);
              result.push(cliqueModel);
              });

              //check if the clique is vacancy
              if(result[0].docData.cliqueVacancy){
                  //add the request to the array
                  if(result[0].docData.cliqueRequest.length == 0){
                      firestore().collection('cliques').doc(result[0].docId).update({cliqueRequest: firestore.FieldValue.arrayUnion(getUserName)});
                          Alert.alert('Success', 'Have Submit Your Request', [
                            {text: 'OK', onPress: () => console.log('Cancel'), style: 'cancel'},
                          ]);

                  }//end of if request 0

                  else{
                      //check if the user have request in the
                      if (result[0].docData.cliqueRequest.indexOf(getUserName) !== -1) {
                            Alert.alert('Error', 'You have already requested', [
                              {text: 'OK', onPress: () => console.log('Cancel'), style: 'cancel'},
                            ]);

                      } else if(result[0].docData.cliqueMembers.indexOf(getUserName) !== -1) {
                            Alert.alert('Error', 'You already are in the clique', [
                              {text: 'OK', onPress: () => console.log('Cancel'), style: 'cancel'},
                        ]);
                        //when the clique request is 4 and the 5th user send a request, it will set the vacancy to false as the request is full
                      } else if (result[0].docData.cliqueRequest.length == 4) {
                            firestore().collection('cliques').doc(result[0].docId).update({cliqueRequest: firestore.FieldValue.arrayUnion(getUserName)});

                            firestore().collection('cliques').doc(result[0].docId).update({cliqueVacancy: false});

                            Alert.alert('Success', 'Have Submit Your Request', [
                              {text: 'OK', onPress: () => console.log('Cancel'), style: 'cancel'},
                            ]);


                      } else {
                        firestore().collection('cliques').doc(result[0].docId).update({cliqueRequest: firestore.FieldValue.arrayUnion(getUserName)});
                            Alert.alert('Success', 'Have Submit Your Request', [
                              {text: 'OK', onPress: () => console.log('Cancel'), style: 'cancel'},
                            ]);

                      }

                  }//end else request length is 0


              }//end if vacancy
              else {
                Alert.alert('Error', 'The Clique Request is full ', [
                  {text: 'OK', onPress: () => console.log('Cancel'), style: 'cancel'},
                ]);
              }//end of else vacancy


          });//end of get collection

        } catch (e) {
        console.log({title: 'Error', message: e.message});
      }
  } //end of join clique

  /**
   * Get all the cliques formed.
   * @returns {Promise<{cliqueName: string, cliqueMembers: string[], cliqueLeader: string, cliqueInformation: string, cliqueTaskPoint: number,cliqueVacancy: boolean,cliqueRequest: string[]}[]>}
   */
  static async acceptCliqueMember(getRequestCliqueMember, getCliqueName) {

      try {

        const getUserLogIn = await UserManagement.getCurrentUserModel(true);
        let getLoginUserName = getUserLogIn.username;
        let result = [];
        let getCliqueID;
        let getUserId;

        //get the clique data from databse
        let cliqueCollect = await firestore()
          .collection('cliques')
          .where('cliqueName', '==', getCliqueName)
          .get();
        cliqueCollect.forEach(doc => {
          const cliqueModel = new Clique();
          cliqueModel.deserializeFromFirestore(doc);
          result.push(cliqueModel);
          getCliqueID = doc.id;
        });

        //get the user data that is accepting from database
        let userCollect = await firestore().collection('users').where('username','==',getRequestCliqueMember).get();
        let getUserArray;
        userCollect.forEach(doc=>{

            getUserArray = doc.data();
            getUserId = doc.id;
        });
            //check if the user login is the clique leader
            if(getLoginUserName == result[0].cliqueLeader){
                  //check user request have he join any clique
                  if(getUserArray.cliqueId == null || getUserArray.cliqueId == ""){
                      //check the clique member length
                      if (result[0].cliqueMembers.length == 0) {
                        //when the request number is max of 5, when it accept the a request, it will set the vacancy back to true
                        if (result[0].cliqueRequest.length == 5) {
                          await firestore().collection('cliques').doc(getCliqueID).update({cliqueMembers: firestore.FieldValue.arrayUnion(getRequestCliqueMember)});
                          await firestore().collection('cliques').doc(getCliqueID).update({cliqueRequest: firestore.FieldValue.arrayRemove(getRequestCliqueMember)});
                          await firestore().collection('cliques').doc(getCliqueID).update({cliqueVacancy: true});
                          await firestore().collection('users').doc(getUserId).update({cliqueId:getCliqueName});

                        } else {
                          await firestore().collection('cliques').doc(getCliqueID).update({cliqueMembers: firestore.FieldValue.arrayUnion(getRequestCliqueMember)});
                          await firestore().collection('cliques').doc(getCliqueID).update({cliqueRequest: firestore.FieldValue.arrayRemove(getRequestCliqueMember)});
                          await firestore().collection('users').doc(getUserId).update({cliqueId:getCliqueName});

                        }
                      } else {
                          /*when the length of member is 5 which include the leader, when it accept the 5th member, it will not accept any more request,
                          it set the vacancy to false and remove all the request.
                          */
                          if (result[0].cliqueMembers.length == 5) {
                            await firestore().collection('cliques').doc(getCliqueID).update({cliqueMembers: firestore.FieldValue.arrayUnion(getRequestCliqueMember)});
                            for (let i = 0; i < result[0].cliqueRequest.length; i++) {
                              await firestore().collection('cliques').doc(getCliqueID).update({cliqueRequest: firestore.FieldValue.arrayRemove(result[0].cliqueRequest[i])});
                            }
                            //await firestore().collection('cliques').doc(getID).update({cliqueRequest:firestore.FieldValue.delete()});
                            await firestore().collection('cliques').doc(getCliqueID).update({cliqueVacancy: false});
                            await firestore().collection('users').doc(getUserId).update({cliqueId:getCliqueName});


                          } else {
                              await firestore().collection('cliques').doc(getCliqueID).update({cliqueMembers: firestore.FieldValue.arrayUnion(getRequestCliqueMember)});
                              await firestore().collection('cliques').doc(getCliqueID).update({cliqueRequest: firestore.FieldValue.arrayRemove(getRequestCliqueMember)});
                              await firestore().collection('users').doc(getUserId).update({cliqueId:getCliqueName});

                          }
                      }
                }//ensure that the user join is not in clique
                else{
                    await firestore().collection('cliques').doc(getCliqueID).update({cliqueRequest: firestore.FieldValue.arrayRemove(getRequestCliqueMember)});
                }
          }//end of ensure user is cliqueleader
          else{
            Alert.alert('Error', 'You are not a clique Leader ', [
              {text: 'OK', onPress: () => console.log('Cancel'), style: 'cancel'},
            ]);
          }
      } catch (e) {
        console.log({title: 'Error', message: e.message});
      }
  } //end of accept clique member

  /**
   * Get all the cliques formed.
   * @returns {Promise<{cliqueName: string, cliqueMembers: string[], cliqueLeader: string, cliqueInformation: string, cliqueTaskPoint: number,cliqueVacancy: boolean,cliqueRequest: string[]}[]>}
   */
  static async rejectRequestMember(getRequestCliqueMember, getCliqueName) {
      try {
        let result = [];
        let getID;

        //get the user login detail
        const getUserLogIn = await UserManagement.getCurrentUserModel(true);
        let getLoginUserName = getUserLogIn.username;

        //get the clique database
        let cliqueCollect = await firestore()
          .collection('cliques')
          .where('cliqueName', '==', getCliqueName)
          .get();
        cliqueCollect.forEach(doc => {
          const cliqueModel = new Clique();
          cliqueModel.deserializeFromFirestore(doc);
          result.push(cliqueModel);
          getID = doc.id;
        });
          //get the user login if it is clique leader, other wise user cannot reject request
          if(getLoginUserName == result[0].cliqueLeader){
              //this will set the vacancy to true if the request is max of 5
              if (result[0].cliqueRequest.length == 5) {
                await firestore()
                  .collection('cliques')
                  .doc(getID)
                  .update({cliqueRequest: firestore.FieldValue.arrayRemove(getRequestCliqueMember)});
                await firestore()
                  .collection('cliques')
                  .doc(getID)
                  .update({cliqueVacancy: true});
              } else {
                await firestore()
                  .collection('cliques')
                  .doc(getID)
                  .update({cliqueRequest: firestore.FieldValue.arrayRemove(getRequestCliqueMember)});
              }
          }//check is user log in is clique Leader
          else{
            Alert.alert('Error', 'You are not a clique Leader ', [
              {text: 'OK', onPress: () => console.log('Cancel'), style: 'cancel'},
            ]);
          }
      } catch (e) {
        console.log({title: 'Error', message: e.message});
      }

  } //end of function rejectRequestMember

  static async removeMember(getCliqueMember, getCliqueName) {

      try {
        let result = [];
        let getCliqueID;
        const getUserLogIn = await UserManagement.getCurrentUserModel(true);
        let getLoginUserName = getUserLogIn.username;

        //get clique data from data base
        let cliqueCollect = await firestore()
          .collection('cliques')
          .where('cliqueName', '==', getCliqueName)
          .get();
        cliqueCollect.forEach(doc => {
          const cliqueModel = new Clique();
          cliqueModel.deserializeFromFirestore(doc);
          result.push(cliqueModel);
          getCliqueID = doc.id;
        });

        //get user data from data base
        let userCollect = await firestore().collection('users').where('username','==',getCliqueMember).get();
        let getUserArray;
        userCollect.forEach(doc=>{

            getUserArray = doc.data();
            getUserId = doc.id;
        });
          //only allow the cliqueLeader when login in to remove clique member
          if(getLoginUserName == result[0].cliqueLeader){
              //check if the member trying to remove is not clique leader
              if(getCliqueMember !== result[0].cliqueLeader ){
                    //if the number of member is max of 5 + including the clique leader, it will set the vacancy to true
                    if (result[0].cliqueMembers.length == 6) {
                      await firestore().collection('cliques').doc(getCliqueID).update({cliqueMembers: firestore.FieldValue.arrayRemove(getCliqueMember)});
                      await firestore().collection('cliques').doc(getCliqueID).update({cliqueVacancy: true});
                      await firestore().collection('users').doc(getUserId).update({cliqueId:""});
                    } else {
                      await firestore().collection('cliques').doc(getCliqueID).update({cliqueMembers: firestore.FieldValue.arrayRemove(getCliqueMember)});
                      await firestore().collection('users').doc(getUserId).update({cliqueId:""});
                    }
                }else{
                  Alert.alert('Error', 'Cannot remove Clique Leader ', [
                    {text: 'OK', onPress: () => console.log('Cancel'), style: 'cancel'},
                  ]);
                }
          }else{
            Alert.alert('Error', 'You are not clique leader ', [
              {text: 'OK', onPress: () => console.log('Cancel'), style: 'cancel'},
            ]);
          }
      } catch (e) {
        console.log({title: 'Error', message: e.message});
      }

  }//end of remove Member

  static async leaveClique(getCliqueMember,getCliqueName){
        try{
              let result = [];
              let getCliqueID;
              //collect the data from the database for the clique
              let cliqueCollect = await firestore()
                .collection('cliques')
                .where('cliqueName', '==', getCliqueName)
                .get();
              cliqueCollect.forEach(doc => {
                const cliqueModel = new Clique();
                cliqueModel.deserializeFromFirestore(doc);
                result.push(cliqueModel);
                getCliqueID = doc.id;
              });

              //collect the user data from the database
              let userCollect = await firestore().collection('users').where('username','==',getCliqueMember).get();
              let getUserArray;
              userCollect.forEach(doc=>{

                  getUserArray = doc.data();
                  getUserId = doc.id;
              });
              //this ensure that only non clique leader can leave clique
              if(getCliqueMember !== result[0].cliqueLeader ){
                  //if the length of member is max, it will set the clique to allow user to join
                  if (result[0].cliqueMembers.length == 6) {
                    await firestore().collection('cliques').doc(getCliqueID).update({cliqueMembers: firestore.FieldValue.arrayRemove(getCliqueMember)});
                    await firestore().collection('cliques').doc(getCliqueID).update({cliqueVacancy: true});
                    await firestore().collection('users').doc(getUserId).update({cliqueId:""});
                  } else {
                    await firestore().collection('cliques').doc(getCliqueID).update({cliqueMembers: firestore.FieldValue.arrayRemove(getCliqueMember)});
                    await firestore().collection('users').doc(getUserId).update({cliqueId:""});
                  }

              }else{
                Alert.alert('Error', 'Clique Leader cannot leave Clique ', [
                  {text: 'OK', onPress: () => console.log('Cancel'), style: 'cancel'},
                ]);
              }

        }catch (e) {
          console.log({title: 'Error', message: e.message});
        }
  }//end of leave clique function

  deleteClique() {
    return new Promise(async (resolve, reject) => {
      try {
        const userModel = await UserManagement.getCurrentUserModel(true);
        var nameClique = [];

        var database = await firestore()
          .collection('cliques')
          .where('cliqueLeader', '==', userModel.username)
          .get();

        //if user is cliqueLeader
        if (database.size > 0) {
          //store cliqueName to array and delete clique from database
          database.forEach(function(doc){
            nameClique.push(doc.data().cliqueName)
            doc.ref.delete();
          });

          /**get users with in same clique as cliqueLeader and set cliqueName to default state
             since clique has been removed**/
          var db = await firestore()
            .collection('users')
            .where('cliqueId', '==', nameClique[0])
            .get()
            .then(function(querySnapshot) {
              querySnapshot.forEach(function(doc){
                console.log(doc.data().username);
                doc.ref.update({cliqueId: ''});
              });
            });
          resolve();
        } else {
          reject({title: 'Error:', message: 'You are not the Clique Leader.'});
        }
      } catch (e) {
        reject({title: 'Error:', message: e.message});

      }
    });
  }
}
