# Stakeholder-to-Stakeholder Invite Flows

## Overview

This document outlines the product requirements for stakeholder-to-stakeholder invitation flows in the GetStatus platform. These flows enable existing stakeholders to invite other stakeholders to join their company or collaborate on projects.

## Use Cases

1. **Company Owner invites contractor** to join the company
2. **Project Manager invites lawyer** to collaborate on a specific project
3. **Developer invites supervisor** to join a project team

## User Flows

### Flow 1: New User (No Account)

**Entry Point:** User receives email with invite link and clicks it

**URL Format (Demo):** `/invite/demo?scenario=1`

**User Journey:**
1. User lands on invite acceptance page
2. Sees personalized header: "You've Been Invited!"
3. Views invitation details in blue card:
   - Company/Project name
   - Role they're being invited as (defined by inviter)
   - Inviter name and role
4. Completes registration form with:
   - Full Name (required)
   - Email (required)
   - Phone Number (optional)
   - Password (required, min 8 chars with special character)
   - Confirm Password (required, must match)
   - Terms acceptance (required)
5. Submits form
6. Account is created and automatically associated with the company/project
7. Redirected to login or dashboard

**Validation Rules:**
- Email must be valid format
- Password minimum 8 characters
- Password must contain at least one special character
- Passwords must match
- Terms must be accepted
- All required fields must be filled

**Success Criteria:**
- User account created successfully
- User automatically added to company/project
- Both inviter and invitee receive confirmation

### Flow 2: Existing User, Logged In

**Entry Point:** Logged-in user clicks invite link

**URL Format (Demo):** `/invite/demo?scenario=2`

**User Journey:**
1. User lands on invite acceptance page
2. System recognizes user is already authenticated
3. Sees personalized header: "You've Been Invited!"
4. Views invitation details in blue card
5. Sees their current account information displayed
6. Clicks "Accept Invitation" button
7. Immediately added to company/project
8. Redirected to company/project dashboard

**Success Criteria:**
- User association created instantly
- No duplicate account creation
- Smooth redirect to relevant dashboard
- Both parties receive confirmation

### Flow 3: Existing User, Logged Out

**Entry Point:** User with existing account clicks invite link but is not logged in

**URL Format (Demo):** `/invite/demo?scenario=3`

**User Journey:**
1. User lands on invite acceptance page
2. Sees personalized greeting: "Hi [Name]. You've Been Invited!"
3. Views invitation details in blue card
4. Sees info message with icon: "To accept the invite, please sign in with your GetStatus account"
5. Clicks "Sign In to Accept Invitation" button
6. Redirected to stakeholder login page
7. After successful login, invite is automatically accepted
8. Redirected to company/project dashboard

**Alternative Path:**
- User realizes they don't have an account
- Clicks "Create a new account" link
- Proceeds to signup flow

**Success Criteria:**
- Clear communication that sign-in is required
- Seamless redirect to stakeholder login
- Invite context preserved through login flow
- Automatic acceptance after authentication

## Invitation Details

### Mock Data Structure

```javascript
{
  type: 'company',              // or 'project'
  companyName: 'ABC Real Estate Company',
  projectName: 'Ben Yehuda 45 Renewal Project',
  inviterName: 'John Cohen',
  inviterRole: 'Company Owner',
  email: 'invited@example.com',  // Pre-filled or known
  inviteeRole: 'contractor'      // Defined by inviter
}
```

### Key Principles

1. **Role is Inviter-Defined**: The professional role (contractor, lawyer, supervisor) is specified by the inviter, not chosen by the invitee
2. **Minimal Friction**: Collect only essential information during signup
3. **Context Preservation**: Maintain invite context throughout the authentication flow
4. **Personalization**: Greet known users by name when possible
5. **Clear Communication**: Reduce redundancy, use info icons instead of warning cards

## UI Components

### Reused Components
- `AuthLayout` - Consistent layout wrapper
- Lucide icons: `User`, `Mail`, `Lock`, `Eye`, `EyeOff`, `Phone`, `Building`, `CheckCircle`, `Info`

### Invite Information Card
- Light blue background (#F0F7FF)
- Blue border (#BFDBFE)
- Shows:
  - Building/Briefcase icon
  - "Join Company as [role]" or "Join Project as [role]"
  - Company/Project name
  - Inviter name and role

### Form Fields (Scenario 1 Only)
- Full Name (text input)
- Email (email input)
- Phone Number (tel input, optional)
- Password (password input with show/hide toggle)
- Confirm Password (password input with show/hide toggle)
- Terms acceptance (checkbox with links)

### Buttons
- Primary CTA: Blue (#0C6DFA), full-width, rounded
- Secondary actions: Text links in blue

## Technical Specifications

### Routes
- Demo route: `/invite/demo`
- Production route: `/invite/:token` (using InviteSignup component)

### URL Parameters
- `scenario=1`: New user signup flow
- `scenario=2`: Existing user, logged in
- `scenario=3`: Existing user, logged out

### State Management
- Form data state for new user scenario
- Password visibility toggles (password and confirm password)
- Loading states during API calls
- Error state for validation messages

### API Integration
- `signup()` - Create new user account with invite context
- Accept invite endpoint (for logged-in users)
- Validate invite token
- Check for existing user by email

## Edge Cases

### Invalid/Expired Invite
- Show error message
- Provide "Request New Invitation" option
- Link back to login

### User Already Member
- Detect if user is already part of company/project
- Show friendly message
- Redirect to dashboard

### Duplicate Pending Invites
- System should handle multiple invites to same email
- Either block new invite or invalidate old one

### Permission Validation
- Verify inviter has permission to send invite
- Company invites: Only admins/owners
- Project invites: Only project managers

## Design Considerations

### Consistency
- Matches existing login/signup styling
- Uses Noto Sans font family
- Follows established color scheme
- Reuses AuthLayout component

### Accessibility
- Form labels and placeholders
- Error messages clearly displayed
- Keyboard navigation support
- Focus states on interactive elements

### Responsive Design
- Mobile-friendly layouts
- Touch-friendly buttons
- Readable text sizes
- Proper spacing on all devices

## Success Metrics

1. **Invite Acceptance Rate**: % of invites that result in accepted invitations
2. **Time to Accept**: Average time from email received to invite accepted
3. **Completion Rate**: % of users who complete signup after clicking invite
4. **Error Rate**: % of users encountering validation errors
5. **Drop-off Points**: Where users abandon the flow

## Future Enhancements

1. **Invite Expiration**: Auto-expire invites after configurable period
2. **Resend Invite**: Allow inviters to resend expired invites
3. **Batch Invites**: Invite multiple stakeholders at once
4. **Role Selection**: Allow some flexibility in role for certain invite types
5. **Custom Messages**: Let inviters add personal message to invite
6. **Invite Analytics**: Dashboard showing invite status and metrics
7. **Email Preferences**: Let users control invite notification preferences
8. **Mobile App Deep Links**: Open invites directly in mobile app

## Security Considerations

1. **Token Validation**: Verify invite tokens are valid and not expired
2. **Email Verification**: Confirm email ownership before account activation
3. **Rate Limiting**: Prevent invite spam
4. **Permission Checks**: Verify inviter has authority to invite
5. **Audit Trail**: Log all invite-related actions

## Dependencies

- Authentication system (AuthContext)
- Email service for sending invites
- User management system
- Company/Project management system
- Routing system (React Router)

## Component Location

`/frontend/src/components/StakeholderInviteDemo.jsx`

## Related Documentation

- [Login/Signup Screens](./login%20signup%20screens.md)
- [Login Requirements](./login-requirements.md)
- [GetStatus Project Context](../../../CLAUDE.md)
