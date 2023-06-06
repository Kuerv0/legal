/* eslint-disable react/prop-types */

const Document = ({ document, onEditClick, onTrashClick }) => {
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

  return (
    <div className="item documento">
      <div className="icon">
        <i className="huge file alternate outline icon" />
      </div>

      <div className="content">
        <a href="document.id">
          {document.tipo.charAt(0).toUpperCase() + document.tipo.slice(1)} {String(document.numero).padStart(2, "0")} de {document.anio} {}
        </a>

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
