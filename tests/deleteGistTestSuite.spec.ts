import { test, expect, request as baseRequest } from '@playwright/test';
import { createGist, deleteGist, deleteGistWithInvalidHeaders } from '../utils/apiHelper';
import { createGistTestData } from '../testData/createGistTestData';
import { updateGistTestData } from '../testData/updateGistTestData';

/**
 * Test Suite for Delete Gist API
 * 
 * This suite tests the deletion of gists using the GitHub API.
 * It ensures correct behavior when deleting an existing gist, handling non-existent gists,
 * and testing unauthorized and repeated delete attempts.
 */
test.describe('Delete Gist API Tests', () => {
    let gistId: string;

    /**
     * Before each test, create a new public gist using valid test data.
     * The gist ID will be saved for use in the delete tests.
     */
    test.beforeEach(async ({ request }) => {
        const response = await createGist(request, createGistTestData.validPublicGist);
        expect(response.status()).toBe(201);
        const body = await response.json();
        gistId = body.id;
    });

    /**
     * TC-01: Delete an Existing Gist
     * 
     * - Sends a request to delete an existing gist using the valid gist ID.
     */
    test('should delete an existing gist successfully', async ({ request }) => {
        const response = await deleteGist(request, gistId);
        expect(response.status()).toBe(204);
    });

    /**
     * TC-02: Attempt to Delete a Non-Existent Gist
     * 
     * - Sends a request to delete a gist that does not exist (non-existent ID).
     */
    test('should return 404 when deleting non-existent gist', async ({ request }) => {
        const response = await deleteGist(request, 'non-existing-id');

        expect(response.status()).toBe(404);
        const body = await response.json();
        expect(body.message).toContain(updateGistTestData.errorMessages.notFoundErrorMessage);
    });

    /**
     * TC-03: Attempt to Delete a Gist Without an Auth Token
     * 
     * - Sends a request to delete a gist without providing an authorization token.
     */
    test('should return 401 when no auth token is provided', async ({ request }) => {
        const response = await deleteGistWithInvalidHeaders(request, gistId);

        expect(response.status()).toBe(401);
        const body = await response.json();
        expect(body.message).toBe(createGistTestData.errorMessages.unauthorizedErrorMessage);
        expect(body.status).toBe('401');
    });

    /**
     * TC-04: Attempt to Delete a Gist After it Has Already Been Deleted
     * 
     * - First, sends a request to delete the gist, expecting a successful 204 response.
     * - Then, sends a second request to delete the same gist, expecting a 404 response.
     */
    test('should return 404 if gist was already deleted', async ({ request }) => {
        // First delete
        const firstResponse = await deleteGist(request, gistId);
        expect(firstResponse.status()).toBe(204);

        // Second delete
        const secondResponse = await deleteGist(request, gistId);
        expect(secondResponse.status()).toBe(404);
        const body = await secondResponse.json();
        expect(body.message).toContain(updateGistTestData.errorMessages.notFoundErrorMessage);
    });
});
