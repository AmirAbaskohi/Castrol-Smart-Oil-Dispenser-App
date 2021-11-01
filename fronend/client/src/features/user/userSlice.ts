import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchUser } from './userAPI';

export interface UserState {
  id: string;
  name: string;
  status: 'idle' | 'loading' | 'failed';
  isLoggedIn: boolean;
  error: boolean;
  timeoutFunc: any;
};

const getLoggedInUserId = () => {
  const loggedInUser = window.localStorage.getItem("loggedInUser");
  return loggedInUser ? JSON.parse(loggedInUser).id : '';
};

const getLoggedInUserName = () => {
  const loggedInUser = window.localStorage.getItem("loggedInUser");
  return loggedInUser ? JSON.parse(loggedInUser).name : '';
};

const initialState: UserState = {
  id: getLoggedInUserId(),
  name: getLoggedInUserName(),
  status: 'idle',
  isLoggedIn: !!window.localStorage.getItem("loggedInUser"),
  error: false,
  timeoutFunc: undefined,
};

export const userLogin = createAsyncThunk(
  '/userInfo/',
  async (user: any) => await fetchUser(user)
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      const userPaylod = { id: action.payload.id, name: action.payload.name };
      window.localStorage.setItem('loggedInUser', JSON.stringify(action.payload));
      return { ...state, id: action.payload.id, name: action.payload.name, isLoggedIn: true, timeoutFunc: action.payload.timeoutFunc };
    },
    logout: state => {
      window.localStorage.removeItem('loggedInUser');
      if (state.timeoutFunc) clearTimeout(state.timeoutFunc);
      return { ...state, id: '', name: '', isLoggedIn: false };
    },
    clearError: state => ({ ...state, error: false }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(userLogin.fulfilled, (state, action) => {
        const userPaylod = { id: action.payload.id, name: action.payload.name };
        window.localStorage.setItem('loggedInUser', JSON.stringify(userPaylod));
        return {
          ...state,
          status: 'idle',
          id: action.payload.id,
          name: action.payload.name,
          isLoggedIn: true,
        };
      })
      .addCase(userLogin.rejected, state => {
        window.localStorage.removeItem('loggedInUser');
        return {
          ...state,
          id: '',
          name: '',
          status: 'idle',
          isLoggedIn: false,
          error: true,
        }
      });
  },
});

export const userAuthState = (state: RootState) => state.userAuth;

export const { login, logout, clearError } = userSlice.actions;

export default userSlice.reducer;
