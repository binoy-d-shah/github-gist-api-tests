import { GITHUB_GIST_TOKEN } from '../config/env';

/**
 * Authorization headers used for authenticating requests to the GitHub Gist API with a valid token.
 *
 * @constant {object} authHeaders
 * @property {string} Authorization - The Bearer token used for authentication. Retrieved from the `GITHUB_GIST_TOKEN` environment variable.
 * @property {string} Accept - Specifies the media type that the client is willing to receive. In this case, the GitHub Gist API version 2022-11-28.
 * @property {string} X-GitHub-Api-Version - The version of the GitHub API being used, set to 2022-11-28.
 * @property {string} User-Agent - The user agent string representing the client making the request. In this case, it mimics a Chrome browser on macOS.
 */
export const authHeaders = {
    'Authorization': `Bearer ${GITHUB_GIST_TOKEN}`,
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.3659.806 Safari/537.36'
};

/**
 * Authorization headers used for authenticating requests to the GitHub Gist API with an invalid token.
 *
 * @constant {object} invalidAuthHeaders
 * @property {string} Authorization - The Bearer token used for authentication. In this case, it is a dummy token (`MY_DUMMY_TOKEN`), which should result in an authentication error.
 * @property {string} Accept - Specifies the media type that the client is willing to receive. In this case, the GitHub Gist API version 2022-11-28.
 * @property {string} X-GitHub-Api-Version - The version of the GitHub API being used, set to 2022-11-28.
 * @property {string} User-Agent - The user agent string representing the client making the request. In this case, it mimics a Chrome browser on macOS.
 */
export const invalidAuthHeaders = {
    'Authorization': `Bearer MY_DUMMY_TOKEN`,
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.3659.806 Safari/537.36'
};