export class Org {
    constructor(orgID, name, description, address, email, contact, logo, sub_plan) {
        this.orgID = orgID;
        this.name = name;
        this.description = description;
        this.address = address;
        this.email = email;
        this.contact = contact;
        this.logo = logo;
        this.sub_plan = sub_plan;
        
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

    getSubPlan() {
        return this.sub_plan;
    }
}
