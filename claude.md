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

## Stakeholder Invitation Flows

A feature that enables existing stakeholders to invite other stakeholders to join their company or collaborate on projects.

### Use Cases:
- Company owners invite contractors, lawyers, or other professionals to join their company
- Project managers invite stakeholders to collaborate on specific projects
- Building collaborative teams across the GetStatus platform

### Three Invitation Scenarios:

**Scenario 1: New User (No Account)**
- User receives invite via email
- Completes registration form with minimal required fields
- Role is pre-defined by inviter (not chosen by invitee)
- Account created and automatically associated with company/project
- Fields collected: Name, Email, Phone (optional), Password, Confirm Password

**Scenario 2: Existing User, Logged In**
- Logged-in user clicks invite link
- Sees simple acceptance screen with invite details
- One-click acceptance immediately adds them to company/project
- Redirected to relevant dashboard

**Scenario 3: Existing User, Logged Out**
- User with existing account clicks invite link
- Personalized greeting with their name
- Prompted to sign in to accept invitation
- Redirected to stakeholder login page
- After login, automatically accepts invite

### Key Design Principles:
- **Role is Inviter-Defined:** Professional role (contractor, lawyer, supervisor) specified by inviter
- **Minimal Friction:** Only collect essential information during signup
- **Context Preservation:** Maintain invite context throughout authentication flow
- **Personalization:** Greet known users by name when possible
- **Clean UI:** Reduce redundancy, use info icons instead of warning cards

### Demo URLs:
- Scenario 1 (New User): `/invite/demo?scenario=1`
- Scenario 2 (Logged In): `/invite/demo?scenario=2`
- Scenario 3 (Logged Out): `/invite/demo?scenario=3`

### Documentation:
- Full PRD: `docs/features/login signup invites/invites.md`
- Component: `frontend/src/components/StakeholderInviteDemo.jsx`

## Deployment

The application is deployed on Vercel with automatic deployments from the `main` branch.

### Configuration:
- Build from `frontend` subdirectory using Vite
- SPA routing handled via rewrites in `vercel.json`
- All routes redirect to `index.html` for client-side routing

### Repository:
- GitHub: https://github.com/adidacta/getai
