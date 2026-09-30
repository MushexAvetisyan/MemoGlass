<template>
  <Teleport to="body">

    <Transition name="modal">

      <div
          v-if="card"
          class="modal-backdrop"
          @click.self="$emit('close')"
      >

        <article class="card-modal glass-strong">

          <!-- Header -->

          <header class="modal-header">

            <div class="header-info">

              <span
                  class="type-badge"
                  :class="card.type"
              >
                {{ card.type }}
              </span>

              <span class="category">
                {{ categoryName }}
              </span>

            </div>


            <div class="header-actions">

              <button
                  class="icon-button favorite"
                  :class="{ active: card.favorite }"
                  title="Favorite"
                  @click="$emit('favorite')"
              >
                ★
              </button>

              <button
                  class="icon-button close"
                  title="Close"
                  @click="$emit('close')"
              >
                ×
              </button>

            </div>

          </header>


          <!-- Main content -->

          <div class="modal-content">

            <h1>
              {{ card.title }}
            </h1>


            <p
                v-if="card.description"
                class="description"
            >
              {{ card.description }}
            </p>


            <!-- Main content -->

            <section
                v-if="card.content"
                class="content-section"
            >

              <div class="section-title">
                <span></span>
                Content
              </div>


              <div
                  class="content-box"
                  :class="{ code: card.type === 'command' }"
              >

                <pre
                    v-if="card.type === 'command'"
                >{{ card.content }}</pre>

                <div
                    v-else
                    class="text-content"
                >
                  {{ card.content }}
                </div>


                <button
                    v-if="card.type === 'command'"
                    class="copy-button"
                    :class="{ copied }"
                    @click="copyContent"
                >
                  {{ copied ? '✓ Copied' : 'Copy' }}
                </button>

              </div>

            </section>


            <!-- Link -->

            <section
                v-if="card.link"
                class="content-section"
            >

              <div class="section-title">
                <span></span>
                Reference
              </div>


              <a
                  :href="card.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="link-box"
              >

                <span class="link-icon">
                  ↗
                </span>

                <span>
                  {{ card.link }}
                </span>

              </a>

            </section>


            <!-- Tags -->

            <section
                v-if="card.tags?.length"
                class="content-section"
            >

              <div class="section-title">
                <span></span>
                Tags
              </div>


              <div class="tags">

                <span
                    v-for="tag in card.tags"
                    :key="tag"
                    class="tag"
                >
                  #{{ tag }}
                </span>

              </div>

            </section>

          </div>


          <!-- Footer -->

          <footer class="modal-footer">

            <div class="metadata">

              <span>
                Created
              </span>

              <strong>
                {{ formattedDate }}
              </strong>

            </div>


            <div class="footer-actions">

              <button
                  class="edit-button"
                  @click="$emit('edit')"
              >
                Edit
              </button>

              <button
                  class="delete-button"
                  @click="$emit('delete')"
              >
                Delete
              </button>

            </div>

          </footer>

        </article>

      </div>

    </Transition>

  </Teleport>
</template>


<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  card: {
    type: Object,
    required: true
  },

  categoryName: {
    type: String,
    default: 'General'
  }
})

defineEmits([
  'close',
  'favorite',
  'edit',
  'delete'
])

const copied = ref(false)

const formattedDate = computed(() => {
  if (!props.card.createdAt) {
    return 'Unknown'
  }

  return new Date(
      props.card.createdAt
  ).toLocaleDateString()
})


async function copyContent() {
  if (!props.card.content) {
    return
  }

  try {
    await navigator.clipboard.writeText(
        props.card.content
    )

    copied.value = true

    setTimeout(() => {
      copied.value = false
    }, 1500)

  } catch (error) {
    console.error(
        'Failed to copy:',
        error
    )
  }
}
</script>


<style scoped lang="scss">
@use '../assets/styles/variables' as *;


/* =========================
   BACKDROP
========================= */

.modal-backdrop {
  position: fixed;

  inset: 0;

  padding: 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  background:
      rgba(0, 0, 0, 0.78);

  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  z-index: 200;
}


/* =========================
   MODAL
========================= */

.card-modal {
  width: min(760px, 100%);

  max-height:
      calc(100vh - 40px);

  overflow-y: auto;

  border-radius: 24px;

  box-shadow:
      0 35px 120px rgba(0, 0, 0, 0.65);

  scrollbar-width: thin;
}


/* =========================
   HEADER
========================= */

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 22px 24px;

  border-bottom:
      1px solid rgba(255, 255, 255, 0.06);
}


.header-info {
  display: flex;
  align-items: center;
  gap: 10px;
}


.type-badge {
  padding: 6px 10px;

  border-radius: 7px;

  font-size: 9px;
  font-weight: 700;

  text-transform: uppercase;

  letter-spacing: 0.8px;
}


.type-badge.command {
  color: $green;

  background:
      rgba(53, 229, 140, 0.09);

  border:
      1px solid rgba(53, 229, 140, 0.12);
}


.type-badge.link {
  color: $red;

  background:
      rgba(255, 48, 79, 0.09);

  border:
      1px solid rgba(255, 48, 79, 0.12);
}


.type-badge.text,
.type-badge.note {
  color: $purple;

  background:
      rgba(155, 92, 255, 0.09);

  border:
      1px solid rgba(155, 92, 255, 0.12);
}


.category {
  color: $text-muted;

  font-size: 10px;
}


.header-actions {
  display: flex;
  gap: 6px;
}


.icon-button {
  width: 38px;
  height: 38px;

  display: grid;
  place-items: center;

  border: 1px solid $border;

  border-radius: 10px;

  background:
      rgba(255, 255, 255, 0.035);

  color: $text-secondary;

  font-size: 19px;

  transition: $transition;
}


.icon-button:hover {
  background:
      rgba(255, 255, 255, 0.07);
}


.icon-button.favorite.active {
  color: $red;

  text-shadow:
      0 0 16px
      rgba(255, 48, 79, 0.65);
}


.icon-button.close:hover {
  color: $red;

  border-color:
      rgba(255, 48, 79, 0.25);
}


/* =========================
   CONTENT
========================= */

.modal-content {
  padding: 28px 24px;
}


.modal-content h1 {
  margin: 0;

  font-size: clamp(28px, 5vw, 40px);

  line-height: 1.1;

  letter-spacing: -1px;
}


.description {
  margin: 14px 0 0;

  color: $text-secondary;

  line-height: 1.7;
}


.content-section {
  margin-top: 30px;
}


.section-title {
  display: flex;
  align-items: center;

  gap: 8px;

  margin-bottom: 10px;

  color: $text-secondary;

  font-size: 11px;
  font-weight: 600;
}


.section-title span {
  width: 5px;
  height: 5px;

  border-radius: 50%;

  background: $purple;

  box-shadow:
      0 0 10px
      rgba(155, 92, 255, 0.6);
}


/* =========================
   CONTENT BOX
========================= */

.content-box {
  position: relative;

  padding: 18px;

  border-radius: 13px;

  background:
      rgba(0, 0, 0, 0.25);

  border:
      1px solid
      rgba(255, 255, 255, 0.06);
}


.content-box.code {
  padding: 20px;

  background:
      rgba(0, 0, 0, 0.4);

  border-color:
      rgba(53, 229, 140, 0.1);
}


.content-box pre {
  margin: 0;

  padding-right: 60px;

  overflow-x: auto;

  color: $green;

  font-family:
      "JetBrains Mono",
      "Fira Code",
      monospace;

  font-size: 13px;

  line-height: 1.7;

  white-space: pre-wrap;

  word-break: break-word;
}


.text-content {
  color: $text-primary;

  line-height: 1.8;

  white-space: pre-wrap;
}


.copy-button {
  position: absolute;

  top: 10px;
  right: 10px;

  padding: 7px 10px;

  border: 1px solid
  rgba(53, 229, 140, 0.16);

  border-radius: 8px;

  background:
      rgba(53, 229, 140, 0.06);

  color: $green;

  font-size: 9px;

  transition: $transition;
}


.copy-button:hover,
.copy-button.copied {
  background:
      rgba(53, 229, 140, 0.12);
}


/* =========================
   LINK
========================= */

.link-box {
  display: flex;
  align-items: center;

  gap: 10px;

  padding: 13px 15px;

  border-radius: 11px;

  background:
      rgba(155, 92, 255, 0.05);

  border:
      1px solid
      rgba(155, 92, 255, 0.12);

  color: $purple;

  font-size: 12px;

  overflow: hidden;

  transition: $transition;
}


.link-box:hover {
  background:
      rgba(155, 92, 255, 0.09);
}


.link-box span:last-child {
  overflow: hidden;

  text-overflow: ellipsis;

  white-space: nowrap;
}


.link-icon {
  flex-shrink: 0;

  font-size: 16px;
}


/* =========================
   TAGS
========================= */

.tags {
  display: flex;
  flex-wrap: wrap;

  gap: 7px;
}


.tag {
  padding: 6px 9px;

  border-radius: 7px;

  background:
      rgba(255, 255, 255, 0.045);

  border:
      1px solid
      rgba(255, 255, 255, 0.06);

  color: $text-secondary;

  font-size: 9px;
}


/* =========================
   FOOTER
========================= */

.modal-footer {
  padding: 18px 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 20px;

  border-top:
      1px solid
      rgba(255, 255, 255, 0.06);
}


.metadata {
  display: flex;
  flex-direction: column;

  gap: 3px;
}


.metadata span {
  color: $text-muted;

  font-size: 9px;
}


.metadata strong {
  color: $text-secondary;

  font-size: 10px;
}


.footer-actions {
  display: flex;

  gap: 8px;
}


.edit-button,
.delete-button {
  padding: 9px 13px;

  border-radius: 9px;

  font-size: 10px;

  transition: $transition;
}


.edit-button {
  border:
      1px solid
      rgba(155, 92, 255, 0.2);

  background:
      rgba(155, 92, 255, 0.06);

  color: $purple;
}


.delete-button {
  border:
      1px solid
      rgba(255, 48, 79, 0.2);

  background:
      rgba(255, 48, 79, 0.05);

  color: $red;
}


.edit-button:hover {
  background:
      rgba(155, 92, 255, 0.12);
}


.delete-button:hover {
  background:
      rgba(255, 48, 79, 0.12);
}


/* =========================
   ANIMATION
========================= */

.modal-enter-active,
.modal-leave-active {
  transition:
      opacity 0.25s ease;
}


.modal-enter-active .card-modal,
.modal-leave-active .card-modal {
  transition:
      transform 0.25s ease,
      opacity 0.25s ease;
}


.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}


.modal-enter-from .card-modal,
.modal-leave-to .card-modal {
  opacity: 0;

  transform:
      translateY(20px)
      scale(0.97);
}


/* =========================
   MOBILE
========================= */

@media (max-width: 700px) {

  .modal-backdrop {
    padding: 0;
  }


  .card-modal {
    width: 100%;
    height: 100%;

    max-height: none;

    border-radius: 0;

    border-left: 0;
    border-right: 0;
  }


  .modal-header {
    padding:
        16px 18px;
  }


  .modal-content {
    padding:
        25px 18px 35px;
  }


  .modal-footer {
    padding:
        16px 18px;

    flex-direction: column;

    align-items: stretch;
  }


  .footer-actions {
    width: 100%;
  }


  .edit-button,
  .delete-button {
    flex: 1;

    padding: 12px;
  }

}
</style>