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
    {name:"문화·매체", count:160, pct:29, color:"#2563eb"},
    {name:"정책·사회", count:139, pct:25, color:"#d97706"},
    {name:"공간·장소", count:131, pct:24, color:"#059669"},
    {name:"철학·이론", count:130, pct:23, color:"#e11d48"}
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
  ],
  regionData: [
    { id: "seoul",    group: "서울",       provinces: ["서울특별시"], count: 306, cit: 3.8, char: "이론+정책 복합 (초집중)", tags: ["기본소득","기억","장소성","도시인문학"] },
    { id: "gyeongi",  group: "경기/인천",  provinces: ["경기도", "인천광역시"], count: 26, cit: 4.0, char: "현상학적 접근", tags: ["생활세계","생활도시","도시인문학"] },
    { id: "daejeon",  group: "대전/충청",  provinces: ["대전광역시", "세종특별자치시", "충청남도", "충청북도"], count: 22, cit: 3.0, char: "일상·사회 현상 중심", tags: ["MZ세대","러닝크루","코로나19"] },
    { id: "busan",    group: "부산/경남",  provinces: ["부산광역시", "울산광역시", "경상남도"], count: 18, cit: 1.7, char: "정책+역사 중심", tags: ["인문도시지원사업","부마항쟁"] },
    { id: "gwangju",  group: "광주/전라",  provinces: ["광주광역시", "전라남도", "전라북도"], count: 16, cit: 2.8, char: "공간+정책", tags: ["인문도시","정체성","벤야민"] },
    { id: "gangwon",  group: "강원",       provinces: ["강원도"], count: 9, cit: 3.0, char: "공동체+생태", tags: ["커먼즈","공공성","경계동물"] },
    { id: "daegu",    group: "대구/경북",  provinces: ["대구광역시", "경상북도"], count: 6, cit: 4.7, char: "역사보존 중심 (인용 최상위)", tags: ["도시유산","도시사","가든시티"] },
    { id: "jeju",     group: "제주",       provinces: ["제주특별자치도"], count: 4, cit: 0.8, char: "이동·이주 테마", tags: ["모빌리티","이주","포스트모던"] }
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
const tickColor  = '#94a3b8';

/* ── 2계층: 연도별 막대 + 추이선 (mixed chart) ── */
function initTrendChart() {
  const ctx = document.getElementById('chart-trend').getContext('2d');
  const labels = DATA.yearTrend.map(d => String(d.year));
  const values = DATA.yearTrend.map(d => d.count);

  // 막대 강조 색상
  const maxVal = Math.max(...values);
  const bgColors = values.map((v, i) => {
    if (v === maxVal)                                 return 'rgba(37,99,235,0.82)';
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
  const perspNames = ["문화·매체","정책·사회","공간·장소","철학·이론"];
  const colors = ["#2563eb","#d97706","#059669","#e11d48"];
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
            color: '#64748b',
            font: { size: 10 },
            usePointStyle: true, // 범례에도 차트와 동일한 심볼 형태 적용
            boxWidth: 8,
            padding: 10
          }
        },
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
        trigger: 'item',
        className: 'map-tooltip-custom',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderColor: '#e2e8f0',
        padding: 8,
        textStyle: { color: '#334155' },
        transitionDuration: 0.2, // 부드러운 위치 전환 효과
        position: function(point, params, dom, rect, size) {
          if (!params.data || !params.data.regionInfo) return point;
          const id = params.data.regionInfo.id;
          
          // 권역별 하드코딩된 레이아웃 슬롯 (백분율 또는 픽셀)
          const posMap = {
            'seoul': { left: '3%', top: '3%' },
            'gyeongi': { left: '3%', top: '21%' },
            'daejeon': { left: '3%', top: '39%' },
            'gwangju': { left: '3%', top: '57%' },
            'jeju': { left: '3%', top: '75%' },
            
            'gangwon': { right: '3%', top: '10%' },
            'daegu': { right: '3%', top: '35%' },
            'busan': { right: '3%', top: '60%' }
          };
          return posMap[id] || point;
        },
        formatter: function(params) {
          if (!params.data) return params.name;
          const info = params.data.regionInfo;
          // 태그의 상하단 여백 최소화 및 폰트 10px로 축소
          let tagsHtml = info.tags.map(t => `<span style="display:inline-block; margin-right:3px; margin-bottom:3px; padding:2px 5px; background:#eff6ff; color:#2563eb; border-radius:100px; font-size:10px; font-weight:600;">#${t}</span>`).join('');
          
          // 불필요한 줄바꿈을 줄인 가로 중심의 컴팩트 레이아웃
          return `
            <div style="min-width: 170px; max-width: 220px; line-height: 1.3;">
              <div style="display:flex; align-items:baseline; margin-bottom: 3px;">
                <span style="font-weight: 700; font-size: 13px; color: #0f172a; margin-right: 8px;">${info.group}</span>
                <span style="font-weight: 800; font-size: 14px; color: #2563eb;">${info.count}<span style="font-size:10px; font-weight:600; margin-left:1px;">편</span></span>
              </div>
              <div style="font-size: 10.5px; margin-bottom: 5px; display: flex; gap: 5px; align-items: center; letter-spacing: -0.3px;">
                <span style="color: #ea580c; font-weight: 600;">💡 ${info.char.replace(' (인용 최상위)','').replace(' (초집중)','')}</span>
                <span style="color: #cbd5e1;">|</span>
                <span style="color: #64748b;">인용 ${info.cit}회</span>
              </div>
              <div style="display:flex; flex-wrap:wrap;">${tagsHtml}</div>
            </div>
          `;
        }
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

    // 권역(광주/전라 등 다중 행정구역) 동시 하이라이팅 연동
    myChart.on('mouseover', function(params) {
      if (params.data && params.data.regionInfo) {
        myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          name: params.data.regionInfo.provinces
        });
      }
    });

    myChart.on('mouseout', function(params) {
      if (params.data && params.data.regionInfo) {
        myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          name: params.data.regionInfo.provinces
        });
      }
    });

    window.addEventListener('resize', () => myChart.resize());
  } catch(e) {
    console.error("지도를 로드할 수 없습니다:", e);
  }
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
