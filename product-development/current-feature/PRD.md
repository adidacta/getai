# Product Requirements Document
## Authentication & Onboarding System Redesign

**Product:** GetStatus Platform (PM + Real Estate Network)
**Feature:** Unified Authentication & Onboarding System
**Version:** 1.0
**Last Updated:** December 11, 2025
**Document Owner:** Product Management
**Status:** Draft for Review

---

## Executive Summary

GetStatus requires a complete redesign of its authentication and onboarding system to eliminate user confusion, reduce signup friction, and support the diverse entry points across both platforms (Project Management and Real Estate Network). The current system creates unnecessary complexity for users trying to access the platform, particularly affecting resident onboarding and stakeholder conversion from guest browsing.

This PRD defines a comprehensive authentication and onboarding solution that:
- Provides intuitive, user-type-specific login experiences
- Streamlines resident signup and approval workflows
- Enables seamless guest-to-user conversion for opportunity discovery
- Supports multiple invite scenarios (project collaboration, company onboarding)
- Maintains security and compliance while improving user experience

**Expected Impact:**
- Reduced signup abandonment rates
- Faster time-to-value for all user types
- Higher activation rates from guest to active user
- Decreased support requests related to login/signup confusion

---

## Problem Statement

### Current State

GetStatus serves three distinct user types (Stakeholders, Residents, and Representatives) across two platforms, but the authentication system treats all users similarly, creating significant friction:

**Login Confusion:**
- Single login page serves both residents (phone/SMS preferred) and stakeholders (email/password preferred)
- Default login method is email/password, forcing residents to switch to phone login
- No visual distinction or guidance for different user types

**Resident Onboarding Complexity:**
- Multi-step process: create account → create apartment → request project access → wait for approval
- High abandonment rate for residents who simply want project updates
- No direct path from "I want updates" to "approved for updates"

**Missing Guest Conversion Flows:**
- Stakeholders browsing the Real Estate Network as guests encounter opportunities but must leave context to sign up
- No preservation of intent (which opportunity/project/company they wanted to engage with)
- Lost conversion opportunities

**Inconsistent Invite Experiences:**
- Multiple invite types (project, company) with unclear flows
- New users invited to collaborate face ambiguous onboarding
- No clear indication of what they're being invited to or what access they'll receive

### User Impact

**Residents:**
- Frustrated by complex signup just to receive updates
- Unable to easily communicate their need to stakeholders
- Delayed access to project information

**Stakeholders:**
- Lost opportunities due to signup friction while browsing REN
- Confusion about company association during signup
- Unclear collaboration invite acceptance process

**Platform:**
- Lower conversion rates from guest to active user
- Higher support burden from login/signup confusion
- Missed collaboration opportunities due to friction

---

## Goals & Success Metrics

### Business Goals

1. **Increase User Acquisition:** Reduce friction in signup flows to convert more guests and invitees into active users
2. **Improve User Experience:** Eliminate confusion and create intuitive, user-type-specific experiences
3. **Enable Ecosystem Growth:** Facilitate easier collaboration between stakeholders and resident onboarding
4. **Maintain Security:** Preserve security and compliance requirements while improving UX

### Success Metrics

**Primary Metrics:**
- **Signup Completion Rate:** Increase from current baseline by 40%
- **Time to First Value:** Reduce average time from signup to first meaningful action by 60%
- **Guest-to-Active User Conversion:** Increase REN guest conversion rate by 50%
- **Signup Abandonment Rate:** Reduce abandonment at each step by 35%

**Secondary Metrics:**
- **Support Ticket Volume:** Decrease login/signup-related support requests by 70%
- **Login Error Rate:** Reduce failed login attempts due to wrong auth method by 80%
- **Invite Acceptance Rate:** Increase invite acceptance rate by 30%
- **Mobile Signup Completion:** Ensure 90%+ of resident signups complete successfully on mobile

**User Experience Metrics:**
- **Task Success Rate:** 95%+ of users can complete their intended signup flow
- **User Satisfaction:** Net Promoter Score (NPS) for signup experience >70

---

## User Personas & Jobs to be Done

### Persona 1: Resident (Primary)

**Profile:**
- Lives in an apartment within an urban renewal project
- Limited technical expertise, primarily uses mobile phone
- Wants to stay informed about their building's renovation

**Jobs to be Done:**
> "When I want to stay informed about my urban renewal project, I want to quickly sign up and get approved for project updates, so I can track progress and make informed decisions about my apartment without dealing with complex setup processes."

**Current Pain Points:**
- Too many steps to just get updates
- Unclear what information is needed
- Long wait time between signup and access

**Desired Outcome:**
- Simple, mobile-friendly signup form
- Automatic routing to stakeholder for approval
- Clear status visibility while waiting

### Persona 2: Building Representative

**Profile:**
- Resident who represents their entire building
- More engaged than typical resident
- Acts as liaison between residents and stakeholders

**Jobs to be Done:**
> "When I want to represent my building in the renewal process, I want to sign up with my representative status clearly indicated, so I can coordinate between residents and stakeholders effectively."

**Current Pain Points:**
- No distinction from regular residents during signup
- Unclear how to indicate building representation role

**Desired Outcome:**
- Option to specify representative status during signup
- Clear visibility of representative role to stakeholders

### Persona 3: Stakeholder - Guest Discovery

**Profile:**
- Professional (lawyer, builder, appraiser, etc.) browsing REN
- Looking for collaboration opportunities or projects
- May be freelance or affiliated with a company

**Jobs to be Done:**
> "When I discover a collaboration opportunity on the Real Estate Network, I want to quickly sign up without losing context, so I can apply or follow the opportunity before it passes."

**Current Pain Points:**
- Loses context when redirected to signup
- Unclear which company to associate with (if any)
- Can't remember which opportunity sparked the signup

**Desired Outcome:**
- Contextual signup that remembers their intent
- Clear path to choose company affiliation or freelance status
- Immediate access to the opportunity after signup

### Persona 4: Stakeholder - Invited Collaborator

**Profile:**
- Professional invited by another stakeholder to collaborate on a project
- May be new to GetStatus or existing user
- Needs to understand what they're joining

**Jobs to be Done:**
> "When I'm invited to collaborate on an urban renewal project, I want to easily understand what I'm being invited to and seamlessly accept, so I can start contributing to the project immediately."

**Current Pain Points:**
- Unclear what project they're joining
- Ambiguous about their role or permissions
- Complex signup if they're new to GetStatus

**Desired Outcome:**
- Clear preview of project and role before signup
- One-click acceptance if already a user
- Streamlined signup with project context for new users

### Persona 5: Stakeholder - New Company Employee

**Profile:**
- Professional recently hired by a GetStatus member company
- Needs to represent their company on the platform
- May have experience with similar platforms (LinkedIn, etc.)

**Jobs to be Done:**
> "When I join a company that uses GetStatus, I want to be onboarded to the platform and associated with my company, so I can start representing them in the urban renewal ecosystem."

**Current Pain Points:**
- Unclear how company association works
- Ambiguous about what access/permissions they'll have
- No orientation to platform capabilities

**Desired Outcome:**
- Clear company invite with context
- Automatic association with company account
- Guided introduction to platform features

---

## Feature Requirements & Specifications

### 1. Differentiated Login Experience

**Requirements:**

**1.1 User Type Selection**
- Login page presents clear choice: "I'm a Resident" vs "I'm a Professional"
- Visual distinction through icons, colors, or layout
- Default selection based on:
  - User's previous login history (cookie/local storage)
  - Invite link context if arriving via invite
  - No default if first-time visitor

**1.2 Resident Login Flow**
- Primary method: Phone number + SMS OTP
- Optional fallback: Email + OTP
- Auto-detection of phone number format (Israeli numbers)
- Clear "Don't have an account? Sign up" path

**1.3 Stakeholder Login Flow**
- Primary method: Email + Password
- Alternative methods:
  - Email + Magic Link (passwordless)
  - Email + OTP
  - Phone + SMS OTP (for users who prefer)
- "Remember me" functionality
- "Forgot password" recovery flow
- Clear "Don't have an account? Sign up" path

**1.4 Error Handling**
- Wrong user type? Suggest alternative login method
- Account doesn't exist? Direct to appropriate signup flow
- Too many attempts? Implement rate limiting with clear messaging

**Acceptance Criteria:**
- [ ] Users can identify their login path within 3 seconds
- [ ] Residents default to phone login without switching
- [ ] Stakeholders can choose preferred auth method
- [ ] Error messages guide users to correct action
- [ ] Mobile-responsive design for all flows

---

### 2. Simplified Resident Signup

**Requirements:**

**2.1 Quick Signup Form**
- Single-page form collecting:
  - Full name
  - Phone number (required, primary auth)
  - Email (optional, for notifications)
  - Apartment address/details
  - Building representation checkbox (optional)
  - Project association (if known) OR "I don't know my project"

**2.2 Automatic Stakeholder Notification**
- Upon submission, system:
  - Creates resident account (pending approval)
  - Creates apartment record
  - Identifies relevant project stakeholders (if project known)
  - Sends notification to project admin for approval
  - If no project: flags apartment as "orphan" for stakeholder discovery

**2.3 Approval Waiting Experience**
- Confirmation screen: "Your signup is being reviewed"
- Email/SMS notification sent to resident
- Status page: "Waiting for [Stakeholder Name] to approve"
- Estimated approval time (if available)
- Option to follow up with stakeholder

**2.4 Post-Approval Experience**
- Email/SMS notification when approved
- Automatic login link in notification
- Welcome message with key actions
- Direct access to project updates

**Acceptance Criteria:**
- [ ] Resident can complete signup in under 2 minutes
- [ ] Form is fully functional on mobile devices
- [ ] Stakeholder receives approval request immediately
- [ ] Resident receives clear status updates
- [ ] Approved residents gain immediate project access

---

### 3. Guest-to-User Conversion (REN)

**Requirements:**

**3.1 Contextual Signup Triggers**
- Guest encounters signup prompt when:
  - Attempting to follow a company/stakeholder
  - Applying to a collaboration opportunity
  - Trying to engage with a post (like, comment)
  - Accessing private project updates
  - Submitting a bid (future feature)

**3.2 Context Preservation**
- System captures:
  - Which opportunity/company/project triggered signup
  - User's browsing history (last 5 pages)
  - Intended action (follow, apply, engage)
- After signup, automatically:
  - Returns user to original context
  - Completes intended action (if appropriate)
  - Suggests related actions

**3.3 Stakeholder Signup Form (Guest Origin)**
- Single-page form collecting:
  - Full name
  - Email (required)
  - Password (or offer passwordless)
  - Phone number (optional)
  - Professional role/title
  - Company affiliation:
    - "Create new company" → requires company name
    - "Join existing company" → search & select, requires admin approval
    - "I'm a freelancer" → no company association

**3.4 Progressive Onboarding**
- Don't require all information upfront
- Core signup: Name, email, auth method
- Gradual profiling: Company, role, specialties
- Allow users to skip and complete later
- Gentle prompts to complete profile

**Acceptance Criteria:**
- [ ] Guest can sign up without losing page context
- [ ] Signup completion returns user to intended action
- [ ] Company selection is intuitive and prevents duplicates
- [ ] Users can defer profile completion
- [ ] Conversion rate from guest to active user improves by 50%

---

### 4. Project Collaboration Invites

**Requirements:**

**4.1 Invite Creation (Sender Side)**
- Stakeholder can invite:
  - By email address
  - By phone number (for residents)
  - Bulk invite (multiple recipients)
- Invite specifies:
  - Project name and details
  - Invitee's expected role
  - Inviter's name and company
  - Expiration date (configurable)

**4.2 Invite Delivery**
- Email invitation includes:
  - Clear subject: "[Inviter] invited you to collaborate on [Project]"
  - Project preview (description, location, stakeholders)
  - Prominent "Accept Invite" CTA
  - Invite expiration date
  - Option to decline with reason
- SMS invitation (for residents):
  - Short message with project name
  - Secure link to accept
  - Sender identification

**4.3 Existing User Acceptance**
- Click invite link → Logged in automatically (if session exists)
- Confirmation page: "Join [Project] as [Role]?"
- Single click to accept
- Immediate access to project
- In-app notification confirms acceptance

**4.4 New User Acceptance**
- Click invite link → Lands on signup page with context
- Signup form pre-populated with email (from invite)
- Clear message: "You've been invited to collaborate on [Project]"
- Streamlined signup (context preserved)
- Upon completion:
  - Automatically joined to project
  - Welcome message specific to project
  - Guided tour of project features

**4.5 Invite Management**
- Inviter can:
  - View pending invites
  - Resend invite
  - Cancel invite
  - Set expiration policy
- Invitee can:
  - View pending invites in profile
  - See invite status
  - Accept/decline from profile

**Acceptance Criteria:**
- [ ] Invite includes all necessary context
- [ ] Existing users can accept in one click
- [ ] New users complete signup without confusion
- [ ] Expired invites are handled gracefully
- [ ] Invite acceptance rate increases by 30%

---

### 5. Company/Account Invites

**Requirements:**

**5.1 Company Invite Creation**
- Company admin can invite employees by:
  - Email address
  - Bulk upload (CSV)
- Invite specifies:
  - Company name
  - Role/permissions (if applicable)
  - Inviter's name
  - Welcome message (optional)

**5.2 Existing User Invitation**
- User receives notification (email + in-app)
- Notification includes:
  - Company name and details
  - Who sent the invite
  - What access they'll gain
  - "Accept" and "Decline" options
- Acceptance flow:
  - One-click acceptance
  - User is added as company member
  - Company association visible in profile
  - Access to company projects (if applicable)

**5.3 New User Invitation**
- User receives email invite
- Click invite → Lands on signup with context
- Clear messaging: "Join [Company Name] on GetStatus"
- Streamlined signup process
- Upon completion:
  - Automatically associated with company
  - Welcome message from company/inviter
  - Introduction to company's projects and activity

**5.4 Company Discovery & Join Requests**
- During stakeholder signup, user can:
  - Search for existing companies
  - Request to join if company exists
  - Create new company if not found
- Join request flow:
  - User submits request with message
  - Company admin receives notification
  - Admin approves/rejects with optional message
  - User notified of decision

**Acceptance Criteria:**
- [ ] Company admin can easily invite employees
- [ ] Existing users added to company seamlessly
- [ ] New users understand they're joining a company
- [ ] Join request approval flow is clear for both sides
- [ ] Duplicate company names are prevented

---

### 6. Authentication Methods & Security

**Requirements:**

**6.1 Multi-Method Authentication**
- Email + Password (with strong password requirements)
- Email + Magic Link (passwordless, time-limited)
- Email + OTP (one-time code, time-limited)
- Phone + SMS OTP (for residents primarily)
- Social auth (future consideration: Google, Apple)

**6.2 Email Verification**
- Required for stakeholders upon signup
- Verification email sent immediately
- Temporary access granted with banner: "Please verify your email"
- Resend verification option
- Reminder after 24/48 hours if not verified

**6.3 Phone Number Verification**
- Required for residents upon signup
- SMS OTP sent immediately
- Rate limiting on OTP requests (prevent abuse)
- Support for Israeli phone number formats
- Fallback for international numbers (if needed)

**6.4 Security Features**
- Rate limiting on login attempts
- CAPTCHA after multiple failed attempts
- Session management (timeout, multi-device)
- Secure password reset flow
- Two-factor authentication (future enhancement)

**6.5 Compliance**
- GDPR compliance for data collection
- Israeli privacy law compliance
- Secure storage of credentials (hashed passwords)
- Audit log of authentication events
- User consent for SMS/email communications

**Acceptance Criteria:**
- [ ] All auth methods function reliably
- [ ] Email verification rate >95%
- [ ] Phone verification rate >95%
- [ ] No security vulnerabilities in auth flows
- [ ] Compliance requirements met

---

### 7. Approval & Access Management

**Requirements:**

**7.1 Resident Approval Workflow**
- When resident signs up for existing project:
  - Project admin receives notification
  - Notification includes:
    - Resident name and apartment details
    - Request timestamp
    - Option to approve/reject
  - Admin can:
    - Approve → Resident gains immediate access
    - Reject → Resident notified with reason (optional)
    - Request more info → Message sent to resident

**7.2 Employee Approval Workflow**
- When stakeholder requests to join company:
  - Company admin receives notification
  - Notification includes:
    - Requester name and role
    - Request message (if provided)
    - Profile preview
  - Admin can:
    - Approve → User becomes company member
    - Reject → User notified, can create new company or go freelance
    - Ask for more info

**7.3 Approval Dashboard**
- Admins (project & company) have dashboard showing:
  - Pending approvals
  - Approval history
  - Filtering/sorting options
  - Bulk actions (approve/reject multiple)

**7.4 Waiting State Experience**
- User sees clear status: "Pending approval from [Admin Name]"
- Estimated approval time (if available)
- Option to withdraw request
- Limited access to public features while waiting
- Notifications on status changes

**Acceptance Criteria:**
- [ ] Admins notified of approval requests within 1 minute
- [ ] Approval/rejection processed immediately
- [ ] Users receive clear status updates
- [ ] Waiting state doesn't block basic platform exploration
- [ ] Approval dashboard is intuitive and efficient

---

### 8. Edge Cases & Error Handling

**Requirements:**

**8.1 Duplicate Account Detection**
- System checks for existing accounts by:
  - Email address (for stakeholders)
  - Phone number (for residents)
- If duplicate detected:
  - Redirect to login with message: "Account already exists"
  - Offer password reset if forgotten
  - Allow to proceed with different email/phone

**8.2 Orphan Apartments**
- If resident signs up with no known project:
  - Apartment flagged as "orphan"
  - Resident receives instructions to share link with stakeholder
  - Stakeholder can discover orphan apartments in dashboard
  - Stakeholder can claim/associate apartment with project

**8.3 Invite Link Expiration**
- Invites expire after configurable period (default: 30 days)
- Expired invite link shows:
  - "This invite has expired"
  - Option to request new invite
  - Contact information for inviter
- Inviter notified of expired invites (weekly digest)

**8.4 Company Name Conflicts**
- When creating new company:
  - System checks for exact/similar names
  - If match found: "Company may already exist"
  - Suggests existing companies to join instead
  - Allows to proceed if certain it's different
  - Prevents exact duplicates

**8.5 Account Deletion & Transfer**
- Project admin deletion:
  - Requires admin transfer to another stakeholder first
  - System prompts for successor selection
  - If no successor available, project archived
- Company admin deletion:
  - Similar transfer requirement
- Resident deletion:
  - Apartment marked as vacant
  - Historical data preserved for project records

**8.6 Phone Number Changes**
- Resident can update phone number in settings
- Verification required for new number
- Old number marked as inactive
- Authentication switches to new number

**Acceptance Criteria:**
- [ ] Duplicate detection works 100% of time
- [ ] Orphan apartments are discoverable
- [ ] Expired invites handled gracefully
- [ ] Company duplicates prevented
- [ ] Account deletion doesn't break projects
- [ ] Phone updates work reliably

---

## User Flows

### Flow 1: Resident Signup (No Invite)

```
1. Resident visits GetStatus or REN
2. Clicks "Sign Up"
3. Selects "I'm a Resident"
4. Fills simple form:
   - Name
   - Phone number
   - Email (optional)
   - Apartment details
   - Project (if known)
5. Submits form
6. Receives confirmation: "We're processing your request"
7. Project admin notified
8. Resident waits (can explore public content)
9. Admin approves
10. Resident receives notification
11. Clicks login link
12. Gains full project access
```

### Flow 2: Stakeholder Guest-to-User (REN)

```
1. Stakeholder browses REN as guest
2. Finds interesting opportunity
3. Clicks "Apply" or "Follow"
4. Prompted to sign up
5. Modal/page shows: "Sign up to apply for [Opportunity]"
6. Fills quick form:
   - Name
   - Email
   - Password (or passwordless)
7. Chooses company affiliation:
   - Create new / Join existing / Freelance
8. Submits
9. If joining existing company → admin approval needed
10. If new company/freelance → immediate access
11. Returned to opportunity page
12. Can now apply/follow
```

### Flow 3: Project Collaboration Invite (New User)

```
1. Stakeholder A invites Stakeholder B via email
2. B receives email: "You're invited to collaborate on [Project]"
3. B clicks "Accept Invite"
4. Lands on signup page with project context
5. Sees: "Join GetStatus to collaborate on [Project] with [Stakeholder A]"
6. Fills signup form (pre-populated email)
7. Chooses company affiliation
8. Submits
9. Account created
10. Automatically added to project
11. Sees project dashboard
12. Welcome message guides next steps
```

### Flow 4: Company Invite (Existing User)

```
1. Company admin invites employee via email
2. Employee receives email + in-app notification
3. Notification shows: "Join [Company] on GetStatus"
4. Employee clicks "Accept"
5. Sees confirmation: "Join [Company]?"
6. Clicks "Confirm"
7. Added as company member
8. Profile updated with company association
9. Gains access to company projects
10. Welcome message from company
```

### Flow 5: Differentiated Login

```
RESIDENT PATH:
1. Visits login page
2. Selects "I'm a Resident"
3. Enters phone number
4. Receives SMS with OTP
5. Enters OTP
6. Logged in

STAKEHOLDER PATH:
1. Visits login page
2. Selects "I'm a Professional"
3. Chooses auth method:
   - Email + Password (default)
   - Email + Magic Link
   - Email + OTP
   - Phone + SMS
4. Completes chosen auth
5. Logged in
```

---

## Technical Considerations (High-Level)

### Architecture Components

**Authentication Service:**
- Handle multi-method authentication
- Session management
- Token generation & validation
- Integration with SMS provider (Twilio, etc.)
- Email service integration

**User Management Service:**
- User profile CRUD operations
- Company/project associations
- Permission management
- Approval workflow logic

**Notification Service:**
- Email notifications (invites, approvals, status updates)
- SMS notifications (OTP, approvals)
- In-app notifications
- Notification preferences management

**Invite Management System:**
- Invite creation & tracking
- Link generation (secure, expirable)
- Context preservation
- Invite status management

### Database Schema (Key Entities)

**Users Table:**
- user_id, user_type (stakeholder/resident/representative)
- email, phone, password_hash
- name, role, company_id
- verification_status, created_at, updated_at

**Companies Table:**
- company_id, company_name, admin_user_id
- created_at, updated_at

**Projects Table:**
- project_id, project_name, admin_user_id
- company_id, created_at, updated_at

**Apartments Table:**
- apartment_id, resident_id, project_id
- address, details, status (orphan/approved/pending)
- created_at, updated_at

**Invites Table:**
- invite_id, invite_type (project/company)
- inviter_id, invitee_email/phone
- target_id (project_id or company_id)
- status (pending/accepted/rejected/expired)
- expires_at, created_at, updated_at

**Approvals Table:**
- approval_id, approval_type (resident/employee)
- requester_id, approver_id, target_id
- status (pending/approved/rejected)
- created_at, updated_at

### Third-Party Integrations

**SMS Provider:**
- Twilio or similar for OTP delivery
- Support for Israeli phone numbers
- Rate limiting & cost management

**Email Service:**
- SendGrid, AWS SES, or similar
- Transactional emails (OTP, invites, notifications)
- Marketing emails (welcome, onboarding)
- Deliverability monitoring

**Authentication Libraries:**
- Passport.js, Auth0, or similar
- JWT token management
- Session management
- OAuth support (future)

### Security Requirements

- HTTPS for all authentication endpoints
- Password hashing with bcrypt or similar
- Rate limiting on sensitive endpoints
- CAPTCHA for abuse prevention
- Audit logging of auth events
- Secure session management
- XSS & CSRF protection

### Mobile Considerations

- Responsive design for all flows
- Touch-optimized UI elements
- SMS OTP auto-fill (iOS/Android)
- Deep linking for invite acceptance
- Offline state handling
- Progressive web app capabilities

### Performance Requirements

- Login/signup response time <2 seconds
- OTP delivery within 30 seconds
- Email delivery within 1 minute
- Support for 1000+ concurrent users
- Database query optimization
- Caching strategy for common queries

### Scalability

- Horizontal scaling of auth service
- Database replication for read-heavy operations
- Queue system for notifications (Redis, RabbitMQ)
- CDN for static assets
- Load balancing

---

## Out of Scope

The following items are explicitly out of scope for this version:

1. **Social Authentication:** Google, Apple, Facebook login (future consideration)
2. **Two-Factor Authentication (2FA):** Additional security layer for high-risk accounts
3. **Single Sign-On (SSO):** Enterprise SSO integration (SAML, OAuth)
4. **Biometric Authentication:** Fingerprint, Face ID (mobile app feature)
5. **Account Merging:** Combining duplicate accounts created by error
6. **Granular Permissions:** Role-based access control beyond basic admin/member
7. **Custom Branding:** White-label login pages for enterprise clients
8. **Account Recovery:** Advanced identity verification for locked accounts
9. **Multi-Language Support:** Hebrew, Arabic, English localization (except for essential UI strings)
10. **Analytics Dashboard:** Detailed signup funnel analytics (will use existing analytics tools)

These items may be considered for future iterations based on user feedback and business priorities.

---

## Open Questions

The following questions require resolution before or during implementation:

### Business Questions

1. **Invite Expiration Duration:**
   - What is the default expiration period for invites? (Recommend: 30 days)
   - Should this be configurable per invite type?
   - Should admins be able to set custom expiration?

2. **Approval SLA:**
   - What is the expected approval time for resident requests?
   - Should we escalate if admin doesn't respond within X days?
   - Should we auto-approve after certain period?

3. **Freemium vs. Paid:**
   - Are there any limitations for freelance stakeholders vs. company members?
   - Are there limits on number of projects/invites?
   - Any premium features gated by account type?

4. **Admin Succession:**
   - What is the default succession plan if project admin leaves?
   - Should there be co-admins or deputy admins?
   - What happens if company admin is deleted?

### Technical Questions

1. **SMS Provider:**
   - Which SMS provider to use? (Twilio, MessageBird, local Israeli provider?)
   - What is the monthly SMS budget?
   - How to handle international numbers?

2. **Session Management:**
   - Session timeout duration? (Recommend: 30 days with refresh)
   - Single session or multi-device support?
   - How to handle session conflicts?

3. **Email Deliverability:**
   - Which email service provider?
   - How to handle bounced emails?
   - Retry logic for failed deliveries?

4. **Rate Limiting:**
   - Limits on OTP requests per hour?
   - Limits on signup attempts per IP?
   - Limits on invite sending?

5. **Data Migration:**
   - How to migrate existing users to new auth system?
   - Will passwords need to be reset?
   - How to handle users with incomplete profiles?

### UX Questions

1. **Mobile App:**
   - Is there a native mobile app planned?
   - Should the design prioritize mobile web or native app?

2. **Onboarding:**
   - How much onboarding/tutorial for new users?
   - Should it be different per user type?
   - Skippable or mandatory?

3. **Profile Completion:**
   - What is the minimum required information?
   - When to prompt for additional info?
   - How to incentivize profile completion?

---

## Appendix

### Definitions & Terminology

**Stakeholder:** Professional user (lawyer, builder, contractor, appraiser, supervisor) using GetStatus to manage projects or showcase expertise

**Resident:** Person living in an apartment within an urban renewal project who wants to stay informed about their project

**Representative:** Resident who represents their entire building in the renewal process

**Project:** An urban renewal project managed in the PM platform

**Company/Account:** Business entity that stakeholders can belong to (similar to LinkedIn company)

**Orphan Apartment:** Apartment created by a resident before being associated with any project

**REN:** Real Estate Network - the public-facing platform for showcasing projects and finding opportunities

**PM:** Project Management - the platform for managing urban renewal projects

**OTP:** One-Time Password - temporary code sent via SMS or email for authentication

**Magic Link:** Passwordless authentication via time-limited link sent to email

### Related Documents

- Technical Requirements Document: [TBD]
- UI/UX Design Specifications: [TBD]
- API Specifications: [TBD]
- Test Plan: [TBD]
- Security Audit Report: [TBD]

### References

- Original Requirements Document: `/docs/features/login signup invites/login-requirements.md`
- GetStatus Product Overview: [TBD]
- Competitive Analysis: [TBD]
- User Research Findings: [TBD]

### Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-12-11 | Product Management | Initial draft |

---

## Approval & Sign-Off

This PRD requires approval from the following stakeholders before moving to implementation:

- [ ] Product Management
- [ ] Engineering Lead
- [ ] Design Lead
- [ ] Security/Compliance
- [ ] Customer Success
- [ ] Executive Sponsor

**Next Steps After Approval:**
1. Technical design review with engineering team
2. Create detailed UI/UX mockups
3. Define API contracts
4. Break down into development sprints
5. Establish QA test plan
6. Plan phased rollout strategy
