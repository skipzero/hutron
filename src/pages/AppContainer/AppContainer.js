import React, { Fragment, useEffect, useState } from 'react';
import * as service from '../../services/apiRequestors';
import Menu from '../../components/Menu/Menu';

import * as Console from '../../components/Console/Console';
import LoadSpinner from '../../components/LoadSpinner/LoadSpinner';
import JSONContainer from '../JSONContainer/JSONContainer';

const AppContainer = (props) => {
  const apiUrl = `http://${props.ip}/api/${props.token}`;

  const [refreshCount, setRefreshCount] = useState(0);
  const [failedLoading, setFailedLoading] = useState(false);
  const [failedMessage, setFailedMessage] = useState('');
  const [hueData, setHueData] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [subMenuItems, setSubMenuItems] = useState([]);
  const [activeMenu, setActiveMenu] = useState(0);
  const [activeSubMenu, setActiveSubMenu] = useState(0);
  const [showConsole, setShowConsole] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState([]);

  useEffect(() => {
    requestHueData();
    setInterval(() => {
      setRefreshCount(prevCount => prevCount + 1);
    }, 2000);
  }, []);

  useEffect(() => {
    requestHueData();
  }, [activeMenu, activeSubMenu, refreshCount]);

  const requestHueData = async (options) => {
    try {
      const newMenuItems = await fetchMenuItems('');
      const newSubMenuItems = await fetchMenuItems(newMenuItems[activeMenu].id);

      const dataQuery = newMenuItems[activeMenu].id || '';
      const dataPath = newSubMenuItems[activeSubMenu].id || '';

      const prepareHueData = await fetchHueData(`${dataQuery}/${dataPath}`);

      const newHueData = {
        keyName: newSubMenuItems[activeSubMenu].id,
        data: prepareHueData,
      };

      if (JSON.stringify(newHueData) !== JSON.stringify(hueData) || options.force) {
        setMenuItems(newMenuItems);
        setSubMenuItems(newSubMenuItems);
        setHueData(newHueData);
      }
    } catch (e) {
      setFailedLoading(true);
      setFailedMessage(e.message);
      throw e;
    }
  }

  const fetchMenuItems = async (query) => {
    const result = await service.getJson(`${apiUrl}/${query}`);

    if (result[0]) {
      throw result[0].error.description;
    }

    if (query === 'config') {
      return [];
    }

    return Object.keys(result).map((item) => ({
      id: item,
      name: query ? `${item} : ${result[item].name}` : item.replace(/^\w/, (c) => c.toUpperCase()),
    }));
  };

  const fetchHueData = async (query) => {
    const result = await service.getJson(`${apiUrl}/${query}`);

    if (result[0]) {
      throw result[0].error.description;
    }
    return result;
  };

  const putHueData = async (query, data) => {
    const url = `${apiUrl}/${menuItems[activeMenu].id}/${query}`;

    try {
      const result = await service.putJson(url, data);
      requestHueData({ force: true });
      writeToConsole(result);
    } catch (error) {
      writeToConsole(error);
    }
  };

  const deleteHueData = async (query, data) => {
    const url = `${apiUrl}/${menuItems[activeMenu].id}/${query}`;

    try {
      const result = await service.deleteJson(url, null);
      requestHueData({ force: true });
      writeToConsole(result);
    } catch (error) {
      writeToConsole(error);
    }
  };

  const createNewHueData = async (newHueData) => {
    const url = `${apiUrl}/${menuItems[activeMenu].id}`;

    try {
      const result = await service.putJson(url, newHueData);
      requestHueData({ force: true });
      writeToConsole(result);
    } catch (error) {
      writeToConsole(error);
    }
  }

  const writeToConsole = (write) => setConsoleOutput((prevOut) => [...prevOut, write]);

  const menuClick = (menuIndex) => {
    setActiveMenu(menuIndex);
    setActiveSubMenu(0);
  };

  const subMenuClick = (menuIndex) => {
    setActiveSubMenu(menuIndex);
  };

  const consoleClick = () => {
    setShowConsole((prevShow) => !prevShow);
  }

  if (!hueData) {
    return (
      <LoadSpinner
        isLoading={!failedLoading}
        failMessage={failedMessage}
        backAction={props.removeAuth}
      />
    )
  }

  return (
    <Fragment>
      <div className='mainContainer'>
        <Menu
          key={activeMenu}
          menuItems={menuItems}
          menuClick={menuClick}
          menuSelected={activeMenu}
        />
        <JSONContainer
          jsonData={hueData}
          subMenuItems={subMenuItems}
          putHueData={putHueData}
          deleteHueData={deleteHueData}
          createNewHueData={createNewHueData}
          writeToConsole={writeToConsole}
          subMenuClick={subMenuClick}
          activeSubMenu={activeSubMenu}
          showAlertDialog={props.showAlertDialog}
        />
      </div>
      <Console show={showConsole} toggleConsole={consoleClick} consoleOutput={consoleOutput} />
    </Fragment>
  );
};

export default AppContainer;
