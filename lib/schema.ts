import {
  type KeySchemaElement,
  type AttributeDefinition,
  type GlobalSecondaryIndex,
} from "@aws-sdk/client-dynamodb";

export const TableName = {
  SERVICES: "services",
  USER_PREFERENCES: "user_preferences",
  VOCABULARY: "vocabulary",
  CHAT_SESSIONS: "chat_sessions",
  CHAT_MESSAGES: "chat_messages",
  USER_STREAKS: "user_streaks",
  USER_STATS: "user_stats",
  RECIPES: "recipes",
  USER_PROFILES: "user_profiles",
} as const;

export type TableName = (typeof TableName)[keyof typeof TableName];

export interface TableSchema {
  name: TableName;
  keySchema: KeySchemaElement[];
  attributeDefinitions: AttributeDefinition[];
  globalSecondaryIndexes?: GlobalSecondaryIndex[];
}

export const TABLE_SCHEMAS: Record<TableName, TableSchema> = {
  [TableName.SERVICES]: {
    name: TableName.SERVICES,
    keySchema: [{ AttributeName: "id", KeyType: "HASH" }],
    attributeDefinitions: [
      { AttributeName: "id", AttributeType: "S" },
      { AttributeName: "status", AttributeType: "S" },
    ],
    globalSecondaryIndexes: [
      {
        IndexName: "status-index",
        KeySchema: [{ AttributeName: "status", KeyType: "HASH" }],
        Projection: { ProjectionType: "ALL" },
      },
    ],
  },
  [TableName.USER_PREFERENCES]: {
    name: TableName.USER_PREFERENCES,
    keySchema: [{ AttributeName: "userId", KeyType: "HASH" }],
    attributeDefinitions: [{ AttributeName: "userId", AttributeType: "S" }],
  },
  [TableName.VOCABULARY]: {
    name: TableName.VOCABULARY,
    keySchema: [
      { AttributeName: "userId", KeyType: "HASH" },
      { AttributeName: "sk", KeyType: "RANGE" },
    ],
    attributeDefinitions: [
      { AttributeName: "userId", AttributeType: "S" },
      { AttributeName: "sk", AttributeType: "S" },
    ],
  },
  [TableName.CHAT_SESSIONS]: {
    name: TableName.CHAT_SESSIONS,
    keySchema: [{ AttributeName: "sessionId", KeyType: "HASH" }],
    attributeDefinitions: [
      { AttributeName: "sessionId", AttributeType: "S" },
      { AttributeName: "userId", AttributeType: "S" },
    ],
    globalSecondaryIndexes: [
      {
        IndexName: "userId-index",
        KeySchema: [{ AttributeName: "userId", KeyType: "HASH" }],
        Projection: { ProjectionType: "ALL" },
      },
    ],
  },
  [TableName.CHAT_MESSAGES]: {
    name: TableName.CHAT_MESSAGES,
    keySchema: [
      { AttributeName: "sessionId", KeyType: "HASH" },
      { AttributeName: "createdAt", KeyType: "RANGE" },
    ],
    attributeDefinitions: [
      { AttributeName: "sessionId", AttributeType: "S" },
      { AttributeName: "createdAt", AttributeType: "S" },
    ],
  },
  [TableName.USER_STREAKS]: {
    name: TableName.USER_STREAKS,
    keySchema: [{ AttributeName: "userId", KeyType: "HASH" }],
    attributeDefinitions: [{ AttributeName: "userId", AttributeType: "S" }],
  },
  [TableName.USER_STATS]: {
    name: TableName.USER_STATS,
    keySchema: [{ AttributeName: "userId", KeyType: "HASH" }],
    attributeDefinitions: [{ AttributeName: "userId", AttributeType: "S" }],
  },
  [TableName.RECIPES]: {
    name: TableName.RECIPES,
    keySchema: [
      { AttributeName: "userId", KeyType: "HASH" },
      { AttributeName: "recipeId", KeyType: "RANGE" },
    ],
    attributeDefinitions: [
      { AttributeName: "userId", AttributeType: "S" },
      { AttributeName: "recipeId", AttributeType: "S" },
    ],
  },
  [TableName.USER_PROFILES]: {
    name: TableName.USER_PROFILES,
    keySchema: [{ AttributeName: "userId", KeyType: "HASH" }],
    attributeDefinitions: [{ AttributeName: "userId", AttributeType: "S" }],
  },
};

export const TABLE_NAMES: TableName[] = Object.values(TableName);

export const IndexName = {
  SERVICES_STATUS: "status-index",
  CHAT_SESSIONS_USER_ID: "userId-index",
} as const;

export type IndexName = (typeof IndexName)[keyof typeof IndexName];
