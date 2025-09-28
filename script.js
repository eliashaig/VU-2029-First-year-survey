// Load survey responses
Plotly.d3.csv("responses.csv", function(err, rows) {
    if (err) {
        console.error("Error loading CSV:", err);
        return;
    }

    // --- Extract data ---
    let states = rows.map(r => r["What is your home state?"]);
    let gender = rows.map(r => r["What is your gender?"]);
    let race = rows.map(r => r["What is your race and/or ethnicity? Select all that apply."]);

    // --- Chart 1: Home States ---
    let traceStates = {
        type: "histogram",
        x: states,
        marker: { color: "navy" }
    };
    Plotly.newPlot("chart-state", [traceStates], {
        title: "Home States of Vanderbilt Class of 2029",
        xaxis: { title: "State" },
        yaxis: { title: "Number of Students" }
    });

    // --- Chart 2: Gender Pie Chart ---
    let genderCounts = {};
    gender.forEach(g => {
        if (g) genderCounts[g] = (genderCounts[g] || 0) + 1;
    });
    let traceGender = {
        type: "pie",
        labels: Object.keys(genderCounts),
        values: Object.values(genderCounts),
        hole: 0.3
    };
    Plotly.newPlot("chart-gender", [traceGender], {
        title: "Gender Breakdown"
    });

    // --- Chart 3: Race/Ethnicity Bar Chart ---
    let raceCounts = {};
    race.forEach(r => {
        if (r) {
            r.split(",").forEach(item => {
                let cleaned = item.trim();
                if (cleaned) raceCounts[cleaned] = (raceCounts[cleaned] || 0) + 1;
            });
        }
    });
    let traceRace = {
        type: "bar",
        x: Object.keys(raceCounts),
        y: Object.values(raceCounts),
        marker: { color: "darkred" }
    };
    Plotly.newPlot("chart-race", [traceRace], {
        title: "Race/Ethnicity Breakdown",
        xaxis: { title: "Race/Ethnicity" },
        yaxis: { title: "Number of Students" }
    });
});
