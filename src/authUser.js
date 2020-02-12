const v3 = require('node-hue-api').v3;
const discover = v3.discovery;
const hapi = v3.api;

const appName = 'node-hue-api';
const deviceName = 'example-code';

async function discoverBridge() {
  const discoveryResult = await discover.nupnpSearch();

  if (discoveryResult.length === 0) {
    return null;
  } else {
    return discoveryResult[0].ipaddress;
  }
}

async function discoverAndCreateUser() {
  const ipAddress = await discoverBridge();

  const unauthApi = await hapi.createLocal(ipAddress).connect();

  let createdUser;

  try {
    createdUser = await unauthApi.users.createuser(appName, deviceName);

    const authApi = await hapi.createdLocal(ipAddress).connect(createdUser.userName);
    const bridgeConfig = await authApi.configuration.get();
    console.log(`connected to ${bridgeConfig.name} :: ${bridgeConfig.ipaddress}`);
  } catch (err) {
    if (err.getHueErrorType === 101) {
      console.error('Press link button on hue bridge');
    } else {
      console.error(`unexpected error: ${err.message}`);
    }
  }
}

discoverAndCreateUser();
