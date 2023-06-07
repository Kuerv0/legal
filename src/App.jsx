import { useEffect, useState } from 'react';
import Client from './lib/client';
import { newDocument } from './lib/helpers';
import EditableDocumentList from './components/EditableDocumentList';
import ToggleableDocumentForm from './components/ToggleableDocumentForm';
import Modal from 'react-modal';

const client = new Client();

const DocumentsDashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState([])

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

  const handleOpenModal = (titulo, informacion) => {
    setShowModal(true);
    setModalContent([titulo, informacion])
  }
  
  const handleCloseModal = () => {
    setShowModal(false);
    setModalContent([])
  }

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
          handleOpenModal={handleOpenModal}
        />
      </div>
      <div className="four wide column">
        <ToggleableDocumentForm onFormSubmit={handleCreateFormSubmit} />
      </div>
      <div className="two wide column"></div>

      <Modal
        isOpen={showModal}
        contentLabel="Modal documento"
        ariaHideApp={false}
      >
        <div className='closeModalDocument'>
          <button onClick={handleCloseModal} className='ui basic red button'>X</button>
        </div>

        <h2 className='titleModalDocument'>{modalContent[0]}</h2>

        <p className='textModalDocument'>
          {modalContent[1]}
        </p>

        <div className='centerModalDocument'>
          <button onClick={handleCloseModal} className='ui basic red button'>Cerrar</button>
        </div>
      </Modal>
    </div>
  );
};

export default DocumentsDashboard;
