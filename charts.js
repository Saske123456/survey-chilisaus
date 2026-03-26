// charts.js — Chart.js visualization logic for the analysis dashboard
// Requires: Chart.js loaded from CDN, questions.js loaded first

const CHART_COLORS = {
  accent:  '#e07b39',
  blue:    '#4a7fcb',
  green:   '#3dba7e',
  purple:  '#8b5cf6',
  yellow:  '#e0c040',
  red:     '#e05050',
  text:    '#e8eaf0',
  text2:   '#9aa0b8',
  border:  '#2e3550',
  bg:      '#1a1f2e'
};

// 5-point Likert label mapping
const LIKERT_LABEL_MAP = {
  5: 'Helemaal eens',
  4: 'Eens',
  3: 'Min of meer eens',
  2: 'Niet eens',
  1: 'Helemaal niet eens'
};

// Colors per Likert value (5=strongly agree, 1=strongly disagree)
const LIKERT_BAR_COLORS = [
  '#3dba7e',  // 5 - Helemaal eens
  '#6dcfa0',  // 4 - Eens
  '#e0c040',  // 3 - Min of meer eens
  '#e07b39',  // 2 - Niet eens
  '#e05050'   // 1 - Helemaal niet eens
];

Chart.defaults.color = CHART_COLORS.text2;
Chart.defaults.borderColor = CHART_COLORS.border;
Chart.defaults.font.family = "'Segoe UI', system-ui, sans-serif";
Chart.defaults.font.size = 12;

// ── Build a horizontal bar chart for Likert frequency distribution
function buildLikertChart(canvasId, stats, questionText) {
  const ctx = document.getElementById(canvasId);
  if (!ctx || !stats || stats.n === 0) return null;

  const freq = stats.freq || {};
  const labels = ['Helemaal eens', 'Eens', 'Min of\nmeer eens', 'Niet eens', 'Helemaal\nniet eens'];
  const values = [freq[5] || 0, freq[4] || 0, freq[3] || 0, freq[2] || 0, freq[1] || 0];
  const total = values.reduce((a, b) => a + b, 0);
  const pcts = values.map(v => total > 0 ? +((v / total) * 100).toFixed(1) : 0);

  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        data: pcts,
        backgroundColor: LIKERT_BAR_COLORS,
        borderRadius: 4,
        borderSkipped: false
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => ` ${ctx.raw}%  (n=${values[ctx.dataIndex]})`
          }
        }
      },
      scales: {
        x: {
          max: 100,
          grid: { color: 'rgba(46,53,80,0.5)' },
          ticks: {
            callback: v => v + '%',
            color: CHART_COLORS.text2,
            font: { size: 11 }
          }
        },
        y: {
          grid: { display: false },
          ticks: { color: CHART_COLORS.text2, font: { size: 11 } }
        }
      }
    }
  });
}

// ── Build a horizontal bar chart for multiple-choice frequency
function buildMCChart(canvasId, stats, optionLabels) {
  const ctx = document.getElementById(canvasId);
  if (!ctx || !stats || stats.n === 0) return null;

  const freq = stats.freq || {};
  const total = stats.n;

  // Map option keys to labels
  const entries = optionLabels
    ? optionLabels.map(o => ({ label: o.l, count: freq[o.v] || 0 }))
    : Object.entries(freq).map(([k, v]) => ({ label: k, count: v }));

  const labels = entries.map(e => e.label);
  const values = entries.map(e => e.count);
  const pcts   = values.map(v => total > 0 ? +((v / total) * 100).toFixed(1) : 0);

  // Generate distinct colors
  const bgColors = [
    CHART_COLORS.accent, CHART_COLORS.blue, CHART_COLORS.green,
    CHART_COLORS.purple, CHART_COLORS.yellow, CHART_COLORS.red
  ];

  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        data: pcts,
        backgroundColor: bgColors.slice(0, labels.length),
        borderRadius: 4,
        borderSkipped: false
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => ` ${ctx.raw}%  (n=${values[ctx.dataIndex]})`
          }
        }
      },
      scales: {
        x: {
          max: 100,
          grid: { color: 'rgba(46,53,80,0.5)' },
          ticks: {
            callback: v => v + '%',
            color: CHART_COLORS.text2,
            font: { size: 11 }
          }
        },
        y: {
          grid: { display: false },
          ticks: { color: CHART_COLORS.text2, font: { size: 11 } }
        }
      }
    }
  });
}

// ── Response timeline chart
function buildTimelineChart(canvasId, timeline) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;

  const sorted = Object.entries(timeline).sort(([a], [b]) => a.localeCompare(b));
  const labels = sorted.map(([d]) => d);
  const values = sorted.map(([, v]) => v);

  return new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Responsen per dag',
        data: values,
        borderColor: CHART_COLORS.accent,
        backgroundColor: 'rgba(224,123,57,0.12)',
        fill: true,
        tension: 0.35,
        pointRadius: 4,
        pointBackgroundColor: CHART_COLORS.accent
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: {
          grid: { color: 'rgba(46,53,80,0.5)' },
          ticks: { color: CHART_COLORS.text2, font: { size: 11 }, maxTicksLimit: 12 }
        },
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(46,53,80,0.5)' },
          ticks: { color: CHART_COLORS.text2, font: { size: 11 }, stepSize: 1 }
        }
      }
    }
  });
}

// ── Mean score summary chart (one bar per question in a construct)
function buildConstructSummaryChart(canvasId, questionIds, statsMap, shortLabels) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;

  const means = questionIds.map(id => statsMap[id] ? statsMap[id].mean || 0 : 0);
  const labels = shortLabels || questionIds.map(id => id.toUpperCase());

  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Gemiddelde (1-5)',
        data: means,
        backgroundColor: means.map(m =>
          m >= 4 ? CHART_COLORS.green :
          m >= 3 ? CHART_COLORS.yellow :
          CHART_COLORS.red
        ),
        borderRadius: 4,
        borderSkipped: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => ` Gemiddelde: ${ctx.raw}`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: CHART_COLORS.text2, font: { size: 11 } }
        },
        y: {
          min: 1, max: 5,
          grid: { color: 'rgba(46,53,80,0.5)' },
          ticks: { color: CHART_COLORS.text2, font: { size: 11 }, stepSize: 1 }
        }
      }
    }
  });
}

// ── Generate descriptive stats table as LaTeX string
function generateLatexTable(statsMap, questionsArr) {
  const rows = questionsArr
    .filter(q => q.type === 'likert' && statsMap[q.id] && statsMap[q.id].n > 0)
    .map(q => {
      const s = statsMap[q.id];
      const shortText = q.text.length > 55 ? q.text.substring(0, 52) + '...' : q.text;
      return `  ${q.label} & ${shortText.replace(/&/g, '\\&')} & ${s.n} & ${s.mean.toFixed(2)} & ${s.median.toFixed(1)} & ${s.std.toFixed(2)} & ${s.min} & ${s.max} \\\\`;
    });

  return `\\begin{table}[htbp]
\\centering
\\caption{Beschrijvende statistieken Likert-schaalnvragen (1 = Helemaal niet eens, 5 = Helemaal eens)}
\\label{tab:h07-survey-stats}
\\begin{tabular}{@{}llrrrrrr@{}}
\\toprule
ID & Stelling (afgekorte tekst) & n & M & Mediaan & SD & Min & Max \\\\
\\midrule
${rows.join('\n')}
\\bottomrule
\\end{tabular}
\\end{table}`;
}
