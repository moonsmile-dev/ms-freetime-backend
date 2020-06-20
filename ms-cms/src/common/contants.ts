export const ANALYTIC_BACKEND_API = process.env.REACT_APP_ANALYTIC_BACKEND_API;
export const REACT_PHOTO_API = `${ANALYTIC_BACKEND_API}/photos/{0}/react`;

export const PHOTO_STATUS_LIKE = 1;
export const PHOTO_STATUS_HATE = -1;
export const PHOTO_STATUS_HIDE = 2;
