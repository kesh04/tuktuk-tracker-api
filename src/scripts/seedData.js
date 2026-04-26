import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';   

dotenv.config();

const seedUser = async () => {
  try {
  
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(' Connected to MongoDB');
    

    await User.deleteMany({});
    console.log(' Cleared existing users');
    

    const adminUser = await User.create({
      username: 'central_admin',
      email: 'admin@police.lk',
      password: 'Admin@123',
      role: 'central_admin',
      isActive: true
    });
    
    console.log(' Admin user created successfully!');
        console.log(`  Email:    ${adminUser.email}`);
    console.log(`  Password: Admin@123`);
    console.log(`  Role:     ${adminUser.role}`);

    const testUsers = await User.create([
      {
        username: 'provincial_admin1',
        email: 'provincial@police.lk',
        password: 'Provincial@123',
        role: 'provincial_admin',
        isActive: true
      },
      {
        username: 'police_officer1',
        email: 'officer@police.lk',
        password: 'Officer@123',
        role: 'police_station',
        isActive: true
      },
      {
        username: 'viewer1',
        email: 'viewer@police.lk',
        password: 'Viewer@123',
        role: 'viewer',
        isActive: true
      }
    ]);
    
 
    console.log(`  Provincial Admin: provincial@police.lk / Provincial@123`);
    console.log(`  Police Officer:   officer@police.lk / Officer@123`);
    console.log(`  Viewer:           viewer@police.lk / Viewer@123`);
    console.log('Completed !');

    
    process.exit(0);
  } catch (error) {
    console.error(' error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
};

seedUser();