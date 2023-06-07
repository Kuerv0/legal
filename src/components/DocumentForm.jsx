/* eslint-disable react/prop-types */
import { useState } from 'react';
import { newDocument } from '../lib/helpers';

const DocumentForm = ({ onFormSubmit, onFormClose, document = {} }) => {
  const submitText = document.id ? 'Actualizar' : 'Crear';
  const [state, setState] = useState(newDocument({ ...document }));

  const handleTypeChange = (e) => {
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
    <div className="ui formulario">
      <div className="content">
        <form className="ui form" onSubmit={handleSubmit}>
          <div className="field">
            <label>Tipo</label>

            <select name="tipo" id="tipo" onChange={handleTypeChange} value={state.tipo}>
              <option value="Acuerdo">Acuerdo</option>
              <option value="Acta">Acta</option>
              <option value="Circular">Circular</option>
              <option value="Circular conjunta">Circular conjunta</option>
              <option value="Concepto">Concepto</option>
              <option value="Convención colectiva">Convención colectiva</option>
              <option value="Decreto">Decreto</option>
              <option value="Documento de relatoría">Documento de relatoría</option>
              <option value="Instructivo">Instructivo</option>
              <option value="Ley">Ley</option>
              <option value="Linea jurisprudencial">Linea jurisprudencial</option>
              <option value="Nota">Nota</option>
              <option value="Resolución">Resolución</option>
              <option value="Sentencia">Sentencia</option>
            </select>
          </div>

          <div className="field">
            <label>Número</label>
            <input
              type="number"
              value={state.numero}
              onChange={handleNumeroChange}
              min={1}
              max={999}
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
            <button type="submit" className="ui basic green button">
              {submitText}
            </button>
            <button
              type="button"
              className="ui basic red button"
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
