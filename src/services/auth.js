export const isBrowser = () => typeof window !== 'undefined';

export const handleLogin = ({ username, password }) => {
  if (username === process.env.SITE_USER && password === process.env.SITE_PASSWORD) {
    if (isBrowser()) {
      window.localStorage.setItem('gatsbyUser', JSON.stringify({
        username: 'diamond',
        name: 'Diamond',
        email: 'diamond00@yahoo.com',
      }));
    }
  }
};
export const isLoggedIn = () => {
  if (isBrowser() && window.localStorage.getItem('gatsbyUser')) {
    const user = JSON.parse(window.localStorage.getItem('gatsbyUser')) || {};
    return !!user.username;
  }
};
export const logout = callback => {
  if (isBrowser()) {
    window.localStorage.setItem('gatsbyUser', JSON.stringify({}));
    callback();
  }
};
