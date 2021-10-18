import * as d3 from 'd3'

var statemap = function(statedata) {
    document.getElementById("slider").value = 0;

    var width = 1400
    var height = 600

    const niceFormat = d3.utcFormat("%B %d, %Y");
    const dataFormat = d3.utcFormat("%m/%d/%Y");
    const dataParse = d3.utcParse("%m/%d/%Y");

    const startDate = dataParse("01/21/2020");
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const valRange = [1000, 10000, 100000, 150000, 200000, 250000, 300000, 350000, 400000, 450000, 500000, 550000, 600000];
    const rateType = "Confirmed";


    const slider = d3.select("#slider").on("input", function () {
        var date = new Date(+startDate + millisecondsPerDay * this.value);
        update(date);
    });



    const colormap = d3
        .scaleLinear()
        .domain(valRange)
        .range(["coral", "violet", "indigo", "green", "blue", "#eeeeee", "yellow", "orange"]);

    const svg = d3.select("#mapsvg_pr");
    const tool_tip = d3.tip().attr("class", "d3-tip").offset([-8, 0]);
    let allStats;

    Promise.all([
        d3.json(
            "https://gist.githubusercontent.com/mheydt/29eec003a4c0af362d7a/raw/d27d143bd75626647108fc514d8697e0814bf74b/us-states.json"
        ),
        statedata
    ]).then(ready);

    function ready(data) {

        const us = data[0];

        allStats = data[1].map(function (row, i) {
            return {
                Updated: dataParse(row.Updated),
                AdminRegion1: row.AdminRegion1,
                Confirmed: row.Confirmed,
                ConfirmedChange: row.ConfirmedChange,
                Deaths: row.Deaths,
                DeathsChange: row.DeathsChange,
            };
        });

        const availableDays =
            (d3.max(allStats, function (d) {
                    return d.Updated;
                }) -
                startDate
            ) /
            millisecondsPerDay;
        slider.attr("max", Math.round(availableDays));
        slider.attr("class", "slider");

        render(us);
        update(startDate);
    }

    function getStateMetrics(stats, state_name) {
        for (var i = 0; i < stats.length; i++) {
            if (stats[i].AdminRegion1 == state_name) {
                return stats[i];
            }
        }
    }

    function render(us) {
        const projection = d3
            .geoAlbersUsa()
            .translate([width / 2, height / 2])
            .scale([1280]);

        const path = d3.geoPath().projection(projection);

        svg.call(tool_tip);

        svg
            .append("g")
            .attr("class", "states")
            .attr("class", "state-borders")
            .selectAll("path")
            .data(
                us.features.filter(function (d) {
                    return d.properties.name !== "Puerto Rico";
                })
            )
            .enter()
            .append("path")
            .on("mouseover", tool_tip.show)
            .on("mouseout", tool_tip.hide)
            .attr("d", path);
    }

    var zoom = d3.zoom()
        .scaleExtent([1, 2])
        .on('zoom', function() {
            svg.selectAll('path')
                .attr('transform', d3.event.transform);
        });


    svg.call(zoom)
    svg.call(zoom.transform, d3.zoomIdentity.scale(1));


    function update(date) {
        const stats = allStats.filter(function (row, i) {
            return +row.Updated === +date;
        });

        d3.select("#date").text(niceFormat(date));

        tool_tip.html(function (d, i) {
            const stateMetrics = getStateMetrics(stats, d.properties.name);
            let html =
                "<table>" +
                "<tr><th>Name:</th><td>" +
                stateMetrics.AdminRegion1 +
                "</td></tr>" +

                "<tr><th>Confirmed Cases:</th><td>" +
                stateMetrics.Confirmed +
                "</td></tr>" +

                "<tr><th>Changes in Confirmed Cases:</th><td>" +
                stateMetrics.ConfirmedChange +
                "</td></tr>" +

                "<tr><th>Deaths:</th><td>" +
                stateMetrics.Deaths +
                "</td></tr>" +

                "<tr><th>Changes in Deaths :</th><td>" +
                stateMetrics.DeathsChange +
                "</td></tr>" +
                "</table>";
            return html;
        });

        svg.selectAll("path").attr("fill", function (d) {
            const metrics = getStateMetrics(stats, d.properties.name);
            if (metrics === undefined) return "#ddd";
            const rate = getStateMetrics(stats, d.properties.name)[rateType];
            return colormap(rate);
        });
    }


}

var countymap = function(countydata) {
    document.getElementById("slider").value = 0;

    var width = 1400
    var height = 600

    const niceFormat = d3.utcFormat("%B %d, %Y");
    const dataFormat = d3.utcFormat("%m/%d/%Y");
    const dataParse = d3.utcParse("%m/%d/%Y");

    const startDate = dataParse("01/21/2020");
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const valRange = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1500, 1600, 1700, 1800, 1900, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000, 7500, 8000, 8500, 9000, 9500, 10000, 12000, 15000, 20000, 22000, 25000, 30000, 33000, 40000];
    const rateType = "Confirmed";

    const slider = d3.select("#slider").on("input", function () {
        var date = new Date(+startDate + millisecondsPerDay * this.value);
        update(date);
    });

    const colormap = d3
        .scaleLinear()
        .domain(valRange)
        .range(["coral", "violet", "indigo", "green", "blue", "#eeeeee", "yellow", "orange"]);
    const svg = d3.select("#mapsvg_pr");
    const tool_tip = d3.tip().attr("class", "d3-tip").offset([-8, 0]);
    let allStats;

    Promise.all([
        d3.json(
            "https://raw.githubusercontent.com/python-visualization/folium/master/tests/us-counties.json"
        ),
        countydata
    ]).then(ready);

    function ready(data) {
        const us = data[0];

        allStats = data[1].map(function (row, i) {
            return {
                Updated: dataParse(row.Updated),
                Updated: dataParse(row.Updated),
                AdminRegion2: row.AdminRegion2,
                Confirmed: row.Confirmed,
                ConfirmedChange: row.ConfirmedChange,
                Deaths: row.Deaths,
                DeathsChange: row.DeathsChange,
            };
        });

        const availableDays =
            (d3.max(allStats, function (d) {
                    return d.Updated;
                }) -
                startDate) /
            millisecondsPerDay;
        slider.attr("max", Math.round(availableDays));



        render(us);
        update(startDate);
    }

    function getStateMetrics(stats, county_name) {
        for (var i = 0; i < stats.length; i++) {
            if (stats[i].AdminRegion2 == county_name) {
                return stats[i];

            }
        }
    }

    function render(us) {
        const projection = d3
            .geoAlbersUsa()
            .translate([width / 2, height / 2])
            .scale([1280]);

        const path = d3.geoPath().projection(projection);

        svg.call(tool_tip);

        svg
            .append("g")
            .attr("class", "states")
            .attr("class", "state-borders")
            .selectAll("path")
            .data(
                us.features.filter(function (d) {
                    return d.properties.name !== "Puerto Rico";
                })
            )
            .enter()
            .append("path")
            .on("mouseover", tool_tip.show)
            .on("mouseout", tool_tip.hide)
            .attr("d", path);
    }


    var zoom = d3.zoom()
        .scaleExtent([1, 2])
        .on('zoom', function() {
            svg.selectAll('path')
                .attr('transform', d3.event.transform);
        });


    svg.call(zoom)

    svg.call(zoom.transform, d3.zoomIdentity.scale(1));


    function update(date) {
        const stats = allStats.filter(function (row, i) {
            return +row.Updated === +date;
        });

        d3.select("#date").text(niceFormat(date));

        tool_tip.html(function (d, i) {
            const stateMetrics = getStateMetrics(stats, d.properties.name);
            let html =
                "<table>" +
                "<tr><th>Name:</th><td>" +
                stateMetrics.AdminRegion2 +
                "</td></tr>" +

                "<tr><th>Confirmed Cases:</th><td>" +
                stateMetrics.Confirmed +
                "</td></tr>" +

                "<tr><th>Changes in Confirmed Cases:</th><td>" +
                stateMetrics.ConfirmedChange +
                "</td></tr>" +

                "<tr><th>Deaths:</th><td>" +
                stateMetrics.Deaths +
                "</td></tr>" +

                "<tr><th>Changes in Deaths :</th><td>" +
                stateMetrics.DeathsChange +
                "</td></tr>" +
                "</table>";
            return html;

        });
        var countymap = function() {
            document.getElementById("slider").value = 0;

            var width = 1400
            var height = 600

            const niceFormat = d3.utcFormat("%B %d, %Y");
            const dataFormat = d3.utcFormat("%m/%d/%Y");
            const dataParse = d3.utcParse("%m/%d/%Y");

            const startDate = dataParse("01/21/2020");
            const millisecondsPerDay = 24 * 60 * 60 * 1000;
            const valRange = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1500, 1600, 1700, 1800, 1900, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000, 7500, 8000, 8500, 9000, 9500, 10000, 12000, 15000, 20000, 22000, 25000, 30000, 33000, 40000];
            const rateType = "Confirmed";

            const slider = d3.select("#slider").on("input", function () {
                var date = new Date(+startDate + millisecondsPerDay * this.value);
                update(date);
            });

            const colormap = d3
                .scaleLinear()
                .domain(valRange)
                .range(["coral", "violet", "indigo", "green", "blue", "#eeeeee", "yellow", "orange"]);
            const svg = d3.select("#mapsvg_pr");
            const tool_tip = d3.tip().attr("class", "d3-tip").offset([-8, 0]);
            let allStats;

            Promise.all([
                d3.json(
                    "https://raw.githubusercontent.com/python-visualization/folium/master/tests/us-counties.json"
                ),
                d3.csv("counties_only.csv")
            ]).then(ready);

            function ready(data) {
                const us = data[0];

                allStats = data[1].map(function (row, i) {
                    return {
                        Updated: dataParse(row.Updated),
                        UpdatedConfirmed: dataParse(row.UpdatedConfirmed),
                        AdminRegion2: row.AdminRegion2,
                        Confirmed: row.Confirmed,
                        ConfirmedChange: row.ConfirmedChange,
                        Deaths: row.Deaths,
                        DeathsChange: row.DeathsChange,
                    };
                });

                const availableDays =
                    (d3.max(allStats, function (d) {
                            return d.Updated;
                        }) -
                        startDate) /
                    millisecondsPerDay;
                slider.attr("max", Math.round(availableDays));



                render(us);
                update(startDate);
            }

            function getStateMetrics(stats, county_name) {
                for (var i = 0; i < stats.length; i++) {
                    if (stats[i].AdminRegion2 == county_name) {
                        return stats[i];

                    }
                }
            }

            function render(us) {
                const projection = d3
                    .geoAlbersUsa()
                    .translate([width / 2, height / 2])
                    .scale([1280]);

                const path = d3.geoPath().projection(projection);

                svg.call(tool_tip);

                svg
                    .append("g")
                    .attr("class", "states")
                    .attr("class", "state-borders")
                    .selectAll("path")
                    .data(
                        us.features.filter(function (d) {
                            return d.properties.name !== "Puerto Rico";
                        })
                    )
                    .enter()
                    .append("path")
                    .on("mouseover", tool_tip.show)
                    .on("mouseout", tool_tip.hide)
                    .attr("d", path);
            }


            var zoom = d3.zoom()
                .scaleExtent([1, 2])
                .on('zoom', function() {
                    svg.selectAll('path')
                        .attr('transform', d3.event.transform);
                });


            svg.call(zoom)

            svg.call(zoom.transform, d3.zoomIdentity.scale(1));


            function update(date) {
                const stats = allStats.filter(function (row, i) {
                    return +row.Updated === +date;
                });

                d3.select("#date").text(niceFormat(date));

                tool_tip.html(function (d, i) {
                    const stateMetrics = getStateMetrics(stats, d.properties.name);
                    let html =
                        "<table>" +
                        "<tr><th>Name:</th><td>" +
                        stateMetrics.AdminRegion2 +
                        "</td></tr>" +

                        "<tr><th>Confirmed Cases:</th><td>" +
                        stateMetrics.Confirmed +
                        "</td></tr>" +

                        "<tr><th>Changes in Confirmed Cases:</th><td>" +
                        stateMetrics.ConfirmedChange +
                        "</td></tr>" +

                        "<tr><th>Deaths:</th><td>" +
                        stateMetrics.Deaths +
                        "</td></tr>" +

                        "<tr><th>Changes in Deaths :</th><td>" +
                        stateMetrics.DeathsChange +
                        "</td></tr>" +
                        "</table>";
                    return html;

                });



                svg.selectAll("path").attr("fill", function (d) {
                    const metrics = getStateMetrics(stats, d.properties.name);
                    if (metrics === undefined) return "#ddd";
                    const rate = getStateMetrics(stats, d.properties.name)[rateType];
                    return colormap(rate);
                });
            }
        }


        svg.selectAll("path").attr("fill", function (d) {
            const metrics = getStateMetrics(stats, d.properties.name);
            if (metrics === undefined) return "#ddd";
            const rate = getStateMetrics(stats, d.properties.name)[rateType];
            return colormap(rate);
        });
    }
}


var usamap = function(usadata) {
    document.getElementById("slider").value = 0;
    var width = 1400
    var height = 600

    const niceFormat = d3.utcFormat("%B %d, %Y");
    const dataFormat = d3.utcFormat("%m/%d/%Y");
    const dataParse = d3.utcParse("%m/%d/%Y");

    const startDate = dataParse("01/21/2020");
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const valRange = [0, 5500000, 8500000];
    const rateType = "Confirmed";

    const slider = d3.select("#slider").on("input", function () {
        var date = new Date(+startDate + millisecondsPerDay * this.value);
        update(date);
    });



    const colormap = d3
        .scaleLinear()
        .domain(valRange)
        .range(["blue", "#eeeeee", "red"]);
    const svg = d3.select("#mapsvg_pr");
    const tool_tip = d3.tip().attr("class", "d3-tip").offset([-8, 0]);
    let allStats;

    Promise.all([
        d3.json(
            "custom.geo.json"
        ),
        usadata
    ]).then(ready);

    function ready(data) {

        const us = data[0];

        allStats = data[1].map(function (row, i) {
            return {
                Updated: dataParse(row.Updated),
                Updated: dataParse(row.Updated),
                Country_Region: row.Country_Region,
                Confirmed: row.Confirmed,
                ConfirmedChange: row.ConfirmedChange,
                Deaths: row.Deaths,
                DeathsChange: row.DeathsChange,
            };
        });

        const availableDays =
            (d3.max(allStats, function (d) {
                    return d.Updated;
                }) -
                startDate) /
            millisecondsPerDay;
        slider.attr("max", Math.round(availableDays));

        render(us);
        update(startDate);
    }

    function getStateMetrics(stats, state_name) {
        for (var i = 0; i < stats.length; i++) {
            if (stats[i].Country_Region == state_name) {
                return stats[i];
            }
        }
    }

    function render(us) {
        const projection = d3
            .geoAlbersUsa()
            .translate([width / 2, height / 2])
            .scale([1280]);

        const path = d3.geoPath().projection(projection);

        svg.call(tool_tip);

        svg
            .append("g")
            .attr("class", "states")
            .attr("class", "state-borders")
            .selectAll("path")
            .data(
                us.features.filter(function (d) {
                    return d.properties.name !== "Puerto Rico";
                })
            )
            .enter()
            .append("path")
            .on("mouseover", tool_tip.show)
            .on("mouseout", tool_tip.hide)
            .attr("d", path);
    }

    var zoom = d3.zoom()
        .scaleExtent([1, 2])
        .on('zoom', function() {
            svg.selectAll('path')
                .attr('transform', d3.event.transform);
        });


    svg.call(zoom)


    svg.call(zoom.transform, d3.zoomIdentity.scale(1));


    function update(date) {
        const stats = allStats.filter(function (row, i) {
            return +row.Updated === +date;
        });

        d3.select("#date").text(niceFormat(date));

        tool_tip.html(function (d, i) {
            const stateMetrics = getStateMetrics(stats, d.properties.name);
            let html =
                "<table>" +
                "<tr><th>Confirmed Cases:</th><td>" +
                stateMetrics.Confirmed +
                "</td></tr>" +

                "<tr><th>Changes in Confirmed Cases:</th><td>" +
                stateMetrics.ConfirmedChange +
                "</td></tr>" +

                "<tr><th>Deaths:</th><td>" +
                stateMetrics.Deaths +
                "</td></tr>" +

                "<tr><th>Changes in Deaths :</th><td>" +
                stateMetrics.DeathsChange +
                "</td></tr>" +
                "</table>";
            return html;
        });

        svg.selectAll("path").attr("fill", function (d) {
            const metrics = getStateMetrics(stats, d.properties.name);
            if (metrics === undefined) return "#ddd";
            const rate = getStateMetrics(stats, d.properties.name)[rateType];
            return colormap(rate);
        });
    };

};

usamap()


export default {usamap, statemap, countymap}
