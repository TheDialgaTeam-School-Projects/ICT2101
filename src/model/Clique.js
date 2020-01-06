import {Model} from './Model';

/**
 * @property {string} cliqueName
 * @property {string} cliqueSynopsis
 * @property {string} cliqueLeader
 * @property {string[]} cliqueMembers
 * @property {string[]} cliqueRequests
 * @property {number} cliqueTaskPoint
 */
export class Clique extends Model {
  constructor() {
    super({
      collectionId: 'cliques',
      docFields: {
        cliqueName: {
          propertyName: 'cliqueName',
          propertyDefaultValue: '',
        },
        cliqueSynopsis: {
          propertyName: 'cliqueSynopsis',
          propertyDefaultValue: '',
        },
        cliqueLeader: {
          propertyName: 'cliqueLeader',
          propertyDefaultValue: '',
        },
        cliqueMembers: {
          propertyName: 'cliqueMembers',
          propertyDefaultValue: [],
        },
        cliqueRequest: {
          propertyName: 'cliqueRequest',
          propertyDefaultValue: [],
        },
        cliqueTaskPoint: {
          propertyName: 'cliqueTaskPoint',
          propertyDefaultValue: 0,
        },
        cliqueTask1: {
          propertyName: 'cliqueTask1',
          propertyDefaultValue: {},
        },
        cliqueTask2: {
          propertyName: 'cliqueTask2',
          propertyDefaultValue: {},
        },
        cliqueTask3: {
          propertyName: 'cliqueTask3',
          propertyDefaultValue: {},
        },
        cliqueVacancy: {
          propertyName: 'cliqueVacancy',
          propertyDefaultValue: true,
        },
      },
    });

    this.getCliqueId = this.getCliqueId.bind(this);
    this.getCliqueVacancy = this.getCliqueVacancy.bind(this);
  }

  getCliqueId() {
    return this.docId;
  }

  getCliqueVacancy() {
    return 6 - this.cliqueMembers.length;
  }
}
