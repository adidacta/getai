# Invite Stakeholder to Project Flow

## TL;DR

A stakeholder can invite another stakeholder to collaborate on a project through a 3-step dialog flow. The flow starts from the Project Page when clicking "Choose" on an unassigned stakeholder slot, and ends when the invitation is sent.

### Quick Flow

```
Project Page → Click "Choose" → Search → Details → Confirm → Invitation Sent
```

### Key Files
- `frontend/src/components/ProjectPage.jsx` - Project page with "Choose" buttons
- `frontend/src/components/AddStakeholderFlow.jsx` - Multi-step invite dialog

---

## Flow Overview

### Entry Point: Project Page

**Route:** `/` (default) or `/project`

The Project Page displays stakeholder slots. Unassigned slots show a "Choose" button that initiates the invite flow.

**Clicking "Choose"** navigates to `/project/invite?role={roleKey}`

---

## Dialog Steps

### Layout

Two-column dialog:
- **Left:** Blue gradient sidebar with benefits and privacy reassurance
- **Right:** Form content (steps)
- **Fixed height:** 620px to prevent layout shifts between steps

---

### Step 1: Search

**Purpose:** Find a stakeholder in the Real Estate Network

**Elements:**
- Title: "Add a Stakeholder"
- Subtitle: "Search the Real Estate Network"
- Search input with dynamic label based on role: "Search 307 lawyers"
- Fixed-height results area (prevents layout shift)

**Results Area States:**
1. **Empty (no query):** Shows REN stats as social proof widgets
2. **Results found:** Selectable list of stakeholders
3. **No results:** "Not found" message with "Invite to REN" button

**Search Behavior:**
- Searches by name OR company (case-insensitive)
- Minimum 2 characters to trigger
- No role filtering (find anyone, assign role later)

**Actions:**
- Select stakeholder → enables "Next"
- "Invite to REN" → proceeds to Step 2 with empty form
- "Cancel" → shows confirmation if data entered

---

### Step 2: Details

**Purpose:** Review or enter stakeholder details

**Title:** "Confirm Details" (existing user) or "Invite to REN" (new user)

**Fields (in order):**
1. **Name** - Prefilled if existing, editable if new
2. **Role in this project** - Always editable (dropdown)
3. **Company** - Prefilled if existing, editable if new
4. **Email** - Always editable

**Validation:** All fields required, valid email format

**Actions:**
- "Back" → Step 1
- "Next" → Step 3

---

### Step 3: Confirm

**Purpose:** Final review before sending

**Elements:**
- Title: "Confirm Invitation"
- **"YOU'RE INVITING"** label + stakeholder card:
  - Avatar icon
  - Name (bold)
  - Role at Company
  - Email
- **"TO PROJECT"** label + project card:
  - Building icon
  - Project name
  - "Urban Renewal Project"
- Privacy notice (green): "Only shared workspace content will be visible to {name}"
- Terms checkbox

**Actions:**
- "Cancel" → confirmation dialog
- "Send Invitation" → sends invite → Step 4

---

### Step 4: Success

**Purpose:** Confirm invitation was sent

**Elements:**
- Green checkmark
- Title: "Invitation Sent!"
- "{Name} will receive an email to join {Project}"
- "What's next" steps (1, 2, 3)
- Privacy reassurance: "You have full control over what to share with {name}"
- "Done" button → returns to Project Page

---

## Sidebar Content

**Logo:** GetStatus logo (centered)

**Title:** "Collaborate on GetStatus"

**Benefits:**
- Real-time Updates
- Secure Documents
- Shared Workspace

**Privacy:** "Your Privacy Protected - Only shared workspace content is visible."

---

## Step Progress Indicator

- 3 steps: Search → Details → Confirm
- Numbers (1, 2, 3) change to checkmarks when completed
- Labels visible on desktop, hidden on mobile
- Current step has ring highlight

---

## Cancel Confirmation Dialog

**Trigger:** Cancel/X when form has data

**Content:**
- "Cancel Invitation?"
- "Are you sure you want to discard this invite?"
- "Go back" | "Discard"

---

## Data Structures

### Role Options
```javascript
{ value: 'lawyer', label: 'Lawyer', plural: 'lawyers', count: 307 }
{ value: 'builder', label: 'Builder', plural: 'builders', count: 300 }
{ value: 'supervisor', label: 'Supervisor', plural: 'supervisors', count: 77 }
{ value: 'appraiser', label: 'Appraiser', plural: 'appraisers', count: 41 }
{ value: 'representative', label: 'Representative', plural: 'representatives', count: 538 }
{ value: 'pm', label: 'Project Manager', plural: 'project managers', count: 45 }
{ value: 'municipality', label: 'Municipality', plural: 'municipalities', count: 28 }
{ value: 'public_housing', label: 'Public Housing', plural: 'public housing', count: 12 }
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

---

## Design Specs

### Colors
- Primary: `blue-600`
- Success: `green-600`
- Sidebar: `from-blue-600 to-indigo-700`
- Background: `gray-100`

### Dimensions
- Dialog: `max-w-4xl` (896px)
- Sidebar: `w-80` (320px)
- Content height: `h-[620px]`
- Results area: `h-48`

### Typography
- Font: Noto Sans
- Headings: Bold, `text-gray-900`
- Labels: Medium, `text-gray-700`

---

## Testing Checklist

- [ ] Search finds stakeholders by name
- [ ] Search finds stakeholders by company
- [ ] "Not found" shows when no results
- [ ] "Invite to REN" works for new users
- [ ] All form fields validate correctly
- [ ] Role can be changed for existing users
- [ ] Cancel confirmation appears when data entered
- [ ] Success screen shows correct info
- [ ] Dialog height stays consistent across steps
- [ ] Step indicator updates correctly
