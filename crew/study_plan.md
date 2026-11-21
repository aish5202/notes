## 📅 3‑Day Study Plan for Building an R Shiny Dashboard  

| Day | Goal | What to Do | How to Practice |
|-----|------|------------|-----------------|
| **Day 1** | **Understand the Shiny skeleton** – UI, server, and the packages that make the app work. | 1. Review the five core libraries (`shiny`, `bslib`, `dplyr`, `ggplot2`, `DT`, `lubridate`).  <br>2. Read the **Shiny basics** tutorial (official site or a short video).  <br>3. Write a minimal `app.R` that shows a static plot and a table. | • Run the app, change the title, and see the effect.<br>• Add `library()` calls for each package and comment what each one does. |
| **Day 2** | **Learn reactivity & data manipulation** – keep the dashboard fast and synchronized with user choices. | 1. Study **reactive expressions** (`reactive()`, `observeEvent()`).  <br>2. Use `dplyr` to filter a sample weather dataset by city and year.  <br>3. Create a `ggplot2` line chart that updates when the user selects a different city.  <br>4. Add a `DT::datatable()` that shows the filtered data.  <br>5. Use `lubridate` to parse dates and extract months/years. | • Build a UI with a `selectInput()` for city and a `sliderInput()` for year range. <br>• Verify that the plot and table change instantly when you move the sliders. |
| **Day 3** | **Polish the look & finish the full app** – theming, layout, debugging, and optional deployment. | 1. Explore `bslib::bs_theme()` and try at least two Bootstrap themes.  <br>2. Replace the default UI with `page_sidebar()` (or `page_navbar()`) and add a sidebar panel for inputs.  <br>3. Add a **reactive title** that shows the selected city and date range.  <br>4. Run `shiny::reactlog::reactlog_enable()` to inspect reactivity performance.  <br>5. (Optional) Deploy the app to **shinyapps.io** or a local RStudio Connect server. | • Screenshot the dashboard with each theme and note which you prefer.<br>• Write a short “README” that explains how the app works and lists the required packages. |

---

## 📝 5‑Question Quiz (with Answers)

| # | Question | Answer |
|---|----------|--------|
| 1 | Which library is responsible for applying Bootstrap themes to a Shiny UI? | **`bslib`** (via `bs_theme()`). |
| 2 | What is the purpose of a **reactive expression** (`reactive({ … })`) in a Shiny app? | It creates a **cached, automatically updating** piece of code that re‑runs only when its inputs change, keeping the app fast and synchronized. |
| 3 | In the UI snippet `ui <- page_sidebar(title = "Indian Cities Weather Dashboard (2000-2024)", theme = bs_theme(...))`, what does `page_sidebar()` do? | It defines a **layout with a sidebar panel** (for inputs) and a main panel (for outputs), replacing the older `fluidPage()`/`sidebarLayout()` pattern. |
| 4 | Which package would you use to turn a data frame of weather records into an interactive, searchable table? | **`DT`** (via `DT::datatable()`). |
| 5 | How does the `lubridate` package help when working with the weather data in this dashboard? | It simplifies **date parsing and manipulation** (e.g., `ymd()`, `year()`, `month()`) so you can filter by year, extract months, and handle time zones easily. |

Good luck! 🎉 Feel free to revisit any day’s material if a quiz question feels tricky.