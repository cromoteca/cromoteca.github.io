---
title: "RFC: Lightweight Java Code Generator and WebAssembly Toolkit Prototype"
description: "Proposing a simplified Java-only code generator to accelerate feature development and support WebAssembly toolkit integration."
category: "technical"
date: "September 23, 2025"
readTime: 8
---

## Context

Vaadin Flow and Hilla provide powerful ways to build modern web applications. Hilla, in particular, connects Java backend models with a React/TypeScript frontend through a TypeScript generator. This generator is the result of significant effort and has proven itself in production use. However, its architecture introduces complexity that makes it harder to extend quickly for new features.

Currently, the generator spans multiple Maven modules and npm packages. Its test setup is also split into Java tests (for the parser) and TypeScript tests (for the generator). This separation brings the risk of divergence between the two, especially if the Java output does not perfectly match what the TypeScript generator expects. Additionally, the two sides communicate through an OpenAPI definition: while valuable for documenting APIs, it cannot capture all required details, so custom tags are used. These architectural choices add robustness but also mean that implementing new functionality can take considerable time—sometimes to the point of abandoning certain improvements altogether.

A complementary approach is to build a **Java-only lightweight generator**, reducing these layers of complexity and accelerating feature development. In parallel, a proposal has emerged for a **WebAssembly (Wasm) toolkit** that allows writing Java-based views running client-side in the browser. These views would still need to communicate with a Java backend, making code generation a key component.

This RFC introduces two proof-of-concept repositories:

- [jackson-parser](https://github.com/cromoteca/jackson-parser): lightweight generator prototype, created in 2023.
- [wasm-flow](https://github.com/cromoteca/wasm-flow): WebAssembly toolkit prototype, created in 2025.

## Repositories

### jackson-parser

This repository contains the **lightweight generator**.

- **`generator`** → main code implementing a *type handler* pattern. Each Java type has its own handler responsible for both generation logic and Jackson configuration. This provides clean separation of concerns and extensibility.
- **`endpoints`** → sample endpoints to test generated output.
- **`webapp`** → demo UI to try out the generator interactively.

**Key features:**
- Pure Java (no Node/TypeScript process required).
- Extensible type handler system.
- Integrated with Jackson configuration.
- Simplifies feature additions like validators or communication stubs.
- Faster iteration compared to the heavier, multi-module architecture.

**Examples of what the lightweight generator can do:**
- Generate **object models** (as in Hilla) or alternative models enriched with validation logic.
- Generate **validators** for frameworks like React Hook Form.
- Generate **editors** that can be plugged into tools like AutoForm.
- Generate **fields** usable in components such as AutoGrid.
- Generate **communication stubs and shared code** required for wasm-flow (the Wasm port of Flow).
- In general, generate any code that can be derived from Java types or API definitions, not just models.

### wasm-flow

This repository contains a **proof-of-concept WebAssembly toolkit** that mirrors Hilla but for Java views, which [can look almost identical to Flow views](https://github.com/cromoteca/wasm-flow/blob/main/src/main/java/com/cromoteca/wasmcf/client/views/MainView.java).

- Client views are written in Java and compiled to WebAssembly.
- Server communication follows the same model as Hilla.
- Requires generated code to bridge client/server types.
- The lightweight generator from `jackson-parser` fits naturally here.

## Proposal

1. **Adopt a lightweight Java-only generator** as a foundation for shared type and endpoint generation.
   - Reduces architectural complexity and external dependencies.
   - Simplifies adding new features.
   - Provides a single testing model within Java.

2. **Position wasm-flow as a sibling to Hilla**:
   - **Hilla**: React + TypeScript, generated with TypeScript.
   - **Wasm Flow**: Java + WebAssembly, generated with Java.
   - Both share the same server communication pattern.

3. **Unify communication tooling** across Hilla and wasm-flow through a common generator.
   - Ensures consistency.
   - Avoids duplication of codegen logic.
   - Enables faster prototyping of new features.

## Future Ideas

In addition to the examples already listed, the lightweight generator could support **AI-driven, real-time interface generation**. Beyond producing models, validators, or editors, it could generate dynamic field definitions and UI components tailored for assembly by large language models. With these building blocks in place, an LLM could efficiently construct dynamic frontends while consuming fewer tokens and less complexity.

This approach aligns with Vaadin's broader exploration of AI-assisted development. Hilla developers could contribute by providing lightweight, well-defined components that make it easier for AI to assemble UIs on the fly. Furthermore, these components could include **Markdown-ready definitions**, making them usable both in traditional UIs and within conversational interfaces.

---

*Author: Luciano Vernaschi*

