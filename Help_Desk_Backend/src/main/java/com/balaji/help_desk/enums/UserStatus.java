package com.balaji.help_desk.enums;

public enum UserStatus {
	ACTIVE("Active"),
	INACTIVE("Inactive"),
	BLOCKED("Blocked");
	
	private final String displayName;

    UserStatus(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
