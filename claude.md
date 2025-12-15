# GetStatus Project Context

## What is GetStatus?

GetStatus is an ecosystem platform for urban renewal in Israel that connects all stakeholders involved in urban renewal projects.

### Two Main Products:

1. **GetStatus Project Management (PM Platform)**
   - Primary users: Companies/builders managing urban renewal projects
   - Core capabilities:
     - Keep residents updated on project progress
     - Manage resident lists and contact information
     - Track resident signatures and project approvals
     - Share project documents securely
     - Manage internal tasks and workflows

2. **Real Estate Network (REN)**
   - Primary users: All stakeholders (residents, builders, lawyers, supervisors, public)
   - Core capabilities:
     - Showcase expertise through posts
     - Share project updates publicly (with privacy controls)
     - Find collaboration opportunities
     - Bid management (coming soon)
     - Private updates for residents

### Key Stakeholders:
- **Professionals:** Lawyers, builders, contractors, real estate entrepreneurs, appraisers, technical supervisors
- **Residents:** Property owners in urban renewal projects
- **Representatives:** Residents who represent their entire building

### Cross-Platform Integration:
Project progress in PM automatically reflects in REN for visibility. Collaboration opportunities in REN lead to new projects in PM.

## The REN Chatbot

The chatbot is part of the Real Estate Network (REN) platform.

### Features by User Type:

**For Guests (not logged in):**
- Learn about urban renewal processes
- Explore the stakeholders directory
- Find relevant stakeholders who work in transparency

**For Logged-in Residents:**
- All guest features above
- Learn about their own project status via chat
- Get personalized information about their specific projects

### Purpose:
- Educational tool about urban renewal
- Discovery mechanism for the stakeholders network
- Showcase transparent stakeholders
- Provide easy access to project information for residents

## The Private Stakeholder Chatbot

A new chatbot feature integrated into the GetStatus PM Platform, designed specifically for stakeholders to perform project management actions through natural conversation.

### Target Users:
- Logged-in stakeholders (builders, lawyers, supervisors, entrepreneurs, appraisers)
- Company employees and freelancers managing projects

### Core Features (4 Use Cases):

1. **Send Updates to Residents**
   - Send text updates via email, SMS, or WhatsApp
   - Target all residents or specific individuals
   - Schedule for immediate or future delivery
   - Support links in content (documents not yet supported)

2. **Create Tasks**
   - Create project-specific or company-level tasks
   - Assign to team members with title, description
   - Set priority (Low/Medium/High), due dates, and reminders
   - Single assignee per task

3. **Query Signature Status**
   - Check percentage of residents who signed agreements
   - View recent signers or unsigned residents
   - Follow-up suggestions for next actions
   - Read-only (updating signatures comes later)

4. **Update Project Status**
   - Update main project status and sub-statuses/milestones
   - Use predefined status options from data schema
   - Changes visible to residents on REN platform
   - May require two API calls (main + sub-status)

### Key Requirements:
- User must be logged in
- All actions require explicit confirmation with full details
- Permission checks via API before every action
- Users can edit details before confirmation (e.g., "change the task name to X")
- Clear error messages for permission issues or validation failures

### Documentation:
- Full chatbot overview: `docs/features/chatbot/chatbot.md`
- Epic and stories: `docs/features/chatbot/private-stakeholder-chatbot.md`
