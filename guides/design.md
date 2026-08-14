# Premium Front-End Design System Specification

A modern, high-end front-end design format designed to create visually stunning, responsive, and interactive user interfaces. This layout format can be applied as a global design system for any web application.

---

## Color Theming & Presets (Change Per Website)

To customize the website's brand colors without changing the core layout CSS, simply change the `--color-primary` values in the `:root` block. Below are four premium presets:

### 1. Electric Blue (Ideal for Tech/Utility tools)
```css
--color-primary: hsl(220, 85%, 57%);
--color-primary-hover: hsl(220, 85%, 50%);
--color-primary-light: hsl(220, 85%, 96%);
```

### 2. Forest Emerald (Ideal for Finance/Corporate/Green tools)
```css
--color-primary: hsl(150, 70%, 42%);
--color-primary-hover: hsl(150, 70%, 36%);
--color-primary-light: hsl(150, 70%, 96%);
```

### 3. Royal Amethyst (Ideal for Premium/Modern/Creative tools)
```css
--color-primary: hsl(265, 80%, 58%);
--color-primary-hover: hsl(265, 80%, 50%);
--color-primary-light: hsl(265, 80%, 96%);
```

### 4. Sunset Orange (Warm, high contrast, vibrant)
```css
--color-primary: hsl(20, 90%, 56%);
--color-primary-hover: hsl(20, 90%, 50%);
--color-primary-light: hsl(20, 90%, 96%);
```

---

## 1. Design Tokens (CSS Custom Properties)

Place these CSS variables at the root of your stylesheet to establish a unified color palette, spacing scale, typography, and shadows.

```css
:root {
    /* --- Active Brand Color (Swap with any preset above) --- */
    --color-primary: hsl(220, 85%, 57%);       /* Electric Blue default */
    --color-primary-hover: hsl(220, 85%, 50%);
    --color-primary-light: hsl(220, 85%, 96%);

    --color-success: hsl(150, 80%, 40%);       /* Emerald Green */
    --color-success-hover: hsl(150, 80%, 35%);
    --color-success-light: hsl(150, 80%, 96%);

    --color-error: hsl(350, 80%, 50%);         /* Crimson Red */
    --color-error-hover: hsl(350, 80%, 45%);
    --color-error-light: hsl(350, 80%, 96%);

    --color-warning: hsl(40, 95%, 50%);        /* Warm Amber */
    --color-warning-light: hsl(40, 95%, 96%);

    /* Neutral & Backgrounds (Sleek Gray-Blue Scale) */
    --color-bg-body: hsl(210, 20%, 98%);       /* Ultra-light page background */
    --color-bg-card: hsl(0, 0%, 100%);         /* Pure white cards */
    --color-border: hsl(210, 14%, 90%);        /* Soft, light borders */
    --color-text-main: hsl(210, 24%, 15%);     /* Deep charcoal text */
    --color-text-muted: hsl(210, 10%, 45%);    /* Subdued gray text */
    --color-text-light: hsl(210, 10%, 65%);    /* Soft hints / notes */

    /* --- Typography Scale (System/Inter Sans Serif) --- */
    --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    
    /* --- Layout & Spacings --- */
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;
    --spacing-xxl: 48px;

    /* --- Rounded Borders --- */
    --radius-sm: 6px;
    --radius-md: 12px;
    --radius-lg: 20px;
    --radius-full: 9999px;

    /* --- Premium Layer Shadows (Glassmorphism & Depth) --- */
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.02);
    --shadow-premium: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02);

    /* --- Standard Transition Speeds --- */
    --transition-fast: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-normal: 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## 2. Universal Page Reset & Base Layout

Creates a clean canvas with smooth scrolling, beautiful scrollbars, and balanced text rendering.

```css
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    background-color: var(--color-bg-body);
    color: var(--color-text-main);
    font-family: var(--font-sans);
    font-size: 16px;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

/* Scrollbar styling for modern browsers */
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}
::-webkit-scrollbar-track {
    background: transparent;
}
::-webkit-scrollbar-thumb {
    background: hsl(210, 10%, 80%);
    border-radius: var(--radius-full);
}
::-webkit-scrollbar-thumb:hover {
    background: hsl(210, 10%, 70%);
}
```

---

## 3. Premium UI Elements & Components

### A. The Container Wrapper
Main wrapper for content pages. Keeps components centered and prevents wide screens from stretching content awkwardly.
```css
.main-wrapper {
    flex-grow: 1;
    width: 100%;
    max-width: 800px; /* Target layout width */
    margin: 0 auto;
    padding: var(--spacing-xxl) var(--spacing-lg);
}
```

### B. Cards (Content Containers)
The building blocks of the UI. Features a smooth, elevated look with micro-shadows.
```css
.card {
    background-color: var(--color-bg-card);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--spacing-lg);
    box-shadow: var(--shadow-md);
    margin-bottom: var(--spacing-lg);
    transition: transform var(--transition-normal), box-shadow var(--transition-normal);
}

.card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
}
```

### C. Standard Buttons
```css
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px var(--spacing-md);
    font-size: 0.875rem;
    font-weight: 600;
    border-radius: var(--radius-sm);
    cursor: pointer;
    border: 1px solid transparent;
    transition: all var(--transition-fast);
    gap: 8px;
}

.btn-primary {
    background-color: var(--color-primary);
    color: white;
}
.btn-primary:hover {
    background-color: var(--color-primary-hover);
}
.btn-primary:active {
    transform: scale(0.98);
}

.btn-secondary {
    background-color: transparent;
    border-color: var(--color-border);
    color: var(--color-text-muted);
}
.btn-secondary:hover {
    background-color: var(--color-primary-light);
    color: var(--color-primary);
    border-color: var(--color-primary);
}
```

### D. Form Inputs
Inputs are styled with an organic active indicator (glow effect) on focus.
```css
.input-field {
    width: 100%;
    padding: 10px 14px;
    font-size: 0.9rem;
    color: var(--color-text-main);
    background-color: white;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    outline: none;
    transition: all var(--transition-fast);
}

.input-field:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px hsla(220, 85%, 57%, 0.15);
}

.input-field::placeholder {
    color: var(--color-text-light);
}
```

### E. Status Badges
```css
.badge {
    display: inline-flex;
    align-items: center;
    padding: 4px var(--spacing-sm);
    font-size: 0.75rem;
    font-weight: 600;
    border-radius: var(--radius-full);
}

.badge-success {
    background-color: var(--color-success-light);
    color: var(--color-success);
}

.badge-error {
    background-color: var(--color-error-light);
    color: var(--color-error);
}

.badge-pending {
    background-color: var(--color-warning-light);
    color: var(--color-warning);
}
```

---

## 4. Scrollable Data Tables

An elegant structure for scrollable data presentation. Only the table rows scroll; layout buttons and headers outside remain fixed.

```css
.table-scroll-wrapper {
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
}

.data-table {
    width: 100%;
    min-width: 800px; /* Triggers the scroll view when screen is tight */
    border-collapse: collapse;
    font-size: 0.85rem;
}

.data-table th {
    background-color: hsl(210, 14%, 98%);
    padding: 12px var(--spacing-md);
    font-weight: 600;
    color: var(--color-text-muted);
    border-bottom: 1px solid var(--color-border);
    text-transform: uppercase;
    font-size: 0.725rem;
    letter-spacing: 0.05em;
}

.data-table td {
    padding: 14px var(--spacing-md);
    border-bottom: 1px solid var(--color-border);
    vertical-align: middle;
}

.data-table tr:last-child td {
    border-bottom: none; /* Soft edge ending */
}
```

---

## 5. Global Micro-Animations

Add these animations to create interactive feedback loops.

```css
/* Fade-in for loading items */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(8px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.fade-in {
    animation: fadeIn var(--transition-normal) ease-out forwards;
}

/* Spinner for processing states */
@keyframes spin {
    to { transform: rotate(360deg); }
}

.spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-left-color: currentColor;
    border-radius: var(--radius-full);
    animation: spin 0.8s linear infinite;
}

/* Shimmer placeholder loading effect */
@keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
}

.shimmer {
    background: linear-gradient(90deg, 
        hsl(210, 10%, 94%) 25%, 
        hsl(210, 10%, 90%) 37%, 
        hsl(210, 10%, 94%) 63%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite linear;
}
```
