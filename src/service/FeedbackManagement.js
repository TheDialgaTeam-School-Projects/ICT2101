import firestore from '@react-native-firebase/firestore';
import {Feedback} from '../model/Feedback';

export default class FeedbackManagement {
  /**
   * Create a new feedback.
   * @param {geopoint} startPoint
   * @param {geopoint} endPoint
   * @param {number} safety
   * @param {number} speed
   * @param {number} enjoyment
   * @returns {Promise<Feedback>}
   */
  static submitFeedback(startPoint, endPoint, safety, speed, enjoyment) {
    return new Promise(async (resolve, reject) => {
      try {
        if (startPoint === null || endPoint === null) {
          reject({title: 'Error', message: 'Origin or End destination not found'});
          return;
        }

        const feedbackModel = new Feedback();
        feedbackModel.startPoint = startPoint;
        feedbackModel.endPoint = endPoint;
        feedbackModel.safety = safety;
        feedbackModel.speed = speed;
        feedbackModel.enjoyment = enjoyment;
        await feedbackModel.createDoc();

        resolve(feedbackModel);
      } catch (e) {
        reject({title: 'Error', message: e.message});
      }
    });
  }

  /**
   * Get all feedback.
   * @returns {Promise<Feedback[]>}
   */
  static getAllFeedback() {
    return new Promise(async (resolve, reject) => {
      try {
        const querySnapshot = await firestore()
          .collection('feedback')
          .get();

        let result = [];

        querySnapshot.forEach(documentSnapshot => {
          const feedbackModel = new Feedback();
          feedbackModel.deserializeFromFirestore(documentSnapshot);
          result.push(feedbackModel);
        });

        resolve(result);
      } catch (e) {
        reject({title: 'Error', message: e.message});
      }
    });
  }
}
