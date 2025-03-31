export class User {
    constructor(userID, name, email, password, contact_no, events_joined = []) {
        
        this.userID = userID;
        this.name = name;
        this.email = email;
        this.password = password;
        this.contact_no = contact_no;
        this.events_joined = events_joined;
    }

    getUserID() {
        return this.userID;
    }

    getName() {
        return this.name;
    }

    getEmail() {
        return this.email;
    }

    getPassword() {
        return this.password;
    }

    getContact() {
        return this.contact_no;
    }

    getEventsJoined() {
        return this.events_joined;
    }
}