import { SORTING_TYPES } from "../../constants";
import { NoteProps, SortOrder, Sorting } from "../../types";

const isOrderAscendant = (order: SortOrder) => order === "asc";

const sortByTitle = (notes: Array<NoteProps>, order: SortOrder) => {
  if (isOrderAscendant(order)) {
    return [...notes].sort((note1, note2) => {
      if (note1.title < note2.title) {
        return -1;
      }
      if (note1.title > note2.title) {
        return 1;
      }
      return 0;
    });
  } else {
    return [...notes].sort((note1, note2) => {
      if (note1.title < note2.title) {
        return 1;
      }
      if (note1.title > note2.title) {
        return -1;
      }
      return 0;
    });
  }
};

const sortByCreation = (notes: Array<NoteProps>, order: SortOrder) => {
  return [...notes].sort((note1, note2) =>
    isOrderAscendant(order)
      ? note1.createdAt - note2.createdAt
      : note2.createdAt - note1.createdAt
  );
};

const sortByUpdate = (notes: Array<NoteProps>, order: SortOrder) => {
  return [...notes].sort((note1, note2) =>
    isOrderAscendant(order)
      ? note1.updatedAt - note2.updatedAt
      : note2.updatedAt - note1.updatedAt
  );
};

const sortNotes = (notes: Array<NoteProps>, sorting: Sorting) => {
  if (sorting.type === SORTING_TYPES.TITLE) {
    return sortByTitle(notes, sorting.order);
  }
  if (sorting.type === SORTING_TYPES.CREATED) {
    return sortByCreation(notes, sorting.order);
  }
  if (sorting.type === SORTING_TYPES.UPDATED) {
    return sortByUpdate(notes, sorting.order);
  }
  return sortByCreation(notes, "asc");
};

export { sortNotes };
