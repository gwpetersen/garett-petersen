export const isBrowser = () => typeof window !== 'undefined';

export const handleLogin = ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  if (
    username === process.env.SITE_USER
    && password === process.env.SITE_PASSWORD
  ) {
    if (isBrowser()) {
      window.localStorage.setItem(
        'gatsbyUser',
        JSON.stringify({
          username: process.env.SITE_USER,
          password: process.env.SITE_PASSWORD,
          email: 'diamond00@yahoo.com',
        }),
      );
    }
  }
};
export const isLoggedIn = (): boolean => {
  if (isBrowser() && window.localStorage.getItem('gatsbyUser')) {
    const localStoreUser = window.localStorage.getItem('gatsbyUser') || '';
    const user = JSON.parse(localStoreUser) || {};
    if (
      user.username === process.env.SITE_USER
      && user.password === process.env.SITE_PASSWORD
    ) {
      return true;
    }
    return false;
  }
  return false;
};

export const logout = (callback: any) => {
  if (isBrowser()) {
    window.localStorage.setItem('gatsbyUser', JSON.stringify({}));
    callback();
  }
};
