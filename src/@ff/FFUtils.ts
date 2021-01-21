import * as colors from "@material-ui/core/colors";
import chroma from "chroma-js";
import md5 from "md5";
import _ from "@lodash";

interface EventEmitterType {
  events: object;
}

class EventEmitter implements EventEmitterType {
  events: object;

  constructor() {
    this.events = {};
  }

  _getEventListByName(eventName) {
    if (typeof this.events[eventName] === "undefined") {
      this.events[eventName] = new Set();
    }
    return this.events[eventName];
  }

  on(eventName, fn) {
    this._getEventListByName(eventName).add(fn);
  }

  once(eventName, fn) {
    const self = this;

    const onceFn = function (...args) {
      self.removeListener(eventName, onceFn);
      fn.apply(self, args);
    };
    this.on(eventName, onceFn);
  }

  emit(eventName, ...args) {
    this._getEventListByName(eventName).forEach(
      function (fn) {
        fn.apply(this, args);
      }.bind(this)
    );
  }

  removeListener(eventName, fn) {
    this._getEventListByName(eventName).delete(fn);
  }
}

class FFUtils {
  static filterArrayByString(mainArr, searchText) {
    if (searchText === "") {
      return mainArr;
    }

    searchText = searchText.toLowerCase();

    return mainArr.filter((itemObj) => {
      return this.searchInObj(itemObj, searchText);
    });
  }

  static searchInObj(itemObj, searchText) {
    for (const prop in itemObj) {
      if (!itemObj.hasOwnProperty(prop)) {
        continue;
      }

      const value = itemObj[prop];

      if (typeof value === "string") {
        if (this.searchInString(value, searchText)) {
          return true;
        }
      } else if (Array.isArray(value)) {
        if (this.searchInArray(value, searchText)) {
          return true;
        }
      }

      if (typeof value === "object") {
        if (this.searchInObj(value, searchText)) {
          return true;
        }
      }
    }
  }

  static searchInArray(arr, searchText) {
    for (const value of arr) {
      if (typeof value === "string") {
        if (this.searchInString(value, searchText)) {
          return true;
        }
      }

      if (typeof value === "object") {
        if (this.searchInObj(value, searchText)) {
          return true;
        }
      }
    }
  }

  static searchInString(value, searchText) {
    return value.toLowerCase().includes(searchText);
  }

  static generateGUID() {
    function S4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return S4() + S4();
  }

  static toggleInArray(item, array) {
    if (array.indexOf(item) === -1) {
      array.push(item);
    } else {
      array.splice(array.indexOf(item), 1);
    }
  }

  static handleize(text) {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/\W+/g, "") // Remove all non-word chars
      .replace(/--+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, ""); // Trim - from end of text
  }

  static setRoutes(config) {
    let routes = [...config.routes];

    if (config.settings || config.auth) {
      routes = routes.map((route) => {
        let auth = config.auth ? [...config.auth] : null;
        auth = route.auth ? [...auth, ...route.auth] : auth;
        return {
          ...route,
          settings: { ...config.settings, ...route.settings },
          auth,
        };
      });
    }

    return [...routes];
  }

  static generateRoutesFromConfigs(configs) {
    let allRoutes = [];
    configs.forEach((config) => {
      allRoutes = [...allRoutes, ...this.setRoutes(config)];
    });
    return allRoutes;
  }

  static findById(o, id) {
    //Early return
    if (o.id === id) {
      return o;
    }
    let result, p;
    for (p in o) {
      if (o.hasOwnProperty(p) && typeof o[p] === "object") {
        result = this.findById(o[p], id);
        if (result) {
          return result;
        }
      }
    }
    return result;
  }

  static getFlatNavigation(navigationItems, flatNavigation) {
    flatNavigation = flatNavigation ? flatNavigation : [];
    for (const navItem of navigationItems) {
      if (navItem.type === "subheader") {
        continue;
      }

      if (navItem.type === "item") {
        flatNavigation.push({
          id: navItem.id,
          title: navItem.title,
          type: navItem.type,
          icon: navItem.icon || false,
          url: navItem.url,
          auth: navItem.auth || null,
        });

        continue;
      }

      if (navItem.type === "collapse" || navItem.type === "group") {
        if (navItem.children) {
          this.getFlatNavigation(navItem.children, flatNavigation);
        }
      }
    }

    return flatNavigation;
  }

  static randomMatColor(hue) {
    hue = hue ? hue : "400";
    const mainColors = [
      "red",
      "pink",
      "purple",
      "deepPurple",
      "indigo",
      "blue",
      "lightBlue",
      "cyan",
      "teal",
      "green",
      "lightGreen",
      "lime",
      "yellow",
      "amber",
      "orange",
      "deepOrange",
    ];
    const randomColor =
      mainColors[Math.floor(Math.random() * mainColors.length)];
    return colors[randomColor][hue];
  }

  static difference(object, base) {
    function changes(object, base) {
      return _.transform(object, function (result, value, key) {
        if (!_.isEqual(value, base[key])) {
          result[key] =
            _.isObject(value) && _.isObject(base[key])
              ? changes(value, base[key])
              : value;
        }
      });
    }

    return changes(object, base);
  }

  static EventEmitter = EventEmitter;

  static updateNavItem(nav, id, item) {
    return nav.map((_item) => {
      if (_item.id === id) {
        return _.merge({}, _item, item);
      }

      if (_item.children) {
        return _.merge({}, _item, {
          children: this.updateNavItem(_item.children, id, item),
        });
      } else {
        return _.merge({}, _item);
      }
    });
  }

  static removeNavItem(nav, id) {
    return nav
      .map((_item) => {
        if (_item.id === id) {
          return null;
        }

        if (_item.children) {
          return _.merge({}, _.omit(_item, ["children"]), {
            children: this.removeNavItem(_item.children, id),
          });
        } else {
          return _.merge({}, _item);
        }
      })
      .filter((s) => s);
  }

  static prependNavItem(nav, item, parentId) {
    if (!parentId) {
      return [item, ...nav];
    }

    return nav.map((_item) => {
      if (_item.id === parentId && _item.children) {
        return {
          _item,
          children: [item, ..._item.children],
        };
      }

      if (_item.children) {
        return _.merge({}, _item, {
          children: this.prependNavItem(_item.children, item, parentId),
        });
      } else {
        return _.merge({}, _item);
      }
    });
  }

  static appendNavItem(nav, item, parentId) {
    if (!parentId) {
      return [...nav, item];
    }

    return nav.map((_item) => {
      if (_item.id === parentId && _item.children) {
        return {
          _item,
          children: [..._item.children, item],
        };
      }

      if (_item.children) {
        return _.merge({}, _item, {
          children: this.appendNavItem(_item.children, item, parentId),
        });
      } else {
        return _.merge({}, _item);
      }
    });
  }

  static hasPermission(authArr, userRole) {
    /**
     * If auth array is not defined
     * Pass and allow
     */
    // console.log(authArr, userRole)
    if (authArr === null || authArr === undefined) {
      // console.info("auth is null || undefined:", authArr);
      return true;
    } else if (authArr.length === 0) {
      /**
       * if auth array is empty means,
       * allow only user role is guest (null or empty[])
       */
      // console.info("auth is empty[]:", authArr);
      return !userRole || userRole.length === 0;
    } else {
      /**
       * Check if user has grants
       */
      // console.info("auth arr:", authArr);
      /*
            Check if user role is array,
            */
      if (userRole && Array.isArray(userRole)) {
        return authArr.some((r) => userRole.indexOf(r) >= 0);
      }

      /*
            Check if user role is string,
            */
      return authArr.includes(userRole);
    }
  }

  static frontColor = (bgColor, lightColor = "#fff", darkColor = "#000") => {
    const [r, g, b] = chroma(bgColor).rgb();
    if (r * 0.299 + g * 0.587 + b * 0.114 <= 186) {
      return lightColor;
    } else {
      return darkColor;
    }
  };
  static isDark = (color: string | number | chroma.Color, thres: number = 70) =>
    chroma(color).get("lab.l") < thres;

  static addGravatar = (user) => {
    if (!user.profile.photoURL) {
      const hash = md5(("" + user.profile.email).trim().toLowerCase());
      return _.merge({}, user, {
        profile: {
          photoURL: "https://www.gravatar.com/avatar/" + hash + "?d=retro",
        },
      });
    }
    return user;
  };

  static getImageSize = (file) =>
    new Promise((resolve, reject) => {
      const image = document.createElement("img");
      image.src = URL.createObjectURL(file);
      image.onerror = (err) => {
        clearInterval(intervalId);
        reject(err);
      };
      var intervalId = setInterval(() => {
        if (image.naturalWidth && image.naturalHeight) {
          clearInterval(intervalId);
          URL.revokeObjectURL(image.src);
          resolve({
            width: image.naturalWidth,
            height: image.naturalHeight,
          });
        }
      }, 1);
    });

  static splitOnce = (str: string, delimeter: string) => {
    if (!str.includes(delimeter)) return [str, ""];
    const components = str.split(delimeter);
    return [components.shift(), components.join(delimeter)];
  };

  static groupByKeyPrefix = (obj: object, delimeter: string = "_") => {
    const result = Object.entries(obj).reduce((r, [k, v]) => {
      const [pkey, ckey] = FFUtils.splitOnce(k, delimeter);
      if (!!ckey) {
        (r[pkey] = r[pkey] || {})[ckey] = v;
      } else {
        r[pkey] = v;
      }
      return r;
    }, {});
    return result;
  };

  static getFinancialYear = (date: Date, fiscalMonth: number = 4) => {
    if (fiscalMonth === 1) {
      return [
        {
          year: date.getFullYear(),
          month: [...Array(12).keys()].map((m) => m + 1),
        },
      ];
    }
    if (date.getMonth() + 1 < fiscalMonth) {
      return [
        {
          year: date.getFullYear() - 1,
          month: [...Array(12 - fiscalMonth + 1).keys()].map(
            (m) => m + fiscalMonth
          ),
        },
        {
          year: date.getFullYear(),
          month: [...Array(fiscalMonth - 1).keys()].map((m) => m + 1),
        },
      ];
    } else {
      return [
        {
          year: date.getFullYear(),
          month: [...Array(12 - fiscalMonth + 1).keys()].map(
            (m) => m + fiscalMonth
          ),
        },
        {
          year: date.getFullYear() + 1,
          month: [...Array(fiscalMonth - 1).keys()].map((m) => m + 1),
        },
      ];
    }
  };

  static getQuater = (month: number, fiscalStart: number = 4) => {
    return month >= fiscalStart
      ? Math.ceil((month - fiscalStart + 1) / 3)
      : 3 - Math.ceil(Math.abs(month - fiscalStart) / 3);
  };
  static getQuaterStart = (quater: number, fiscalStart: number = 4) => {
    return ((quater - 1) * 3 + fiscalStart) % 12 || 12;
  };
}

export default FFUtils;
