import { createServer } from './app';

const app = createServer();
const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
