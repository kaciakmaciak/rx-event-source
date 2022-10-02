# RxEventSource

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[all-contributors-badge]: https://img.shields.io/badge/all_contributors-1-orange.svg?style=round-square 'Number of contributors on All-Contributors'

<!-- ALL-CONTRIBUTORS-BADGE:END -->

[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/kaciakmaciak/rx-event-source?display_name=tag&sort=semver)](https://github.com/kaciakmaciak/rx-event-source/releases)
[![All Contributors][all-contributors-badge]](#contributors-)
[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-ready--to--code-908a85?logo=gitpod)](https://gitpod.io/#https://github.com/kaciakmaciak/rx-event-source)
[![codecov](https://codecov.io/gh/kaciakmaciak/rx-event-source/branch/master/graph/badge.svg)](https://codecov.io/gh/kaciakmaciak/rx-event-source)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/kaciakmaciak/rx-event-source/CI)
![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/kaciakmaciak/rx-event-source)
![Semantic release](https://img.shields.io/badge/%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079)
[![npm bundle size](https://img.shields.io/bundlephobia/min/rx-event-source)](https://www.npmjs.com/package/rx-event-source)
[![GitHub](https://img.shields.io/github/license/kaciakmaciak/rx-event-source)](LICENSE)

[API Reference](https://kaciakmaciak.github.io/rx-event-source/)

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/kaciakmaciak/rx-event-source)

## Background

Helper function to create an RxJS observable from `EventSource`.

## Installation

### NPM

```sh
npm install rx-event-source rxjs@7
```

or

```sh
yarn add rx-event-source rxjs@7
```

## Usage

```TypeScript
import { eventSource$ } from 'rx-event-source';

eventSource$('/api/v1/sse').subscribe((data) => {
  console.log(data);
});
```

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/kaciakmaciak"><img src="https://avatars.githubusercontent.com/u/17466633?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Katarina Anton</b></sub></a><br /><a href="https://github.com/kaciakmaciak/rx-event-source/commits?author=kaciakmaciak" title="Code">💻</a> <a href="#ideas-kaciakmaciak" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-kaciakmaciak" title="Maintenance">🚧</a> <a href="https://github.com/kaciakmaciak/rx-event-source/commits?author=kaciakmaciak" title="Tests">⚠️</a> <a href="#tool-kaciakmaciak" title="Tools">🔧</a> <a href="#infra-kaciakmaciak" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
