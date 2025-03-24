package Model;

public class Org {

    private String orgID;
    private String name;
    private String description;
    private String address;
    private String email;
    private String contact;
    private String logo;

    private String[] admins;
    private String[] events;

    public Org (String orgID, String name, String description, String address, String email, String contact, String logo) {

        this.orgID = orgID;
        this.name = name;
        this.description = description;
        this.address = address;
        this.email = email;
        this.contact = contact;
        this.logo = logo;
    }

    public String orgID() {

        return orgID;
    }
    
    public String getName() {

        return name;
    }

    public String getDescription() {

        return description;
    }

    public String getAddress() {

        return address;
    }

    public String getEmail() {

        return email;
    }

    public String getContact() {

        return contact;
    }

    public String getLogo() {

        return logo;
    }
}
