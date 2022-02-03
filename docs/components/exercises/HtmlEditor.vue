<template>
  <div>
    <div class="flex gap-2 w-full p-4 border-2 border-blue-600 rounded">
      <button class="toolbar-item" @click.stop="onClickCommand('h1')">H1</button>
      <button class="toolbar-item" @click.stop="onClickCommand('h2')">H2</button>
      <button class="toolbar-item" @click.stop="onClickCommand('h3')">H3</button>
      <button class="toolbar-item" @click.stop="onClickCommand('bold')">
        <strong>B</strong>
      </button>
      <button class="toolbar-item" @click.stop="onClickCommand('italic')">
        <i>I</i>
      </button>
      <button class="toolbar-item" @click.stop="onClickCommand('underline')">
        <u>U</u>
      </button>
      <button class="toolbar-item" @click.stop="onClickCommand('justifyLeft')">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"/>
        </svg>
      </button>
      <button class="toolbar-item" @click.stop="onClickCommand('justifyCenter')">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
      <button class="toolbar-item" @click.stop="onClickCommand('justifyRight')">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/>
        </svg>
      </button>
      <button class="toolbar-item" @click.stop="onClickCommand('createLink')">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
        </svg>
      </button>
      <button class="toolbar-item" @click.stop="onClickCommand('superscript')">
        <span>x</span>
        <sup>1</sup>
      </button>
      <button class="toolbar-item" @click.stop="onClickCommand('subscript')">
        <span>x</span>
        <sub>1</sub>
      </button>
      <button class="toolbar-item" @click.stop="onClickCommand('undo')">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
        </svg>
      </button>
    </div>

    <div id="editor" class="editor" contenteditable @keydown.meta.stop="onKeyShortcut">
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api';

export default defineComponent({
  setup() {
    const onClickCommand = (command: string) => {
      if (['h1', 'h2', 'p'].includes(command)) {
        document.execCommand('formatBlock', false, command);
      } else if (['createLink', 'insertimage'].includes(command)) {
        const url = prompt('Enter the link here:', 'https:\/\/');
        if (!url) return;

        document.execCommand(command, false, url);
      } else {
        document.execCommand(command, false, undefined);
      }
    };

    const onKeyShortcut = (e: any) => {
      const key = e.key;

      // Allow other shortcuts (like browser specific ones), if not one of those are pressed
      if (['b', 'u', 'i', 'z'].includes(key)) {
        e.preventDefault();
      }

      switch (key) {
        case 'b':
          onClickCommand('bold');
          break;
        case 'u':
          onClickCommand('underline');
          break;
        case 'i':
          onClickCommand('italic');
          break;
        case 'z':
          onClickCommand('undo');
          break;
        default:
          break;
      }
    };

    return {
      onClickCommand,
      onKeyShortcut
    }
  }
});
</script>

<style scoped>

.toolbar-item {
  @apply flex items-center justify-center p-2 border rounded cursor-pointer w-10 h-10 transition-all duration-300 hover:bg-green-200;
}

.icon {
  @apply w-4 h-4;
}

.editor {
  min-height: 15rem;
  @apply w-full outline-none mt-2 p-2 border-2 border-blue-600 rounded transition-all duration-200 resize-y focus:border-green-500;
}

#editor a {
  text-decoration: underline !important;
  color: #26C485 !important;
}

</style>
