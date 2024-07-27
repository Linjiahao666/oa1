import dragSize from './dragSize.ts'
const directives: any = {
  'drag-size': dragSize
};

export default {
  install(app) {
    Object.keys(directives).forEach(key => {
      app.directive(key, directives[key]);
    });
  },
};