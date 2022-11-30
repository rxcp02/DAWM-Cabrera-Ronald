(function ($) {
	"use strict";
	$(function () {
		// Remove pro banner on close

		// sales-chart-c start
		async function cargarDatosListaEspecies() {
			let tiposCartas = [];
			let cantidadPorTipo = [];

			let siguiente = "https://db.ygoprodeck.com/api/v7/cardinfo.php";

			while (siguiente != null) {
				const response = await fetch(siguiente);
				const data = await response.json();
				siguiente = data["next"];

				for (let datos of data["data"]) {
					let tipo = datos["type"];
					if (
						tipo == "Spell Card" ||
						tipo == "Trap Card" ||
						tipo == "Normal Monster" ||
						tipo == "Effect Monster" ||
						tipo == "Fusion Monster"
					) {
						if (tiposCartas.includes(tipo)) {
							let indice = tiposCartas.indexOf(tipo);
							cantidadPorTipo[indice] += 1;
						} else
							tiposCartas.push(tipo),
								cantidadPorTipo.push(1);
					}
				}
			}

			let bgColor = [
				"#f7b731",
				"#e7515a",
				"#00a5a8",
				"#626e82",
				"#3f4c6b",
			];
			let bdColor = [];

			if ($("#sales-chart-c").length) {
				var salesChartCCanvas = $("#sales-chart-c")
					.get(0)
					.getContext("2d");
				var salesChartC = new Chart(salesChartCCanvas, {
					type: "pie",
					data: {
						datasets: [
							{
								data: cantidadPorTipo,
								backgroundColor: bgColor,
								borderColor: bdColor,
							},
						],

						// These labels appear in the legend and in the tooltips when hovering different arcs
						labels: tiposCartas,
					},
					options: {
						responsive: true,
						animation: {
							animateScale: true,
							animateRotate: true,
						},
						legend: {
							display: false,
						},
						legendCallback: function (chart) {
							var text = [];
							text.push(
								'<ul class="legend' + chart.id + '">'
							);
							for (
								var i = 0;
								i < chart.data.datasets[0].data.length;
								i++
							) {
								text.push(
									'<li><span class="legend-dots" style="background-color:' +
										chart.data.datasets[0]
											.backgroundColor[i] +
										'"></span>'
								);
								if (chart.data.labels[i]) {
									text.push(chart.data.labels[i]);
								}
								text.push("</li>");
							}
							text.push("</ul>");
							return text.join("");
						},
					},
				});
			}
		}

		cargarDatosListaEspecies();

		// sales-chart-c end

		// sales-chart-d start
		async function cargarDatosListaLevel() {
			let levelCartas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
			let cantidadPorLevel = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

			let siguiente = "https://db.ygoprodeck.com/api/v7/cardinfo.php";

			while (siguiente != null) {
				const response = await fetch(siguiente);
				const data = await response.json();
				siguiente = data["next"];

				for (let datos of data["data"]) {
					let tipo = datos["type"];

					if (
						tipo == "Normal Monster" ||
						tipo == "Effect Monster" ||
						tipo == "Fusion Monster"
					) {
						let level = datos["level"];
						if (levelCartas.includes(level)) {
							let indice = levelCartas.indexOf(level);
							cantidadPorLevel[indice] += 1;
						}
					}
				}
			}

			if ($("#sales-chart-d").length) {
				var SalesChartDCanvas = $("#sales-chart-d")
					.get(0)
					.getContext("2d");
				var SalesChartD = new Chart(SalesChartDCanvas, {
					type: "bar",
					data: {
						labels: levelCartas,
						datasets: [
							{
								label: "Card Level",
								data: cantidadPorLevel,
								backgroundColor: "#a43cda",
							},
						],
					},
					options: {
						responsive: true,
						maintainAspectRatio: true,
						layout: {
							padding: {
								left: 0,
								right: 0,
								top: 0,
								bottom: 0,
							},
						},
						scales: {
							yAxes: [
								{
									display: true,
									gridLines: {
										display: false,
										drawBorder: false,
									},
									ticks: {
										display: true,
										min: 0,
										max: 2000,
										stepSize: 100,
										fontSize: 10,
										fontColor: "#001737",
									},
								},
							],
							xAxes: [
								{
									stacked: false,
									ticks: {
										beginAtZero: true,
										fontColor: "#001737",
										fontSize: 10,
									},
									gridLines: {
										color: "rgba(0, 0, 0, 0)",
										display: false,
									},
									barPercentage: 0.3,
								},
							],
						},
						legend: {
							display: false,
						},
						elements: {
							point: {
								radius: 0,
							},
						},
					},
				});
			}
		}

		cargarDatosListaLevel();

		// sales-chart-d end
	});

	let cargarDatos = () => {
		fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php")
			.then((response) => response.text())
			.then((data) => {
				data = JSON.parse(data);
				for (let i = 0; i < 150; i++) {
					let name = data.data[i].name;
					let type = data.data[i].type;
					let race = data.data[i].race;
					let archetype = data.data[i].archetype;
					if (archetype == null) {
						archetype = "S/N";
					}
					let price =
						data.data[i].card_prices[0].cardmarket_price;
					let image = data.data[i].card_images[0].image_url;
					let plantilla = `<tr>
          <td><h3>${name}</h3></td>
          <td>${type}</td>
          <td>${race}</td>
          <td>${archetype}</td>
          <td>${price}</td>
          <td>
            <div class="d-flex align-items-center">
              <a href="${image}" target="_blank">
              <button aria-label="Go to image!" type="button" class="btn btn-success btn-sm btn-icon-text mr-3 tooltip-slide">View Card</button>
              </a> 
            </div>
          </td>
          </tr>`;
					document.querySelector(
						".row .col-md-12 .card .table-responsive .table .cards"
					).innerHTML += plantilla;
					$(document).ready(function () {
						$("#example").DataTable();
					});
				}
			})
			.catch(console.error);
	};

	window.addEventListener("DOMContentLoaded", (event) => {
		cargarDatos();
	});
})(jQuery);
