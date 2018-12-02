// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  //apiUrl: 'http://localhost:4100/'
  apiUrl: 'http://localhost:8080/',

};
export const awsKey = {
  accessKeyId: 'AKIAID3M2SJEFWYM76QA',
  secretAccessKey: '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',
}
// export const bucketPathsMap = {
//   "banner 
// }
// enum bucketPaths {
//   banner,
//   corousel,
//   promotion,
//   homepage,
//   middlepage,
//   '1',
//   2,
//   3,
//   4
// }