const {rooms,bookings} = require("../utils/index.js")
const {Room} = require("../utils/index.js")


describe('Func. isOcupied()', () => {
    test('of undefined', () => {
        const result = rooms[0].isOccupied()
        expect(result).toBe('Date')
    });
    test('of string', () => {
        const result = rooms[0].isOccupied('abcd')
        expect(result).toBe('Date')
    });
    test('of int', () => {
        const result = rooms[0].isOccupied(12)
        expect(result).toBe('Date')
    });
    test('date YYYY-MM-DD no-ocupied', () => {
        const result = rooms[1].isOccupied(new Date('2024-08-12'))
        expect(result).toBe(false)
    });
    test('date YYYY-MM-DD ocupied', () => {
        const result = rooms[0].isOccupied(new Date('2024-08-01'))
        expect(result).toBe(true)
    });
    
});

describe('Func. occupancyPercentage()', () => {
    test('of undefined', () => {
        const result = rooms[0].occupancyPercentage()
        expect(result).toBe('Dates')
    });
    test('of a string and empty', () => {
        const result = rooms[0].occupancyPercentage('abcd','')
        expect(result).toBe('Dates')
    });
    test('of int', () => {
        const result = rooms[0].occupancyPercentage(12)
        expect(result).toBe('Dates')
    });
    test('date YYYY-MM-DD 0%', () => {
        const result = rooms[0].occupancyPercentage(new Date('2023-09-01'),new Date('2023-09-15'))
        expect(result).toBe(0)
    });
    test('date YYYY-MM-DD with %', () => {
        const result = rooms[0].occupancyPercentage(new Date('2024-08-01'),new Date('2024-08-15'))
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
        const result = Room.totalOccupancyPercentage(12)
        expect(result).toBe('Rooms/Date/Date')
    });
    
});
