/* eslint-disable react/prop-types */

const Document = ({ document, onEditClick, onTrashClick, handleOpenModal }) => {
  const handleTrashClick = () => {
    onTrashClick(document.id);
  };

  const cleanText = (str) => {
    // Limpiar la información y los caracteres especiales
    str = str.replace(/[\n\t]/g, " ");
    str = str.replace(/\s+/g, ' ').trim()
    str = '"Por el cual se ' + str.replace(/.*Por .+ cual se/g, '')

    // Cortar el texto en el caracter 500 y poner puntos suspensivos
    if (str.length > 500) {
      str = str.slice(0, 500) + " ..."
    }

    return str
  }
  
  const cleanModalText = (str) => {
    // Limpiar la información y los caracteres especiales
    str = str.replace(/\t/g, ' ').trim();
    str = str.replace(/\n\s*\n/g, '\n\n')
    str = str.replace(/  +/g, ' ');
    str = str.replace("Grabando...", '');
  
    return str
  }

  const titulo = `${document.tipo.charAt(0).toUpperCase() + document.tipo.slice(1)} ${String(document.numero).padStart(2, "0")} de ${document.anio}`

  return (
    <div className="item documento">
      <div className="icon">
        <i className="huge file alternate outline icon" onClick={() => handleOpenModal(titulo, cleanModalText(document.informacion))}/>
      </div>

      <div className="content">
        <p onClick={() => handleOpenModal(titulo, cleanModalText(document.informacion))} className="tituloDocumento">
          {titulo}
        </p>

        <div className="description">
            {cleanText(document.informacion)}
        </div>

        <div className="meta">
          <span className="right floated edit icon" onClick={onEditClick}>
            <i className="edit icon" />
          </span>
          <span className="right floated trash icon" onClick={handleTrashClick}>
            <i className="trash icon" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Document;
