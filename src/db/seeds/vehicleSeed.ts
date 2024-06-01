const vehicleSeed = [
  {
    name: '2023 Toyota Alphard',
    images: [
      '664e2a93b5eeebf38e2b8439/images/vehicles/alphard.jpeg',
      '664e2a93b5eeebf38e2b8439/images/vehicles/alphard2.jpg',
      '664e2a93b5eeebf38e2b8439/images/vehicles/alphard3.jpg',
      '664e2a93b5eeebf38e2b8439/images/vehicles/alphard4.jpg',
    ],
    ownerId: '664e2a93b5eeebf38e2b8439',
    vin: '3FAHP0GA9CR273266',
    make: 'Toyota',
    model: 'Alphard',
    year: 2023,
    odometer: 20,
    color: 'White',
    condition: 'New',
    plateNumber: '',
    assembly: 'Complete-Built-Up',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    taxDate: 'Mon May 05 2025 02:11:13 GMT+0700 (Western Indonesia Time)',
    price: 950000000,
    dateAdded: 'Mon Jul 17 2023 07:00:00 GMT+0700 (Western Indonesia Time)',
    description: 'Praesent et condimentum mi. Ut elementum mi non.',
    sold: false,
    bodyType: 'MPV',
  },
  {
    name: '2023 Toyota FJ Cruiser',
    images: [
      '664e2a93b5eeebf38e2b8439/images/vehicles/fjcruiser.jpeg',
      '664e2a93b5eeebf38e2b8439/images/vehicles/fjcruiser2.JPG',
      '664e2a93b5eeebf38e2b8439/images/vehicles/fjcruiser3.JPG',
      '664e2a93b5eeebf38e2b8439/images/vehicles/fjcruiser4.JPG',
      '664e2a93b5eeebf38e2b8439/images/vehicles/fjcruiser5.JPG',
    ],
    ownerId: '664e2a93b5eeebf38e2b8439',
    vin: '1N6BD06T55C486886',
    make: 'Toyota',
    model: 'FJ Cruiser',
    year: 2023,
    odometer: 16,
    color: 'Grey',
    condition: 'New',
    plateNumber: '',
    assembly: 'Complete-Built-Up',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    taxDate: 'Thu Apr 24 2025 02:11:13 GMT+0700 (Western Indonesia Time)',
    price: 2050000000,
    dateAdded: 'Fri Aug 11 2023 07:00:00 GMT+0700 (Western Indonesia Time)',
    description:
      'Sed sagittis bibendum hendrerit. Nulla a consectetur metus. Sed leo.',
    sold: false,
    bodyType: 'SUV',
  },
  {
    ownerId: '664e2a93b5eeebf38e2b8439',
    name: '2022 Toyota Corolla',
    vin: 'JTDKARFU7J1234567',
    make: 'Toyota',
    model: 'Corolla',
    year: 2022,
    odometer: 5000,
    price: 500000000,
    color: 'White',
    condition: 'New',
    assembly: 'Complete-Built-Up',
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    sold: false,
    dateAdded: 'Sun Jan 15 2023 07:00:00 GMT+0700 (Western Indonesia Time)',
    description: 'A reliable and fuel-efficient compact car.',
    marketPrice: 510000000,
    purchasePrice: 490000000,
    specification: ['Air Conditioning', 'Bluetooth', 'Backup Camera'],
    bodyType: 'Sedan',
  },
  {
    ownerId: '664e2a93b5eeebf38e2b8439',
    name: '2019 Honda Accord',
    vin: '1HGCV1F12KA123456',
    make: 'Honda',
    model: 'Accord',
    year: 2019,
    odometer: 25000,
    price: 350000000,
    color: 'Black',
    condition: 'Used',
    assembly: 'Complete-Knock-Down',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    sold: false,
    dateAdded: 'Fri Mar 10 2023 07:00:00 GMT+0700 (Western Indonesia Time)',
    plateNumber: 'B 1234 XYZ',
    taxDate: 'Sat Jun 01 2024 07:00:00 GMT+0700 (Western Indonesia Time)',
    description: 'A spacious and comfortable midsize sedan.',
    marketPrice: 355000000,
    purchasePrice: 345000000,
    specification: ['Leather Seats', 'Sunroof', 'Navigation System'],
    bodyType: 'Sedan',
  },
  {
    ownerId: '664e2a93b5eeebf38e2b8439',
    name: '2020 Ford Mustang',
    vin: '1FA6P8TH0L5100001',
    make: 'Ford',
    model: 'Mustang',
    year: 2020,
    odometer: 15000,
    price: 800000000,
    color: 'Red',
    condition: 'New',
    assembly: 'Complete-Built-Up',
    transmission: 'Manual',
    fuelType: 'Petrol',
    sold: false,
    dateAdded: 'Mon Feb 20 2023 07:00:00 GMT+0700 (Western Indonesia Time)',
    description: 'A powerful and iconic sports car.',
    marketPrice: 810000000,
    purchasePrice: 790000000,
    specification: ['Heated Seats', 'Premium Audio', 'Backup Camera'],
    bodyType: 'Sport',
  },
  {
    ownerId: '664e2a93b5eeebf38e2b8439',
    name: '2018 BMW X5',
    vin: '5UXKR0C53J0X12345',
    make: 'BMW',
    model: 'X5',
    year: 2018,
    odometer: 40000,
    price: 900000000,
    color: 'Blue',
    condition: 'Used',
    assembly: 'Complete-Knock-Down',
    transmission: 'Automatic',
    fuelType: 'Diesel',
    sold: false,
    dateAdded: 'Sat Apr 01 2023 07:00:00 GMT+0700 (Western Indonesia Time)',
    plateNumber: 'D 9876 ABC',
    taxDate: 'Sun Sep 15 2024 07:00:00 GMT+0700 (Western Indonesia Time)',
    description: 'A luxurious and versatile SUV.',
    marketPrice: 910000000,
    purchasePrice: 890000000,
    specification: ['All-Wheel Drive', 'Panoramic Sunroof', 'Parking Sensors'],
    bodyType: 'SUV',
  },
  {
    ownerId: '664e2a93b5eeebf38e2b8439',
    name: '2021 Tesla Model 3',
    vin: '5YJ3E1EA0MF123456',
    make: 'Tesla',
    model: 'Model 3',
    year: 2021,
    odometer: 10000,
    price: 1200000000,
    color: 'Silver',
    condition: 'New',
    assembly: 'Complete-Built-Up',
    transmission: 'Automatic',
    fuelType: 'Electric',
    sold: false,
    dateAdded: 'Mon May 15 2023 07:00:00 GMT+0700 (Western Indonesia Time)',
    description: 'A high-performance electric sedan.',
    marketPrice: 1220000000,
    purchasePrice: 1180000000,
    specification: ['Autopilot', 'Glass Roof', 'Wireless Charging'],
    bodyType: 'Sedan',
  },
  {
    ownerId: '664e2a93b5eeebf38e2b8439',
    name: '2017 Audi A4',
    vin: 'WAUANAF44HN012345',
    make: 'Audi',
    model: 'A4',
    year: 2017,
    odometer: 35000,
    price: 400000000,
    color: 'Gray',
    condition: 'Used',
    assembly: 'Complete-Knock-Down',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    sold: false,
    dateAdded: 'Mon Jun 05 2023 07:00:00 GMT+0700 (Western Indonesia Time)',
    plateNumber: 'B 5678 DEF',
    taxDate: 'Thu Aug 01 2024 07:00:00 GMT+0700 (Western Indonesia Time)',
    description: 'A sleek and stylish luxury sedan.',
    marketPrice: 410000000,
    purchasePrice: 395000000,
    specification: ['LED Headlights', 'Blind Spot Monitor', 'Apple CarPlay'],
    bodyType: 'Sedan',
  },
  {
    ownerId: '664e2a93b5eeebf38e2b8439',
    name: '2016 Chevrolet Silverado',
    vin: '1GCVKREH0GZ123456',
    make: 'Chevrolet',
    model: 'Silverado',
    year: 2016,
    odometer: 60000,
    price: 600000000,
    color: 'Black',
    condition: 'Used',
    assembly: 'Complete-Knock-Down',
    transmission: 'Automatic',
    fuelType: 'Diesel',
    sold: false,
    dateAdded: 'Mon Jul 10 2023 07:00:00 GMT+0700 (Western Indonesia Time)',
    plateNumber: 'F 3456 GHI',
    taxDate: 'Fri Dec 15 2024 07:00:00 GMT+0700 (Western Indonesia Time)',
    description: 'A powerful and durable pickup truck.',
    marketPrice: 610000000,
    purchasePrice: 590000000,
    specification: ['Tow Package', 'Running Boards', '4WD'],
    bodyType: 'Pickup',
  },
  {
    ownerId: '664e2a93b5eeebf38e2b8439',
    name: '2022 Hyundai Tucson',
    vin: 'KM8J23A40NU123456',
    make: 'Hyundai',
    model: 'Tucson',
    year: 2022,
    odometer: 8000,
    price: 550000000,
    color: 'Green',
    condition: 'New',
    assembly: 'Complete-Built-Up',
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    sold: false,
    dateAdded: 'Sat Feb 25 2023 07:00:00 GMT+0700 (Western Indonesia Time)',
    description: 'A compact SUV with a stylish design and advanced features.',
    marketPrice: 560000000,
    purchasePrice: 540000000,
    specification: [
      'Adaptive Cruise Control',
      'Wireless Charging',
      'Heated Seats',
    ],
    bodyType: 'SUV',
  },
  {
    ownerId: '664e2a93b5eeebf38e2b8439',
    name: '2020 Mercedes-Benz GLC',
    vin: 'WDC0G4JB0LF123456',
    make: 'Mercedes-Benz',
    model: 'GLC',
    year: 2020,
    odometer: 20000,
    price: 950000000,
    color: 'White',
    condition: 'New',
    assembly: 'Complete-Built-Up',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    sold: false,
    dateAdded: 'Thu Apr 20 2023 07:00:00 GMT+0700 (Western Indonesia Time)',
    description:
      'A luxury compact SUV with a comfortable ride and a high-quality interior.',
    marketPrice: 960000000,
    purchasePrice: 940000000,
    specification: ['Panoramic Sunroof', 'All-Wheel Drive', 'Bluetooth'],
    bodyType: 'SUV',
  },
  {
    ownerId: '664e2a93b5eeebf38e2b8439',
    name: '2019 Subaru Outback',
    vin: '4S4BSANC0K3256789',
    make: 'Subaru',
    model: 'Outback',
    year: 2019,
    odometer: 30000,
    price: 550000000,
    color: 'Silver',
    condition: 'Used',
    assembly: 'Complete-Knock-Down',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    sold: false,
    dateAdded: 'Tue May 30 2023 07:00:00 GMT+0700 (Western Indonesia Time)',
    plateNumber: 'F 3456 JKL',
    taxDate: 'Mon Oct 30 2024 07:00:00 GMT+0700 (Western Indonesia Time)',
    description: 'A reliable and spacious crossover SUV.',
    marketPrice: 560000000,
    purchasePrice: 540000000,
    specification: ['All-Wheel Drive', 'Heated Seats', 'Rearview Camera'],
    bodyType: 'SUV',
  },
  {
    ownerId: '664e2a93b5eeebf38e2b8439',
    name: '2021 Nissan Leaf',
    vin: '1N4BZ0CP5MC123456',
    make: 'Nissan',
    model: 'Leaf',
    year: 2021,
    odometer: 12000,
    price: 700000000,
    color: 'Blue',
    condition: 'New',
    assembly: 'Complete-Built-Up',
    transmission: 'Automatic',
    fuelType: 'Electric',
    sold: false,
    dateAdded: 'Wed Jun 15 2023 07:00:00 GMT+0700 (Western Indonesia Time)',
    description: 'A compact electric car with zero emissions.',
    marketPrice: 710000000,
    purchasePrice: 690000000,
    specification: [
      'Electric Drive',
      'Navigation System',
      'Bluetooth Connectivity',
    ],
    bodyType: 'Hatchback',
  },
  {
    ownerId: '664e2a93b5eeebf38e2b8439',
    name: '2019 Toyota Hilux',
    vin: 'MR0HA3CDXJ0456789',
    make: 'Toyota',
    model: 'Hilux',
    year: 2019,
    odometer: 40000,
    price: 450000000,
    color: 'Black',
    condition: 'Used',
    assembly: 'Complete-Knock-Down',
    transmission: 'Manual',
    fuelType: 'Diesel',
    sold: false,
    dateAdded: 'Mon Aug 21 2023 07:00:00 GMT+0700 (Western Indonesia Time)',
    plateNumber: 'B 2345 LMN',
    taxDate: 'Tue Dec 21 2024 07:00:00 GMT+0700 (Western Indonesia Time)',
    description: 'A robust and durable pickup truck.',
    marketPrice: 460000000,
    purchasePrice: 440000000,
    specification: ['4WD', 'Tow Package', 'Bed Liner'],
    bodyType: 'Pickup',
  },
  {
    ownerId: '664e2a93b5eeebf38e2b8439',
    name: '2018 Volkswagen Golf',
    vin: '3VW547AU4JM123456',
    make: 'Volkswagen',
    model: 'Golf',
    year: 2018,
    odometer: 30000,
    price: 300000000,
    color: 'White',
    condition: 'Used',
    assembly: 'Complete-Knock-Down',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    sold: false,
    dateAdded: 'Tue Jul 11 2023 07:00:00 GMT+0700 (Western Indonesia Time)',
    plateNumber: 'D 6789 OPQ',
    taxDate: 'Wed Nov 11 2024 07:00:00 GMT+0700 (Western Indonesia Time)',
    description: 'A compact car with a sporty feel.',
    marketPrice: 310000000,
    purchasePrice: 290000000,
    specification: [
      'Turbocharged Engine',
      'Infotainment System',
      'Rearview Camera',
    ],
    bodyType: 'Hatchback',
  },
  {
    ownerId: '664e2a93b5eeebf38e2b8439',
    name: '2022 Kia Seltos',
    vin: 'KNDEU2AA5M7123456',
    make: 'Kia',
    model: 'Seltos',
    year: 2022,
    odometer: 5000,
    price: 400000000,
    color: 'Yellow',
    condition: 'New',
    assembly: 'Complete-Built-Up',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    sold: false,
    dateAdded: 'Wed Aug 30 2023 07:00:00 GMT+0700 (Western Indonesia Time)',
    description: 'A stylish and versatile subcompact SUV.',
    marketPrice: 410000000,
    purchasePrice: 390000000,
    specification: [
      'All-Wheel Drive',
      'Touchscreen Display',
      'Lane Keeping Assist',
    ],
    bodyType: 'SUV',
  },
  {
    ownerId: '664e2a93b5eeebf38e2b8439',
    name: '2020 Mazda CX-5',
    vin: 'JM3KFBCM6L0123456',
    make: 'Mazda',
    model: 'CX-5',
    year: 2020,
    odometer: 20000,
    price: 600000000,
    color: 'Red',
    condition: 'New',
    assembly: 'Complete-Built-Up',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    sold: false,
    dateAdded: 'Thu Sep 07 2023 07:00:00 GMT+0700 (Western Indonesia Time)',
    description: 'A compact crossover SUV with a refined design.',
    marketPrice: 610000000,
    purchasePrice: 590000000,
    specification: [
      'Heated Seats',
      'Premium Sound System',
      'Adaptive Cruise Control',
    ],
    bodyType: 'SUV',
  },
  {
    ownerId: '664e2a93b5eeebf38e2b8439',
    name: '2019 Mitsubishi Pajero Sport',
    vin: 'MMAGUKS10KH012345',
    make: 'Mitsubishi',
    model: 'Pajero Sport',
    year: 2019,
    odometer: 45000,
    price: 550000000,
    color: 'Silver',
    condition: 'Used',
    assembly: 'Complete-Knock-Down',
    transmission: 'Automatic',
    fuelType: 'Diesel',
    sold: false,
    dateAdded: 'Mon Jul 24 2023 07:00:00 GMT+0700 (Western Indonesia Time)',
    plateNumber: 'B 6789 RST',
    taxDate: 'Sat Nov 24 2024 07:00:00 GMT+0700 (Western Indonesia Time)',
    description: 'A rugged and capable SUV.',
    marketPrice: 560000000,
    purchasePrice: 540000000,
    specification: ['4WD', 'Sunroof', 'Leather Seats'],
    bodyType: 'SUV',
  },
  {
    ownerId: '664e2a93b5eeebf38e2b8439',
    name: '2021 Suzuki Swift',
    vin: 'JS2ZC93S6M7123456',
    make: 'Suzuki',
    model: 'Swift',
    year: 2021,
    odometer: 8000,
    price: 250000000,
    color: 'Blue',
    condition: 'New',
    assembly: 'Complete-Built-Up',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    sold: false,
    dateAdded: 'Wed Jun 28 2023 07:00:00 GMT+0700 (Western Indonesia Time)',
    description: 'A compact and sporty hatchback.',
    marketPrice: 260000000,
    purchasePrice: 240000000,
    specification: [
      'Infotainment System',
      'Rearview Camera',
      'Bluetooth Connectivity',
    ],
    bodyType: 'Hatchback',
  },
  {
    ownerId: '664e2a93b5eeebf38e2b8439',
    name: '2018 Lexus RX',
    vin: '2T2BZMCA4JC123456',
    make: 'Lexus',
    model: 'RX',
    year: 2018,
    odometer: 35000,
    price: 850000000,
    color: 'White',
    condition: 'Used',
    assembly: 'Complete-Knock-Down',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    sold: false,
    dateAdded: 'Tue Jul 04 2023 07:00:00 GMT+0700 (Western Indonesia Time)',
    plateNumber: 'B 7890 UVW',
    taxDate: 'Wed Nov 04 2024 07:00:00 GMT+0700 (Western Indonesia Time)',
    description: 'A luxury SUV with advanced features.',
    marketPrice: 860000000,
    purchasePrice: 840000000,
    specification: [
      'All-Wheel Drive',
      'Sunroof',
      'Heated and Ventilated Seats',
    ],
    bodyType: 'SUV',
  },
  {
    ownerId: '664e2a93b5eeebf38e2b8439',
    name: '2020 Honda CR-V',
    vin: '5J6RW2H89LL012345',
    make: 'Honda',
    model: 'CR-V',
    year: 2020,
    odometer: 15000,
    price: 600000000,
    color: 'Black',
    condition: 'New',
    assembly: 'Complete-Built-Up',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    sold: false,
    dateAdded: 'Mon Aug 14 2023 07:00:00 GMT+0700 (Western Indonesia Time)',
    description: 'A popular compact SUV with a spacious interior.',
    marketPrice: 610000000,
    purchasePrice: 590000000,
    specification: [
      'Rearview Camera',
      'Blind Spot Monitoring',
      'Adaptive Cruise Control',
    ],
    bodyType: 'SUV',
  },
  {
    ownerId: '664e2a93b5eeebf38e2b8439',
    name: '2022 BMW 3 Series',
    vin: 'WBA5R1C53NF012345',
    make: 'BMW',
    model: '3 Series',
    year: 2022,
    odometer: 5000,
    price: 900000000,
    color: 'Gray',
    condition: 'New',
    assembly: 'Complete-Built-Up',
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    sold: false,
    dateAdded: 'Thu Sep 21 2023 07:00:00 GMT+0700 (Western Indonesia Time)',
    description: 'A luxury sedan with sporty performance.',
    marketPrice: 910000000,
    purchasePrice: 890000000,
    specification: ['Hybrid Engine', 'Navigation System', 'Leather Seats'],
    bodyType: 'Sedan',
  },
  {
    ownerId: '664e2a93b5eeebf38e2b8439',
    name: '2021 Jeep Wrangler',
    vin: '1C4HJXDG4MW123456',
    make: 'Jeep',
    model: 'Wrangler',
    year: 2021,
    odometer: 10000,
    price: 950000000,
    color: 'Green',
    condition: 'New',
    assembly: 'Complete-Built-Up',
    transmission: 'Manual',
    fuelType: 'Petrol',
    sold: false,
    dateAdded: 'Thu Oct 12 2023 07:00:00 GMT+0700 (Western Indonesia Time)',
    description: 'A rugged and capable off-road vehicle.',
    marketPrice: 960000000,
    purchasePrice: 940000000,
    specification: ['4WD', 'Removable Roof', 'Navigation System'],
    bodyType: 'SUV',
  },
  {
    ownerId: '664e2a93b5eeebf38e2b8439',
    name: '2018 Toyota Fortuner',
    vin: 'MR0HA3FS0J0456789',
    make: 'Toyota',
    model: 'Fortuner',
    year: 2018,
    odometer: 40000,
    price: 500000000,
    color: 'White',
    condition: 'Used',
    assembly: 'Complete-Knock-Down',
    transmission: 'Automatic',
    fuelType: 'Diesel',
    sold: false,
    dateAdded: 'Tue Nov 14 2023 07:00:00 GMT+0700 (Western Indonesia Time)',
    plateNumber: 'B 3456 WXY',
    taxDate: 'Wed Mar 14 2024 07:00:00 GMT+0700 (Western Indonesia Time)',
    description: 'A robust SUV with advanced safety features.',
    marketPrice: 510000000,
    purchasePrice: 490000000,
    specification: ['All-Wheel Drive', 'Sunroof', 'Leather Seats'],
    bodyType: 'SUV',
  },
  {
    ownerId: '664e2a93b5eeebf38e2b8439',
    name: '2022 Hyundai Kona',
    vin: 'KM8K23AG0MU123456',
    make: 'Hyundai',
    model: 'Kona',
    year: 2022,
    odometer: 5000,
    price: 450000000,
    color: 'Blue',
    condition: 'New',
    assembly: 'Complete-Built-Up',
    transmission: 'Automatic',
    fuelType: 'Electric',
    sold: false,
    dateAdded: 'Mon Dec 15 2023 07:00:00 GMT+0700 (Western Indonesia Time)',
    description: 'A compact electric SUV with a bold design.',
    marketPrice: 460000000,
    purchasePrice: 440000000,
    specification: ['Electric Drive', 'Touchscreen Display', 'Heated Seats'],
    bodyType: 'SUV',
  },
  {
    ownerId: '664e2a93b5eeebf38e2b8439',
    name: '2019 Kia Sportage',
    vin: 'KNDPMCAC5K7123456',
    make: 'Kia',
    model: 'Sportage',
    year: 2019,
    odometer: 30000,
    price: 350000000,
    color: 'Red',
    condition: 'Used',
    assembly: 'Complete-Knock-Down',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    sold: false,
    dateAdded: 'Thu Jan 12 2023 07:00:00 GMT+0700 (Western Indonesia Time)',
    plateNumber: 'D 4567 YZA',
    taxDate: 'Fri May 12 2024 07:00:00 GMT+0700 (Western Indonesia Time)',
    description: 'A compact SUV with a sporty design.',
    marketPrice: 360000000,
    purchasePrice: 340000000,
    specification: ['All-Wheel Drive', 'Sunroof', 'Rearview Camera'],
    bodyType: 'SUV',
  },
  {
    ownerId: '664e2a93b5eeebf38e2b8439',
    name: '2020 Toyota Alphard',
    vin: 'JTMHU01J2D4032678',
    make: 'Toyota',
    model: 'Alphard',
    year: 2020,
    odometer: 12000,
    price: 1200000000,
    color: 'Black',
    condition: 'New',
    assembly: 'Complete-Built-Up',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    sold: false,
    dateAdded: 'Sat Feb 11 2023 07:00:00 GMT+0700 (Western Indonesia Time)',
    description: 'A luxury MPV with a spacious interior.',
    marketPrice: 1220000000,
    purchasePrice: 1180000000,
    specification: ['Premium Audio', 'Rearview Camera', 'Leather Seats'],
    bodyType: 'MPV',
  },
  {
    ownerId: '664e2a93b5eeebf38e2b8439',
    name: '2021 Nissan Terra',
    vin: 'JHLRD7781RC025648',
    make: 'Nissan',
    model: 'Terra',
    year: 2021,
    odometer: 15000,
    price: 800000000,
    color: 'Silver',
    condition: 'New',
    assembly: 'Complete-Built-Up',
    transmission: 'Automatic',
    fuelType: 'Diesel',
    sold: false,
    dateAdded: 'Tue Mar 14 2023 07:00:00 GMT+0700 (Western Indonesia Time)',
    description: 'A midsize SUV with off-road capabilities.',
    marketPrice: 810000000,
    purchasePrice: 790000000,
    specification: [
      'All-Wheel Drive',
      'Touchscreen Display',
      'Rearview Camera',
    ],
    bodyType: 'SUV',
  },
  {
    ownerId: '664e2a93b5eeebf38e2b8439',
    name: '2018 Ford Ranger',
    vin: '1FTFW1E5XJFA56789',
    make: 'Ford',
    model: 'Ranger',
    year: 2018,
    odometer: 50000,
    price: 450000000,
    color: 'White',
    condition: 'Used',
    assembly: 'Complete-Knock-Down',
    transmission: 'Manual',
    fuelType: 'Diesel',
    sold: false,
    dateAdded: 'Fri Apr 14 2023 07:00:00 GMT+0700 (Western Indonesia Time)',
    plateNumber: 'B 5678 ZYX',
    taxDate: 'Sun Aug 14 2024 07:00:00 GMT+0700 (Western Indonesia Time)',
    description: 'A reliable and durable pickup truck.',
    marketPrice: 460000000,
    purchasePrice: 440000000,
    specification: ['4WD', 'Tow Package', 'Bluetooth Connectivity'],
    bodyType: 'Pickup',
  },
  {
    ownerId: '664e2a93b5eeebf38e2b8439',
    name: '2019 Honda Civic',
    vin: '2HGFC2F59KH512345',
    make: 'Honda',
    model: 'Civic',
    year: 2019,
    odometer: 30000,
    price: 400000000,
    color: 'Blue',
    condition: 'Used',
    assembly: 'Complete-Knock-Down',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    sold: false,
    dateAdded: 'Mon May 15 2023 07:00:00 GMT+0700 (Western Indonesia Time)',
    plateNumber: 'F 6789 XYZ',
    taxDate: 'Tue Sep 15 2024 07:00:00 GMT+0700 (Western Indonesia Time)',
    description: 'A compact sedan with a sporty feel.',
    marketPrice: 410000000,
    purchasePrice: 390000000,
    specification: ['Turbocharged Engine', 'Sunroof', 'Rearview Camera'],
    bodyType: 'Sedan',
  },
  {
    ownerId: '664e2a93b5eeebf38e2b8439',
    name: '2022 Tesla Model S',
    vin: '5YJSA1E2XJF123456',
    make: 'Tesla',
    model: 'Model S',
    year: 2022,
    odometer: 5000,
    price: 1500000000,
    color: 'Red',
    condition: 'New',
    assembly: 'Complete-Built-Up',
    transmission: 'Automatic',
    fuelType: 'Electric',
    sold: false,
    dateAdded: 'Sat Jun 10 2023 07:00:00 GMT+0700 (Western Indonesia Time)',
    description: 'A luxury electric sedan with impressive performance.',
    marketPrice: 1520000000,
    purchasePrice: 1480000000,
    specification: ['Autopilot', 'Glass Roof', 'Premium Sound System'],
    bodyType: 'Sedan',
  },
  {
    ownerId: '664e2a93b5eeebf38e2b8439',
    name: '2019 Mercedes-Benz C-Class',
    vin: 'WDDWF4KB1KF123456',
    make: 'Mercedes-Benz',
    model: 'C-Class',
    year: 2019,
    odometer: 20000,
    price: 900000000,
    color: 'Gray',
    condition: 'Used',
    assembly: 'Complete-Knock-Down',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    sold: false,
    dateAdded: 'Fri Jul 14 2023 07:00:00 GMT+0700 (Western Indonesia Time)',
    plateNumber: 'B 7890 WXY',
    taxDate: 'Mon Nov 14 2024 07:00:00 GMT+0700 (Western Indonesia Time)',
    description: 'A luxury sedan with advanced safety features.',
    marketPrice: 910000000,
    purchasePrice: 890000000,
    specification: ['All-Wheel Drive', 'Sunroof', 'Leather Seats'],
    bodyType: 'Sedan',
  },
];

export default vehicleSeed;
