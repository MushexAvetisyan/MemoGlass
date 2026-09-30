<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  card: {
    type: Object,
    default: null
  },
  categories: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits([
  'save',
  'cancel'
])

const form = reactive({
  title: '',
  type: 'text',
  category: 'general',
  description: '',
  content: '',
  link: '',
  tags: ''
})

watch(
    () => props.card,
    (card) => {
      if (card) {
        form.title = card.title || ''
        form.type = card.type || 'text'
        form.category = card.category || 'general'
        form.description = card.description || ''
        form.content = card.content || ''
        form.link = card.link || ''
        form.tags = Array.isArray(card.tags)
            ? card.tags.join(', ')
            : ''
      } else {
        resetForm()
      }
    },
    {
      immediate: true
    }
)

function resetForm() {
  form.title = ''
  form.type = 'text'
  form.category = 'general'
  form.description = ''
  form.content = ''
  form.link = ''
  form.tags = ''
}

function submitForm() {
  if (!form.title.trim()) {
    return
  }

  emit('save', {
    title: form.title.trim(),
    type: form.type,
    category: form.category,
    description: form.description.trim(),
    content: form.content.trim(),
    link: form.link.trim(),
    tags: form.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(Boolean)
  })
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div class="editor-overlay" @click.self="emit('cancel')">
        <div class="editor-modal glass-strong">

          <div class="editor-header">
            <div>
              <span class="editor-eyebrow">
                {{ card ? 'EDIT CARD' : 'NEW CARD' }}
              </span>

              <h2>
                {{ card ? 'Edit your knowledge' : 'Create a new card' }}
              </h2>
            </div>

            <button
                class="close-button"
                type="button"
                @click="emit('cancel')"
            >
              ×
            </button>
          </div>

          <form @submit.prevent="submitForm">

            <div class="form-group">
              <label>Title</label>

              <input
                  v-model="form.title"
                  type="text"
                  placeholder="e.g. Git reset"
                  autofocus
              >
            </div>

            <div class="form-row">

              <div class="form-group">
                <label>Type</label>

                <select v-model="form.type">
                  <option value="text">Text</option>
                  <option value="command">Command</option>
                  <option value="link">Link</option>
                  <option value="note">Note</option>
                </select>
              </div>

              <div class="form-group">
                <label>Category</label>

                <select v-model="form.category">
                  <option
                      v-for="category in categories"
                      :key="category.id"
                      :value="category.id"
                  >
                    {{ category.name }}
                  </option>
                </select>
              </div>

            </div>

            <div class="form-group">
              <label>Description</label>

              <input
                  v-model="form.description"
                  type="text"
                  placeholder="Short explanation..."
              >
            </div>

            <div class="form-group">
              <label>Content</label>

              <textarea
                  v-model="form.content"
                  rows="7"
                  placeholder="Write your knowledge here..."
              />
            </div>

            <div class="form-group">
              <label>Link</label>

              <input
                  v-model="form.link"
                  type="url"
                  placeholder="https://example.com"
              >
            </div>

            <div class="form-group">
              <label>Tags</label>

              <input
                  v-model="form.tags"
                  type="text"
                  placeholder="vue, javascript, frontend"
              >

              <small>
                Separate tags with commas.
              </small>
            </div>

            <div class="editor-footer">

              <button
                  type="button"
                  class="button button-secondary"
                  @click="emit('cancel')"
              >
                Cancel
              </button>

              <button
                  type="submit"
                  class="button button-primary"
              >
                {{ card ? 'Save Changes' : 'Create Card' }}
              </button>

            </div>

          </form>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
@use '../assets/styles/variables' as *;
.editor-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 20px;

  background: rgba(0, 0, 0, 0.7);

  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.editor-modal {
  width: min(680px, 100%);
  max-height: calc(100vh - 40px);

  overflow-y: auto;

  padding: 28px;

  border-radius: 24px;

  box-shadow:
      0 30px 100px rgba(0, 0, 0, 0.5),
      0 0 50px rgba(155, 92, 255, 0.08);
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  margin-bottom: 28px;
}

.editor-eyebrow {
  display: block;

  margin-bottom: 6px;

  color: $purple;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
}

.editor-header h2 {
  margin: 0;

  font-size: 24px;
}

.close-button {
  width: 38px;
  height: 38px;

  border: 1px solid $border;
  border-radius: 50%;

  background: rgba(255, 255, 255, 0.04);
  color: $text-secondary;

  font-size: 24px;

  transition: $transition;

  &:hover {
    background: rgba(255, 48, 79, 0.12);
    color: $red;
  }
}

.form-group {
  margin-bottom: 18px;

  label {
    display: block;

    margin-bottom: 8px;

    color: $text-secondary;

    font-size: 13px;
    font-weight: 600;
  }

  input,
  textarea,
  select {
    width: 100%;

    border: 1px solid $border;
    border-radius: 12px;

    background: rgba(0, 0, 0, 0.25);

    color: $text-primary;

    padding: 13px 14px;

    outline: none;

    transition: $transition;

    &:focus {
      border-color: rgba(155, 92, 255, 0.55);

      box-shadow:
          0 0 0 3px rgba(155, 92, 255, 0.08);
    }
  }

  textarea {
    resize: vertical;
    min-height: 140px;
  }

  select {
    appearance: none;
  }

  small {
    display: block;

    margin-top: 6px;

    color: $text-muted;

    font-size: 11px;
  }
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.editor-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  margin-top: 28px;
}

.button {
  border: 0;
  border-radius: 12px;

  padding: 12px 18px;

  font-weight: 600;

  transition: $transition;
}

.button-secondary {
  border: 1px solid $border;

  background: rgba(255, 255, 255, 0.04);
  color: $text-secondary;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    color: $text-primary;
  }
}

.button-primary {
  background: linear-gradient(
      135deg,
      $purple,
      $red
  );

  color: white;

  box-shadow:
      0 8px 25px rgba(155, 92, 255, 0.18);

  &:hover {
    transform: translateY(-1px);

    box-shadow:
        0 12px 30px rgba(155, 92, 255, 0.28);
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;

  .editor-modal {
    transition:
        transform 0.2s ease,
        opacity 0.2s ease;
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;

  .editor-modal {
    transform: translateY(20px) scale(0.98);
    opacity: 0;
  }
}

@media (max-width: 700px) {
  .editor-overlay {
    padding: 0;
  }

  .editor-modal {
    width: 100%;
    height: 100%;
    max-height: none;

    border-radius: 0;

    padding: 22px 18px;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .editor-footer {
    position: sticky;
    bottom: 0;

    margin-left: -18px;
    margin-right: -18px;
    padding: 16px 18px;

    background: rgba(5, 5, 7, 0.92);

    backdrop-filter: blur(20px);
  }

  .button {
    flex: 1;
  }
}
</style>