# Trunk based development

Trunk-based development eases the friction of code integration. When developers finish new work, they must merge the new code into the `main` branch.

Yet they should not merge changes to the truck until they have verified that they can build successfully. During this phase, conflicts may arise if modifications have been made since the new work began. In particular, these conflicts are increasingly complex as development teams grow and the code base scales. This happens when developers create separate branches that deviate from the source branch and other developers are simultaneously merging overlapping code. Luckily, the trunk-based development model reduces these conflicts.

- **Our trunk** branch is the `main` branch.
- **The other branches** must follow the conventional commit type pattern:
  - `refactor/{{ description fo the change }}` for code refactoring.
  - `perf/{{ description fo the change }}` for performance improvements.
  - `test/{{ description fo the change }}` for test changes.
  - `build/{{ description fo the change }}` for build changes.
  - `ci/{{ description fo the change }}` for CI changes.
  - `chore/{{ description fo the change }}` for other changes.
  - `revert/{{ description fo the change }}` for reverting changes.
  - `feat/{{ description fo the change }}` for new features.
    - If the new feature is a breaking change, the commit message must have the `!` symbol at the end of the type. For example: `feat!: add new feature`.
  - `fix/{{ description fo the change }}` for bug fixes.
  - `docs/{{ description fo the change }}` for documentation changes.
  - `style/{{ description fo the change }}` for style changes.
