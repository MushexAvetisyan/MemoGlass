<script setup>
import { ref } from 'vue'
import { useKnowledgeStore } from '../stores/knowledge'

import CardModal from '../components/CardModal.vue'
import CardEditor from '../components/CardEditor.vue'

const knowledgeStore = useKnowledgeStore()

const showEditor = ref(false)
const selectedCard = ref(null)
const editingCard = ref(null)

function openCreateModal() {
  editingCard.value = null
  showEditor.value = true
}

function openCard(card) {
  selectedCard.value = card
}

function openEdit(card) {
  editingCard.value = {
    ...card,
    tags: [...(card.tags || [])]
  }

  selectedCard.value = null
  showEditor.value = true
}

function saveCard(cardData) {
  if (editingCard.value) {
    knowledgeStore.updateCard(
        editingCard.value.id,
        cardData
    )
  } else {
    knowledgeStore.createCard(cardData)
  }

  showEditor.value = false
  editingCard.value = null
}

function closeEditor() {
  showEditor.value = false
  editingCard.value = null
}

function toggleFavorite(card) {
  knowledgeStore.toggleFavorite(card.id)

  selectedCard.value = knowledgeStore.cards.find(
      item => item.id === card.id
  )
}

function deleteCard(card) {
  knowledgeStore.deleteCard(card.id)

  selectedCard.value = null
}

function editSelectedCard() {
  if (!selectedCard.value) {
    return
  }

  openEdit(selectedCard.value)
}

function getCategoryName(categoryId) {
  const category = knowledgeStore.categories.find(
      item => item.id === categoryId
  )

  return category?.name || 'General'
}

function getCategoryColor(categoryId) {
  const category = knowledgeStore.categories.find(
      item => item.id === categoryId
  )

  return category?.color || 'purple'
}
</script>

<template>
  <main class="cards-page">

    <!-- PAGE HEADER -->

    <section class="page-header">

      <div>
        <span class="eyebrow">
          KNOWLEDGE VAULT
        </span>

        <h1>My Cards</h1>

        <p>
          Keep your commands, notes, links and knowledge organized.
        </p>
      </div>

      <button
          class="create-button"
          type="button"
          @click="openCreateModal"
      >
        <span>+</span>
        New Card
      </button>

    </section>


    <!-- EMPTY STATE -->

    <section
        v-if="knowledgeStore.cards.length === 0"
        class="empty-state glass"
    >

      <div class="empty-icon">
        ✦
      </div>

      <h2>Your knowledge vault is empty</h2>

      <p>
        Create your first card and start building your personal
        knowledge base.
      </p>

      <button
          class="create-button"
          type="button"
          @click="openCreateModal"
      >
        Create First Card
      </button>

    </section>


    <!-- CARDS GRID -->

    <section
        v-else
        class="cards-grid"
    >

      <article
          v-for="card in knowledgeStore.cards"
          :key="card.id"
          class="knowledge-card glass"
          @click="openCard(card)"
      >

        <div class="card-top">

          <span
              class="type-badge"
              :class="`type-${card.type}`"
          >
            {{ card.type }}
          </span>

          <button
              class="favorite-button"
              :class="{ active: card.favorite }"
              type="button"
              @click.stop="toggleFavorite(card)"
          >
            {{ card.favorite ? '★' : '☆' }}
          </button>

        </div>


        <div class="card-content">

          <h3>
            {{ card.title }}
          </h3>

          <p v-if="card.description">
            {{ card.description }}
          </p>

        </div>


        <div class="card-bottom">

          <span
              class="category"
              :class="`category-${getCategoryColor(card.category)}`"
          >
            {{ getCategoryName(card.category) }}
          </span>

          <span class="arrow">
            →
          </span>

        </div>

      </article>

    </section>


    <!-- CARD DETAILS -->

    <CardModal
        v-if="selectedCard"
        :card="selectedCard"
        :category-name="getCategoryName(selectedCard.category)"
        @close="selectedCard = null"
        @favorite="toggleFavorite"
        @edit="editSelectedCard"
        @delete="deleteCard"
    />


    <!-- CREATE / EDIT -->

    <CardEditor
        v-if="showEditor"
        :card="editingCard"
        :categories="knowledgeStore.categories"
        @save="saveCard"
        @cancel="closeEditor"
    />

  </main>
</template>

<style scoped lang="scss">
@use '../assets/styles/variables' as *;

.cards-page {
  padding: 36px;
  max-width: 1500px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;

  margin-bottom: 32px;
}

.eyebrow {
  display: block;

  margin-bottom: 8px;

  color: $purple;

  font-size: 11px;
  font-weight: 700;

  letter-spacing: 0.16em;
}

.page-header h1 {
  margin: 0 0 8px;

  font-size: clamp(30px, 4vw, 46px);
  line-height: 1;
}

.page-header p {
  margin: 0;

  color: $text-secondary;

  font-size: 14px;
}

.create-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  border: 0;
  border-radius: 13px;

  padding: 12px 18px;

  background: linear-gradient(
      135deg,
      $purple,
      $red
  );

  color: white;

  font-weight: 700;

  box-shadow:
      0 10px 30px rgba(155, 92, 255, 0.18);

  transition: $transition;
}

.create-button span {
  font-size: 20px;
  line-height: 1;
}

.create-button:hover {
  transform: translateY(-2px);

  box-shadow:
      0 14px 35px rgba(155, 92, 255, 0.28);
}


/* EMPTY */

.empty-state {
  min-height: 420px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;

  padding: 40px;

  border-radius: $radius-lg;
}

.empty-icon {
  width: 70px;
  height: 70px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 20px;

  border-radius: 22px;

  background: rgba(155, 92, 255, 0.1);

  color: $purple;

  font-size: 30px;

  box-shadow:
      0 0 35px rgba(155, 92, 255, 0.12);
}

.empty-state h2 {
  margin: 0 0 10px;

  font-size: 24px;
}

.empty-state p {
  max-width: 460px;

  margin: 0 0 24px;

  color: $text-secondary;

  line-height: 1.6;
}


/* GRID */

.cards-grid {
  display: grid;

  grid-template-columns:
    repeat(
      auto-fill,
      minmax(250px, 1fr)
    );

  gap: 18px;
}


/* CARD */

.knowledge-card {
  position: relative;

  min-height: 220px;

  display: flex;
  flex-direction: column;

  padding: 20px;

  border-radius: $radius-lg;

  cursor: pointer;

  transition:
      transform $transition,
      border-color $transition,
      box-shadow $transition;
}

.knowledge-card:hover {
  transform: translateY(-4px);

  border-color:
      rgba(155, 92, 255, 0.25);

  box-shadow:
      0 18px 50px rgba(0, 0, 0, 0.25),
      0 0 35px rgba(155, 92, 255, 0.06);
}


/* CARD TOP */

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.type-badge {
  display: inline-flex;

  padding: 5px 9px;

  border-radius: 8px;

  font-size: 10px;
  font-weight: 700;

  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.type-text {
  background: rgba(155, 92, 255, 0.1);
  color: $purple;
}

.type-command {
  background: rgba(53, 229, 140, 0.1);
  color: $green;
}

.type-link {
  background: rgba(255, 48, 79, 0.1);
  color: $red;
}

.type-note {
  background: rgba(255, 255, 255, 0.07);
  color: $text-secondary;
}

.favorite-button {
  width: 34px;
  height: 34px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 0;
  border-radius: 50%;

  background: transparent;

  color: $text-muted;

  font-size: 20px;

  transition: $transition;
}

.favorite-button:hover,
.favorite-button.active {
  color: $red;

  background:
      rgba(255, 48, 79, 0.08);
}


/* CONTENT */

.card-content {
  flex: 1;

  padding: 24px 0;
}

.card-content h3 {
  margin: 0 0 10px;

  font-size: 19px;
  line-height: 1.3;
}

.card-content p {
  margin: 0;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;

  overflow: hidden;

  color: $text-secondary;

  font-size: 13px;
  line-height: 1.6;
}


/* BOTTOM */

.card-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-top: 14px;

  border-top: 1px solid $border;
}

.category {
  font-size: 11px;
  font-weight: 700;

  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.category-purple {
  color: $purple;
}

.category-green {
  color: $green;
}

.category-red {
  color: $red;
}

.arrow {
  color: $text-muted;

  transition: $transition;
}

.knowledge-card:hover .arrow {
  color: $text-primary;
  transform: translateX(4px);
}


/* MOBILE */

@media (max-width: 700px) {
  .cards-page {
    padding: 24px 16px 100px;
  }

  .page-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .page-header h1 {
    font-size: 34px;
  }

  .create-button {
    width: 100%;
  }

  .cards-grid {
    grid-template-columns: 1fr;
  }

  .knowledge-card {
    min-height: 190px;
  }
}
</style>