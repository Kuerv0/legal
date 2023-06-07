import EditableDocument from './EditableDocument';

/* eslint-disable react/prop-types */
const EditableDocumentList = ({ documents, onFormSubmit, onTrashClick, handleOpenModal }) => {
  const docs = documents.map((document) => (
    <EditableDocument
      key={document.id}
      document={document}
      onFormSubmit={onFormSubmit}
      onTrashClick={onTrashClick}
      handleOpenModal={handleOpenModal}
    />
  ));

  if (docs.length === 0) {
    return (
      <div className="ui basic segment">
        <div className="ui header">
          <h3>No se han encontrado documentos.</h3>
        </div>
      </div>
    );
  } else {
    return (
      <div className="ui items" id="documents">
        {docs}
      </div>
    );
  }
};

export default EditableDocumentList;
