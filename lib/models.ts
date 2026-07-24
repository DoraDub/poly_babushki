import { docClient } from "./db";
import {
  GetCommand,
  PutCommand,
  DeleteCommand,
  QueryCommand,
  ScanCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { TableName, IndexName } from "./schema";
import type { CategoryId } from "./constants";

export interface Service {
  id: string;
  name: string;
  description?: string;
  status: "active" | "inactive" | "deploying";
  url?: string;
  createdAt: string;
  updatedAt: string;
}

export async function getServiceById(id: string): Promise<Service | null> {
  const result = await docClient.send(
    new GetCommand({
      TableName: TableName.SERVICES,
      Key: { id },
    })
  );
  return (result.Item as Service) ?? null;
}

export async function getServicesByStatus(status: string): Promise<Service[]> {
  const result = await docClient.send(
    new QueryCommand({
      TableName: TableName.SERVICES,
      IndexName: IndexName.SERVICES_STATUS,
      KeyConditionExpression: "#status = :status",
      ExpressionAttributeNames: {
        "#status": "status",
      },
      ExpressionAttributeValues: {
        ":status": status,
      },
    })
  );
  return (result.Items as Service[]) ?? [];
}

export async function getAllServices(): Promise<Service[]> {
  const result = await docClient.send(
    new ScanCommand({
      TableName: TableName.SERVICES,
    })
  );
  return (result.Items as Service[]) ?? [];
}

export async function createService(
  data: Omit<Service, "createdAt" | "updatedAt">
): Promise<Service> {
  const now = new Date().toISOString();
  const service: Service = {
    ...data,
    createdAt: now,
    updatedAt: now,
  };

  await docClient.send(
    new PutCommand({
      TableName: TableName.SERVICES,
      Item: service,
    })
  );

  return service;
}

export async function updateService(
  id: string,
  data: Partial<Pick<Service, "name" | "description" | "status" | "url">>
): Promise<Service> {
  const updateExpr = [];
  const exprValues: Record<string, unknown> = {};
  const exprNames: Record<string, string> = {};

  if (data.name !== undefined) {
    updateExpr.push("#name = :name");
    exprValues[":name"] = data.name;
    exprNames["#name"] = "name";
  }

  if (data.description !== undefined) {
    updateExpr.push("#description = :description");
    exprValues[":description"] = data.description;
    exprNames["#description"] = "description";
  }

  if (data.status !== undefined) {
    updateExpr.push("#status = :status");
    exprValues[":status"] = data.status;
    exprNames["#status"] = "status";
  }

  if (data.url !== undefined) {
    updateExpr.push("#url = :url");
    exprValues[":url"] = data.url;
    exprNames["#url"] = "url";
  }

  updateExpr.push("updatedAt = :updatedAt");
  exprValues[":updatedAt"] = new Date().toISOString();

  const result = await docClient.send(
    new UpdateCommand({
      TableName: TableName.SERVICES,
      Key: { id },
      UpdateExpression: `set ${updateExpr.join(", ")}`,
      ExpressionAttributeValues: exprValues,
      ExpressionAttributeNames:
        Object.keys(exprNames).length > 0 ? exprNames : undefined,
      ReturnValues: "ALL_NEW",
    })
  );

  return result.Attributes as Service;
}

export async function deleteService(id: string): Promise<void> {
  await docClient.send(
    new DeleteCommand({
      TableName: TableName.SERVICES,
      Key: { id },
    })
  );
}

export interface UserPreferences {
  userId: string;
  language: string;
  categories: CategoryId[];
  updatedAt: string;
}

export async function getUserPreferences(
  userId: string
): Promise<UserPreferences | null> {
  const result = await docClient.send(
    new GetCommand({
      TableName: TableName.USER_PREFERENCES,
      Key: { userId },
    })
  );
  return (result.Item as UserPreferences) ?? null;
}

export async function putUserPreferences(
  userId: string,
  language: string,
  categories: CategoryId[]
): Promise<UserPreferences> {
  const prefs: UserPreferences = {
    userId,
    language,
    categories,
    updatedAt: new Date().toISOString(),
  };

  await docClient.send(
    new PutCommand({
      TableName: TableName.USER_PREFERENCES,
      Item: prefs,
    })
  );

  return prefs;
}

export interface VocabularyItem {
  userId: string;
  sk: string;
  word: string;
  language: string;
  translationRu: string;
  translationEn: string;
  articleUrl?: string;
  articleTitle?: string;
  createdAt: string;
}

export async function getVocabulary(
  userId: string,
  language?: string
): Promise<VocabularyItem[]> {
  if (language) {
    const result = await docClient.send(
      new QueryCommand({
        TableName: TableName.VOCABULARY,
        KeyConditionExpression:
          "userId = :userId AND begins_with(sk, :langPrefix)",
        ExpressionAttributeValues: {
          ":userId": userId,
          ":langPrefix": `${language}#`,
        },
      })
    );
    return (result.Items as VocabularyItem[]) ?? [];
  }

  const result = await docClient.send(
    new QueryCommand({
      TableName: TableName.VOCABULARY,
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": userId,
      },
    })
  );
  return (result.Items as VocabularyItem[]) ?? [];
}

export async function addVocabularyItem(
  item: Omit<VocabularyItem, "createdAt">
): Promise<VocabularyItem> {
  // Check for duplicate (language + word)
  const existing = await docClient.send(
    new QueryCommand({
      TableName: TableName.VOCABULARY,
      KeyConditionExpression: "userId = :userId AND sk = :sk",
      ExpressionAttributeValues: {
        ":userId": item.userId,
        ":sk": item.sk,
      },
    })
  );

  if (existing.Items && existing.Items.length > 0) {
    throw new Error("DUPLICATE_WORD");
  }

  const vocabItem: VocabularyItem = {
    ...item,
    createdAt: new Date().toISOString(),
  };

  await docClient.send(
    new PutCommand({
      TableName: TableName.VOCABULARY,
      Item: vocabItem,
    })
  );

  return vocabItem;
}

export async function deleteVocabularyItem(
  userId: string,
  language: string,
  word: string
): Promise<void> {
  await docClient.send(
    new DeleteCommand({
      TableName: TableName.VOCABULARY,
      Key: { userId, sk: `${language}#${word}` },
    })
  );
}

export interface ChatSession {
  sessionId: string;
  userId: string;
  articleUrl: string;
  articleTitle: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  sessionId: string;
  createdAt: string;
  role: "user" | "assistant";
  content: string;
  translationRu?: string;
  translationEn?: string;
}

export async function createChatSession(
  userId: string,
  articleUrl: string,
  articleTitle: string
): Promise<ChatSession> {
  const now = new Date().toISOString();
  const session: ChatSession = {
    sessionId: crypto.randomUUID(),
    userId,
    articleUrl,
    articleTitle,
    createdAt: now,
    updatedAt: now,
  };

  await docClient.send(
    new PutCommand({
      TableName: TableName.CHAT_SESSIONS,
      Item: session,
    })
  );

  return session;
}

export async function getChatSession(
  sessionId: string
): Promise<ChatSession | null> {
  const result = await docClient.send(
    new GetCommand({
      TableName: TableName.CHAT_SESSIONS,
      Key: { sessionId },
    })
  );
  return (result.Item as ChatSession) ?? null;
}

export async function getChatSessionsByUser(
  userId: string
): Promise<ChatSession[]> {
  const result = await docClient.send(
    new QueryCommand({
      TableName: TableName.CHAT_SESSIONS,
      IndexName: IndexName.CHAT_SESSIONS_USER_ID,
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": userId,
      },
    })
  );
  return (result.Items as ChatSession[]) ?? [];
}

export async function getChatSessionByArticle(
  userId: string,
  articleUrl: string
): Promise<ChatSession | null> {
  const sessions = await getChatSessionsByUser(userId);
  return sessions.find((s) => s.articleUrl === articleUrl) ?? null;
}

export async function addChatMessage(
  message: Omit<ChatMessage, "createdAt">
): Promise<ChatMessage> {
  const msg: ChatMessage = {
    ...message,
    createdAt: new Date().toISOString(),
  };

  await docClient.send(
    new PutCommand({
      TableName: TableName.CHAT_MESSAGES,
      Item: msg,
    })
  );

  return msg;
}

export async function getChatMessages(
  sessionId: string
): Promise<ChatMessage[]> {
  const result = await docClient.send(
    new QueryCommand({
      TableName: TableName.CHAT_MESSAGES,
      KeyConditionExpression: "sessionId = :sessionId",
      ExpressionAttributeValues: {
        ":sessionId": sessionId,
      },
    })
  );
  return (result.Items as ChatMessage[]) ?? [];
}

export interface UserStreak {
  userId: string;
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string;
  updatedAt: string;
}

export async function getUserStreak(
  userId: string
): Promise<UserStreak | null> {
  const result = await docClient.send(
    new GetCommand({
      TableName: TableName.USER_STREAKS,
      Key: { userId },
    })
  );
  return (result.Item as UserStreak) ?? null;
}

export async function putUserStreak(streak: UserStreak): Promise<UserStreak> {
  await docClient.send(
    new PutCommand({
      TableName: TableName.USER_STREAKS,
      Item: streak,
    })
  );
  return streak;
}

export interface UserStats {
  userId: string;
  wordsLearned: number;
  newsRead: number;
  totalStudyTime: number;
  newsReadByLanguage?: Record<string, number>;
  achievements?: Record<string, string>;
  updatedAt: string;
}

export async function getUserStats(userId: string): Promise<UserStats | null> {
  const result = await docClient.send(
    new GetCommand({
      TableName: TableName.USER_STATS,
      Key: { userId },
    })
  );
  return (result.Item as UserStats) ?? null;
}

export async function putUserStats(stats: UserStats): Promise<UserStats> {
  await docClient.send(
    new PutCommand({
      TableName: TableName.USER_STATS,
      Item: stats,
    })
  );
  return stats;
}

export interface UserRecipe {
  userId: string;
  recipeId: string;
  language: string;
  title: string;
  titleRu: string;
  emoji: string;
  unlockedAt: string;
}

export async function getUserRecipes(userId: string): Promise<UserRecipe[]> {
  const result = await docClient.send(
    new QueryCommand({
      TableName: TableName.RECIPES,
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": userId,
      },
    })
  );
  return (result.Items as UserRecipe[]) ?? [];
}

export async function addUserRecipe(
  item: Omit<UserRecipe, "unlockedAt">
): Promise<UserRecipe> {
  const recipe: UserRecipe = {
    ...item,
    unlockedAt: new Date().toISOString(),
  };

  await docClient.send(
    new PutCommand({
      TableName: TableName.RECIPES,
      Item: recipe,
    })
  );

  return recipe;
}

export async function deleteUserRecipe(
  userId: string,
  recipeId: string
): Promise<void> {
  await docClient.send(
    new DeleteCommand({
      TableName: TableName.RECIPES,
      Key: { userId, recipeId },
    })
  );
}

export type UserGender = "male" | "female" | "neutral";

export interface UserProfile {
  userId: string;
  name: string;
  gender: UserGender;
  language: string;
  updatedAt: string;
}

export async function getUserProfile(
  userId: string
): Promise<UserProfile | null> {
  const result = await docClient.send(
    new GetCommand({
      TableName: TableName.USER_PROFILES,
      Key: { userId },
    })
  );
  return (result.Item as UserProfile) ?? null;
}

export async function putUserProfile(
  profile: UserProfile
): Promise<UserProfile> {
  await docClient.send(
    new PutCommand({
      TableName: TableName.USER_PROFILES,
      Item: profile,
    })
  );
  return profile;
}
