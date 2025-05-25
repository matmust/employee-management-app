export default {
  files: ['./src/test/**/*.test.js'],
  nodeResolve: true,
  coverage: true,
  coverageConfig: {
    report: true,
    reportDir: 'coverage',
    reporters: ['lcov', 'text-summary'],
    threshold: {
      statements: 95,
      branches: 95,
      functions: 90,
      lines: 95,
    },
    include: [
      'src/components/**/*.js',
      'src/utils/**/*.js',
      'src/store/**/*.js',
      'src/views/**/*.js'
    ],
    exclude: [
      'src/vendor/**/*.js',
    ]
  }
};
