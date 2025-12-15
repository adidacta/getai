# Epic: Private Stakeholder Chatbot

## Epic Overview

**Epic ID:** CHAT-001
**Epic Name:** Private Stakeholder Chatbot for Project Management
**Status:** Planning
**Priority:** High

### Description

Enable stakeholders (builders, lawyers, supervisors, etc.) to perform key project management actions through a conversational AI chatbot interface. This provides an alternative to the traditional web interface, allowing stakeholders to quickly execute common tasks through natural language.

### Business Value

- **Efficiency:** Reduce time spent navigating the PM web interface
- **Accessibility:** Enable actions on-the-go through natural conversation
- **User Experience:** Lower friction for common tasks
- **Adoption:** Make the platform more approachable for non-technical users
- **Competitive Advantage:** Differentiate from traditional PM tools

### Target Users

- Builders and contractors
- Real estate entrepreneurs
- Lawyers specializing in real estate
- Technical supervisors and appraisers
- Company employees managing projects
- Freelance stakeholders

### Prerequisites

- User must be logged in to access private chatbot features
- User must have appropriate permissions for each action
- GetStatus API must support required operations

### Key Requirements

1. **Authentication:** All features require user login
2. **Authorization:** API manages access control; chatbot validates permissions before actions
3. **Confirmation:** All actions require explicit user confirmation with full details
4. **Validation:** Data validation before confirmation (project exists, assignee exists, etc.)
5. **Error Handling:** Clear error messages when permissions denied or validation fails
6. **Editability:** Users can request edits to details before confirmation (e.g., "change the task name to X")

### Success Metrics

- % of stakeholders actively using chatbot
- Task completion rate via chatbot vs web interface
- Time saved per task completion
- User satisfaction scores
- Reduction in support tickets for basic operations

---

## Story 1: Send Update to Residents

**Story ID:** CHAT-001-1
**Story Name:** Send Update to Residents via Chatbot
**Priority:** High
**Story Points:** 8

### User Story

**As a** stakeholder managing an urban renewal project
**I want to** send updates to residents through the chatbot
**So that** I can quickly communicate important information without navigating the PM web interface

### Description

Stakeholders frequently need to send updates to residents about project progress, upcoming events, or important information. Instead of logging into the PM web app and navigating to the updates section, they can simply tell the chatbot they want to send an update. The chatbot will collect all necessary information through conversation and create the update task via the API.

### Acceptance Criteria

1. **Intent Recognition:**
   - [ ] Chatbot recognizes intent to send update from natural language (e.g., "I want to send an update", "Send message to residents", "Notify residents about architect visit")
   - [ ] Works with various phrasings and languages

2. **Authentication Check:**
   - [ ] If user is not logged in, prompt them to log in
   - [ ] Do not proceed with data collection until authenticated

3. **Data Collection:**
   The chatbot must collect the following information through conversation:

   - [ ] **Project:** Which project to send update for
     - If user has access to multiple projects, present list to choose from
     - If user has only one project, confirm it or allow them to specify

   - [ ] **Recipients:** Who should receive the update
     - Option 1: All residents of the project
     - Option 2: Select specific residents from list
     - Present options clearly

   - [ ] **Content:** The update text/message
     - Accept multi-line text
     - Support links (URLs) in the content
     - Validate non-empty content

   - [ ] **Channel:** Communication channel
     - Options: Email, SMS, WhatsApp
     - Allow single selection
     - Default to email if user doesn't specify

   - [ ] **Timing:** When to send the update
     - Option 1: Send now (immediately)
     - Option 2: Schedule for specific date and time
     - Validate future date if scheduled

4. **Permission Validation:**
   - [ ] Before confirmation, call API to verify user has permission to send updates for selected project
   - [ ] If permission denied, display clear message: "You don't have permission to send updates for [Project Name]. Would you like to try another project?"
   - [ ] If user has no update permissions for any project, explain and suggest alternative actions

5. **Confirmation:**
   - [ ] Present all collected information clearly for user review
   - [ ] Example format:
     ```
     Ready to send update:
     Project: [Project Name]
     Recipients: [All residents / Selected: John Doe, Jane Smith, +3 more]
     Channel: [Email/SMS/WhatsApp]
     Timing: [Now / Scheduled for DD/MM/YYYY HH:MM]
     Message: [Content preview]

     Should I proceed with sending this update?
     ```
   - [ ] Wait for explicit confirmation (Yes/Confirm/Proceed/etc.)
   - [ ] Allow cancellation (No/Cancel/Abort/etc.)
   - [ ] Allow edits (e.g., "change the message to...", "send via WhatsApp instead", "schedule for tomorrow 9am")

6. **Execution:**
   - [ ] On confirmation, call GetStatus API to create the update task
   - [ ] Display success message with confirmation details
   - [ ] Provide way to view/edit update in web interface (link)

7. **Error Handling:**
   - [ ] Handle API errors gracefully with user-friendly messages
   - [ ] If validation fails, explain what's wrong and allow correction
   - [ ] If scheduled send is in the past, prompt for valid future time
   - [ ] If selected recipients are invalid, prompt to reselect

### Conversation Flow Example

```
User: I need to send an update to residents

Bot: I can help you send an update to residents. Which project is this for?

User: Building A on Dizengoff Street

Bot: Got it - Building A, Dizengoff Street. Who should receive this update?
     1. All residents
     2. Select specific residents

User: All residents

Bot: Perfect. What would you like to tell them?

User: The architect is visiting the site next Monday at 10am. If you want to meet him, come by around this time.

Bot: Great message! How would you like to send this update?
     - Email
     - SMS
     - WhatsApp

User: WhatsApp

Bot: And when should I send this?
     - Send now
     - Schedule for later

User: Send now

Bot: Ready to send update:
     Project: Building A, Dizengoff Street
     Recipients: All residents (24 people)
     Channel: WhatsApp
     Timing: Now (immediately)
     Message: "The architect is visiting the site next Monday at 10am. If you want to meet him, come by around this time."

     Should I proceed with sending this update?

User: Yes

Bot: ✓ Update sent successfully to 24 residents via WhatsApp.
     You can view the update here: [link to PM interface]
```

### Technical Notes

- **API Endpoint:** `POST /api/v1/projects/{projectId}/updates`
- **Required API Data:**
  - `projectId`: UUID
  - `recipientType`: "all" | "selected"
  - `recipientIds`: Array of user IDs (if selected)
  - `content`: String
  - `channel`: "email" | "sms" | "whatsapp"
  - `scheduledFor`: ISO 8601 datetime (null for immediate)
- **Permissions:** User must have `project:send_updates` permission for the project
- **NLU Intents:** `send_update`, `notify_residents`, `create_announcement`

### Dependencies

- GetStatus API for update creation
- User authentication system
- Permission management system
- NLU model trained on update-related intents

### Out of Scope

- File/document attachments (text with links only)
- Rich text formatting
- Update templates
- Bulk updates to multiple projects

---

## Story 2: Create Task via Chatbot

**Story ID:** CHAT-001-2
**Story Name:** Create and Assign Tasks via Chatbot
**Priority:** High
**Story Points:** 5

### User Story

**As a** stakeholder managing projects or company operations
**I want to** create and assign tasks through the chatbot
**So that** I can quickly capture action items without switching to the PM interface

### Description

Stakeholders need to create tasks for themselves or team members throughout the day. Tasks can be project-specific or company-level. The chatbot should collect all necessary task details and create the task via the API.

### Acceptance Criteria

1. **Intent Recognition:**
   - [ ] Chatbot recognizes intent to create task (e.g., "Create a task", "Add new task", "Remind me to...", "Assign task to...")
   - [ ] Handles various phrasings

2. **Authentication Check:**
   - [ ] Verify user is logged in
   - [ ] Prompt login if not authenticated

3. **Data Collection:**

   - [ ] **Project (Optional):** Which project is this task for
     - Allow "none" or "company-level" for non-project tasks
     - If project specified, validate user has access
     - If not specified, create as company-level task

   - [ ] **Title (Required):** Task name
     - Validate non-empty
     - Suggest shortening if too long (>100 chars)

   - [ ] **Assignee (Required):** Who should complete the task
     - Can be user themselves or another team member
     - Validate assignee exists and has access to project (if project-specific)
     - Support assigning by name or role

   - [ ] **Description (Required):** Task details
     - Accept multi-line text
     - Validate non-empty

   - [ ] **Due Date (Optional):** When task should be completed
     - Support natural language dates ("tomorrow", "next Friday", "Dec 15")
     - Validate future dates only
     - Allow skipping (no due date)

   - [ ] **Priority (Optional):** Task importance
     - Options: Low, Medium, High
     - Default to Medium if not specified

   - [ ] **Reminder (Optional):** Reminder notification
     - Can set reminder for any date/time
     - Validate reminder is before or at due date (if due date exists)
     - Allow skipping

4. **Permission Validation:**
   - [ ] Verify user can create tasks in specified project (if project-specific)
   - [ ] Verify assignee has access to project (if project-specific)
   - [ ] If permission denied, show clear error and suggest alternatives

5. **Confirmation:**
   - [ ] Present all task details for review
   - [ ] Example format:
     ```
     Ready to create task:
     Project: [Project Name / Company-level]
     Title: [Task Title]
     Assigned to: [Name]
     Description: [Description preview]
     Due Date: [Date / None]
     Priority: [Low/Medium/High]
     Reminder: [Date & Time / None]

     Should I create this task?
     ```
   - [ ] Allow confirmation, cancellation, or edits

6. **Execution:**
   - [ ] Create task via API
   - [ ] Display success message
   - [ ] Provide link to view task in PM interface
   - [ ] Confirm if assignee will be notified

7. **Error Handling:**
   - [ ] Handle invalid assignee gracefully
   - [ ] Handle invalid project access
   - [ ] Handle API errors with user-friendly messages

### Conversation Flow Example

```
User: Create a task for Sarah

Bot: I'll help you create a task for Sarah. What's the task about?

User: She needs to follow up with the lawyer about the contract terms

Bot: Got it. Is this for a specific project or a company-level task?

User: For the Rothschild Tower project

Bot: Perfect. What would you like to call this task?

User: Follow up with lawyer on contract

Bot: Great title. Can you provide more details about what needs to be done?

User: Review sections 4 and 5 of the contract with the lawyer and get clarifications on the liability clauses

Bot: Excellent. When should this be completed?

User: By next Wednesday

Bot: Got it - Wednesday, December 18. What priority should this task have - Low, Medium, or High?

User: High

Bot: Would you like to set a reminder?

User: Yes, remind her on Monday morning

Bot: Ready to create task:
     Project: Rothschild Tower
     Title: Follow up with lawyer on contract
     Assigned to: Sarah Cohen
     Description: Review sections 4 and 5 of the contract with the lawyer and get clarifications on the liability clauses
     Due Date: Wednesday, December 18, 2024
     Priority: High
     Reminder: Monday, December 16, 2024 at 9:00 AM

     Should I create this task?

User: Yes

Bot: ✓ Task created successfully and assigned to Sarah Cohen.
     She will receive a notification and a reminder on Monday.
     View task: [link]
```

### Technical Notes

- **API Endpoint:** `POST /api/v1/tasks`
- **Required API Data:**
  - `projectId`: UUID (nullable for company-level tasks)
  - `title`: String (required)
  - `description`: String (required)
  - `assigneeId`: UUID (required)
  - `dueDate`: ISO 8601 date (nullable)
  - `priority`: "low" | "medium" | "high"
  - `reminderAt`: ISO 8601 datetime (nullable)
- **Permissions:** User must have `task:create` permission
- **NLU Intents:** `create_task`, `add_task`, `assign_task`, `remind_me`

### Dependencies

- Task management API
- User/team member directory
- Notification system for assignee alerts

### Out of Scope

- Multiple assignees per task
- Task dependencies
- Recurring tasks
- Task templates

---

## Story 3: Query Signature Status

**Story ID:** CHAT-001-3
**Story Name:** Check Signature Progress via Chatbot
**Priority:** Medium
**Story Points:** 3

### User Story

**As a** stakeholder managing an urban renewal project
**I want to** check signature status through the chatbot
**So that** I can quickly see how many residents have signed without opening the PM dashboard

### Description

Signature tracking is critical for urban renewal projects. Stakeholders frequently check the signature status page to monitor progress. The chatbot provides quick access to this information and can offer follow-up insights.

### Acceptance Criteria

1. **Intent Recognition:**
   - [ ] Recognize queries about signature status (e.g., "How many residents signed?", "What's the signature status?", "Show me signing progress")
   - [ ] Handle variations

2. **Authentication Check:**
   - [ ] Verify user is logged in
   - [ ] Redirect to login if needed

3. **Project Identification:**
   - [ ] If user has one project, use it automatically (with confirmation)
   - [ ] If multiple projects, ask which one
   - [ ] Accept project name or selection from list
   - [ ] Validate user has access to specified project

4. **Permission Validation:**
   - [ ] Verify user can view signature data for project
   - [ ] If no permission, show clear message and suggest trying another project

5. **Data Query:**
   - [ ] Call API to retrieve signature status data
   - [ ] Handle cases where no signature process exists for project

6. **Response Display:**
   - [ ] Show signature percentage clearly
   - [ ] Example: "34% of residents have signed the agreement (12 out of 35 residents)"
   - [ ] Make response conversational and easy to understand

7. **Follow-up Suggestions:**
   - [ ] Offer relevant follow-up options:
     - "Would you like to know who signed most recently?"
     - "Would you like to see who hasn't signed yet?"
     - "Would you like to send a reminder to unsigned residents?"
   - [ ] Wait for user response before showing additional data

8. **Follow-up Handling:**
   - [ ] If user asks for recent signers, query and display last 5-10 signatures with dates
   - [ ] If user asks for unsigned residents, query and display list (with privacy considerations)
   - [ ] If user asks to send reminder, transition to "Send Update" flow (Story 1)

9. **Error Handling:**
   - [ ] Handle projects without signature tracking gracefully
   - [ ] Handle API errors with user-friendly messages
   - [ ] Handle empty signature data (0% signed)

### Conversation Flow Example

```
User: What's the signature status for my project?

Bot: Let me check. Is this for Building A on Dizengoff Street? (Your only active project)

User: Yes

Bot: For Building A, Dizengoff Street:
     📊 34% of residents have signed the agreement (12 out of 35 residents)

     Would you like to know more?
     • Who signed most recently?
     • Who still hasn't signed?
     • Send reminder to unsigned residents

User: Who signed most recently?

Bot: Here are the most recent signatures:
     1. David Levi - Signed 2 hours ago (Apt 12)
     2. Rachel Cohen - Signed yesterday (Apt 8)
     3. Moshe Klein - Signed 2 days ago (Apt 15)
     4. Sara Mizrahi - Signed 3 days ago (Apt 4)
     5. Yosef Ben-David - Signed 1 week ago (Apt 22)

     Anything else you'd like to know?

User: No, that's all

Bot: Great! Let me know if you need anything else.
```

### Technical Notes

- **API Endpoint:** `GET /api/v1/projects/{projectId}/signatures/status`
- **Response Data:**
  - `totalResidents`: Number
  - `signedCount`: Number
  - `signedPercentage`: Number
  - `recentSignatures`: Array of {residentName, apartmentNumber, signedAt}
  - `unsignedResidents`: Array of {residentName, apartmentNumber}
- **Permissions:** User must have `project:view_signatures` permission
- **NLU Intents:** `check_signatures`, `signature_status`, `signing_progress`

### Dependencies

- Signature tracking API
- Project access control system

### Out of Scope

- Updating signature status (marking as signed/unsigned) - will be added in future story
- Detailed signature analytics (trends, charts)
- Exporting signature data

---

## Story 4: Update Project Status

**Story ID:** CHAT-001-4
**Story Name:** Update Project Status and Milestones via Chatbot
**Priority:** Medium
**Story Points:** 5

### User Story

**As a** stakeholder managing an urban renewal project
**I want to** update project status and sub-statuses through the chatbot
**So that** I can quickly reflect project progress without navigating the PM interface

### Description

Projects have main statuses and sub-statuses (milestones) that need to be updated as the project progresses. Stakeholders can use the chatbot to update these statuses, which are visible to residents in the REN platform.

### Acceptance Criteria

1. **Intent Recognition:**
   - [ ] Recognize intent to update status (e.g., "Update project status", "Change status to...", "Mark milestone as complete")
   - [ ] Handle various phrasings

2. **Authentication Check:**
   - [ ] Verify user is logged in
   - [ ] Redirect to login if needed

3. **Project Identification:**
   - [ ] If user has one project, confirm it
   - [ ] If multiple projects, ask which one
   - [ ] Validate user has access to project

4. **Status Type Selection:**
   - [ ] Ask whether user wants to update:
     - Main project status
     - Sub-status/milestone
     - Both
   - [ ] Handle if user specifies in initial request (e.g., "Update milestone to Planning Complete")

5. **Status Selection:**
   - [ ] Retrieve available status options from API based on data schema
   - [ ] Display current status
   - [ ] Present available next statuses as options
   - [ ] For main status: Show options like "Planning", "Permits", "Construction", "Complete", etc.
   - [ ] For sub-status: Show relevant milestones for current main status
   - [ ] Allow user to select from list or specify by name
   - [ ] Validate selection against available options

6. **Permission Validation:**
   - [ ] Verify user can update status for project
   - [ ] If no permission, show clear message and suggest alternatives

7. **Confirmation:**
   - [ ] Show current status and proposed change
   - [ ] Example format:
     ```
     Status Update:
     Project: Building A, Dizengoff Street

     Main Status: Planning → Permits
     Sub-status: Initial Planning → Permit Submission

     This will be visible to all residents on the platform.
     Should I proceed with this update?
     ```
   - [ ] Allow confirmation, cancellation, or edits

8. **Execution:**
   - [ ] Call API to update main status (if changed)
   - [ ] Call API to update sub-status/milestone (if changed)
   - [ ] Note: These may be two separate API calls
   - [ ] Handle case where one succeeds and other fails

9. **Success Response:**
   - [ ] Confirm status update
   - [ ] Mention that residents will see this update
   - [ ] Ask if user wants to send an update notification to residents (transition to Story 1)

10. **Error Handling:**
    - [ ] Handle invalid status transitions
    - [ ] Handle API errors gracefully
    - [ ] If one update fails in a two-part update, clearly communicate partial success

### Conversation Flow Example

```
User: Update status for Rothschild Tower

Bot: I can help update the status for Rothschild Tower.
     Current Status: Planning / Initial Design Complete

     What would you like to update?
     1. Main project status
     2. Sub-status/milestone
     3. Both

User: Both

Bot: Great. Let's start with the main status.
     Current: Planning

     Available options:
     1. Planning (current)
     2. Permits
     3. Pre-Construction
     4. Construction
     5. Completion

     Which status should we move to?

User: Permits

Bot: Perfect. Now for the sub-status.
     Current: Initial Design Complete

     Available milestones for Permits phase:
     1. Permit Submission
     2. Permit Review
     3. Permit Approved
     4. Permit Received

     Which milestone?

User: Permit Submission

Bot: Status Update:
     Project: Rothschild Tower

     Main Status: Planning → Permits
     Sub-status: Initial Design Complete → Permit Submission

     This will be visible to all residents on the platform.
     Should I proceed with this update?

User: Yes

Bot: ✓ Status updated successfully!
     • Main Status: Permits
     • Sub-status: Permit Submission

     Residents will see this update on their project page.
     Would you like to send a notification to residents about this progress?

User: No, not right now

Bot: Got it. Let me know if you need anything else!
```

### Technical Notes

- **API Endpoints:**
  - `GET /api/v1/projects/{projectId}/status-options` - Get available statuses
  - `GET /api/v1/projects/{projectId}/status` - Get current status
  - `PUT /api/v1/projects/{projectId}/status` - Update main status
  - `PUT /api/v1/projects/{projectId}/milestone` - Update sub-status/milestone
- **Required API Data:**
  - Main status: `status`: String (from available options)
  - Sub-status: `milestone`: String (from available options)
- **Permissions:** User must have `project:update_status` permission
- **NLU Intents:** `update_status`, `change_status`, `update_milestone`, `mark_complete`

### Dependencies

- Project status management API
- Status schema/options configuration
- REN platform for resident visibility

### Out of Scope

- Adding custom statuses (must use predefined schema)
- Batch status updates across multiple projects
- Status history viewing
- Automatic status transitions based on task completion

---

## Cross-Story Requirements

### General Chatbot UX

1. **Natural Language Understanding:**
   - Support conversational, natural phrasing
   - Handle typos and variations
   - Context awareness across multi-turn conversations

2. **Error Recovery:**
   - Gracefully handle misunderstandings
   - Offer to start over if conversation gets confusing
   - Provide clear error messages with actionable next steps

3. **Context Management:**
   - Remember user's projects and preferences within session
   - Allow users to switch contexts (e.g., from one project to another)
   - Clear context when user explicitly changes topic

4. **Help & Guidance:**
   - Provide help when user asks "What can you do?"
   - Offer suggestions for next actions after completing a task
   - Guide users through flows if they seem confused

5. **Accessibility:**
   - Support both Hebrew and English
   - Work on mobile and desktop interfaces
   - Keyboard-friendly (no mouse required)

### Security & Privacy

1. **Authentication:**
   - Never process private data without authentication
   - Session timeout handling
   - Secure token management

2. **Authorization:**
   - Permission checks before every action
   - Clear messaging when access denied
   - No exposure of data user shouldn't see

3. **Audit Logging:**
   - Log all actions performed via chatbot
   - Track user, timestamp, action, and result
   - Enable troubleshooting and compliance

4. **Data Privacy:**
   - Don't display sensitive data unnecessarily
   - Respect privacy settings of residents
   - Follow GDPR/privacy regulations

### Technical Requirements

1. **API Integration:**
   - Use existing GetStatus API endpoints
   - Handle rate limiting gracefully
   - Implement retry logic for transient failures

2. **Performance:**
   - Response time <2 seconds for queries
   - Response time <5 seconds for actions
   - Handle concurrent users without degradation

3. **Testing:**
   - Unit tests for intent recognition
   - Integration tests with API
   - E2E tests for complete flows
   - Permission testing for security

4. **Monitoring:**
   - Track conversation success rate
   - Monitor API errors and failures
   - Alert on unusual patterns

---

## Dependencies

### External Dependencies

1. **GetStatus API:** All backend operations
2. **Authentication Service:** User login and session management
3. **Permission System:** Access control for actions
4. **Notification Service:** For sending updates (Story 1)

### Internal Dependencies

1. **NLU Model:** Intent recognition and entity extraction
2. **Conversation Engine:** Multi-turn dialog management
3. **UI Integration:** Chatbot interface in PM platform
4. **Database:** Conversation history and context storage

---

## Out of Scope for V1

The following features are not included in this epic but may be considered for future versions:

1. **Voice Interface:** Audio input/output
2. **File Uploads:** Attaching documents in chat
3. **Bulk Operations:** Actions across multiple projects at once
4. **Advanced Analytics:** Charts and graphs in chat
5. **Custom Workflows:** User-defined automation sequences
6. **Integration with External Tools:** Calendar, email clients, etc.
7. **Resident Chat:** Direct messaging with residents
8. **Payment Processing:** Financial transactions via chat
9. **AI Suggestions:** Proactive recommendations
10. **Custom Reports:** Generate and download reports

---

## Release Plan

### Phase 1: Core Functionality
- Story 1: Send Update to Residents
- Story 2: Create Task via Chatbot

### Phase 2: Data Access
- Story 3: Query Signature Status

### Phase 3: Status Management
- Story 4: Update Project Status

### Phase 4: Polish & Optimization
- Improve NLU accuracy
- Add more natural language variations
- Performance optimization
- User feedback integration

---

## Success Criteria for Epic

The epic is considered successful when:

1. **Functionality:** All 4 stories are implemented and working in production
2. **Adoption:** At least 40% of active stakeholders try the chatbot within first month
3. **Usage:** At least 20% of tasks/updates created via chatbot after 3 months
4. **Satisfaction:** NPS score >40 for chatbot feature
5. **Reliability:** <1% error rate for confirmed actions
6. **Performance:** 95th percentile response time <3 seconds

---

## Notes

- This epic focuses on stakeholder-facing features only
- Resident chatbot features are separate and documented in the REN platform
- All features must work in both Hebrew and English
- Mobile-first design given stakeholder usage patterns
- Consider voice interface in future for on-site usage
