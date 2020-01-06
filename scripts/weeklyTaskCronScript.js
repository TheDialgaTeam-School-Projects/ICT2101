const admin = require('firebase-admin');
const serviceAccount = require('./scrambled-tasks-firebase-adminsdk-f1h4i-9f8e98d2e9');

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

async function main() {
  const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://scrambled-tasks.firebaseio.com',
  });

  // get a list of tasks that are daily.
  const dailyTaskQuery = await app
    .firestore()
    .collection('tasks')
    .where('type', '==', 'Daily')
    .get();

  // get a list of tasks that are weekly.
  const weeklyTaskQuery = await app
    .firestore()
    .collection('tasks')
    .where('type', '==', 'Weekly')
    .get();

  // get a list of tasks that are for clique.
  const cliqueTaskQuery = await app
    .firestore()
    .collection('tasks')
    .where('type', '==', 'Clique')
    .get();

  const dailyTasks = [];
  const weeklyTasks = [];
  const selectedWeeklyTasks = [];
  const cliqueTasks = [];

  dailyTaskQuery.forEach(result => {
    dailyTasks.push(result.data());
  });

  weeklyTaskQuery.forEach(result => {
    weeklyTasks.push(result.data());
  });

  cliqueTaskQuery.forEach(result => {
    cliqueTasks.push(result.data());
  });

  // Randomize for weekly tasks.
  for (let i = 0; i < 3; i++) {
    if (weeklyTasks.length === 0) {
      break;
    }

    let randomNumber = getRandomInt(weeklyTasks.length);
    selectedWeeklyTasks.push(weeklyTasks[randomNumber]);
    weeklyTasks.splice(randomNumber, 1);
  }

  // Sort the tasks.
  dailyTasks.sort((a, b) => {
    if (a.taskPoint > b.taskPoint) {
      return 1;
    } else if (a.taskPoint < b.taskPoint) {
      return -1;
    } else {
      return 0;
    }
  });

  selectedWeeklyTasks.sort((a, b) => {
    if (a.taskPoint > b.taskPoint) {
      return 1;
    } else if (a.taskPoint < b.taskPoint) {
      return -1;
    } else {
      return 0;
    }
  });

  cliqueTasks.sort((a, b) => {
    if (a.taskPoint > b.taskPoint) {
      return 1;
    } else if (a.taskPoint < b.taskPoint) {
      return -1;
    } else {
      return 0;
    }
  });

  // Upload these task to db.
  const userQuery = await app
    .firestore()
    .collection('users')
    .get();

  userQuery.forEach(async result => {
    await result.ref.update({
      Daily1: dailyTasks[0],
      Daily2: dailyTasks[1],
      Daily3: dailyTasks[2],
      Weekly1: selectedWeeklyTasks[0],
      Weekly2: selectedWeeklyTasks[1],
      Weekly3: selectedWeeklyTasks[2],
      taskPoint: 0,
    });
  });

  const cliqueQuery = await app
    .firestore()
    .collection('cliques')
    .get();

  cliqueQuery.forEach(async result => {
    await result.ref.update({
      cliqueTask1: cliqueTasks[0],
      cliqueTask2: cliqueTasks[1],
      cliqueTask3: cliqueTasks[2],
      cliqueTaskPoint: 0,
    });
  });

  process.exit();
}

main().catch(console.error);
