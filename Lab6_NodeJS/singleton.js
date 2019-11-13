//Запускать index.html с помощью плагина Live Server
export const Singleton = (function() {
  let instance;

  function Singleton() {
    if (!instance) {
      instance = this;
    } else {
      return instance;
    }
  }

  Singleton.prototype.cookies = {};

  Singleton.prototype.getCookie = function(name) {
    if (this.cookies[name]) {
      return this.cookies[name];
    } else {
      const reg = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
      if (reg) return reg[2];
      else return "nothing found";
    }
  };

  Singleton.prototype.setCookie = function(name, value) {
    if (!this.cookies[name]) {
      this.cookies[name] = value;
      document.cookie = `${name}=${value}`;
    }
  };

  Singleton.prototype.deleteCookie = function(name) {
    if (this.cookies[name]) {
      delete this.cookies[name];
      let date = new Date();
      date.setTime(date.getTime() - 1);
      document.cookie = name += "=; expires=" + date.toGMTString();
    } else {
      let date = new Date();
      date.setTime(date.getTime() - 1);
      document.cookie = name += "=; expires=" + date.toGMTString();
    }
  };
  return Singleton;
})();
