export class Org {
    constructor(orgID, name, description, address, email, contact, logo) {
        this.orgID = orgID;
        this.name = name;
        this.description = description;
        this.address = address;
        this.email = email;
        this.contact = contact;
        this.logo = logo;
        
        this.admins = [];
        this.events = [];
    }

    getOrgID() {
        return this.orgID;
    }
    
    getName() {
        return this.name;
    }

    getDescription() {
        return this.description;
    }

    getAddress() {
        return this.address;
    }

    getEmail() {
        return this.email;
    }

    getContact() {
        return this.contact;
    }

    getLogo() {
        return this.logo;
    }

    getAdmins() {
        return this.admins;
    }

    getEvents() {
        return this.events;
    }
}
