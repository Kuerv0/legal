/* eslint-disable react/prop-types */
import { useState } from 'react';
import DocumentForm from './DocumentForm';

const ToggleableDocumentForm = ({ onFormSubmit }) => {
  const [isOpen, setIsOpen] = useState();

  const handleFormOpen = () => {
    setIsOpen(true);
  };

  const handleFormClose = () => {
    setIsOpen(false);
  };

  const handleFormSubmit = (document) => {
    onFormSubmit(document);
    setIsOpen(false);
  };

  if (isOpen) {
    return (
      <DocumentForm
        onFormSubmit={handleFormSubmit}
        onFormClose={handleFormClose}
      />
    );
  } else {
    return (
      <div className="ui basic content center aligned segment">
        <button className="ui button" onClick={handleFormOpen} id="button">
          <i className="plus icon" /> Crear
        </button>
      </div>
    );
  }
};

export default ToggleableDocumentForm;
