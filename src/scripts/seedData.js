import mongoose from 'mongoose';
import dotenv from 'dotenv';

import User from '../models/User.js';
import Province from '../models/Province.js';
import District from '../models/District.js';
import PoliceStation from '../models/PoliceStation.js';
import Vehicle from '../models/Vehicle.js';
import LocationPing from '../models/LocationPing.js';

import {
  SL_PROVINCES, POLICE_STATIONS_DATA,
  generateVehicles
} from '../utils/generateData.js';

dotenv.config();

const generatePings10s = (vehicles, daysBack = 7) => {
  const pings = [];
  const now = new Date();

  for (const vehicle of vehicles) {
    if (vehicle.status !== 'active') continue;

    const [baseLng, baseLat] = vehicle.lastLocation.coordinates;

    for (let day = 0; day < daysBack; day++) {
      for (let hour = 6; hour < 22; hour++) {
        const minute = Math.floor(Math.random() * 60);

        let lat = baseLat + (Math.random() - 0.5) * 0.01 * (hour - 6);
        let lng = baseLng + (Math.random() - 0.5) * 0.01 * (hour - 6);

        for (let sec = 0; sec < 60; sec += 10) {
          lat += (Math.random() - 0.5) * 0.0002;
          lng += (Math.random() - 0.5) * 0.0002;

          const ts = new Date(now);
          ts.setDate(ts.getDate() - day);
          ts.setHours(hour, minute, sec, 0);

          pings.push({
            vehicle: vehicle._id,
            location: { type: 'Point', coordinates: [lng, lat] },
            speed: Math.floor(Math.random() * 65),
            heading: Math.floor(Math.random() * 360),
            accuracy: Math.floor(Math.random() * 20) + 5,
            timestamp: ts
          });
        }
      }
    }
  }
  return pings;
};

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(' Connected to MongoDB\n');

    console.log('  Clearing existing data...');
    await Promise.all([
      User.deleteMany({}),
      Province.deleteMany({}),
      District.deleteMany({}),
      PoliceStation.deleteMany({}),
      Vehicle.deleteMany({}),
      LocationPing.deleteMany({})
    ]);
    console.log(' All collections cleared\n');

    console.log(' Seeding 9 provinces...');
    const createdProvinces = [];
    for (const p of SL_PROVINCES) {
      const province = await Province.create({ name: p.name, code: p.code });
      createdProvinces.push({ ...p, _id: province._id });
    }
    console.log(` ${createdProvinces.length} provinces created`);

    console.log(' Seeding 25 districts...');
    const createdDistricts = [];
    for (const p of createdProvinces) {
      for (const d of p.districts) {
        const district = await District.create({ name: d.name, code: d.code, province: p._id });
        await Province.findByIdAndUpdate(p._id, { $push: { districts: district._id } });
        createdDistricts.push({ ...d, _id: district._id, provinceId: p._id });
      }
    }
    console.log(` ${createdDistricts.length} districts created`);

    console.log(' Seeding 25 police stations...');
    const createdStations = [];
    for (const ps of POLICE_STATIONS_DATA) {
      const district = createdDistricts.find(d => d.code === ps.districtCode);
      if (!district) { console.warn(`  ⚠ District not found for code ${ps.districtCode}`); continue; }

      const station = await PoliceStation.create({
        name: ps.name,
        code: ps.code,
        district: district._id,
        address: ps.address,
        contactNumber: ps.contact,
        location: { type: 'Point', coordinates: [ps.lng, ps.lat] }
      });
      await District.findByIdAndUpdate(district._id, { $push: { policeStations: station._id } });
      createdStations.push(station);
    }
    console.log(` ${createdStations.length} police stations created`);

    console.log('👤 Seeding users...');
    const wpProvince = createdProvinces.find(p => p.code === 'WP');
    const colDistrict = createdDistricts.find(d => d.code === 'COL');
    const colStation = createdStations.find(s => s.code === 'COL_PS_01');

    await User.create([
      {
        username: 'central_admin',
        email: 'admin@police.lk',
        password: 'Admin@123',
        role: 'central_admin',
        isActive: true
      },
      {
        username: 'provincial_admin_wp',
        email: 'provincial@police.lk',
        password: 'Provincial@123',
        role: 'provincial_admin',
        province: wpProvince._id,
        isActive: true
      },
      {
        username: 'officer_colombo',
        email: 'officer@police.lk',
        password: 'Officer@123',
        role: 'police_station',
        district: colDistrict._id,
        policeStation: colStation._id,
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

    console.log(' Seeding 200 tuk-tuks...');
    const vehicleData = generateVehicles(
      createdDistricts.map(d => ({ _id: d._id, code: d.code })),
      createdStations
    );
    const insertedVehicles = await Vehicle.insertMany(vehicleData);
    console.log(` ${insertedVehicles.length} vehicles registered`);

    console.log(' Generating 10-second interval location pings...');

    const activeVehicles = insertedVehicles.filter(v => v.status === 'active');
    let totalInserted = 0;

    for (const vehicle of activeVehicles) {
      const existingCount = await LocationPing.countDocuments({ vehicle: vehicle._id });
      if (existingCount > 0) {
        console.log(`  ⏭  Skipping ${vehicle.registrationNumber} — ${existingCount} pings already exist`);
        continue;
      }

      const vehiclePings = generatePings10s([vehicle], 7);

      const BATCH = 500;
      for (let i = 0; i < vehiclePings.length; i += BATCH) {
        await LocationPing.insertMany(vehiclePings.slice(i, i + BATCH));
      }

      totalInserted += vehiclePings.length;
      process.stdout.write(`\r   ${totalInserted} pings inserted (${vehicle.registrationNumber})    `);
    }

    console.log(` ${totalInserted} total location pings created (10s intervals)`);
    console.log('   Login Credentials:');
    console.log('  central_admin    → admin@police.lk        / Admin@123');
    console.log('  provincial_admin → provincial@police.lk   / Provincial@123');
    console.log('  police_station   → officer@police.lk      / Officer@123');
    console.log('  viewer           → viewer@police.lk       / Viewer@123');
    console.log('   Swagger Docs → http://localhost:3000/apidocs');
    console.log('Completed !');
    
    process.exit(0);
  } catch (error) {
    console.error(' error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
};

seed();