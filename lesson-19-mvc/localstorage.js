function TLocalStorage(name) {
  var self = this;
  var storage = {};

  self.storage = JSON.parse(localStorage.getItem(name));

  self.addValue = function(key, value) {
    storage[key] = value;
    localStorage.setItem(name, JSON.stringify(storage));
  };

  self.getValue = function(key) {
    return storage[key];
  };

  self.deleteValue = function(key) {
    if (key in storage) {
      delete storage[key];
      localStorage.setItem(name, JSON.stringify(storage));
      return true;
    } else {
      return false;
    }
  };

  self.getKeys = function() {
    return (Object.keys(storage));
  };
}