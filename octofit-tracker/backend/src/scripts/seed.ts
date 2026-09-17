import mongoose from 'mongoose';
import { Activity } from '../models/Activity';
import { LeaderboardEntry } from '../models/LeaderboardEntry';
import { Team } from '../models/Team';
import { User } from '../models/User';
import { Workout } from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      User.deleteMany({}),
      Team.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const [trailblazers, circuitBreakers, coreCrew] = await Team.insertMany([
      { name: 'Trailblazers', mascot: 'Comet' },
      { name: 'Circuit Breakers', mascot: 'Bolt' },
      { name: 'Core Crew', mascot: 'Anchor' },
    ]);

    const [maya, jordan, priya, leo] = await User.insertMany([
      {
        username: 'maya_runner',
        displayName: 'Maya Chen',
        email: 'maya.chen@example.com',
        teamId: trailblazers._id,
      },
      {
        username: 'jordan_lifts',
        displayName: 'Jordan Smith',
        email: 'jordan.smith@example.com',
        teamId: circuitBreakers._id,
      },
      {
        username: 'priya_pace',
        displayName: 'Priya Patel',
        email: 'priya.patel@example.com',
        teamId: trailblazers._id,
      },
      {
        username: 'leo_cycles',
        displayName: 'Leo Garcia',
        email: 'leo.garcia@example.com',
        teamId: coreCrew._id,
      },
    ]);

    await Activity.insertMany([
      {
        userId: maya._id,
        type: 'Morning Run',
        durationMinutes: 42,
        caloriesBurned: 410,
        completedAt: new Date('2026-09-14T12:30:00.000Z'),
      },
      {
        userId: jordan._id,
        type: 'Strength Training',
        durationMinutes: 55,
        caloriesBurned: 520,
        completedAt: new Date('2026-09-15T22:00:00.000Z'),
      },
      {
        userId: priya._id,
        type: 'Yoga Flow',
        durationMinutes: 35,
        caloriesBurned: 190,
        completedAt: new Date('2026-09-16T11:45:00.000Z'),
      },
      {
        userId: leo._id,
        type: 'Indoor Cycling',
        durationMinutes: 48,
        caloriesBurned: 460,
        completedAt: new Date('2026-09-17T00:15:00.000Z'),
      },
    ]);

    await LeaderboardEntry.insertMany([
      { userId: jordan._id, teamId: circuitBreakers._id, points: 1840 },
      { userId: maya._id, teamId: trailblazers._id, points: 1725 },
      { userId: leo._id, teamId: coreCrew._id, points: 1590 },
      { userId: priya._id, teamId: trailblazers._id, points: 1485 },
    ]);

    await Workout.insertMany([
      {
        name: '5K Tempo Builder',
        description: 'Alternating steady miles and short surges for runners improving race pace.',
        difficulty: 'intermediate',
        durationMinutes: 40,
      },
      {
        name: 'Foundational Strength Circuit',
        description: 'Full-body dumbbell circuit focused on squats, presses, rows, and core stability.',
        difficulty: 'beginner',
        durationMinutes: 35,
      },
      {
        name: 'Climb Ride Intervals',
        description: 'Progressive cycling intervals that simulate rolling hill climbs and recoveries.',
        difficulty: 'advanced',
        durationMinutes: 50,
      },
      {
        name: 'Mobility Reset',
        description: 'Low-impact flow for hips, hamstrings, shoulders, and breathing control.',
        difficulty: 'beginner',
        durationMinutes: 25,
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
