<h1 align="center">Should Release-It</h1><br>

<p align="center">
  Check if should release new version by looking at the commits using conventional commits
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/should-release-it">
    <img alt="npm" src="https://img.shields.io/npm/v/should-release-it?style=flat-square">
  </a>
  <a href="https://github.com/DiogoAbu/should-release-it/actions">
    <img alt="GitHub Workflow Status (with branch)" src="https://img.shields.io/github/actions/workflow/status/DiogoAbu/should-release-it/generate-release.yml?branch=main&label=Release%20Workflow&style=flat-square">
  </a>
</p>

<!-- [BEGIN] Don't edit this section, instead run Markdown AIO: Update Table of Contents -->
## 🚩 Table of Contents

- [🚩 Table of Contents](#-table-of-contents)
- [🚀 Introduction](#-introduction)
- [🔧 Installation](#-installation)
- [📖 Usage](#-usage)
  - [Options](#options)
- [💬 Contributing](#-contributing)
- [❤️ Acknowledgments](#️-acknowledgments)
<!-- [END] Don't edit this section, instead run Markdown AIO: Update Table of Contents -->

## 🚀 Introduction

When releasing using [release-it](https://github.com/release-it/release-it) you might want to release only if the commits messages have meaningful changes.

This script analyzes the commit messages using `conventional commits` to check if a new release is necessary.

It looks for the `@release-it/conventional-changelog` plugin and get the types defined there, the ones that are hidden will not trigger a release.
```json
"plugins": {
  "@release-it/conventional-changelog": {
    "preset": "conventionalcommits",
    "types": [
      { "type": "feat", "section": "Features" },
      { "type": "fix", "section": "Bug Fixes" },
      { "type": "perf", "section": "Performance Improvements" },
      { "type": "revert", "section": "Reverts" },
      { "type": "docs", "section": "Documentation", "effect": "hidden" },
      { "type": "style", "section": "Styles", "effect": "hidden" },
      { "type": "chore", "section": "Miscellaneous Chores", "effect": "hidden" },
      { "type": "refactor", "section": "Code Refactoring", "effect": "hidden" },
      { "type": "test", "section": "Tests", "effect": "hidden" },
      { "type": "build", "section": "Build System", "effect": "hidden" },
      { "type": "ci", "section": "Continuous Integration", "effect": "hidden" }
    ]
  }
}
```

## 🔧 Installation

There's no need to install [should-release-it](https://github.com/DiogoAbu/should-release-it), you can use it with [npx](https://www.npmjs.com/package/npx).

## 📖 Usage

```sh
npx should-release-it <options>
```

```sh
$ npx should-release-it && npm run release-it
```

Output with no meaningful commits
```sh
$ npx should-release-it
» [6:08:53 PM] [should-release-it] › ℹ  Should NOT trigger a release: ci: update workflow
» [6:08:53 PM] [should-release-it] › ℹ  No meaningful commits found, we should not release
```

Output that should trigger release
```sh
$ npx should-release-it
» [11:27:49 PM] [should-release-it] › ℹ  Should NOT trigger a release: ci: clean up workflow
» [11:27:49 PM] [should-release-it] › ℹ  Should trigger a release: feat: update dashboard
» [11:27:49 PM] [should-release-it] › ℹ  Found at least one commit that require a release, we should release
```

Use on CI:
```yml
- name: Check if should release
  run: |
    npx should-release-it || exit 0
    npm run release
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

# OR

- name: Check if should release
  id: should-release
  run: |
    if npx should-release-it; then
      echo "value=true" >> $GITHUB_OUTPUT
    else
      echo "value=false" >> $GITHUB_OUTPUT
    fi
```

### Options

| Argument          | Description                                                                                      | Type     |
|-------------------|--------------------------------------------------------------------------------------------------|----------|
| --current-version | Version to use when getting `git log`, if not provided will use the one on `package.json`.       | [string] |
| --release-it-dir  | Directory to search for the `release-it` config file, defaults to the current working directory. | [string] |
| --silent          | Mute logs.                                                                                       |          |

## 💬 Contributing

Would like to help make this package better? Please take a look at the [contributing guidelines](./CONTRIBUTING.md) for a detailed explanation on how you can contribute.

## ❤️ Acknowledgments

I'd like thank my daily coffee!
