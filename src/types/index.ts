interface NoteProps {
  title: string;
  text: string;
  id: string;
  createdAt: number;
  updatedAt: number;
}

type SortType = Exclude<keyof NoteProps, "id" | "text">;
type SortOrder = "asc" | "desc";

interface Sorting {
  type: SortType;
  order: SortOrder;
}

export { type NoteProps, type Sorting, type SortType, type SortOrder };
