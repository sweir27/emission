/* @flow */
"use strict"

// import Keys from '../../../android/keys';
const Keys = {
  userID: "",
  accessToken: "",
}

import * as Relay from "react-relay"

let metaphysicsURL
if (__DEV__) {
  metaphysicsURL = "https://metaphysics-staging.artsy.net"
} else {
  metaphysicsURL = "https://metaphysics-production.artsy.net"
}

export { metaphysicsURL }

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer(metaphysicsURL, {
    headers: {
      "X-USER-ID": Keys.userID,
      "X-ACCESS-TOKEN": Keys.accessToken,
    },
  })
)

// Disable the native polyfill during development, which will make network requests show-up in the Chrome dev-tools.
// Specifically, in our case, we get to see the Relay requests.
//
// It will be `undefined` unless running inside Chrome.
//
if (__DEV__ && global.originalXMLHttpRequest !== undefined) {
  global.XMLHttpRequest = global.originalXMLHttpRequest
  // tslint:disable-next-line:no-var-requires
  require("react-relay/lib/RelayNetworkDebug").init()
}
