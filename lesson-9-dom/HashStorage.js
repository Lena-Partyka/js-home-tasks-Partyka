function THashStorage(){
  store = {};
  this.addValue = function (key, value) {
    store[key] = value;
  }
  this.getValue = function (key) {
    return store[key];
  }
  this.deleteValue = function (key) {
    delete store[key];
  }
  this.getKeys = function () {
    return Object.keys(store);
  }
};


