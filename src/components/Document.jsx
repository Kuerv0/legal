/* eslint-disable react/prop-types */

const Document = ({ document, onEditClick, onTrashClick }) => {
  const handleTrashClick = () => {
    onTrashClick(document.id);
  };

  return (
    <div className="item">
      <div className="icon">
        <i className="huge file alternate outline icon" />
      </div>

      <div className="content">
        <a href="#">{document.tipo}</a>

        <div className="description">
          <span>{document.informacion}</span>
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
