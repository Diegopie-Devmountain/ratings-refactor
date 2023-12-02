import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import ViteExpress from 'vite-express';
import { Movie, User } from './models/index.js'
import router from './routes/index.js';

const app = express();
const port = '4090';
ViteExpress.config({ printViteDevServerHost: true });

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: false }));

app.use(router);

// Custom route middleware function that checks if the user is logged in.
function loginRequired(req, res, next) {
  if (!req.session.userId) {
    res.status(401).json({ error: 'Unauthorized' });
  } else {
    next();
  }
}

app.get('/api/ratings', loginRequired, async (req, res) => {
  const { userId } = req.session;

  const user = await User.findByPk(userId);
  const ratings = await user.getRatings({
    include: {
      model: Movie,
      attributes: ['title'],
    },
  });

  res.json(ratings);
});

app.post('/api/ratings', loginRequired, async (req, res) => {
  const { userId } = req.session;
  const { movieId, score } = req.body;

  const user = await User.findByPk(userId);
  const rating = await user.createRating({ movieId: movieId, score: score });

  res.json(rating);
});

ViteExpress.listen(app, port, () => console.log(`Server is listening on http://localhost:${port}`));
