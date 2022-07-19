// module.exports = function override(config, env) {
//     //do stuff with the webpack config...
//     return config;
// };

const { override, useBabelRc } = require("customize-cra");

// eslint-disable-next-line react-hooks/rules-of-hooks
module.exports = override(useBabelRc());
