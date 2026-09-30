<template>
  <section class="dashboard">

    <div class="welcome">
      <div>
        <span class="eyebrow">YOUR KNOWLEDGE SPACE</span>

        <h1>
          Keep your knowledge
          <span>close.</span>
        </h1>

        <p>
          Store commands, notes, links and everything
          you want to remember.
        </p>
      </div>

      <button class="create-button">
        <span>+</span>
        Create Card
      </button>
    </div>


    <div class="stats">

      <div class="stat-card glass">
        <div class="stat-icon purple">
          ▦
        </div>

        <div>
          <span>Total Cards</span>
          <strong>0</strong>
        </div>
      </div>


      <div class="stat-card glass">
        <div class="stat-icon red">
          ★
        </div>

        <div>
          <span>Favorites</span>
          <strong>0</strong>
        </div>
      </div>


      <div class="stat-card glass">
        <div class="stat-icon green">
          ◈
        </div>

        <div>
          <span>Categories</span>
          <strong>0</strong>
        </div>
      </div>

    </div>


    <div class="empty-state glass">

      <div class="empty-icon">
        +
      </div>

      <h2>Your vault is empty</h2>

      <p>
        Create your first knowledge card and start
        building your personal knowledge vault.
      </p>

      <button class="empty-button">
        Create your first card
      </button>

    </div>

  </section>
</template>


<style scoped lang="scss">
@use '../assets/styles/variables' as *;

.dashboard {
  max-width: 1400px;
  margin: 0 auto;
}


.welcome {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  gap: 30px;

  margin-bottom: 30px;
}


.eyebrow {
  color: $purple;

  font-size: 10px;
  font-weight: 700;

  letter-spacing: 1.5px;
}


h1 {
  max-width: 700px;

  margin: 10px 0 12px;

  font-size: clamp(30px, 4vw, 48px);
  line-height: 1.08;

  letter-spacing: -1.5px;
}


h1 span {
  color: $red;

  text-shadow:
      0 0 25px rgba(255, 48, 79, 0.25);
}


.welcome p {
  margin: 0;

  max-width: 600px;

  color: $text-secondary;

  line-height: 1.6;
}


.create-button,
.empty-button {
  border: 1px solid rgba(255, 48, 79, 0.3);

  background:
      linear-gradient(
          135deg,
          rgba(255, 48, 79, 0.15),
          rgba(155, 92, 255, 0.1)
      );

  color: $text-primary;

  transition: $transition;
}


.create-button {
  flex-shrink: 0;

  padding: 13px 18px;

  display: flex;
  align-items: center;
  gap: 9px;

  border-radius: 12px;
}


.create-button span {
  color: $red;

  font-size: 20px;
}


.create-button:hover,
.empty-button:hover {
  transform: translateY(-2px);

  border-color: rgba(255, 48, 79, 0.5);

  box-shadow:
      0 10px 30px rgba(255, 48, 79, 0.08);
}


/* Stats */

.stats {
  display: grid;

  grid-template-columns:
    repeat(3, minmax(0, 1fr));

  gap: 14px;

  margin-bottom: 20px;
}


.stat-card {
  min-height: 110px;

  padding: 20px;

  border-radius: $radius-md;

  display: flex;
  align-items: center;

  gap: 15px;
}


.stat-icon {
  width: 45px;
  height: 45px;

  display: grid;
  place-items: center;

  border-radius: 13px;

  font-size: 20px;
}


.stat-icon.purple {
  color: $purple;
  background: rgba(155, 92, 255, 0.1);
}


.stat-icon.red {
  color: $red;
  background: rgba(255, 48, 79, 0.1);
}


.stat-icon.green {
  color: $green;
  background: rgba(53, 229, 140, 0.1);
}


.stat-card div:last-child {
  display: flex;
  flex-direction: column;
  gap: 4px;
}


.stat-card span {
  color: $text-muted;
  font-size: 11px;
}


.stat-card strong {
  font-size: 25px;
}


/* Empty state */

.empty-state {
  min-height: 330px;

  padding: 40px;

  border-radius: $radius-lg;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;
}


.empty-icon {
  width: 64px;
  height: 64px;

  display: grid;
  place-items: center;

  margin-bottom: 18px;

  border-radius: 20px;

  border: 1px solid rgba(155, 92, 255, 0.2);

  background: rgba(155, 92, 255, 0.07);

  color: $purple;

  font-size: 30px;

  box-shadow:
      0 0 35px rgba(155, 92, 255, 0.08);
}


.empty-state h2 {
  margin: 0 0 8px;

  font-size: 20px;
}


.empty-state p {
  max-width: 450px;

  margin: 0 0 24px;

  color: $text-secondary;

  line-height: 1.6;
}


.empty-button {
  padding: 11px 16px;

  border-radius: 11px;
}


/* Mobile */

@media (max-width: 700px) {

  .welcome {
    align-items: flex-start;
    flex-direction: column;

    margin-bottom: 22px;
  }


  h1 {
    font-size: 32px;
  }


  .create-button {
    width: 100%;

    justify-content: center;
  }


  .stats {
    grid-template-columns: 1fr;
  }


  .stat-card {
    min-height: 90px;
  }


  .empty-state {
    min-height: 300px;

    padding: 30px 20px;
  }

}
</style>