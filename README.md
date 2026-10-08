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
nested component calls. Explicit component-valued arguments are normalized to
their module value before they are passed to the callee, matching declared
module-parameter types. Optional arguments support explicit absence, guaranteed
value selection, and forwarding optional parameters. Sibling selections establish
group-property dependency order; component, group, reference, and state selection tails
are supported. Derived references retain the selected value and diagnose failed
selections.
Successful references retain the actual resolved dictionary entry;
dictionary dependencies are ordered by Pareto Core.

Missing targets, missing lookup contexts, and acyclic cycles produce error
diagnostics at the reference range. Targets unavailable because of unmarshalling
failures or absent values produce dependent warnings directing the author to
the target diagnostics. Unavailable lookup selections also produce warnings;
when the cause is an unimplemented interpreter operation, a hint
diagnostic says so explicitly rather than implying that the referenced
identifier is invalid.
Cyclic sibling references and cyclic lookup parameters support self/mutual
recursion; their targets are validated after dictionary resolution. Premature
access is reported explicitly. Stack parameters retain the closest entry's frame
depth and support empty stacks, frame pushes, and forwarding through component
calls. Lookup arguments propagate acyclic, cyclic, and stack lookups separately.
Unmarshalling failures remain the unmarshaller's responsibility.

Component and selected-reference constraints interpret relative paths and
state/optional assertions. Named constraints resolve their dependencies before
use and preserve the selected payload. Component/reference constraint selections
and option-constraint selections are available to resolver expressions.
State/optional children receive their option-constraint context; state assertions
and assertions on optional parameters report explicit semantic errors.
Reference constraints are evaluated lazily after dictionary resolution, retaining
cyclic target links. Incorrect states and absent optional values produce errors
at the constrained value's source range.

Lists resolve sequentially and expose the previous resolved item with an explicit
initial selection for the first item. `last item` selects a sibling list's final
resolved output, or its explicit initial selection for an empty list. Relative
paths apply only to present items, never to the initial fallback; failures do not
trigger fallback. Nested lists have independent previous-item contexts.
The local Liana schema resolver also checks that the initial selection has the
same data type as the traversed item.

SQL paths use a state assertion only when selecting the next field's table from
the previous field. A final scalar or foreign-key field is valid; trying to
continue after a scalar field reports an unexpected-state error at the next
field. Instance completion follows the same per-item table selection.

Functional coverage is not complete. Legacy state/optional/list results, benchmark
density, linked-entry selections, list cursors, optional result initialization,
and external component interpretation remain unfinished. Some structural
constraint/result metadata is not yet interpreted; implementation hints are not
a complete inventory of these gaps.

The tests include the real YABNF schema and recursive grammar, injecting terminal
and cyclic nonterminal typos in memory without modifying the example, and the
real SQL schema with one-hop and multi-hop field selection.

## Instance-level reference completion

The `resolve_result/transformers/completion_suggestions` transformer supplements
the existing schema-level completions with identifiers from the reference's
actual lookup context. Dictionary sibling names, selected resolved dictionaries,
and forwarded acyclic/cyclic/stack lookups are supported. Stack names are
deduplicated in closest-frame order. Lookup enumeration is retained lazily, so
completion does not resolve dictionary siblings early or follow recursive links.

Completion also works for missing (`#`), empty, and incorrect reference values.
Suggestions use the ASTN serializer and replace the entire reference token;
the language server inserts them as plain text, not snippets. Existing structural
completions remain available for non-reference positions and unconstrained
documents. This is lookup-scope completion, not constraint-filtered completion:
reference constraints currently validate chosen values but do not narrow the
suggestions.

After compiling `typescript/lib`, run the interpreter tests with:

```sh
node --test typescript/test/resolve_references.test.mjs
```

When using the sibling new-style workspace, after building its Pareto Next
transformer, also run `node --test typescript/test/list_generation.test.mjs`
from this package. This checks
that generated SQL tail selection asserts the previous tail item's state in
the present-item branch and the sibling head's state in the initial branch.
Both assertions occur only when a tail item advances the path.

`node --test typescript/test/sql_lowering.test.mjs` checks the sibling SQL
transformer's head/tail input model against its existing expected SQL ASTs.
