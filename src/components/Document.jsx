/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { renderElapsedString } from '../lib/helpers';

const Document = ({
  id,
  title,
  description,
  runningSince,
  elapsed,
  onEditClick,
  onTrashClick,
  onStartClick,
  onStopClick,
}) => {
  // eslint-disable-next-line no-unused-vars
  const elapsedString = renderElapsedString(elapsed, runningSince);

  // eslint-disable-next-line no-unused-vars
  const handleStartClick = () => {
    onStartClick(id);
  };

  // eslint-disable-next-line no-unused-vars
  const handleStopClick = () => {
    onStopClick(id);
  };

  const handleTrashClick = () => {
    onTrashClick(id);
  };

  useEffect(() => {
    const forceUpdateInterval = setInterval(() => this.forceUpdate(), 50);

    return () => {
      clearInterval(forceUpdateInterval);
    };
  }, []);

  return (
    <div className="item">
      <div className="icon">
        <i className="huge file alternate outline icon" />
      </div>

      <div className="content">
        <a href="#">{title}</a>

        <div className="description">
          <span>{description}</span>
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
