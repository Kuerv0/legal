/* eslint-disable react/prop-types */
import { useState } from 'react';
import Document from './Document';
import DocumentForm from './DocumentForm';

const EditableDocument = ({
  id,
  title,
  description,
  runningSince,
  elapsed,
  onTrashClick,
  onStartClick,
  onStopClick,
  onFormSubmit,
}) => {
  const [editFormOpen, setEditFormOpen] = useState(false);

  const handleEditClick = () => {
    openForm();
  };

  const handleFormClose = () => {
    closeForm();
  };

  const handleSubmit = (document) => {
    onFormSubmit(document);
    closeForm();
  };

  const closeForm = () => {
    setEditFormOpen(false);
  };

  const openForm = () => {
    setEditFormOpen(true);
  };

  if (editFormOpen) {
    return (
      <DocumentForm
        id={id}
        title={title}
        description={description}
        onFormSubmit={handleSubmit}
        onFormClose={handleFormClose}
      />
    );
  } else {
    return (
      <Document
        id={id}
        title={title}
        description={description}
        elapsed={elapsed}
        runningSince={runningSince}
        onEditClick={handleEditClick}
        onTrashClick={onTrashClick}
        onStartClick={onStartClick}
        onStopClick={onStopClick}
      />
    );
  }
};

export default EditableDocument;
