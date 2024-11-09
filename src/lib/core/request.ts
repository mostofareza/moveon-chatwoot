import axios, { AxiosError, AxiosInstance, AxiosHeaders } from 'axios';
import * as rax from 'retry-axios';
import { v4 as uuidv4 } from 'uuid';

import { Config as ApiConfig } from 'src/config';

export interface Config {
  baseUrl: string;
  maxRetries: number;
  apiKey?: string;
  publishableApiKey?: string;
  token?: string;
}

export interface RequestOptions {
  timeout?: number;
  numberOfRetries?: number;
  [key: string]: any; // Allow for additional header fields
}

export type RequestMethod = 'DELETE' | 'POST' | 'GET' | 'PUT' | 'PATCH';

const defaultConfig = {
  maxRetries: 0,
  baseUrl: ApiConfig.api_domain,
};

export class Client {
  private axiosClient: AxiosInstance;
  private config: Config;

  constructor(config: Config) {
    this.axiosClient = this.createClient({ ...defaultConfig, ...config });
    this.config = { ...defaultConfig, ...config };
  }

  /* 
  shouldRetryCondition method is crucial for handling request failures and determining when to retry a failed request. It's needed because:
        # It implements retry logic for handling transient failures
        # It retries requests in specific cases:
            - When there's no response (network issues)
            - When there's a conflict (409)
            - When there are server errors (500-599)

        # Helps prevent infinite retries with the maxRetries check
        # Improves reliability of your API calls
  */
  shouldRetryCondition(
    err: AxiosError,
    numRetries: number,
    maxRetries: number
  ): boolean {
    if (numRetries >= maxRetries) {
      return false;
    }

    if (!err.response) {
      return true;
    }

    if (err.response.status === 409) {
      return true;
    }

    return err.response.status > 500 && err.response.status <= 599;
  }

  /* 
  Header normalization is important because:
    # HTTP headers are case-insensitive but should be consistently formatted
    # It converts headers to a standard format (e.g., "content-type" → "Content-Type")
    # Prevents duplicate headers with different cases
    # Makes header handling more predictable
  */
  normalizeHeaders(obj: Record<string, any>): Record<string, any> {
    if (!(obj && typeof obj === 'object')) {
      return {};
    }

    return Object.keys(obj).reduce((result: Record<string, any>, header) => {
      result[this.normalizeHeader(header)] = obj[header];
      return result;
    }, {});
  }

  normalizeHeader(header: string): string {
    return header
      .split('-')
      .map(
        (text) => text.charAt(0).toUpperCase() + text.substr(1).toLowerCase()
      )
      .join('-');
  }

  setHeaders(
    userHeaders: RequestOptions,
    method: RequestMethod,
    customHeaders: Record<string, any> = {}
): AxiosHeaders {
    const defaultHeaders: Record<string, any> = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };

    if (this.config.token) {
        Object.assign(defaultHeaders, {
            // Add your token-related headers here
        });
    }

    // only add idempotency key, if we want to retry
    if (this.config.maxRetries > 0 && method === 'POST') {
        defaultHeaders['Idempotency-Key'] = uuidv4();
    }

    // Create a new AxiosHeaders instance
    const headers = new AxiosHeaders();

    // Merge all headers
    const mergedHeaders = {
        ...defaultHeaders,
        ...this.normalizeHeaders(userHeaders),
        ...customHeaders,
    };

    // Set each header in the AxiosHeaders instance
    Object.entries(mergedHeaders).forEach(([key, value]) => {
        headers.set(key, value);
    });

    return headers;
}
  createClient(config: Config): AxiosInstance {
    const client = axios.create({
      baseURL: config.baseUrl,
    });

    rax.attach(client);

    client.defaults.raxConfig = {
      instance: client,
      retry: config.maxRetries,
      backoffType: 'exponential',
      shouldRetry: (err: AxiosError): boolean => {
        const cfg = rax.getConfig(err);
        if (cfg) {
          return this.shouldRetryCondition(
            err,
            cfg.currentRetryAttempt ?? 1,
            cfg.retry ?? 3
          );
        } else {
          return false;
        }
      },
    };

    return client;
  }

  // Fixed request method
async request(
    method: RequestMethod,
    path: string,
    payload: Record<string, any> = {},
    options: RequestOptions = {},
    customHeaders: Record<string, any> = {}
): Promise<any> {
    const reqOpts = {
        method,
        withCredentials: true,
        url: path,
        json: true,
        data: payload,
        headers: this.setHeaders(options, method, customHeaders),
    };

    if (['POST', 'DELETE', 'PATCH'].includes(method)) {
        reqOpts['data'] = payload;
    }

    const { data, ...response } = await this.axiosClient(reqOpts);

    return { ...data, response };
}
}
