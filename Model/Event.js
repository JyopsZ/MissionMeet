export class Event {
    constructor(eventID, name, details, date, time, image, location) {
        this.eventID = eventID;
        this.name = name;
        this.details = details;
        this.date = date;
        this.time = time;
        this.image = image;
        this.location = location;
        this.members = [];
    }

    getEventID() {
        return this.eventID;
    }

    getName() {
        return this.name;
    }

    getDetails() {
        return this.details;
    }

    getDate() {
        return this.date;
    }

    getTime() {
        return this.time;
    }

    getImage() {
        return this.image;
    }

    getLocation() {
        return this.location;
    }

    getMembers() {
        return this.members;
    }
}