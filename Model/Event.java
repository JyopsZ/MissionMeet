package Model;

public class Event {

    private String eventID;
    private String name;
    private String details;
    private String date;
    private String image;
    private String[] members;

    public Event (String eventID, String name, String details, String date, String image) {

        this.eventID = eventID;
        this.name = name;
        this.details = details;
        this.date = date;
        this.image = image;
    }

    public String getEventID() {

        return eventID;
    }

    public String getName() {
        
        return name;
    }

    public String getDetails() {

        return details;
    }

    public String getDate() {

        return date;
    }

    public String getImage() {

        return image;
    }

    public String[] getMembers() {

        return members;
    }
}