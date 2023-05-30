import { off, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";

import { database } from "config";
import { useAuth } from "contexts/auth";

export default function useNotesQuery() {
  const [data, setData] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.uid) return;
    const notesRef = ref(database, `/notes/${user?.uid}`);

    onValue(notesRef, (snapshot) => {
      if (snapshot.val()) {
        setData(Object.values(snapshot.val()));
      }
    });

    return () => {
      off(notesRef);
    };
  }, [user]);

  return { data };
}
