import { APIRequestContext, APIResponse } from '@playwright/test';
import { authHeaders, invalidAuthHeaders } from './authHeaders';
import { GIST_API_ENDPOINT } from '../config/env'

/**
 * Creates a new Gist via the GitHub Gist API.
 *
 * @param {APIRequestContext} request - The Playwright API request context used for making API requests.
 * @param {any} payload - The data for creating the new Gist, typically containing description and files.
 * @returns - An API response containing the created Gist details or an error message.
 */
export async function createGist(request: APIRequestContext, payload: any) {
    return await request.post(`${GIST_API_ENDPOINT}/gists`, {
        headers: authHeaders,
        data: payload
    });
}

/**
 * Updates an existing Gist via the GitHub Gist API.
 *
 * @param {APIRequestContext} request - The Playwright API request context used for making API requests.
 * @param {string} gistId - The unique identifier of the Gist to be updated.
 * @param {any} payload - The data for updating the Gist, including description and files.
 * @returns - An API response containing the updated Gist details or an error message.
 */
export const updateGist = (request: APIRequestContext, gistId: string, payload: any) => {
    return request.patch(`${GIST_API_ENDPOINT}/gists/${gistId}`, {
        headers: authHeaders,
        data: payload
    });
};

/**
 * Deletes a Gist via the GitHub Gist API.
 *
 * @param {APIRequestContext} request - The Playwright API request context used for making API requests.
 * @param {string} gistId - The unique identifier of the Gist to be deleted.
 * @returns - An API response confirming deletion or an error message.
 */
export const deleteGist = (request: APIRequestContext, gistId: string) => {
    return request.delete(`${GIST_API_ENDPOINT}/gists/${gistId}`, {
        headers: authHeaders
    });
};

/**
 * Retrieves a specific Gist via the GitHub Gist API.
 *
 * @param {APIRequestContext} request - The Playwright API request context used for making API requests.
 * @param {string} gistId - The unique identifier of the Gist to retrieve.
 * @returns - An API response containing the requested Gist details or an error message.
 */
export const getGist = (request: APIRequestContext, gistId: string) => {
    return request.get(`${GIST_API_ENDPOINT}/gists/${gistId}`, {
        headers: authHeaders
    });
};

/**
 * Lists all Gists associated with the authenticated user via the GitHub Gist API.
 *
 * @param {APIRequestContext} request - The Playwright API request context used for making API requests.
 * @returns - An API response containing a list of all Gists.
 */
export const listAllGist = (request: APIRequestContext) => {
    return request.get(`${GIST_API_ENDPOINT}/gists`, {
        headers: authHeaders
    });
};

/**
 * Stars a Gist via the GitHub Gist API.
 *
 * @param {APIRequestContext} request - The Playwright API request context used for making API requests.
 * @param {string} gistId - The unique identifier of the Gist to star.
 * @returns - An API response confirming the Gist was starred or an error message.
 */
export const starGist = (request: APIRequestContext, gistId: string) => {
    return request.put(`${GIST_API_ENDPOINT}/gists/${gistId}/star`, {
        headers: authHeaders
    });
};

/**
 * Unstars a Gist via the GitHub Gist API.
 *
 * @param {APIRequestContext} request - The Playwright API request context used for making API requests.
 * @param {string} gistId - The unique identifier of the Gist to unstar.
 * @returns - An API response confirming the Gist was unstarred or an error message.
 */
export const unstarGist = (request: APIRequestContext, gistId: string) => {
    return request.delete(`${GIST_API_ENDPOINT}/gists/${gistId}/star`, {
        headers: authHeaders
    });
};

/**
 * Checks if a Gist is starred via the GitHub Gist API.
 *
 * @param {APIRequestContext} request - The Playwright API request context used for making API requests.
 * @param {string} gistId - The unique identifier of the Gist to check for being starred.
 * @returns - An API response indicating whether the Gist is starred or an error message.
 */
export const isGistStarred = (request: APIRequestContext, gistId: string) => {
    return request.get(`${GIST_API_ENDPOINT}/gists/${gistId}/star`, {
        headers: authHeaders
    });
};

/**
 * Deletes a Gist with invalid authentication headers via the GitHub Gist API.
 *
 * @param {APIRequestContext} request - The Playwright API request context used for making API requests.
 * @param {string} gistId - The unique identifier of the Gist to be deleted.
 * @returns - An API response indicating an error due to invalid authentication.
 */
export const deleteGistWithInvalidHeaders = (request: APIRequestContext, gistId: string) => {
    return request.delete(`${GIST_API_ENDPOINT}/gists/${gistId}`, {
        headers: invalidAuthHeaders
    });
};

/**
 * Creates a new Gist with invalid authentication headers via the GitHub Gist API.
 *
 * @param {APIRequestContext} request - The Playwright API request context used for making API requests.
 * @param {any} payload - The data for creating the new Gist, typically containing description and files.
 * @returns - An API response indicating an error due to invalid authentication.
 */
export async function createGistWithInvalidHeaders(request: APIRequestContext, payload: any) {
    return await request.post(`${GIST_API_ENDPOINT}/gists`, {
        headers: invalidAuthHeaders,
        data: payload
    });
}