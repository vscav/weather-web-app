import Chart from "chart.js";
import { COLORS } from "./color.js";

/**
 * Initialize the temperature evolution chart.
 * @param {object} CX The canvas (target)
 * @param {object} time The next hours.
 * @param {object} temp The temperatures associate to the next hours.
 */
const initTempChart = (CX, time, temp) => {
  new Chart(CX, {
    type: "line",
    options: {
      scales: {
        yAxes: [
          {
            gridLines: {
              lineWidth: 1,
              color: Charts.colors.gray[900],
              zeroLineColor: Charts.colors.gray[900],
            },
            ticks: {
              callback: function (value) {
                return value + "°C";
              },
            },
          },
        ],
      },
    },
    data: {
      labels: time,
      datasets: [
        {
          label: "Temperature",
          data: temp,
        },
      ],
    },
  });
};

/**
 * Private function.
 * Define variables, options, methods and events of the temperature evolution chart.
 */
let Charts = (function () {
  /** Variables */

  let mode = "light";
  let fonts = {
    base: "Montserrat",
  };

  /** Colors */
  const colors = COLORS;

  /** Methods */

  /** Chart js global options */
  const chartOptions = () => {
    /** Options */
    let options = {
      defaults: {
        global: {
          responsive: true,
          maintainAspectRatio: false,
          defaultColor: mode == "dark" ? colors.gray[700] : colors.gray[600],
          defaultFontColor:
            mode == "dark" ? colors.gray[700] : colors.gray[600],
          defaultFontFamily: fonts.base,
          defaultFontSize: 13,
          layout: {
            padding: 0,
          },
          legend: {
            display: false,
          },
          elements: {
            point: {
              radius: 0,
              backgroundColor: colors.theme["primary"],
            },
            line: {
              tension: 0.4,
              borderWidth: 4,
              borderColor: colors.theme["primary"],
              backgroundColor: colors.transparent,
              borderCapStyle: "rounded",
            },
          },
        },
      },
    };

    /** yAxes */
    Chart.scaleService.updateScaleDefaults("linear", {
      gridLines: {
        borderDash: [2],
        borderDashOffset: [2],
        color: mode == "dark" ? colors.gray[900] : colors.gray[300],
        drawBorder: false,
        drawTicks: false,
        lineWidth: 0,
        zeroLineWidth: 0,
        zeroLineColor: mode == "dark" ? colors.gray[900] : colors.gray[300],
        zeroLineBorderDash: [2],
        zeroLineBorderDashOffset: [2],
      },
      ticks: {
        beginAtZero: true,
        padding: 10,
        callback: function (value) {
          if (!(value % 10)) {
            return value;
          }
        },
      },
    });

    /** xAxes */
    Chart.scaleService.updateScaleDefaults("category", {
      gridLines: {
        drawBorder: false,
        drawOnChartArea: false,
        drawTicks: false,
      },
      ticks: {
        padding: 20,
      },
      maxBarThickness: 10,
    });

    return options;
  };

  /** Parse global options */
  const parseOptions = (parent, options) => {
    for (let item in options) {
      if (typeof options[item] !== "object") {
        parent[item] = options[item];
      } else {
        parseOptions(parent[item], options[item]);
      }
    }
  };

  /** Events */

  /** Parse global options */
  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  /** Return */

  return {
    colors: colors,
    fonts: fonts,
    mode: mode,
  };
})();

export { Charts, initTempChart };
