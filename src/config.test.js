
let config = {};

const testCases = [
  {
    name: "Test that the return is lisbon",
    origin: "",
    envVars: {
      REACT_APP_NETWORK: "lisbon"
    },
    assertion: function (config) {
      expect(config.network).toBe("lisbon")
      expect(config.rpcEndpoint).toBe("https://api.lisbon.icon.community")
    },
  },
  {
    name: "Test that the region is set",
    origin: "",
    envVars: {
      REACT_APP_REGION: "ams"
    },
    assertion: function (config) {
      expect(config.network).toBe("mainnet")
      expect(config.region).toBe("ams")
      expect(config.rpcEndpoint).toBe("https://api.mainnet.ams.vultr.icon.community")
    },
  },
  {
    name: "Test that we can give custom rpc",
    origin: "",
    envVars: {
      REACT_APP_RPC_ENDPOINT: "foo"
    },
    assertion: function (config) {
      expect(config.network).toBe("mainnet")
      expect(config.region).toBe("")
      expect(config.rpcEndpoint).toBe("foo")
    },
  },
  {
    name: "Test that when we define a origin we get the right vars - prod version",
    origin: "https://tracker.berlin.icon.community",
    envVars: {},
    assertion: function (config) {
      expect(config.network).toBe("berlin")
      expect(config.region).toBe("")
      expect(config.rpcEndpoint).toBe("https://api.berlin.icon.community")
    },
  },
  {
    name: "Test with a regional origin",
    origin: "https://tracker.v2.lisbon.ams.vultr.icon.community",
    envVars: {},
    assertion: function (config) {
      expect(config.network).toBe("lisbon")
      expect(config.region).toBe("")
      expect(config.rpcEndpoint).toBe("https://api.lisbon.ams.vultr.icon.community")
    },
  },
]


describe('config', () => {
  for (let {name, origin, envVars, assertion} of testCases) {
    describe(`${name}`, () => {
      let originalLocation;

      beforeEach(() => {
        // Clear the config
        jest.resetModules()
        for (let [k, v] of Object.entries(envVars)) {
          // Set environment variables
          process.env[k] = v;
        }

        // Mock the origin when it is not localhost
        if (origin !== '') {
          delete global.window.location;
          global.window = Object.create(window);
          global.window.location = {
            origin: origin,
            hostname: '',
          };
        }

      });

      afterEach(() => {
        // clear the environment variable
        for (let k of Object.keys(envVars)) {
          delete process.env[k];
        }
      });

      test('assertion', () => {
        config = require('./config');
        assertion(config.default);
      });
    });
  }
});
