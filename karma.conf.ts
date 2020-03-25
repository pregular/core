module.exports = config => {
  config.set({
    basePath: '',
    frameworks: [
      'esm',
      'jasmine',
    ],
    files: [
      file('packages/**/*.ts', config),
      file('test/**/*.ts', config),
      file('src/**/*.ts', config),
    ],
    exclude: excludeFromTesting,
    browsers: [
      'Chrome',
      'Firefox',
      'Opera',
      'Safari',
    ],
    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-opera-launcher',
      'karma-safari-launcher',
      require.resolve('@open-wc/karma-esm'),
    ],
    esm: {
      babel: true,
      customBabelConfig: {
        presets: [
            "@babel/preset-typescript",
        ],
      },
      babelExclude: excludeFromCompilation,
      babelModernExclude: excludeFromCompilation,
      babelModuleExclude: excludeFromCompilation,

      nodeResolve: true,
      fileExtensions: ['.ts'],
      preserveSymlinks: true,

      polyfills: {
        custom: customPolyfills,
      },
    },
  });
  return config;
};

const file = (filePattern: string, config: {grep: string}) => ({
  pattern: config.grep ? config.grep : filePattern,
  type: 'module',
});

const excludeFromCompilation = [
  '**/node_modules/**/*.js',
  '**/node_modules/**/*.ts',
];

// @todo: this can be remove when adjust test files to: foo.browser.spec.ts or foo.node.spec.ts
const excludeFromTesting = [
  'packages/pg-compiler-template/**/*.ts',
];

const customPolyfills = [
  {
    name: 'document-register-element',
    path: require.resolve('document-register-element'),
    test: "!('customElements' in window)",
  },
];
