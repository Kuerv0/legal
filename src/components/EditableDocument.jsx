/* eslint-disable react/prop-types */
import { useState } from 'react';
import Document from './Document';
import DocumentForm from './DocumentForm';

const EditableDocument = ({ document, onTrashClick, onFormSubmit }) => {
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
        document={document}
        onFormSubmit={handleSubmit}
        onFormClose={handleFormClose}
      />
    );
  } else {
    return (
      <Document
        document={document}
        onEditClick={handleEditClick}
        onTrashClick={onTrashClick}
      />
    );
  }
};

export default EditableDocument;
