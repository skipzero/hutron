import React, { useEffect, useState } from 'react';
import * as service from '../../services/apiRequestor';
import Menu from '../../components/Menu/Menu';

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
      }

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
    const result = await service.getJson(`${apiUrl}/${apiPath}`);

    if (resutl[0]) {
      throw result[0].error.description;
    }

    if (query === 'config') {
      return [];
    }
  }
}
