"use strict";
function AjaxStringStorage(name) {
  var self = this;
  var AjaxHandlerScript = "http://fe.it-academy.by/AjaxStringStorage2.php";
  self.name = name;
  self.storage = {};
  $.ajax(
    {
      url: AjaxHandlerScript,
      type: 'POST',
      dataType: 'json',
      data: {f: 'READ', n: 'PARTYKA_JS_HOME_TASK'},
      success: DataDownloadedRead,
      error: ErrorHandler
    }
  );

  function DataDownloadedRead(data) {
    if (data !== " ") {
      self.storage = JSON.parse(data.result);
      console.log("DataDownloadedRead - " + data.result);
    } else if (data === " ") {
      $.ajax(
        {
          url: AjaxHandlerScript,
          type: 'POST',
          dataType: 'json',
          data: {f: 'INSERT', n: 'PARTYKA_JS_HOME_TASK', v: JSON.stringify(self.storage)},
          success: DataDownloadedInsert,
          error: ErrorHandler
        }
      );
      function DataDownloadedInsert(data) {
        console.log("DataDownloadedInsert - " + data.result);
      }
    }
  }

  self.addValue = function (key, value) {
    self.storage[key] = value;
    addValue(self.storage);
  };

  self.getValue = function (key) {
    return self.storage[key];
  };

  self.deleteValue = function (key) {
    if (key in self.storage) {
      delete self.storage[key];
      addValue(self.storage);
      return true;
    } else {
      return false;
    }
  };

  self.getKeys = function () {
    return (Object.keys(self.storage));
  };

  function addValue(hash) {
    var UpdatePassword = Math.random();

    $.ajax(
      {
        url: AjaxHandlerScript,
        type: 'POST',
        dataType: 'json',
        data: {f: 'LOCKGET', n: 'PARTYKA_JS_HOME_TASK', p: UpdatePassword},
        success: DataDownloadedLockget,
        error: ErrorHandler
      }
    );
    function DataDownloadedLockget(data) {
      console.log('DataLoadedLocket-' + data.result);

      $.ajax(
        {
          url: AjaxHandlerScript,
          type: 'POST',
          dataType: 'json',
          data: {f: 'UPDATE', n: 'PARTYKA_JS_HOME_TASK', p: UpdatePassword, v: JSON.stringify(hash)},
          success: DataDownloadedUpdate,
          error: ErrorHandler
        }
      );
      function DataDownloadedUpdate(data) {
        console.log('DataDownloadedUpdate-' + data.result)
      }
    }
  }

  function ErrorHandler(jqXHR, StatusStr, ErrorStr) {
    alert(StatusStr + ' ' + ErrorStr);
  }
}
