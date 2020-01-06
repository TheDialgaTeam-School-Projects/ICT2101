const admin = require('firebase-admin');
const serviceAccount = require('./scrambled-tasks-firebase-adminsdk-f1h4i-9f8e98d2e9');
const nodemailer = require('nodemailer');

async function main() {
  const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://scrambled-tasks.firebaseio.com',
  });

  const weeklyUserWinnersQuery = await app
    .firestore()
    .collection('users')
    .orderBy('taskPoint', 'desc')
    .limit(3)
    .get();

  const weeklyUserWinnerIds = [];

  weeklyUserWinnersQuery.forEach(result => {
    weeklyUserWinnerIds.push(result.data().userId);
  });

  const emails = [];
  const users = await app.auth().listUsers();
  users.users.forEach(value => {
    if (weeklyUserWinnerIds.includes(value.uid)) {
      emails.push(value.email);
    }
  });

  const transport = nodemailer.createTransport({
    host: 'mail.gatewayroleplay.org',
    port: 25,
    secure: false,
    auth: {
      user: 'mail@gatewayroleplay.org',
      pass: '8%yxq+J?!q$NS3GX',
    },
  });

  await transport.sendMail({
    from: '"ScrambledTasks Administrator" <mail@gatewayroleplay.org>',
    to: emails.join(', '),
    subject: 'ScrambledTasks Weekly Winners',
    text: `Hello Players,

You are in the top 3 for weekly leaderboard. Here is your reward!

Redeem Code: STreward-s8KSley5J

Thanks,
Your ScrambledTasks team`,
  });

  process.exit();
}

main().catch(console.error);
