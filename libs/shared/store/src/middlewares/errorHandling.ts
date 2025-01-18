import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';
import { logout } from '../features/auth/slice';

export const rtkQueryErrorLogger: Middleware =
    (api: MiddlewareAPI) => (next) => (action: any) => {
        if (isRejectedWithValue(action)) {
            const payload = action.payload;
            const response = action.meta?.baseQueryMeta?.response;
            const endpointName = action.meta?.arg?.endpointName;

            // Check if response contains HTML content
            const isHtmlResponse = response?.headers?.map['content-type']?.includes('text/html');

            // Extract error code and description from HTML if present
            let extractedStatusCode, errorDescription;
            if (isHtmlResponse && payload?.error) {
                const errorCodeMatch = payload.error.match(/<div class="error-code">(\d+)<\/div>/);
                const errorDescMatch = payload.error.match(/<h2>(.*?)<\/h2>/);

                extractedStatusCode = errorCodeMatch ? parseInt(errorCodeMatch[1]) : null;
                errorDescription = errorDescMatch ? errorDescMatch[1] : null;
            }

            // Use extracted status code or fallback to response status
            const statusCode = extractedStatusCode || response?.status;

            const errorMessage = isHtmlResponse
                ? `${errorDescription || 'Server Error'} (${statusCode})`
                : payload?.message || 'An unexpected error occurred';

            // Log the error for debugging purposes
            if (!statusCode) {
                console.log('Network Error:', errorMessage);
                return;
            }

            // Handle the status codes
            switch (statusCode) {
                case 401: // Unauthorized
                    const excludedEndpoints = ['singInOtp', 'signUp'];
                    if (excludedEndpoints.includes(endpointName)) {
                        console.log('Unauthorized:', errorMessage);
                        return next(action);
                    }

                    const state = api.getState();
                    const isAuthenticated = state.persistedReducer.authSlice.isAuthenticated;

                    if (isAuthenticated) {
                        console.log('Session Expired:', errorMessage);
                        api.dispatch(logout());
                    }
                    return next(action);

                case 502: // Bad Gateway
                case 503: // Service Unavailable
                case 504: // Gateway Timeout
                    console.log('Server Unavailable:', errorMessage);
                    return;

                case 400: // Bad Request
                case 422: // Unprocessable Entity
                    console.log('Validation Error:', errorMessage);
                    return;

                case 404: // Not Found
                    console.log('Not Found:', errorMessage);
                    return;

                case 429: // Too Many Requests
                    console.log('Rate Limited:', errorMessage);
                    return;

                default:
                    console.log('Unexpected Error:', errorMessage);
                    return;
            }
        }

        return next(action);
    };

