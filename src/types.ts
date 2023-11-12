import { User } from 'firebase/auth';
import { UploadMetadata } from 'firebase/storage';

// AUTHENTICATION
export type CreateUserPayload = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type UserProfilePayload = {
  email: string;
  photoURL: string;
  firstName: string;
  lastName: string;
};

export type UpdateUserPayload = {
  displayName?: string | null | undefined;
  photoURL?: string | null | undefined;
  user: User;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type ForgotPasswordPayload = {
  email: string;
};

export type MailPayload = {
  message: string;
  subject: string;
  senderName: string;
  senderEmail: string;
  receiverEmail: string;
};

// RECIPES TYPES
type Ingredient = {
  id: number;
  image: string;
  name: string;
  original: string;
  originalName: string;
  localizedName?: string;
  amount: number;
  unit: string;
  measures: {
    us: {
      amount: number;
      unitShort: string;
      unitLong: string;
    };
    metric: {
      amount: number;
      unitShort: string;
      unitLong: string;
    };
  };
};

export type InstructionSteps = {
  number: number;
  step: string;
  ingredients: Ingredient[];
};

export type Recipe = {
  id: number;
  image: string;
  imageType: string;
  title: string;
  readyInMinutes: number;
  sourceName: string;
  sourceUrl?: string;
  missedIngredientCount?: number;
  aggregateLikes?: number;
  summary?: string;
  extendedIngredients?: Ingredient[];
  servings?: number;
  analyzedInstructions?: {
    name: string;
    steps: InstructionSteps[];
  }[];
};

export type RecipesProps = {
  limit: number;
  type?: string | null;
  query: string | string[];
  pageParam: number;
};

export type Recipes = {
  results: Recipe[];
  currentPage?: number;
  totalPages?: number;
  offset?: number;
  number?: number;
  totalResults?: number;
};

export type TabList = {
  id: number;
  name: string;
};

export type ButtonGroupList = {
  id: string;
  name: string;
};

export type UploadToStorageBucket = {
  metadata: UploadMetadata | undefined;
  file: Blob | Uint8Array | ArrayBuffer;
  filePath: string;
  onProgressUpdate: (progress: number) => void;
  onStateUpdate?: (state: string) => void;
  onSuccess: (downloadURL: string) => void;
};
