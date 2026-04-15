/* ═══════════════════════════════════════════
   도시인문학 연구 대시보드 — app.js
   ═══════════════════════════════════════════ */

/* ── 데이터 ── */
const DATA = {
  yearTrend: [
    {year:2009,count:22},{year:2010,count:29},{year:2011,count:20},
    {year:2012,count:14},{year:2013,count:18},{year:2014,count:23},
    {year:2015,count:25},{year:2016,count:34},{year:2017,count:49},
    {year:2018,count:21},{year:2019,count:20},{year:2020,count:34},
    {year:2021,count:25},{year:2022,count:23},{year:2023,count:28},
    {year:2024,count:30},{year:2025,count:28}
  ],
  perspectives: [
    {name:"문화·매체", count:160, pct:29, color:"#6366f1"},
    {name:"정책·사회", count:139, pct:25, color:"#f59e0b"},
    {name:"공간·장소", count:131, pct:24, color:"#10b981"},
    {name:"철학·이론", count:130, pct:23, color:"#f43f5e"}
  ],
  perspectiveTrend: [
    {period:"~2010",     "문화·매체":27,"정책·사회":21,"공간·장소":27,"철학·이론":25},
    {period:"2011–2015", "문화·매체":28,"정책·사회":28,"공간·장소":28,"철학·이론":16},
    {period:"2016–2020", "문화·매체":32,"정책·사회":30,"공간·장소":17,"철학·이론":21},
    {period:"2021–2025", "문화·매체":27,"정책·사회":18,"공간·장소":25,"철학·이론":31}
  ],
  top10: [
    {rank:1, year:2011, title:"미셸 푸코의 '헤테로토피아' — 초기 공간 개념에 대한 비판적 검토", author:"허경", citations:66},
    {rank:2, year:2014, title:"르페브르의 변증법적 공간 이론과 공간정치 — 「공간의 생산」을 중심으로", author:"신승원", citations:27},
    {rank:3, year:2020, title:"한국 SF와 페미니즘의 동시대적 조우 — 김보영·듀나 작품론", author:"강은교; 김은주", citations:21},
    {rank:4, year:2020, title:"한국 웹소설 판타지의 형식적 갱신과 사회적 성찰 — 책빙의물을 중심으로", author:"유인혁", citations:20},
    {rank:5, year:2010, title:"발터 벤야민과 도시경험 — 벤야민의 도시인문학 방법론에 대한 고찰", author:"홍준기", citations:18},
    {rank:6, year:2014, title:"창조도시 논의의 비판적 성찰과 과제", author:"남기범", citations:18},
    {rank:7, year:2017, title:"빅데이터가 던지는 도전적인 철학적 문제들에 대한 고찰", author:"이중원", citations:18},
    {rank:8, year:2016, title:"혐오발언, 혐오감, 타자로서 이웃", author:"임옥희", citations:16},
    {rank:9, year:2009, title:"도시민의 문화자본과 문화적 취향분화 — 관람형 여가소비를 중심으로", author:"이승일; 장윤정", citations:16},
    {rank:10,year:2014, title:"산업유산 활용 사례를 통해 본 인문학적 도시재생 방향 모색", author:"김소라; 이병민", citations:16}
  ]
};

/* ── KPI 카운터 애니메이션 ── */
function animateCounter(el, target, duration = 1600) {
  const start = performance.now();
  const formatter = new Intl.NumberFormat('ko-KR');
  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = formatter.format(Math.round(ease * target));
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function initKPI() {
  document.querySelectorAll('.kpi-value[data-target]').forEach((el, i) => {
    const target = parseInt(el.dataset.target, 10);
    setTimeout(() => animateCounter(el, target), i * 80);
  });
}

/* ── Chart.js 공통 설정 ── */
Chart.defaults.font.family = "'Pretendard', 'Inter', system-ui, sans-serif";
Chart.defaults.color = '#8b92a8';

const gridColor = 'rgba(255,255,255,0.05)';
const tickColor  = '#555c72';

/* ── 2계층: 연도별 막대 ── */
function initTrendChart() {
  const ctx = document.getElementById('chart-trend').getContext('2d');
  const labels = DATA.yearTrend.map(d => String(d.year));
  const values = DATA.yearTrend.map(d => d.count);

  // 2017 최고값 강조
  const bgColors = values.map((v, i) => {
    if (v === Math.max(...values)) return 'rgba(99,102,241,0.9)';
    if (labels[i] === '2016' || labels[i] === '2020') return 'rgba(99,102,241,0.55)';
    return 'rgba(99,102,241,0.35)';
  });

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: '논문 수',
        data: values,
        backgroundColor: bgColors,
        borderColor: bgColors.map(c => c.replace(/[\d.]+\)$/, '1)')),
        borderWidth: 0,
        borderRadius: 5,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1a1e2a',
          borderColor: 'rgba(99,102,241,0.3)',
          borderWidth: 1,
          titleColor: '#f0f2f8',
          bodyColor: '#8b92a8',
          padding: 10,
          callbacks: {
            title: items => `${items[0].label}년`,
            label: item => ` 논문 ${item.parsed.y}편`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: tickColor, font: { size: 11 }, maxRotation: 0 }
        },
        y: {
          grid: { color: gridColor },
          ticks: { color: tickColor, font: { size: 11 }, stepSize: 10 },
          beginAtZero: true,
          max: 60
        }
      },
      animation: { duration: 1000, easing: 'easeOutQuart' }
    }
  });
}

/* ── 3계층: 도넛 차트 ── */
function initDonutChart() {
  const ctx = document.getElementById('chart-donut').getContext('2d');
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: DATA.perspectives.map(d => d.name),
      datasets: [{
        data: DATA.perspectives.map(d => d.count),
        backgroundColor: DATA.perspectives.map(d => d.color + 'cc'),
        borderColor: DATA.perspectives.map(d => d.color),
        borderWidth: 2,
        hoverBorderWidth: 3,
        hoverOffset: 6,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      cutout: '68%',
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1a1e2a',
          borderColor: 'rgba(255,255,255,0.1)',
          borderWidth: 1,
          titleColor: '#f0f2f8',
          bodyColor: '#8b92a8',
          padding: 10,
          callbacks: {
            label: item => ` ${item.label}: ${item.parsed}편 (${DATA.perspectives[item.dataIndex].pct}%)`
          }
        }
      },
      animation: { animateRotate: true, duration: 1000 }
    }
  });
}

/* ── 3계층: 누적 면적 차트 ── */
function initStackedChart() {
  const ctx = document.getElementById('chart-stacked').getContext('2d');
  const periods = DATA.perspectiveTrend.map(d => d.period);
  const perspNames = ["문화·매체","정책·사회","공간·장소","철학·이론"];
  const colors = ["#6366f1","#f59e0b","#10b981","#f43f5e"];

  const datasets = perspNames.map((name, i) => ({
    label: name,
    data: DATA.perspectiveTrend.map(d => d[name]),
    backgroundColor: colors[i] + '55',
    borderColor: colors[i],
    borderWidth: 2,
    fill: true,
    tension: 0.4,
    pointRadius: 4,
    pointBackgroundColor: colors[i],
    pointBorderColor: '#1a1e2a',
    pointBorderWidth: 2,
  }));

  new Chart(ctx, {
    type: 'line',
    data: { labels: periods, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          align: 'end',
          labels: {
            color: '#8b92a8',
            font: { size: 10 },
            boxWidth: 10,
            boxHeight: 10,
            borderRadius: 3,
            useBorderRadius: true,
            padding: 10
          }
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          backgroundColor: '#1a1e2a',
          borderColor: 'rgba(255,255,255,0.1)',
          borderWidth: 1,
          titleColor: '#f0f2f8',
          bodyColor: '#8b92a8',
          padding: 10,
          callbacks: {
            label: item => ` ${item.dataset.label}: ${item.parsed.y}%`
          }
        }
      },
      scales: {
        x: { grid: { color: gridColor }, ticks: { color: tickColor, font: { size: 10 } } },
        y: {
          grid: { color: gridColor },
          ticks: { color: tickColor, font: { size: 10 }, callback: v => v + '%' },
          min: 0, max: 40
        }
      },
      animation: { duration: 1000, easing: 'easeOutQuart' }
    }
  });
}

/* ── 4계층: Top 10 테이블 ── */
function initTop10Table() {
  const tbody = document.getElementById('top10-body');
  const maxCit = DATA.top10[0].citations;

  DATA.top10.forEach(paper => {
    const rankClass = paper.rank <= 3 ? `rank-${paper.rank}` : 'rank-other';
    const barWidth = Math.round(paper.citations / maxCit * 100);

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><span class="rank-badge ${rankClass}">${paper.rank}</span></td>
      <td class="year-cell">${paper.year}</td>
      <td class="title-cell">${paper.title}</td>
      <td class="author-cell">${paper.author}</td>
      <td class="cit-cell">${paper.citations}</td>
      <td>
        <div class="cit-bar-wrap">
          <div class="cit-bar" style="width:0%" data-width="${barWidth}%"></div>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

/* ── 스크롤 진입 시 바 애니메이션 ── */
function initBarAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // 약간의 딜레이 후 모든 data-width 요소 애니메이션
        entry.target.querySelectorAll('[data-width]').forEach((el, i) => {
          setTimeout(() => { el.style.width = el.dataset.width; }, 150 + i * 60);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });

  // 섹션 전체를 감지해서 더 안정적으로 트리거
  document.querySelectorAll('.landscape-section, .top10-section').forEach(el => observer.observe(el));
}

/* ── Init ── */
function init() {
  initKPI();
  initTrendChart();
  initDonutChart();
  initStackedChart();
  initTop10Table();
  initBarAnimations();
}

document.addEventListener('DOMContentLoaded', init);
