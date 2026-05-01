
export const SL_PROVINCES = [
  { name: 'Western Province',         code: 'WP',  districts: [
    { name: 'Colombo',     code: 'COL', lat: 6.9271,  lng: 79.8612 },
    { name: 'Gampaha',     code: 'GAM', lat: 7.0917,  lng: 80.0000 },
    { name: 'Kalutara',    code: 'KAL', lat: 6.5854,  lng: 79.9607 }
  ]},
  { name: 'Central Province',          code: 'CP',  districts: [
    { name: 'Kandy',        code: 'KAN', lat: 7.2906,  lng: 80.6337 },
    { name: 'Matale',       code: 'MAT', lat: 7.4675,  lng: 80.6234 },
    { name: 'Nuwara Eliya', code: 'NUW', lat: 6.9497,  lng: 80.7891 }
  ]},
  { name: 'Southern Province',         code: 'SP',  districts: [
    { name: 'Galle',        code: 'GAL', lat: 6.0535,  lng: 80.2210 },
    { name: 'Matara',       code: 'MTA', lat: 5.9549,  lng: 80.5550 },
    { name: 'Hambantota',   code: 'HAM', lat: 6.1429,  lng: 81.1212 }
  ]},
  { name: 'Northern Province',         code: 'NP',  districts: [
    { name: 'Jaffna',       code: 'JAF', lat: 9.6615,  lng: 80.0255 },
    { name: 'Kilinochchi',  code: 'KIL', lat: 9.3803,  lng: 80.4037 },
    { name: 'Mannar',       code: 'MAN', lat: 8.9761,  lng: 79.9044 },
    { name: 'Mullaitivu',   code: 'MUL', lat: 9.2671,  lng: 80.8128 },
    { name: 'Vavuniya',     code: 'VAV', lat: 8.7514,  lng: 80.4971 }
  ]},
  { name: 'Eastern Province',          code: 'EP',  districts: [
    { name: 'Trincomalee',  code: 'TRI', lat: 8.5874,  lng: 81.2152 },
    { name: 'Batticaloa',   code: 'BAT', lat: 7.7170,  lng: 81.6924 },
    { name: 'Ampara',       code: 'AMP', lat: 7.2980,  lng: 81.6747 }
  ]},
  { name: 'North Western Province',    code: 'NWP', districts: [
    { name: 'Kurunegala',   code: 'KUR', lat: 7.4867,  lng: 80.3647 },
    { name: 'Puttalam',     code: 'PUT', lat: 8.0362,  lng: 79.8283 }
  ]},
  { name: 'North Central Province',    code: 'NCP', districts: [
    { name: 'Anuradhapura', code: 'ANU', lat: 8.3114,  lng: 80.4037 },
    { name: 'Polonnaruwa',  code: 'POL', lat: 7.9403,  lng: 81.0188 }
  ]},
  { name: 'Uva Province',              code: 'UP',  districts: [
    { name: 'Badulla',      code: 'BAD', lat: 6.9934,  lng: 81.0550 },
    { name: 'Monaragala',   code: 'MON', lat: 6.8728,  lng: 81.3507 }
  ]},
  { name: 'Sabaragamuwa Province',     code: 'SGP', districts: [
    { name: 'Ratnapura',    code: 'RAT', lat: 6.6828,  lng: 80.3992 },
    { name: 'Kegalle',      code: 'KEG', lat: 7.2513,  lng: 80.3464 }
  ]}
];

export const POLICE_STATIONS_DATA = [
  { name: 'Colombo Fort Police Station',      code: 'COL_PS_01', districtCode: 'COL', address: 'Fort, Colombo 01',                contact: '0112421111', lat: 6.9344, lng: 79.8428 },
  { name: 'Maradana Police Station',          code: 'COL_PS_02', districtCode: 'COL', address: 'Maradana, Colombo 10',            contact: '0112695609', lat: 6.9217, lng: 79.8617 },
  { name: 'Wellampitiya Police Station',      code: 'COL_PS_03', districtCode: 'COL', address: 'Wellampitiya, Colombo',           contact: '0112533232', lat: 6.9340, lng: 79.8900 },
  { name: 'Negombo Police Station',           code: 'GAM_PS_01', districtCode: 'GAM', address: 'Main Street, Negombo',            contact: '0312222222', lat: 7.2090, lng: 79.8370 },
  { name: 'Ja-Ela Police Station',            code: 'GAM_PS_02', districtCode: 'GAM', address: 'Ja-Ela, Gampaha',                contact: '0112234567', lat: 7.0747, lng: 79.8910 },
  { name: 'Kalutara Police Station',          code: 'KAL_PS_01', districtCode: 'KAL', address: 'Main Street, Kalutara',           contact: '0342222222', lat: 6.5880, lng: 79.9590 },
  { name: 'Kandy Central Police Station',     code: 'KAN_PS_01', districtCode: 'KAN', address: 'DS Senanayake Veediya, Kandy',    contact: '0812222222', lat: 7.2932, lng: 80.6350 },
  { name: 'Peradeniya Police Station',        code: 'KAN_PS_02', districtCode: 'KAN', address: 'Peradeniya Road, Kandy',          contact: '0812388119', lat: 7.2686, lng: 80.5994 },
  { name: 'Katugastota Police Station',       code: 'KAN_PS_03', districtCode: 'KAN', address: 'Katugastota, Kandy',              contact: '0812499119', lat: 7.3208, lng: 80.6358 },
  { name: 'Matale Police Station',            code: 'MAT_PS_01', districtCode: 'MAT', address: 'Kings Street, Matale',            contact: '0662222222', lat: 7.4680, lng: 80.6230 },
  { name: 'Nuwara Eliya Police Station',      code: 'NUW_PS_01', districtCode: 'NUW', address: 'Park Road, Nuwara Eliya',         contact: '0522222222', lat: 6.9494, lng: 80.7883 },
  { name: 'Galle Police Station',             code: 'GAL_PS_01', districtCode: 'GAL', address: 'Gamini Mawatha, Galle',           contact: '0912222222', lat: 6.0328, lng: 80.2170 },
  { name: 'Hikkaduwa Police Station',         code: 'GAL_PS_02', districtCode: 'GAL', address: 'Hikkaduwa, Galle',               contact: '0912277555', lat: 6.1395, lng: 80.1006 },
  { name: 'Matara Police Station',            code: 'MTA_PS_01', districtCode: 'MTA', address: 'Anagarika Dharmapala Mw, Matara', contact: '0412222222', lat: 5.9488, lng: 80.5350 },
  { name: 'Hambantota Police Station',        code: 'HAM_PS_01', districtCode: 'HAM', address: 'Hambantota',                     contact: '0472222222', lat: 6.1244, lng: 81.1185 },
  { name: 'Jaffna Police Station',            code: 'JAF_PS_01', districtCode: 'JAF', address: 'Hospital Road, Jaffna',           contact: '0212222222', lat: 9.6680, lng: 80.0076 },
  { name: 'Vavuniya Police Station',          code: 'VAV_PS_01', districtCode: 'VAV', address: 'Kandy Road, Vavuniya',            contact: '0242222222', lat: 8.7508, lng: 80.4974 },
  { name: 'Trincomalee Police Station',       code: 'TRI_PS_01', districtCode: 'TRI', address: 'Inner Harbour Road, Trincomalee', contact: '0262222222', lat: 8.5667, lng: 81.2333 },
  { name: 'Batticaloa Police Station',        code: 'BAT_PS_01', districtCode: 'BAT', address: 'Lloyds Avenue, Batticaloa',       contact: '0652222222', lat: 7.7102, lng: 81.6924 },
  { name: 'Kurunegala Police Station',        code: 'KUR_PS_01', districtCode: 'KUR', address: 'Kurunegala',                     contact: '0372222222', lat: 7.4863, lng: 80.3627 },
  { name: 'Puttalam Police Station',          code: 'PUT_PS_01', districtCode: 'PUT', address: 'Puttalam',                       contact: '0322222222', lat: 8.0362, lng: 79.8283 },
  { name: 'Anuradhapura Police Station',      code: 'ANU_PS_01', districtCode: 'ANU', address: 'Maithripala Senanayake Mw, Anu',  contact: '0252222222', lat: 8.3110, lng: 80.4017 },
  { name: 'Polonnaruwa Police Station',       code: 'POL_PS_01', districtCode: 'POL', address: 'Polonnaruwa',                    contact: '0272222222', lat: 7.9403, lng: 81.0188 },
  { name: 'Ratnapura Police Station',         code: 'RAT_PS_01', districtCode: 'RAT', address: 'Main Street, Ratnapura',          contact: '0452222222', lat: 6.6830, lng: 80.3980 },
  { name: 'Badulla Police Station',           code: 'BAD_PS_01', districtCode: 'BAD', address: 'Bandarawela Road, Badulla',       contact: '0552222222', lat: 6.9936, lng: 81.0552 },
];

const OWNER_NAMES = [
  'Sunil Perera','Nimal Silva','Kamal Fernando','Anil Jayasinghe','Ruwan Bandara',
  'Priya Kumari','Saman Wickrama','Lasith Mendis','Chamara Rathnayake','Dinesh Gunawardena',
  'Thilak Dissanayake','Roshan Pathirana','Mahesh Senanayake','Gayan Weerasinghe','Nuwan Dias',
  'Kasun Jayawardena','Tharaka Madushan','Chaminda Rajapaksa','Dushmantha Chameera','Lahiru Thirimanne',
  'Asanka Gurusinha','Sanath Jayasuriya','Muttiah Muralitharan','Kumar Sangakkara','Mahela Jayawardena'
];

const REG_PREFIXES = ['AAA','AAB','AAC','AAD','AAE','AAF','AAG','AAH','AAI','AAJ'];

export const randomBetween = (min, max) => Math.random() * (max - min) + min;
export const randomInt    = (min, max) => Math.floor(randomBetween(min, max));
export const randomItem   = (arr)      => arr[randomInt(0, arr.length)];


export const generateVehicles = (districts, policeStations, count = 200) => {
  const vehicles  = [];
  const usedNics  = new Set();
  const usedDevs  = new Set();
  const usedRegs  = new Set();

  for (let i = 1; i <= count; i++) {
    let nic, deviceId, regNum;

    do { nic      = `${randomInt(700000000, 999999999)}V`; }           while (usedNics.has(nic));
    do { deviceId = `DEV${String(i).padStart(4,'0')}${randomInt(100,999)}`; } while (usedDevs.has(deviceId));
    do { regNum   = `${randomItem(REG_PREFIXES)}-${randomInt(1000,9999)}`; }   while (usedRegs.has(regNum));

    usedNics.add(nic); usedDevs.add(deviceId); usedRegs.add(regNum);

    const district = randomItem(districts);
    const stationsInDistrict = policeStations.filter(
      ps => ps.district.toString() === district._id.toString()
    );
    const policeStation = stationsInDistrict.length > 0 ? randomItem(stationsInDistrict) : null;

   
    const allDistricts = SL_PROVINCES.flatMap(p => p.districts);
    const distData     = allDistricts.find(d => d.code === district.code) || { lat: 7.0, lng: 80.5 };

    vehicles.push({
      registrationNumber: regNum,
      ownerName:  randomItem(OWNER_NAMES),
      ownerNic:   nic,
      ownerPhone: `07${randomInt(10000000, 99999999)}`,
      deviceId,
      status: Math.random() > 0.12 ? 'active' : (Math.random() > 0.5 ? 'inactive' : 'suspended'),
      district: district._id,
      policeStation: policeStation ? policeStation._id : undefined,
      lastLocation: {
        type: 'Point',
        coordinates: [
          distData.lng + randomBetween(-0.15, 0.15),
          distData.lat + randomBetween(-0.15, 0.15)
        ],
        timestamp: new Date()
      }
    });
  }
  return vehicles;
};

export const generatePings = (vehicles, daysBack = 7) => {
  const pings = [];
  const now   = new Date();

  for (const vehicle of vehicles) {
    if (vehicle.status !== 'active') continue;

    const [baseLng, baseLat] = vehicle.lastLocation.coordinates;
    const pingsPerDay = randomInt(4, 10);

    for (let day = 0; day < daysBack; day++) {
      let lat = baseLat;
      let lng = baseLng;

      for (let p = 0; p < pingsPerDay; p++) {
        lat += randomBetween(-0.008, 0.008);
        lng += randomBetween(-0.008, 0.008);

        const ts = new Date(now);
        ts.setDate(ts.getDate() - day);
        ts.setHours(randomInt(6, 22), randomInt(0, 59), randomInt(0, 59), 0);

        pings.push({
          vehicle:   vehicle._id,
          location:  { type: 'Point', coordinates: [lng, lat] },
          speed:     randomInt(0, 65),
          heading:   randomInt(0, 359),
          accuracy:  randomInt(5, 25),
          timestamp: ts
        });
      }
    }
  }
  return pings;
};
