# GetStatus Chatbot Overview

## Introduction

The GetStatus chatbot is an AI-powered assistant integrated into the platform to help users interact with the system more naturally and efficiently. The chatbot provides different functionality based on user type and authentication status.

## Chatbot Variants

### 1. REN Public Chatbot (Guest & Resident)

**Location:** Real Estate Network (REN) platform

**Target Users:**
- Guests (not logged in)
- Logged-in residents

**Features:**

#### For Guests:
- **Educational Support:** Learn about urban renewal processes in Israel
- **Stakeholder Discovery:** Explore the stakeholders directory
- **Transparency Search:** Find relevant stakeholders who work in transparency
- **General Q&A:** Answer questions about urban renewal, the platform, and how to get started

#### For Logged-in Residents:
- All guest features above, plus:
- **Project Status Queries:** Get information about their own project status
- **Personalized Updates:** Access project-specific information
- **Document Navigation:** Help find relevant project documents

**Purpose:**
- Drive engagement on the REN platform
- Educate users about urban renewal
- Showcase stakeholders in the network
- Provide easy access to project information

### 2. Private Stakeholder Chatbot

**Location:** GetStatus Project Management (PM) Platform / Stakeholder Portal

**Target Users:**
- Logged-in stakeholders (builders, lawyers, supervisors, entrepreneurs, appraisers)
- Company employees and freelancers

**Features:**

The Private Stakeholder Chatbot enables stakeholders to perform key project management actions through natural conversation:

1. **Send Updates to Residents:** Create and schedule updates via email, SMS, or WhatsApp
2. **Task Management:** Create and assign tasks with priorities and due dates
3. **Signature Status Tracking:** Query signature progress for projects
4. **Status Updates:** Update project main status and sub-statuses/milestones

**Purpose:**
- Streamline project management workflows
- Provide quick access to project data
- Enable actions without navigating through the web interface
- Improve efficiency for busy stakeholders

**Key Requirements:**
- User must be logged in
- All actions require explicit confirmation
- Permission checks before every action
- API-driven with proper access control

## Technical Architecture

**Shared Components:**
- Natural language understanding (NLU) for intent recognition
- Context management for multi-turn conversations
- Integration with GetStatus API
- User authentication and session management

**Security & Privacy:**
- Authentication required for private features
- Permission-based access control
- Data isolation per project/company
- Audit logging for all actions

## Future Enhancements

- Voice interface support
- File upload handling in chat
- Advanced analytics queries
- Predictive suggestions based on user behavior
- Multi-language support
- Mobile app integration
