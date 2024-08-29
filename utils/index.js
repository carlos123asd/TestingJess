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

    static totalOccupancyPercentage(dataRoom,startDate,endDate){
        if (dataRoom === undefined || startDate === undefined 
            || endDate === undefined || typeof(dataRoom) === 'number' || typeof(startDate) === 'number' || typeof(endDate) === 'number'
            || typeof(dataRoom) === 'string' || typeof(startDate) === 'string' || typeof(endDate) === 'string') {
            return 'Rooms/Date/Date'
        } else {
            let roomsocuped = 0;
            for (let index = 0; index < dataRoom.length; index++) {
                const bookings = dataRoom[index].bookings;
                if(bookings){
                    for(const booking of bookings) {
                        if(booking){
                            const bookingcheckin = new Date(booking.checkin)
                            const bookingcheckout = new Date(booking.checkout)
                            if((bookingcheckin < startDate && bookingcheckout > startDate) ||
                            (bookingcheckin < endDate && bookingcheckout > endDate) || 
                            (bookingcheckin < startDate && bookingcheckout > endDate) ||
                            (bookingcheckin >= startDate && bookingcheckout <= endDate)){
                                    roomsocuped += 1
                            }
                        }
                    }
                }
            }
            if(roomsocuped > 0){
                return ((100 * roomsocuped)/dataRoom.length)
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
                if(room){
                    for (let index = 0; index < room.bookings.length; index++) {
                        const booking = room.bookings[index];
                        available = true
                        if(booking){
                            if((new Date(booking.checkin) <= startDate && new Date(booking.checkin) >= startDate) || 
                            (new Date(booking.checkin) <= endDate && new Date(booking.checkout) >= startDate) ||
                            (new Date(booking.checkout) <= endDate && new Date(booking.checkout) >= endDate)){
                                    available = false
                            }
                        }
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
       return parseFloat((price - ((discountTotal * price) / 100)).toFixed(2))
    }
}


module.exports  = {
    Room,
    Booking
}

