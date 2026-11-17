# SecureChat — Future Backend & Cryptography Integration Guide (Phase 2)

## 1. Overview

SecureChat Phase 1 was built with **Clean Architecture** to ensure that Phase 2 can replace the mock infrastructure layer with a production **.NET Backend**, **SignalR Hub**, **SQL Server / SQLite (SQLCipher)**, and **Signal Protocol Cryptographic Services** without redesigning or restructuring any presentation code.

---

## 2. Infrastructure Replacement Architecture

In Phase 1:
```
Presentation (Screens / Hooks)
       │
       ▼
Application (Use Cases)
       │
       ▼
Domain (Repository Interfaces)
       │
       ▼
Infrastructure (Mock Repositories: MockAuthRepository, MockChatRepository, etc.)
```

In Phase 2:
```
Presentation (Screens / Hooks) [UNCHANGED]
       │
       ▼
Application (Use Cases) [UNCHANGED]
       │
       ▼
Domain (Repository Interfaces) [UNCHANGED]
       │
       ▼
Infrastructure (Production Implementations: ApiAuthRepository, SignalRChatRepository, etc.)
       │
       ├── .NET 8 / 9 Web API
       ├── SignalR WebSocket Real-Time Hub
       ├── SQL Server (Cloud) & SQLCipher (Local Device DB)
       └── Cryptographic Engine (X3DH + Double Ratchet + AES-256-GCM)
```

To switch between mock and production, update the DI container in `src/application/services/container.ts`:

```typescript
// src/application/services/container.ts (Phase 2)
class ServiceContainer {
  public readonly authRepository: IAuthRepository = new ApiAuthRepository(apiClient);
  public readonly chatRepository: IChatRepository = new SignalRChatRepository(signalRClient, cryptoService);
  public readonly contactRepository: IContactRepository = new ApiContactRepository(apiClient);
  public readonly deviceRepository: IDeviceRepository = new ApiDeviceRepository(apiClient);
  public readonly securityRepository: ISecurityRepository = new ApiSecurityRepository(apiClient, cryptoService);
  public readonly userRepository: IUserRepository = new ApiUserRepository(apiClient);
}
```

---

## 3. API Endpoint Mapping

### A. Authentication (`IAuthRepository` -> `ApiAuthRepository`)
- `login(credentials)` -> `POST /api/v1/auth/login`
  - Receives JWT access token, refresh token, and encrypted user vault master salt.
  - Stores tokens in Android `EncryptedSharedPreferences` / iOS `Keychain`.
- `register(data)` -> `POST /api/v1/auth/register`
  - Client generates initial identity keypair (Ed25519/X25519) and publishes signed prekey bundle.
- `logout()` -> `POST /api/v1/auth/logout`
  - Invalidates active refresh token and purges in-memory ratchet keys.

### B. Real-Time Chat & Messaging (`IChatRepository` -> `SignalRChatRepository`)
- Connection: SignalR hub at `/hubs/chat` using bearer token authentication.
- `getConversations()` -> `GET /api/v1/conversations`
- `getMessages(conversationId)` -> Read from local encrypted SQLite (SQLCipher), sync missing envelopes from `GET /api/v1/conversations/{id}/messages`.
- `sendMessage(payload)`:
  1. Retrieve recipient's active ratchet session from local store.
  2. Encrypt plaintext payload using AES-256-GCM with ratchet message key.
  3. Package ciphertext, IV, auth tag, and ephemeral ratchet header.
  4. Invoke SignalR method: `await hubConnection.invoke("SendEncryptedEnvelope", envelope);`
  5. Save message locally with status `Sent`.
- Incoming messages:
  - Hub listener: `hubConnection.on("ReceiveEncryptedEnvelope", async (envelope) => { ... })`
  - Ratchet step derives key, decrypts ciphertext, validates MAC, and saves to database.
  - Automatically transmits delivered receipt back via SignalR.
- `markAsRead(conversationId)` -> Emit read receipt envelope via SignalR.

### C. Contacts (`IContactRepository` -> `ApiContactRepository`)
- `getContacts()` -> `GET /api/v1/contacts`
- `searchContacts(query)` -> `GET /api/v1/contacts/search?q={query}`
- `addContact(usernameOrEmail)` -> `POST /api/v1/contacts`:
  - Fetches target user's identity key and signed prekeys to initialize X3DH handshake.

### D. Devices & Sessions (`IDeviceRepository` -> `ApiDeviceRepository`)
- `getDevices()` -> `GET /api/v1/devices`
- `revokeDevice(deviceId)` -> `DELETE /api/v1/devices/{id}`
  - Broadcasts device revocation message to invalidate ratchet sessions.

### E. Security & Keys (`ISecurityRepository` -> `ApiSecurityRepository`)
- `getSecurityOverview()` -> Aggregates local cryptographic state and server session count.
- `verifyContactIdentity(userId)`:
  - Saves verified safety number fingerprint hash into local SQLCipher trust store.
- `regenerateIdentityKeys()`:
  - Generates new X25519/Ed25519 keypair.
  - Publishes updated bundle to `PUT /api/v1/security/prekeys`.

---

## 4. Cryptographic Pipeline (Phase 2 Specifications)

1. **Key Agreement**: X3DH (Extended Triple Diffie-Hellman) protocol using Curve25519 (X25519).
2. **Session Ratchet**: Double Ratchet Algorithm (combining KDF chain ratchet and DH ratchet for forward secrecy and break-in recovery).
3. **Payload Cipher**: AES-256 in Galois/Counter Mode (GCM) with 128-bit authentication tag.
4. **Digital Signatures**: Ed25519 for identity key verification.
5. **Key Derivation (KDF)**: HKDF (RFC 5869) with SHA-256.
6. **Password Hashing**: Argon2id for deriving local vault encryption key from master password.
7. **Local Storage**: SQLCipher (SQLite with full 256-bit AES database encryption).
