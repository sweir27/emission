import * as React from "react"

import LoadFailureView from "../Components/LoadFailureView"
import Spinner from "../Components/Spinner"
import { RenderCallback } from "../relay/QueryRenderers"

export default (Component: React.ReactType, initialProps: object = {}): RenderCallback => {
  let retrying = false
  return ({ error, props, retry }) => {
    if (error) {
      if (retrying) {
        retrying = false
        // TODO: Even though this code path is reached, the retry button keeps spinning. iirc it _should_ disappear when
        //      `onRetry` on the instance is unset.
        //
        // This will re-use the native view first created in the renderFailure callback, which means it can
        // continue its ‘retry’ animation.
        return <LoadFailureView style={{ flex: 1 }} />
      } else {
        retrying = true
        return <LoadFailureView onRetry={retry} style={{ flex: 1 }} />
      }
    } else if (props) {
      return <Component {...initialProps} {...props as any} />
    } else {
      return <Spinner style={{ flex: 1 }} />
    }
  }
}
