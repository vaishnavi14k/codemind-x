/** Types for the future account-backed conversation and profile records. */
export type ChatMessageRole = "user" | "assistant";

export interface ChatConversation {
  id: string;
  ownerId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  role: ChatMessageRole;
  content: string;
  createdAt: string;
}

export interface UserProfileDetails {
  userId: string;
  displayName: string | null;
  avatarUrl: string | null;
  preferences: {
    emailNotifications: boolean;
    weeklyDigest: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export type ChatMessageDraft = Pick<ChatMessage, "role" | "content">;