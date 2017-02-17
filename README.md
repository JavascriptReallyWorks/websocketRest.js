![Project logo](https://github.com/urosjarc/websocketRest.js/blob/develop/docs/media/header.png?raw=true)

<br>

[![npm release][npm]][npm-url]
[![Travis][travis]][travis-url]
[![Coverage Status][coverage]][coverage-url]
[![Dependency Status][dep]][dep-url]
[![Codebeat badge][codestyle]][codestyle-url]
[![Docs Status][docs]][docs-url]
[![Join the chat][chat]][chat-url]

> Opinionated socket lib, helping you to build REST like arhitecture socket API.

[![Patreon User][support]][support-url]
[![Twitter User][twitter]][twitter-url]

[npm]: https://img.shields.io/npm/v/websocketRest.js.svg
[npm-url]: https://www.npmjs.com/package/websocketRest.js
[travis]: https://img.shields.io/travis/urosjarc/websocketRest.js.svg
[travis-url]: https://travis-ci.org/urosjarc/websocketRest.js
[coverage]: https://img.shields.io/codacy/coverage/ae73417f36ff499ca6575b96886a0c27.svg
[coverage-url]: https://www.codacy.com/app/urosjarc/websocketRest.js
[codestyle]: https://img.shields.io/codacy/grade/ae73417f36ff499ca6575b96886a0c27.svg
[codestyle-url]: https://www.codacy.com/app/urosjarc/websocketRest.js
[dep]: https://img.shields.io/david/urosjarc/websocketRest.js.svg
[dep-url]: https://david-dm.org/urosjarc/websocketRest.js
[docs]: http://inch-ci.org/github/urosjarc/websocketRest.js.svg?branch=master
[docs-url]: http://inch-ci.org/github/urosjarc/websocketRest.js
[chat]: https://badges.gitter.im/Join%20Chat.svg
[chat-url]: https://gitter.im/urosjarc/websocketRest.js?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge
[support]: https://img.shields.io/badge/patreon-urosjarc-green.svg?style=social
[support-url]: https://patreon.com/urosjarc/
[twitter]: https://img.shields.io/twitter/follow/urosjarc.svg?style=social&label=follow
[twitter-url]: https://twitter.com/intent/follow?screen_name=urosjarc

<br>

## Description

**WR.js** (websocketRest.js) wraps [websocket lib](https://www.npmjs.com/package/ws)
and creates more developer friendly arhitecture for creating backend
socket API. I started developing this library to have socket API code similar to
API created with [express.js](https://www.npmjs.com/package/express).
I added many additional features which was not implemented in **ws**. One of the biggest
feature additional to **ws** is advance ping checking if client is still alive or
clients socket duplicates do to network failure, network switching in 3G/wifi networks.

<br>

## Homepage
For more informations please visit projects official homepage.
> [https://urosjarc.github.io/websocketRest.js](https://urosjarc.github.io/websocketRest.js)

<br>

## License
Copyright © 2016 Uroš Jarc

MIT License