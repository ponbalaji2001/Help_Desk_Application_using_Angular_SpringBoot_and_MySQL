package com.balaji.help_desk.enums;

public enum Department {
    HR("HR"),
    FINANCE("Finance"),
    SALES("Sales"),
    MARKETING("Marketing"),
    OPERATIONS("Operations"),
    PROCUREMENT("Procurement"),
    LEGAL("Legal"),
    CUSTOMERSUPPORT("Customer Support"),
    ITSUPPORT("IT Support"),
    APPLICATIONSUPPORT("Application Support"),
    NETWORKOPERATIONS("Network Operations"),
    INFORMATIONSECURITY("Information Security"),
    DATABASETEAM("Database Team"),
    CLOUDOPERATIONS("Cloud Operations"),
    ITINFRASTRUCTURE("IT Infrastructure"),
    MONITORING("Monitoring"),
    BACKUPTEAM("Backup Team"),
    COMPLIANCEAUDIT("Compliance & Audit"),
    EMAILSERVICES("Email Services");

    private final String displayName;

    Department(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
