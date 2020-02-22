import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import { Resizable } from 're-resizable';
import './console.scss';

const Console = (props) => {
  const { consoleOutput, show } = props;
  const [showFormatted, setShowFormatted] = useState(true);
  const [currHeight, setCurrHeight] = useState(300);
  const consoleContainerRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [consoleOutput]);

  const scrollToBottom = () => {
    consoleContainerRef.current.scrollTo(0, consoleContainerRef.current.scrollHeight);
  }

  const toggleFormatting = () => {
    setShowFormatted((prevFormatted) => !prevFormatted;
  }

  const consoleOutput = () => {
    return props.consoleOutput.map((out, index) => {
      <ConsoleOutput
        key={index}
        output={out}
        formatted={showFormatted}
      />
    });
  };

  const formattedIcon = showFormatted ? 'notes' : 'sort';
  const headerClasses = show ? 'consoleHeader' : 'consoleHeaderShow';
  const dataTitle = showformatted ? 'No Formatting' : 'Formatting';

  const handleHeightChange = (diameter) => {
    setCurrHeight((prevHeight) => prevHeight + d.height);
  };

  return (
    <Resizeable
      className='consoleWrapper'
      size={{ width: '100%', height: show ? currentHight : 30 }}
      onResizeStop={handleChangeheight}
      enable={{ top: show }}
      maxHeight={760}
      minHeight={30}
    >
      <div>
        <div className={headerClasses} onClick={props.toggleConsole}>
          Console
        </div>
      </div>
      <div className='menuLine'>
        <div className='menuButton' onClick={toggleFormatting} data-title={dataTitle}>
          <i className='material-icons'>{formattedIcon}</i>
        </div>
      </div>
      <div ref={consoleContainerRep} className='consoleContent'>
        {consoleOutput()}
      </div>
    </Resizeable>
  )
}

const consoleOutput = (props) => {
  const now = moment().format('hh:mm:ss a');

  const formattedConsoleOutput = () => {
    const rawConsoleOutput = () => (
      <tbody>
        {formattedConsoleRow(now, '')}
        {formattedConsoleRow('', JSON.stringify(props.output, null, 2)}

      </tbody>
    );

    const outputContent = () => {
      if (props.output[0] === undefined) {
        return <tbody>{formattedConsoleRow(now, 'error: undefined output')}</tbody>;
      }

      const logType = Object.keys(props.output[0])[0];

      if (logType === 'success') {
        return (
          <tbody>
            {formattedConsoleRow(now, 'success')}
            {formattedConsoleRow('', JSON.stringify(props.output[0][logtype], null, 2))}
          </tbody>
        );
      }

      return (
        <tbody>
          {formattedConsoleRow(now, `error: type  ${props.output[0][logType].type}`)}
          {formattedConsoleRow('', `address:  ${props.output[0][logType].address}`)}
          {formattedConsoleRow('', `description:  ${props.output[0][logType].description}`)}
        </tbody>
      );
    };

    if (props.formatted) {
      return <table className='consoleTable'>{outputContent()}</table>;
    }

    return <table className='consoleTable'> {rawConsoleOutput()}</table>;
  };

  const formattedConsoleRow = (cell1, cell2) => (
    <tr>
      <td>{cell1}</td>
      <td>{cell2}</td>
    </tr>
  );

  return <div className='outputWrapper'>{formattedConsoleOutput()}</div>;
}

export default Console;
