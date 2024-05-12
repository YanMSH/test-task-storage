import React from "react";
import { NoteProps } from "../../types";
import { NoteForm } from "../";

const Note = ({
  note,
  onEdit,
  onDelete,
}: {
  note: NoteProps;
  onEdit: (note: NoteProps) => void;
  onDelete: () => void;
}) => {
  const [isEditMode, setIsEditMode] = React.useState(false);

  const parseDate = (dateNumber: number): string => {
    const date = new Date(dateNumber);
    return `${date.getDate()}.${
      date.getMonth() + 1
    }.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  };

  return isEditMode ? (
    <NoteForm
      note={note}
      onSave={(note) => {
        onEdit(note);
        setIsEditMode(false);
      }}
      isEdit
    />
  ) : (
    <div style={{ display: "flex" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>{note.title}</div>
        <div>{note.text}</div>
        <div>{`Создано ${parseDate(note.createdAt)}`}</div>
        <div>{`Последнее изменение ${parseDate(
          note.updatedAt as number
        )}`}</div>
      </div>
      <button onClick={() => setIsEditMode(true)}>Редактировать</button>
      <button onClick={() => onDelete()}>Удалить</button>
    </div>
  );
};

export { Note };
