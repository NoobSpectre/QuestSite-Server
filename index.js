import { app } from './App.js';
import { config } from 'dotenv';
import connectDB from './database/connection.js';

/* CONFIGURATIONS */
config();

/* DATABASE CONNECTION */
connectDB();

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is litening on port ${PORT}`);
});
