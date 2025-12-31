# Invite Stakeholder to Project Flow

## TL;DR

A stakeholder (inviter) can invite another stakeholder (invitee) to collaborate on a project through a 3-step dialog flow. The invitee can be either an existing GetStatus user or a new user. After the inviter sends the invitation, the invitee receives an email and can accept through one of three scenarios: signup (new user), one-click accept (logged in), or login-to-accept (logged out).

### Quick Flow Summary

```
INVITER SIDE:
Project Page → Click "Choose" → Search Stakeholder → Enter Details → Confirm → Send

INVITEE SIDE:
Email Link → Accept Page → [Signup | Accept | Login] → Joined Project
```

### Key Files
- `frontend/src/components/ProjectPage.jsx` - Project page with "Choose" buttons
- `frontend/src/components/AddStakeholderFlow.jsx` - Multi-step invite dialog
- `frontend/src/components/StakeholderInviteDemo.jsx` - Invitee acceptance screens

---

## Detailed Requirements

### 1. Project Page (Entry Point)

**Route:** `/` (default) or `/project`

**Purpose:** Display project information and stakeholder slots that need to be filled.

**UI Elements:**
- Project header with name (e.g., "Ben Yehuda 45")
- Stakeholder cards showing:
  - Assigned stakeholders (green, with checkmark)
  - Unassigned slots (gray, with "Choose" button)
- "Choose" button initiates invite flow

**Stakeholder Roles:**
- Representative
- Builder
- Lawyer
- Supervisor
- Additional: PM, Municipality, Appraiser, Public Housing

**Behavior:**
- Clicking "Choose" navigates to `/project/invite?role={roleKey}`
- Role is passed via URL parameter

---

### 2. Add Stakeholder Dialog (Inviter Flow)

**Route:** `/project/invite?role={role}`

**Layout:** Two-column dialog
- Left: Blue gradient sidebar with benefits/reassurance
- Right: Form steps

#### Step 1: Search

**Purpose:** Find stakeholder in the Real Estate Network

**UI Elements:**
- Title: "Add a Stakeholder"
- Subtitle: "Search the Real Estate Network"
- Search input with dynamic label: "Search {count} {role}s" (e.g., "Search 307 lawyers")
- Results area (fixed height to prevent layout shift):
  - Empty state: Shows REN stats widgets
  - Results: List of matching stakeholders
  - No results: "Not found" with "Invite to REN" button

**Search Logic:**
- Searches by name OR company name
- Case-insensitive
- Minimum 2 characters to trigger search
- Does NOT filter by role (allows finding anyone)

**REN Stats Display (empty state):**
```
307 Lawyers | 300 Developers | 538 Representatives
77 Supervisors | 41 Appraisers | 3,830 Projects
```

**Actions:**
- Select stakeholder from results → enables "Next" button
- "Invite to REN" (when not found) → goes to Step 2 with empty form
- "Cancel" → confirmation dialog if data entered

#### Step 2: Details

**Purpose:** Review/edit stakeholder details and assign role

**UI Elements:**
- Title: "Confirm Details" (existing user) or "Invite to REN" (new user)
- Form fields:
  1. Name (prefilled if existing, editable if new)
  2. Role in this project (always editable dropdown)
  3. Company (prefilled if existing, editable if new)
  4. Email (always editable)

**Field Behavior:**
- Existing GTS user: Name, Company prefilled and disabled; Role, Email editable
- New user: All fields editable

**Validation:**
- All fields required
- Email must be valid format

**Actions:**
- "Back" → returns to Step 1
- "Next" → goes to Step 3

#### Step 3: Confirm

**Purpose:** Final review before sending invitation

**UI Elements:**
- Title: "Confirm Invitation"
- "YOU'RE INVITING" label with stakeholder card:
  - Avatar placeholder
  - Name (bold)
  - Role at Company
  - Email
- "TO PROJECT" label with project card:
  - Building icon
  - Project name
  - "Urban Renewal Project" subtitle
- Privacy notice: "Only shared workspace content will be visible to {name}"
- Terms checkbox: "I agree to the Terms and Privacy Policy"

**Actions:**
- "Cancel" → confirmation dialog
- "Send Invitation" → sends invite, goes to Step 4

#### Step 4: Success

**Purpose:** Confirm invitation sent

**UI Elements:**
- Green checkmark icon
- Title: "Invitation Sent!"
- Subtitle: "{Name} will receive an email to join {Project}"
- "What's next" card:
  1. They receive your invitation
  2. They accept and join
  3. Start collaborating!
- Privacy reassurance: "You have full control over what to share with {name}"
- "Done" button → returns to Project Page

---

### 3. Benefits Sidebar

**Purpose:** Reassure inviter about the value and privacy

**Content:**
- GetStatus logo (centered)
- Title: "Collaborate on GetStatus"
- Subtitle: "Add stakeholders to streamline your project collaboration"
- Benefits list:
  - Real-time Updates - Share progress instantly
  - Secure Documents - Exchange files safely
  - Shared Workspace - Collaborate in one place
- Privacy section: "Your Privacy Protected - Only shared workspace content is visible. Your private data stays private."

---

### 4. Invitee Acceptance (3 Scenarios)

**Route:** `/invite/demo?scenario={1|2|3}`

**Common Elements:**
- Header: "Hi {name}. You've Been Invited!"
- Invite details card showing inviter, project, and assigned role

#### Scenario 1: New User (No Account)

**Purpose:** Allow new users to signup and accept invite

**Form Fields:**
- Full Name (required)
- Email (required, prefilled from invite)
- Phone Number (optional)
- Password (required, min 8 chars)
- Confirm Password (required, must match)
- Terms acceptance checkbox

**Actions:**
- "Create Account & Accept" → creates account, accepts invite, redirects to dashboard

#### Scenario 2: Existing User, Logged In

**Purpose:** One-click acceptance for authenticated users

**UI Elements:**
- Shows current user info (prefilled, read-only)
- Single "Accept Invitation" button

**Actions:**
- "Accept Invitation" → immediately adds to project, redirects to dashboard

#### Scenario 3: Existing User, Logged Out

**Purpose:** Prompt login before accepting

**UI Elements:**
- Info message: "To accept the invite, please sign in with your GetStatus account"
- "Sign In to Accept Invitation" button
- "Create a new account" link

**Actions:**
- "Sign In" → redirects to login, preserves invite context
- After login → auto-accepts invite, redirects to dashboard

---

### 5. Step Progress Indicator

**Design:**
- Horizontal stepper with 3 steps: Search → Details → Confirm
- Each step shows:
  - Number (1, 2, 3) or checkmark when completed
  - Label (hidden on mobile)
- Connecting lines between steps
- Current step has ring highlight

---

### 6. Cancel Confirmation

**Trigger:** Clicking Cancel or X when form has data

**Dialog:**
- Title: "Cancel Invitation?"
- Message: "Are you sure you want to discard this invite?"
- Actions: "Go back" | "Discard"

---

## Data Structures

### Role Options
```javascript
{
  value: 'lawyer',
  label: 'Lawyer',
  plural: 'lawyers',
  count: 307
}
```

### Mock Stakeholders (for demo)
```javascript
{
  id: 1,
  name: 'Moshe Haim',
  company: 'Tidhar',
  role: 'builder',
  email: 'moshe.haim@tidhar.co.il'
}
```

### Form Data
```javascript
{
  role: 'lawyer',
  companyName: 'Cohen Law Firm',
  stakeholderName: 'Sarah Cohen',
  email: 'sarah@cohenlaw.com'
}
```

### Invite Data (for invitee screens)
```javascript
{
  type: 'project',
  projectName: 'Ben Yehuda 45',
  inviterName: 'Sarah Cohen',
  inviterCompany: 'XYZ Developers',
  inviterRole: 'Project Manager',
  inviteeName: 'John Doe',
  inviteeEmail: 'john@abclaw.com',
  inviteeCompany: 'ABC Law Firm',
  inviteeRole: 'Lawyer'
}
```

---

## Design Specifications

### Colors
- Primary Blue: `#2563EB` (blue-600)
- Success Green: `#16A34A` (green-600)
- Sidebar Gradient: `from-blue-600 to-indigo-700`
- Background: `#F3F4F6` (gray-100)
- Cards: White with `border-gray-200`

### Typography
- Font: Noto Sans
- Headings: Bold, gray-900
- Body: Regular, gray-700
- Labels: Medium, gray-700
- Muted: gray-400/500

### Spacing
- Dialog padding: 24px (p-6)
- Card padding: 16px (p-4)
- Field spacing: 16px (space-y-4)

### Fixed Dimensions
- Dialog max-width: `max-w-4xl` (896px)
- Sidebar width: `w-80` (320px)
- Content height: `h-[620px]`
- Search results: `h-48` (192px)

### Icons
- Lucide React icons throughout
- Avatar placeholders: Colored circles with User/Building icons

---

## API Integration (Future)

### Endpoints Needed
1. `GET /api/stakeholders/search?q={query}` - Search REN
2. `POST /api/invites` - Send invitation
3. `GET /api/invites/:token` - Get invite details
4. `POST /api/invites/:token/accept` - Accept invitation
5. `POST /api/auth/signup-with-invite` - Signup and accept

### Webhook Events
- `invite.sent` - When invitation is created
- `invite.accepted` - When invitee accepts
- `invite.expired` - When invite expires (future)

---

## Testing Checklist

### Inviter Flow
- [ ] Can search for existing stakeholder by name
- [ ] Can search for existing stakeholder by company
- [ ] Search shows "not found" for non-existent users
- [ ] Can invite new user via "Invite to REN"
- [ ] Form validation works for all fields
- [ ] Can change role assignment for existing user
- [ ] Cancel shows confirmation when data entered
- [ ] Success screen displays correct information

### Invitee Flow
- [ ] Scenario 1: Can complete signup form
- [ ] Scenario 1: Validation works (password match, etc.)
- [ ] Scenario 2: One-click accept works
- [ ] Scenario 3: Login redirect preserves invite context

### UI/UX
- [ ] Dialog height is consistent across all steps
- [ ] Sidebar extends full height
- [ ] Step indicator updates correctly
- [ ] Loading states show during async operations
- [ ] Responsive on mobile (sidebar hidden)

---

## Future Enhancements

1. **Batch Invites** - Invite multiple stakeholders at once
2. **Invite Inbox** - View pending invitations
3. **Resend/Cancel** - Manage sent invitations
4. **Custom Messages** - Add personal note to invite
5. **Invite Expiration** - Auto-expire after X days
6. **Role Suggestions** - AI-powered role matching
7. **Company Directory** - Browse stakeholders by company
