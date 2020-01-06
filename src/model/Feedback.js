import {Model} from './Model';

/**
 * @property {geopoint} startPoint
 * @property {geopoint} endPoint
 * @property {number} safety
 * @property {number} speed
 * @property {number} enjoyment
 */
export class Feedback extends Model {
  constructor() {
    super({
      collectionId: 'feedback',
      docFields: {
        startPoint: {
          propertyName: 'startPoint',
          propertyDefaultValue: null,
        },
        endPoint: {
          propertyName: 'endPoint',
          propertyDefaultValue: null,
        },
        safety: {
          propertyName: 'safety',
          propertyDefaultValue: 0,
        },
        speed: {
          propertyName: 'speed',
          propertyDefaultValue: 0,
        },
        enjoyment: {
          propertyName: 'enjoyment',
          propertyDefaultValue: 0,
        },
      },
    });

    this.getFeedbackId = this.getFeedbackId.bind(this);
  }

  getFeedbackId() {
    return this.docId;
  }

}
