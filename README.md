# Liana Authoring

The sealing query produces a paragraph and takes parsing settings (`tab size`),
not serialization settings. The sealing CLI supplies `indentation` and `newline`
to Pareto Common's file-to-stream wrapper, which forwards the paragraph directly
to `log paragraph`. Diagnostics use `log error paragraph`.

## Resolver interpreter

The `unmarshall_result/transformers/resolve_result` transformer interprets resolver
definitions while retaining the unmarshalled document and source locations.
Acyclic selected references can use dictionary siblings or named acyclic lookup
parameters, or select a resolved dictionary from a sibling/value parameter.
Required value arguments and forwarded value parameters are interpreted through
nested component calls. Sibling selections establish group-property dependency
order, and explicit component/group selection tails are supported.
Successful references retain the actual resolved dictionary entry;
dictionary dependencies are ordered by Pareto Core.

Missing targets, unavailable entry values, missing lookup contexts, and acyclic
cycles produce resolve statuses and semantic diagnostics at the reference range.
Unmarshalling failures remain the unmarshaller's responsibility. Cyclic/stack
references, optional value arguments, and reference constraints are not
implemented yet and produce an explicit unsupported hint.

After compiling `typescript/lib`, run the interpreter tests with:

```sh
node --test typescript/test/resolve_references.test.mjs
```
