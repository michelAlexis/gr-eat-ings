/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateIngredientInput = {
  id?: string | null,
  name: string,
  kcal?: number | null,
};

export type ModelIngredientConditionInput = {
  name?: ModelStringInput | null,
  kcal?: ModelIntInput | null,
  and?: Array< ModelIngredientConditionInput | null > | null,
  or?: Array< ModelIngredientConditionInput | null > | null,
  not?: ModelIngredientConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Ingredient = {
  __typename: "Ingredient",
  id: string,
  name: string,
  kcal?: number | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateIngredientInput = {
  id: string,
  name?: string | null,
  kcal?: number | null,
};

export type DeleteIngredientInput = {
  id: string,
};

export type ModelIngredientFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  kcal?: ModelIntInput | null,
  and?: Array< ModelIngredientFilterInput | null > | null,
  or?: Array< ModelIngredientFilterInput | null > | null,
  not?: ModelIngredientFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelIngredientConnection = {
  __typename: "ModelIngredientConnection",
  items:  Array<Ingredient | null >,
  nextToken?: string | null,
};

export type CreateIngredientMutationVariables = {
  input: CreateIngredientInput,
  condition?: ModelIngredientConditionInput | null,
};

export type CreateIngredientMutation = {
  createIngredient?:  {
    __typename: "Ingredient",
    id: string,
    name: string,
    kcal?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateIngredientMutationVariables = {
  input: UpdateIngredientInput,
  condition?: ModelIngredientConditionInput | null,
};

export type UpdateIngredientMutation = {
  updateIngredient?:  {
    __typename: "Ingredient",
    id: string,
    name: string,
    kcal?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteIngredientMutationVariables = {
  input: DeleteIngredientInput,
  condition?: ModelIngredientConditionInput | null,
};

export type DeleteIngredientMutation = {
  deleteIngredient?:  {
    __typename: "Ingredient",
    id: string,
    name: string,
    kcal?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetIngredientQueryVariables = {
  id: string,
};

export type GetIngredientQuery = {
  getIngredient?:  {
    __typename: "Ingredient",
    id: string,
    name: string,
    kcal?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListIngredientsQueryVariables = {
  filter?: ModelIngredientFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListIngredientsQuery = {
  listIngredients?:  {
    __typename: "ModelIngredientConnection",
    items:  Array< {
      __typename: "Ingredient",
      id: string,
      name: string,
      kcal?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateIngredientSubscription = {
  onCreateIngredient?:  {
    __typename: "Ingredient",
    id: string,
    name: string,
    kcal?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateIngredientSubscription = {
  onUpdateIngredient?:  {
    __typename: "Ingredient",
    id: string,
    name: string,
    kcal?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteIngredientSubscription = {
  onDeleteIngredient?:  {
    __typename: "Ingredient",
    id: string,
    name: string,
    kcal?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
