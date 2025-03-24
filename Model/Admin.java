package Model;

public class Admin {
    
    private String adminID;
    private String name;
    private String email;
    private String password;
    private String contact_no;
    private String org_affiliation;

    public Admin (String adminID, String name, String email, String password, String contact_no, String org_affiliation) {
        
        this.adminID = adminID;
        this.name = name;
        this.email = email;
        this.password = password;
        this.contact_no = contact_no;
        this.org_affiliation = org_affiliation;
    }

    public String getAdminID() {

        return adminID;
    }

    public String getName() {

        return name;
    }

    public String getEmail() {

        return email;
    }

    public String getPassword() {

        return password;
    }

    public String getContact() {

        return contact_no;
    }

    public String getOrgAffiliation() {

        return org_affiliation;
    }
}
