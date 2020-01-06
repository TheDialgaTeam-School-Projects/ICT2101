import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {User} from '../model/User';

export default class UserManagement {
  /**
   * Authenticate the user with email and password.
   * @param {string} email Email for authentication.
   * @param {string} password Password for authentication.
   * @returns {Promise<void>}
   */
  static login(email, password) {
    return new Promise(async (resolve, reject) => {
      try {
        if (typeof email !== 'string' || email === '') {
          reject({title: 'Error', message: 'Email is empty.'});
          return;
        }

        if (typeof password !== 'string' || password === '') {
          reject({title: 'Error', message: 'Password is empty.'});
          return;
        }

        const userCredential = await auth().signInWithEmailAndPassword(email, password);

        // Check if the user has confirmed their email address.
        if (!userCredential.user.emailVerified) {
          await userCredential.user.sendEmailVerification();
          await auth().signOut();

          reject({
            title: 'Unverified account',
            message:
              'A new verification email has been sent. Please follow the link in your email to verify your account.',
          });
          return;
        }

        await this.getCurrentUserModel(true);

        resolve();
      } catch (e) {
        reject({title: 'Error', message: e.message});
      }
    });
  }

  /**
   * Logout the current session.
   * @returns {Promise<void>}
   */
  static logout() {
    return new Promise(async (resolve, reject) => {
      try {
        const currentUser = auth().currentUser;

        if (currentUser === null) {
          reject({title: 'Error', message: 'User is not logged in.'});
          return;
        }

        await auth().signOut();

        resolve();
      } catch (e) {
        reject({title: 'Error', message: e.message});
      }
    });
  }

  /**
   * Register a new user with email, password and the profile data.
   * @param {string} email Email to register.
   * @param {string} password Password to register.
   * @param {object} profileData Profile data to register.
   * @returns {Promise<User>}
   */
  static register(email, password, profileData = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        if (typeof email !== 'string' || email === '') {
          reject({title: 'Error', message: 'Email is empty.'});
          return;
        }

        if (typeof password !== 'string' || password === '') {
          reject({title: 'Error', message: 'Password is empty.'});
          return;
        }

        if (typeof profileData.username !== 'string' || profileData.username === '') {
          reject({title: 'Error', message: 'Username is empty.'});
          return;
        }

        let userModels = [];
        let userQuerySnapshot = await firestore()
          .collection('users')
          .get();

        if (userQuerySnapshot.size > 0) {
          userQuerySnapshot.forEach(user => {
            let userModel = new User();
            userModel.deserializeFromFirestore(user);
            userModels.push(userModel);
          });
        }

        for (let i = 0; i < userModels.length; i++) {
          let userModel = userModels[i];

          if (userModel.username === profileData.username) {
            reject({title: 'Error', message: 'Username is taken.'});
            return;
          }
        }

        const userCredential = await auth().createUserWithEmailAndPassword(email, password);
        await userCredential.user.sendEmailVerification();

        let dailyTasks = await UserManagement.getDailyTask();
        let weeklyTasks = await UserManagement.getWeeklyTask();

        const userModel = new User();
        userModel.userId = userCredential.user.uid;
        userModel.username = profileData.username;
        userModel.gender = profileData.gender;
        userModel.age = profileData.age;
        userModel.commuteMethod = profileData.commuteMethod;
        userModel.daily1 = dailyTasks[0];
        userModel.daily2 = dailyTasks[1];
        userModel.daily3 = dailyTasks[2];
        userModel.weekly1 = weeklyTasks[0];
        userModel.weekly2 = weeklyTasks[1];
        userModel.weekly3 = weeklyTasks[2];
        await userModel.createDoc();

        resolve(userModel);
      } catch (e) {
        reject({title: 'Error', message: e.message});
      }
    });
  }

  /**
   * Reset the password via email.
   * @param {string} email Email to reset password.
   * @returns {Promise<void>}
   */
  static resetPassword(email) {
    return new Promise(async (resolve, reject) => {
      try {
        await auth().sendPasswordResetEmail(email);
        resolve();
      } catch (e) {
        reject({title: 'Error', message: e.message});
      }
    });
  }

  /**
   * Get current user model.
   * @param {boolean} updateFromServer Force update from server?
   * @returns {Promise<User>}
   */
  static getCurrentUserModel(updateFromServer = false) {
    return new Promise(async (resolve, reject) => {
      try {
        const currentUser = auth().currentUser;

        if (currentUser === null) {
          resolve(null);
          return;
        }

        const userModelCacheJson = await AsyncStorage.getItem('userModel');
        const userModel = new User();

        if (!updateFromServer && userModelCacheJson) {
          userModel.deserializeFromCache(userModelCacheJson);
          resolve(userModel);
        } else {
          let query = await firestore()
            .collection('users')
            .where('userId', '==', currentUser.uid)
            .get();

          if (query.size === 0) {
            resolve(null);
            return;
          }

          userModel.deserializeFromFirestore(query.docs[0]);

          let userModelJson = userModel.serializeToCache();
          await AsyncStorage.setItem('userModel', userModelJson);

          resolve(userModel);
        }
      } catch (e) {
        reject({title: 'Error', message: e.message});
      }
    });
  }

  /**
   * Get current user model.
   * @returns {Promise<User>}
   */
  static getUserData(getUserName) {
    return new Promise(async (resolve, reject) => {
      try {
        let query = await firestore()
          .collection('users')
          .where('username', '==', getUserName)
          .get();
        let result;
        query.forEach(doc => {
          const userModel = new User();
          userModel.deserializeFromFirestore(doc);
          result = userModel;
        });

        resolve(result);
      } catch (e) {
        reject({title: 'Error', message: e.message});
      }
    });
  }
  static getDailyTask() {
    return new Promise(async (resolve, reject) => {
      var database = await firestore()
        .collection('tasks')
        .where('type', '==', 'Daily')
        .get();

      var taskArray = [];
      database.forEach(function(document) {
        taskArray.push(document.data());
      });

      resolve(taskArray);
    });
  }

  static getWeeklyTask() {
    return new Promise(async (resolve, reject) => {
      var database = await firestore()
        .collection('tasks')
        .where('type', '==', 'Weekly')
        .get();

      var taskArray = [];
      database.forEach(function(document) {
        taskArray.push(document.data());
      });

      resolve(taskArray);
    });
  }
}
