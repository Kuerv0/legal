/* eslint-disable react/prop-types */
const DocumentActionButton = ({
  documentIsRunning,
  onStartClick,
  onStopClick,
}) => {
  if (documentIsRunning) {
    return (
      <div
        className="ui bottom attached red basic button"
        onClick={onStopClick}
      >
        Stop
      </div>
    );
  } else {
    return (
      <div
        className="ui bottom attached green basic button"
        onClick={onStartClick}
      >
        Start
      </div>
    );
  }
};

export default DocumentActionButton;
