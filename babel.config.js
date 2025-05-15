module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env', // this is the default module name
        path: '.env', // specify the path to your .env file (default is '.env')
      },
    ],
    'react-native-reanimated/plugin',
  ], 
};
