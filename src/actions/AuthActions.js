export const tryAuth = authData => {
    return {
      type: "TRY_AUTH",
      payload: authData
    };
};
