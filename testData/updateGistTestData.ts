export const updateGistTestData = {

    updateGistDescriptionAndContent: {
        description: 'Updated Public Gist',
        public: true,
        files: {
            'public-gist.txt': {
                content: 'This is a updated test public gist.'
            }
        }
    },

    renameFile: {
        description: 'Public Gist',
        public: true,
        files: {
            'new-public-gist.txt': {
                content: 'This is a test public gist.'
            },
            'public-gist.txt': null
        }
    },

    deleteFile: {
        description: 'Public Gist',
        public: true,
        files: {
            'public-gist.txt': null
        }
    },

    updateMultiupleFiles: {
        description: 'Updated Public Gist',
        public: true,
        files: {
            'public-gist-1.txt': {
                content: 'This is a updated test public gist 1.'
            },
            'public-gist-2.txt': {
                content: 'This is a updated test public gist 2.'
            }
        }
    },

    errorMessages: {
        notFoundErrorMessage: 'Not Found',
        validationFailedErrorMessage: 'Validation Failed',
        validationFailedErrorCode: 'missing_field',
        validationFailedErrorField: 'files'
    }
};
