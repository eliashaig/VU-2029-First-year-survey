// Load CSV from the "data" folder
Plotly.d3.csv("data/responses.csv", function(err, rows) {
  if (err) {
    console.error("Error loading CSV:", err);
    return;
  }

  // Grab the headers (question names)
  let headers = Object.keys(rows[0]);
  console.log("Headers found:", headers);

  // Example: take the first 3 questions (you can adjust later)
  let q1 = headers[1]; // skip timestamp
  let q2 = headers[2];
  let q3 = headers[3];

  // Helper: count answers
  function countAnswers(question) {
    let counts = {};
    rows.forEach(r => {
      let ans = r[question];
      if (ans) counts[ans] = (counts[ans] || 0) + 1;
    });
    return {
      labels: Object.keys(counts),
      values: Object.values(counts)
    };
  }

  // Chart 1
  let data1 = countAnswers(q1);
  Plotly.newPlot('chart1', [{
    type: "bar",
    x: data1.labels,
    y: data1.values
  }], {title: q1});

  // Chart 2
  let data2 = countAnswers(q2);
  Plotly.newPlot('chart2', [{
    type: "pie",
    labels: data2.labels,
    values: data2.values
  }], {title: q2});

  // Chart 3
  let data3 = countAnswers(q3);
  Plotly.newPlot('chart3', [{
    type: "bar",
    x: data3.labels,
    y: data3.values
  }], {title: q3});
});
