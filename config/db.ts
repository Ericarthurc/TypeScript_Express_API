import mongoose from 'mongoose';
import chalk from 'chalk';

mongoose.connect(<string>process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', () => {
  console.log(chalk.red('Error occurred from the database'));
});
db.once('open', () => {
  console.log(chalk.cyan.underline.bold('Successfully opened the database'));
});
export default mongoose;
