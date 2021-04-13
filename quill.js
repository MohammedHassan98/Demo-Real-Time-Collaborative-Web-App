/* eslint-env browser */

import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { QuillBinding } from 'y-quill'
import Quill from 'quill'
import QuillCursors from 'quill-cursors'

Quill.register('modules/cursors', QuillCursors)

window.addEventListener('load', () => {
  const ydoc = new Y.Doc()
  const provider = new WebsocketProvider('wss://demos.yjs.dev', 'quill-demo', ydoc)
  const ytext = ydoc.getText('quill')
  const editorContainer = document.createElement('div')
  editorContainer.setAttribute('id', 'editor')
  document.body.insertBefore(editorContainer, null)

  const editor = new Quill(editorContainer, {
    modules: {
      cursors: true,
      toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        ['image', 'code-block']
      ],
      history: {
        userOnly: true
      }
    },
    placeholder: 'Start collaborating...',
    theme: 'snow'
  })

  const binding = new QuillBinding(ytext, editor, provider.awareness)


  const connectBtn = document.getElementById('y-connect-btn')
  connectBtn.addEventListener('click', () => {
    if (provider.shouldConnect) {
      provider.disconnect()
      connectBtn.textContent = 'Connect'
    } else {
      provider.connect()
      connectBtn.textContent = 'Disconnect'
    }
  })

  const fetchNoteBtn = document.getElementById('FetchNote-btn')
  fetchNoteBtn.addEventListener('click', () => {
    // editor.root.innerText = 'Fetched Note'
  })

  const SaveNoteBtn = document.getElementById('SaveNote-btn')
  SaveNoteBtn.addEventListener('click', () => {
    console.log('saved')
  })

  // @ts-ignore
  window.example = { provider, ydoc, ytext, binding, Y }
})
