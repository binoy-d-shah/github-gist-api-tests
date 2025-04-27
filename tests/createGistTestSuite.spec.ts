import { test, expect, request as baseRequest } from '@playwright/test';
import { createGist, createGistWithInvalidHeaders } from '../utils/apiHelper';
import { createGistTestData } from '../testData/createGistTestData';
import { GIST_API_ENDPOINT } from '../config/env'

/**
 * Test Suite for Create Gist API
 * 
 * This suite tests the creation of gists using the GitHub API.
 * It ensures correct behavior when creating public, private, and invalid gists.
 */
test.describe('Create Gist API Tests', () => {
  let request: any;

  /**
   * Before each test, create a new API request context.
   * This context will be used for all API calls in the suite.
   */
  test.beforeEach(async ({ playwright }) => {
    request = await playwright.request.newContext();
  });

  /**
   * After each test, dispose of the API request context.
   * This ensures clean-up and resource management between tests.
   */
  test.afterEach(async () => {
    await request.dispose();
  });

  /**
   * TC-01: Create a Public Gist with Valid Data
   * 
   * - Sends a request to create a public gist with valid data (description and file content).
   */
  test('Create a public gist with valid data', async () => {
    // Send create gist API call
    const response = await createGist(request, createGistTestData.validPublicGist);
    
    // Verify the response contents
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.description).toBe(createGistTestData.validPublicGist.description);

    const responseFileKeys = Object.keys(body.files)[0];
    const testDataFileKeys = Object.keys(createGistTestData.validPublicGist.files)[0];

    expect(responseFileKeys).toBe(testDataFileKeys);
    expect(body.files[responseFileKeys].type).toBe('text/plain');
    expect(body.files[responseFileKeys].language).toBe('Text');
    expect(body.files[responseFileKeys].raw_url).toContain(body.id);

    expect(body.url).toBe(GITHUB_GIST_API_ENDPOINT + `/gists/` + body.id);
    expect(body.forks_url).toContain(GITHUB_GIST_API_ENDPOINT + `/gists/` + body.id + `/forks`);
    expect(body.commits_url).toContain(GITHUB_GIST_API_ENDPOINT + `/gists/` + body.id + `/commits`);
    expect(body.git_pull_url).toContain(body.id);
    expect(body.git_push_url).toContain(body.id);
    expect(body.html_url).toContain(body.id);
    expect(body.comments_url).toContain(GITHUB_GIST_API_ENDPOINT + `/gists/` + body.id + `/comments`);

    expect(body.truncated).toBe(false);
    expect(body.public).toBe(true);

    expect(body.comments).toBe(0);
    expect(body.comments_enabled).toBe(true);
  });

  /**
   * TC-02: Create a Private Gist
   * 
   * - Sends a request to create a private gist with valid data (description and file content).
   */
  test('Create a private gist', async () => {
    // Send create gist API call
    const response = await createGist(request, createGistTestData.validPrivateGist);
    
    // Verify the response contents
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.description).toBe(createGistTestData.validPrivateGist.description);

    const responseFileKeys = Object.keys(body.files)[0];
    const testDataFileKeys = Object.keys(createGistTestData.validPrivateGist.files)[0];

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
    expect(body.public).toBe(false);

    expect(body.comments).toBe(0);
    expect(body.comments_enabled).toBe(true);
  });

  /**
   * TC-03: Fail to Create Gist with empty description
   * 
   * - Sends a request to create a gist with no description provided.
   */
  test('Create gist with empty description', async () => {
    // Send create gist API call
    const response = await createGist(request, createGistTestData.emptyDescription);
    
    // Verify the response contents
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.description).toBe(createGistTestData.emptyDescription.description);

    const responseFileKeys = Object.keys(body.files)[0];
    const testDataFileKeys = Object.keys(createGistTestData.emptyDescription.files)[0];

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
   * TC-04: Fail to Create Gist with No Files
   * 
   * - Sends a request to create a gist with no files provided.
   */
  test('Fail to create gist with no files', async () => {
    // Send create gist API call
    const response = await createGist(request, createGistTestData.noFiles);
    
    // Verify the response contents
    expect(response.status()).toBe(422);
    const body = await response.json();
    expect(body.message).toBe(createGistTestData.errorMessages.validationFailedErrorMessage);
    expect(body.status).toBe('422');
    expect(body.errors[0].code).toBe(createGistTestData.errorMessages.validationFailedErrorCode);
    expect(body.errors[0].field).toBe(createGistTestData.errorMessages.validationFailedErrorField);

  });

  /**
   * TC-05: Fail to Create Gist with Empty File Content
   * 
   * - Sends a request to create a gist with empty file content.
   */
  test('Fail to create gist with empty file content', async () => {
    // Send create gist API call
    const response = await createGist(request, createGistTestData.emptyFileContent);
    expect(response.status()).toBe(422);
    const body = await response.json();
    expect(body.message).toBe(createGistTestData.errorMessages.validationFailedErrorMessage);
    expect(body.status).toBe('422');
    expect(body.errors[0].code).toBe(createGistTestData.errorMessages.validationFailedErrorCode);
    expect(body.errors[0].field).toBe(createGistTestData.errorMessages.validationFailedErrorField);
  });

  /**
   * TC-06: Fail with Invalid Token (Unauthorized)
   * 
   * - Sends a request to create a gist with an invalid authentication token.
   */
  test('Fail with invalid token (unauthorized)', async () => {
    // Send create gist API call
    const response = await createGistWithInvalidHeaders(request, createGistTestData.validPublicGist);

    // Verify the response contents
    expect(response.status()).toBe(401);
    const body = await response.json();
    expect(body.message).toBe(createGistTestData.errorMessages.unauthorizedErrorMessage);
    expect(body.status).toBe('401');
  });

  /**
   * TC-07: Create a public gist with multiple files data
   * 
   * - Sends a request to create a gist with multiple files data
   */

  test('Create a public gist with multiple files data', async () => {
    // Send create gist API call
    const response = await createGist(request, createGistTestData.multipleFiles);
    
    // Verify the response contents
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.description).toBe(createGistTestData.multipleFiles.description);

    let responseFileKeys = Object.keys(body.files)[0];
    let testDataFileKeys = Object.keys(createGistTestData.multipleFiles.files)[0];

    expect(responseFileKeys).toBe(testDataFileKeys);
    expect(body.files[responseFileKeys].type).toBe('text/plain');
    expect(body.files[responseFileKeys].language).toBe('Text');
    expect(body.files[responseFileKeys].raw_url).toContain(body.id);

    responseFileKeys = Object.keys(body.files)[1];
    testDataFileKeys = Object.keys(createGistTestData.multipleFiles.files)[1];

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
