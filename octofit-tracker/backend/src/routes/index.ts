import { Router } from 'express';
import { Activity } from '../models/Activity';
import { LeaderboardEntry } from '../models/LeaderboardEntry';
import { Team } from '../models/Team';
import { User } from '../models/User';
import { Workout } from '../models/Workout';

const router = Router();

router.get('/users/', async (_request, response, next) => {
  try {
    response.json(await User.find().lean());
  } catch (error) {
    next(error);
  }
});

router.get('/teams/', async (_request, response, next) => {
  try {
    response.json(await Team.find().lean());
  } catch (error) {
    next(error);
  }
});

router.get('/activities/', async (_request, response, next) => {
  try {
    response.json(await Activity.find().lean());
  } catch (error) {
    next(error);
  }
});

router.get('/leaderboard/', async (_request, response, next) => {
  try {
    response.json(await LeaderboardEntry.find().sort({ points: -1 }).lean());
  } catch (error) {
    next(error);
  }
});

router.get('/workouts/', async (_request, response, next) => {
  try {
    response.json(await Workout.find().lean());
  } catch (error) {
    next(error);
  }
});

export default router;