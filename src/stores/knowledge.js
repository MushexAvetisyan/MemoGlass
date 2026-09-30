import { defineStore } from 'pinia'

export const useKnowledgeStore = defineStore('knowledge', {
    state: () => ({
        cards: [],
        categories: [
            {
                id: 'general',
                name: 'General',
                color: 'purple'
            },
            {
                id: 'commands',
                name: 'Commands',
                color: 'green'
            },
            {
                id: 'links',
                name: 'Links',
                color: 'red'
            }
        ]
    }),

    getters: {
        totalCards: (state) => state.cards.length,

        favoriteCards: (state) =>
            state.cards.filter(card => card.favorite),

        favoriteCount() {
            return this.favoriteCards.length
        },

        categoryCount: (state) =>
            state.categories.length
    },

    actions: {
        createCard(cardData) {
            const card = {
                id: crypto.randomUUID(),

                title: cardData.title.trim(),

                type: cardData.type,

                category: cardData.category,

                description: cardData.description?.trim() || '',

                content: cardData.content?.trim() || '',

                link: cardData.link?.trim() || '',

                tags: cardData.tags || [],

                favorite: false,

                createdAt: new Date().toISOString(),

                updatedAt: new Date().toISOString()
            }

            this.cards.unshift(card)

            return card
        },

        updateCard(id, updates) {
            const index = this.cards.findIndex(
                card => card.id === id
            )

            if (index === -1) {
                return null
            }

            this.cards[index] = {
                ...this.cards[index],
                ...updates,
                updatedAt: new Date().toISOString()
            }

            return this.cards[index]
        },

        deleteCard(id) {
            this.cards = this.cards.filter(
                card => card.id !== id
            )
        },

        toggleFavorite(id) {
            const card = this.cards.find(
                card => card.id === id
            )

            if (!card) {
                return
            }

            card.favorite = !card.favorite
        },

        createCategory(categoryData) {
            const category = {
                id: crypto.randomUUID(),

                name: categoryData.name.trim(),

                color: categoryData.color || 'purple'
            }

            this.categories.push(category)

            return category
        },

        updateCategory(id, updates) {
            const index = this.categories.findIndex(
                category => category.id === id
            )

            if (index === -1) {
                return null
            }

            this.categories[index] = {
                ...this.categories[index],
                ...updates
            }

            return this.categories[index]
        },

        deleteCategory(id) {
            const category = this.categories.find(
                item => item.id === id
            )

            if (!category) {
                return
            }

            // Не позволяем удалить категорию,
            // если в ней ещё есть карточки.
            const hasCards = this.cards.some(
                card => card.category === id
            )

            if (hasCards) {
                return false
            }

            this.categories = this.categories.filter(
                category => category.id !== id
            )

            return true
        }
    }
})