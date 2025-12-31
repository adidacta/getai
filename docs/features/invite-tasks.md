# Invite Flow - Pending Tasks

## Invitee Stories

### 1. Email Notification (All Users)
**As an** invitee (new or existing user)
**I want to** receive an email when invited to a project
**So that** I know someone wants to collaborate with me

**Includes:**
- Email with invite details (project, inviter, role)
- CTA button linking to accept page
- Works for both new and existing users

---

### 2. In-App Notification (Existing Users Only)
**As an** existing GTS user
**I want to** see a notification when I'm invited to a project
**So that** I don't have to check my email

**Includes:**
- Notification badge/indicator
- Notification in dropdown/bell icon
- Link to invite details

---

### 3. Invitations Inbox
**As an** invitee
**I want to** see all my pending invitations in one place
**So that** I can review and act on them

**Includes:**
- List of pending invites
- Invite details (project, inviter, role, date)
- Accept/Decline actions
- Filter by status (pending, accepted, declined)

---

### 4. Accept Invite - New User
**As a** new user (no GTS account)
**I want to** sign up and accept the invite in one flow
**So that** I can quickly join the project

**Includes:**
- Signup form with invite context
- Account creation + auto-accept
- Redirect to project dashboard

---

### 5. Accept Invite - Logged In User
**As an** existing user who is logged in
**I want to** accept an invite with one click
**So that** there's minimal friction

**Includes:**
- Show invite details
- One-click "Accept" button
- Immediate project access

---

### 6. Accept Invite - Logged Out User
**As an** existing user who is logged out
**I want to** login and have the invite auto-accepted
**So that** I don't have to accept manually after login

**Includes:**
- Show invite details with "Sign in to accept"
- Preserve invite context through login
- Auto-accept after authentication

---

### 7. Decline Invite
**As an** invitee
**I want to** decline an invitation
**So that** I can opt out of projects I don't want to join

**Includes:**
- Decline button/option
- Optional reason (dropdown or text)
- Confirmation before declining
- Notify inviter of decline (optional)

---

## Implementation Notes

**Existing code:** `StakeholderInviteDemo.jsx` has scaffolding for stories 4, 5, 6

**Suggested order:**
1. Accept scenarios (4, 5, 6) - build on existing demo
2. Invitations Inbox (3) - central management hub
3. Decline flow (7) - add to inbox
4. Notifications (2) - requires notification system
5. Email (1) - requires backend integration
