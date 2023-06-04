import EditableDocument from './EditableDocument';

/* eslint-disable react/prop-types */
const EditableDocumentList = ({
  documents,
  onFormSubmit,
  onTrashClick,
  onStartClick,
  onStopClick,
}) => {
  const docs = documents.map((document) => (
    <EditableDocument
      key={document.id}
      id={document.id}
      title={document.title}
      description={document.description}
      elapsed={document.elapsed}
      runningSince={document.runningSince}
      onFormSubmit={onFormSubmit}
      onTrashClick={onTrashClick}
      onStartClick={onStartClick}
      onStopClick={onStopClick}
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
