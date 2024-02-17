/* eslint-env node */
module.exports = {
  rules: {
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        alphabetize: {
          caseInsensitive: true,
          order: "asc",
        },
        "newlines-between": "always",
      },
    ],
    "perfectionist/sort-objects": [
      "error",
      {
        type: "line-length",
        order: "desc",
      },
    ],
    "react-native/no-raw-text": [
      "off",
      {
        skip: ["Heading", "Body", "Title", "Button"],
      },
    ],
    "import/newline-after-import": ["error", { count: 1 }],
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "react-native/no-color-literals": "off",
    "no-console": "error",
  },
  overrides: [
    {
      rules: {
        "@typescript-eslint/no-unsafe-return": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "import/no-extraneous-dependencies": "off",
        "import/no-default-export": "off",
      },
      files: [
        "*.stories.tsx",
        "test/**",
        "*.config.js",
        "*.config.ts",
        "plugins/**",
        "jest-setup.js",
      ],
    },
    {
      rules: {
        "@typescript-eslint/no-unsafe-return": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-var-requires": "off",
      },
      env: {
        "jest/globals": true,
        jest: true,
      },
      files: ["test/**", "jest-setup.js", "*.test.tsx", "*.test.ts"],
    },
    {
      rules: {
        "import/no-extraneous-dependencies": "off",
        "import/no-default-export": "off",
      },
      files: ["theme.ts"],
    },
  ],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {},
    },
  },
  extends: ["@callstack", "plugin:@typescript-eslint/recommended-type-checked"],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: true,
  },
  plugins: ["perfectionist", "prettier", "@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  root: true,
};
