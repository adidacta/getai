# Login & Signup Screens - Product Requirements Document

## Overview
This document outlines the complete authentication flow for the GetStatus platform, covering login, signup, and invite flows for both Residents and Stakeholders (professionals).

## Table of Contents
1. [User Flows](#user-flows)
2. [Screen Specifications](#screen-specifications)
3. [Backend Requirements](#backend-requirements)
4. [Technical Implementation Details](#technical-implementation-details)

---

## User Flows

### 1. Resident Signup Flow
```
User clicks "Create Account"
→ UserTypeSelection screen
→ Selects "Resident"
→ ResidentSignup Step 1 (Personal Info)
→ ResidentSignup Step 2 (Address + Terms)
→ Success Screen (Full-screen with invite link)
→ User can proceed to Login
```

### 2. Stakeholder Signup Flow
```
User clicks "Create Account"
→ UserTypeSelection screen
→ Selects "Stakeholder"
→ StakeholderSignup Step 1 (Account Info + Password)
→ StakeholderSignup Step 2 (Professional Role)
→ StakeholderSignup Step 3 (Company Details + Terms)
→ Account created, redirect to Login
```

### 3. Resident Login Flow
```
User visits /login or /login/resident
→ LoginSelection (Resident view)
→ Enters phone number
→ Backend sends OTP via SMS
→ User enters OTP
→ Logged in, redirect to dashboard
```

### 4. Stakeholder Login Flow
```
User visits /login/stakeholder
→ LoginSelection (Stakeholder view)
→ Option A: Email/Password login
→ Option B: Phone/OTP login (toggle between methods)
→ Logged in, redirect to dashboard
```

### 5. Invite-Based Signup Flow
```
User clicks invite link (/invite/{token})
→ InviteSignup screen (pre-filled with invite data)
→ User fills in: Name, Email, Phone (if project invite), Password, Terms
→ Account created and linked to project/company
→ Redirect to Login
```

### 6. Password Reset Flow
```
User clicks "Forgot Password" from login
→ ForgotPassword screen
→ Enters email
→ Backend sends reset link via email
→ Success message shown
→ User can return to login
```

---

## Screen Specifications

### 1. LoginSelection Component
**Route:** `/login/:userType?` (supports `/login`, `/login/resident`, `/login/stakeholder`)

#### Layout
- **Left Panel (50% width, hidden on mobile):**
  - Gradient background: `from-blue-900 via-blue-800 to-indigo-900`
  - Title: "Building Trust through Transparency."
  - Subtitle: Track your urban renewal project...
  - Feature list with checkmarks:
    - Real-time Status Updates
    - Secure Document Access
    - Personalized Timeline

- **Right Panel (50% width, 100% on mobile):**
  - Logo at top (centered, fixed position)
  - Form area with max-width container
  - Title aligned left with role switch button on right

#### Resident Login View
**Title:** "Resident Login" (left-aligned)
**Switch Button:** "⇄ Stakeholder" (right-aligned, same line as title)

**Form Fields:**
- Phone number input (required)
  - Icon: Phone
  - Placeholder: "Mobile Phone Number"
  - Auto-complete: `tel`
  - Type: `tel`

**Actions:**
- Primary button: "Continue with OTP" → Triggers OTP send
- Link: "Forgot password?" → Navigate to /forgot-password
- Footer link: "New here? Create account" → Navigate to /signup

#### Stakeholder Login View
**Title:** "Stakeholder Login" (left-aligned)
**Switch Button:** "⇄ Resident" (right-aligned)

**Login Method Toggle:**
- Two tabs: "Email" and "Phone"
- Active tab highlighted with blue background
- Smooth transition between methods

**Email/Password Method Fields:**
- Email input (required)
  - Icon: Mail
  - Auto-complete: `email`
  - Type: `email`
- Password input (required)
  - Icon: Lock
  - Eye icon toggle for show/hide
  - Type: `password`

**Phone/OTP Method Fields:**
- Phone number input (required)
  - Icon: Phone
  - Auto-complete: `tel`

**Actions:**
- Primary button: "Login" (for email/password) or "Continue with OTP" (for phone)
- Link: "Forgot password?" → /forgot-password
- Footer link: "New here? Create account" → /signup

#### UI/UX Requirements
- All titles maintain consistent vertical position (no jumping when switching views)
- `min-h-[400px]` on all form containers
- `leading-none` on all titles for baseline alignment
- Role switch button triggers URL change and view update
- URLs reflect current state: `/login/resident` or `/login/stakeholder`
- Error messages appear below relevant fields in red boxes
- Loading state on submit button (shows spinner, disabled)

---

### 2. UserTypeSelection Component
**Route:** `/signup`

#### Layout
- Same two-panel layout as LoginSelection
- Logo at top center
- Form area centered

#### Content
**Title:** "Create Account" (left-aligned)
**Subtitle:** "What type of user are you?"

**User Type Cards:**
Two large clickable cards with hover effects:

1. **Resident Card:**
   - Icon: Users (gradient blue-cyan)
   - Title: "Resident"
   - Description: "Property owner in an urban renewal project"
   - Gradient: `from-blue-500 to-cyan-500`
   - On click: Navigate to `/signup/resident`

2. **Stakeholder Card:**
   - Icon: Briefcase (gradient indigo-purple)
   - Title: "Stakeholder"
   - Description: "Lawyer, developer, contractor, appraiser, supervisor or consultant"
   - Gradient: `from-indigo-500 to-purple-500`
   - On click: Navigate to `/signup/stakeholder`

**Footer:**
- "Already registered?" with "Sign in to existing account" link → /login

#### UI Requirements
- Cards have hover effects: scale up, show gradient background
- Border changes on hover
- Title left-aligned with `leading-none`
- Container: `min-h-[400px]`

---

### 3. ResidentSignup Component
**Route:** `/signup/resident`

#### Layout
Uses AuthLayout for Steps 1-2, then full-screen layout for Step 3 (success)

#### Header (Steps 1-2)
**Title:** "Join as Resident" (left-aligned)
**Switch Button:** "⇄ Stakeholder" (right-aligned) → Navigate to `/signup/stakeholder`
**Subtitle:** "Fill in your details and we'll start tracking your project"

#### Progress Indicator
- Two-step progress bar (horizontal)
- Shows "Step X of 2"
- Active step highlighted in blue, completed in light blue, pending in gray

---

#### Step 1: Personal Information

**Fields:**
1. **Full Name** (required)
   - Icon: User
   - Placeholder: "Full Name"
   - Auto-complete: `name`
   - Validation: Cannot be empty

2. **Mobile Phone Number** (required)
   - Icon: Phone
   - Placeholder: "Mobile Phone Number"
   - Auto-complete: `tel`
   - Type: `tel`
   - Validation: Min 9 digits

3. **Email** (optional)
   - Icon: Mail
   - Placeholder: "Email (Optional)"
   - Auto-complete: `email`
   - Type: `email`
   - Validation: Valid email format if provided

4. **Building Representative Checkbox**
   - Label: "I am the building representative"
   - Default: unchecked

**Navigation:**
- "Next" button → Validates Step 1, proceeds to Step 2
- "Already registered? Login" link → /login/resident

---

#### Step 2: Apartment Details

**Fields (in this order):**
1. **City** (required)
   - Icon: MapPin
   - Placeholder: "City"
   - Auto-complete: `address-level2`
   - Validation: Cannot be empty

2. **Street** (required)
   - Icon: Home
   - Placeholder: "Street"
   - Auto-complete: `address-line1`
   - Validation: Cannot be empty

3. **Building Number** (required)
   - Icon: Building2
   - Placeholder: "Building Number"
   - Auto-complete: `address-line2`
   - Validation: Cannot be empty

4. **Apartment Number** (optional)
   - Icon: Home
   - Placeholder: "Apartment Number (Optional)"
   - Auto-complete: `address-line3`

5. **Terms and Conditions Checkbox** (required)
   - Label: "I agree to the [Terms of Use] and [Privacy Policy]"
   - Links open in new tab
   - Validation: Must be checked to proceed

**Navigation:**
- "Back" button → Returns to Step 1
- "Complete Registration" button → Submits form, shows loading state
- "Already registered? Login" link → /login/resident

---

#### Step 3: Success Screen (Full-Screen Layout)

**Layout:**
- Full white background
- Logo centered at top (reduced spacing below)
- Content starts higher on page (not vertically centered)

**Header:**
- Title: "You're All Set, {user.name}!" (4xl, bold)
- Subtitle: "Follow these steps to get started with GetStatus" (lg, gray)

**Three Step Cards (centered):**
Cards displayed in 3-column grid, max-width 900px, gap between cards

**Card 1: Share This Link** (Blue theme)
- Number badge: "1" (blue circle, white text)
- Title: "Share This Link" (lg, bold)
- Invite link display:
  - White box with border
  - Monospace font, small text
  - Shows full URL: `https://getstatus.co.il/join/{uniqueToken}`
  - Break-all for long URLs
- "Copy Link" button (blue, full-width)
  - Icon: Copy (changes to Check when copied)
  - Text changes to "Copied!" for 2 seconds after click
- Description: "Send to your lawyer and builder to receive project updates" (xs, gray)

**Card 2: Download the App** (Green theme)
- Number badge: "2" (green circle, white text)
- Title: "Download the App" (lg, bold)
- App Store badges (vertical stack):
  - Apple App Store badge (height: 44px)
  - Google Play Store badge (height: 44px)
  - Both with hover opacity effect
- Description: "Track your project on mobile or web" (xs, gray)

**Card 3: Login Anytime** (Indigo theme)
- Number badge: "3" (indigo circle, white text)
- Title: "Login Anytime" (lg, bold)
- Phone number display box:
  - White box with border
  - Phone icon + user's phone number
  - Label: "Your login phone number"
- Description: "We'll text you a verification code each time you log in" (xs, gray)

**Card Specifications:**
- Height: 420px (min-height, consistent across all)
- Padding: 24px
- Border: 2px solid (matching theme color)
- Border radius: 16px (rounded-2xl)
- Background: Light tint (blue-50, green-50, indigo-50)
- Flexbox layout (vertical) with flex-grow for proper spacing

**Login Button:**
- Positioned absolutely to the right of cards (bottom-aligned)
- Text: "Go to Login"
- Gradient: `from-blue-600 to-indigo-600`
- Large size: py-4, px-8, text-lg
- Shadow with hover effect
- On click: Navigate to `/login/resident`

**Layout Details:**
- Cards are centered on page (not affected by button position)
- Button positioned absolutely (doesn't push cards from center)
- Logo spacing reduced by 50% from content
- Content positioned higher on page (items-start with pt-8)

---

### 4. StakeholderSignup Component
**Route:** `/signup/stakeholder`

#### Layout
Uses AuthLayout throughout all steps

#### Header
**Title:** "Join as Stakeholder" (left-aligned)
**Switch Button:** "⇄ Resident" (right-aligned) → Navigate to `/signup/resident`
**Subtitle:** "Create a professional profile and advance projects with full transparency"

#### Progress Indicator
- Three-step progress bar
- Shows "Step X of 3"
- Indigo color scheme

---

#### Step 1: Account Information

**Fields:**
1. **Full Name** (required)
   - Icon: User
   - Auto-complete: `name`
   - Validation: Cannot be empty

2. **Email** (required)
   - Icon: Mail
   - Auto-complete: `email`
   - Validation: Valid email format

3. **Password** (required)
   - Icon: Lock
   - Eye toggle for show/hide
   - Type: `password`
   - Hint below field: "Minimum 8 characters, including at least one special character"
   - Validation:
     - Min 8 characters
     - Must contain at least one special character: `!@#$%^&*(),.?":{}|<>`

4. **Confirm Password** (required)
   - Icon: Lock
   - Eye toggle for show/hide
   - Validation: Must match password

**Navigation:**
- "Next" button → Validates Step 1, proceeds to Step 2
- "Already registered? Login" link → /login/stakeholder

---

#### Step 2: Professional Role

**Title:** "Professional Role"
**Subtitle:** "What is your professional role?"

**Role Selection Grid (2 columns):**
Each role is a clickable card with icon and label:

1. Lawyer (Scale icon)
2. Builder / Developer (Building2 icon)
3. Contractor (HardHat icon)
4. Technical Supervisor (ClipboardCheck icon)
5. Appraiser (Calculator icon)
6. Consultant (Lightbulb icon)
7. Architect (Ruler icon)
8. Other (MoreHorizontal icon)

**Card States:**
- Default: Gray border, white background
- Selected: Indigo border, indigo-50 background
- Hover: Indigo-300 border
- Only one can be selected at a time

**Navigation:**
- "Back" button → Returns to Step 1
- "Next" button → Validates selection, proceeds to Step 3

---

#### Step 3: Company Details

**Title:** "Company Details"
**Subtitle:** "Are you working with a company or as a freelancer?"

**Company Type Selection:**
Three large option cards (single column):

1. **Create New Company**
   - Icon: Building
   - Title: "Create New Company"
   - Description: "I represent a new company"
   - When selected: Shows text input for "Company Name"

2. **Join Existing Company**
   - Icon: Briefcase
   - Title: "Join Existing Company"
   - Description: "Employee at registered company"
   - When selected: Shows text input for "Company Name or Code"
   - Helper text: "Joining a company requires approval from the company manager"

3. **Freelancer**
   - Icon: User
   - Title: "Freelancer"
   - Description: "Independent without a company"
   - No additional input required

**Terms and Conditions Checkbox** (required)
- Label: "I agree to the [Terms of Use] and [Privacy Policy]"
- Links open in new tab
- Positioned after company selection
- Validation: Must be checked to proceed

**Navigation:**
- "Back" button → Returns to Step 2
- "Complete Registration" button → Submits form (shows loading state)
- "Already registered? Login" link → /login/stakeholder

---

### 5. InviteSignup Component
**Route:** `/invite/:token`

#### Loading States
1. **Loading Screen:** Shows spinner while fetching invite data
2. **Invalid Invite Screen:** Shows error if token is expired/invalid with "Back to Login" button
3. **Main Form:** Shows when invite is valid

#### Layout
Uses AuthLayout

#### Header
**Title:** "You've Been Invited!" (left-aligned, no switch button)
**Subtitle:** "{inviterName} invites you to {companyName/projectName}"

#### Invite Info Card
Blue-bordered card showing:
- Icon: Building (company) or Briefcase (project)
- Heading: "Join Company" or "Join Project"
- Name of company/project
- "Invited by: {inviterName} ({inviterRole})"

---

#### Form Fields

**Title:** "Complete Registration"

**Fields:**
1. **Full Name** (required)
   - Icon: User
   - Auto-complete: `name`

2. **Email** (required or pre-filled)
   - Icon: Mail
   - Auto-complete: `email`
   - May be pre-filled and disabled if invite includes email

3. **Phone Number** (required for project invites only)
   - Icon: Phone
   - Auto-complete: `tel`
   - Only shown for project-type invites

4. **Password** (required)
   - Icon: Lock
   - Eye toggle
   - Hint: "Minimum 8 characters, including at least one special character"
   - Validation: 8+ chars, 1+ special character

5. **Terms Checkbox** (required)
   - Label: "I agree to the [Terms of Use] and [Privacy Policy]"

**Navigation:**
- "Accept Invitation and Sign Up" button (blue, with CheckCircle icon)
- "Already registered? Login" link → /login

---

### 6. ForgotPassword Component
**Route:** `/forgot-password`

#### Layout
Uses AuthLayout

#### Header
**Back Button:** Arrow icon (top-left) → Returns to /login
**Title:** "Forgot Password?" (centered)
**Subtitle:** "Enter your email address and we'll send you a link to reset your password"

#### Initial State - Form

**Field:**
- Email Address (required)
  - Icon: Mail
  - Placeholder: "your@email.com"
  - Type: `email`
  - Validation: Valid email format

**Actions:**
- "Send Reset Link" button → Submits email, shows loading state

#### Success State

Replaces form with success message:
- Green checkmark icon (large)
- Title: "Link Sent!"
- Message: "We've sent a password reset link to: {email}"
- Helper text: "Check your inbox and click the link to reset your password"
- "Back to Login" button → Navigate to /login

#### UI Requirements
- Container: `min-h-[400px]`
- Title: left-aligned with back button on same line
- Back button aligned with form fields (not centered)

---

### 7. ApprovalWaiting Component
**Route:** `/approval-waiting`

**Purpose:** Shown when resident signup requires project manager approval

#### Layout
Full custom layout (no AuthLayout)

**Left Panel (Blue gradient):**
- Network visualization graphics (SVG)
- Title: "בקשתך נשלחה" (Your request has been sent - Hebrew)
- Message about approval process

**Right Panel (White card):**
- Logo at top
- Yellow clock icon (large)
- Title: "ממתינים לאישור" (Waiting for Approval - Hebrew)
- Description of approval process
- User details card (if provided):
  - Name, Phone, Email with icons
- Info card explaining next steps
- Actions:
  - "חזור לדף הכניסה" (Return to Login) button
  - "יש לך שאלות? צור קשר" (Contact Support) button

**Note:** This component uses Hebrew text and RTL direction for Israeli market.

---

### 8. AuthLayout Component

**Purpose:** Shared layout wrapper for all authentication screens

#### Structure

**Left Panel (50% width, hidden on mobile):**
- Full height gradient background
- Decorative circles (blur effects)
- Centered content:
  - Title: "Building Trust through Transparency."
  - Subtitle about tracking urban renewal projects
  - Three feature checkmarks
- Z-index layering for depth

**Right Panel (50% width, 100% on mobile):**
- White background
- Logo at top (absolute position, centered horizontally)
- Form container with max-width: 448px
- Top padding: 128px (pt-32) to account for fixed logo
- Child content passed through `{children}` prop

#### Responsive Behavior
- Desktop (lg+): Two-panel layout (50/50 split)
- Mobile: Single column, white background only, no left panel

---

## Backend Requirements

### Authentication & Authorization

#### Resident Signup
1. **Endpoint:** Create new resident account
   - **Input:** Name, phone, email (optional), apartment address, isRepresentative flag
   - **Process:**
     - Validate phone number is unique
     - Create user account with resident role
     - Generate unique invite token for this resident
     - Store apartment address data
     - Return invite link URL with token
   - **Output:** Success response with generated invite link

2. **Invite Link Generation**
   - Generate cryptographically secure unique token
   - Token should be URL-safe
   - Store mapping: token → resident user ID
   - Token should not expire (or have very long expiration)
   - URL format: `https://getstatus.co.il/join/{token}`

#### Stakeholder Signup
1. **Endpoint:** Create new stakeholder account
   - **Input:** Name, email, password, role, company details (type + name/id)
   - **Process:**
     - Validate email is unique
     - Hash password securely
     - Validate password requirements (8+ chars, 1+ special char)
     - Create user account with stakeholder role
     - Store professional role
     - Handle company association:
       - If "create": Create new company with user as admin
       - If "join": Create pending approval request to company admin
       - If "freelance": No company association
   - **Output:** Success response

#### Invite-Based Signup
1. **Endpoint:** Validate invite token
   - **Input:** Token from URL
   - **Process:** Look up invite details
   - **Output:** Invite metadata (type, company/project name, inviter info, pre-filled email if available)

2. **Endpoint:** Complete invite-based signup
   - **Input:** Name, email, phone, password, token
   - **Process:**
     - Validate token is still valid
     - Create user account
     - Link user to project/company based on invite
     - Mark invite as used
   - **Output:** Success response

#### Login - Resident (OTP)
1. **Endpoint:** Request OTP
   - **Input:** Phone number
   - **Process:**
     - Verify phone exists in system
     - Generate 6-digit OTP code
     - Send SMS with OTP
     - Store OTP with expiration (5-10 minutes)
   - **Output:** Success message

2. **Endpoint:** Verify OTP
   - **Input:** Phone number, OTP code
   - **Process:**
     - Validate OTP matches and hasn't expired
     - Create session/JWT token
     - Invalidate used OTP
   - **Output:** Authentication token, user data

#### Login - Stakeholder (Email/Password)
1. **Endpoint:** Email/password login
   - **Input:** Email, password
   - **Process:**
     - Look up user by email
     - Verify password hash matches
     - Create session/JWT token
   - **Output:** Authentication token, user data

#### Login - Stakeholder (OTP)
- Same as Resident OTP flow but for stakeholder users

#### Password Reset
1. **Endpoint:** Request password reset
   - **Input:** Email address
   - **Process:**
     - Look up user by email
     - Generate secure reset token
     - Send email with reset link
     - Store token with expiration (1 hour)
   - **Output:** Success message (always return success even if email not found - security)

2. **Endpoint:** Reset password (not in current UI, but implied)
   - **Input:** Reset token, new password
   - **Process:**
     - Validate token and expiration
     - Validate password requirements
     - Hash new password
     - Update user password
     - Invalidate reset token
   - **Output:** Success message

### Data Models (Simplified)

#### User
- id
- name
- email (unique, nullable for residents)
- phone (unique for residents, nullable for stakeholders)
- password_hash (nullable for residents using only OTP)
- user_type (resident | stakeholder)
- is_representative (boolean, for residents)
- professional_role (for stakeholders)
- company_id (nullable, for stakeholders)
- created_at
- updated_at

#### Apartment
- id
- user_id (resident)
- city
- street
- building_number
- apartment_number (nullable)
- created_at

#### InviteToken
- id
- token (unique)
- created_by_user_id (resident who received it during signup)
- type (always 'resident_stakeholder' for these invites)
- used (boolean)
- used_by_user_id (nullable)
- created_at
- expires_at (nullable or very long expiration)

#### Company
- id
- name
- created_by_user_id
- created_at

#### OTPCode
- id
- phone_number
- code (6 digits)
- expires_at
- used (boolean)
- created_at

---

## Technical Implementation Details

### Frontend Architecture

#### Routing
- Uses React Router v6
- URL-based state management for login type
- Routes:
  - `/` → Redirects to `/login`
  - `/login/:userType?` → LoginSelection
  - `/signup` → UserTypeSelection
  - `/signup/resident` → ResidentSignup
  - `/signup/stakeholder` → StakeholderSignup
  - `/invite/:token` → InviteSignup
  - `/forgot-password` → ForgotPassword
  - `/verify-otp` → OTPVerification (not detailed in this PRD)
  - `/approval-waiting` → ApprovalWaiting
  - `*` → Redirects to `/login`

#### State Management
- React Context API via AuthContext
- Manages: user authentication state, login/signup methods
- Methods exposed:
  - `login(credentials)`
  - `signup(userData)`
  - `requestPasswordReset(email)`
  - `isAuthenticated`

#### Form Validation
- Client-side validation before submission
- Real-time error display below fields
- Required field validation
- Email format validation
- Phone number length validation (min 9 digits)
- Password strength validation (8+ chars, 1+ special)
- Password match validation
- Terms acceptance validation

#### Browser Features
- Autocomplete support on all inputs
- Proper input types (`email`, `tel`, `password`)
- Password visibility toggle
- Clipboard API for copy functionality
- Local state management for multi-step forms

#### UI/UX Patterns
- Consistent left-aligned titles across all auth screens
- Fixed minimum heights prevent layout shifts
- Leading-none on titles for perfect baseline alignment
- Role switching with URL updates
- Progress indicators for multi-step forms
- Loading states on async actions
- Error states with clear messaging
- Success states with clear next steps

#### Styling
- Tailwind CSS utility classes
- Noto Sans font family
- Consistent color palette:
  - Blue shades for primary actions and resident theme
  - Indigo shades for stakeholder theme
  - Green for success states
  - Red for error states
  - Gray for neutral elements
- Gradient backgrounds for visual interest
- Shadow effects for depth
- Smooth transitions and hover effects

#### Responsive Design
- Mobile-first approach
- Two-panel layout collapses to single column on mobile
- Logo stays fixed at top on all screen sizes
- Cards stack vertically on mobile
- Touch-friendly tap targets (min 44px)

---

## Accessibility Considerations

### ARIA Labels
- All interactive elements have descriptive labels
- Icon-only buttons have `aria-label` attributes
- Form fields associated with labels
- Error messages associated with fields via aria-describedby

### Keyboard Navigation
- All interactive elements accessible via keyboard
- Tab order follows visual flow
- Enter key submits forms
- Escape key can close modals (if added)

### Visual Accessibility
- Sufficient color contrast ratios
- Focus indicators on all interactive elements
- Error states use color + text (not just color)
- Icon + text for important actions

### Screen Readers
- Semantic HTML structure
- Proper heading hierarchy
- Form field labels
- Error announcements
- Loading state announcements

---

## Security Considerations

### Password Security
- Minimum 8 characters required
- Special character requirement
- Password strength validation client-side
- Passwords never logged or exposed
- Password reset via email only (secure tokens)

### OTP Security
- OTP codes expire after 5-10 minutes
- One-time use only
- Rate limiting on OTP requests (backend)
- SMS delivery confirmation

### Token Security
- Invite tokens cryptographically secure
- Reset tokens expire quickly (1 hour)
- Tokens invalidated after use
- No sensitive data in tokens

### API Security
- HTTPS only
- Authentication tokens (JWT or session)
- CSRF protection
- Rate limiting on auth endpoints
- Input validation and sanitization

---

## Error Handling

### Client-Side Errors
- Network errors: "Unable to connect. Please check your connection."
- Validation errors: Field-specific messages
- Form errors: Display in red box above form
- Empty field: "This field is required"

### Server-Side Errors
- Invalid credentials: "Invalid email or password"
- User exists: "An account with this email already exists"
- Invalid OTP: "Invalid or expired code"
- Invalid token: "This invitation link is invalid or has expired"
- Server error: "An error occurred. Please try again."

### Loading States
- Button shows spinner + disabled state
- "Submitting..." text during submission
- "Loading..." for data fetches

---

## Future Enhancements

### Potential Additions
1. Social login (Google, Apple, Microsoft)
2. Remember me functionality
3. Biometric authentication for mobile
4. Password strength meter
5. Email verification before full access
6. Two-factor authentication
7. Session management (view active sessions)
8. Account recovery via SMS
9. Resend OTP functionality with cooldown
10. Progress save (draft signup)

### Analytics Tracking
- Track signup completion rate by step
- Track login method preferences
- Track invite link usage
- Track password reset requests
- Track error frequency by type

---

## Appendix

### Color Palette

**Primary Colors:**
- Blue: `#0C6DFA`, `#4776E6`
- Indigo: `#4F46E5`, `#6366F1`

**Semantic Colors:**
- Success: Green-600 (`#059669`)
- Error: Red-700 (`#B91C1C`)
- Warning: Yellow-600 (`#D97706`)
- Info: Blue-600 (`#2563EB`)

**Neutral Colors:**
- Gray-900 (text): `rgba(0, 0, 0, 0.87)`
- Gray-700: `#374151`
- Gray-600: `#4B5563`
- Gray-500: `#6B7280`
- Gray-200: `#E5E7EB`
- Gray-100: `#F3F4F6`
- Gray-50: `#F9FAFB`

### Typography

**Font Family:** "Noto Sans", sans-serif

**Sizes:**
- 4xl: 36px (main success titles)
- 3xl: 30px (page titles)
- 2xl: 24px
- xl: 20px (section titles)
- lg: 18px (card titles)
- base: 16px
- sm: 14px
- xs: 12px (helper text, descriptions)

### Icon Library
Lucide React - lightweight, consistent icon set

**Common Icons:**
- User, Mail, Phone, Lock
- Home, Building, Building2, MapPin
- ArrowLeft, ArrowRight, ArrowLeftRight
- Check, CheckCircle, Copy
- Eye, EyeOff
- Clock, Smartphone

### External Links

**App Store Links:**
- Apple: `https://apps.apple.com/app/getstatus`
- Google: `https://play.google.com/store/apps/details?id=com.getstatus`

**Legal Pages:**
- Terms of Use: `/terms`
- Privacy Policy: `/privacy`

---

## Document Version
- **Version:** 1.0
- **Last Updated:** December 2024
- **Author:** Product Team
- **Status:** Implementation Complete
