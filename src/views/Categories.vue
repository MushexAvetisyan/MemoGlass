<script setup>
import { useKnowledgeStore } from '../stores/knowledge'

const knowledgeStore = useKnowledgeStore()

function getCardCount(categoryId) {
  return knowledgeStore.cards.filter(
      card => card.category === categoryId
  ).length
}
</script>

<template>
  <main class="categories-page">

    <section class="page-header">

      <div>
        <span class="eyebrow">
          ORGANIZATION
        </span>

        <h1>Categories</h1>

        <p>
          Organize your knowledge into clear spaces.
        </p>
      </div>

      <button class="create-button">
        <span>+</span>
        New Category
      </button>

    </section>


    <section class="categories-grid">

      <article
          v-for="category in knowledgeStore.categories"
          :key="category.id"
          class="category-card glass"
      >

        <div class="category-icon">
          <span :class="`color-${category.color}`"></span>
        </div>

        <div class="category-info">

          <h2>
            {{ category.name }}
          </h2>

          <p>
            {{ getCardCount(category.id) }}
            {{ getCardCount(category.id) === 1 ? 'card' : 'cards' }}
          </p>

        </div>

        <div class="category-actions">

          <button type="button">
            Edit
          </button>

          <button type="button">
            Delete
          </button>

        </div>

      </article>

    </section>

  </main>
</template>

<style scoped lang="scss">
@use '../assets/styles/variables' as *;

.categories-page {
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
}

.page-header p {
  margin: 0;

  color: $text-secondary;
}

.create-button {
  display: inline-flex;
  align-items: center;
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

  transition: $transition;
}

.create-button:hover {
  transform: translateY(-2px);
}

.create-button span {
  font-size: 20px;
}

.categories-grid {
  display: grid;

  grid-template-columns:
    repeat(
      auto-fill,
      minmax(260px, 1fr)
    );

  gap: 18px;
}

.category-card {
  display: flex;
  flex-direction: column;

  min-height: 220px;

  padding: 22px;

  border-radius: $radius-lg;

  transition: $transition;
}

.category-card:hover {
  transform: translateY(-4px);

  border-color:
      rgba(155, 92, 255, 0.25);

  box-shadow:
      0 20px 50px rgba(0, 0, 0, 0.25);
}

.category-icon {
  width: 46px;
  height: 46px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 24px;

  border-radius: 14px;

  background: rgba(255, 255, 255, 0.04);
}

.category-icon span {
  width: 14px;
  height: 14px;

  border-radius: 50%;
}

.color-purple {
  background: $purple;

  box-shadow:
      0 0 20px rgba(155, 92, 255, 0.5);
}

.color-green {
  background: $green;

  box-shadow:
      0 0 20px rgba(53, 229, 140, 0.5);
}

.color-red {
  background: $red;

  box-shadow:
      0 0 20px rgba(255, 48, 79, 0.5);
}

.category-info {
  flex: 1;
}

.category-info h2 {
  margin: 0 0 8px;

  font-size: 20px;
}

.category-info p {
  margin: 0;

  color: $text-secondary;

  font-size: 13px;
}

.category-actions {
  display: flex;
  gap: 8px;

  margin-top: 20px;
}

.category-actions button {
  flex: 1;

  border: 1px solid $border;
  border-radius: 10px;

  padding: 9px;

  background: rgba(255, 255, 255, 0.03);

  color: $text-secondary;

  transition: $transition;
}

.category-actions button:hover {
  background: rgba(255, 255, 255, 0.07);
  color: $text-primary;
}

@media (max-width: 700px) {
  .categories-page {
    padding: 24px 16px 100px;
  }

  .page-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .create-button {
    width: 100%;
    justify-content: center;
  }

  .categories-grid {
    grid-template-columns: 1fr;
  }
}
</style>