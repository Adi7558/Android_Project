# SecureChat — UI/UX Architecture & Clean Architecture Foundation

## 1. Architectural Overview

SecureChat is structured following strict **Clean Architecture** principles to cleanly decouple the presentation layer from business logic and data providers. This ensures that the entire presentation layer remains completely independent of whether data originates from mock repositories, a .NET REST API, a SignalR WebSocket hub, or a local SQLCipher encrypted database.

```
┌────────────────────────────────────────────────────────┐
│                   PRESENTATION LAYER                   │
│   Screens, Components, Navigation, Theme, Hooks        │
└──────────────────────────┬─────────────────────────────┘
                           │ Dispatches actions / Calls
                           ▼
┌────────────────────────────────────────────────────────┐
│                   APPLICATION LAYER                    │
│   Use Cases, Redux Slices, Service Container (DI)      │
└──────────────────────────┬─────────────────────────────┘
                           │ Executes business logic against
                           ▼
┌────────────────────────────────────────────────────────┐
│                     DOMAIN LAYER                       │
│   Entities, Repository Interfaces, Failures, Models    │
└──────────────────────────▲─────────────────────────────┘
                           │ Implemented by
┌──────────────────────────┴─────────────────────────────┐
│                 INFRASTRUCTURE LAYER                   │
│   Mock Repositories (Phase 1)                          │
│   API Repositories (.NET / SignalR) (Phase 2)          │
│   Cryptographic Provider (Phase 2)                     │
└────────────────────────────────────────────────────────┘
```

---

## 2. Layer Definitions

### A. Presentation Layer (`src/presentation/`)
- **Screens (`src/presentation/screens/`)**:
  - `auth/`: `SplashScreen`, `WelcomeScreen`, `LoginScreen`, `RegisterScreen`
  - `home/`: `HomeScreen`, `SearchScreen`
  - `chat/`: `ChatListScreen`, `ChatConversationScreen`, `NewChatScreen`
  - `contacts/`: `ContactsScreen`
  - `security/`: `SecurityCenterScreen`, `ContactVerificationScreen`
  - `devices/`: `DevicesScreen`
  - `profile/`: `ProfileScreen`, `SettingsScreen`
- **Components (`src/presentation/components/`)**:
  - `common/`: `AppText`, `AppButton`, `AppTextInput`, `AppHeader`, `Avatar`, `Badge`, `IconButton`, `SearchBar`, `EmptyState`, `LoadingState`, `ErrorState`, `BottomSheet`, `ConfirmationDialog`, `SectionHeader`, `Divider`, `Toast`
  - `chat/`: `ChatListItem`, `MessageBubble`, `MessageActionSheet`, `SecuritySystemMessage`
  - `security/`: `SecurityBadge`, `SecurityCard`, `FingerprintCard`
  - `devices/`: `DeviceCard`
- **Navigation (`src/presentation/navigation/`)**:
  - `RootNavigator`: Top-level native stack controlling `Splash`, `Auth`, `Main`, and detail/modal sheets.
  - `AuthNavigator`: Native stack controlling `Welcome`, `Login`, and `Register`.
  - `MainTabNavigator`: Bottom tab navigator for `Home`, `Chats`, `Contacts`, `Security`, and `Profile`.
- **Theme (`src/presentation/theme/`)**:
  - Centralized design tokens: `colors.ts`, `typography.ts`, `spacing.ts`, `borderRadius.ts`, `shadows.ts`, `icons.ts`, and dynamic `ThemeContext.tsx`.
- **Hooks (`src/presentation/hooks/`)**:
  - `useAuth`, `useChat`, `useSecurity`, `useContacts`.

### B. Application Layer (`src/application/`)
- **Use Cases (`src/application/usecases/`)**:
  - Single-responsibility interactors (e.g. `LoginUseCase`, `SendMessageUseCase`, `VerifyContactIdentityUseCase`, `GetDevicesUseCase`).
- **State Management (`src/application/state/`)**:
  - Global Redux Toolkit store with domain-aligned slices:
    - `authSlice`
    - `chatSlice`
    - `contactsSlice`
    - `securitySlice`
    - `devicesSlice`
    - `settingsSlice`
- **Service Container (`src/application/services/container.ts`)**:
  - Centralized dependency injection container supplying repository instances to use cases.

### C. Domain Layer (`src/domain/`)
- **Entities (`src/domain/entities/`)**:
  - `User`, `Conversation`, `Message`, `Contact`, `Device`, `SecurityIdentity`, `SecurityActivity`.
- **Repository Interfaces (`src/domain/repositories/`)**:
  - `IAuthRepository`, `IChatRepository`, `IContactRepository`, `IDeviceRepository`, `ISecurityRepository`, `IUserRepository`.
- **Failures (`src/domain/failures/Failures.ts`)**:
  - Typed domain failure classes: `AuthFailure`, `ValidationFailure`, `SecurityFailure`, `NetworkFailure`, `NotFoundFailure`.

### D. Infrastructure Layer (`src/infrastructure/`)
- **Mock Repositories (`src/infrastructure/repositories/`)**:
  - `MockAuthRepository`, `MockChatRepository`, `MockContactRepository`, `MockDeviceRepository`, `MockSecurityRepository`, `MockUserRepository`.
- **Mock Datasets (`src/infrastructure/mock/`)**:
  - High-fidelity realistic mock data for users, chats, messages, cryptographic fingerprints, and device sessions.

---

## 3. Data Flow Pattern

1. **User Interaction**: User types a message and taps Send in `ChatConversationScreen`.
2. **Hook Invocation**: Screen calls `sendMessage()` from `useChat()`.
3. **Use Case Execution**: `useChat` delegates execution to `SendMessageUseCase.execute()`.
4. **Repository Abstraction**: `SendMessageUseCase` calls `IChatRepository.sendMessage()`.
5. **Infrastructure Resolution**: `MockChatRepository` creates the new `Message` entity with realistic status and updates local thread state.
6. **State Synchronization**: Redux `chatSlice.addMessage` is dispatched, updating both the active message feed and the recent conversation thread last message.
7. **UI Re-render**: Component updates seamlessly without knowing where the data originated.
