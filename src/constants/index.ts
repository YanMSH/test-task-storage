import { NoteProps, SortType, Sorting } from "../types";

const NOTE_PLACEHOLDER: NoteProps = {
  title: "",
  text: "",
  createdAt: 0,
  updatedAt: 0,
  id: "",
} as const;

const DEFAULT_SORTING: Sorting = {
  type: "createdAt",
  order: "asc",
} as const;

const SORTING_TYPES: Record<string, SortType> = {
  CREATED: "createdAt",
  UPDATED: "updatedAt",
  TITLE: "title",
} as const;

export { NOTE_PLACEHOLDER, DEFAULT_SORTING, SORTING_TYPES };
