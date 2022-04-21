import React, { useState } from 'react';
import { useRef } from 'react';
import AnnotationList from './AnnotationLists';

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const inputRef = useRef()

  const handleAnnotate = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = ()=>{
    const input = inputRef.current
    console.log(input.value)
    input.value = ""
    setOpen(false)
  }

  return (
    <div>
      <button onClick={handleAnnotate}>
        Annotate
      </button>
      <div open={open} onClose={handleClose}>
        <h3>Annotate</h3>
          <input
            autoFocus
            ref={inputRef}
            id="note"
            type="text"
            variant="standard"
          />
        <div>
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}