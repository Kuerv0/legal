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

  const handleStartClick = (documentId) => {
    startDocument(documentId);
  };

  const handleStopClick = (documentId) => {
    stopDocument(documentId);
  };

  const createDocument = (document) => {
    const t = newDocument(document);
    setDocuments([...documents, t]);

    client.createDocument(t);
  };

  const updateDocument = (attrs) => {
    const newDocuments = documents.map((document) => {
      if (document.id === attrs.id) {
        return Object.assign({}, document, {
          title: attrs.title,
          description: attrs.description,
        });
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

    client.deleteDocument({ id: documentId });
  };

  const startDocument = (documentId) => {
    const now = Date.now();
    const newDocuments = documents.map((document) => {
      if (document.id === documentId) {
        return Object.assign({}, document, {
          runningSince: now,
        });
      } else {
        return document;
      }
    });

    setDocuments(newDocuments);

    client.startDocument({ id: documentId, start: now });
  };

  const stopDocument = (documentId) => {
    const now = Date.now();
    const newDocuments = documents.map((document) => {
      if (document.id === documentId) {
        const lastElapsed = now - document.runningSince;
        return Object.assign({}, document, {
          elapsed: document.elapsed + lastElapsed,
          runningSince: null,
        });
      } else {
        return document;
      }
    });

    setDocuments(newDocuments);

    client.stopDocument({ id: documentId, stop: now });
  };

  useEffect(() => {
    loadDocumentsFromServer();
    setInterval(loadDocumentsFromServer, 5000);
  }, []);

  return (
    <div className="ui padded grid">
      <div className="two wide column"></div>
      <div className="eight wide column">
        <EditableDocumentList
          documents={documents}
          onFormSubmit={handleEditFormSubmit}
          onTrashClick={handleTrashClick}
          onStartClick={handleStartClick}
          onStopClick={handleStopClick}
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
