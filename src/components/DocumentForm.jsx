/* eslint-disable react/prop-types */
import { useState } from 'react';
import { newDocument } from '../lib/helpers';

const DocumentForm = ({ onFormSubmit, onFormClose, document = {} }) => {
  const submitText = document.id ? 'Actualizar' : 'Crear';
  const [state, setState] = useState(newDocument({ ...document }));

  const handleTitleChange = (e) => {
    setState({ ...state, tipo: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    setState({ ...state, informacion: e.target.value });
  };

  const handleSubmit = () => {
    onFormSubmit({
      ...state,
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
              value={state.tipo}
              onChange={handleTitleChange}
            />
          </div>
          <div className="field">
            <label>Descripción</label>
            <textarea
              type="text"
              value={state.informacion}
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
