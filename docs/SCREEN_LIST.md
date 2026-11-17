# SecureChat — Complete Screen Catalog (Phase 1)

This catalog details all 15 screens implemented in SecureChat Phase 1, outlining their UI elements, interactions, mock data bindings, and future integration touchpoints.

---

## 1. Authentication & Onboarding Flow

### 1. Splash Screen (`SplashScreen.tsx`)
- **Route**: `Splash`
- **Purpose**: App startup branding and initialization check.
- **Key UI Elements**:
  - SecureChat emblem with illuminated shield icon
  - Typography title and security tagline: *"Private conversations. Protected by design."*
  - End-to-end encrypted architecture badge
  - Animated activity indicator
- **Behavior**: Checks authentication session via `useAuth()`. Transitions to `Main` if logged in, or `Auth` -> `Welcome` if logged out.

### 2. Welcome Screen (`WelcomeScreen.tsx`)
- **Route**: `Auth` -> `Welcome`
- **Purpose**: Privacy-first onboarding introducing security pillars.
- **Key UI Elements**:
  - SecureChat badge & headline
  - Three security cards:
    - *Zero-Knowledge End-to-End Encryption*
    - *Cryptographic Identity Verification*
    - *Forward & Future Secrecy*
  - "Create Account" primary button
  - "Log In" secondary outline button
- **Behavior**: Navigates to `Register` or `Login`.

### 3. Login Screen (`LoginScreen.tsx`)
- **Route**: `Auth` -> `Login`
- **Purpose**: Vault authentication with client-side credential validation.
- **Key UI Elements**:
  - Back navigation header
  - Email/Username text input with user icon
  - Password input with Eye/EyeOff toggle
  - "Remember this device" checkbox
  - "Forgot password?" action (with feedback toast)
  - "Log In" button with loading spinner
  - "Use Demo Account (Alex Mercer)" quick filler button for instant evaluation
  - Register prompt link
- **Behavior**: Calls `useAuth().login()` via `LoginUseCase` and `MockAuthRepository`. Displays errors for empty or invalid inputs.

### 4. Register Screen (`RegisterScreen.tsx`)
- **Route**: `Auth` -> `Register`
- **Purpose**: Account registration with dynamic password strength evaluation.
- **Key UI Elements**:
  - Full Name, Username, and Email inputs
  - Master Password input with 3-tier strength meter (Weak / Medium / Strong)
  - Confirm Password input
  - Security terms and zero-knowledge disclaimer
  - "Create Encrypted Account" button
- **Behavior**: Validates field requirements and password matching. Generates a new mock user session and navigates to `Main`.

---

## 2. Main Dashboard & Chat Flow

### 5. Home Dashboard (`HomeScreen.tsx`)
- **Route**: `Main` -> `HomeTab`
- **Purpose**: Central hub providing security telemetry and quick access to recent chats.
- **Key UI Elements**:
  - Header: User avatar with verified ring, name, search button, and security shortcut
  - Security Score Banner: "Vault Protected", score badge (92% Secure), algorithm summary
  - Quick action cards: "New Chat", "Verify Code", "Devices"
  - "Recent Conversations" section header with "See All" action
  - Conversation feed using `ChatListItem`
  - Floating Action Button (+) for instant conversation initiation
  - Pull-to-refresh
- **Behavior**: Tapping a conversation opens `ChatConversation`. Tapping Quick Actions opens their respective screens.

### 6. Search Screen (`SearchScreen.tsx`)
- **Route**: `Search`
- **Purpose**: Unified search across local encrypted chats, contacts, and messages.
- **Key UI Elements**:
  - SearchBar with clear button and debounced filtering
  - Filter chips: "All", "Chats", "Contacts"
  - Recent searches cloud when query is empty
  - Result list categorized into Conversations and Contacts with badges
  - Empty state when no matches are found
- **Behavior**: Searching filters mock conversations and contacts in real time. Tapping any result opens the corresponding conversation.

### 7. Chat List Screen (`ChatListScreen.tsx`)
- **Route**: `Main` -> `ChatsTab`
- **Purpose**: Complete list of all active encrypted conversations.
- **Key UI Elements**:
  - AppHeader with thread counter and Search / New Chat buttons
  - Chat list items featuring participant avatar, verified shield badge, last message preview, timestamp, status checks, and unread badge
  - Pinned conversation priority sorting
  - Pull-to-refresh control
  - Empty and loading states
  - Floating Action Button (+)
- **Behavior**: Selecting a thread opens `ChatConversation` and clears unread badges.

### 8. Chat Conversation Screen (`ChatConversationScreen.tsx`)
- **Route**: `ChatConversation`
- **Purpose**: Core messaging interface supporting end-to-end encrypted dialogues.
- **Key UI Elements**:
  - Header with participant avatar, online status, lock security icon, and verified badge
  - Message feed with distinct outgoing (cobalt) and incoming (slate) bubbles
  - Message status icons: Sending (clock), Sent (check), Delivered (double check), Read (blue double check)
  - Security notice system bubbles: "Messages and calls are end-to-end encrypted."
  - Reply preview bar when replying to a message
  - Attachment button with Phase 2 notification
  - Send button with active state detection
  - Message Action Bottom Sheet on long press: Copy, Reply, Security Details, Delete
  - "Conversation Security" Bottom Sheet: Displays encryption protocol details, contact fingerprint, and "Verify Safety Number & QR" navigation
  - Delete message confirmation modal
- **Behavior**: Appends outgoing messages to state with realistic timestamps and status transitions.

### 9. New Chat Screen (`NewChatScreen.tsx`)
- **Route**: `NewChat`
- **Purpose**: Contact picker to start an encrypted conversation.
- **Key UI Elements**:
  - Header with back button
  - SearchBar for contacts
  - Contact list items with verification tags
  - Empty state for unmatched queries
- **Behavior**: Selecting a contact creates or resumes a conversation and transitions to `ChatConversation`.

---

## 3. Contacts & Verification

### 10. Contacts Screen (`ContactsScreen.tsx`)
- **Route**: `Main` -> `ContactsTab`
- **Purpose**: Address book of trusted cryptographic contacts.
- **Key UI Elements**:
  - Header with trusted contact count and "Add Contact" button
  - SearchBar
  - Contact items showing status message, online badge, and public key fingerprint snippet
  - "Add Contact" modal dialog with validation
  - Empty state
- **Behavior**: Adding a username/email adds the contact to the local store and alphabetizes the list.

### 11. Contact Verification Screen (`ContactVerificationScreen.tsx`)
- **Route**: `ContactVerification`
- **Purpose**: Safety number and QR code comparison to prevent MITM attacks.
- **Key UI Elements**:
  - Contact card with verification badge
  - High-contrast QR code placeholder area
  - 12-block numeric safety number with copy action
  - "Mark as Verified" button with loading indicator
  - "Scan Contact QR Code" button
- **Behavior**: Tapping "Mark as Verified" updates the contact's verification status in Redux and mock repository, immediately reflecting across all conversation badges and avatars.

---

## 4. Security Center & Device Management

### 12. Security Center Screen (`SecurityCenterScreen.tsx`)
- **Route**: `Main` -> `SecurityTab`
- **Purpose**: Cryptographic vault dashboard and security health audit.
- **Key UI Elements**:
  - Overall security score card (92% Valid)
  - Master public key fingerprint (X25519) card with copy action
  - "Rotate Identity Keypair" action card
  - Protocol cards: AES-256-GCM and Double Ratchet v3.4
  - "Active Device Sessions" summary card
  - "Recent Security Activity" audit log with severity indicators (Verification, Key rotation, New session)
  - Key rotation confirmation dialog
- **Behavior**: Rotating keys updates the fingerprint, logs an activity event, and notifies the user via Toast.

### 13. Devices Screen (`DevicesScreen.tsx`)
- **Route**: `Devices`
- **Purpose**: Management of authorized devices and remote session termination.
- **Key UI Elements**:
  - "This Device" section displaying Pixel 8 Pro with OS version, IP, location, and key fingerprint
  - "Other Authorized Devices" section displaying linked Chrome/Windows and MacBook Pro sessions
  - Session Revoke button
  - Revoke Confirmation dialog
  - Empty state when all remote sessions are revoked
- **Behavior**: Revoking a session removes the device and displays confirmation feedback.

---

## 5. Profile & Settings

### 14. Profile Screen (`ProfileScreen.tsx`)
- **Route**: `Main` -> `ProfileTab`
- **Purpose**: User account overview and vault settings shortcuts.
- **Key UI Elements**:
  - Profile header with avatar, full name, username, email, and "Identity Verified" badge
  - Vault shortcuts: Security Center, Authorized Devices, Privacy & Data
  - Application settings: Appearance (Dark/Light toggle), About
  - "Sign Out & Lock Vault" button with confirmation dialog
- **Behavior**: Signing out clears session state and navigates back to `Auth` -> `Login`.

### 15. Settings Screen (`SettingsScreen.tsx`)
- **Route**: `Settings`
- **Purpose**: Granular configuration of appearance, privacy, and security switches.
- **Key UI Elements**:
  - Appearance tabs: LIGHT, DARK, SYSTEM
  - Notification switches: Message Notifications, Security Alerts
  - Privacy switches: Read Receipts, Online Status
  - Vault security switches: Screen Security (prevent screenshots), Incognito Keyboard
  - About card with version and architecture details
- **Behavior**: Toggling switches updates Redux settings state immediately. Toggling appearance applies the theme dynamically.
