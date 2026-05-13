/* ═══════════════════════════════════════════
   도시인문학 연구 대시보드 — app.js
   ═══════════════════════════════════════════ */

/* ── 데이터 ── */
const DATA = {
  yearTrend: [
    { year: 2003, count:  1 }, { year: 2004, count:  0 }, { year: 2005, count:  0 },
    { year: 2006, count:  2 }, { year: 2007, count:  0 }, { year: 2008, count:  1 },
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
    { rank: 1,  year: 2011, title: "미셸 푸코의 '헤테로토피아' — 초기 공간 개념에 대한 비판적 검토",                  author: "허경",          citations: 68, perspective: { name: "철학·이론",         color: "#e11d48" }, tags: ["헤테로토피아", "공간 이론", "문화지리학"] },
    { rank: 2,  year: 2014, title: "르페브르의 변증법적 공간 이론과 공간정치 — 「공간의 생산」을 중심으로",           author: "신승원",        citations: 28, perspective: { name: "철학·이론",         color: "#e11d48" }, tags: ["공간의 생산", "변증법", "공간정치"] },
    { rank: 3,  year: 2020, title: "한국 SF와 페미니즘의 동시대적 조우 — 김보영·듀나 작품론",                        author: "강은교; 김은주", citations: 24, perspective: { name: "문학·예술·문화",  color: "#2563eb" }, tags: ["페미니즘 SF", "잠재성", "동시대성"] },
    { rank: 4,  year: 2020, title: "한국 웹소설 판타지의 형식적 갱신과 사회적 성찰 — 책빙의물을 중심으로",           author: "유인혁",        citations: 22, perspective: { name: "문학·예술·문화",  color: "#2563eb" }, tags: ["웹소설", "장르 교차", "메타서사"] },
    { rank: 5,  year: 2014, title: "창조도시 논의의 비판적 성찰과 과제",                                             author: "남기범",        citations: 19, perspective: { name: "공간·역사·장소", color: "#059669" }, tags: ["창조도시 비판", "도시정책", "창조성"] },
    { rank: 6,  year: 2012, title: "문화도시의 개념과 문화도시화를 위한 서울시 전략의 반성적 고찰",                    author: "라도삼",        citations: 18, perspective: { name: "문학·예술·문화",  color: "#2563eb" }, tags: ["문화도시", "서울시 전략", "도시문화"] },
    { rank: 7,  year: 2017, title: "빅데이터가 던지는 도전적인 철학적 문제들에 대한 고찰",                           author: "이중원",        citations: 18, perspective: { name: "철학·이론",         color: "#e11d48" }, tags: ["빅데이터", "정보 존재론", "데이터 윤리"] },
    { rank: 8,  year: 2010, title: "발터 벤야민과 도시경험 — 벤야민의 도시인문학 방법론에 대한 고찰",               author: "홍준기",        citations: 18, perspective: { name: "철학·이론",         color: "#e11d48" }, tags: ["아우라 상실", "충격 경험", "도시인문학 방법론"] },
    { rank: 9,  year: 2020, title: "언택트 시대 넷플릭스와 영화: 퀄리티 콘텐츠로서의 영화와 극장의 의미 변화",           author: "홍남희",        citations: 17, perspective: { name: "문학·예술·문화",  color: "#2563eb" }, tags: ["넷플릭스", "언택트", "플랫폼"] },
    { rank: 10, year: 2014, title: "산업유산 활용 사례를 통해 본 인문학적 도시재생 방향 모색",                       author: "김소라; 이병민", citations: 16, perspective: { name: "공간·역사·장소", color: "#059669" }, tags: ["산업유산", "도시재생", "산책자(플라뇌르)"] },
  ],
  regionData: [
    { id: "seoul", group: "서울", provinces: ["서울특별시"], count: 316, cit: 3.8, char: "이론+정책 복합 (초집중)", tags: ["기본소득", "도시재생", "박완서"] },
    { id: "gyeongi", group: "경기/인천", provinces: ["경기도", "인천광역시"], count: 22, cit: 4.0, char: "현상학·텍스트 중심", tags: ["생활세계", "텍스트", "생활권계획"] },
    { id: "daejeon", group: "대전/충청", provinces: ["대전광역시", "세종특별자치시", "충청남도", "충청북도"], count: 19, cit: 3.0, char: "일상·사회 현상", tags: ["MZ세대", "러닝크루", "코로나19"] },
    { id: "busan", group: "부산/경남", provinces: ["부산광역시", "울산광역시", "경상남도"], count: 18, cit: 1.7, char: "지역성·정책", tags: ["지역성", "인문도시지원사업", "부마항쟁"] },
    { id: "gwangju", group: "광주/전라", provinces: ["광주광역시", "전라남도", "전라북도"], count: 16, cit: 2.8, char: "정체성·공간 담론", tags: ["인문도시", "정체성", "벤야민"] },
    { id: "gangwon", group: "강원", provinces: ["강원도"], count: 9, cit: 3.0, char: "공동체·전후 문학", tags: ["커먼즈", "공공성", "전후 문학"] },
    { id: "daegu", group: "대구/경북", provinces: ["대구광역시", "경상북도"], count: 5, cit: 4.7, char: "도시사·유산 보존", tags: ["도시유산", "도시사", "가든 시티"] },
    { id: "jeju", group: "제주", provinces: ["제주특별자치도"], count: 4, cit: 0.8, char: "이동·이주 테마", tags: ["모빌리티", "이주", "포스트 팬데믹"] }
  ],
  globalData: [
    { country: "일본", count: 10 },
    { country: "중국", count: 9 },
    { country: "미국", count: 4 },
    { country: "독일", count: 3 },
    { country: "영국", count: 2 },
    { country: "기타", count: 6 }
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
        },
        annotation: {
          annotations: {
            line2009: {
              type: 'line',
              scaleID: 'x',
              value: '2009',
              borderColor: 'rgba(37,99,235,0.22)',
              borderWidth: 1,
              borderDash: [4, 5],
              label: {
                display: true,
                content: '학술지(도시인문학연구) 창간',
                position: 'start',
                yAdjust: 6,
                backgroundColor: 'rgba(255,255,255,0.92)',
                color: 'rgba(37,99,235,0.75)',
                font: { size: 9, weight: '500' },
                padding: { x: 5, y: 3 },
                borderRadius: 3,
                borderWidth: 0
              }
            },
            line2014: {
              type: 'line',
              scaleID: 'x',
              value: '2014',
              borderColor: 'rgba(5,150,105,0.22)',
              borderWidth: 1,
              borderDash: [4, 5],
              label: {
                display: true,
                content: '인문도시지원사업 시작',
                position: 'start',
                yAdjust: 6,
                backgroundColor: 'rgba(255,255,255,0.92)',
                color: 'rgba(5,150,105,0.75)',
                font: { size: 9, weight: '500' },
                padding: { x: 5, y: 3 },
                borderRadius: 3,
                borderWidth: 0
              }
            },
            line2019: {
              type: 'line',
              scaleID: 'x',
              value: '2019',
              borderColor: 'rgba(220,38,38,0.22)',
              borderWidth: 1,
              borderDash: [4, 5],
              label: {
                display: true,
                content: 'COVID-19 팬데믹',
                position: 'start',
                yAdjust: 6,
                backgroundColor: 'rgba(255,255,255,0.92)',
                color: 'rgba(220,38,38,0.75)',
                font: { size: 9, weight: '500' },
                padding: { x: 5, y: 3 },
                borderRadius: 3,
                borderWidth: 0
              }
            }
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
          max: 52
        }
      },
      animation: { duration: 1000, easing: 'easeOutQuart' }
    }
  });
}

/* ── 3계층: 도넛 차트 ── */
function initDonutChart() {
  const ctx = document.getElementById('chart-donut').getContext('2d');
  const pctEls = document.querySelectorAll('.persp-pct');
  const origPcts = DATA.perspectives.map(d => d.pct + '%');

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
        tooltip: { enabled: false }   // 내장 툴팁 완전 비활성화
      },
      onHover: (evt, elements) => {
        if (elements.length > 0) {
          const i = elements[0].index;
          pctEls.forEach((el, j) => {
            if (j === i) {
              el.textContent = DATA.perspectives[i].count + '편';
              el.style.color = DATA.perspectives[i].color;
            } else {
              el.textContent = origPcts[j];
              el.style.color = '';
            }
          });
        } else {
          pctEls.forEach((el, j) => {
            el.textContent = origPcts[j];
            el.style.color = '';
          });
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
  // 색약자를 위한 색상+모양 모두 상이하게
  const styles = ['circle', 'rectRounded', 'rectRot', 'triangle'];
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
  initCoreAuthorList();
}

/* ══════════════════════════════════════════
   화면 전환 (홈 ↔ 상세 뷰)
══════════════════════════════════════════ */
function showDetailView(viewId) {
  document.getElementById('home-header').style.display = 'none';
  document.getElementById('home-layout').style.display = 'none';

  const detailEl = document.getElementById('detail-' + viewId);
  if (detailEl) {
    detailEl.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (viewId === 'kpi') { initEcosystemDonut(); initAuthorBarTable(); }
  }
}

function hideDetailView() {
  document.querySelectorAll('.detail-view').forEach(el => el.classList.add('hidden'));
  document.getElementById('home-header').style.display = '';
  document.getElementById('home-layout').style.display = '';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ══════════════════════════════════════════
   KPI 상세 | 연구 생태계 도넛 차트
══════════════════════════════════════════ */
const CORE_AUTHORS = [
  { name: '홍남희',  count: 18, firstAuthor: 15 },
  { name: '유인혁',  count: 16, firstAuthor: 16 },
  { name: '홍용진',  count: 15, firstAuthor: 15 },
  { name: '김은주',  count: 14, firstAuthor: 13 },
  { name: '곽노완',  count: 14, firstAuthor: 14 },
  { name: '김태연',  count: 11, firstAuthor: 10 },
  { name: '정희원',  count: 11, firstAuthor: 11 },
  { name: '오창룡',  count:  7, firstAuthor:  7 },
  { name: '노영희',  count:  6, firstAuthor:  5 },
  { name: '심광현',  count:  5, firstAuthor:  5 },
];

let ecosystemDonutChart = null;

function initCoreAuthorList() {
  const listEl = document.getElementById('cta-list');
  if (!listEl) return;
  listEl.innerHTML = CORE_AUTHORS.map(a =>
    `<div class="cta-chip">
      <span>${a.name}</span>
      <span class="cta-count">${a.count}편</span>
    </div>`
  ).join('');
}

function initAuthorBarTable() {
  const el = document.getElementById('author-bar-table');
  if (!el) return;
  el.innerHTML = CORE_AUTHORS.map((a, i) => {
    const pct = Math.round((a.firstAuthor / a.count) * 100);
    const coAuthor = a.count - a.firstAuthor;
    return `
      <div class="abt-row">
        <div class="abt-rank">${i + 1}</div>
        <div class="abt-name">${a.name}</div>
        <div class="abt-total">${a.count}편</div>
        <div class="abt-bar-wrap">
          <div class="abt-bar-track">
            <div class="abt-bar-fill" data-pct="${pct}" style="width:0%"></div>
          </div>
        </div>
        <div class="abt-pct ${pct === 100 ? 'abt-pct-full' : ''}">${pct}%</div>
        <div class="abt-detail">
          <span class="abt-first">제1저자 ${a.firstAuthor}편</span>
          ${coAuthor > 0 ? `<span class="abt-co">공저 ${coAuthor}편</span>` : ''}
        </div>
      </div>`;
  }).join('');

  // 애니메이션: 약간의 딜레이 후 막대 너비 적용
  requestAnimationFrame(() => {
    el.querySelectorAll('.abt-bar-fill').forEach((bar, i) => {
      setTimeout(() => {
        bar.style.width = bar.dataset.pct + '%';
      }, i * 60);
    });
  });
}

function initEcosystemDonut() {
  const canvas = document.getElementById('chart-ecosystem-donut');
  if (!canvas) return;

  // 이미 그려진 차트가 있으면 파괴 후 재생성
  if (ecosystemDonutChart) {
    ecosystemDonutChart.destroy();
    ecosystemDonutChart = null;
  }

  const ctx = canvas.getContext('2d');
  ecosystemDonutChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['1회성 연구자 (78.7%)', '2회성 연구자 (9.7%)', '핵심 코어 연구자 (11.7%)'],
      datasets: [{
        data: [236, 29, 35],
        backgroundColor: ['#cbd5e1', '#93c5fd', '#2563eb'],
        hoverBackgroundColor: ['#94a3b8', '#60a5fa', '#1d4ed8'],
        borderWidth: 3,
        borderColor: '#ffffff',
        hoverOffset: 10
      }]
    },
    options: {
      cutout: '68%',
      responsive: true,
      maintainAspectRatio: true,
      animation: { animateRotate: true, duration: 900 },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function(context) {
              const idx = context.dataIndex;
              if (idx === 2) {
                // 핵심 코어 슬라이스: 상위 연구자 목록 노출
                const lines = ['── 핵심 코어 연구자 (3편 이상) ──'];
                CORE_AUTHORS.slice(0, 5).forEach(a => {
                  lines.push(`  ${a.name}: ${a.count}편`);
                });
                lines.push('  … 외 30명');
                return lines;
              }
              return ` ${context.label}: ${context.raw}명`;
            }
          },
          bodyFont: { family: "'Pretendard', 'Inter', sans-serif", size: 12 },
          padding: 12,
          boxPadding: 4
        }
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', init);
