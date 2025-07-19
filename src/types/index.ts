export interface MessageType {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt?: string;
}
