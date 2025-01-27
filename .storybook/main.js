module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [{
    name: '@storybook/addon-essentials',
    options: {
      "actions": false,
      "backgrounds": false,
      "viewport": false,
      "toolbars": false,
    }
  }]
}