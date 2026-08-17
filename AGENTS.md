# AI Agent Guidelines for desenv-web-ativ1

## Project Overview
This is a **web development learning project** (desenv-web-ativ1) containing 5 progressively complex activities involving business logic implementation:

1. **Frete e Relatório** - Shipping cost calculation with region-based pricing and distance factors
2. **Folha de Pagamento e Bônus** - Payroll and bonus calculations
3. **Controle de Produção, Estoque e Relatórios** - Production and inventory tracking (incomplete)
4. **Reserva de Hotel com Tarifas Dinâmicas** - Dynamic hotel reservation pricing
5. **Treinos Esportivos** - Sports training management

## Code Structure
Each activity follows this pattern:
```
[activity-number]-[activity-name]/
├── index.html      # Form UI with input fields and buttons
├── script.js       # Business logic and calculations
└── style.css       # Styling (when present)
```

## Conventions & Patterns

### Language
- **All UI labels and variables are in Portuguese**
- Use Portuguese identifiers matching existing patterns (e.g., `regiao`, `distancia`, `quantidade`)
- Comments should follow the existing style

### Form Input Pattern
```javascript
// Retrieve and normalize numeric inputs
let value = document.getElementById("fieldId").value;
value = value.replace(",", ".");  // Handle comma decimals (Brazilian format)
value = Number(value);
```

### Validation Pattern
- Input validation often uses `while()` loops with `prompt()` for re-entry
- Common validation: checking region codes (1, 2, 3), numeric ranges, required fields

### Calculation Pattern
- Region/category-based switch statements for pricing multipliers
- Distance-based adjustments
- Quantity-based thresholds (e.g., excess beyond 1000 units)
- Surcharge calculations for special options

### Output Pattern
- Generate reports by accumulating data
- Display results in formatted reports (often as alerts or table summaries)

## Common Tasks

### Adding Functionality
When implementing features:
1. Use existing input/output patterns (form inputs → calculations → report output)
2. Maintain Portuguese naming (e.g., `precoPorPeca`, `valorTotal`)
3. Handle decimal input with comma replacement (Brazilian number format)
4. Use switch statements for region/category logic

### Completing Incomplete Activities
Activity 3 (Production/Inventory) has empty script.js:
- Follow the 1-5 activity progression in complexity
- Implement form-based tracking (entry, edit, delete)
- Add calculation logic and report generation
- Use similar patterns to activities 1-2

### Debugging
- Check HTML id attributes match JavaScript selectors
- Verify `defer` attribute on script tag in HTML
- Test numeric conversions (especially comma-decimal handling)
- Validate switch cases have all expected region/category codes

## Key Files by Activity
| Activity | Key Files | Purpose |
|----------|-----------|---------|
| 1 | `1-frete-e-relatorio/` | Shipping with region pricing, distance, quantity thresholds |
| 2 | `2-folha-pagamento-e-bonus/` | Payroll calculations |
| 3 | `3-controle-producao-estoque-e-relatorios/` | Production/inventory (incomplete) |
| 4 | `4-reserva-hotel-tarifas/` | Dynamic pricing based on season/demand |
| 5 | `5-treinos-esportivos/` | Sports training management |

## Autocomplete Tips for Developers
When working in this project, Copilot autocomplete will be most effective when:
- You type Portuguese variable names matching existing patterns
- You reference form input retrieval patterns (e.g., `document.getElementById(...).value`)
- You write conditional logic based on region/category codes
- You implement calculations with multiple factors (region, distance, quantity)

---
*Last Updated: 2026-08-16 | Focus: Autocomplete & Agent Productivity*
