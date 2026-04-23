/* ═══════════════════════════════════════════
   도시인문학 연구 대시보드 — app.js
   ═══════════════════════════════════════════ */

/* ── 데이터 ── */
const DATA = {
  yearTrend: [
    { year: 2009, count: 22 }, { year: 2010, count: 29 }, { year: 2011, count: 20 },
    { year: 2012, count: 14 }, { year: 2013, count: 18 }, { year: 2014, count: 23 },
    { year: 2015, count: 25 }, { year: 2016, count: 34 }, { year: 2017, count: 49 },
    { year: 2018, count: 21 }, { year: 2019, count: 20 }, { year: 2020, count: 34 },
    { year: 2021, count: 25 }, { year: 2022, count: 23 }, { year: 2023, count: 28 },
    { year: 2024, count: 30 }, { year: 2025, count: 28 }
  ],
  perspectives: [
    { name: "사회·공동체", count: 177, pct: 40, color: "#d97706" },
    { name: "공간·역사·장소", count: 113, pct: 25, color: "#059669" },
    { name: "문학·예술·문화", count: 96, pct: 21, color: "#2563eb" },
    { name: "철학·이론", count: 61, pct: 14, color: "#e11d48" }
  ],
  perspectiveTrend: [
    { period: "~2010",     "철학·이론": 18, "문학·예술·문화": 26, "공간·역사·장소": 26, "사회·공동체": 31 },
    { period: "2011–2015", "철학·이론": 15, "문학·예술·문화": 16, "공간·역사·장소": 30, "사회·공동체": 39 },
    { period: "2016–2020", "철학·이론":  8, "문학·예술·문화": 22, "공간·역사·장소": 26, "사회·공동체": 45 },
    { period: "2021–2025", "철학·이론": 18, "문학·예술·문화": 24, "공간·역사·장소": 21, "사회·공동체": 37 }
  ],
  top10: [
    { rank: 1,  year: 2011, title: "미셸 푸코의 '헤테로토피아' — 초기 공간 개념에 대한 비판적 검토",                  author: "허경",          citations: 66, perspective: { name: "철학·이론",         color: "#e11d48" }, tags: ["푸코", "헤테로토피아", "공간비판"] },
    { rank: 2,  year: 2014, title: "르페브르의 변증법적 공간 이론과 공간정치 — 「공간의 생산」을 중심으로",           author: "신승원",        citations: 27, perspective: { name: "철학·이론",         color: "#e11d48" }, tags: ["르페브르", "공간의생산", "변증법"] },
    { rank: 3,  year: 2020, title: "한국 SF와 페미니즘의 동시대적 조우 — 김보영·듀나 작품론",                        author: "강은교; 김은주", citations: 21, perspective: { name: "문학·예술·문화",  color: "#2563eb" }, tags: ["SF", "페미니즘", "김보영", "듀나"] },
    { rank: 4,  year: 2020, title: "한국 웹소설 판타지의 형식적 갱신과 사회적 성찰 — 책빙의물을 중심으로",           author: "유인혁",        citations: 20, perspective: { name: "문학·예술·문화",  color: "#2563eb" }, tags: ["웹소설", "판타지", "대중문화"] },
    { rank: 5,  year: 2010, title: "발터 벤야민과 도시경험 — 벤야민의 도시인문학 방법론에 대한 고찰",               author: "홍준기",        citations: 18, perspective: { name: "철학·이론",         color: "#e11d48" }, tags: ["벤야민", "도시경험", "플라뇌르"] },
    { rank: 6,  year: 2014, title: "창조도시 논의의 비판적 성찰과 과제",                                             author: "남기범",        citations: 18, perspective: { name: "공간·역사·장소", color: "#059669" }, tags: ["창조도시", "도시정책", "고창조도시론"] },
    { rank: 7,  year: 2017, title: "빅데이터가 던지는 도전적인 철학적 문제들에 대한 고찰",                           author: "이중원",        citations: 18, perspective: { name: "철학·이론",         color: "#e11d48" }, tags: ["빅데이터", "기술철학", "데이터윤리"] },
    { rank: 8,  year: 2016, title: "혐오발언, 혐오감, 타자로서 이웃",                                                author: "임옥희",        citations: 16, perspective: { name: "사회·공동체",       color: "#d97706" }, tags: ["혐오발언", "타자성", "페미니즘"] },
    { rank: 9,  year: 2009, title: "도시민의 문화자본과 문화적 취향분화 — 관람형 여가소비를 중심으로",               author: "이승일; 장윤정", citations: 16, perspective: { name: "사회·공동체",       color: "#d97706" }, tags: ["문화자본", "부르디외", "여가소비"] },
    { rank: 10, year: 2014, title: "산업유산 활용 사례를 통해 본 인문학적 도시재생 방향 모색",                       author: "김소라; 이병민", citations: 16, perspective: { name: "공간·역사·장소", color: "#059669" }, tags: ["산업유산", "도시재생", "하이라인"] },
  ],
  regionData: [
    { id: "seoul", group: "서울", provinces: ["서울특별시"], count: 306, cit: 3.8, char: "이론+정책 복합 (초집중)", tags: ["기본소득", "기억", "장소성"] },
    { id: "gyeongi", group: "경기/인천", provinces: ["경기도", "인천광역시"], count: 26, cit: 4.0, char: "현상학적 접근", tags: ["생활세계", "생활도시", "이동성"] },
    { id: "daejeon", group: "대전/충청", provinces: ["대전광역시", "세종특별자치시", "충청남도", "충청북도"], count: 22, cit: 3.0, char: "일상·사회 현상", tags: ["MZ세대", "러닝크루", "코로나19"] },
    { id: "busan", group: "부산/경남", provinces: ["부산광역시", "울산광역시", "경상남도"], count: 18, cit: 1.7, char: "정책+역사", tags: ["인문도시지원사업", "부마항쟁"] },
    { id: "gwangju", group: "광주/전라", provinces: ["광주광역시", "전라남도", "전라북도"], count: 16, cit: 2.8, char: "공간+정책", tags: ["인문도시", "정체성", "벤야민"] },
    { id: "gangwon", group: "강원", provinces: ["강원도"], count: 9, cit: 3.0, char: "공동체+생태", tags: ["커먼즈", "공공성", "경계동물"] },
    { id: "daegu", group: "대구/경북", provinces: ["대구광역시", "경상북도"], count: 6, cit: 4.7, char: "역사보존 (인용 최상위)", tags: ["도시유산", "도시사", "가든시티"] },
    { id: "jeju", group: "제주", provinces: ["제주특별자치도"], count: 4, cit: 0.8, char: "이동·이주 테마", tags: ["모빌리티", "이주", "포스트모던"] }
  ],
  globalData: [
    { country: "중국", count: 10 },
    { country: "일본", count: 10 },
    { country: "미국", count: 7 },
    { country: "유럽", count: 7 },
    { country: "기타", count: 3 }
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
  document.querySelectorAll('.kpi-item-value[data-target]').forEach((el, i) => {
    const target = parseInt(el.dataset.target, 10);
    setTimeout(() => animateCounter(el, target), i * 80);
  });
}

/* ── Chart.js 공통 설정 ── */
Chart.defaults.font.family = "'Pretendard', 'Inter', system-ui, sans-serif";
Chart.defaults.color = '#64748b';

const gridColor = 'rgba(15,23,42,0.06)';
const tickColor = '#94a3b8';

/* ── 2계층: 연도별 막대 + 추이선 (mixed chart) ── */
function initTrendChart() {
  const ctx = document.getElementById('chart-trend').getContext('2d');
  const labels = DATA.yearTrend.map(d => String(d.year));
  const values = DATA.yearTrend.map(d => d.count);

  // 막대 강조 색상
  const maxVal = Math.max(...values);
  const bgColors = values.map((v, i) => {
    if (v === maxVal) return 'rgba(37,99,235,0.82)';
    if (labels[i] === '2016' || labels[i] === '2020') return 'rgba(37,99,235,0.48)';
    return 'rgba(59,130,246,0.22)';
  });

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          type: 'bar',
          label: '논문 수',
          data: values,
          backgroundColor: bgColors,
          borderWidth: 0,
          borderRadius: 4,
          borderSkipped: false,
          order: 2,
        },
        {
          type: 'line',
          label: '추이선',
          data: values,
          borderColor: '#1d4ed8',
          borderWidth: 2,
          pointRadius: values.map(v => v === maxVal ? 6 : 3),
          pointBackgroundColor: values.map(v => v === maxVal ? '#1d4ed8' : '#fff'),
          pointBorderColor: '#1d4ed8',
          pointBorderWidth: 2,
          pointHoverRadius: 6,
          fill: false,
          tension: 0,
          order: 1,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          display: true,
          position: 'top',
          align: 'end',
          labels: {
            color: '#64748b',
            font: { size: 10 },
            boxWidth: 12,
            boxHeight: 8,
            borderRadius: 2,
            useBorderRadius: true,
            padding: 12,
          }
        },
        tooltip: {
          backgroundColor: '#ffffff',
          borderColor: 'rgba(37,99,235,0.2)',
          borderWidth: 1,
          titleColor: '#0f172a',
          bodyColor: '#334155',
          padding: 10,
          callbacks: {
            title: items => `${items[0].label}년`,
            label: item => item.datasetIndex === 0
              ? ` 논문 ${item.parsed.y}편`
              : null
          },
          filter: item => item.datasetIndex === 0
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
          backgroundColor: '#ffffff',
          borderColor: 'rgba(37,99,235,0.2)',
          borderWidth: 1,
          titleColor: '#0f172a',
          bodyColor: '#334155',
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
  const perspNames = ["철학·이론", "문학·예술·문화", "공간·역사·장소", "사회·공동체"];
  const colors = ["#e11d48", "#2563eb", "#059669", "#d97706"];
  // 색약자를 위한 고유 심볼 형태 적용 (원, 둥근 사각형, 마름모, 삼각형)
  const styles = ['circle', 'rectRounded', 'rectRot', 'triangle'];
  // 도형 형태에 따른 픽셀 면적 차이(착시 현상)를 상쇄하기 위한 가중치 반경 배분
  const radii = [4, 5, 5.5, 6.5];
  const hoverRadii = [6, 7, 7.5, 8.5];

  const datasets = perspNames.map((name, i) => ({
    label: name,
    data: DATA.perspectiveTrend.map(d => d[name]),
    backgroundColor: colors[i] + '22',
    borderColor: colors[i],
    borderWidth: 2,
    fill: true,
    tension: 0.4,
    pointRadius: radii[i],
    pointHoverRadius: hoverRadii[i],
    pointStyle: styles[i], // 각 데이터셋마다 고유한 심볼 반환
    pointBackgroundColor: colors[i],
    pointBorderColor: '#ffffff',
    pointBorderWidth: 2,
  }));

  const chart = new Chart(ctx, {
    type: 'line',
    data: { labels: periods, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }, // HTML 범례로 대체
        tooltip: {
          mode: 'index',
          intersect: false,
          backgroundColor: '#ffffff',
          borderColor: 'rgba(37,99,235,0.2)',
          borderWidth: 1,
          titleColor: '#0f172a',
          bodyColor: '#334155',
          padding: 10,
          callbacks: {
            label: item => ` ${item.dataset.label}: ${item.parsed.y}%`
          }
        }
      },
      scales: {
        x: {
          grid: { color: gridColor, drawTicks: false },
          ticks: { color: tickColor, font: { size: 10 }, padding: 6 },
          border: { display: false }
        },
        y: {
          grid: { color: gridColor, drawTicks: false },
          ticks: { color: tickColor, font: { size: 10 }, stepSize: 10, padding: 6, callback: v => v + '%' },
          border: { display: false },
          min: 0, max: 50
        }
      },
      animation: { duration: 1000, easing: 'easeOutQuart' }
    }
  });

  // HTML 범례 주입 (소제목과 같은 행에 표시)
  const legendEl = document.getElementById('stacked-legend-html');
  if (legendEl) {
    legendEl.innerHTML = perspNames.map((name, i) => {
      const svgStyle = `width:10px; height:10px; display:inline-block; vertical-align:middle;`;
      const symbolMap = {
        'circle': `<svg style="${svgStyle}"><circle cx="5" cy="5" r="4" fill="${colors[i]}"/></svg>`,
        'rectRounded': `<svg style="${svgStyle}"><rect x="1" y="1" width="8" height="8" rx="2" fill="${colors[i]}"/></svg>`,
        'rectRot': `<svg style="${svgStyle}"><polygon points="5,1 9,5 5,9 1,5" fill="${colors[i]}"/></svg>`,
        'triangle': `<svg style="${svgStyle}"><polygon points="5,1 9,9 1,9" fill="${colors[i]}"/></svg>`
      };
      return `<span class="stacked-legend-item">${symbolMap[styles[i]]}&nbsp;${name}</span>`;
    }).join('');
  }
}

/* ── 4계층: Top 10 테이블 ── */
function initTop10Table() {
  const tbody = document.getElementById('top10-body');
  const maxCit = DATA.top10[0].citations;

  DATA.top10.forEach(paper => {
    const rankClass = paper.rank <= 3 ? `rank-${paper.rank}` : 'rank-other';
    const barWidth = Math.round(paper.citations / maxCit * 100);

    // 관점 배지 HTML
    const badge = paper.perspective
      ? `<span class="persp-badge" style="background:${paper.perspective.color}18; color:${paper.perspective.color}; border:1px solid ${paper.perspective.color}44;">${paper.perspective.name}</span>`
      : '';

    // 키워드 태그 HTML
    const tags = paper.tags
      ? paper.tags.map(t => `<span class="paper-tag">#${t}</span>`).join('')
      : '';

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><span class="rank-badge ${rankClass}">${paper.rank}</span></td>
      <td class="year-cell">${paper.year}</td>
      <td class="title-cell">
        <div class="title-main">${paper.title}</div>
        <div class="title-meta">${badge}${tags}</div>
      </td>
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

/* ── ECharts 지도 차트 (패널 A) ── */
function initMapChart() {
  const chartDom = document.getElementById('map-container');
  if (!chartDom) return;
  const myChart = echarts.init(chartDom);
  try {
    // korea.js를 통해 전역 변수 koreaGeoData로 지도 데이터가 로드됨 (CORS 문제 우회)
    echarts.registerMap('korea', koreaGeoData);

    let mapData = [];
    DATA.regionData.forEach(region => {
      region.provinces.forEach(prov => {
        mapData.push({
          name: prov,
          value: region.count,
          regionInfo: region
        });
      });
    });

    const option = {
      tooltip: {
        show: false // HTML 상시 카드를 사용하므로 기본 ECharts 툴팁 완전 비활성화
      },
      visualMap: {
        show: false,
        type: 'piecewise',
        left: 'right',
        bottom: 10,
        pieces: [
          { min: 100, label: '100+ (서울)' },
          { min: 20, max: 99, label: '20~99편' },
          { min: 15, max: 19, label: '15~19편' },
          { min: 6, max: 14, label: '6~14편' },
          { min: 1, max: 5, label: '1~5편 (제주 등)' }
        ],
        inRange: {
          color: ['#bae6fd', '#7dd3fc', '#0ea5e9', '#0284c7', '#1e3a8a']
        },
        itemWidth: 12,
        itemHeight: 12,
        textStyle: { fontSize: 10, color: '#64748b' }
      },
      series: [
        {
          name: '지역별 퍼블리케이션',
          type: 'map',
          map: 'korea',
          roam: false,
          top: 10, bottom: 10,
          label: { show: false },
          itemStyle: {
            borderColor: 'rgba(255,255,255,0.8)',
            borderWidth: 0.8
          },
          emphasis: {
            itemStyle: {
              areaColor: '#fcd34d',
              shadowOffsetX: 0, shadowOffsetY: 0, shadowBlur: 10,
              borderWidth: 1.2, shadowColor: 'rgba(0, 0, 0, 0.4)'
            },
            label: { show: false }
          },
          select: { disabled: true },
          data: mapData
        }
      ]
    };
    myChart.setOption(option);

    // 💡 1. 8개의 HTML 정보 카드를 지도 주변에 상시 렌더링
    renderMapCards(myChart);

    const mapCardsContainer = document.getElementById('map-cards-container');

    // 💡 2. 지도 위 행정구역 마우스 오버 시 연동 하이라이트
    myChart.on('mouseover', function (params) {
      if (params.data && params.data.regionInfo) {
        // ECharts 지도 권역 하이라이트
        myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          name: params.data.regionInfo.provinces
        });

        // HTML 카드 하이라이트 동기화
        if (mapCardsContainer) {
          const id = params.data.regionInfo.id;
          const targetCard = mapCardsContainer.querySelector(`.region-card[data-id="${id}"]`);

          if (targetCard) {
            targetCard.classList.add('highlight');
            // 호버되지 않은 나머지 모든 카드는 흐리게 처리 (dimmed)
            mapCardsContainer.querySelectorAll('.region-card').forEach(card => {
              if (card !== targetCard) card.classList.add('dimmed');
            });
          }
        }
      }
    });

    myChart.on('mouseout', function (params) {
      if (params.data && params.data.regionInfo) {
        // ECharts 하이라이트 해제
        myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          name: params.data.regionInfo.provinces
        });

        // 모든 HTML 카드의 하이라이트 및 Dimmed 상태 원상 복구
        if (mapCardsContainer) {
          mapCardsContainer.querySelectorAll('.region-card').forEach(card => {
            card.classList.remove('highlight', 'dimmed');
          });
        }
      }
    });

    window.addEventListener('resize', () => myChart.resize());
  } catch (e) {
    console.error("지도를 로드할 수 없습니다:", e);
  }
}

/* ── HTML 기반 퍼시스턴트(상시 노출) 정보 카드 렌더링 ── */
function renderMapCards(myChart) {
  const container = document.getElementById('map-cards-container');
  if (!container) return;
  container.innerHTML = '';

  // 권역별 하드코딩된 레이아웃 슬롯 (앱 솔루트 좌표)
  // 지도 바다(빈 공간) 영역을 영리하게 활용
  const posMap = {
    'seoul': { left: '3%', top: '3%' },
    'gyeongi': { left: '3%', top: '21%' },
    'daejeon': { left: '3%', top: '39%' },
    'gwangju': { left: '3%', top: '57%' },
    'jeju': { left: '3%', top: '75%' },

    'gangwon': { right: '3%', top: '3%' },   /* 서울과 윗 선 일치 */
    'daegu': { right: '3%', top: '23%' },
    'busan': { right: '3%', top: '43%' }
  };

  DATA.regionData.forEach(info => {
    const pos = posMap[info.id];
    if (!pos) return;

    let tagsHtml = info.tags.map(t => `<span style="display:inline-block; margin-right:3px; margin-bottom:3px; padding:2px 5px; background:#eff6ff; color:#2563eb; border-radius:100px; font-size:10px; font-weight:600;">#${t}</span>`).join('');

    const cardEl = document.createElement('div');
    // pos.left = 좌측 열, pos.right = 우측 열 → 너비 클래스 구분
    cardEl.className = `region-card ${pos.left ? 'card-left' : 'card-right'}`;
    cardEl.dataset.id = info.id;
    if (pos.left) cardEl.style.left = pos.left;
    if (pos.right) cardEl.style.right = pos.right;
    if (pos.top) cardEl.style.top = pos.top;

    cardEl.innerHTML = `
      <div style="max-width: 220px; line-height: 1.3;">
        <!-- 1행: 지역명 + 논문수 -->
        <div style="display:flex; align-items:baseline; gap:6px; margin-bottom:3px;">
          <span style="font-weight: 700; font-size: 13px; color: #0f172a;">${info.group}</span>
          <span style="font-weight: 800; font-size: 13px; color: #2563eb;">${info.count}<span style="font-size:10px; font-weight:600; margin-left:1px;">편</span></span>
        </div>
        <!-- 2행: 연구방향성 -->
        <div style="font-size: 10.5px; color: #ea580c; font-weight: 600; margin-bottom:4px;">💡 ${info.char.replace(' (인용 최상위)', '').replace(' (초집중)', '')}</div>
        <!-- 3행: 태그 -->
        <div style="display:flex; flex-wrap:wrap;">${tagsHtml}</div>
      </div>
    `;

    // 💡 카드에 마우스 오버 시 역으로 지도 구역 피드백 (양방향 연동)
    cardEl.addEventListener('mouseenter', () => {
      // 본인 하이라이트 & 남들 흐리게
      cardEl.classList.add('highlight');
      container.querySelectorAll('.region-card').forEach(other => {
        if (other !== cardEl) other.classList.add('dimmed');
      });
      // 지도 하이라이트
      myChart.dispatchAction({ type: 'highlight', seriesIndex: 0, name: info.provinces });
    });

    cardEl.addEventListener('mouseleave', () => {
      // 상태 복구
      container.querySelectorAll('.region-card').forEach(card => card.classList.remove('highlight', 'dimmed'));
      myChart.dispatchAction({ type: 'downplay', seriesIndex: 0, name: info.provinces });
    });

    container.appendChild(cardEl);
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

/* ── 국외 연구 플로팅 패널 초기화 ── */
function initGlobalPanel() {
  const container = document.getElementById('global-bars-container');
  const card = document.querySelector('.global-floating-card');
  if (!container || !card) return;

  let html = '';
  const maxCount = 10;

  DATA.globalData.forEach(item => {
    const widthPct = (item.count / maxCount) * 100;
    html += `
      <div class="gf-bar-row">
        <div class="gf-bar-label">${item.country}</div>
        <div class="gf-bar-track">
          <div class="gf-bar-fill" style="width: 0%" data-width="${widthPct}%"></div>
        </div>
        <div class="gf-bar-value">${item.count}</div>
      </div>
    `;
  });

  container.innerHTML = html;

  // 초기 렌더링 시 게이지 차오르는 애니메이션 즉시 발동
  setTimeout(() => {
    container.querySelectorAll('.gf-bar-fill').forEach((el, i) => {
      setTimeout(() => {
        el.style.width = el.getAttribute('data-width');
      }, i * 50);
    });
  }, 100);
}

/* ── Init ── */
function init() {
  initKPI();
  initTrendChart();
  initDonutChart();
  initStackedChart();
  initMapChart();
  initGlobalPanel();
  initTop10Table();
  initBarAnimations();
}

document.addEventListener('DOMContentLoaded', init);
