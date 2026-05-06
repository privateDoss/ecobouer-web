(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var calculateBtn = document.getElementById("calculate-btn");
    if (!calculateBtn) {
      return;
    }

    calculateBtn.addEventListener("click", function () {
      var monthlyBill = parseFloat(document.getElementById("monthly-bill").value);
      var electricRate = parseFloat(document.getElementById("electric-rate").value);
      var netMetering = document.getElementById("net-metering").value;

      if (
        isNaN(monthlyBill) ||
        isNaN(electricRate) ||
        monthlyBill <= 0 ||
        electricRate <= 0
      ) {
        window.alert("Please enter valid numbers.");
        return;
      }

      var solarCapacity = Math.ceil(
        monthlyBill / electricRate / 0.75 / 30 / 4
      );
      var gridSavings = netMetering === "with" ? 90 : 70;
      var hybridSavings = netMetering === "with" ? 95 : 85;
      var gridROI =
        netMetering === "with" ? "Approx. 3.5 Years" : "Approx. 3 Years";
      var hybridROI =
        netMetering === "with" ? "Approx. 5 Years" : "Approx. 4.5 Years";

      document.getElementById("grid-solar-capacity").textContent =
        solarCapacity.toFixed(2);
      document.getElementById("hybrid-solar-capacity").textContent =
        solarCapacity.toFixed(2);
      document.getElementById("grid-savings").textContent = gridSavings;
      document.getElementById("hybrid-savings").textContent = hybridSavings;
      document.getElementById("grid-roi").textContent = gridROI;
      document.getElementById("hybrid-roi").textContent = hybridROI;
    });
  });
})();
