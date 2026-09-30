<template>
  <div class="app-layout">

    <!-- Desktop Sidebar -->
    <aside class="sidebar glass">

      <div class="brand">
        <div class="brand-icon">
          M
        </div>

        <div class="brand-text">
          <strong>Memo<span>Glass</span></strong>
          <small>Knowledge Vault</small>
        </div>
      </div>

      <nav class="navigation">

        <div class="nav-section">
          <span class="nav-label">Workspace</span>

          <button class="nav-item active">
            <span class="nav-icon">⌂</span>
            <span>Dashboard</span>
          </button>

          <button class="nav-item">
            <span class="nav-icon">▦</span>
            <span>Cards</span>
          </button>

          <button class="nav-item">
            <span class="nav-icon">★</span>
            <span>Favorites</span>
          </button>

          <button class="nav-item">
            <span class="nav-icon">◈</span>
            <span>Categories</span>
          </button>
        </div>

        <div class="nav-section">
          <span class="nav-label">Data</span>

          <button class="nav-item">
            <span class="nav-icon green">↓</span>
            <span>Import</span>
          </button>

          <button class="nav-item">
            <span class="nav-icon purple">↑</span>
            <span>Export</span>
          </button>
        </div>

      </nav>

      <div class="sidebar-footer">
        <div class="storage-status">
          <span class="status-dot"></span>

          <div>
            <strong>Local Mode</strong>
            <small>No cloud storage</small>
          </div>
        </div>
      </div>

    </aside>


    <!-- Main -->
    <div class="main-area">

      <!-- Header -->
      <header class="topbar glass">

        <div class="mobile-brand">
          <div class="brand-icon">
            M
          </div>

          <strong>
            Memo<span>Glass</span>
          </strong>
        </div>

        <div class="header-actions">

          <button class="header-button search-button">
            <span>⌕</span>
            <span class="search-label">Search</span>
          </button>

          <button class="header-button add-button">
            +
            <span class="add-label">New Card</span>
          </button>

          <button class="header-button">
            ⚙
          </button>

        </div>

      </header>


      <!-- Page Content -->
      <main class="page-content">
        <slot />
      </main>

    </div>


    <!-- Mobile Navigation -->
    <nav class="mobile-navigation glass">

      <button class="mobile-nav-item active">
        <span>⌂</span>
        <small>Home</small>
      </button>

      <button class="mobile-nav-item">
        <span>▦</span>
        <small>Cards</small>
      </button>

      <button class="mobile-nav-item">
        <span>★</span>
        <small>Favorites</small>
      </button>

      <button class="mobile-nav-item">
        <span>◈</span>
        <small>Categories</small>
      </button>

      <button class="mobile-nav-item">
        <span>⚙</span>
        <small>Settings</small>
      </button>

    </nav>

  </div>
</template>


<style scoped lang="scss">
@use '../assets/styles/variables' as *;

.app-layout {
  min-height: 100vh;
  display: flex;
}


/* =========================
   SIDEBAR
========================= */

.sidebar {
  position: fixed;
  left: 16px;
  top: 16px;
  bottom: 16px;

  width: 250px;

  padding: 22px 16px;

  border-radius: $radius-lg;

  display: flex;
  flex-direction: column;

  z-index: 20;
}


.brand {
  display: flex;
  align-items: center;
  gap: 12px;

  padding: 4px 8px 28px;
}


.brand-icon {
  width: 38px;
  height: 38px;

  display: grid;
  place-items: center;

  border-radius: 12px;

  background:
      linear-gradient(
          135deg,
          rgba(155, 92, 255, 0.2),
          rgba(255, 48, 79, 0.15)
      );

  border: 1px solid rgba(155, 92, 255, 0.3);

  color: $purple;

  font-weight: 800;

  box-shadow:
      0 0 20px rgba(155, 92, 255, 0.12);
}


.brand-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}


.brand-text strong {
  font-size: 15px;
}


.brand-text strong span,
.mobile-brand strong span {
  color: $purple;
}


.brand-text small {
  color: $text-muted;
  font-size: 10px;
}


/* Navigation */

.navigation {
  display: flex;
  flex-direction: column;
  gap: 28px;
}


.nav-section {
  display: flex;
  flex-direction: column;
  gap: 5px;
}


.nav-label {
  padding: 0 12px 8px;

  color: $text-muted;

  font-size: 10px;
  font-weight: 700;

  text-transform: uppercase;
  letter-spacing: 1.2px;
}


.nav-item {
  width: 100%;

  display: flex;
  align-items: center;
  gap: 12px;

  padding: 11px 12px;

  border: 1px solid transparent;
  border-radius: 12px;

  background: transparent;

  color: $text-secondary;

  text-align: left;

  transition: $transition;
}


.nav-item:hover {
  background: rgba(255, 255, 255, 0.04);
  color: $text-primary;
}


.nav-item.active {
  background:
      linear-gradient(
          90deg,
          rgba(155, 92, 255, 0.12),
          rgba(155, 92, 255, 0.035)
      );

  border-color: rgba(155, 92, 255, 0.14);

  color: $text-primary;
}


.nav-icon {
  width: 20px;

  text-align: center;

  color: $text-muted;
}


.nav-item.active .nav-icon {
  color: $purple;
}


.nav-icon.green {
  color: $green;
}


.nav-icon.purple {
  color: $purple;
}


/* Footer */

.sidebar-footer {
  margin-top: auto;
}


.storage-status {
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 12px;

  border-radius: 12px;

  background: rgba(53, 229, 140, 0.035);

  border: 1px solid rgba(53, 229, 140, 0.08);
}


.status-dot {
  width: 8px;
  height: 8px;

  flex-shrink: 0;

  border-radius: 50%;

  background: $green;

  box-shadow:
      0 0 12px rgba(53, 229, 140, 0.6);
}


.storage-status div {
  display: flex;
  flex-direction: column;
  gap: 2px;
}


.storage-status strong {
  font-size: 11px;
}


.storage-status small {
  color: $text-muted;
  font-size: 9px;
}


/* =========================
   MAIN
========================= */

.main-area {
  width: calc(100% - 282px);

  margin-left: 282px;

  padding: 16px 16px 40px;
}


.topbar {
  height: 64px;

  padding: 10px 14px 10px 20px;

  border-radius: $radius-md;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  position: sticky;
  top: 16px;

  z-index: 15;
}


.header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}


.header-button {
  height: 40px;

  padding: 0 13px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  border: 1px solid $border;
  border-radius: 11px;

  background: rgba(255, 255, 255, 0.035);

  color: $text-secondary;

  transition: $transition;
}


.header-button:hover {
  color: $text-primary;

  background: rgba(255, 255, 255, 0.07);
}


.add-button {
  border-color: rgba(255, 48, 79, 0.25);

  color: $red;

  background: rgba(255, 48, 79, 0.06);
}


.add-button:hover {
  background: rgba(255, 48, 79, 0.12);
}


.page-content {
  padding: 30px 4px;
}


/* Mobile brand */

.mobile-brand {
  display: none;
}


/* Mobile navigation */

.mobile-navigation {
  display: none;
}


/* =========================
   TABLET
========================= */

@media (max-width: 900px) {

  .sidebar {
    width: 220px;
  }

  .main-area {
    width: calc(100% - 252px);
    margin-left: 252px;
  }

}


/* =========================
   MOBILE
========================= */

@media (max-width: 700px) {

  .app-layout {
    display: block;

    padding-bottom: 82px;
  }


  .sidebar {
    display: none;
  }


  .main-area {
    width: 100%;
    margin-left: 0;

    padding: 10px 10px 20px;
  }


  .topbar {
    top: 10px;

    height: 58px;

    padding: 8px 10px;

    justify-content: space-between;

    border-radius: 16px;
  }


  .mobile-brand {
    display: flex;
    align-items: center;
    gap: 9px;
  }


  .mobile-brand .brand-icon {
    width: 34px;
    height: 34px;

    border-radius: 10px;
  }


  .mobile-brand strong {
    font-size: 14px;
  }


  .header-actions {
    gap: 6px;
  }


  .header-button {
    width: 38px;
    height: 38px;

    padding: 0;
  }


  .search-label,
  .add-label {
    display: none;
  }


  .page-content {
    padding: 22px 2px;
  }


  .mobile-navigation {
    position: fixed;

    left: 10px;
    right: 10px;
    bottom: 10px;

    height: 62px;

    padding: 6px;

    border-radius: 18px;

    display: flex;
    align-items: center;
    justify-content: space-around;

    z-index: 50;
  }


  .mobile-nav-item {
    flex: 1;

    height: 50px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;

    border: 0;
    border-radius: 12px;

    background: transparent;

    color: $text-muted;

    transition: $transition;
  }


  .mobile-nav-item span {
    font-size: 18px;
  }


  .mobile-nav-item small {
    font-size: 8px;
  }


  .mobile-nav-item.active {
    color: $purple;

    background: rgba(155, 92, 255, 0.08);
  }

}
</style>