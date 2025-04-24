import { test, expect, request } from '@playwright/test';
import { createGist, getGist, updateGist, deleteGist, starGist, unstarGist, isGistStarred, listAllGist } from '../utils/apiHelper';
import { createGistTestData } from '../testData/createGistTestData';
import { updateGistTestData } from '../testData/updateGistTestData';

test.describe('E2E Gist Tests', () => {
    let gistId: string;

    test('should create, update, star, unstar, and delete a gist successfully', async ({ request }) => {
        let response = await createGist(request, createGistTestData.validPublicGist);
        expect(response.status()).toBe(201);
        let body = await response.json();
        gistId = body.id;

        expect(body.description).toBe(createGistTestData.validPublicGist.description);

        let responseFileKeys = Object.keys(body.files)[0];
        let testDataFileKeys = Object.keys(createGistTestData.validPublicGist.files)[0];

        expect(responseFileKeys).toBe(testDataFileKeys);
        expect(body.public).toBe(true);

        // 2. Get the created Gist and verify data
        response = await getGist(request, gistId);
        expect(response.status()).toBe(200);
        body = await response.json();

        expect(body.description).toBe(createGistTestData.validPublicGist.description);

        responseFileKeys = Object.keys(body.files)[0];
        testDataFileKeys = Object.keys(createGistTestData.validPublicGist.files)[0];

        expect(responseFileKeys).toBe(testDataFileKeys);
        expect(body.public).toBe(true);

        // 3. Update the Gist
        response = await updateGist(request, gistId, updateGistTestData.updateGistDescriptionAndContent);
        expect(response.status()).toBe(200);
        body = await response.json();
        expect(body.description).toBe(updateGistTestData.updateGistDescriptionAndContent.description);

        responseFileKeys = Object.keys(body.files)[0];
        testDataFileKeys = Object.keys(updateGistTestData.updateGistDescriptionAndContent.files)[0];

        expect(responseFileKeys).toBe(testDataFileKeys);
        expect(body.public).toBe(true);

        // 4. Star the Gist
        response = await starGist(request, gistId);
        expect(response.status()).toBe(204);

        response = await isGistStarred(request, gistId);
        expect(response.status()).toBe(204);

        // 5. Unstar the Gist
        response = await unstarGist(request, gistId);
        expect(response.status()).toBe(204);

        response = await isGistStarred(request, gistId);
        expect(response.status()).toBe(404);

        // 6. Delete the Gist
        response = await deleteGist(request, gistId);
        expect(response.status()).toBe(204);

        // 7. Confirm it's deleted
        response = await getGist(request, gistId);
        expect(response.status()).toBe(404);
    });

    test.skip('delete all gists', async ({ request }) => {

        test.setTimeout(100000);

        let response = await listAllGist(request);
        expect(response.status()).toBe(200);
        let gists = await response.json();

        for (const gist of gists) {
            await deleteGist(request, `${gist.id}`);
        }
    });  
});