# SecureChat — Mobile Application

> **Current Phase: UI/UX Implementation + Clean Architecture Foundation**

SecureChat is a modern, high-security, end-to-end encrypted mobile communication platform built with React Native and Clean Architecture. Designed as an MSc-level project, SecureChat couples rigorous security usability principles (inspired by Signal and privacy-first messaging systems) with an extensible architecture ready for real-time SignalR and .NET API integration in Phase 2.

---

## 1. Project Overview

SecureChat demonstrates that cryptographic communication applications can deliver an exceptional, intuitive, and modern user experience without compromising on security transparency.

In this first phase (**UI-First & Clean Architecture**):
- **Zero Real Backend Connection**: Relies strictly on isolated mock repositories and local application state.
- **Zero Hardcoded Secrets**: No mock secrets pretending to be backend-connected.
- **Replaceable Infrastructure**: Presentation and business logic interact exclusively through domain interfaces.
- **Complete Application Experience**: Fully navigable, interactive screens with dynamic light/dark theming, password strength validation, real-time message sending simulation, cryptographic key inspection, and contact verification.

---

## 2. Technology Stack

- **Framework**: React Native 0.88.0 (Android & iOS)
- **Language**: TypeScript 6.0 with strict type definitions
- **Architecture**: Clean Architecture (Domain / Application / Infrastructure / Presentation)
- **Navigation**: React Navigation (Native Stack + Bottom Tabs)
- **State Management**: Redux Toolkit (`@reduxjs/toolkit`, `react-redux`)
- **Safe Area & UI Primitives**: `react-native-safe-area-context`
- **Iconography**: `lucide-react-native` (unified 2px cyber-security style) + `react-native-svg`
- **Design System**: Centralized design tokens (colors, typography, spacing, border radius, elevation, dark mode)

---

## 3. Clean Architecture Structure

```text
src/
├── domain/                      # Enterprise Business Rules & Models
│   ├── entities/               # User, Conversation, Message, Contact, Device, SecurityIdentity
│   ├── repositories/           # IAuthRepository, IChatRepository, IContactRepository, etc.
│   └── failures/               # AuthFailure, ValidationFailure, SecurityFailure
│
├── application/                 # Application Business Logic & State
│   ├── usecases/               # LoginUseCase, SendMessageUseCase, VerifyContactUseCase, etc.
│   ├── services/               # container.ts (Dependency Injection Container)
│   └── state/                  # Redux Toolkit store & domain-aligned slices
│
├── infrastructure/              # Frameworks, Drivers, and Data Providers
│   ├── mock/                   # Realistic mock datasets (users, chats, messages, keys)
│   └── repositories/           # MockAuthRepository, MockChatRepository, etc.
│
└── presentation/                # User Interface & Interaction
    ├── components/             # Reusable UI component library (AppButton, AppHeader, etc.)
    ├── screens/                # 15 complete, interactive application screens
    ├── navigation/             # RootNavigator, AuthNavigator, MainTabNavigator
    ├── hooks/                  # useAuth, useChat, useSecurity, useContacts
    └── theme/                  # ThemeContext, colors, typography, spacing, shadows
```

---

## 4. Screen Catalog

SecureChat features 15 screens:

1. **Splash Screen**: Animated security emblem, initialization check, and branding tagline.
2. **Welcome Screen**: Privacy-first onboarding showcasing zero-knowledge and forward secrecy pillars.
3. **Login Screen**: Credential validation, show/hide password, remember me, and quick demo login.
4. **Register Screen**: Password strength meter (Weak/Medium/Strong), field validation, and vault creation.
5. **Home Dashboard**: Security telemetry banner (92% Valid), quick actions, and recent encrypted threads.
6. **Search Screen**: Instant search across conversations, contacts, and encrypted messages with category filters.
7. **Chat List Screen**: Thread list with unread badges, verification status icons, and pull-to-refresh.
8. **Chat Conversation Screen**: Real-time message exchange, outgoing/incoming bubbles, delivery receipts, reply previews, and long-press options.
9. **Conversation Security Sheet**: Real-time display of ratchet algorithms, contact fingerprints, and safety number verification links.
10. **New Chat Screen**: Contact picker to initiate encrypted chats.
11. **Contacts Screen**: Verified address book with search, online presence, and modal to add new contacts.
12. **Contact Verification Screen**: High-contrast QR code placeholder and 12-block safety number comparison.
13. **Security Center**: Vault health dashboard, master key fingerprint (X25519), and key rotation action.
14. **Devices Screen**: Active sessions management with device details and remote session revocation.
15. **Profile Screen**: User cryptographic identity, appearance toggles, and secure logout.
16. **Settings Screen**: Granular switches for appearance (Light/Dark/System), notifications, read receipts, and screen security.

---

## 5. Running the Application

### Prerequisites
- Node.js >= 22.x
- Java Development Kit (JDK 17)
- Android Studio / Android SDK with NDK

### Installation
```bash
# Clone the repository
git clone <repo-url>
cd Secure_Chat

# Install dependencies
npm install
```

### Running on Android
```bash
# Start the Metro bundler
npm start

# In a separate terminal, launch on connected device or emulator
npm run android
```

---

## 6. Testing Credentials (Phase 1 Mock Demo)

You can use the pre-populated demo account or enter your own:
- **Email**: `alex.mercer@securechat.io`
- **Username**: `alex_mercer`
- **Password**: `Password123!` (or any password >= 6 characters)
- Tap the **"Use Demo Account"** button on the Login screen for instant fill.

---

## 7. Future Backend Integration (Phase 2)

Phase 2 will replace the mock repositories with:
1. **.NET 8 / 9 Web API** (REST authentication, profile management, prekey bundle distribution)
2. **SignalR WebSocket Hub** (Real-time message routing, typing indicators, delivery receipts)
3. **Signal Protocol Implementation** (X3DH key agreement, Double Ratchet algorithm, AES-256-GCM message encryption)
4. **SQL Server & SQLCipher** (Encrypted cloud storage and local on-device SQLite database)

See [docs/FUTURE_BACKEND_INTEGRATION.md](docs/FUTURE_BACKEND_INTEGRATION.md) for full implementation details.
