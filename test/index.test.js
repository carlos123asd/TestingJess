const { Room, Booking } = require("../utils/index.js")

const dataRoom = [
    {
        "name": "Sonia Kris",
        "bookings": [
            {
                "name": "Joyce Schneider",
                "email": "Joyce.Schneider80@yahoo.com",
                "checkin": "2024-08-01",
                "checkout": "2024-08-02",
                "discount": 5
            },
            {
                "name": "Cedric Johnston",
                "email": "Cedric_Johnston99@yahoo.com",
                "checkin": "2024-08-02",
                "checkout": "2024-08-11",
                "discount": 5
            }
        ],
        "rate": 269.06,
        "discount": 18
    },
    {
        "name": "Trevor Romaguera",
        "bookings": [
            null
        ],
        "rate": 292.45,
        "discount": 15
    },
    {
        "name": "Tricia Dooley",
        "bookings": [
            null
        ],
        "rate": 294.49,
        "discount": 7
    },
    {
        "name": "Shari Hilpert",
        "bookings": [
            {"name": "Geneva Murazik",
            "email": "Geneva.Murazik@gmail.com",
            "checkin": "2024-08-08",
            "checkout": "2024-08-26",
            "discount": 5,}
        ],
        "rate": 201.87,
        "discount": 17
    },
    {
        "name": "Angelina Stoltenberg",
        "bookings": [
            null
        ],
        "rate": 104.27,
        "discount": 48
    },
    {
        "name": "Cynthia Erdman",
        "bookings": [
            null
        ],
        "rate": 268.4,
        "discount": 33
    }
]
const dataBooking = [
{
    "name": "Joyce Schneider",
    "email": "Joyce.Schneider80@yahoo.com",
    "checkin": "2024-08-01",
    "checkout": "2024-08-02",
    "discount": 5,
    "room": {
        "name": "Sonia Kris",
        "rate": 269.06,
        "discount": 18
    }
},
{
    "name": "Cedric Johnston",
    "email": "Cedric_Johnston99@yahoo.com",
    "checkin": "2024-08-02",
    "checkout": "2024-08-11",
    "discount": 5,
    "room": {
        "name": "Sonia Kris",
        "rate": 269.06,
        "discount": 18
    }
},
{
    "name": "Geneva Murazik",
    "email": "Geneva.Murazik@gmail.com",
    "checkin": "2024-08-08",
    "checkout": "2024-08-26",
    "discount": 5,
    "room": {
        "name": "Shari Hilpert",
        "rate": 201.87,
        "discount": 17
    }
}
]

describe('Func. isOcupied()', () => {
    test('of undefined', () => {
        const room = new Room(dataRoom[0].name,dataRoom[0].bookings,dataRoom[0].rate,dataRoom[0].discount)
        const result = room.isOccupied()
        expect(result).toBe('Date')
    });
    test('of string', () => {
        const room = new Room(dataRoom[0].name,dataRoom[0].bookings,dataRoom[0].rate,dataRoom[0].discount)
        const result = room.isOccupied('abcd')
        expect(result).toBe('Date')
    });
    test('of int', () => {
        const room = new Room(dataRoom[0].name,dataRoom[0].bookings,dataRoom[0].rate,dataRoom[0].discount)
        const result = room.isOccupied(12)
        expect(result).toBe('Date')
    });
    test('date YYYY-MM-DD no-ocupied', () => {
        const room = new Room(dataRoom[1].name,dataRoom[1].bookings,dataRoom[1].rate,dataRoom[1].discount)
        const result = room.isOccupied(new Date('2024-08-12'))
        expect(result).toBe(false)
    });
    test('date YYYY-MM-DD ocupied', () => {
        const room = new Room(dataRoom[0].name,dataRoom[0].bookings,dataRoom[0].rate,dataRoom[0].discount)
        const result = room.isOccupied(new Date('2024-08-01'))
        expect(result).toBe(true)
    });
    
});

describe('Func. occupancyPercentage()', () => {
    test('of undefined', () => {
        const room = new Room(dataRoom[0].name,dataRoom[0].bookings,dataRoom[0].rate,dataRoom[0].discount)
        const result = room.occupancyPercentage()
        expect(result).toBe('Dates')
    });
    test('of a string and empty', () => {
        const room = new Room(dataRoom[0].name,dataRoom[0].bookings,dataRoom[0].rate,dataRoom[0].discount)
        const result = room.occupancyPercentage('abcd','')
        expect(result).toBe('Dates')
    });
    test('of int', () => {
        const room = new Room(dataRoom[0].name,dataRoom[0].bookings,dataRoom[0].rate,dataRoom[0].discount)
        const result = room.occupancyPercentage(12)
        expect(result).toBe('Dates')
    });
    test('date YYYY-MM-DD 0%', () => {
        const room = new Room(dataRoom[0].name,dataRoom[0].bookings,dataRoom[0].rate,dataRoom[0].discount)
        const result = room.occupancyPercentage(new Date('2023-09-01'),new Date('2023-09-15'))
        expect(result).toBe(0)
    });
    test('date YYYY-MM-DD with %', () => {
        const room = new Room(dataRoom[0].name,dataRoom[0].bookings,dataRoom[0].rate,dataRoom[0].discount)
        const result = room.occupancyPercentage(new Date('2024-08-01'),new Date('2024-08-15'))
        expect(result).toBe(100)
    });
});

describe('fun. totalOccupancyPercentage', () => {
    test('of undefined', () => {
        const result = Room.totalOccupancyPercentage()
        expect(result).toBe('Rooms/Date/Date')
    });
    test('of a string and empty', () => {
        const result = Room.totalOccupancyPercentage('abcd','')
        expect(result).toBe('Rooms/Date/Date')
    });
    test('of int', () => {
        const result = Room.totalOccupancyPercentage(12,12,12)
        expect(result).toBe('Rooms/Date/Date')
    });
    test('with %', () => {
        const result = Room.totalOccupancyPercentage(dataRoom,new Date('2024-08-01'),new Date('2024-08-15'))
        expect(result).toBe(50)
    });
    test('0%', () => {
        const result = Room.totalOccupancyPercentage(dataRoom,new Date('2023-09-01'),new Date('2023-09-15'))
        expect(result).toBe(0)
    });
});

describe('fun. availableRooms', () => { 
    test('of undefined', () => {
        const result = Room.availableRooms()
        expect(result).toBe('Rooms/Date/Date')
    });
    test('of a string and empty', () => {
        const result = Room.availableRooms('abcd','')
        expect(result).toBe('Rooms/Date/Date')
    });
    test('of int', () => {
        const result = Room.availableRooms(12,12,12)
        expect(result).toBe('Rooms/Date/Date')
    });
    test('Available', () => {
        const result = Room.availableRooms(dataRoom,new Date('2024-08-01'),new Date('2024-08-15'))
        expect(result).toBe([dataRoom[1],dataRoom[2],dataRoom[4],dataRoom[5]])
    });
    test('No Available', () => {
        const result = Room.availableRooms(dataRoom,new Date('2023-09-01'),new Date('2023-09-15'))
        expect(result).toBe([dataRoom[0],dataRoom[3]])
    });
 });

 describe('fun. getFee', () => { 
    test('result of a Booking', () => {
        const booking = new Booking(dataBooking[0].name,dataBooking[0].email,dataBooking[0].checkIn,dataBooking[0].checkOut,dataBooking[0].discount,dataBooking[0].room)
        const result = booking.getFee()
        expect(result).toBe(207.18)
    });
})
