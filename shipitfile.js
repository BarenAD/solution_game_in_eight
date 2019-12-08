const path = require('path');
const PathInServer = "/var/www/solution-game-in-eight";

module.exports = async function (shipit) {
    require('shipit-deploy')(shipit);
    await shipit.local('npm run build');
    shipit.initConfig({
        default: {
            workspace: path.resolve(__dirname, './build'),
            shallowClone: false
        },
        staging: {
            servers: 'deployer@barenad.info',
            deployTo: path.join(PathInServer),
            deleteOnRollback: true
        }
    });
};
