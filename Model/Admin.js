export class Admin {
    constructor(adminID, name, email, password, contact_no, org_affiliation = []) {
        this.adminID = adminID;
        this.name = name;
        this.email = email;
        this.password = password;
        this.contact_no = contact_no;
        this.org_affiliation = org_affiliation;
    }

    getAdminID() {
        return this.adminID;
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

    getOrgAffiliation() {
        return this.org_affiliation;
    }
}
