const routes = require('./routers/appConfig')
require('dotenv').config();

const port = process.env.PORT || 3000;
routes.listen(port, () => {
    console.log(`port is running on port ${port}`);
  });