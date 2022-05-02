export const isBrowser = () => typeof window !== 'undefined';
export const getUser = () => (isBrowser() && window.localStorage.getItem('gatsbyUser')
  ? JSON.parse(window.localStorage.getItem('gatsbyUser'))
  : {});
const setUser = user => window.localStorage.setItem('gatsbyUser', JSON.stringify(user));
export const handleLogin = ({ username, password }) => {
  if (username === process.env.SITE_USER && password === process.env.SITE_PASSWORD) {
    return setUser({
      username: 'diamond',
      name: 'Diamond',
      email: 'diamond00@yahoo.com',
    });
  }
};
export const isLoggedIn = () => {
  const user = getUser();
  return !!user.username;
};
export const logout = callback => {
  setUser({});
  callback();
};
