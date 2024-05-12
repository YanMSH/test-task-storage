import React from "react";
import { v4 as idv4 } from "uuid";
import { NoteProps } from "../../types";
import { NOTE_PLACEHOLDER } from "../../constants";

const NoteForm = (props: {
  note: NoteProps;
  onSave: (note: NoteProps) => void;
  isEdit?: boolean;
}) => {
  const [note, setNote] = React.useState<NoteProps>(props.note);

  const resetForm = () => {
    setNote(NOTE_PLACEHOLDER);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newNote = {
      ...note,
      id: props.isEdit ? note.id : idv4(),
      createdAt: props.isEdit ? note.createdAt : Date.now(),
      updatedAt: Date.now(),
    };
    props.onSave(newNote);
    resetForm();
  };

  const handleTitleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    setNote({ ...note, title: value });
  };

  const handleTextChange = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const value = (e.target as HTMLTextAreaElement).value;
    setNote({ ...note, text: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" onChange={handleTitleChange} value={note.title} />
      <textarea name="text" onChange={handleTextChange} value={note.text} />
      <button type="submit">Сохранить</button>
    </form>
  );
};

export { NoteForm };
