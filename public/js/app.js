class DocumentsDashboard extends React.Component {
  state = {
    documents: [],
  };

  componentDidMount() {
    this.loadDocumentsFromServer();
    setInterval(this.loadDocumentsFromServer, 5000);
  }

  loadDocumentsFromServer = () => {
    client.getDocuments((serverDocuments) => (
        this.setState({ documents: serverDocuments })
      )
    );
  };

  handleCreateFormSubmit = (document) => {
    this.createDocument(document);
  };

  handleEditFormSubmit = (attrs) => {
    this.updateDocument(attrs);
  };

  handleTrashClick = (documentId) => {
    this.deleteDocument(documentId);
  };

  handleStartClick = (documentId) => {
    this.startDocument(documentId);
  };

  handleStopClick = (documentId) => {
    this.stopDocument(documentId);
  };

  createDocument = (document) => {
    const t = helpers.newDocument(document);
    this.setState({
      documents: this.state.documents.concat(t),
    });

    client.createDocument(t);
  };

  updateDocument = (attrs) => {
    this.setState({
      documents: this.state.documents.map((document) => {
        if (document.id === attrs.id) {
          return Object.assign({}, document, {
            title: attrs.title,
            description: attrs.description,
          });
        } else {
          return document;
        }
      }),
    });

    client.updateDocument(attrs);
  };

  deleteDocument = (documentId) => {
    this.setState({
      documents: this.state.documents.filter(t => t.id !== documentId),
    });

    client.deleteDocument(
      { id: documentId }
    );
  };

  startDocument = (documentId) => {
    const now = Date.now();

    this.setState({
      documents: this.state.documents.map((document) => {
        if (document.id === documentId) {
          return Object.assign({}, document, {
            runningSince: now,
          });
        } else {
          return document;
        }
      }),
    });

    client.startDocument(
      { id: documentId, start: now }
    );
  };

  stopDocument = (documentId) => {
    const now = Date.now();

    this.setState({
      documents: this.state.documents.map((document) => {
        if (document.id === documentId) {
          const lastElapsed = now - document.runningSince;
          return Object.assign({}, document, {
            elapsed: document.elapsed + lastElapsed,
            runningSince: null,
          });
        } else {
          return document;
        }
      }),
    });

    client.stopDocument(
      { id: documentId, stop: now }
    );
  };

  render() {
    return (
      <div className='ui three column centered grid'>
        <div className='ui centered items'>
          <EditableDocumentList
            documents={this.state.documents}
            onFormSubmit={this.handleEditFormSubmit}
            onTrashClick={this.handleTrashClick}
            onStartClick={this.handleStartClick}
            onStopClick={this.handleStopClick}
          />
          <ToggleableDocumentForm
            onFormSubmit={this.handleCreateFormSubmit}
          />
        </div>
      </div>
    );
  }
}

class ToggleableDocumentForm extends React.Component {
  state = {
    isOpen: false,
  };

  handleFormOpen = () => {
    this.setState({ isOpen: true });
  };

  handleFormClose = () => {
    this.setState({ isOpen: false });
  };

  handleFormSubmit = (document) => {
    this.props.onFormSubmit(document);
    this.setState({ isOpen: false });
  };

  render() {
    if (this.state.isOpen) {
      return (
        <DocumentForm
          onFormSubmit={this.handleFormSubmit}
          onFormClose={this.handleFormClose}
        />
      );
    } else {
      return (
        <div className='ui basic content center aligned segment'>
          <button
            className='ui basic button icon'
            onClick={this.handleFormOpen}
          >
            <i className='plus icon' />
          </button>
        </div>
      );
    }
  }
}

class EditableDocumentList extends React.Component {
  render() {
    const documents = this.props.documents.map((document) => (
      <EditableDocument
        key={document.id}
        id={document.id}
        title={document.title}
        description={document.description}
        elapsed={document.elapsed}
        runningSince={document.runningSince}
        onFormSubmit={this.props.onFormSubmit}
        onTrashClick={this.props.onTrashClick}
        onStartClick={this.props.onStartClick}
        onStopClick={this.props.onStopClick}
      />
    ));
    return (
      <div className="ui items" id='documents'>
        {documents}
      </div>
    );
  }
}

class EditableDocument extends React.Component {
  state = {
    editFormOpen: false,
  };

  handleEditClick = () => {
    this.openForm();
  };

  handleFormClose = () => {
    this.closeForm();
  };

  handleSubmit = (document) => {
    this.props.onFormSubmit(document);
    this.closeForm();
  };

  closeForm = () => {
    this.setState({ editFormOpen: false });
  };

  openForm = () => {
    this.setState({ editFormOpen: true });
  };

  render() {
    if (this.state.editFormOpen) {
      return (
        <DocumentForm
          id={this.props.id}
          title={this.props.title}
          description={this.props.description}
          onFormSubmit={this.handleSubmit}
          onFormClose={this.handleFormClose}
        />
      );
    } else {
      return (
        <Document
          id={this.props.id}
          title={this.props.title}
          description={this.props.description}
          elapsed={this.props.elapsed}
          runningSince={this.props.runningSince}
          onEditClick={this.handleEditClick}
          onTrashClick={this.props.onTrashClick}
          onStartClick={this.props.onStartClick}
          onStopClick={this.props.onStopClick}
        />
      );
    }
  }
}

class Document extends React.Component {
  componentDidMount() {
    this.forceUpdateInterval = setInterval(() => this.forceUpdate(), 50);
  }

  componentWillUnmount() {
    clearInterval(this.forceUpdateInterval);
  }

  handleStartClick = () => {
    this.props.onStartClick(this.props.id);
  };

  handleStopClick = () => {
    this.props.onStopClick(this.props.id);
  };

  handleTrashClick = () => {
    this.props.onTrashClick(this.props.id);
  };

  render() {
    // El elapsedString se puede convertir a fechas, por eso no
    // lo quité
    const elapsedString = helpers.renderElapsedString(
      this.props.elapsed, this.props.runningSince
    );

    return (
      <div className='item'>

        <div className="image">
          <img href="#" src="./images/hola.jpg"/>
        </div>

        <div className="content">
          <a href="#">{this.props.title}</a>

          <div className="description">
            <span>{this.props.description}</span>
          </div>

          <div className="meta">
            <span
              className='right floated edit icon'
              onClick={this.props.onEditClick}
            >
              <i className='edit icon' />
            </span>
            <span
              className='right floated trash icon'
              onClick={this.handleTrashClick}
            >
              <i className='trash icon' />
            </span>
          </div>

        </div>
      </div>
    );
  }
}

class DocumentActionButton extends React.Component {
  render() {
    if (this.props.documentIsRunning) {
      return (
        <div
          className='ui bottom attached red basic button'
          onClick={this.props.onStopClick}
        >
          Stop
        </div>
      );
    } else {
      return (
        <div
          className='ui bottom attached green basic button'
          onClick={this.props.onStartClick}
        >
          Start
        </div>
      );
    }
  }
}

class DocumentForm extends React.Component {
  state = {
    title: this.props.title || '',
    description: this.props.description || '',
  };

  handleTitleChange = (e) => {
    this.setState({ title: e.target.value });
  };

  handleDescriptionChange = (e) => {
    this.setState({ description: e.target.value });
  };

  handleSubmit = () => {
    this.props.onFormSubmit({
      id: this.props.id,
      title: this.state.title,
      description: this.state.description,
    });
  };

  render() {
    const submitText = this.props.id ? 'Actualizar' : 'Crear';
    return (
      <div className='ui centered card'>
        <div className='content'>
          <div className='ui form'>
            <div className='field'>
              <label>Título</label>
              <input
                type='text'
                value={this.state.title}
                onChange={this.handleTitleChange}
              />
            </div>
            <div className='field'>
              <label>Descripción</label>
              <input
                type='text'
                value={this.state.description}
                onChange={this.handleDescriptionChange}
              />
            </div>
            <div className='ui two bottom attached buttons'>
              <button
                className='ui basic blue button'
                onClick={this.handleSubmit}
              >
                {submitText}
              </button>
              <button
                className='ui basic red button'
                onClick={this.props.onFormClose}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <DocumentsDashboard />,
  document.getElementById('content')
);

