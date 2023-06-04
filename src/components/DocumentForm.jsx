/* eslint-disable react/prop-types */
import { useState } from 'react';

const DocumentForm = ({
  onFormSubmit,
  onFormClose,
  id = undefined,
  title = '',
  description = '',
}) => {
  const submitText = id ? 'Actualizar' : 'Crear';
  const [state, setState] = useState({ title, description });

  const handleTitleChange = (e) => {
    setState({ ...state, title: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    setState({ ...state, description: e.target.value });
  };

  const handleSubmit = () => {
    onFormSubmit({
      id,
      title: state.title,
      description: state.description,
    });
  };

  return (
    <div className="ui centered card">
      <div className="content">
        <div className="ui form">
          <div className="field">
            <label>Título</label>
            <input
              type="text"
              value={state.title}
              onChange={handleTitleChange}
            />
          </div>
          <div className="field">
            <label>Descripción</label>
            <textarea
              type="text"
              value={state.description}
              onChange={handleDescriptionChange}
            />
          </div>
          <div className="ui two bottom attached buttons">
            <button className="ui basic green button" onClick={handleSubmit}>
              {submitText}
            </button>
            <button className="ui basic button" onClick={onFormClose}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentForm;
