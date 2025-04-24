export const createGistTestData = {

    validPublicGist: {
        description: 'Public Gist',
        public: true,
        files: {
            'public-gist.txt': {
                content: 'This is a test public gist.'
            }
        }
    },

    validPrivateGist: {
        description: 'Private Gist',
        public: false,
        files: {
            'private-gist.txt': {
                content: 'This is a test private gist.'
            }
        }
    },

    emptyDescription: {
        description: '',
        public: true,
        files: {
            'empty-desc.txt': {
                content: 'This is a valid gist.'
            }
        }
    },

    noFiles: {
        description: 'Missing file',
        public: true,
        files: {}
    },

    emptyFileContent: {
        description: 'Empty file content',
        public: true,
        files: {
            'empty.txt': {
                content: ''
            }
        }
    },

    multipleFiles: {
        description: 'Public Gist',
        public: true,
        files: {
            'public-gist-1.txt': {
                content: 'This is a test public gist 1.'
            },
            'public-gist-2.txt': {
                content: 'This is a test public gist 2.'
            }
        }
    },

    errorMessages: {
        validationFailedErrorMessage: 'Validation Failed',
        validationFailedErrorCode: 'missing_field',
        validationFailedErrorField: 'files',
        unauthorizedErrorMessage: 'Bad credentials'
    }
};
