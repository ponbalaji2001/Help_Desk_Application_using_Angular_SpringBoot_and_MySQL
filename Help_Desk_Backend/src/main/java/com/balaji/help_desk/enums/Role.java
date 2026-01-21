package com.balaji.help_desk.enums;

public enum Role {
	USER("User"),
	AGENT("Agent"),
	ADMIN("Admin");
	
	private final String displayName;

    Role(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
