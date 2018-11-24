import { inject } from 'mobx-react/native';

export default (...storeNames: string[]) =>
  inject(({ store }) =>
    storeNames.reduce(
      (s, name) => ({
        ...s,
        ...{
          [name]: store[name],
        },
      }),
      {
        store,
      },
    ),
  );
