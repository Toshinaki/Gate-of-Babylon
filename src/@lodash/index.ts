import __ from "lodash";

/**
 * You can extend Lodash with mixins
 * And use it as below
 * import _ from '@lodash'
 */
const _ = __.runInContext();

_.mixin({
  // Immutable Set for setting state
  setIn: (state: object, name: string, value: any) => {
    return _.setWith(_.clone(state), name, value, _.clone);
  },
  omitDeepBy: (object: object, predict) => {
    const transform = (obj: object) =>
      _.omitBy(
        _.transform(obj, (result: object, value: any, key: string) => {
          result[key] = _.isObject(value) ? transform(value) : value;
        }),
        predict
      );
    return transform(object);
  },
});

export default _;
