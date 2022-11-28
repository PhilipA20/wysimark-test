import React, { useState } from "react"
import { BaseEditor, BaseText, createEditor, Text } from "slate"
import { withReact } from "slate-react"

import { createSink } from "../create-sink"
import { ArraySafePluginCustomTypes, ExtractCustomTypes } from "../types"
import {
  AnchorElement,
  anchorPlugin,
  AnchorPluginCustomTypes,
} from "./anchor-plugin"
import { boldPlugin, BoldPluginCustomTypes, BoldText } from "./bold-plugin"
import { initialValue } from "./initial-value"

/**
 * TODO:
 * `anchorPlugin` and `boldPlugin` conflict
 */
const mySink = createSink([anchorPlugin, boldPlugin])

type PluginCustomTypes = ExtractCustomTypes<typeof mySink>
type ParagraphElement = { type: "paragraph"; children: Text[] }

/**
 * NOTE: As of THIS version, we couldn't get CustomTypes to work because of a
 * circular reference.
 *
 * In sink-4 we'll explore seeing if we can find another way to avoid this
 * but it may be well impossible.
 */
declare module "slate" {
  interface CustomTypes {
    Editor: PluginCustomTypes["Editor"]
    Element: PluginCustomTypes["Element"]
    Text: PluginCustomTypes["Text"]
    // Editor: BaseEditor & PluginCustomTypes["Editor"]
    // Element: ParagraphElement | AnchorElement
    // Text: BaseText & BoldText
  }
}

const Page = () => {
  const [editor] = useState(() => mySink.withEditor(withReact(createEditor())))
  return (
    <mySink.Slate editor={editor} value={initialValue}>
      <mySink.Editable />
    </mySink.Slate>
  )
}

export default Page
