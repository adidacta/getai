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

## V3 Authentication Pages

Modern, clean authentication flow with consistent design across all pages. All V3 pages use a Fiverr-inspired navigation and two-column layout.

### Design System:

**Navigation (All Pages):**
- Menu items: Projects, My Neighbourhood, Urban Renewal, News, Marketplace
- Right side CTAs:
  - "Stakeholders Zone" → `/login2/stakeholder`
  - "Get Status Updates" (primary) → `/login3/resident`
- Responsive with mobile hamburger menu
- Same header across REN home and all V3 auth pages

**Layout Pattern:**
- Two-column grid (desktop)
- Left: Form/content
- Right: Phone mockup showing project timeline
- Top-aligned columns to prevent content shifting
- Same phone mockup across all V3 pages for consistency

### Pages:

**1. ResidentLoginV3** (`/login3/resident`)
- Unified login/signup entry point
- Title: "Welcome to GetStatus"
- Single email/mobile input field
- Educational benefits card above form
- Continues to signup flow with pre-filled contact info
- Component: `frontend/src/components/ResidentLoginV3.jsx`

**2. StakeholderLoginV3** (`/login3/stakeholder`)
- Two login methods: Email or Phone (toggle tabs)
- Email login: Shows password field + "Forgot password?" link
- Phone login: No password, goes directly to OTP
- Email login alternative: "Sign In with One-Time Code Instead"
- Phone login: "Get Verification Code" button
- Component: `frontend/src/components/StakeholderLoginV3.jsx`

**3. OTPVerificationV3** (`/verify-otp3`)
- 4-digit OTP input with auto-focus
- Paste support for easy code entry
- Shows email/phone where code was sent
- Resend functionality with 60-second cooldown
- Auto-submit when all 4 digits entered
- Component: `frontend/src/components/OTPVerificationV3.jsx`

**4. ForgotPasswordV3** (`/forgot-password3`)
- Email input for password reset
- Two states: Form and Success
- Success state shows confirmation with email address
- Option to resend if email not received
- Returns to login after successful request
- Component: `frontend/src/components/ForgotPasswordV3.jsx`

**5. RENHomePage** (`/` and `/ren`)
- Main landing page
- Same navigation as V3 auth pages
- Hero section with search
- Platform statistics
- Featured articles section
- Call-to-action sections
- Component: `frontend/src/components/RENHomePage.jsx`

### Developer Tools:

**DevNavigator FAB:**
- Floating action button for quick page navigation during development
- Bottom-right purple/blue gradient button
- Organized categories: Home, Login, Landing Pages, Login V3, Signup, Auth
- Shows current page with highlighting
- One-click navigation to any page
- Component: `frontend/src/components/DevNavigator.jsx`

### Flow Connections:

- ResidentLoginV3 → ResidentSignup (with pre-filled contact)
- StakeholderLoginV3 (email) → Password login or OTPVerificationV3
- StakeholderLoginV3 (phone) → OTPVerificationV3
- StakeholderLoginV3 → ForgotPasswordV3
- OTPVerificationV3 → Success/Dashboard
- ForgotPasswordV3 → Success → Back to StakeholderLoginV3

### Key Features:

- **Consistent Design:** All pages share the same navigation and visual style
- **Responsive:** Mobile-first with hamburger menus
- **Accessibility:** Clear labels, proper focus management, keyboard navigation
- **Progressive Enhancement:** Auto-focus, auto-submit, paste support
- **Error Handling:** Inline validation with clear error messages
- **Loading States:** Disabled buttons, spinners during async operations
- **Phone Mockup:** Shows GetStatus PM platform features (project timeline, transparency, stats)

## Deployment

The application is deployed on Vercel with automatic deployments from the `main` branch.

### Configuration:
- Build from `frontend` subdirectory using Vite
- SPA routing handled via rewrites in `vercel.json`
- All routes redirect to `index.html` for client-side routing

### Repository:
- GitHub: https://github.com/adidacta/getai
