import { getSession } from 'next-auth/react';

export const withAuth = (gssp) => {
  return async (context) => {
    const session = await getSession({ req: context.req });

    if (!session) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    const gsspData = await gssp({ ...context, session });

    return {
      ...gsspData,
      props: {
        ...gsspData.props,
        session,
      },
    };
  };
};
