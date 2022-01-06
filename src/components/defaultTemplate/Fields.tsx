import { useEffect, useState } from "react";
import { collection, getDocs, query, where, updateDoc, arrayUnion, setDoc, addDoc, doc, deleteDoc} from "firebase/firestore";
import { auth, db } from "../../firebase-config";


interface IProps {
  field: string;
  id: string;
  coachId: string | null;
  defaultTemplate: Array<T>;
  checkDefaultTemplate():void
}

interface T {
    field: string
}

export const Fields = (props: IProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [newField, setNewField] = useState("");
  const coach = JSON.parse(localStorage.getItem("user") || "");
  const [id, setId] = useState('')



  const findUserInDb = async () => {
      const q = query(
        collection(db, "coaches"),
        where("coachId", "==", coach.id)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.docs.map(async (doc) => {
          setId(doc.id)
      });
  }


  const deleteField = async () => {
    if (!props.coachId) return
    const fieldDoc = doc(db, 'coaches', props.coachId, 'defaultTemplate', props.id)
    await deleteDoc(fieldDoc)

props.checkDefaultTemplate()
    
  }

  const saveField = async () => {
    console.log('save field')
  }

  useEffect(() => {
      findUserInDb();
  }, [])


  return (
    <div className="row p-v-1">
      {!isEdit ? (
        <>
          <p>{props.field}</p>
          <button onClick={() => setIsEdit(!isEdit)}>Edit</button>
          <button onClick={deleteField}>Delete</button>
        </>
      ) : (
        <form onSubmit={(e) => saveField()}>
          <input
            type="text"
            placeholder={props.field}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setNewField(e.target.value);
            }}
            value={newField}
          ></input>
          <button type="submit" className="purple-btn">Save</button>
          <button onClick={() => setIsEdit(!isEdit)} className="purple-btn">Cancel</button>
        </form>
      )}
    </div>
  );
};
