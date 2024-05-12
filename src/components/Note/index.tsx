import React from "react";
import Card from "react-bootstrap/Card";
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
    <Card.Body>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Card.Title>{note.title}</Card.Title>
        <Card.Text>{note.text}</Card.Text>
        <Card.Text>{`Создано: ${parseDate(note.createdAt)}`}</Card.Text>
        <Card.Text>{`Последнее изменение: ${parseDate(
          note.updatedAt as number
        )}`}</Card.Text>
      </div>
      <button onClick={() => setIsEditMode(true)}>Редактировать</button>
      <button onClick={() => onDelete()}>Удалить</button>
    </Card.Body>
  );
};

export { Note };
