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

  const handleNumeroChange = (e) => {
    setState({ ...state, numero: e.target.value });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    onFormSubmit({
      ...state,
      numero: Number.parseInt(state.numero),
    });
  };

  return (
    <div className="ui centered card">
      <div className="content">
        <form className="ui form" onSubmit={handleSubmit}>
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
          <div className="field">
            <label>Número</label>
            <input
              type="number"
              value={state.numero}
              onChange={handleNumeroChange}
            />
          </div>
          <div className="ui two bottom attached buttons">
            <button type="submit" className="ui basic green button">
              {submitText}
            </button>
            <button
              type="button"
              className="ui basic button"
              onClick={onFormClose}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DocumentForm;
