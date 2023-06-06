import { useEffect, useState } from 'react';
import Client from './lib/client';
import { newDocument } from './lib/helpers';
import EditableDocumentList from './components/EditableDocumentList';
import ToggleableDocumentForm from './components/ToggleableDocumentForm';

const client = new Client();

const DocumentsDashboard = () => {
  const [documents, setDocuments] = useState([]);

  const loadDocumentsFromServer = () => {
    client
      .getDocuments()
      .then((serverDocuments) => setDocuments(serverDocuments));
  };

  const handleCreateFormSubmit = (document) => {
    createDocument(document);
  };

  const handleEditFormSubmit = (attrs) => {
    updateDocument(attrs);
  };

  const handleTrashClick = (documentId) => {
    deleteDocument(documentId);
  };

  const createDocument = (document) => {
    const newDoc = newDocument(document);

    setDocuments([...documents, newDoc]);

    client
      .createDocument(newDoc)
      .then((doc) => {
        setDocuments([...documents, doc]);
      })
      .catch(() => {
        setDocuments([...documents]);
      });
  };

  const updateDocument = (attrs) => {
    const newDocuments = documents.map((document) => {
      if (document.id === attrs.id) {
        return {
          ...attrs,
        };
      } else {
        return document;
      }
    });

    setDocuments(newDocuments);

    client.updateDocument(attrs);
  };

  const deleteDocument = (documentId) => {
    const newDocuments = documents.filter((t) => t.id !== documentId);

    setDocuments(newDocuments);

    client.deleteDocumentById(documentId).catch(() => {
      setDocuments(documents);
    });
  };

  useEffect(() => {
    loadDocumentsFromServer();
    // setInterval(loadDocumentsFromServer, 5000);
  }, []);

  return (
    <div className="ui padded grid">
      <div className="two wide column"></div>
      <div className="eight wide column">
        <EditableDocumentList
          documents={documents}
          onFormSubmit={handleEditFormSubmit}
          onTrashClick={handleTrashClick}
        />
      </div>
      <div className="four wide column">
        <ToggleableDocumentForm onFormSubmit={handleCreateFormSubmit} />
      </div>
      <div className="two wide column"></div>
    </div>
  );
};

export default DocumentsDashboard;
