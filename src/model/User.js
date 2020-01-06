import {Model} from './Model';

/**
 * @property {string} userId
 * @property {string} username
 * @property {string} gender
 * @property {number} age
 * @property {string} commuteMethod
 * @property {number} taskPoint
 * @property {number} totalDistanceWalk
 * @property {string} cliqueId
 */
export class User extends Model {
  constructor() {
    super({
      collectionId: 'users',
      docFields: {
        userId: {
          propertyName: 'userId',
          propertyDefaultValue: '',
        },
        username: {
          propertyName: 'username',
          propertyDefaultValue: '',
        },
        gender: {
          propertyName: 'gender',
          propertyDefaultValue: 'male',
        },
        age: {
          propertyName: 'age',
          propertyDefaultValue: '13-18',
        },
        commuteMethod: {
          propertyName: 'commuteMethod',
          propertyDefaultValue: 'walk',
        },
        taskPoint: {
          propertyName: 'taskPoint',
          propertyDefaultValue: 0,
        },
        totalDistanceWalk: {
          propertyName: 'totalDistanceWalk',
          propertyDefaultValue: 0,
        },
        cliqueId: {
          propertyName: 'cliqueId',
          propertyDefaultValue: '',
        },
        Daily1: {
          propertyName: 'daily1',
          propertyDefaultValue: {},
        },
        Daily2: {
          propertyName: 'daily2',
          propertyDefaultValue: {},
        },
        Daily3: {
          propertyName: 'daily3',
          propertyDefaultValue: {},
        },
        Weekly1: {
          propertyName: 'weekly1',
          propertyDefaultValue: {},
        },
        Weekly2: {
          propertyName: 'weekly2',
          propertyDefaultValue: {},
        },
        Weekly3: {
          propertyName: 'weekly3',
          propertyDefaultValue: {},
        },
      },
    });
  }
}
