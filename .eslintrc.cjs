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
      files: ["test/**", "jest-setup.js", "*.test.tsx", "*.test.ts"],
      env: {
        jest: true,
      },
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
    "import/resolver": {
      typescript: {
        project: ["./tsconfig.json"],
      },
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
  },
  extends: [
    "expo",
    "plugin:@typescript-eslint/recommended-type-checked",
    "prettier",
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: true,
  },
  plugins: ["perfectionist", "prettier", "@typescript-eslint", "import"],
  parser: "@typescript-eslint/parser",
  root: true,
};
