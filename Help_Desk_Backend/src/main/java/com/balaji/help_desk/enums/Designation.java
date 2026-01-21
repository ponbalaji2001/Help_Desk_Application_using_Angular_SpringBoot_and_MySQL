package com.balaji.help_desk.enums;

public enum Designation {
    HREXECUTIVE("HR Executive"),
    ACCOUNTSOFFICER("Accounts Officer"),
    SALESEXECUTIVE("Sales Executive"),
    MARKETINGANALYST("Marketing Analyst"),
    OPERATIONSEXECUTIVE("Operations Executive"),
    PURCHASEOFFICER("Purchase Officer"),
    LEGALASSOCIATE("Legal Associate"),
    SUPPORTEXECUTIVE("Support Executive"),
    DESKTOPSUPPORTENGINEER("Desktop Support Engineer"),
    APPLICATIONSUPPORTENGINEER("Application Support Engineer"),
    NETWORKENGINEER("Network Engineer"),
    SECURITYOPERATIONSENGINEER("Security Operations Engineer"),
    DATABASEADMINISTRATOR("Database Administrator"),
    CLOUDSUPPORTENGINEER("Cloud Support Engineer"),
    SYSTEMADMINISTRATOR("System Administrator"),
    MONITORINGENGINEER("Monitoring Engineer"),
    BACKUPADMINISTRATOR("Backup Administrator"),
    COMPLIANCEENGINEER("Compliance Engineer"),
    EMAILSUPPORTENGINEER("Email Support Engineer"),
	ACCESSMANAGEMENTENGINEER("Access Management Engineer");

    private final String displayName;

    Designation(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}

