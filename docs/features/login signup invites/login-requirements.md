# GetStatus Login Epic - Requirements Document

## Overview
A multi-user-type authentication system for an urban renewal platform with stakeholders (professionals), residents, and representatives (building representatives who are a type of resident).

---

## User Types

### 1. Stakeholder
- **Who**: Lawyers, builders/contractors, real estate entrepreneurs, appraisers, supervisors
- **Account model**: Can belong to one company (account) OR be freelance (no company)
- **Auth method**: Email + Password, Magic Link, or OTP
- **Email verification**: Required at signup
- **Permissions**: Can create projects, invite other stakeholders or residents to projects

### 2. Resident
- **Who**: People living in apartments within urban renewal projects
- **Account model**: No company association
- **Auth method**: Phone number preferred (SMS OTP), email fallback allowed
- **Permissions**: Can create an apartment, request to join projects, view project info once approved

### 3. Representative
- **Who**: Residents who represent their entire building
- **Account model**: Same as resident
- **Permissions**: Same as resident (role is a label, no special permissions)

---

## Entry Points (Sign Up Flows)

### A. No Invite (Organic Signup)

#### Stakeholder - New User
| Scenario | Flow |
|----------|------|
| New account (company) | User signs up → Creates company → Becomes company Admin |
| Existing account (company) | User signs up → Requests to join company → Company Admin approves → Added as employee |
| No account (freelance) | User signs up → Becomes standalone stakeholder |

#### Stakeholder - Existing GS User
- Simply logs in

#### Resident - No Invite
- Creates apartment → Apartment exists but needs project association
- Shares unique resident link with stakeholder to request joining a project
- Stakeholder can also discover apartments waiting for projects

#### Representative - No Invite
- Creates new apartment → Sends invite link to stakeholder → Stakeholder signs up and creates project with that resident
- Creates apartment for existing project → Stakeholder (project admin) must approve before resident sees updates

---

### B. Project Invite

#### Stakeholder - Existing GS User
- Logs in → Automatically gains project access

#### Stakeholder - New User
| Scenario | Flow |
|----------|------|
| Company exists | Signs up → Added to existing company + gains project access |
| New company | Signs up → Creates company → Gains project access |
| No company | Signs up as freelance → Gains project access |

#### Resident - Existing GS User
- Logs in → Automatically gains project access

#### Resident - New User
- Signs up → Gains project access

---

### C. Account (Company) Invite

#### Existing GS User
- Added as org member to the company

#### New User
- Signs up → Becomes org member of that company

---

## Invite & Notification System

When an existing user is invited to a project/account:
- Email notification sent
- Pending invite shown in user profile
- Join button visible on project's public view
- In-app notification (webapp)

---

## Approval Flows

### Project Access Approval
- Anyone can access the app (even guests)
- To see project-specific info or post to social feed: must sign up
- To see project info: must accept invite from project admin OR have join request approved

### Employee Approval
- When stakeholder requests to join existing company → Admin must approve

### Resident Approval
- When resident creates apartment for existing project → Project admin (stakeholder who created project) must approve before they see updates

---

## Access States

| State | What User Sees |
|-------|----------------|
| Guest (not logged in) | Public app content |
| Logged in, no project access | App + prompt to join/request access |
| Pending approval | App + "waiting for approval" state |
| Approved | Full project info + social feed |

---

## Data Collection at Signup

### Stakeholder
- Email (required, must verify)
- Password
- Full name
- Company name (if creating new) OR company selection (if joining existing) OR freelance flag
- Professional role/title

### Resident
- Phone number (required, preferred auth)
- Email (optional fallback)
- Full name
- Apartment/address info

### Representative
- Same as Resident
- Building representation flag

---

## Key Entities & Relationships

```
Company (Account)
  └── has many Stakeholders (employees)
  └── has one Admin (creator)

Project
  └── created by Stakeholder (becomes project admin)
  └── has many Stakeholders (invited/joined)
  └── has many Residents (invited/approved)
  └── has many Apartments

Apartment
  └── belongs to one Resident (or Representative)
  └── may belong to one Project (or orphan/waiting)
  └── has unique shareable link (per resident)

User
  └── is exactly ONE type: Stakeholder | Resident | Representative
  └── if Stakeholder: belongs to 0 or 1 Company
```

---

## Edge Cases to Handle

1. **Orphan apartments**: Resident creates apartment before any project exists
   - Apartment is discoverable by stakeholders
   - Resident can share link to notify stakeholder

2. **Duplicate detection**: What if user tries to sign up with email/phone that exists?
   - Redirect to login with message

3. **Invite link expiration**: Should invite links expire?
   - TBD: Need to define expiration policy

4. **Company name conflicts**: What if new company name matches existing?
   - TBD: Prevent duplicates or allow with disambiguation

5. **Project admin transfer**: What if project admin leaves?
   - TBD: Define succession rules

---

## Resolved Decisions

1. **Invite expiration**: Time-based expiration (define specific duration during implementation)
2. **Company uniqueness**: Block duplicate company names - suggest joining existing company instead

## Open Questions

1. **Admin succession**: What happens if project admin account is deleted?
2. **Phone number changes**: How does a resident update their phone number?
3. **Account deletion**: What happens to apartments/projects when a user is deleted?
4. **Rate limiting**: Limits on invite sending, signup attempts, OTP requests?
5. **Invite duration**: Specific expiration timeframe (7 days? 30 days? 90 days?)

---

## Next Steps

Once requirements are approved:
1. Define database schema for users, companies, projects, apartments, invites
2. Design API endpoints for each auth flow
3. Create UI mockups for signup/login screens per user type
4. Implement auth service with email verification + SMS OTP
5. Build invite/approval notification system
