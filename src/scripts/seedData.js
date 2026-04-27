import mongoose from 'mongoose';
import dotenv from 'dotenv';

import User         from '../models/User.js';
import Province     from '../models/Province.js';
import District     from '../models/District.js';
import PoliceStation from '../models/PoliceStation.js';
import Vehicle      from '../models/Vehicle.js';
import LocationPing from '../models/LocationPing.js';

import {
  SL_PROVINCES, POLICE_STATIONS_DATA,
  generateVehicles, generatePings
} from '../utils/generateData.js';

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');


    console.log('🗑  Clearing existing data...');
    await Promise.all([
      User.deleteMany({}),
      Province.deleteMany({}),
      District.deleteMany({}),
      PoliceStation.deleteMany({}),
      Vehicle.deleteMany({}),
      LocationPing.deleteMany({})
    ]);
    console.log(' All collections cleared\n');


    console.log('🌍 Seeding 9 provinces...');
    const createdProvinces = [];
    for (const p of SL_PROVINCES) {
      const province = await Province.create({ name: p.name, code: p.code });
      createdProvinces.push({ ...p, _id: province._id });
    }
    console.log(`✅ ${createdProvinces.length} provinces created`);


    console.log('🏙  Seeding 25 districts...');
    const createdDistricts = [];
    for (const p of createdProvinces) {
      for (const d of p.districts) {
        const district = await District.create({ name: d.name, code: d.code, province: p._id });
        await Province.findByIdAndUpdate(p._id, { $push: { districts: district._id } });
        createdDistricts.push({ ...d, _id: district._id, provinceId: p._id });
      }
    }
    console.log(`✅ ${createdDistricts.length} districts created`);


    console.log(' Seeding 25 police stations...');
    const createdStations = [];
    for (const ps of POLICE_STATIONS_DATA) {
      const district = createdDistricts.find(d => d.code === ps.districtCode);
      if (!district) { console.warn(`  ⚠ District not found for code ${ps.districtCode}`); continue; }

      const station = await PoliceStation.create({
        name:          ps.name,
        code:          ps.code,
        district:      district._id,
        address:       ps.address,
        contactNumber: ps.contact,
        location:      { type: 'Point', coordinates: [ps.lng, ps.lat] }
      });
      await District.findByIdAndUpdate(district._id, { $push: { policeStations: station._id } });
      createdStations.push(station);
    }
    console.log(` ${createdStations.length} police stations created`);


    console.log('👤 Seeding users...');
    const wpProvince  = createdProvinces.find(p => p.code === 'WP');
    const colDistrict = createdDistricts.find(d => d.code === 'COL');
    const colStation  = createdStations.find(s  => s.code === 'COL_PS_01');

    await User.create([
      {
        username: 'central_admin',
        email:    'admin@police.lk',
        password: 'Admin@123',
        role:     'central_admin',
        isActive: true
      },
      {
        username:  'provincial_admin_wp',
        email:     'provincial@police.lk',
        password:  'Provincial@123',
        role:      'provincial_admin',
        province:  wpProvince._id,
        isActive:  true
      },
      {
        username:      'officer_colombo',
        email:         'officer@police.lk',
        password:      'Officer@123',
        role:          'police_station',
        district:      colDistrict._id,
        policeStation: colStation._id,
        isActive:      true
      },
      {
        username: 'viewer1',
        email:    'viewer@police.lk',
        password: 'Viewer@123',
        role:     'viewer',
        isActive: true
      }
    ]);



    console.log(' Seeding 200 tuk-tuks...');
    const vehicleData = generateVehicles(
      createdDistricts.map(d => ({ _id: d._id, code: d.code })),
      createdStations
    );
    const insertedVehicles = await Vehicle.insertMany(vehicleData);
    console.log(`✅ ${insertedVehicles.length} vehicles registered`);

    
    console.log(' Generating  location history...');
    const pingData = generatePings(insertedVehicles, 7);
    const BATCH    = 500;
    for (let i = 0; i < pingData.length; i += BATCH) {
      await LocationPing.insertMany(pingData.slice(i, i + BATCH));
      process.stdout.write(`\r  Inserted ${Math.min(i + BATCH, pingData.length)} / ${pingData.length} pings`);
    }


  

    console.log('  central_admin    → admin@police.lk        / Admin@123');
    console.log('  provincial_admin → provincial@police.lk   / Provincial@123');
    console.log('  police_station   → officer@police.lk      / Officer@123');
    console.log('Completed !');
    
    process.exit(0);
  } catch (error) {
    console.error(' error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
};

seed();
