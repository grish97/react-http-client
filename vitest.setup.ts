import "@testing-library/jest-dom/vitest";

import { server } from "@mock";

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
