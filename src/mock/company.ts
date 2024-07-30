import { MockMethod } from 'vite-plugin-mock';

export default [
  {
    url: '/api/company',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: [
          {
            id: 1,
            name: 'Apple',
            address: 'Cupertino, CA',
          },
          {
            id: 2,
            name: 'Google',
            address: 'Mountain View, CA',
          },
          {
            id: 3,
            name: 'Facebook',
            address: 'Menlo Park, CA',
          },
        ],
      };
    },
  },
] as MockMethod[]