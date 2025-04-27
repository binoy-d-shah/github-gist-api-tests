import { test, expect, request } from '@playwright/test';
import { createGist, updateGist } from '../utils/apiHelper';
import { createGistTestData } from '../testData/createGistTestData';
import { updateGistTestData } from '../testData/updateGistTestData';
import { GIST_API_ENDPOINT } from '../config/env'

/**
 * Test Suite for Update Gist API
 * 
 * This suite tests the functionality of updating gists using the GitHub API.
 * It checks for updates in gist description, content, file renaming, file deletion, 
 * invalid gist ID handling, and updating multiple files.
 */
test.describe('Update Gist API Tests', () => {
    let gistId: string;

    /**
     * Before each test, create a new public gist using valid test data.
     * The gist ID will be saved for use in the update tests.
     */
    test.beforeEach(async ({ request }) => {
        // Send create gist API call
        const response = await createGist(request, createGistTestData.validPublicGist);
        // Verify the response contents
        expect(response.status()).toBe(201);
        const body = await response.json();
        // Get the gistID value from the response
        gistId = body.id;
    });

    /**
     * TC-01: Update Gist Description and Content
     * 
     * - Sends a request to update the gist description and content.
     */
    test('should update gist description and content', async ({ request }) => {
        // Send update gist API call
        const response = await updateGist(request, gistId, updateGistTestData.updateGistDescriptionAndContent);
        
        // Verify the response contents
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.description).toBe(updateGistTestData.updateGistDescriptionAndContent.description);

        const responseFileKeys = Object.keys(body.files)[0];
        const testDataFileKeys = Object.keys(updateGistTestData.updateGistDescriptionAndContent.files)[0];

        expect(responseFileKeys).toBe(testDataFileKeys);
        expect(body.files[responseFileKeys].type).toBe('text/plain');
        expect(body.files[responseFileKeys].language).toBe('Text');
        expect(body.files[responseFileKeys].raw_url).toContain(body.id);

        expect(body.url).toBe(GIST_API_ENDPOINT + `/gists/` + body.id);
        expect(body.forks_url).toContain(GIST_API_ENDPOINT + `/gists/` + body.id + `/forks`);
        expect(body.commits_url).toContain(GIST_API_ENDPOINT + `/gists/` + body.id + `/commits`);
        expect(body.git_pull_url).toContain(body.id);
        expect(body.git_push_url).toContain(body.id);
        expect(body.html_url).toContain(body.id);
        expect(body.comments_url).toContain(GIST_API_ENDPOINT + `/gists/` + body.id + `/comments`);

        expect(body.truncated).toBe(false);
        expect(body.public).toBe(true);

        expect(body.comments).toBe(0);
        expect(body.comments_enabled).toBe(true);
    });

    /**
     * TC-02: Rename a File in the Gist
     * 
     * - Sends a request to rename a file within the gist.
     */
    test('should rename a file in the gist', async ({ request }) => {
        // Send update gist API call
        const response = await updateGist(request, gistId, updateGistTestData.renameFile);
        
        // Verify the response contents
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.description).toBe(updateGistTestData.renameFile.description);

        const responseFileKeys = Object.keys(body.files)[0];
        const testDataFileKeys = Object.keys(updateGistTestData.renameFile.files)[0];

        expect(responseFileKeys).toBe(testDataFileKeys);
        expect(body.files[responseFileKeys].type).toBe('text/plain');
        expect(body.files[responseFileKeys].language).toBe('Text');
        expect(body.files[responseFileKeys].raw_url).toContain(body.id);

        expect(body.url).toBe(GIST_API_ENDPOINT + `/gists/` + body.id);
        expect(body.forks_url).toContain(GIST_API_ENDPOINT + `/gists/` + body.id + `/forks`);
        expect(body.commits_url).toContain(GIST_API_ENDPOINT + `/gists/` + body.id + `/commits`);
        expect(body.git_pull_url).toContain(body.id);
        expect(body.git_push_url).toContain(body.id);
        expect(body.html_url).toContain(body.id);
        expect(body.comments_url).toContain(GIST_API_ENDPOINT + `/gists/` + body.id + `/comments`);

        expect(body.truncated).toBe(false);
        expect(body.public).toBe(true);

        expect(body.comments).toBe(0);
        expect(body.comments_enabled).toBe(true);
    });
  
    /**
     * TC-03: Delete a File from Gist
     * 
     * - Sends a request to delete a file from the gist.
     */
    test('should delete a file from gist', async ({ request }) => {
        // Send update gist API call
        const response = await updateGist(request, gistId, updateGistTestData.deleteFile);
        
        // Verify the response contents
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.description).toBe(updateGistTestData.deleteFile.description);

        const testDataFileKeys = Object.keys(updateGistTestData.renameFile.files)[0];
        expect(body.files[testDataFileKeys]).toBeUndefined();
    });
  
    /**
     * TC-04: Attempt to Update an Invalid Gist ID
     * 
     * - Sends a request to update a gist with an invalid ID.
     */
    test('should return 404 for invalid gist ID', async ({ request }) => {
        // Send update gist API call
        const response = await updateGist(request, 'invalid-gistId', updateGistTestData.deleteFile);
        
        // Verify the response contents
        const body = await response.json();
        expect(response.status()).toBe(404);
        expect(body.message).toBe(updateGistTestData.errorMessages.notFoundErrorMessage);
        expect(body.status).toBe('404');
    });
  
    /**
     * TC-05: Update Multiple Files at Once
     * 
     * - Sends a request to update multiple files at once in a gist.
     */
    test('should update multiple files at once', async ({ request }) => {
        // Send update gist API call with multiple files
        let response = await createGist(request, createGistTestData.multipleFiles);
        // Verify the response contents
        expect(response.status()).toBe(201);
        let body = await response.json();
        gistId = body.id;

        // Send update gist API call with multiple files
        response = await updateGist(request, gistId, updateGistTestData.updateMultiupleFiles);
        // Verify the response contents
        expect(response.status()).toBe(200);
        body = await response.json();
        expect(body.description).toBe(updateGistTestData.updateMultiupleFiles.description);

        let responseFileKeys = Object.keys(body.files)[0];
        let testDataFileKeys = Object.keys(updateGistTestData.updateMultiupleFiles.files)[0];

        expect(responseFileKeys).toBe(testDataFileKeys);
        expect(body.files[responseFileKeys].type).toBe('text/plain');
        expect(body.files[responseFileKeys].language).toBe('Text');
        expect(body.files[responseFileKeys].raw_url).toContain(body.id);

        responseFileKeys = Object.keys(body.files)[1];
        testDataFileKeys = Object.keys(updateGistTestData.updateMultiupleFiles.files)[1];

        expect(responseFileKeys).toBe(testDataFileKeys);
        expect(body.files[responseFileKeys].type).toBe('text/plain');
        expect(body.files[responseFileKeys].language).toBe('Text');
        expect(body.files[responseFileKeys].raw_url).toContain(body.id);

        expect(body.url).toBe(GIST_API_ENDPOINT + `/gists/` + body.id);
        expect(body.forks_url).toContain(GIST_API_ENDPOINT + `/gists/` + body.id + `/forks`);
        expect(body.commits_url).toContain(GIST_API_ENDPOINT + `/gists/` + body.id + `/commits`);
        expect(body.git_pull_url).toContain(body.id);
        expect(body.git_push_url).toContain(body.id);
        expect(body.html_url).toContain(body.id);
        expect(body.comments_url).toContain(GIST_API_ENDPOINT + `/gists/` + body.id + `/comments`);

        expect(body.truncated).toBe(false);
        expect(body.public).toBe(true);

        expect(body.comments).toBe(0);
        expect(body.comments_enabled).toBe(true);

    });

});
