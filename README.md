# ERP Feature Map & Navigation Flow Dashboard

A single-page web application to visualize ERP modules, features, and key workflows for stakeholder review.

## 🚀 Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Run Development Server**
    ```bash
    npm run dev
    ```

3.  **Build for Production**
    ```bash
    npm run build
    ```

## 📋 Features

-   **Module Sitemap**: Grid view of all 11 modules with expandable feature lists and maturity indicators.
-   **Interactive Flow Diagram**: Visual map of system interconnections. Highlights active modules during flow simulation.
-   **Flow Simulation**: Step-by-step playback of 5 key business workflows (Sales, Purchase, HR, Expense, Payroll) with sample data.
-   **Analytics**: Charts showing feature completeness and system maturity.
-   **Export Tools**: One-click export for Diagram (PNG), Features (CSV), and Print-friendly view.

## 🧪 Acceptance Test Checklist

-   [ ] **Modules**: All 11 modules are visible in the top grid.
-   [ ] **Core System**: Visually distinct or central in the diagram.
-   [ ] **Flows**: Select "Sales Quote → Invoice" and play. Verify Sales, Warehouse, and Accounting highlight in order.
-   [ ] **Charts**: Verify "Feature Completeness" and "Maturity Radar" charts are rendered.
-   [ ] **Export**: Click "Export Diagram" and check if a PNG is downloaded. Click "Export Features" for CSV.

## 🛠 Project Structure

-   `src/components`: UI components (Dashboard, ModuleCard, FlowMap, FlowPlayer, Charts).
-   `src/lib`: Utilities.
-   `data/demo.json`: Configuration for modules and flows.
-   `tailwind.config.js`: Monochrome theme configuration.

## 🎨 Design System

-   **Monochrome**: High contrast black/white/gray scale for clarity.
-   **Tech Stack**: React, Tailwind CSS, React Flow, Chart.js.
