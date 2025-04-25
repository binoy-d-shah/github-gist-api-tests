import { test, expect, request } from '@playwright/test';
import { createGist, getGist, updateGist, deleteGist, starGist, unstarGist, isGistStarred, listAllGist } from '../utils/apiHelper';
import { createGistTestData } from '../testData/createGistTestData';
import { updateGistTestData } from '../testData/updateGistTestData';

test.describe('E2E Gist Tests', () => {
    let gistId: string;

    test('should create, update, star, unstar, and delete a gist successfully', async ({ request }) => {
        // 1. Create the gist and verify response data 
        let response = await createGist(request, createGistTestData.validPublicGist);
        expect(response.status()).toBe(201);
        let body = await response.json();
        gistId = body.id;

        expect(body.description).toBe(createGistTestData.validPublicGist.description);

        let responseFileKeys = Object.keys(body.files)[0];
        let testDataFileKeys = Object.keys(createGistTestData.validPublicGist.files)[0];

        expect(responseFileKeys).toBe(testDataFileKeys);
        expect(body.public).toBe(true);

        // 2. Get the created Gist and verify response data
        response = await getGist(request, gistId);
        expect(response.status()).toBe(200);
        body = await response.json();

        expect(body.description).toBe(createGistTestData.validPublicGist.description);

        responseFileKeys = Object.keys(body.files)[0];
        testDataFileKeys = Object.keys(createGistTestData.validPublicGist.files)[0];

        expect(responseFileKeys).toBe(testDataFileKeys);
        expect(body.public).toBe(true);

        // 3. Update the Gist and verify response data
        response = await updateGist(request, gistId, updateGistTestData.updateGistDescriptionAndContent);
        expect(response.status()).toBe(200);
        body = await response.json();
        expect(body.description).toBe(updateGistTestData.updateGistDescriptionAndContent.description);

        responseFileKeys = Object.keys(body.files)[0];
        testDataFileKeys = Object.keys(updateGistTestData.updateGistDescriptionAndContent.files)[0];

        expect(responseFileKeys).toBe(testDataFileKeys);
        expect(body.public).toBe(true);

        // 4. Star the Gist and verify the response code
        response = await starGist(request, gistId);
        expect(response.status()).toBe(204);

        response = await isGistStarred(request, gistId);
        expect(response.status()).toBe(204);

        // 5. Unstar the Gist and verify the response code
        response = await unstarGist(request, gistId);
        expect(response.status()).toBe(204);

        response = await isGistStarred(request, gistId);
        expect(response.status()).toBe(404);

        // 6. Delete the Gist and verify the response code
        response = await deleteGist(request, gistId);
        expect(response.status()).toBe(204);

        // 7. Confirm it's deleted and verify the response code
        response = await getGist(request, gistId);
        expect(response.status()).toBe(404);
    });

    test.skip('delete all gists', async ({ request }) => {

        // If data is more then test case might run more time
        test.setTimeout(100000);

        // List all the gists
        let response = await listAllGist(request);
        expect(response.status()).toBe(200);
        let gists = await response.json();

        // Loop through all gists and delete them
        for (const gist of gists) {
            await deleteGist(request, `${gist.id}`);
        }
    });  
});