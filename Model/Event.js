export class Event {
    constructor(eventID, name, details, date, image) {
        this.eventID = eventID;
        this.name = name;
        this.details = details;
        this.date = date;
        this.image = image;
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

    getImage() {
        return this.image;
    }

    getMembers() {
        return this.members;
    }
}
