"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const SHOPS = [
    {
        id: 'shop_1',
        name: 'AutoHub Lusaka',
        initials: 'AH',
        color: '#E8500A',
        location: 'Cairo Road, Lusaka',
        tags: ['Japanese Cars', 'SUVs', 'OEM Parts'],
        rating: 4.9,
        reviewCount: 312,
        isPro: true,
        isVerified: true,
    },
    {
        id: 'shop_2',
        name: 'KitweSpares',
        initials: 'KS',
        color: '#185FA8',
        location: 'Industrial Area, Kitwe',
        tags: ['Trucks', 'Mining', 'HGV'],
        rating: 4.7,
        reviewCount: 188,
        isPro: true,
        isVerified: true,
    },
    {
        id: 'shop_3',
        name: 'PremiumParts ZM',
        initials: 'PP',
        color: '#1A7A4A',
        location: 'Woodlands, Lusaka',
        tags: ['European Cars', 'BMW', 'Mercedes'],
        rating: 4.8,
        reviewCount: 97,
        isPro: false,
        isVerified: true,
    }
];
const PARTS = [
    {
        id: 'part_1',
        name: 'Toyota Hilux Oil Filter',
        compat: 'Toyota Hilux 2015–2023',
        category: 'engine',
        shopId: 'shop_1',
        shopName: 'AutoHub Lusaka',
        shopColor: '#E8500A',
        location: 'Lusaka',
        price: 480,
        stock: 'in',
        verified: true,
        vehicleType: 'Cars & SUVs',
        make: 'Toyota',
        model: 'Hilux',
        yearFrom: 2015,
        yearTo: 2023,
        condition: 'NEW',
        warrantyMonths: 6,
        oemNumber: '90915-YZZD2',
        description: 'Premium genuine-quality oil filter for Toyota Hilux models.'
    },
    {
        id: 'part_2',
        name: 'Brake Pads Set — Front',
        compat: 'BMW 3 Series 2018–2022',
        category: 'brakes',
        shopId: 'shop_3',
        shopName: 'PremiumParts ZM',
        shopColor: '#1A7A4A',
        location: 'Lusaka',
        price: 1350,
        stock: 'low',
        verified: true,
        vehicleType: 'Cars & SUVs',
        make: 'BMW',
        model: '3 Series',
        yearFrom: 2018,
        yearTo: 2022,
        condition: 'NEW',
        warrantyMonths: 12,
        oemNumber: '34116888457',
        description: 'High-performance ceramic front brake pads for ultimate stopping power.'
    },
    {
        id: 'part_3',
        name: 'Alternator 90A',
        compat: 'Nissan Navara D40 2007–2015',
        category: 'electrical',
        shopId: 'shop_2',
        shopName: 'KitweSpares',
        shopColor: '#185FA8',
        location: 'Kitwe',
        price: 2100,
        stock: 'in',
        verified: true,
        vehicleType: 'Cars & SUVs',
        make: 'Nissan',
        model: 'Navara',
        yearFrom: 2007,
        yearTo: 2015,
        condition: 'REMANUFACTURED',
        warrantyMonths: 6,
        oemNumber: '23100-EB31A',
        description: 'Professionally remanufactured 90A alternator for Nissan Navara — tested to OEM output spec.'
    },
    {
        id: 'part_4',
        name: 'Rear Shock Absorber',
        compat: 'Mitsubishi Pajero 2012–2020',
        category: 'suspension',
        shopId: 'shop_1',
        shopName: 'AutoHub Lusaka',
        shopColor: '#E8500A',
        location: 'Lusaka',
        price: 890,
        stock: 'in',
        verified: false,
        vehicleType: 'Cars & SUVs',
        make: 'Mitsubishi',
        model: 'Pajero',
        yearFrom: 2012,
        yearTo: 2020,
        condition: 'USED',
        warrantyMonths: 1,
        oemNumber: '4162A130',
        description: 'Genuine used rear shock absorber in good working condition, tested and inspected.'
    },
    {
        id: 'part_5',
        name: 'Clutch Kit — Heavy Duty',
        compat: 'Isuzu D-Max 2017–2023',
        category: 'engine',
        shopId: 'shop_2',
        shopName: 'KitweSpares',
        shopColor: '#185FA8',
        location: 'Kitwe',
        price: 3200,
        stock: 'in',
        verified: true,
        vehicleType: 'Cars & SUVs',
        make: 'Isuzu',
        model: 'D-Max',
        yearFrom: 2017,
        yearTo: 2023,
        condition: 'NEW',
        warrantyMonths: 12,
        oemNumber: '8-98203309-0',
        description: 'Heavy-duty complete clutch kit suitable for commercial and off-road applications.'
    },
    {
        id: 'part_6',
        name: 'Radiator Complete Unit',
        compat: 'Toyota Land Cruiser 200 Series',
        category: 'engine',
        shopId: 'shop_1',
        shopName: 'AutoHub Lusaka',
        shopColor: '#E8500A',
        location: 'Lusaka',
        price: 4500,
        stock: 'low',
        verified: true,
        vehicleType: 'Cars & SUVs',
        make: 'Toyota',
        model: 'Land Cruiser',
        condition: 'NEW',
        warrantyMonths: 24,
        oemNumber: '16400-38230',
        description: 'All-aluminum radiator unit offering premium engine cooling.'
    },
    {
        id: 'part_7',
        name: 'Front Bumper Assembly',
        compat: 'Ford Ranger T6 2012–2019',
        category: 'body',
        shopId: 'shop_3',
        shopName: 'PremiumParts ZM',
        shopColor: '#1A7A4A',
        location: 'Lusaka',
        price: 2800,
        stock: 'in',
        verified: false,
        vehicleType: 'Cars & SUVs',
        make: 'Ford',
        model: 'Ranger',
        yearFrom: 2012,
        yearTo: 2019,
        condition: 'REMANUFACTURED',
        warrantyMonths: 6,
        oemNumber: 'AB39-17757-AB',
        description: 'Factory remanufactured front bumper assembly, fully restored to OEM specification.'
    },
    {
        id: 'part_8',
        name: 'Spark Plugs Set (4x)',
        compat: 'Honda Fit 2013–2020',
        category: 'engine',
        shopId: 'shop_1',
        shopName: 'AutoHub Lusaka',
        shopColor: '#E8500A',
        location: 'Lusaka',
        price: 320,
        stock: 'in',
        verified: true,
        vehicleType: 'Cars & SUVs',
        make: 'Honda',
        model: 'Fit',
        yearFrom: 2013,
        yearTo: 2020,
        condition: 'NEW',
        warrantyMonths: 12,
        oemNumber: '12290-5R0-003',
        description: 'Iridium spark plugs set offering enhanced combustion efficiency.'
    },
    {
        id: 'part_9',
        name: 'Wheel Bearing Front',
        compat: 'Nissan X-Trail 2014–2021',
        category: 'suspension',
        shopId: 'shop_2',
        shopName: 'KitweSpares',
        shopColor: '#185FA8',
        location: 'Kitwe',
        price: 750,
        stock: 'out',
        verified: false,
        vehicleType: 'Cars & SUVs',
        make: 'Nissan',
        model: 'X-Trail',
        yearFrom: 2014,
        yearTo: 2021,
        condition: 'USED',
        warrantyMonths: 0,
        oemNumber: '40202-4BA0A',
        description: 'Pulled in good condition from a low-mileage Nissan X-Trail. Tested and verified.'
    },
    {
        id: 'part_10',
        name: 'Air Filter — Heavy Duty',
        compat: 'Isuzu ELF Truck Series',
        category: 'engine',
        shopId: 'shop_2',
        shopName: 'KitweSpares',
        shopColor: '#185FA8',
        location: 'Kitwe',
        price: 560,
        stock: 'in',
        verified: true,
        vehicleType: 'Trucks & HGVs',
        make: 'Isuzu',
        model: 'ELF',
        condition: 'NEW',
        warrantyMonths: 3,
        oemNumber: '8-97062294-0',
        description: 'Heavy-duty air filter optimized for dust and commercial truck operations.'
    },
    {
        id: 'part_11',
        name: 'Headlight Assembly RH',
        compat: 'Toyota Prado 150 Series',
        category: 'electrical',
        shopId: 'shop_1',
        shopName: 'AutoHub Lusaka',
        shopColor: '#E8500A',
        location: 'Lusaka',
        price: 3100,
        stock: 'in',
        verified: true,
        vehicleType: 'Cars & SUVs',
        make: 'Toyota',
        model: 'Prado',
        condition: 'USED',
        warrantyMonths: 1,
        oemNumber: '81110-60J00',
        description: 'Genuine used Right Hand (driver side) Headlight unit in superb condition.'
    },
    {
        id: 'part_12',
        name: 'Rear Drum Brake Set',
        compat: 'Suzuki Jimny 2018–2023',
        category: 'brakes',
        shopId: 'shop_3',
        shopName: 'PremiumParts ZM',
        shopColor: '#1A7A4A',
        location: 'Lusaka',
        price: 620,
        stock: 'in',
        verified: false,
        vehicleType: 'Cars & SUVs',
        make: 'Suzuki',
        model: 'Jimny',
        yearFrom: 2018,
        yearTo: 2023,
        condition: 'NEW',
        warrantyMonths: 6,
        oemNumber: '53200-81A00',
        description: 'Replacement rear drum brake set specifically designed for Suzuki Jimny.'
    }
];
async function main() {
    console.log('Start seeding...');
    // Delete all parts first
    await prisma.part.deleteMany();
    // Delete all shops
    await prisma.shop.deleteMany();
    // Create Shops
    for (const s of SHOPS) {
        const shop = await prisma.shop.create({
            data: s,
        });
        console.log(`Created shop with id: ${shop.id}`);
    }
    // Create Parts
    for (const p of PARTS) {
        const part = await prisma.part.create({
            data: p,
        });
        console.log(`Created part with id: ${part.id}`);
    }
    console.log('Seeding finished.');
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
