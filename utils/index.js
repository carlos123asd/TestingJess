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

class Room {
    constructor(name,bookings,rate,discount) {
        this.name = name
        this.bookings = bookings
        this.rate = rate * 100
        this.discount = discount
    }

    isOccupied(date){
        let ocuppied = false
        if(date === undefined || typeof(date) === 'string' || typeof(date) === 'number'){
            return 'Date'
        }else{
            if(this.bookings.length > 0 && this.bookings[0] !== null){
                for (let index = 0; index < this.bookings.length; index++) {
                    const booking = this.bookings[index];
                    if(new Date(booking.checkout) > date){
                        ocuppied = true
                    }
                }
                if(ocuppied === false){
                    return false
                }else{
                    return true
                }
            }else{
                return false
            }
        }
    }
    occupancyPercentage(startDate,endDate){
        let bookingsocuped = []
        if(startDate === undefined || endDate === undefined || startDate === '' || 
            endDate === '' || typeof(startDate) === 'number' || typeof(endDate) === 'number'){
            return 'Dates'
        }else{
            for (let index = 0; index < this.bookings.length; index++) {
                const booking = this.bookings[index]
                if((new Date(booking.checkin) < startDate && new Date(booking.checkout) > startDate) ||
                (new Date(booking.checkin) < endDate && new Date(booking.checkout) > endDate) || 
                (new Date(booking.checkin) < startDate && new Date(booking.checkout) > endDate) ||
                (new Date(booking.checkin) >= startDate && new Date(booking.checkout) <= endDate)){
                        bookingsocuped.push(booking)
                }
            }
            if(bookingsocuped.length > 0){
                //De todos los bookings del Room cuantos estan ocupados dentro del rango 
                return ((100 * bookingsocuped.length)/this.bookings.length)
            }else{
                return 0
            }
        }
    }

    static totalOccupancyPercentage(rooms,startDate,endDate){
        if (rooms === undefined || startDate === undefined 
            || endDate === undefined || typeof(rooms) === 'number' || typeof(startDate) === 'number' || typeof(endDate) === 'number'
            || typeof(rooms) === 'string' || typeof(startDate) === 'string' || typeof(endDate) === 'string') {
            return 'Rooms/Date/Date'
        } else {
            let roomsocuped = 0;
            for (let index = 0; index < rooms.length; index++) {
                const bookings = rooms[index].bookings;
                for (let index = 0; index < bookings.length; index++) {
                    const booking = bookings[index];
                    if((new Date(booking.checkin) < startDate && new Date(booking.checkout) > startDate) ||
                       (new Date(booking.checkin) < endDate && new Date(booking.checkout) > endDate) || 
                       (new Date(booking.checkin) < startDate && new Date(booking.checkout) > endDate) ||
                       (new Date(booking.checkin) >= startDate && new Date(booking.checkout) <= endDate)){
                            roomsocuped++
                    }
                }
            }
            if(bookingsocuped.length > 0){
                return ((100 * roomsocuped)/rooms.length)
            }else{
                return 0
            }
        }
    }

    static availableRooms(rooms,startDate,endDate){
        if (rooms === undefined || startDate === undefined 
            || endDate === undefined || typeof(rooms) === 'number' || typeof(startDate) === 'number' || typeof(endDate) === 'number'
            || typeof(rooms) === 'string' || typeof(startDate) === 'string' || typeof(endDate) === 'string') {
            return 'Rooms/Date/Date'
        } else {
            let roomsavailables = []
            let available = true
            for (let index = 0; index < rooms.length; index++) {
                const room = rooms[index];
                for (let index = 0; index < room.bookings.length; index++) {
                    const booking = room.bookings[index];
                    if((new Date(booking.checkin) <= startDate && new Date(booking.checkin) >= startDate) || 
                       (new Date(booking.checkin) <= endDate && new Date(booking.checkout) >= startDate) ||
                       (new Date(booking.checkout) <= endDate && new Date(booking.checkout) >= endDate)){
                            available = false
                    }
                }
                if(available === true){
                    roomsavailables.push(room)
                }
            }
            return roomsavailables
        }
    }
}

class Booking {
    constructor(name,email,checkIn,checkOut,discount,room) {
        this.name = name
        this.email = email
        this.checkIn = checkIn
        this.checkOut = checkOut
        this.discount = discount
        this.room = room
    }

    getFee(){
       const price = this.room.rate
       const discountroom = this.room.discount
       const discountbooking = this.discount
       const discountTotal = discountroom + discountbooking
       return (discountTotal * price) / 100
    }
}

const rooms = [

]
const bookings = [

]
dataRoom.forEach((room) => {
    rooms.push(new Room(room.name,room.bookings,room.rate,room.discount))
})
dataBooking.forEach((booking) => {
    bookings.push(new Booking(booking.name,booking.email,booking.checkin,booking.checkout,booking.discount,booking.room))
})


module.exports  = {
    rooms,
    bookings,
    Room,
    Booking
}

