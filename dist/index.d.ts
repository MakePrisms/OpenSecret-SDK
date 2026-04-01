import { default as default_2 } from 'react';
import { JSX } from 'react/jsx-runtime';
import { Model } from 'openai/resources/models.js';
import { z } from 'zod';

declare function acceptInvite(code: string): Promise<{
    message: string;
}>;

/**
 * @deprecated Use openai.conversations.create() with items parameter instead
 * Adds items to a conversation
 * @param conversationId - The UUID of the conversation
 * @param items - Array of items to add to the conversation
 * @returns A promise resolving to the updated conversation with items
 * @throws {Error} If:
 * - The user is not authenticated
 * - The conversation is not found
 * - The user doesn't have access to the conversation
 *
 * @example
 * ```typescript
 * await addConversationItems("550e8400-e29b-41d4-a716-446655440000", [
 *   {
 *     type: "message",
 *     role: "user",
 *     content: [{ type: "text", text: "Hello" }]
 *   }
 * ]);
 * ```
 */
declare function addConversationItems(conversationId: string, items: Partial<ConversationItem>[]): Promise<Conversation>;

declare namespace api {
    export {
        getApiUrl,
        signIn as fetchLogin,
        signInGuest as fetchGuestLogin,
        signUp as fetchSignUp,
        signUpGuest as fetchGuestSignUp,
        refreshAccessToken as refreshToken,
        fetchUser,
        put as fetchPut,
        del as fetchDelete,
        fetchDeleteAllKV,
        get as fetchGet,
        list as fetchList,
        signOut as fetchLogout,
        verifyEmail,
        requestNewVerificationCode,
        fetchAttestationDocument,
        keyExchange,
        requestPasswordReset,
        confirmPasswordReset,
        changePassword,
        initiateGitHubAuth,
        handleGitHubCallback,
        initiateGoogleAuth,
        handleGoogleCallback,
        initiateAppleAuth,
        handleAppleCallback,
        handleAppleNativeSignIn,
        getPrivateKey as fetchPrivateKey,
        getPrivateKeyBytes as fetchPrivateKeyBytes,
        signMessage,
        getPublicKey as fetchPublicKey,
        convertGuestToUserAccount as convertGuestToEmailAccount,
        generateThirdPartyToken,
        encryptData,
        decryptData,
        requestAccountDeletion,
        confirmAccountDeletion,
        fetchModels,
        createApiKey,
        listApiKeys,
        deleteApiKey,
        uploadDocument,
        checkDocumentStatus,
        uploadDocumentWithPolling,
        transcribeAudio,
        fetchResponsesList,
        fetchResponse,
        cancelResponse,
        createConversation,
        getConversation,
        updateConversation,
        deleteConversation,
        deleteConversations,
        batchDeleteConversations,
        addConversationItems,
        listConversationItems,
        listConversations,
        createResponse,
        deleteResponse,
        createInstruction,
        listInstructions,
        getInstruction,
        updateInstruction,
        deleteInstruction,
        setDefaultInstruction,
        LoginResponse,
        UserResponse,
        RefreshResponse,
        KVListItem,
        GithubAuthResponse,
        GoogleAuthResponse,
        AppleAuthResponse,
        AppleUser,
        PrivateKeyResponse,
        PrivateKeyBytesResponse,
        KeyOptions,
        SignMessageResponse,
        SignMessageRequest,
        PublicKeyResponse,
        ThirdPartyTokenRequest,
        ThirdPartyTokenResponse,
        EncryptDataRequest,
        EncryptDataResponse,
        DecryptDataRequest,
        DocumentUploadRequest,
        DocumentResponse,
        DocumentUploadInitResponse,
        ApiKey,
        ApiKeyCreateResponse,
        ApiKeyListResponse,
        DocumentStatusRequest,
        DocumentStatusResponse,
        WhisperTranscriptionRequest,
        WhisperTranscriptionResponse,
        ResponsesRetrieveResponse,
        ThreadListItem,
        ResponsesListResponse,
        ResponsesListParams,
        ConversationItem,
        Conversation,
        ConversationCreateRequest,
        ConversationUpdateRequest,
        ConversationItemsResponse,
        ConversationsListResponse,
        ConversationDeleteResponse,
        ConversationsDeleteResponse,
        BatchDeleteConversationsRequest,
        BatchDeleteItemResult,
        BatchDeleteConversationsResponse,
        ResponsesCancelResponse,
        ResponsesDeleteResponse,
        ResponsesCreateRequest,
        Instruction,
        InstructionCreateRequest,
        InstructionUpdateRequest,
        InstructionListParams,
        InstructionListResponse,
        InstructionDeleteResponse
    }
}

export declare const apiConfig: ApiConfigService;

/**
 * ApiConfig service that manages URL configuration for both contexts
 */
declare class ApiConfigService {
    private _platformApiUrl;
    /**
     * Configure the platform API URL
     */
    configurePlatform(platformApiUrl: string): void;
    /**
     * Get the platform API URL
     */
    get platformApiUrl(): string;
    /**
     * Get the app API URL (derived from global config)
     */
    get appApiUrl(): string;
    /**
     * Determine if a path is for the platform context
     */
    isPlatformPath(path: string): boolean;
    /**
     * Get the API endpoint for a given path
     */
    resolveEndpoint(path: string): ApiEndpoint;
    /**
     * Build a complete URL for an API path
     */
    buildUrl(path: string): string;
    /**
     * Get the appropriate refresh token function name for a given path
     */
    getRefreshFunction(path: string): "platformRefreshToken" | "refreshToken";
}

/**
 * API configuration service that manages endpoints for both app and platform APIs
 */
export declare type ApiContext = "app" | "platform";

export declare interface ApiEndpoint {
    baseUrl: string;
    context: ApiContext;
}

export declare type ApiKey = {
    name: string;
    created_at: string;
};

export declare type ApiKeyCreateResponse = ApiKey & {
    key: string;
};

export declare type ApiKeyListResponse = ApiKey[];

/**
 * Response from initiating Apple OAuth authentication
 * @property auth_url - The Apple authorization URL to redirect the user to
 * @property state - The state parameter used to prevent CSRF attacks
 */
export declare type AppleAuthResponse = {
    auth_url: string;
    state: string;
};

/**
 * Apple user information returned from native Apple Sign-In
 * @property user_identifier - The user's unique ID from Apple
 * @property identity_token - The JWT token from Apple used for authentication
 * @property email - Optional email address (only provided on first sign-in)
 * @property given_name - Optional user's first name (only provided on first sign-in)
 * @property family_name - Optional user's last name (only provided on first sign-in)
 * @property nonce - Optional nonce for preventing replay attacks
 */
export declare type AppleUser = {
    user_identifier: string;
    identity_token: string;
    email?: string;
    given_name?: string;
    family_name?: string;
    nonce?: string;
};

declare interface Attestation {
    sessionKey: Uint8Array | null;
    sessionId: string | null;
}

export declare type AttestationDocument = z.infer<typeof AttestationDocumentSchema>;

declare const AttestationDocumentSchema: z.ZodObject<{
    module_id: z.ZodString;
    digest: z.ZodLiteral<"SHA384">;
    timestamp: z.ZodNumber;
    pcrs: z.ZodMap<z.ZodNumber, z.ZodType<Uint8Array, z.ZodTypeDef, Uint8Array>>;
    certificate: z.ZodType<Uint8Array, z.ZodTypeDef, Uint8Array>;
    cabundle: z.ZodArray<z.ZodType<Uint8Array, z.ZodTypeDef, Uint8Array>, "many">;
    public_key: z.ZodNullable<z.ZodType<Uint8Array, z.ZodTypeDef, Uint8Array>>;
    user_data: z.ZodNullable<z.ZodType<Uint8Array, z.ZodTypeDef, Uint8Array>>;
    nonce: z.ZodNullable<z.ZodType<Uint8Array, z.ZodTypeDef, Uint8Array>>;
}, "strip", z.ZodTypeAny, {
    module_id: string;
    digest: "SHA384";
    timestamp: number;
    pcrs: Map<number, Uint8Array>;
    certificate: Uint8Array;
    cabundle: Uint8Array[];
    public_key: Uint8Array | null;
    user_data: Uint8Array | null;
    nonce: Uint8Array | null;
}, {
    module_id: string;
    digest: "SHA384";
    timestamp: number;
    pcrs: Map<number, Uint8Array>;
    certificate: Uint8Array;
    cabundle: Uint8Array[];
    public_key: Uint8Array | null;
    user_data: Uint8Array | null;
    nonce: Uint8Array | null;
}>;

export declare function authenticate(attestationDocumentBase64: string, trustedRootCert: Uint8Array, nonce: string): Promise<AttestationDocument>;

export declare const awsRootCertDer: Uint8Array;

/**
 * Batch deletes multiple conversations by their IDs
 * @param ids - Array of conversation UUIDs to delete
 * @returns A promise resolving to per-item deletion results
 * @throws {Error} If:
 * - The user is not authenticated
 * - The request fails
 *
 * @description
 * This function deletes multiple conversations in a single request.
 * Returns per-item results so callers can handle partial failures.
 *
 * @example
 * ```typescript
 * const result = await batchDeleteConversations([
 *   "550e8400-e29b-41d4-a716-446655440000",
 *   "550e8400-e29b-41d4-a716-446655440001"
 * ]);
 * for (const item of result.data) {
 *   if (item.deleted) {
 *     console.log(`Conversation ${item.id} deleted`);
 *   } else {
 *     console.log(`Failed to delete ${item.id}: ${item.error}`);
 *   }
 * }
 * ```
 */
declare function batchDeleteConversations(ids: string[]): Promise<BatchDeleteConversationsResponse>;

export declare type BatchDeleteConversationsRequest = {
    ids: string[];
};

export declare type BatchDeleteConversationsResponse = {
    object: 'list';
    data: BatchDeleteItemResult[];
};

export declare type BatchDeleteItemResult = {
    id: string;
    object: 'conversation.deleted';
    deleted: boolean;
    error?: 'not_found' | 'delete_failed';
};

/**
 * Cancels an in-progress response
 * @param responseId - The UUID of the response to cancel
 * @returns A promise resolving to the cancelled response
 * @throws {Error} If:
 * - The user is not authenticated
 * - The response is not found
 * - The response is not in 'in_progress' status
 * - The user doesn't have access to the response
 *
 * @description
 * This function cancels a response that is currently being processed.
 * Only responses with status 'in_progress' can be cancelled.
 *
 * @example
 * ```typescript
 * try {
 *   const cancelled = await cancelResponse("550e8400-e29b-41d4-a716-446655440000");
 *   console.log("Response cancelled:", cancelled.status);
 * } catch (error) {
 *   console.error("Cannot cancel:", error.message);
 * }
 * ```
 */
declare function cancelResponse(responseId: string): Promise<ResponsesCancelResponse>;

export declare function changePassword(currentPassword: string, newPassword: string): Promise<void>;

/**
 * Changes password for a platform developer account
 * @param currentPassword - Current password for verification
 * @param newPassword - New password to set
 * @returns A promise that resolves when the password is successfully changed
 * @throws {Error} If current password is incorrect or the request fails
 *
 * @description
 * This function:
 * 1. Requires the user to be authenticated
 * 2. Verifies the current password before allowing the change
 * 3. Updates to the new password if verification succeeds
 */
declare function changePlatformPassword(currentPassword: string, newPassword: string): Promise<{
    message: string;
}>;

/**
 * Checks the status of a document processing task
 * @param taskId - The task ID returned from uploadDocument
 * @returns A promise resolving to the current status and optionally the processed document
 * @throws {Error} If:
 * - The user is not authenticated
 * - The task ID is not found (404)
 * - The user doesn't have access to the task (403)
 *
 * @description
 * This function checks the status of an async document processing task.
 * Status values include:
 * - "pending": Document is queued for processing
 * - "started": Document processing has begun
 * - "success": Processing completed successfully (document field will be populated)
 * - "failure": Processing failed (error field will contain details)
 *
 * Example usage:
 * ```typescript
 * const status = await checkDocumentStatus(taskId);
 * if (status.status === "success" && status.document) {
 *   console.log(status.document.text);
 * }
 * ```
 */
export declare function checkDocumentStatus(taskId: string): Promise<DocumentStatusResponse>;

/**
 * Configure the OpenSecret SDK with your API URL and client ID.
 * This must be called before using any other SDK functions.
 *
 * @param options - Configuration options
 * @param options.apiUrl - The URL of your OpenSecret backend
 * @param options.clientId - Your project's client ID (UUID)
 *
 * @example
 * ```typescript
 * import { configure } from '@opensecret/react';
 *
 * configure({
 *   apiUrl: 'https://api.opensecret.cloud',
 *   clientId: '550e8400-e29b-41d4-a716-446655440000'
 * });
 * ```
 */
export declare function configure(options: OpenSecretConfig): void;

/**
 * Confirms and completes the account deletion process
 * @param confirmationCode - The confirmation code from the verification email
 * @param plaintextSecret - The plaintext secret that was hashed in the request step
 * @returns A promise resolving to void
 *
 * @description
 * This function:
 * 1. Requires the user to be logged in (uses authenticatedApiCall)
 * 2. Verifies both the confirmation code from email and the secret known only to the client
 * 3. Permanently deletes the user account and all associated data
 * 4. After successful deletion, the client should clear all local storage and tokens
 */
export declare function confirmAccountDeletion(confirmationCode: string, plaintextSecret: string): Promise<void>;

export declare function confirmPasswordReset(email: string, alphanumericCode: string, plaintextSecret: string, newPassword: string): Promise<void>;

/**
 * Completes the password reset process for a platform developer account
 * @param email - Developer's email address
 * @param alphanumericCode - Code received via email
 * @param plaintextSecret - The plaintext secret that corresponds to the hashed_secret sent in the request
 * @param newPassword - New password to set
 * @returns A promise that resolves when the password is successfully reset
 * @throws {Error} If the verification fails or the request is invalid
 *
 * @description
 * This function:
 * 1. Completes the password reset process using the code from the email
 * 2. Requires the plaintext_secret that matches the previously sent hashed_secret
 * 3. Sets the new password if all verification succeeds
 * 4. The user can then log in with the new password
 */
declare function confirmPlatformPasswordReset(email: string, alphanumericCode: string, plaintextSecret: string, newPassword: string): Promise<{
    message: string;
}>;

export declare type Conversation = {
    id: string;
    object: 'conversation';
    created_at: number;
    metadata?: Record<string, any>;
};

export declare type ConversationCreateRequest = {
    metadata?: Record<string, any>;
};

export declare type ConversationDeleteResponse = {
    id: string;
    object: 'conversation.deleted';
    deleted: boolean;
};

export declare type ConversationItem = {
    id: string;
    type: 'message';
    status: 'completed' | 'in_progress' | 'incomplete';
    role: 'user' | 'assistant' | 'system';
    content: Array<{
        type: 'text' | 'input_text' | 'input_audio' | 'item';
        text?: string;
        audio?: string;
        transcript?: string;
        id?: string;
    }>;
};

export declare type ConversationItemsResponse = {
    object: 'list';
    data: ConversationItem[];
    first_id?: string;
    last_id?: string;
    has_more: boolean;
};

export declare type ConversationsDeleteResponse = {
    object: 'list.deleted';
    deleted: boolean;
};

export declare type ConversationsListResponse = {
    object: 'list';
    data: Conversation[];
    first_id?: string;
    last_id?: string;
    has_more: boolean;
};

export declare type ConversationUpdateRequest = {
    metadata?: Record<string, any>;
};

export declare function convertGuestToUserAccount(email: string, password: string, name?: string | null): Promise<void>;

/**
 * Creates a new API key for the authenticated user
 * @param name - A descriptive name for the API key
 * @returns A promise resolving to the API key details with the key value (only shown once)
 * @throws {Error} If:
 * - The user is not authenticated
 * - The name is invalid
 * - The request fails
 *
 * @description
 * IMPORTANT: The `key` field is only returned once during creation and cannot be retrieved again.
 * The SDK consumer should prompt users to save the key immediately.
 *
 * Example usage:
 * ```typescript
 * const apiKey = await createApiKey("Production Key");
 * console.log(apiKey.key); // UUID format: 550e8400-e29b-41d4-a716-446655440000
 * // Save this key securely - it won't be shown again!
 * ```
 */
export declare function createApiKey(name: string): Promise<ApiKeyCreateResponse>;

/**
 * Creates a new conversation
 * @param metadata - Optional metadata to attach to the conversation
 * @returns A promise resolving to the created conversation
 * @throws {Error} If:
 * - The user is not authenticated
 * - The request fails
 *
 * @description
 * This function creates a new conversation that can be used to group
 * related responses together. The conversation can have metadata
 * attached for organization and filtering purposes.
 *
 * NOTE: Prefer using the OpenAI client directly for conversation operations:
 * ```typescript
 * const openai = new OpenAI({ fetch: customFetch });
 * const conversation = await openai.conversations.create({
 *   metadata: { title: "Product Support", category: "technical" }
 * });
 * ```
 *
 * @deprecated Use openai.conversations.create() instead
 */
declare function createConversation(metadata?: Record<string, any>): Promise<Conversation>;

declare function createCustomFetch(options?: CustomFetchOptions): (input: string | URL | Request, init?: RequestInit) => Promise<Response>;
export { createCustomFetch as createAiCustomFetch }
export { createCustomFetch }

/**
 * Creates a new instruction
 * @param request - The instruction creation parameters
 * @returns A promise resolving to the created instruction
 * @throws {Error} If:\n * - The user is not authenticated
 * - The request fails
 * - Name or prompt are empty strings
 *
 * @description
 * This function creates a new user instruction (system prompt).
 * If is_default is set to true, all other instructions are automatically set to is_default: false.
 * The prompt_tokens field is automatically calculated.
 *
 * @example
 * ```typescript
 * const instruction = await createInstruction({
 *   name: "Helpful Assistant",
 *   prompt: "You are a helpful assistant that...",
 *   is_default: true
 * });
 * ```
 */
declare function createInstruction(request: InstructionCreateRequest): Promise<Instruction>;

declare function createOrganization(name: string): Promise<Organization>;

declare function createProject(orgId: string, name: string, description?: string): Promise<Project>;

declare function createProjectSecret(orgId: string, projectId: string, keyName: string, secret: string): Promise<ProjectSecret>;

/**
 * Creates a new response with conversation support
 * @param request - The request parameters for creating a response
 * @returns A promise resolving to the created response or a stream
 * @throws {Error} If:
 * - The user is not authenticated
 * - The request fails
 *
 * @description
 * This function creates a new response in the OpenAI-compatible API.
 * It supports both the new conversation parameter and the deprecated
 * previous_response_id parameter for backward compatibility.
 *
 * @example
 * ```typescript
 * // Create a response in a conversation
 * const response = await createResponse({
 *   model: "gpt-4",
 *   input: "Hello, how are you?",
 *   conversation: "550e8400-e29b-41d4-a716-446655440000"
 * });
 *
 * // Or with the deprecated previous_response_id
 * const response = await createResponse({
 *   model: "gpt-4",
 *   input: "Tell me more",
 *   previous_response_id: "response-uuid"
 * });
 * ```
 */
declare function createResponse(request: ResponsesCreateRequest): Promise<any>;

export declare interface CustomFetchOptions {
    apiKey?: string;
    apiUrl?: string;
}

/**
 * Decrypts data that was previously encrypted with the user's key
 * @param encryptedData - Base64-encoded encrypted data string
 * @param key_options - Key derivation options (see KeyOptions type)
 * @returns A promise resolving to the decrypted string
 * @throws {Error} If:
 * - The encrypted data is malformed
 * - The derivation paths are invalid
 * - Authentication fails
 * - Server-side decryption error occurs
 *
 * @description
 * This function supports multiple decryption approaches:
 *
 * 1. Decrypt with master key (no derivation parameters)
 *
 * 2. Decrypt with BIP-32 derived key
 *    - Derives a child key from the master seed using BIP-32
 *
 * 3. Decrypt with BIP-85 derived key
 *    - Derives a child mnemonic using BIP-85, then uses its master key
 *
 * 4. Decrypt with combined BIP-85 and BIP-32 derivation
 *    - First derives a child mnemonic via BIP-85
 *    - Then applies BIP-32 derivation to derive a key from that seed
 *
 * IMPORTANT: You must use the exact same derivation paths for decryption
 * that were used for encryption.
 *
 * Technical details:
 * - Uses AES-256-GCM decryption with authentication tag verification
 * - Extracts the nonce from the first 12 bytes of the encrypted data
 * - The encrypted_data must be in the exact format returned by the encrypt endpoint
 */
export declare function decryptData(encryptedData: string, key_options?: KeyOptions): Promise<string>;

declare type DecryptDataRequest = {
    encrypted_data: string;
    key_options?: {
        private_key_derivation_path?: string;
        seed_phrase_derivation_path?: string;
    };
};

export declare function del(key: string): Promise<void>;

/**
 * Deletes an API key by its name
 * @param name - The name of the API key to delete
 * @returns A promise resolving to void
 * @throws {Error} If:
 * - The user is not authenticated
 * - The API key with this name is not found
 * - The user doesn't own the API key
 * - The request fails
 *
 * @description
 * Permanently deletes an API key. This action cannot be undone.
 * Any requests using the deleted key will immediately fail with 401 Unauthorized.
 * Names are unique per user, so this uniquely identifies the key to delete.
 *
 * Example usage:
 * ```typescript
 * await deleteApiKey("Production Key");
 * console.log("API key deleted successfully");
 * ```
 */
export declare function deleteApiKey(name: string): Promise<void>;

/**
 * @deprecated Use openai.conversations.delete() instead
 * Deletes a conversation permanently
 * @param conversationId - The UUID of the conversation to delete
 * @returns A promise resolving to deletion confirmation
 * @throws {Error} If:
 * - The user is not authenticated
 * - The conversation is not found
 * - The user doesn't have access to the conversation
 *
 * @description
 * This function permanently deletes a conversation and all associated items.
 * This action cannot be undone.
 *
 * @example
 * ```typescript
 * const result = await deleteConversation("550e8400-e29b-41d4-a716-446655440000");
 * if (result.deleted) {
 *   console.log("Conversation deleted successfully");
 * }
 * ```
 */
declare function deleteConversation(conversationId: string): Promise<ConversationDeleteResponse>;

/**
 * Deletes all conversations
 * @returns A promise resolving to deletion confirmation
 * @throws {Error} If:
 * - The user is not authenticated
 * - The request fails
 *
 * @description
 * This function permanently deletes all conversations and their associated items.
 * This action cannot be undone.
 *
 * @example
 * ```typescript
 * const result = await deleteConversations();
 * if (result.deleted) {
 *   console.log("All conversations deleted successfully");
 * }
 * ```
 */
declare function deleteConversations(): Promise<ConversationsDeleteResponse>;

/**
 * Deletes an instruction permanently
 * @param instructionId - The UUID of the instruction to delete
 * @returns A promise resolving to deletion confirmation
 * @throws {Error} If:\n * - The user is not authenticated
 * - The instruction is not found (404)
 * - The user doesn't have access to the instruction
 *
 * @description
 * This function permanently deletes an instruction.
 * This action cannot be undone.
 *
 * @example
 * ```typescript
 * const result = await deleteInstruction("550e8400-e29b-41d4-a716-446655440000");
 * if (result.deleted) {
 *   console.log("Instruction deleted successfully");
 * }
 * ```
 */
declare function deleteInstruction(instructionId: string): Promise<InstructionDeleteResponse>;

declare function deleteOrganization(orgId: string): Promise<void>;

declare function deleteOrganizationInvite(orgId: string, inviteCode: string): Promise<{
    message: string;
}>;

declare function deleteProject(orgId: string, projectId: string): Promise<void>;

declare function deleteProjectSecret(orgId: string, projectId: string, keyName: string): Promise<void>;

/**
 * Deletes a response permanently
 * @param responseId - The UUID of the response to delete
 * @returns A promise resolving to deletion confirmation
 * @throws {Error} If:
 * - The user is not authenticated
 * - The response is not found
 * - The user doesn't have access to the response
 *
 * @description
 * This function permanently deletes a response and all associated data.
 * This action cannot be undone.
 *
 * @example
 * ```typescript
 * const result = await deleteResponse("550e8400-e29b-41d4-a716-446655440000");
 * if (result.deleted) {
 *   console.log("Response deleted successfully");
 * }
 * ```
 */
declare function deleteResponse(responseId: string): Promise<ResponsesDeleteResponse>;

declare type DeveloperResponse = PlatformUser & {
    organizations: PlatformOrg[];
};

export declare type DeveloperRole = 'owner' | 'admin' | 'developer' | 'viewer';

export declare type DocumentResponse = {
    text: string;
    filename: string;
    size: number;
};

export declare type DocumentStatusRequest = {
    task_id: string;
};

export declare type DocumentStatusResponse = {
    status: string;
    progress?: number;
    error?: string;
    document?: DocumentResponse;
};

export declare type DocumentUploadInitResponse = {
    task_id: string;
    filename: string;
    size: number;
};

declare type DocumentUploadRequest = {
    filename: string;
    content_base64: string;
};

declare type EmailSettings = {
    provider: string;
    send_from: string;
    email_verification_url: string;
};

/**
 * Encrypts arbitrary string data using the user's private key
 * @param data - String content to be encrypted
 * @param key_options - Key derivation options (see KeyOptions type)
 * @returns A promise resolving to the encrypted data response
 * @throws {Error} If:
 * - The derivation paths are invalid
 * - Authentication fails
 * - Server-side encryption error occurs
 *
 * @description
 * This function supports multiple encryption approaches:
 *
 * 1. Encrypt with master key (no derivation parameters)
 *
 * 2. Encrypt with BIP-32 derived key
 *    - Derives a child key from the master seed using BIP-32
 *
 * 3. Encrypt with BIP-85 derived key
 *    - Derives a child mnemonic using BIP-85, then uses its master key
 *
 * 4. Encrypt with combined BIP-85 and BIP-32 derivation
 *    - First derives a child mnemonic via BIP-85
 *    - Then applies BIP-32 derivation to derive a key from that seed
 *
 * Technical details:
 * - Encrypts data with AES-256-GCM
 * - A random nonce is generated for each encryption operation (included in the result)
 * - The encrypted_data format:
 *   - First 12 bytes: Nonce used for encryption (prepended to ciphertext)
 *   - Remaining bytes: AES-256-GCM encrypted ciphertext + authentication tag
 *   - The entire payload is base64-encoded for safe transport
 */
export declare function encryptData(data: string, key_options?: KeyOptions): Promise<EncryptDataResponse>;

declare type EncryptDataRequest = {
    data: string;
    key_options?: {
        private_key_derivation_path?: string;
        seed_phrase_derivation_path?: string;
    };
};

export declare type EncryptDataResponse = {
    encrypted_data: string;
};

export declare const expectedRootCertHash = "641a0321a3e244efe456463195d606317ed7cdcc3c1756e09893f3c68f79bb5b";

declare function fetchAttestationDocument(nonce: string, explicitApiUrl?: string): Promise<string>;

declare function fetchDeleteAllKV(): Promise<void>;

/**
 * Fetches available AI models from the OpenAI-compatible API
 * @param apiKey - Optional API key to use instead of JWT token
 * @returns A promise resolving to an array of Model objects
 * @throws {Error} If:
 * - The user is not authenticated (no JWT token or API key)
 * - The request fails
 * - The response format is invalid
 */
export declare function fetchModels(apiKey?: string): Promise<Model[]>;

/**
 * Retrieves a single response by ID
 * @param responseId - The UUID of the response to retrieve
 * @returns A promise resolving to the response details
 * @throws {Error} If:
 * - The user is not authenticated
 * - The response is not found
 * - The user doesn't have access to the response
 *
 * @description
 * This function fetches detailed information about a specific response,
 * including full output and usage statistics.
 *
 * @example
 * ```typescript
 * const response = await fetchResponse("550e8400-e29b-41d4-a716-446655440000");
 * console.log(response.output); // The full response text
 * console.log(response.usage);  // Token usage statistics
 * ```
 */
declare function fetchResponse(responseId: string): Promise<ResponsesRetrieveResponse>;

/**
 * Lists user's conversation threads with pagination
 * @param params - Optional parameters for pagination and filtering
 * @returns A promise resolving to a paginated list of conversation threads
 * @throws {Error} If:
 * - The user is not authenticated
 * - The request fails
 * - Invalid pagination parameters
 *
 * @description
 * This function fetches a paginated list of the user's conversation threads.
 * Each thread represents a conversation, not individual messages.
 * Threads are sorted by updated_at (most recently active threads first).
 *
 * Query Parameters:
 * - limit: Number of results per page (1-100, default: 20)
 * - after: UUID cursor for forward pagination
 * - before: UUID cursor for backward pagination
 * - order: Sort order (currently not implemented, reserved for future use)
 *
 * Pagination Examples:
 * ```typescript
 * // First page
 * const threads = await fetchResponsesList({ limit: 20 });
 *
 * // Next page
 * const nextPage = await fetchResponsesList({
 *   limit: 20,
 *   after: threads.last_id
 * });
 *
 * // Previous page
 * const prevPage = await fetchResponsesList({
 *   limit: 20,
 *   before: threads.first_id
 * });
 * ```
 */
declare function fetchResponsesList(params?: ResponsesListParams): Promise<ResponsesListResponse>;

export declare function fetchUser(): Promise<UserResponse>;

export declare function generateSecureSecret(): string;

/**
 * Generates a JWT token for use with third-party services
 * @param audience - Optional URL of the service
 * @returns A promise resolving to the token response containing the JWT
 *
 * @description
 * - If audience is provided, it can be any valid URL
 * - If audience is omitted, a token with no audience restriction will be generated
 */
export declare function generateThirdPartyToken(audience?: string): Promise<ThirdPartyTokenResponse>;

export declare function get(key: string): Promise<string | undefined>;

export declare function getApiUrl(): string;

export declare function getAttestation(forceRefresh?: boolean, explicitApiUrl?: string): Promise<Attestation>;

/**
 * Get the current configuration
 * @throws {Error} If configure() hasn't been called yet
 */
export declare function getConfig(): OpenSecretConfig;

/**
 * @deprecated Use openai.conversations.retrieve() instead
 * Retrieves a conversation by ID
 * @param conversationId - The UUID of the conversation to retrieve
 * @returns A promise resolving to the conversation
 * @throws {Error} If:
 * - The user is not authenticated
 * - The conversation is not found
 * - The user doesn't have access to the conversation
 *
 * @example
 * ```typescript
 * const conversation = await getConversation("550e8400-e29b-41d4-a716-446655440000");
 * console.log(conversation.metadata);
 * ```
 */
declare function getConversation(conversationId: string): Promise<Conversation>;

declare function getEmailSettings(orgId: string, projectId: string): Promise<EmailSettings>;

/**
 * Retrieves a single instruction by ID
 * @param instructionId - The UUID of the instruction to retrieve
 * @returns A promise resolving to the instruction details
 * @throws {Error} If:\n * - The user is not authenticated
 * - The instruction is not found (404)
 * - The user doesn't have access to the instruction
 *
 * @example
 * ```typescript
 * const instruction = await getInstruction("550e8400-e29b-41d4-a716-446655440000");
 * console.log(instruction.name, instruction.prompt);
 * ```
 */
declare function getInstruction(instructionId: string): Promise<Instruction>;

declare function getOAuthSettings(orgId: string, projectId: string): Promise<OAuthSettings>;

declare function getOrganizationInvite(orgId: string, inviteCode: string): Promise<OrganizationInvite>;

declare function getPlatformApiUrl(): string;

/**
 * Fetches the private key as a mnemonic phrase with optional derivation paths
 * @param key_options - Optional key derivation options (see KeyOptions type)
 *
 * @returns A promise resolving to the private key response containing the mnemonic
 *
 * @description
 * - If seed_phrase_derivation_path is provided, a child mnemonic is derived via BIP-85
 * - If seed_phrase_derivation_path is omitted, the master mnemonic is returned
 * - BIP-85 allows deriving child mnemonics from a master seed in a deterministic way
 * - Common BIP-85 path format: m/83696968'/39'/0'/[entropy in bits]'/[index]'
 *   where entropy is typically 12' for 12-word mnemonics
 */
export declare function getPrivateKey(key_options?: KeyOptions): Promise<PrivateKeyResponse>;

/**
 * Fetches private key bytes for the given derivation options
 * @param key_options - Key derivation options (see KeyOptions type)
 *
 * @returns A promise resolving to the private key bytes response
 *
 * @description
 * This function supports multiple derivation approaches:
 *
 * 1. Master key only (no parameters)
 *    - Returns the master private key bytes
 *
 * 2. BIP-32 derivation only
 *    - Uses a single derivation path to derive a child key from the master seed
 *    - Supports both absolute and relative paths with hardened derivation:
 *      - Absolute path: "m/44'/0'/0'/0/0"
 *      - Relative path: "0'/0'/0'/0/0"
 *      - Hardened notation: "44'" or "44h"
 *    - Common paths:
 *      - BIP44 (Legacy): m/44'/0'/0'/0/0
 *      - BIP49 (SegWit): m/49'/0'/0'/0/0
 *      - BIP84 (Native SegWit): m/84'/0'/0'/0/0
 *      - BIP86 (Taproot): m/86'/0'/0'/0/0
 *
 * 3. BIP-85 derivation only
 *    - Derives a child mnemonic from the master seed using BIP-85
 *    - Then returns the master private key of that derived seed
 *    - Example path: "m/83696968'/39'/0'/12'/0'"
 *
 * 4. Combined BIP-85 and BIP-32 derivation
 *    - First derives a child mnemonic via BIP-85
 *    - Then applies BIP-32 derivation to that derived seed
 *    - This allows for more complex derivation schemes
 */
export declare function getPrivateKeyBytes(key_options?: KeyOptions): Promise<PrivateKeyBytesResponse>;

declare function getProject(orgId: string, projectId: string): Promise<Project>;

/**
 * Retrieves the public key for a given algorithm and derivation options
 * @param algorithm - Signing algorithm (schnorr or ecdsa)
 * @param key_options - Key derivation options (see KeyOptions type)
 *
 * @returns A promise resolving to the public key response
 *
 * @description
 * The derivation paths determine which key is used to generate the public key:
 *
 * 1. Master key (no derivation parameters)
 *    - Returns the public key corresponding to the master private key
 *
 * 2. BIP-32 derived key
 *    - Returns the public key for a derived child key
 *    - Useful for:
 *      - Separating keys by purpose (e.g., different chains or applications)
 *      - Generating deterministic addresses
 *      - Supporting different address formats (Legacy, SegWit, Native SegWit, Taproot)
 *
 * 3. BIP-85 derived key
 *    - Returns the public key for the master key of a BIP-85 derived seed
 *
 * 4. Combined BIP-85 and BIP-32 derivation
 *    - First derives a child mnemonic via BIP-85
 *    - Then applies BIP-32 derivation to get the corresponding public key
 */
export declare function getPublicKey(algorithm: SigningAlgorithm, key_options?: KeyOptions): Promise<PublicKeyResponse>;

export declare function getStorage(): StorageProvider;

export declare type GithubAuthResponse = {
    auth_url: string;
    csrf_token: string;
};

export declare type GoogleAuthResponse = {
    auth_url: string;
    csrf_token: string;
};

/**
 * Completes Apple OAuth authentication after user is redirected back to your app
 * @param code - The authorization code from Apple
 * @param state - The state parameter returned by Apple (should match the original state)
 * @param inviteCode - Invite code for new user registration
 * @returns A promise resolving to login response with access and refresh tokens
 * @description
 * This function completes the Apple OAuth authentication process by:
 * 1. Validating the state parameter to prevent CSRF attacks
 * 2. Exchanging the authorization code for tokens
 * 3. Creating or authenticating the user account
 *
 * This function should be called in your OAuth callback route after
 * the user is redirected back from Apple's authentication page.
 */
export declare function handleAppleCallback(code: string, state: string, inviteCode: string): Promise<LoginResponse>;

/**
 * Handles native Apple Sign-In for iOS devices
 * @param appleUser - Apple user data from the native Sign in with Apple API
 * @param client_id - The client ID for your OpenSecret project
 * @param inviteCode - Optional invite code for new user registration
 * @returns A promise resolving to login response with access and refresh tokens
 * @description
 * This function is specifically for use with iOS native Sign in with Apple:
 * 1. Validates the Apple identity token and user information
 * 2. Creates or authenticates the user account
 * 3. Returns authentication tokens
 *
 * Unlike OAuth flow, this method doesn't require redirects and is used
 * directly with the credential data from Apple's native authentication.
 *
 * Note: Email and name information are only provided by Apple on the first
 * authentication. Your backend should store this information for future use.
 *
 * The nonce parameter (optional) can be provided as part of the appleUser object.
 * When using Sign in with Apple, you can generate a nonce on your client and pass
 * it both to Apple during authentication initiation and to this function for validation.
 * The backend will verify that the nonce in the JWT matches what was provided.
 */
export declare function handleAppleNativeSignIn(appleUser: AppleUser, inviteCode?: string): Promise<LoginResponse>;

export declare function handleGitHubCallback(code: string, state: string, inviteCode: string): Promise<LoginResponse>;

export declare function handleGoogleCallback(code: string, state: string, inviteCode: string): Promise<LoginResponse>;

export declare function hashSecret(secret: string): Promise<string>;

/**
 * Initiates Apple OAuth authentication flow
 * @param client_id - The client ID for your OpenSecret project
 * @param inviteCode - Optional invite code for new user registration
 * @returns A promise resolving to the Apple auth response containing auth URL and state
 * @description
 * This function starts the Apple OAuth authentication process by:
 * 1. Generating a secure state parameter to prevent CSRF attacks
 * 2. Getting an authorization URL from the OpenSecret backend
 * 3. Returning the URL that the client should redirect to
 *
 * After the user authenticates with Apple, they will be redirected back to your application.
 * The handleAppleCallback function should be used to complete the authentication process.
 */
export declare function initiateAppleAuth(inviteCode?: string): Promise<AppleAuthResponse>;

export declare function initiateGitHubAuth(inviteCode?: string): Promise<GithubAuthResponse>;

export declare function initiateGoogleAuth(inviteCode?: string): Promise<GoogleAuthResponse>;

declare type Instruction = {
    id: string;
    object: 'instruction';
    name: string;
    prompt: string;
    prompt_tokens: number;
    is_default: boolean;
    created_at: number;
    updated_at: number;
};

declare type InstructionCreateRequest = {
    name: string;
    prompt: string;
    is_default?: boolean;
};

declare type InstructionDeleteResponse = {
    id: string;
    object: 'instruction.deleted';
    deleted: true;
};

declare type InstructionListParams = {
    limit?: number;
    after?: string;
    before?: string;
    order?: string;
};

declare type InstructionListResponse = {
    object: 'list';
    data: Instruction[];
    has_more: boolean;
    first_id: string | null;
    last_id: string | null;
};

declare type InstructionUpdateRequest = {
    name?: string;
    prompt?: string;
    is_default?: boolean;
};

declare function inviteDeveloper(orgId: string, email: string, role?: string): Promise<OrganizationInvite>;

/**
 * Check if the SDK has been configured
 */
export declare function isConfigured(): boolean;

declare function keyExchange(clientPublicKey: string, nonce: string, explicitApiUrl?: string): Promise<{
    encrypted_session_key: string;
    session_id: string;
}>;

/**
 * Options for key derivation operations
 */
declare type KeyOptions = {
    /**
     * BIP-85 derivation path to derive a child mnemonic
     * Examples: "m/83696968'/39'/0'/12'/0'"
     */
    seed_phrase_derivation_path?: string;
    /**
     * BIP-32 derivation path to derive a child key from the master (or BIP-85 derived) seed
     * Examples: "m/44'/0'/0'/0/0"
     */
    private_key_derivation_path?: string;
};

export declare type KVListItem = {
    key: string;
    value: string;
    created_at: number;
    updated_at: number;
};

export declare function list(): Promise<KVListItem[]>;

/**
 * Lists all API keys for the authenticated user
 * @returns A promise resolving to an object containing an array of API key metadata (without the actual keys)
 * @throws {Error} If:
 * - The user is not authenticated
 * - The request fails
 *
 * @description
 * Returns metadata about all API keys associated with the user's account.
 * Note that the actual key values are never returned - they are only shown once during creation.
 * The keys are sorted by created_at in descending order (newest first).
 *
 * Example usage:
 * ```typescript
 * const response = await listApiKeys();
 * response.keys.forEach(key => {
 *   console.log(`${key.name} created at ${key.created_at}`);
 * });
 * ```
 */
export declare function listApiKeys(): Promise<{
    keys: ApiKeyListResponse;
}>;

/**
 * @deprecated Use openai.conversations.items.list() instead
 * Lists items in a conversation
 * @param conversationId - The UUID of the conversation
 * @param params - Optional pagination parameters
 * @returns A promise resolving to a paginated list of conversation items
 * @throws {Error} If:
 * - The user is not authenticated
 * - The conversation is not found
 * - The user doesn't have access to the conversation
 *
 * @example
 * ```typescript
 * const items = await listConversationItems("550e8400-e29b-41d4-a716-446655440000", {
 *   limit: 20
 * });
 * for (const item of items.data) {
 *   console.log(item.role, item.content);
 * }
 * ```
 */
declare function listConversationItems(conversationId: string, params?: {
    limit?: number;
    after?: string;
    before?: string;
}): Promise<ConversationItemsResponse>;

/**
 * Lists all conversations with pagination (non-standard endpoint)
 * @param params - Optional pagination parameters
 * @returns A promise resolving to a paginated list of conversations
 * @throws {Error} If:
 * - The user is not authenticated
 * - The request fails
 *
 * @description
 * This is a custom extension not part of the standard OpenAI Conversations API.
 * This function fetches a paginated list of the user's conversations.
 * Conversations are sorted by created_at (most recent first).
 *
 * @example
 * ```typescript
 * const conversations = await listConversations({ limit: 20 });
 * for (const conv of conversations.data) {
 *   console.log(conv.id, conv.metadata);
 * }
 * ```
 */
declare function listConversations(params?: {
    limit?: number;
    after?: string;
    before?: string;
}): Promise<ConversationsListResponse>;

/**
 * Lists user's instructions with pagination
 * @param params - Optional parameters for pagination and ordering
 * @returns A promise resolving to a paginated list of instructions
 * @throws {Error} If:\n * - The user is not authenticated
 * - The request fails
 *
 * @description
 * This function fetches a paginated list of the user's instructions.
 * Results are ordered by updated_at by default (most recently updated first).
 *
 * Query Parameters:
 * - limit: Number of results per page (1-100, default: 20)
 * - after: UUID cursor for forward pagination
 * - before: UUID cursor for backward pagination
 * - order: Sort order ("asc" or "desc", default: "desc")
 *
 * @example
 * ```typescript
 * const instructions = await listInstructions({ limit: 20 });
 *
 * // Next page
 * const nextPage = await listInstructions({
 *   limit: 20,
 *   after: instructions.last_id
 * });
 * ```
 */
declare function listInstructions(params?: InstructionListParams): Promise<InstructionListResponse>;

declare function listOrganizationInvites(orgId: string): Promise<OrganizationInvite[]>;

declare function listOrganizationMembers(orgId: string): Promise<OrganizationMember[]>;

declare function listOrganizations(): Promise<Organization[]>;

declare function listProjects(orgId: string): Promise<Project[]>;

declare function listProjectSecrets(orgId: string, projectId: string): Promise<ProjectSecret[]>;

export declare type LoginResponse = {
    id: string;
    email?: string;
    access_token: string;
    refresh_token: string;
};

declare type MeResponse = {
    user: PlatformUser;
    organizations: PlatformOrg[];
};

export { Model }

/**
 * Provider-specific OAuth settings
 */
declare type OAuthProviderSettings = {
    client_id: string;
    redirect_url: string;
    team_id?: string;
    key_id?: string;
};

declare type OAuthSettings = {
    google_oauth_enabled: boolean;
    github_oauth_enabled: boolean;
    apple_oauth_enabled: boolean;
    google_oauth_settings?: OAuthProviderSettings;
    github_oauth_settings?: OAuthProviderSettings;
    apple_oauth_settings?: OAuthProviderSettings;
};

export declare type OpenSecretAuthState = {
    loading: boolean;
    user?: api.UserResponse;
};

export declare interface OpenSecretConfig {
    apiUrl: string;
    clientId: string;
    /** Custom storage provider for non-browser environments (React Native, Node, etc.) */
    storage?: StorageProvider;
}

export declare const OpenSecretContext: default_2.Context<OpenSecretContextType>;

export declare type OpenSecretContextType = {
    auth: OpenSecretAuthState;
    /**
     * The client ID for this project/tenant.
     * A UUID that identifies which project/tenant this instance belongs to.
     */
    clientId: string;
    /**
     * Optional API key for OpenAI endpoints.
     * When set, this will be used instead of JWT for /v1/* endpoints.
     */
    apiKey?: string;
    /**
     * Sets the API key to use for OpenAI endpoints.
     * @param key - The API key (UUID format) or undefined to clear
     */
    setApiKey: (key: string | undefined) => void;
    /**
     * Authenticates a user with email and password.
     *
     * - Calls the login API endpoint with the configured clientId
     * - Stores access_token and refresh_token in localStorage
     * - Updates the auth state with user information
     * - Throws an error if authentication fails
     *
     * @param email - User's email address
     * @param password - User's password
     * @returns A promise that resolves when authentication is complete
     * @throws {Error} If login fails
     */
    signIn: (email: string, password: string) => Promise<void>;
    /**
     * Creates a new user account
     * @param email - User's email address
     * @param password - User's chosen password
     * @param inviteCode - Invitation code for registration
     * @param name - Optional user's full name
     * @returns A promise that resolves when account creation is complete
     * @throws {Error} If signup fails
     *
     *
     * - Calls the registration API endpoint
     * - Stores access_token and refresh_token in localStorage
     * - Updates the auth state with new user information
     * - Throws an error if account creation fails
     */
    signUp: (email: string, password: string, inviteCode: string, name?: string) => Promise<void>;
    /**
     * Authenticates a guest user with user id and password
     * @param id - User's unique id
     * @param password - User's password
     * @returns A promise that resolves when authentication is complete
     * @throws {Error} If login fails
     *
     *
     * - Calls the login API endpoint
     * - Stores access_token and refresh_token in localStorage
     * - Updates the auth state with user information
     * - Throws an error if authentication fails
     */
    signInGuest: (id: string, password: string) => Promise<void>;
    /**
     * Creates a new guest account, which can be upgraded to a normal account later with email.
     * @param password - User's chosen password, cannot be changed or recovered without adding email address.
     * @param inviteCode - Invitation code for registration
     * @returns A promise that resolves to the login response containing the guest ID
     * @throws {Error} If signup fails
     *
     *
     * - Calls the registration API endpoint
     * - Stores access_token and refresh_token in localStorage
     * - Updates the auth state with new user information
     * - Throws an error if account creation fails
     */
    signUpGuest: (password: string, inviteCode: string) => Promise<LoginResponse>;
    /**
     * Upgrades a guest account to a user account with email and password authentication.
     * @param email - User's email address
     * @param password - User's chosen password
     * @param name - Optional user's full name
     * @returns A promise that resolves when account creation is complete
     * @throws {Error} If:
     * - The current user is not a guest account
     * - The email address is already in use
     * - The user is not authenticated
     *
     *
     * - Upgrades the currently signed-in guest account (identified by their UUID) to a full email account
     * - Requires the user to be currently authenticated as a guest
     * - Updates the auth state with new user information
     * - Preserves all existing data associated with the guest account
     */
    convertGuestToUserAccount: (email: string, password: string, name?: string | null) => Promise<void>;
    /**
     * Logs out the current user
     * @returns A promise that resolves when logout is complete
     * @throws {Error} If logout fails
     *
     *
     * - Calls the logout API endpoint with the current refresh_token
     * - Removes access_token, refresh_token from localStorage
     * - Removes session-related items from sessionStorage
     * - Resets the auth state to show no user is authenticated
     */
    signOut: () => Promise<void>;
    /**
     * Retrieves a value from key-value storage
     * @param key - The unique identifier for the stored value
     * @returns A promise resolving to the stored value
     * @throws {Error} If the key cannot be retrieved
     *
     *
     * - Calls the authenticated API endpoint to fetch a value
     * - Returns undefined if the key does not exist
     * - Requires an active authentication session
     * - Logs any retrieval errors
     */
    get: typeof api.fetchGet;
    /**
     * Stores a key-value pair in the user's storage
     * @param key - The unique identifier for the value
     * @param value - The string value to be stored
     * @returns A promise resolving to the server's response
     * @throws {Error} If the value cannot be stored
     *
     *
     * - Calls the authenticated API endpoint to store a value
     * - Requires an active authentication session
     * - Overwrites any existing value for the given key
     * - Logs any storage errors
     */
    put: typeof api.fetchPut;
    /**
     * Retrieves all key-value pairs stored by the user
     * @returns A promise resolving to an array of stored items
     * @throws {Error} If the list cannot be retrieved
     *
     *
     * - Calls the authenticated API endpoint to fetch all stored items
     * - Returns an array of key-value pairs with metadata
     * - Requires an active authentication session
     * - Each item includes key, value, creation, and update timestamps
     * - Logs any listing errors
     */
    list: typeof api.fetchList;
    /**
     * Deletes a key-value pair from the user's storage
     * @param key - The unique identifier for the value to be deleted
     * @returns A promise resolving when the deletion is complete
     * @throws {Error} If the key cannot be deleted
     *
     *
     * - Calls the authenticated API endpoint to remove a specific key
     * - Requires an active authentication session
     * - Throws an error if the deletion fails (including for non-existent keys)
     * - Propagates any server-side errors directly
     */
    del: typeof api.fetchDelete;
    /**
     * Deletes all key-value pairs from the user's storage
     * @returns A promise resolving when the deletion is complete
     * @throws {Error} If the deletion fails
     */
    delAll: typeof api.fetchDeleteAllKV;
    verifyEmail: typeof api.verifyEmail;
    requestNewVerificationCode: typeof api.requestNewVerificationCode;
    requestNewVerificationEmail: typeof api.requestNewVerificationCode;
    refetchUser: () => Promise<void>;
    changePassword: typeof api.changePassword;
    refreshAccessToken: typeof api.refreshToken;
    requestPasswordReset: (email: string, hashedSecret: string) => Promise<void>;
    confirmPasswordReset: (email: string, alphanumericCode: string, plaintextSecret: string, newPassword: string) => Promise<void>;
    /**
     * Initiates the account deletion process for logged-in users
     * @param hashedSecret - Client-side hashed secret for verification
     * @returns A promise resolving to void
     * @throws {Error} If request fails
     *
     * This function:
     * 1. Requires the user to be logged in (uses authenticatedApiCall)
     * 2. Sends a verification email to the user's email address
     * 3. The email contains a confirmation code that will be needed for confirmation
     * 4. The client must store the plaintext secret for confirmation
     */
    requestAccountDeletion: (hashedSecret: string) => Promise<void>;
    /**
     * Confirms and completes the account deletion process
     * @param confirmationCode - The confirmation code from the verification email
     * @param plaintextSecret - The plaintext secret that was hashed in the request step
     * @returns A promise resolving to void
     * @throws {Error} If confirmation fails
     *
     * This function:
     * 1. Requires the user to be logged in (uses authenticatedApiCall)
     * 2. Verifies both the confirmation code from email and the secret known only to the client
     * 3. Permanently deletes the user account and all associated data
     * 4. After successful deletion, the client should clear all local storage and tokens
     */
    confirmAccountDeletion: (confirmationCode: string, plaintextSecret: string) => Promise<void>;
    initiateGitHubAuth: (inviteCode: string) => Promise<api.GithubAuthResponse>;
    handleGitHubCallback: (code: string, state: string, inviteCode: string) => Promise<void>;
    initiateGoogleAuth: (inviteCode: string) => Promise<api.GoogleAuthResponse>;
    handleGoogleCallback: (code: string, state: string, inviteCode: string) => Promise<void>;
    initiateAppleAuth: (inviteCode: string) => Promise<api.AppleAuthResponse>;
    handleAppleCallback: (code: string, state: string, inviteCode: string) => Promise<void>;
    handleAppleNativeSignIn: (appleUser: api.AppleUser, inviteCode?: string) => Promise<void>;
    /**
     * Retrieves the user's private key mnemonic phrase
     * @param options - Optional key derivation options
     * @returns A promise resolving to the private key response
     * @throws {Error} If the private key cannot be retrieved
     *
     *
     * This function supports two modes:
     *
     * 1. Master mnemonic (no parameters)
     *    - Returns the user's master 12-word BIP39 mnemonic
     *
     * 2. BIP-85 derived mnemonic
     *    - Derives a child mnemonic using BIP-85
     *    - Requires seed_phrase_derivation_path in options
     *    - Example: "m/83696968'/39'/0'/12'/0'"
     */
    getPrivateKey: typeof api.fetchPrivateKey;
    /**
     * Retrieves the private key bytes for the given derivation options
     * @param options - Optional key derivation options or legacy BIP32 derivation path string
     * @returns A promise resolving to the private key bytes response
     * @throws {Error} If:
     * - The private key bytes cannot be retrieved
     * - The derivation paths are invalid
     *
     *
     * This function supports multiple derivation approaches:
     *
     * 1. Master key only (no parameters)
     *    - Returns the master private key bytes
     *
     * 2. BIP-32 derivation only
     *    - Uses a single derivation path to derive a child key from the master seed
     *    - Supports both absolute and relative paths with hardened derivation:
     *      - Absolute path: "m/44'/0'/0'/0/0"
     *      - Relative path: "0'/0'/0'/0/0"
     *      - Hardened notation: "44'" or "44h"
     *    - Common paths:
     *      - BIP44 (Legacy): m/44'/0'/0'/0/0
     *      - BIP49 (SegWit): m/49'/0'/0'/0/0
     *      - BIP84 (Native SegWit): m/84'/0'/0'/0/0
     *      - BIP86 (Taproot): m/86'/0'/0'/0/0
     *
     * 3. BIP-85 derivation only
     *    - Derives a child mnemonic from the master seed using BIP-85
     *    - Then returns the master private key of that derived seed
     *    - Example path: "m/83696968'/39'/0'/12'/0'"
     *
     * 4. Combined BIP-85 and BIP-32 derivation
     *    - First derives a child mnemonic via BIP-85
     *    - Then applies BIP-32 derivation to that derived seed
     */
    getPrivateKeyBytes: typeof api.fetchPrivateKeyBytes;
    /**
     * Retrieves the user's public key for the specified algorithm
     * @param algorithm - The signing algorithm ('schnorr' or 'ecdsa')
     * @param options - Optional key derivation options or legacy BIP32 derivation path string
     * @returns A promise resolving to the public key response
     * @throws {Error} If the public key cannot be retrieved
     *
     *
     * The derivation paths determine which key is used to generate the public key:
     *
     * 1. Master key (no derivation parameters)
     *    - Returns the public key corresponding to the master private key
     *
     * 2. BIP-32 derived key
     *    - Returns the public key for a derived child key
     *
     * 3. BIP-85 derived key
     *    - Returns the public key for the master key of a BIP-85 derived seed
     *
     * 4. Combined BIP-85 and BIP-32 derivation
     *    - First derives a child mnemonic via BIP-85
     *    - Then applies BIP-32 derivation to get the corresponding public key
     */
    getPublicKey: typeof api.fetchPublicKey;
    /**
     * Signs a message using the specified algorithm.
     * This function supports multiple signing approaches: master key (no derivation),
     * BIP-32 derived key, BIP-85 derived key, or combined BIP-85 and BIP-32 derivation.
     *
     * @param messageBytes - The message to sign as a Uint8Array
     * @param algorithm - The signing algorithm ('schnorr' or 'ecdsa')
     * @param options - Optional key derivation options or legacy BIP32 derivation path string
     * @returns A promise resolving to the signature response
     * @throws {Error} If the message signing fails
     */
    signMessage: typeof api.signMessage;
    /**
     * Custom fetch function for AI requests that handles encryption
     * and token refreshing.
     *
     * Meant to be used with the OpenAI JS library
     *
     * Example:
     * ```tsx
     * const openai = new OpenAI({
     *   baseURL: `${os.apiUrl}/v1/`,
     *   dangerouslyAllowBrowser: true,
     *   apiKey: "the-api-key-doesnt-matter",
     *   defaultHeaders: {
     *     "Accept-Encoding": "identity"
     *   },
     *   fetch: os.aiCustomFetch
     * });
     * ```
     */
    aiCustomFetch: (input: string | URL | Request, init?: RequestInit) => Promise<Response>;
    /**
     * Returns the current OpenSecret enclave API URL being used
     * @returns The current API URL
     */
    apiUrl: string;
    /**
     * Additional PCR0 hashes to validate against
     */
    pcrConfig: PcrConfig;
    /**
     * Gets attestation from the enclave
     */
    getAttestation: typeof getAttestation;
    /**
     * Authenticates an attestation document
     */
    authenticate: typeof authenticate;
    /**
     * Parses an attestation document for viewing
     */
    parseAttestationForView: (document: AttestationDocument, cabundle: Uint8Array[], pcrConfig?: PcrConfig) => Promise<ParsedAttestationView>;
    /**
     * AWS root certificate in DER format
     */
    awsRootCertDer: typeof awsRootCertDer;
    /**
     * Expected hash of the AWS root certificate
     */
    expectedRootCertHash: typeof expectedRootCertHash;
    /**
     * Gets and verifies an attestation document from the enclave
     * @returns A promise resolving to the parsed attestation document
     * @throws {Error} If attestation fails or is invalid
     *
     *
     * This is a convenience function that:
     * 1. Fetches the attestation document with a random nonce
     * 2. Authenticates the document
     * 3. Parses it for viewing
     */
    getAttestationDocument: () => Promise<ParsedAttestationView>;
    /**
     * Generates a JWT token for use with third-party services
     * @param audience - Optional URL of the service (e.g. "https://billing.opensecret.cloud")
     * @returns A promise resolving to the token response
     * @throws {Error} If:
     * - The user is not authenticated
     * - The audience URL is invalid (if provided)
     *
     *
     * - Generates a signed JWT token for use with third-party services
     * - If audience is provided, it can be any valid URL
     * - If audience is omitted, a token with no audience restriction will be generated
     * - Requires an active authentication session
     * - Token can be used to authenticate with the specified service
     */
    generateThirdPartyToken: (audience?: string) => Promise<ThirdPartyTokenResponse>;
    /**
     * Encrypts arbitrary string data using the user's private key
     * @param data - String content to be encrypted
     * @param options - Optional key derivation options or legacy BIP32 derivation path string
     * @returns A promise resolving to the encrypted data response
     * @throws {Error} If:
     * - The derivation paths are invalid
     * - Authentication fails
     * - Server-side encryption error occurs
     *
     *
     * This function supports multiple encryption approaches:
     *
     * 1. Encrypt with master key (no derivation parameters)
     *
     * 2. Encrypt with BIP-32 derived key
     *    - Derives a child key from the master seed using BIP-32
     *    - Example: "m/44\'/0\'/0\'/0/0"
     *
     * 3. Encrypt with BIP-85 derived key
     *    - Derives a child mnemonic using BIP-85, then uses its master key
     *    - Example: { seed_phrase_derivation_path: "m/83696968\'/39\'/0\'/12\'/0\'" }
     *
     * 4. Encrypt with combined BIP-85 and BIP-32 derivation
     *    - First derives a child mnemonic via BIP-85
     *    - Then applies BIP-32 derivation to derive a key from that seed
     *    - Example: {
     *        seed_phrase_derivation_path: "m/83696968\'/39\'/0\'/12\'/0\'",
     *        private_key_derivation_path: "m/44\'/0\'/0\'/0/0"
     *      }
     *
     * Technical details:
     * - Encrypts data with AES-256-GCM
     * - A random nonce is generated for each encryption operation (included in the result)
     * - The encrypted_data format includes the nonce and is base64-encoded
     */
    encryptData: typeof api.encryptData;
    /**
     * Decrypts data that was previously encrypted with the user's key
     * @param encryptedData - Base64-encoded encrypted data string
     * @param options - Optional key derivation options or legacy BIP32 derivation path string
     * @returns A promise resolving to the decrypted string
     * @throws {Error} If:
     * - The encrypted data is malformed
     * - The derivation paths are invalid
     * - Authentication fails
     * - Server-side decryption error occurs
     *
     *
     * This function supports multiple decryption approaches:
     *
     * 1. Decrypt with master key (no derivation parameters)
     *
     * 2. Decrypt with BIP-32 derived key
     *    - Derives a child key from the master seed using BIP-32
     *
     * 3. Decrypt with BIP-85 derived key
     *    - Derives a child mnemonic using BIP-85, then uses its master key
     *
     * 4. Decrypt with combined BIP-85 and BIP-32 derivation
     *    - First derives a child mnemonic via BIP-85
     *    - Then applies BIP-32 derivation to derive a key from that seed
     *
     * IMPORTANT: You must use the exact same derivation options for decryption
     * that were used for encryption.
     */
    decryptData: typeof api.decryptData;
    /**
     * Fetches available AI models from the OpenAI-compatible API
     * @returns A promise resolving to an array of Model objects
     * @throws {Error} If:
     * - The user is not authenticated
     * - The request fails
     *
     *
     * - Returns a list of available AI models from the configured OpenAI-compatible API
     * - Response is encrypted and automatically decrypted
     * - Guest users will receive a 401 Unauthorized error
     * - Requires an active authentication session
     */
    fetchModels: () => Promise<Model[]>;
    /**
     * Uploads a document for text extraction and processing
     * @param file - The file to upload (File or Blob object)
     * @returns A promise resolving to the task ID and initial metadata
     * @throws {Error} If:
     * - The file exceeds 10MB size limit
     * - The user is not authenticated (or is a guest user)
     * - Usage limits are exceeded (403)
     * - Processing fails (500)
     *
     * @description
     * This function uploads a document to the Tinfoil processing service which:
     * 1. Accepts the document and returns a task ID immediately
     * 2. Processes the document asynchronously in the background
     * 3. Maintains end-to-end encryption using session keys
     *
     * Common supported formats include PDF, DOCX, XLSX, PPTX, TXT, RTF, and more.
     * Guest users will receive a 401 Unauthorized error.
     *
     * Example usage:
     * ```typescript
     * const file = new File(["content"], "document.pdf", { type: "application/pdf" });
     * const result = await context.uploadDocument(file);
     * console.log(result.task_id); // Task ID to check status
     * ```
     */
    uploadDocument: (file: File | Blob) => Promise<api.DocumentUploadInitResponse>;
    /**
     * Checks the status of a document processing task
     * @param taskId - The task ID returned from uploadDocument
     * @returns A promise resolving to the current status and optionally the processed document
     * @throws {Error} If:
     * - The user is not authenticated
     * - The task ID is not found (404)
     * - The user doesn't have access to the task (403)
     *
     * @description
     * This function checks the status of an async document processing task.
     * Status values include:
     * - "pending": Document is queued for processing
     * - "started": Document processing has begun
     * - "success": Processing completed successfully (document field will be populated)
     * - "failure": Processing failed (error field will contain details)
     *
     * Example usage:
     * ```typescript
     * const status = await context.checkDocumentStatus(taskId);
     * if (status.status === "success" && status.document) {
     *   console.log(status.document.text);
     * }
     * ```
     */
    checkDocumentStatus: (taskId: string) => Promise<api.DocumentStatusResponse>;
    /**
     * Uploads a document and polls for completion
     * @param file - The file to upload (File or Blob object)
     * @param options - Optional configuration for polling behavior
     * @returns A promise resolving to the processed document
     * @throws {Error} If:
     * - Upload fails (see uploadDocument errors)
     * - Processing fails (error from server)
     * - Processing times out (exceeds maxAttempts)
     *
     * @description
     * This is a convenience function that combines uploadDocument and checkDocumentStatus
     * to provide a simple interface that handles the async processing automatically.
     *
     * Options:
     * - pollInterval: Time between status checks in milliseconds (default: 2000)
     * - maxAttempts: Maximum number of status checks before timeout (default: 150 = 5 minutes)
     * - onProgress: Callback function called on each status update
     *
     * Example usage:
     * ```typescript
     * const file = new File(["content"], "document.pdf", { type: "application/pdf" });
     * const result = await context.uploadDocumentWithPolling(file, {
     *   onProgress: (status, progress) => {
     *     console.log(`Status: ${status}, Progress: ${progress || 0}%`);
     *   }
     * });
     * console.log(result.text);
     * ```
     */
    uploadDocumentWithPolling: (file: File | Blob, options?: {
        pollInterval?: number;
        maxAttempts?: number;
        onProgress?: (status: string, progress?: number) => void;
    }) => Promise<DocumentResponse>;
    /**
     * Creates a new API key for the authenticated user
     * @param name - A descriptive name for the API key
     * @returns A promise resolving to the API key details with the key value (only shown once)
     * @throws {Error} If the user is not authenticated or the request fails
     *
     * IMPORTANT: The `key` field is only returned once during creation and cannot be retrieved again.
     * The SDK consumer should prompt users to save the key immediately.
     */
    createApiKey: typeof api.createApiKey;
    /**
     * Lists all API keys for the authenticated user
     * @returns A promise resolving to an object containing an array of API key metadata (without the actual keys)
     * @throws {Error} If the user is not authenticated or the request fails
     *
     * Returns metadata about all API keys associated with the user's account.
     * Note that the actual key values are never returned - they are only shown once during creation.
     * The keys are sorted by created_at in descending order (newest first).
     */
    listApiKeys: typeof api.listApiKeys;
    /**
     * Deletes an API key by its name
     * @param name - The name of the API key to delete
     * @returns A promise that resolves when the key is deleted
     * @throws {Error} If the user is not authenticated or the API key is not found
     *
     * Permanently deletes an API key. This action cannot be undone.
     * Any requests using the deleted key will immediately fail with 401 Unauthorized.
     * Names are unique per user, so this uniquely identifies the key to delete.
     */
    deleteApiKey: typeof api.deleteApiKey;
    /**
     * Transcribes audio using the Whisper API
     * @param file - The audio file to transcribe (File or Blob object)
     * @param options - Optional transcription parameters
     * @returns A promise resolving to the transcription response
     * @throws {Error} If the user is not authenticated or transcription fails
     *
     * @description
     * This function transcribes audio using OpenAI's Whisper model via the encrypted API.
     *
     * Options:
     * - model: Model to use (default: "whisper-large-v3", routes to Tinfoil's whisper-large-v3-turbo)
     * - language: Optional ISO-639-1 language code (e.g., "en", "es", "fr")
     * - prompt: Optional context or previous segment transcript
     * - temperature: Sampling temperature between 0 and 1 (default: 0.0)
     *
     * Supported audio formats: MP3, WAV, MP4, M4A, FLAC, OGG, WEBM
     *
     * Example usage:
     * ```typescript
     * const audioFile = new File([audioData], "recording.mp3", { type: "audio/mpeg" });
     * const result = await context.transcribeAudio(audioFile, {
     *   language: "en",
     *   prompt: "This is a technical discussion about AI"
     * });
     * console.log(result.text);
     * ```
     */
    transcribeAudio: typeof api.transcribeAudio;
    /**
     * Lists user's responses with pagination
     * @param params - Optional parameters for pagination and filtering
     * @returns A promise resolving to a paginated list of responses
     * @throws {Error} If:
     * - The user is not authenticated
     * - The request fails
     * - Invalid pagination parameters
     *
     * @description
     * This function fetches a paginated list of the user's responses.
     * In list view, the usage and output fields are always null for performance reasons.
     *
     * Query Parameters:
     * - limit: Number of results per page (1-100, default: 20)
     * - after: UUID cursor for forward pagination
     * - before: UUID cursor for backward pagination
     * - order: Sort order (currently not implemented, reserved for future use)
     *
     * Pagination Examples:
     * ```typescript
     * // First page
     * const responses = await context.fetchResponsesList({ limit: 20 });
     *
     * // Next page
     * const nextPage = await context.fetchResponsesList({
     *   limit: 20,
     *   after: responses.last_id
     * });
     *
     * // Previous page
     * const prevPage = await context.fetchResponsesList({
     *   limit: 20,
     *   before: responses.first_id
     * });
     * ```
     */
    fetchResponsesList: (params?: api.ResponsesListParams) => Promise<api.ResponsesListResponse>;
    /**
     * Retrieves a single response by ID
     * @param responseId - The UUID of the response to retrieve
     * @returns A promise resolving to the response details
     */
    fetchResponse: (responseId: string) => Promise<api.ResponsesRetrieveResponse>;
    /**
     * Cancels an in-progress response
     * @param responseId - The UUID of the response to cancel
     * @returns A promise resolving to the cancelled response
     */
    cancelResponse: (responseId: string) => Promise<api.ResponsesCancelResponse>;
    /**
     * Deletes a response permanently
     * @param responseId - The UUID of the response to delete
     * @returns A promise resolving to deletion confirmation
     */
    deleteResponse: (responseId: string) => Promise<api.ResponsesDeleteResponse>;
    /**
     * Creates a new response with conversation support
     * @param request - The request parameters for creating a response
     * @returns A promise resolving to the created response or a stream
     */
    createResponse: (request: api.ResponsesCreateRequest) => Promise<any>;
    /**
     * Lists all conversations with pagination (non-standard endpoint)
     * @param params - Optional pagination parameters
     * @returns A promise resolving to a paginated list of conversations
     * @description
     * This is a custom extension not part of the standard OpenAI API.
     * For standard conversation operations, use the OpenAI client directly:
     * - openai.conversations.create()
     * - openai.conversations.retrieve()
     * - openai.conversations.update()
     * - openai.conversations.delete()
     * - openai.conversations.items.list()
     * - openai.conversations.items.retrieve()
     */
    listConversations: (params?: {
        limit?: number;
        after?: string;
        before?: string;
    }) => Promise<api.ConversationsListResponse>;
    /**
     * Deletes all conversations
     * @returns A promise resolving to deletion confirmation
     */
    deleteConversations: typeof api.deleteConversations;
    /**
     * Batch deletes multiple conversations by their IDs
     * @param ids - Array of conversation UUIDs to delete
     * @returns A promise resolving to per-item deletion results
     */
    batchDeleteConversations: typeof api.batchDeleteConversations;
    /**
     * Creates a new instruction
     * @param request - The instruction creation parameters
     * @returns A promise resolving to the created instruction
     * @throws {Error} If the user is not authenticated or the request fails
     *
     * @description
     * Creates a new user instruction (system prompt).
     * If is_default is set to true, all other instructions are automatically set to is_default: false.
     * The prompt_tokens field is automatically calculated.
     */
    createInstruction: typeof api.createInstruction;
    /**
     * Lists user's instructions with pagination
     * @param params - Optional parameters for pagination and ordering
     * @returns A promise resolving to a paginated list of instructions
     * @throws {Error} If the user is not authenticated or the request fails
     *
     * @description
     * Fetches a paginated list of the user's instructions.
     * Results are ordered by updated_at by default (most recently updated first).
     */
    listInstructions: typeof api.listInstructions;
    /**
     * Retrieves a single instruction by ID
     * @param instructionId - The UUID of the instruction to retrieve
     * @returns A promise resolving to the instruction details
     * @throws {Error} If the instruction is not found or user doesn't have access
     */
    getInstruction: typeof api.getInstruction;
    /**
     * Updates an existing instruction
     * @param instructionId - The UUID of the instruction to update
     * @param request - The fields to update
     * @returns A promise resolving to the updated instruction
     * @throws {Error} If the instruction is not found or validation fails
     *
     * @description
     * At least one field must be provided.
     * If is_default: true is set, all other instructions are automatically set to is_default: false.
     * The prompt_tokens field is recalculated automatically if prompt changes.
     */
    updateInstruction: typeof api.updateInstruction;
    /**
     * Deletes an instruction permanently
     * @param instructionId - The UUID of the instruction to delete
     * @returns A promise resolving to deletion confirmation
     * @throws {Error} If the instruction is not found or user doesn't have access
     *
     * @description
     * Permanently deletes an instruction. This action cannot be undone.
     */
    deleteInstruction: typeof api.deleteInstruction;
    /**
     * Sets an instruction as the default
     * @param instructionId - The UUID of the instruction to set as default
     * @returns A promise resolving to the updated instruction
     * @throws {Error} If the instruction is not found
     *
     * @description
     * Sets the specified instruction as the default.
     * All other instructions for this user are automatically set to is_default: false.
     * This operation is idempotent.
     */
    setDefaultInstruction: typeof api.setDefaultInstruction;
};

/**
 * Provider component for OpenSecret developer operations.
 * This provider is used for managing organizations, projects, and developer access.
 *
 * @param props - Configuration properties for the OpenSecret developer provider
 * @param props.children - React child components to be wrapped by the provider
 * @param props.apiUrl - URL of OpenSecret developer API
 *
 * @example
 * ```tsx
 * <OpenSecretDeveloper
 *   apiUrl='https://developer.opensecret.cloud'
 * >
 *   <App />
 * </OpenSecretDeveloper>
 * ```
 */
export declare function OpenSecretDeveloper({ children, apiUrl, pcrConfig, }: {
    children: default_2.ReactNode;
    apiUrl: string;
    pcrConfig?: PcrConfig;
}): JSX.Element;

export declare type OpenSecretDeveloperAuthState = {
    loading: boolean;
    developer?: DeveloperResponse;
};

export declare const OpenSecretDeveloperContext: default_2.Context<OpenSecretDeveloperContextType>;

export declare type OpenSecretDeveloperContextType = {
    auth: OpenSecretDeveloperAuthState;
    /**
     * Signs in a developer with email and password
     * @param email - Developer's email address
     * @param password - Developer's password
     * @returns A promise that resolves to the login response with access and refresh tokens
     *
     *
     * - Calls the login API endpoint
     * - Stores access_token and refresh_token in localStorage
     * - Updates the developer state with user information
     * - Throws an error if authentication fails
     */
    signIn: (email: string, password: string) => Promise<platformApi.PlatformLoginResponse>;
    /**
     * Verifies a platform user's email using the verification code
     * @param code - The verification code sent to the user's email
     * @returns A promise that resolves when verification is complete
     * @throws {Error} If verification fails
     *
     *
     * - Takes the verification code from the verification email link
     * - Calls the verification API endpoint
     * - Updates email_verified status if successful
     */
    verifyEmail: typeof platformApi.verifyPlatformEmail;
    /**
     * Requests a new verification email for the current user
     * @returns A promise that resolves to a success message
     * @throws {Error} If the user is already verified or request fails
     *
     *
     * - Used when the user needs a new verification email
     * - Requires the user to be authenticated
     * - Sends a new verification email to the user's registered email address
     */
    requestNewVerificationCode: typeof platformApi.requestNewPlatformVerificationCode;
    /**
     * Alias for requestNewVerificationCode - for consistency with OpenSecretContext
     */
    requestNewVerificationEmail: typeof platformApi.requestNewPlatformVerificationCode;
    /**
     * Initiates the password reset process for a platform developer account
     * @param email - Developer's email address
     * @param hashedSecret - Hashed secret used for additional security verification
     * @returns A promise that resolves when the reset request is successfully processed
     * @throws {Error} If the request fails or the email doesn't exist
     *
     *
     * - Sends a password reset request for a platform developer
     * - The server will send an email with an alphanumeric code
     * - The email and hashed_secret are paired for the reset process
     * - Use confirmPasswordReset to complete the process
     */
    requestPasswordReset: typeof platformApi.requestPlatformPasswordReset;
    /**
     * Completes the password reset process for a platform developer account
     * @param email - Developer's email address
     * @param alphanumericCode - Code received via email
     * @param plaintextSecret - The plaintext secret that corresponds to the hashed_secret sent in the request
     * @param newPassword - New password to set
     * @returns A promise that resolves when the password is successfully reset
     * @throws {Error} If the verification fails or the request is invalid
     *
     *
     * - Completes the password reset process using the code from the email
     * - Requires the plaintext_secret that matches the previously sent hashed_secret
     * - Sets the new password if all verification succeeds
     * - The user can then log in with the new password
     */
    confirmPasswordReset: typeof platformApi.confirmPlatformPasswordReset;
    /**
     * Changes password for a platform developer account
     * @param currentPassword - Current password for verification
     * @param newPassword - New password to set
     * @returns A promise that resolves when the password is successfully changed
     * @throws {Error} If current password is incorrect or the request fails
     *
     *
     * - Requires the user to be authenticated
     * - Verifies the current password before allowing the change
     * - Updates to the new password if verification succeeds
     */
    changePassword: typeof platformApi.changePlatformPassword;
    /**
     * Registers a new developer account
     * @param email - Developer's email address
     * @param password - Developer's password
     * @param invite_code - Required invitation code in UUID format
     * @param name - Optional developer name
     * @returns A promise that resolves to the login response with access and refresh tokens
     *
     *
     * - Calls the registration API endpoint
     * - Stores access_token and refresh_token in localStorage
     * - Updates the developer state with new user information
     * - Throws an error if account creation fails
     */
    signUp: (email: string, password: string, invite_code: string, name?: string) => Promise<platformApi.PlatformLoginResponse>;
    /**
     * Signs out the current developer by removing authentication tokens
     *
     *
     * - Calls the logout API endpoint with the current refresh_token
     * - Removes access_token, refresh_token from localStorage
     * - Resets the developer state to show no user is authenticated
     */
    signOut: () => Promise<void>;
    /**
     * Refreshes the developer's authentication state
     * @returns A promise that resolves when the refresh is complete
     * @throws {Error} If the refresh fails
     *
     *
     * - Retrieves the latest developer information from the server
     * - Updates the developer state with fresh data
     * - Useful after making changes that affect developer profile or organization membership
     */
    refetchDeveloper: () => Promise<void>;
    /**
     * Additional PCR0 hashes to validate against
     */
    pcrConfig: PcrConfig;
    /**
     * Gets attestation from the enclave
     */
    getAttestation: typeof getAttestation;
    /**
     * Authenticates an attestation document
     */
    authenticate: typeof authenticate;
    /**
     * Parses an attestation document for viewing
     */
    parseAttestationForView: (document: AttestationDocument, cabundle: Uint8Array[], pcrConfig?: PcrConfig) => Promise<ParsedAttestationView>;
    /**
     * AWS root certificate in DER format
     */
    awsRootCertDer: typeof awsRootCertDer;
    /**
     * Expected hash of the AWS root certificate
     */
    expectedRootCertHash: typeof expectedRootCertHash;
    /**
     * Gets and verifies an attestation document from the enclave
     * @returns A promise resolving to the parsed attestation document
     * @throws {Error} If attestation fails or is invalid
     *
     *
     * This is a convenience function that:
     * 1. Fetches the attestation document with a random nonce
     * 2. Authenticates the document
     * 3. Parses it for viewing
     */
    getAttestationDocument: () => Promise<ParsedAttestationView>;
    /**
     * Creates a new organization
     * @param name - Organization name
     * @returns A promise that resolves to the created organization
     */
    createOrganization: (name: string) => Promise<Organization>;
    /**
     * Lists all organizations the developer has access to
     * @returns A promise resolving to array of organization details
     */
    listOrganizations: () => Promise<Organization[]>;
    /**
     * Deletes an organization (requires owner role)
     * @param orgId - Organization ID
     */
    deleteOrganization: (orgId: string) => Promise<void>;
    /**
     * Creates a new project within an organization
     * @param orgId - Organization ID
     * @param name - Project name
     * @param description - Optional project description
     * @returns A promise that resolves to the project details including client ID
     */
    createProject: (orgId: string, name: string, description?: string) => Promise<Project>;
    /**
     * Lists all projects within an organization
     * @param orgId - Organization ID
     * @returns A promise resolving to array of project details
     */
    listProjects: (orgId: string) => Promise<Project[]>;
    /**
     * Gets a single project by ID
     * @param orgId - Organization ID
     * @param projectId - Project ID
     * @returns A promise resolving to the project details
     */
    getProject: (orgId: string, projectId: string) => Promise<Project>;
    /**
     * Updates project details
     * @param orgId - Organization ID
     * @param projectId - Project ID
     * @param updates - Object containing fields to update
     */
    updateProject: (orgId: string, projectId: string, updates: {
        name?: string;
        description?: string;
        status?: string;
    }) => Promise<Project>;
    /**
     * Deletes a project
     * @param orgId - Organization ID
     * @param projectId - Project ID
     */
    deleteProject: (orgId: string, projectId: string) => Promise<void>;
    /**
     * Creates a new secret for a project
     * @param orgId - Organization ID
     * @param projectId - Project ID
     * @param keyName - Secret key name (must be alphanumeric)
     * @param secret - Secret value (must be base64 encoded by the caller)
     *
     * Example:
     * ```typescript
     * // To encode a string secret
     * import { encode } from "@stablelib/base64";
     * const encodedSecret = encode(new TextEncoder().encode("my-secret-value"));
     *
     * // Now pass the encoded secret to the function
     * createProjectSecret(orgId, projectId, "mySecretKey", encodedSecret);
     * ```
     */
    createProjectSecret: (orgId: string, projectId: string, keyName: string, secret: string) => Promise<ProjectSecret>;
    /**
     * Lists all secrets for a project
     * @param orgId - Organization ID
     * @param projectId - Project ID
     */
    listProjectSecrets: (orgId: string, projectId: string) => Promise<ProjectSecret[]>;
    /**
     * Deletes a project secret
     * @param orgId - Organization ID
     * @param projectId - Project ID
     * @param keyName - Secret key name
     */
    deleteProjectSecret: (orgId: string, projectId: string, keyName: string) => Promise<void>;
    /**
     * Gets email configuration for a project
     * @param orgId - Organization ID
     * @param projectId - Project ID
     */
    getEmailSettings: (orgId: string, projectId: string) => Promise<EmailSettings>;
    /**
     * Updates email configuration
     * @param orgId - Organization ID
     * @param projectId - Project ID
     * @param settings - Email settings
     */
    updateEmailSettings: (orgId: string, projectId: string, settings: EmailSettings) => Promise<EmailSettings>;
    /**
     * Gets OAuth settings for a project
     * @param orgId - Organization ID
     * @param projectId - Project ID
     */
    getOAuthSettings: (orgId: string, projectId: string) => Promise<OAuthSettings>;
    /**
     * Updates OAuth configuration
     * @param orgId - Organization ID
     * @param projectId - Project ID
     * @param settings - OAuth settings
     */
    updateOAuthSettings: (orgId: string, projectId: string, settings: OAuthSettings) => Promise<OAuthSettings>;
    /**
     * Creates an invitation to join an organization
     * @param orgId - Organization ID
     * @param email - Developer's email address
     * @param role - Role to assign (defaults to "admin")
     */
    inviteDeveloper: (orgId: string, email: string, role?: string) => Promise<OrganizationInvite>;
    /**
     * Lists all members of an organization
     * @param orgId - Organization ID
     */
    listOrganizationMembers: (orgId: string) => Promise<OrganizationMember[]>;
    /**
     * Lists all pending invitations for an organization
     * @param orgId - Organization ID
     */
    listOrganizationInvites: (orgId: string) => Promise<OrganizationInvite[]>;
    /**
     * Gets a specific invitation by code
     * @param orgId - Organization ID
     * @param inviteCode - Invitation UUID code
     */
    getOrganizationInvite: (orgId: string, inviteCode: string) => Promise<OrganizationInvite>;
    /**
     * Deletes an invitation
     * @param orgId - Organization ID
     * @param inviteCode - Invitation UUID code
     */
    deleteOrganizationInvite: (orgId: string, inviteCode: string) => Promise<{
        message: string;
    }>;
    /**
     * Updates a member's role
     * @param orgId - Organization ID
     * @param userId - User ID to update
     * @param role - New role to assign
     */
    updateMemberRole: (orgId: string, userId: string, role: string) => Promise<OrganizationMember>;
    /**
     * Removes a member from the organization
     * @param orgId - Organization ID
     * @param userId - User ID to remove
     */
    removeMember: (orgId: string, userId: string) => Promise<void>;
    /**
     * Accepts an organization invitation
     * @param code - Invitation UUID code
     */
    acceptInvite: (code: string) => Promise<{
        message: string;
    }>;
    /**
     * Returns the current OpenSecret developer API URL being used
     */
    apiUrl: string;
};

/**
 * Provider component for OpenSecret authentication and key-value storage.
 *
 * @deprecated The OpenSecretProvider is deprecated. Instead, use the `configure` function
 * and import API functions directly. This provider will be removed in a future version.
 *
 * Migration guide:
 * ```tsx
 * // Old approach (deprecated)
 * <OpenSecretProvider apiUrl="..." clientId="...">
 *   <App />
 * </OpenSecretProvider>
 *
 * // New approach
 * import { configure, signIn, get, put } from '@opensecret/react';
 *
 * configure({ apiUrl: '...', clientId: '...' });
 *
 * // Use functions directly
 * await signIn(email, password);
 * const value = await get('key');
 * ```
 *
 * @param props - Configuration properties for the OpenSecret provider
 * @param props.children - React child components to be wrapped by the provider
 * @param props.apiUrl - URL of OpenSecret enclave backend
 * @param props.clientId - UUID identifying which project/tenant this instance belongs to
 * @param props.pcrConfig - Optional PCR configuration for attestation validation
 *
 * @remarks
 * This provider manages:
 * - User authentication state
 * - Authentication methods (sign in, sign up, sign out)
 * - Key-value storage operations
 * - Project/tenant identification via clientId
 *
 * @example
 * ```tsx
 * <OpenSecretProvider
 *   apiUrl='https://preview.opensecret.ai'
 *   clientId='550e8400-e29b-41d4-a716-446655440000'
 * >
 *   <App />
 * </OpenSecretProvider>
 * ```
 */
export declare function OpenSecretProvider({ children, apiUrl, clientId, pcrConfig, }: {
    children: default_2.ReactNode;
    apiUrl: string;
    clientId: string;
    pcrConfig?: PcrConfig;
}): JSX.Element;

declare type Organization = {
    id: string;
    name: string;
};

export declare type OrganizationDetails = Organization;

declare type OrganizationInvite = {
    code: string;
    email: string;
    role: string;
    used: boolean;
    expires_at: string;
    created_at: string;
    updated_at: string;
    organization_name?: string;
};

declare type OrganizationMember = {
    user_id: string;
    role: string;
    name?: string;
};

export declare function parseAttestationForView(document: AttestationDocument, cabundle: Uint8Array[], pcrConfig?: PcrConfig): Promise<ParsedAttestationView>;

export declare type ParsedAttestationView = {
    moduleId: string;
    publicKey: string | null;
    timestamp: string;
    digest: string;
    pcrs: Array<{
        id: number;
        value: string;
    }>;
    certificates: Array<{
        subject: string;
        notBefore: string;
        notAfter: string;
        pem: string;
        isRoot: boolean;
    }>;
    userData: string | null;
    nonce: string | null;
    cert0hash: string;
    validatedPcr0Hash: Pcr0ValidationResult | null;
};

/**
 * Result of PCR0 validation
 */
export declare type Pcr0ValidationResult = {
    /** Whether the PCR0 hash matches a known good value */
    isMatch: boolean;
    /** Human-readable description of the validation result */
    text: string;
    /** Timestamp of when the PCR was verified (for remote attestation) */
    verifiedAt?: string;
};

/**
 * Configuration options for PCR validation
 */
export declare type PcrConfig = {
    /** Additional custom PCR0 values for production environments */
    pcr0Values?: string[];
    /** Additional custom PCR0 values for development environments */
    pcr0DevValues?: string[];
    /** Enable/disable remote attestation (defaults to true) */
    remoteAttestation?: boolean;
    /** Custom URLs for remote attestation */
    remoteAttestationUrls?: {
        /** URL for production PCR history */
        prod?: string;
        /** URL for development PCR history */
        dev?: string;
    };
};

declare namespace platformApi {
    export {
        setPlatformApiUrl,
        getPlatformApiUrl,
        platformLogin,
        platformRegister,
        platformLogout,
        platformRefreshToken,
        createOrganization,
        listOrganizations,
        deleteOrganization,
        createProject,
        listProjects,
        getProject,
        updateProject,
        deleteProject,
        createProjectSecret,
        listProjectSecrets,
        deleteProjectSecret,
        getEmailSettings,
        updateEmailSettings,
        getOAuthSettings,
        updateOAuthSettings,
        inviteDeveloper,
        listOrganizationInvites,
        getOrganizationInvite,
        deleteOrganizationInvite,
        listOrganizationMembers,
        updateMemberRole,
        removeMember,
        acceptInvite,
        platformMe,
        verifyPlatformEmail,
        requestNewPlatformVerificationCode,
        requestPlatformPasswordReset,
        confirmPlatformPasswordReset,
        changePlatformPassword,
        PlatformLoginResponse,
        PlatformRefreshResponse,
        PlatformOrg,
        PlatformUser,
        MeResponse,
        Organization,
        OrganizationInvite,
        Project,
        ProjectSecret,
        ProjectSettings,
        EmailSettings,
        OAuthProviderSettings,
        OAuthSettings,
        OrganizationMember
    }
}

declare function platformLogin(email: string, password: string): Promise<PlatformLoginResponse>;

declare type PlatformLoginResponse = {
    id: string;
    email: string;
    name?: string;
    access_token: string;
    refresh_token: string;
};

declare function platformLogout(refresh_token: string): Promise<void>;

declare function platformMe(): Promise<MeResponse>;

declare type PlatformOrg = {
    id: string;
    name: string;
    role?: string;
    created_at?: string;
    updated_at?: string;
};

declare type PlatformRefreshResponse = {
    access_token: string;
    refresh_token: string;
};

/**
 * Refreshes platform access and refresh tokens
 *
 * This function:
 * 1. Gets the refresh token from localStorage
 * 2. Calls the platform-specific refresh endpoint (/platform/refresh)
 * 3. Updates localStorage with the new tokens
 *
 * The platform refresh endpoint expects:
 * - A refresh token with audience "platform_refresh" in the request body
 * - The request to be encrypted according to the platform's encryption scheme
 *
 * It returns new access and refresh tokens if validation succeeds.
 */
declare function platformRefreshToken(): Promise<PlatformRefreshResponse>;

/**
 * Registers a new platform developer account
 * @param email Developer's email address
 * @param password Developer's password
 * @param invite_code Required invitation code in UUID format
 * @param name Optional developer name
 * @returns A promise that resolves to the login response with access and refresh tokens
 */
declare function platformRegister(email: string, password: string, invite_code: string, name?: string): Promise<PlatformLoginResponse>;

declare type PlatformUser = {
    id: string;
    email: string;
    name?: string;
    email_verified: boolean;
    created_at: string;
    updated_at: string;
};

export declare type PrivateKeyBytesResponse = {
    /** 32-byte hex string (64 characters) representing the private key */
    private_key: string;
};

export declare type PrivateKeyResponse = {
    /** 12-word BIP39 mnemonic phrase */
    mnemonic: string;
};

declare type Project = {
    id: string;
    client_id: string;
    name: string;
    description?: string;
    status: string;
    created_at: string;
};

export declare type ProjectDetails = Project;

declare type ProjectSecret = {
    key_name: string;
    created_at: string;
    updated_at: string;
};

export declare type ProjectSettings = {
    category: string;
    settings: Record<string, unknown>;
    created_at: string;
    updated_at: string;
};

export declare type PublicKeyResponse = {
    /** Public key in hex format */
    public_key: string;
    /** The algorithm used (schnorr or ecdsa) */
    algorithm: SigningAlgorithm;
};

export declare function put(key: string, value: string): Promise<string>;

export declare function refreshAccessToken(): Promise<RefreshResponse>;

export declare type RefreshResponse = {
    access_token: string;
    refresh_token: string;
};

declare function removeMember(orgId: string, userId: string): Promise<void>;

/**
 * Initiates the account deletion process for logged-in users
 * @param hashedSecret - Client-side hashed secret for verification
 * @returns A promise resolving to void
 *
 * @description
 * This function:
 * 1. Requires the user to be logged in (uses authenticatedApiCall)
 * 2. Sends a verification email to the user's email address
 * 3. The email contains a confirmation code that will be needed for confirmation
 * 4. The client must store the plaintext secret for confirmation
 */
export declare function requestAccountDeletion(hashedSecret: string): Promise<void>;

/**
 * Requests a new verification email for a platform user
 * @returns A promise that resolves to a success message
 * @throws {Error} If the user is already verified or request fails
 */
declare function requestNewPlatformVerificationCode(): Promise<{
    message: string;
}>;

export declare function requestNewVerificationCode(): Promise<void>;

export declare function requestPasswordReset(email: string, hashedSecret: string): Promise<void>;

/**
 * Initiates the password reset process for a platform developer account
 * @param email - Developer's email address
 * @param hashedSecret - Hashed secret used for additional security verification
 * @returns A promise that resolves when the reset request is successfully processed
 * @throws {Error} If the request fails or the email doesn't exist
 *
 * @description
 * This function:
 * 1. Sends a password reset request for a platform developer
 * 2. The server will send an email with an alphanumeric code
 * 3. The email and hashed_secret are paired for the reset process
 * 4. Use confirmPlatformPasswordReset to complete the process
 */
declare function requestPlatformPasswordReset(email: string, hashedSecret: string): Promise<void>;

/**
 * Reset configuration (mainly for testing)
 */
export declare function resetConfig(): void;

export declare type ResponsesCancelResponse = {
    id: string;
    object: 'response';
    created_at: number;
    status: 'cancelled';
    model: string;
};

export declare type ResponsesCreateRequest = {
    model: string;
    input: string;
    conversation?: string | {
        id: string;
    };
    previous_response_id?: string;
    stream?: boolean;
    metadata?: Record<string, any>;
};

export declare type ResponsesDeleteResponse = {
    id: string;
    object: 'response.deleted';
    deleted: boolean;
};

export declare type ResponsesListParams = {
    limit?: number;
    after?: string;
    before?: string;
    order?: string;
};

export declare type ResponsesListResponse = {
    object: 'list';
    data: ThreadListItem[];
    has_more: boolean;
    first_id?: string;
    last_id?: string;
};

export declare type ResponsesRetrieveResponse = {
    id: string;
    object: 'response';
    created_at: number;
    status: 'queued' | 'in_progress' | 'completed' | 'failed' | 'cancelled';
    model: string;
    usage?: {
        input_tokens: number;
        input_tokens_details: {
            cached_tokens: number;
        };
        output_tokens: number;
        output_tokens_details: {
            reasoning_tokens: number;
        };
        total_tokens: number;
    };
    output?: string | any[];
};

/**
 * Sets an instruction as the default
 * @param instructionId - The UUID of the instruction to set as default
 * @returns A promise resolving to the updated instruction
 * @throws {Error} If:\n * - The user is not authenticated
 * - The instruction is not found (404)
 *
 * @description
 * This function sets the specified instruction as the default.
 * All other instructions for this user are automatically set to is_default: false.
 * This operation is idempotent - calling it on an already-default instruction succeeds.
 *
 * @example
 * ```typescript
 * const instruction = await setDefaultInstruction("550e8400-e29b-41d4-a716-446655440000");
 * console.log(instruction.is_default); // Always true
 * ```
 */
declare function setDefaultInstruction(instructionId: string): Promise<Instruction>;

declare function setPlatformApiUrl(url: string): void;

export declare function signIn(email: string, password: string): Promise<LoginResponse>;

declare type SigningAlgorithm = 'schnorr' | 'ecdsa';

export declare function signInGuest(id: string, password: string): Promise<LoginResponse>;

/**
 * Signs a message using the specified algorithm and derivation options
 * @param message_bytes - Message to sign as Uint8Array
 * @param algorithm - Signing algorithm (schnorr or ecdsa)
 * @param key_options - Key derivation options (see KeyOptions type)
 *
 * @returns A promise resolving to the signature response
 *
 * @description
 * This function supports multiple signing approaches:
 *
 * 1. Sign with master key (no derivation parameters)
 *
 * 2. Sign with BIP-32 derived key
 *    - Derives a child key from the master seed using BIP-32
 *
 * 3. Sign with BIP-85 derived key
 *    - Derives a child mnemonic using BIP-85, then uses its master key
 *
 * 4. Sign with combined BIP-85 and BIP-32 derivation
 *    - First derives a child mnemonic via BIP-85
 *    - Then applies BIP-32 derivation to derive a key from that seed
 *
 * Example message preparation:
 * ```typescript
 * // From string
 * const messageBytes = new TextEncoder().encode("Hello, World!");
 *
 * // From hex
 * const messageBytes = new Uint8Array(Buffer.from("deadbeef", "hex"));
 * ```
 */
export declare function signMessage(message_bytes: Uint8Array, algorithm: SigningAlgorithm, key_options?: KeyOptions): Promise<SignMessageResponse>;

declare type SignMessageRequest = {
    /** Base64-encoded message to sign */
    message_base64: string;
    /** Signing algorithm to use (schnorr or ecdsa) */
    algorithm: SigningAlgorithm;
    /** Optional key derivation options */
    key_options?: {
        /** Optional BIP32 derivation path (e.g., "m/44'/0'/0'/0/0") */
        private_key_derivation_path?: string;
        /** Optional BIP-85 seed phrase derivation path (e.g., "m/83696968'/39'/0'/12'/0'") */
        seed_phrase_derivation_path?: string;
    };
};

export declare type SignMessageResponse = {
    /** Signature in hex format */
    signature: string;
    /** Message hash in hex format */
    message_hash: string;
};

export declare function signOut(): Promise<void>;

export declare function signUp(email: string, password: string, inviteCode: string, name?: string | null): Promise<LoginResponse>;

export declare function signUpGuest(password: string, inviteCode: string): Promise<LoginResponse>;

/**
 * Storage abstraction for OpenSecret SDK.
 *
 * In browser environments the SDK falls back to localStorage / sessionStorage
 * automatically.  Non-browser consumers (React Native, Node, tests) must call
 * `configure({ storage: ... })` before any other SDK usage.
 */
export declare type StorageProvider = {
    persistent: {
        getItem(key: string): string | null;
        setItem(key: string, value: string): void;
        removeItem(key: string): void;
    };
    session: {
        getItem(key: string): string | null;
        setItem(key: string, value: string): void;
        removeItem(key: string): void;
    };
};

declare type ThirdPartyTokenRequest = {
    audience?: string;
};

export declare type ThirdPartyTokenResponse = {
    token: string;
};

declare type ThreadListItem = {
    id: string;
    object: 'thread';
    created_at: number;
    updated_at: number;
    title: string;
};

/**
 * Transcribes audio using the Whisper API
 * @param file - The audio file to transcribe (File or Blob object)
 * @param model - Model to use (default: "whisper-large-v3")
 * @param language - Optional ISO-639-1 language code (e.g., "en", "es", "fr")
 * @param prompt - Optional context or previous segment transcript
 * @param temperature - Sampling temperature between 0 and 1
 * @param apiKey - Optional API key to use instead of JWT token
 * @returns A promise resolving to the transcription response
 * @throws {Error} If:
 * - The user is not authenticated
 * - The file cannot be read
 * - The transcription fails
 *
 * @description
 * This function transcribes audio using OpenAI's Whisper model via the encrypted API.
 * Default model "whisper-large-v3" routes to Tinfoil's whisper-large-v3-turbo.
 *
 * Supported audio formats:
 * - MP3 (audio/mpeg)
 * - WAV (audio/wav)
 * - MP4 (audio/mp4)
 * - M4A (audio/m4a)
 * - FLAC (audio/flac)
 * - OGG (audio/ogg)
 * - WEBM (audio/webm)
 *
 * Example usage:
 * ```typescript
 * const audioFile = new File([audioData], "recording.mp3", { type: "audio/mpeg" });
 * const result = await transcribeAudio(audioFile, undefined, "en", "Meeting about Q4");
 * console.log(result.text);
 * ```
 */
declare function transcribeAudio(file: File | Blob, model?: string, language?: string, prompt?: string, temperature?: number, apiKey?: string): Promise<WhisperTranscriptionResponse>;

/**
 * @deprecated Use openai.conversations.update() instead
 * Updates a conversation's metadata
 * @param conversationId - The UUID of the conversation to update
 * @param metadata - The metadata to update
 * @returns A promise resolving to the updated conversation
 * @throws {Error} If:
 * - The user is not authenticated
 * - The conversation is not found
 * - The user doesn't have access to the conversation
 *
 * @example
 * ```typescript
 * const updated = await updateConversation("550e8400-e29b-41d4-a716-446655440000", {
 *   metadata: { title: "Updated Title", status: "resolved" }
 * });
 * ```
 */
declare function updateConversation(conversationId: string, metadata: Record<string, any>): Promise<Conversation>;

declare function updateEmailSettings(orgId: string, projectId: string, settings: EmailSettings): Promise<EmailSettings>;

/**
 * Updates an existing instruction
 * @param instructionId - The UUID of the instruction to update
 * @param request - The fields to update
 * @returns A promise resolving to the updated instruction
 * @throws {Error} If:\n * - The user is not authenticated
 * - The instruction is not found (404)
 * - No fields are provided (400)
 * - Name or prompt are empty strings (400)
 *
 * @description
 * At least one field must be provided.
 * If is_default: true is set, all other instructions are automatically set to is_default: false.
 * The prompt_tokens field is recalculated automatically if prompt changes.
 *
 * @example
 * ```typescript
 * const updated = await updateInstruction("550e8400-e29b-41d4-a716-446655440000", {
 *   name: "Updated Name",
 *   prompt: "Updated prompt text"
 * });
 * ```
 */
declare function updateInstruction(instructionId: string, request: InstructionUpdateRequest): Promise<Instruction>;

declare function updateMemberRole(orgId: string, userId: string, role: string): Promise<OrganizationMember>;

declare function updateOAuthSettings(orgId: string, projectId: string, settings: OAuthSettings): Promise<OAuthSettings>;

declare function updateProject(orgId: string, projectId: string, updates: {
    name?: string;
    description?: string;
    status?: string;
}): Promise<Project>;

/**
 * Uploads a document for text extraction and processing
 * @param file - The file to upload (File or Blob object)
 * @returns A promise resolving to the task ID and initial metadata
 * @throws {Error} If:
 * - The file exceeds 10MB size limit
 * - The user is not authenticated
 * - The user is a guest (401)
 * - Usage limits are exceeded (403)
 * - Processing fails (500)
 *
 * @description
 * This function uploads a document to the Tinfoil processing service which:
 * 1. Accepts the document and returns a task ID immediately
 * 2. Processes the document asynchronously in the background
 * 3. Maintains end-to-end encryption using session keys
 *
 * The file is converted to base64 before upload due to encryption requirements.
 * Common supported formats include PDF, DOCX, XLSX, PPTX, TXT, RTF, and more.
 *
 * Example usage:
 * ```typescript
 * const file = new File(["content"], "document.pdf", { type: "application/pdf" });
 * const result = await uploadDocument(file);
 * console.log(result.task_id); // Task ID to check status
 * ```
 */
export declare function uploadDocument(file: File | Blob): Promise<DocumentUploadInitResponse>;

/**
 * Uploads a document and polls for completion
 * @param file - The file to upload (File or Blob object)
 * @param options - Optional configuration for polling behavior
 * @returns A promise resolving to the processed document
 * @throws {Error} If:
 * - Upload fails (see uploadDocument errors)
 * - Processing fails (error from server)
 * - Processing times out (exceeds maxAttempts)
 *
 * @description
 * This is a convenience function that combines uploadDocument and checkDocumentStatus
 * to provide a simple interface that handles the async processing automatically.
 * It uploads the document, then polls the status endpoint until processing completes.
 *
 * Options:
 * - pollInterval: Time between status checks in milliseconds (default: 2000)
 * - maxAttempts: Maximum number of status checks before timeout (default: 150 = 5 minutes)
 * - onProgress: Callback function called on each status update
 *
 * Example usage:
 * ```typescript
 * const file = new File(["content"], "document.pdf", { type: "application/pdf" });
 * const result = await uploadDocumentWithPolling(file, {
 *   onProgress: (status, progress) => {
 *     console.log(`Status: ${status}, Progress: ${progress || 0}%`);
 *   }
 * });
 * console.log(result.text);
 * ```
 */
export declare function uploadDocumentWithPolling(file: File | Blob, options?: {
    pollInterval?: number;
    maxAttempts?: number;
    onProgress?: (status: string, progress?: number) => void;
}): Promise<DocumentResponse>;

/**
 * Hook to access OpenSecret context within the provider
 *
 * @deprecated The useOpenSecret hook is deprecated along with OpenSecretProvider.
 * Instead, import API functions directly and use them without a provider.
 *
 * Migration guide:
 * ```tsx
 * // Old approach (deprecated)
 * const os = useOpenSecret();
 * await os.signIn(email, password);
 *
 * // New approach
 * import { signIn } from '@opensecret/react';
 * await signIn(email, password);
 * ```
 *
 * @returns The OpenSecret context containing auth state and API methods
 * @throws {Error} If used outside of OpenSecretProvider
 */
export declare function useOpenSecret(): OpenSecretContextType;

export declare function useOpenSecretDeveloper(): OpenSecretDeveloperContextType;

export declare type UserResponse = {
    user: {
        id: string;
        name: string | null;
        email?: string;
        email_verified: boolean;
        login_method: string;
        created_at: string;
        updated_at: string;
    };
};

export declare function verifyEmail(code: string): Promise<void>;

/**
 * Verifies a platform user's email using the verification code
 * @param code - The verification code sent to the user's email
 * @returns A promise that resolves when verification is complete
 * @throws {Error} If verification fails
 */
declare function verifyPlatformEmail(code: string): Promise<void>;

declare type WhisperTranscriptionRequest = {
    file: string;
    filename: string;
    content_type: string;
    model: string;
    language?: string;
    prompt?: string;
    temperature?: number;
};

declare type WhisperTranscriptionResponse = {
    text: string;
};

export { }
