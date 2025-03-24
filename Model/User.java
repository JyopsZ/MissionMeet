package Model;

public class User {

    private String userID;
    private String name;
    private String email;
    private String password;
    private String contact_no;
    
    private String[] events_joined;

    public User (String userID, String name, String email, String password, String contact_no) {

        this.userID = userID;
        this.name = name;
        this.email = email;
        this.password = password;
        this.contact_no = contact_no;
    }

    public String getUserID() {

        return userID;
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

    public String[] getEventsJoined() {

        return events_joined;
    }
}
