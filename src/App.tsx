import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import { Note, NoteForm } from "./components";
import { NoteProps, SortOrder, SortType, Sorting } from "./types";
import { DEFAULT_SORTING, NOTE_PLACEHOLDER, SORTING_TYPES } from "./constants";
import { sortNotes } from "./shared/sort";
import "./App.css";

function App() {
  const getNotesFromStorage = (): Array<NoteProps> => {
    const notesString = localStorage.getItem("notes");
    if (notesString) {
      return JSON.parse(notesString);
    }
    return [];
  };

  const saveNote = (note: NoteProps) => {
    setNoteList([...noteList, note]);
  };

  const editNote = (note: NoteProps) => {
    setNoteList([...noteList.filter((n) => n.id !== note.id), note]);
  };

  const deleteNote = (id: string) => {
    setNoteList([...noteList.filter((note) => note.id !== id)]);
  };

  const [noteList, setNoteList] = React.useState<Array<NoteProps>>(
    getNotesFromStorage()
  );

  React.useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(noteList));
  }, [noteList]);

  const [currentSorting, setCurrentSorting] =
    React.useState<Sorting>(DEFAULT_SORTING);

  const handleChangeSortingType = (type: SortType) => {
    setCurrentSorting({ ...currentSorting, type });
  };

  const handleChangeSortingOrder = (order: SortOrder) => {
    setCurrentSorting({ ...currentSorting, order });
  };

  React.useEffect(() => {
    setNoteList(sortNotes(noteList, currentSorting));
  }, [currentSorting]);

  return (
    <Container fluid>
      <Col md>
        <select
          value={currentSorting.type}
          onChange={(e) => {
            const type = e.target.value as SortType;
            if (Object.values(SORTING_TYPES).includes(type)) {
              handleChangeSortingType(type);
            }
          }}
        >
          <option value="title">По заголовку</option>
          <option value="createdAt">По дате создания</option>
          <option value="updatedAt">По дате редактирования</option>
        </select>
        <select
          onChange={(e) => {
            const order = e.target.value as SortOrder;
            handleChangeSortingOrder(order);
          }}
        >
          <option value="asc">По возрастанию</option>
          <option value="desc">По убыванию</option>
        </select>
        <NoteForm note={NOTE_PLACEHOLDER} onSave={saveNote} />
        {noteList.map((note, index) => (
          <Note
            note={note}
            key={index}
            onEdit={(newNote: NoteProps) => editNote(newNote)}
            onDelete={() => deleteNote(note.id)}
          />
        ))}
      </Col>
    </Container>
  );
}

export default App;
