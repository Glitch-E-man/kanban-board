import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */



export type Scalars = {
  ID:      { input: string; output: string };
  String:  { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int:     { input: number; output: number };
  Float:   { input: number; output: number };
  /** UUID type for Hasura/Nhost */
  uuid:    { input: string; output: string };
};

export interface Task {
  __typename?: 'tasks';
  id:         string;
  title:      string;
  assignee:   string;
  position:   number;
}

export interface Column {
  __typename?:    'board_updates';
  id:             string;
  title:          string;
  color:          string;
  tasks:          Task[];
}

// Subscription variables
export type GetBoardUpdatesSubscriptionVariables = Exact<{
  userId: Scalars['uuid']['input'];
}>;

// Subscription result type
export type GetBoardUpdatesSubscription = {
  __typename?: 'subscription_root';
  board_updates: Array<{
    __typename?: 'board_updates';
    id:      string;
    title:   string;
    color:   string;
    tasks:   Array<{
      __typename?: 'tasks';
      id:        string;
      title:     string;
      assignee:  string;
      position:  number;
    }>;
  }>;
};

// GraphQL subscription document
export const GetBoardUpdatesDocument = gql`
  subscription GetBoardUpdates($userId: uuid!) {
    board_updates(where: { user_id: { _eq: $userId } }) {
      id
      title
      color
      tasks(order_by: { position: asc }) {
        id
        title
        assignee
        position
      }
    }
  }
`;

/**
 * __useGetBoardUpdatesSubscription__
 *
 * A React hook to subscribe to realtime board updates.
 *
 * @param baseOptions Options passed to Apollo's useSubscription hook
 * @returns { data, loading, error }
 */
export function useGetBoardUpdatesSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    GetBoardUpdatesSubscription,
    GetBoardUpdatesSubscriptionVariables
  >
) {
  const options = { ...baseOptions };
  return Apollo.useSubscription<
    GetBoardUpdatesSubscription,
    GetBoardUpdatesSubscriptionVariables
  >(GetBoardUpdatesDocument, options);
}