import { faEdit, faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
import { auth, db } from "../../../firebase-config";

interface ITemplateProps {
  field: string;
  id: string;
  clientId: string;
  getClient(): void;
  editField(inputText: string, id: string): void;
}
export const EditFieldClient = (props: ITemplateProps) => {
  const editIcon = <FontAwesomeIcon icon={faEdit} />;
  const deleteIcon = <FontAwesomeIcon icon={faTimesCircle} />;
  const [inputText, setInputText] = useState<string>(props.field)
  const currentUser = auth.currentUser;
  const [editMode, setEditMode] = useState(false)

  const deleteField = async () => {
    if (!props.id || !currentUser) return;
    const fieldDoc = doc(
      db,
      "coaches",
      currentUser.uid,
      "clients",
      props.clientId,
      "template",
      props.id
    );
    await deleteDoc(fieldDoc);
    props.getClient();
  };

  const editField = async (e: React.FormEvent) => {
    e.preventDefault();
    props.editField(inputText, props.id)
    setEditMode(false)
  }

  return (
    <div className="row p-h-2 p-v-2 justify-between bg-light-gray edit-field">
      <div>
          {editMode ? (
              <form onSubmit={(e) => {editField(e)}}>
                  <input type="text" value={inputText} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setInputText(e.target.value)}}/>
              </form>
          ): (
            <p>{props.field}</p>
          )}
      
      </div>
      <div className="row">
        <button className="icon clr-yellow p-l-1" onClick={() => setEditMode(!editMode)}>{editIcon}</button>
        <button className="icon clr-danger p-l-1" onClick={deleteField}>
          {deleteIcon}
        </button>
      </div>
    </div>
  );
};
