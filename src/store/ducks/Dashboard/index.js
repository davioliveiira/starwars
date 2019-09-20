import BuildReducer from '../buildReducer';

const DashboardReducer = new BuildReducer('dashboard');

export const { Types } = DashboardReducer;

export const Creators = {
  ...DashboardReducer.Creators,
};

export default DashboardReducer.Reducer;
