---
title: "Advanced TypeScript Patterns for Scalable Applications"
description: "Explore advanced TypeScript patterns including conditional types, mapped types, and utility types for building robust, type-safe applications."
category: "technical"
date: "December 23, 2024"
readTime: 10
---

# Advanced TypeScript Patterns for Scalable Applications

TypeScript's advanced type system offers powerful patterns that go beyond basic type annotations. These patterns enable you to build highly type-safe, maintainable applications that catch errors at compile time and provide excellent developer experience.

## Conditional Types

Conditional types allow you to create types that depend on a condition, similar to ternary operators but for types:

```typescript
// Basic conditional type
type IsString<T> = T extends string ? true : false;

type Test1 = IsString<string>;  // true
type Test2 = IsString<number>;  // false

// More practical example: Extract return types
type ApiResponse<T> = T extends (...args: any[]) => Promise<infer R>
  ? R
  : never;

async function getUser(): Promise<{ id: number; name: string }> {
  // Implementation
}

type UserType = ApiResponse<typeof getUser>; // { id: number; name: string }
```

### Distributed Conditional Types

When conditional types are applied to union types, they distribute over each member:

```typescript
type ToArray<T> = T extends any ? T[] : never;

type StringOrNumberArray = ToArray<string | number>;
// Resolves to: string[] | number[]

// Practical example: Extract event names from event handlers
type EventHandlers = {
  onClick: (e: MouseEvent) => void;
  onKeyDown: (e: KeyboardEvent) => void;
  onSubmit: (e: FormEvent) => void;
};

type EventNames<T> = {
  [K in keyof T]: K extends `on${infer E}` ? E : never;
}[keyof T];

type Events = EventNames<EventHandlers>; // "Click" | "KeyDown" | "Submit"
```

## Mapped Types

Mapped types allow you to create new types by transforming properties of existing types:

```typescript
// Basic mapped type
type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Required<T> = {
  [P in keyof T]-?: T[P]; // Remove optionality with -?
};

type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

// Advanced example: Deep readonly
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object
    ? DeepReadonly<T[P]>
    : T[P];
};

interface User {
  id: number;
  profile: {
    name: string;
    settings: {
      theme: string;
      notifications: boolean;
    };
  };
}

type ReadonlyUser = DeepReadonly<User>;
// All properties and nested properties are readonly
```

### Key Remapping in Mapped Types

TypeScript 4.1+ supports key remapping with template literal types:

```typescript
// Transform property names
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

interface Person {
  name: string;
  age: number;
}

type PersonGetters = Getters<Person>;
// {
//   getName: () => string;
//   getAge: () => number;
// }

// Filter properties by type
type StringProperties<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K];
};

interface Config {
  apiUrl: string;
  timeout: number;
  retries: number;
  environment: string;
}

type ConfigStrings = StringProperties<Config>;
// { apiUrl: string; environment: string; }
```

## Template Literal Types

Template literal types enable sophisticated string manipulation at the type level:

```typescript
// Route patterns
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type Route = '/users' | '/posts' | '/comments';

type ApiEndpoint = `${HttpMethod} ${Route}`;
// "GET /users" | "GET /posts" | "GET /comments" |
// "POST /users" | "POST /posts" | etc.

// CSS property names
type CSSProperties = 'margin' | 'padding' | 'border';
type Direction = 'top' | 'right' | 'bottom' | 'left';

type CSSDirectionalProps = `${CSSProperties}-${Direction}`;
// "margin-top" | "margin-right" | "padding-top" | etc.

// Event handling with strict typing
type DOMEvents<T extends string> = `on${Capitalize<T>}`;

type ButtonEvents = DOMEvents<'click' | 'hover' | 'focus'>;
// "onClick" | "onHover" | "onFocus"
```

## Advanced Utility Types

Build sophisticated utility types for common patterns:

```typescript
// Pick nested properties
type NestedPick<T, K extends string> = K extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
    ? { [P in Key]: NestedPick<T[Key], Rest> }
    : never
  : K extends keyof T
    ? { [P in K]: T[K] }
    : never;

interface Database {
  users: {
    profile: {
      name: string;
      email: string;
    };
    settings: {
      theme: string;
    };
  };
  posts: {
    title: string;
    content: string;
  };
}

type UserProfile = NestedPick<Database, 'users.profile'>;
// { users: { profile: { name: string; email: string; } } }

// Function overloading with conditional types
type ApiCall = {
  <T extends 'user'>(endpoint: T, id: number): Promise<User>;
  <T extends 'post'>(endpoint: T, id: number): Promise<Post>;
  <T extends 'comment'>(endpoint: T, postId: number, id: number): Promise<Comment>;
};

// Type-safe event emitter
interface EventMap {
  'user:created': { userId: number; timestamp: Date };
  'user:updated': { userId: number; changes: string[] };
  'post:published': { postId: number; authorId: number };
}

type EventEmitter<T extends Record<string, any>> = {
  on<K extends keyof T>(event: K, handler: (data: T[K]) => void): void;
  emit<K extends keyof T>(event: K, data: T[K]): void;
  off<K extends keyof T>(event: K, handler: (data: T[K]) => void): void;
};

const emitter: EventEmitter<EventMap> = createEmitter();

emitter.on('user:created', (data) => {
  // data is properly typed as { userId: number; timestamp: Date }
  console.log(`User ${data.userId} created at ${data.timestamp}`);
});
```

## Branded Types

Create distinct types that prevent accidental mixing of similar values:

```typescript
// Brand symbol approach
declare const __brand: unique symbol;
type Brand<T, U> = T & { [__brand]: U };

type UserId = Brand<number, 'UserId'>;
type PostId = Brand<number, 'PostId'>;

function createUser(id: UserId): User {
  // Implementation
}

function getPost(id: PostId): Post {
  // Implementation
}

// This would cause a compile error:
// createUser(123); // Error: Argument of type 'number' is not assignable

// Correct usage with branded types
const userId = 123 as UserId;
const postId = 456 as PostId;

createUser(userId);   // ✅ Works
getPost(postId);      // ✅ Works
// createUser(postId); // ❌ Error: Type mismatch

// Utility for creating branded types
function brandValue<T, U>(value: T): Brand<T, U> {
  return value as Brand<T, U>;
}

const safeUserId = brandValue<number, 'UserId'>(123);
```

## Type-Level Programming

Implement complex logic at the type level:

```typescript
// Type-level arithmetic
type Length<T extends readonly any[]> = T['length'];
type Head<T extends readonly any[]> = T extends readonly [infer H, ...any[]] ? H : never;
type Tail<T extends readonly any[]> = T extends readonly [any, ...infer Rest] ? Rest : [];

// Type-level string manipulation
type Split<S extends string, D extends string> =
  S extends `${infer T}${D}${infer U}`
    ? [T, ...Split<U, D>]
    : [S];

type PathSplit = Split<'users/123/posts/456', '/'>;
// ["users", "123", "posts", "456"]

// Recursive type operations
type DeepFlat<T> = T extends readonly (infer U)[]
  ? U extends readonly any[]
    ? DeepFlat<U>
    : U
  : T;

type Nested = [1, [2, [3, [4, 5]]]];
type Flattened = DeepFlat<Nested>; // 1 | 2 | 3 | 4 | 5
```

## Practical Applications

### Type-Safe API Client

```typescript
interface ApiSchema {
  'GET /users': { response: User[] };
  'GET /users/:id': { params: { id: string }; response: User };
  'POST /users': { body: CreateUserRequest; response: User };
  'PUT /users/:id': { params: { id: string }; body: UpdateUserRequest; response: User };
}

type ExtractMethod<T> = T extends `${infer M} ${string}` ? M : never;
type ExtractPath<T> = T extends `${string} ${infer P}` ? P : never;

type ApiClient<Schema extends Record<string, any>> = {
  request<K extends keyof Schema>(
    method: ExtractMethod<K>,
    path: ExtractPath<K>,
    ...args: Schema[K] extends { params: infer P; body: infer B }
      ? [params: P, body: B]
      : Schema[K] extends { params: infer P }
        ? [params: P]
        : Schema[K] extends { body: infer B }
          ? [body: B]
          : []
  ): Promise<Schema[K] extends { response: infer R } ? R : unknown>;
};

// Usage with full type safety
const api: ApiClient<ApiSchema> = createApiClient();

// All parameters are type-checked
const users = await api.request('GET', '/users');
const user = await api.request('GET', '/users/:id', { id: '123' });
const newUser = await api.request('POST', '/users', { name: 'John', email: 'john@example.com' });
```

### Form Validation Types

```typescript
type ValidationRule<T> = {
  required?: boolean;
  minLength?: T extends string ? number : never;
  maxLength?: T extends string ? number : never;
  min?: T extends number ? number : never;
  max?: T extends number ? number : never;
  pattern?: T extends string ? RegExp : never;
  custom?: (value: T) => boolean | string;
};

type FormSchema<T> = {
  [K in keyof T]: ValidationRule<T[K]>;
};

interface UserForm {
  name: string;
  email: string;
  age: number;
  bio?: string;
}

const userFormSchema: FormSchema<UserForm> = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  age: {
    required: true,
    min: 18,
    max: 120
  },
  bio: {
    required: false,
    maxLength: 500
  }
};
```

## Best Practices

1. **Start Simple**: Begin with basic types and gradually introduce advanced patterns as needed
2. **Document Complex Types**: Use comments to explain complex type logic
3. **Use Type Assertions Sparingly**: Prefer type guards and proper type narrowing
4. **Leverage Utility Types**: TypeScript's built-in utilities cover many common patterns
5. **Test Your Types**: Use type-level tests to ensure your types behave as expected

```typescript
// Type testing example
type AssertEqual<T, U> = T extends U ? U extends T ? true : false : false;
type Assert<T extends true> = T;

// Test our utility types
type TestNestedPick = Assert<AssertEqual<
  NestedPick<Database, 'users.profile'>,
  { users: { profile: { name: string; email: string; } } }
>>;
```

## Performance Considerations

> ⚠️ **Performance Warning**: Complex recursive types can slow down TypeScript compilation. Use `--noStrictGenericChecks` for performance-critical builds if needed, but prefer simpler alternatives when possible.

Advanced TypeScript patterns enable you to build incredibly type-safe applications, but remember that the goal is maintainable code. Use these patterns judiciously to create robust APIs and catch errors early while keeping your codebase understandable.

## Conclusion

Advanced TypeScript patterns unlock powerful capabilities for building scalable applications. By leveraging conditional types, mapped types, and template literals, you can create highly expressive type systems that catch errors at compile time and provide excellent developer experience.

Start with the patterns that solve immediate problems in your codebase, and gradually incorporate more advanced techniques as you become comfortable with TypeScript's type system. The investment in learning these patterns pays dividends in code quality, maintainability, and developer productivity.