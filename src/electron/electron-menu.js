const electronShell = require('electron').shell.openExternal;

const github = () => {
  function click() {
    electronShell(
      'https://github.com/Silind/Hue-debugger-UI'
    );
  }
}

const reportIssues = () => {
  function click() {
    electronShell(
      'https://github.com/Silind/Hue-debugger-UI'
    );
  }
}

const menuTemplate = [
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'togglefullscreen' },
      { type: 'separator' },
      { role: 'minimize' },
      { role: 'close' }
    ]
  },
  {
    label: 'Advanced',
    submenu: [
      { role: 'toggledevtools' }
    ]
  },
  {
    label: 'Help',
    submenu: [
      {
        label: 'GitHub',
        github
      },
      {
        label: 'Report an issue',
      }
    ]
  }
];

module.exports = {
  menu: menuTemplate,
};
