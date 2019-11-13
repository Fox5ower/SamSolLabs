'use strict';

require('core-js/modules/es7.object.get-own-property-descriptors');

require('core-js/modules/es6.symbol');

require('core-js/modules/web.dom.iterable');

require('core-js/modules/es6.array.iterator');

require('core-js/modules/es6.object.to-string');

require('core-js/modules/es6.object.keys');

require('core-js/modules/es6.function.name');

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(source, true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}

var userStore = (function() {
  var currentUser;
  var changeListeners = [];

  function emitUserUpdate() {
    console.log('Emit updates');
    changeListeners.map(function(cb) {
      return cb(currentUser);
    });
  }

  return {
    getUser: function getUser() {
      return currentUser;
    },
    setUser: function setUser(user) {
      currentUser = user;
      emitUserUpdate(user);
    },
    addChangeListener: function addChangeListener(callback) {
      changeListeners.push(callback);
    }
  };
})();

var initUserForm = function initUserForm() {
  var template =
    '\n<h2>User form</h2>\n<div class="userForm-item">\n    <label class="userForm-label" for="name">Name:</label>\n    <input type="text" id="name"/>\n</div>\n<div class="userForm-item">\n    <label class="userForm-label" for="age">Age:</label>\n    <input type="text" id="age"/>\n</div>\n<h5>Address</h5>\n<div class="userForm-item">\n    <label class="userForm-label" for="city">City:</label>\n    <input type="text" id="city"/>\n</div>\n<div class="userForm-item">\n    <label class="userForm-label" for="street">Street:</label>\n    <input type="text" id="street"\n    />\n</div>\n<button id="saveButton">Save</button>\n';

  function getFormData() {
    var name = document.getElementById('name').value;
    var age = document.getElementById('age').value;
    var city = document.getElementById('city').value;
    var street = document.getElementById('street').value;
    var user = {
      name: name,
      age: age
    };

    if (city || street) {
      user.address = _objectSpread(
        {},
        city && {
          city: city
        },
        {},
        street && {
          street: street
        }
      );
    }

    return user;
  }

  return function initUserForm(parent) {
    console.log('UserForm: init');
    var host = document.createElement('div');
    host.innerHTML = template;
    parent.append(host);
    host.querySelector('#saveButton').addEventListener('click', function(event) {
      console.log('UserForm: save button click');
      event.preventDefault();
      userStore.setUser(getFormData());
    });
  };
};

var initUserInfo = (function() {
  var template =
    '\n   <h2>User info</h2>\n    <div class="userInfo-row">\n        <div class="userInfo-label">Name:</div>\n        <div class="userInfo-value" id="userInfoName"></div>\n    </div> \n    <div  class="userInfo-row">\n        <div class="userInfo-label">Age:</div>\n        <div class="userInfo-value" id="userInfoAge"></div>\n    </div> \n    <div  class="userInfo-row">\n        <div class="userInfo-label">City:</div>\n        <div class="userInfo-value" id="userInfoCity"></div>\n    </div> \n    <div  class="userInfo-row">\n        <div class="userInfo-label">Street:</div>\n        <div class="userInfo-value" id="userInfoStreet"></div>\n    </div> \n';

  function updateUserInfo(user) {
    var _user$address;

    console.log('User info: update');
    document.getElementById('userInfoName').innerText = user.name;
    document.getElementById('userInfoAge').innerText = user.age;
    document.getElementById('userInfoCity').innerText = (user.address && user.address.city) || ''; // document.getElementById('userInfoStreet').innerText = user.address && user.address.street || '';

    document.getElementById('userInfoStreet').innerText =
      ((_user$address = user.address) === null || _user$address === void 0 ? void 0 : _user$address.street) || '';
  }

  return function initUserInfo(parent) {
    console.log('User info: init');
    userStore.addChangeListener(updateUserInfo);
    var host = document.createElement('div');
    host.innerHTML = template;
    parent.append(host);
  };
})();

var initApp = function initApp() {
  document.addEventListener('DOMContentLoaded', function() {
    console.log('Init application');
    initUserForm(document.getElementById('userForm'));
    initUserInfo(document.getElementById('userInfo'));
  });
};

initApp();
