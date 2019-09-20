import { capitalize, camelize } from '../../services/utils';

const required = (name) => {
  throw new Error(`Parameter "${name}" is required`);
};

function buildReducer(
  module = required('module'),
  mergeState = {},
) {
  const customReducers = [];
  const READ = `read${capitalize(module)}`;
  const FIND = `find${capitalize(module)}`;
  const SET_CURRENT = `setCurrent${capitalize(module)}`;

  const Types = {
    ...['FIND', 'READ', 'SET_CURRENT'].reduce((prev, item) => ({
      ...prev,
      [item]: `${module}/${item}`,
      [`SUCCESS_${item}`]: `${module}/SUCCESS_${item}`,
      [`FAILURE_${item}`]: `${module}/FAILURE_${item}`,
    }), {}),
  };

  const INITIAL_STATE = {
    data: [],
    current: {},
    loading: {
      default: false,
      read: true,
      find: true,
    },
    [module]: {},
    ...mergeState,
  };

  const Reducer = (state = INITIAL_STATE, action) => {
    const reducerObject = {
      [Types.READ]() {
        return { ...state, loading: { ...state.loading, read: true } };
      },
      [Types.SUCCESS_READ]() {
        return { ...state, loading: { ...state.loading, read: false }, data: action.payload[module] };
      },
      [Types.FAILURE_READ]() {
        return { ...state, loading: { ...state.loading, read: false }, data: [] };
      },
      [Types.FIND]() {
        return { ...state, loading: { ...state.loading, find: true } };
      },
      [Types.SUCCESS_FIND]() {
        return { ...state, loading: { ...state.loading, find: false }, [module]: action.payload[module] };
      },
      [Types.FAILURE_FIND]() {
        return { ...state, loading: { ...state.loading, find: false }, [module]: {} };
      },
      [Types.SET_CURRENT]() {
        return { ...state, current: action.payload };
      },
      ...customReducers.reduce((prev, [name, callback]) => {
        const object = {
          ...prev,
          [name]() {
            return callback(action.payload, state);
          },
        };

        return object;
      }, {}),
    };
    const typeValues = Object.values(Types);
    const isValidType = Object.keys(reducerObject).includes(action.type) && typeValues.includes(action.type);
    const reducer = type => reducerObject[type];

    return isValidType ? reducer(action.type)(state) : state;
  };

  const Creators = {
    [READ]: values => ({
      type: Types.READ,
      payload: values,
    }),
    [FIND]: id => ({
      type: Types.FIND,
      payload: id,
    }),
    [SET_CURRENT]: id => ({
      type: Types.SET_CURRENT,
      payload: id,
    }),
  };

  const addReducer = (type, callback) => {
    customReducers.push([type, callback]);
  };

  const addType = (type) => {
    const normalizedType = type.toUpperCase().replace(/\s+/g, '_');
    const newType = `${module}/${normalizedType}`;

    Types[normalizedType] = newType;
  };

  const addCreator = (name, callback) => {
    const normalizedType = camelize(name);
    Creators[normalizedType] = callback;
  };

  return {
    Reducer,
    Creators,
    Types,
    addReducer,
    addType,
    addCreator,
    INITIAL_STATE,
  };
}

export default buildReducer;
