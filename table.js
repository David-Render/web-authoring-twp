document.addEventListener("DOMContentLoaded", function () {
    let lastSortedColumn = 0;
    let sortDirection = { 0: false };

    // Click-to-Reveal functionality
    document.querySelectorAll(".icon.clickable").forEach(function (icon) {
        if (!icon.dataset.original) {
            icon.dataset.original = icon.innerHTML.trim();
        }

        icon.addEventListener("click", function () {
            if (this.classList.contains("clicked")) {
                this.innerHTML = this.dataset.original;
            } else {
                this.innerHTML = `<span>${this.getAttribute("data-text")}</span>`;
            }
            this.classList.toggle("clicked");
        });
    });

    // Sorting Function
    window.sortTable = function (columnIndex, type, headerElement) {
        let table = document.querySelector(".item-table tbody");
        let rows = Array.from(table.rows);

        if (lastSortedColumn === columnIndex) {
            sortDirection[columnIndex] = !sortDirection[columnIndex];
        } else {
            sortDirection[columnIndex] = true; 
        }
        lastSortedColumn = columnIndex;

        rows.sort((rowA, rowB) => {
            let cellA = rowA.cells[columnIndex];
            let cellB = rowB.cells[columnIndex];

            let valueA = cellA.dataset.sort || cellA.textContent.trim();
            let valueB = cellB.dataset.sort || cellB.textContent.trim();

            if (type === "number") {
                valueA = parseFloat(valueA) || 0;
                valueB = parseFloat(valueB) || 0;
            }

            if (valueA < valueB) return sortDirection[columnIndex] ? -1 : 1;
            if (valueA > valueB) return sortDirection[columnIndex] ? 1 : -1;
            return 0;
        });

        rows.forEach(row => table.appendChild(row));

        document.querySelectorAll(".item-table th").forEach(th => {
            th.classList.remove("sorted-asc", "sorted-desc");
        });
        headerElement.classList.add(sortDirection[columnIndex] ? "sorted-asc" : "sorted-desc");
    };

    let defaultHeader = document.querySelector(".item-table thead th:first-child");
    if (defaultHeader) {
        sortTable(0, "number", defaultHeader);
    }
});
