import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowLeft, ArrowRight, ExternalLink, Mail, Phone, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BorderGlow from './BorderGlow';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

const parts = [
  {
    key: 'about',
    title: 'ABOUT ME',
    kicker: 'Content Operator / Creative Planner',
    image: '/assets/about-cover-new.jpg',
    copy: '擅长捕捉情绪颗粒度\n把用户洞察、内容表达与增长目标放进同一个创意系统里'
  },
  {
    key: 'work',
    title: 'WORK',
    kicker: 'Strategy / Operation / Video',
    image: '/assets/work-cover.jpg',
    copy: '从营销策划到新媒体运营  再到短片拍摄剪辑\n把想法落成可传播、可复盘的作品'
  }
];

const timeline = [
  {
    date: '2026.05 — 至今',
    company: '北京市商汤科技开发有限公司',
    role: 'AI 产品增长运营',
    city: '北京',
    points: [
      {
        label: '官方账号内容运营',
        desc: '独立负责抖音、小红书双平台官号日常运营，涵盖选题策划、内容创作、发布全流程，具备图文排版、视频剪辑、平面设计等多媒体全栈能力，持续输出高互动内容，有效提升账号粉丝增长与内容曝光。'
      },
      {
        label: '用户洞察与策略支持',
        desc: '通过处理用户反馈、发放问卷、数据整理与用户深度访谈，系统收集用户需求与行为数据，为产品策略与内容方向调整提供决策依据。'
      },
      {
        label: '达人合作与信息流投放优化',
        desc: '负责 KOL 合作全流程（Brief 撰写、达人筛选、商务谈判、选题策划与内容审核），并结合抖音信息流投放特性对素材进行二次剪辑与适配优化（如强化前 3 秒钩子、调整节奏、优化转化引导），显著提升素材跑量能力。'
      }
    ]
  },
  {
    date: '2025.10 — 2026.03',
    company: '上海即果信息技术有限公司（即刻 & 小宇宙）',
    role: '海内外内容运营',
    city: '上海',
    points: [
      {
        label: '海外增长冷启动',
        desc: '负责东南亚、韩国、中国台湾地区 KOL 在 IG、TT 平台合作全流程（包括 Brief 撰写、达人筛选、商务谈判、选题与内容策划、效果复盘），平均 CPM 仅 $1.09；单条素材以 $150 成本撬动 IG 50 万+ 自然曝光，高效带动下载转化，1.5 个月内助推 App 跻身台湾地区苹果商店健康类 TOP 8。'
      },
      {
        label: '沉淀内容增长方法论',
        desc: '基于每轮数据复盘，系统构建高转化内容框架、可复用选题库、竞品素材库与创意方向库，持续追踪市场热门与竞品动态，结合产品特性提炼高潜内容模板；以登录问卷归因和日新增双口径为衡量机制，驱动素材策略持续迭代。'
      },
      {
        label: '策划并执行国内寒假增长专项',
        desc: '针对中学生 / 备考群体与大学生群体实施分层内容策略：前者通过"桌拍"形式实现超低成本广域触达，后者以"假期无痛自律"口播主题完成高意向转化穿透。春节假日期间精准捕获用户需求，驱动产品日均营收环比增长 133%。'
      }
    ]
  },
  {
    date: '2025.06 — 2025.09',
    company: '北京市商汤科技开发有限公司',
    role: 'AI 产品增长运营',
    city: '北京',
    points: [
      {
        label: '用增投放素材自制',
        desc: '独立策划并制作投放素材，围绕产品功能、典型使用场景及用户痛点输出核心创意，并根据投放效果持续优化表达形式、转化话术与素材节奏；其中单条自制素材在巨量引擎投放中带来新增用户 5.2 万，转化成本低于整体均值，成为阶段性核心增长素材。'
      },
      {
        label: '抖音官号运营',
        desc: '负责官方抖音账号运营，围绕"功能科普 + 互动拉新"目标进行内容策划、封面标题优化及发布运营，并通过评论区及私信答疑降低用户理解门槛、引导下载，3 个月实现涨粉 4000+。'
      },
      {
        label: 'KOC 素材审核及信息流投放剪辑',
        desc: '对 KOC 素材覆盖大纲 → 脚本 → 成片三环节进行审核修改，结合抖音信息流特点对 KOC 素材进行二次剪辑，提升素材质量与投放适配度。'
      },
      {
        label: '用户反馈处理 & 需求收集整理',
        desc: '承接用户全周期反馈，沉淀新用户功能适配问题及老用户使用痛点，同步输出给产品 / 研发团队推动功能优化，并将高频反馈反哺至内容选题与素材迭代，持续优化增长计划。'
      }
    ]
  }
];

const skills = [
  { name: 'PS', level: 88 },
  { name: 'PR / 剪映', level: 92 },
  { name: 'Figma / Canva', level: 84 },
  { name: 'AE / AI', level: 76 },
  { name: '3ds Max', level: 58 }
];

const abilities = ['多平台内容运营', '用户增长策略策划', '品牌营销策划', '视频剪辑', '图文排版', '用户洞察', '达人合作', '信息流素材优化'];

const philosophies = [
  {
    num: '01',
    title: '创意的独门秘籍是走进生活里',
    body: '旅行 · 音乐 · 电影 · 手工 · 阅读 — 才是生命良药'
  },
  {
    num: '02',
    title: '擅长捕捉情绪颗粒度',
    body: '擅长捕捉感官细节，淬炼情感浓度，最终呈现细腻高共鸣的产出内容'
  }
];

const traits = ['自驱力强', '想到就立马行动', '即兴创造', '现实主义者'];

const workSections = [
  {
    key: 'strategy',
    title: '营销策划',
    label: 'Strategy',
    description: '从产品特性、用户痛点与传播场景出发，完成品牌策略推导与整合传播方案。',
    image: '/assets/pages/strategy-05.jpg',
    href: 'https://www.yitulu.com/t/pdf/oQWFgVi6',
    cards: ['百岁山营销策划案', '精神贵族觉醒计划', '创意星球学院奖全国级优秀奖'],
    case: {
      brand: '百岁山',
      name: '百岁山营销策划案',
      tagline: '精神贵族觉醒计划',
      award: '创意星球学院奖 · 全国级优秀奖',
      preview: '/assets/pages/ganten-preview.png',
      purpose: [
        { label: '强化品牌形象', desc: '希望通过作品传达出"水中贵族"的品牌形象。' },
        { label: '贵族精神新表达', desc: '希望和青年们一起传播"精神贵族"，探索"精神贵族"的新表达。' }
      ],
      insight: '"贵族"这样的标签给人以距离感——该怎么一步步循序渐进，推到"精神贵族"？',
      strategy: '拒绝将品牌传播停留在「功能叫卖」或「情感绑架」的表层，以「觉醒」为核心母题，让百岁山成为这一代年轻人的「觉醒媒介」。',
      flows: [
        { caption: '传播构建', steps: ['品质觉醒', '场景觉醒', '智性觉醒'] },
        { caption: '营销思路', steps: ['物质觉醒', '社交觉醒', '精神觉醒'] }
      ],
      finale: '让"喝百岁山"不仅是消费行为，而是「选择更科学的生活、更有温度的连接、更有意义的成长」的自我觉醒宣言。'
    }
  },
  {
    key: 'operation',
    title: '内容运营',
    label: 'Operation',
    description: '围绕官方账号、海外增长与个人账号内容矩阵，建立可复用选题与素材方法。',
    image: '/assets/pages/operation-12.jpg',
    href: '#operation-gallery',
    cards: ['官方抖音运营', '海外达人合作', '小红书 / B 站多元内容运营']
  },
  {
    key: 'video',
    title: '拍摄剪辑',
    label: 'Video',
    description: '具备短片审美、节奏把控与文案叙事能力，能完成从拍摄到后期的完整表达。',
    image: '/assets/pages/video-20.jpg',
    href: 'https://www.yitulu.com/t/portfolio/3r75eK6B',
    cards: ['Vlog 文案', '湖湘文化短片', '审美节奏与镜头表达'],
    case: {
      heading: '具备良好的审美和对视频节奏的良好把控能力',
      intro: '关注画面质感、音乐情绪、转场节奏和字幕语感，使成片更完整、更耐看。',
      linkLabel: '查看视频作品',
      cover: '/assets/pages/video-preview-frame.png'
    }
  }
];

function App() {
  const [mode, setMode] = useState(() => {
    if (typeof window === 'undefined') return 'home';
    const h = window.location.hash;
    if (h === '#about') return 'about';
    if (h === '#work') return 'work';
    return 'home';
  });
  const [activePart, setActivePart] = useState('about');
  const [rotationIndex, setRotationIndex] = useState(0);
  const [activeWork, setActiveWork] = useState('strategy');
  const dragStartRef = useRef(null);
  const wheelLockRef = useRef(false);
  const rippleTimeoutRef = useRef(null);
  const surfaceRippleTimeoutRef = useRef(null);
  const part = useMemo(() => parts.find((item) => item.key === activePart), [activePart]);
  const cylinderItems = [parts[0], parts[1], parts[0], parts[1]];

  usePortfolioAnimations(mode, activeWork);

  React.useEffect(() => {
    document.body.classList.toggle('home-locked', mode === 'home');
    return () => document.body.classList.remove('home-locked');
  }, [mode]);

  const switchPart = (direction) => {
    const nextRotationIndex = rotationIndex + direction;
    setRotationIndex(nextRotationIndex);
    setActivePart(parts[((nextRotationIndex % parts.length) + parts.length) % parts.length].key);
  };

  const setActivePartByIndex = (index) => {
    const currentLogicalIndex = ((rotationIndex % parts.length) + parts.length) % parts.length;
    const step = index - currentLogicalIndex;
    setRotationIndex(rotationIndex + step);
    setActivePart(parts[index].key);
  };

  const handleCylinderWheel = (event) => {
    if (wheelLockRef.current || Math.abs(event.deltaX) + Math.abs(event.deltaY) < 20) return;
    wheelLockRef.current = true;
    switchPart(event.deltaX + event.deltaY > 0 ? 1 : -1);
    window.setTimeout(() => {
      wheelLockRef.current = false;
    }, 820);
  };

  const handleDragEnd = (event) => {
    if (dragStartRef.current === null) return;
    const distance = event.clientX - dragStartRef.current;
    dragStartRef.current = null;
    if (Math.abs(distance) > 48) {
      switchPart(distance < 0 ? 1 : -1);
    }
  };

  const handleHeroPointerMove = (event) => {
    const hero = event.currentTarget;
    hero.style.setProperty('--cursor-x', `${event.clientX}px`);
    hero.style.setProperty('--cursor-y', `${event.clientY}px`);
    hero.classList.remove('rippling');
    void hero.offsetWidth;
    hero.classList.add('rippling');
    window.clearTimeout(rippleTimeoutRef.current);
    rippleTimeoutRef.current = window.setTimeout(() => {
      hero.classList.remove('rippling');
    }, 900);

    hero.querySelectorAll('.hero-bg').forEach((el) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--local-x', `${event.clientX - r.left}px`);
      el.style.setProperty('--local-y', `${event.clientY - r.top}px`);
    });

    const activeSurface = event.target.closest('.cover-stage');
    hero.querySelectorAll('.cover-stage.surface-rippling').forEach((el) => {
      if (el !== activeSurface) el.classList.remove('surface-rippling');
    });

    if (activeSurface) {
      const r = activeSurface.getBoundingClientRect();
      activeSurface.style.setProperty('--surface-x', `${event.clientX - r.left}px`);
      activeSurface.style.setProperty('--surface-y', `${event.clientY - r.top}px`);
      activeSurface.classList.remove('surface-rippling');
      void activeSurface.offsetWidth;
      activeSurface.classList.add('surface-rippling');
      window.clearTimeout(surfaceRippleTimeoutRef.current);
      surfaceRippleTimeoutRef.current = window.setTimeout(() => {
        activeSurface.classList.remove('surface-rippling');
      }, 900);
    }
  };

  const handleHeroPointerLeave = (event) => {
    event.currentTarget.querySelectorAll('.hero-bg').forEach((el) => {
      el.style.setProperty('--local-x', `-9999px`);
      el.style.setProperty('--local-y', `-9999px`);
    });
    event.currentTarget.querySelectorAll('.cover-stage').forEach((el) => {
      el.classList.remove('surface-rippling');
      el.style.setProperty('--surface-x', `-9999px`);
      el.style.setProperty('--surface-y', `-9999px`);
    });
  };

  return (
    <main className={mode === 'home' ? 'app-shell home-mode' : 'app-shell content-mode'}>
      <nav className="topbar">
        <button className="brand back-icon" onClick={() => setMode('home')} aria-label="Back to home">
          <ArrowLeft size={22} />
        </button>
        <div className="nav-links">
          <button onClick={() => setMode('about')}>ABOUT ME</button>
          <button onClick={() => setMode('work')}>WORK</button>
        </div>
      </nav>

      {mode === 'home' ? (
        <section className="hero" id="portfolio" onPointerMove={handleHeroPointerMove} onPointerLeave={handleHeroPointerLeave}>
        <svg className="water-filter" aria-hidden="true">
          <filter id="portfolio-water" x="-25%" y="-25%" width="150%" height="150%">
            <feTurbulence type="fractalNoise" baseFrequency="0.022 0.06" numOctaves="2" seed="7">
              <animate attributeName="baseFrequency" dur="2.8s" values="0.018 0.055;0.026 0.075;0.018 0.055" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale="20" xChannelSelector="R" yChannelSelector="G">
              <animate attributeName="scale" dur="1.6s" values="6;24;10;18;6" repeatCount="indefinite" />
            </feDisplacementMap>
          </filter>
          <filter id="portfolio-water-soft" x="-15%" y="-15%" width="130%" height="130%">
            <feTurbulence type="fractalNoise" baseFrequency="0.018 0.05" numOctaves="2" seed="11">
              <animate attributeName="baseFrequency" dur="3.6s" values="0.014 0.04;0.022 0.062;0.014 0.04" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale="6" xChannelSelector="R" yChannelSelector="G">
              <animate attributeName="scale" dur="2.4s" values="2;9;4;7;2" repeatCount="indefinite" />
            </feDisplacementMap>
          </filter>
        </svg>
        <div className="ripple-field" aria-hidden="true" />
        <div className="hero-bg is-static" aria-label="PORTFOLIO">PORTFOLIO</div>
        <div className="hero-bg hero-bg-water" aria-hidden="true">PORTFOLIO</div>
        <div className="hero-shell">
          <div
            className="cylinder-viewport"
            onWheel={handleCylinderWheel}
            onPointerDown={(event) => { dragStartRef.current = event.clientX; }}
            onPointerUp={handleDragEnd}
            onPointerCancel={() => { dragStartRef.current = null; }}
            aria-label="Portfolio cylinder"
          >
            <div className="cylinder" style={{ '--rotation': `${-rotationIndex * 90}deg` }}>
              {cylinderItems.map((item, index) => {
                const frontIndex = ((rotationIndex % 4) + 4) % 4;
                return (
                <button
                  className={frontIndex === index ? 'cover-stage cylinder-face is-front' : 'cover-stage cylinder-face'}
                  key={`${item.key}-${index}`}
                  onClick={() => frontIndex === index && setMode(item.key)}
                  aria-label={`Enter ${item.title}`}
                  style={{
                    '--face-index': index,
                    '--cover-position': item.key === 'about' ? '64% 42%' : 'center'
                  }}
                >
                  <div className="cover-copy">
                    <p>{item.kicker}</p>
                    <h1>{item.title}</h1>
                    <span>{item.copy}</span>
                  </div>
                  <img src={asset(item.image)} alt={item.title} />
                </button>
              )})}
            </div>
          </div>

          <div className="reflection" aria-hidden="true">
            <img src={asset(part.image)} alt="" />
            <div className="water-lines" />
          </div>
          <div className="part-switch" aria-label="Portfolio category">
            {parts.map((item, index) => (
              <button
                className={item.key === activePart ? 'is-active' : ''}
                key={item.key}
                onClick={() => setActivePartByIndex(index)}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
        </section>
      ) : mode === 'about' ? (
        <ContentFrame>
          <section className="page-block">
            <div className="profile-intro">
              <div className="profile-info">
                <p className="profile-eyebrow">ABOUT ME</p>
                <h1 className="profile-name">黄楚齐</h1>
                <p className="profile-tagline">Content Operator · Creative Planner</p>
                <div className="profile-philosophies">
                  {philosophies.map((item) => (
                    <article key={item.num} className="philosophy-item">
                      <span className="philosophy-num">{item.num}</span>
                      <div>
                        <h4>{item.title}</h4>
                        <p>{item.body}</p>
                      </div>
                    </article>
                  ))}
                </div>
                <div className="profile-traits">
                  {traits.map((t) => <span key={t}>{t}</span>)}
                </div>
              </div>
              <div className="profile-photo">
                <img
                  src={asset('/assets/about-portrait.jpg')}
                  alt="黄楚齐"
                  onError={(e) => { e.currentTarget.src = asset('/assets/about-cover.jpg'); }}
                />
                <div className="profile-photo-frame" aria-hidden="true" />
              </div>
            </div>

            <div className="section-heading">
              <p>EXPERIENCE</p>
              <h2>从内容现场长出来的增长经验</h2>
            </div>
            <div className="timeline">
              {timeline.map((item) => (
                <BorderGlow
                  key={item.company + item.date}
                  className="timeline-glow-card"
                  edgeSensitivity={22}
                  glowColor="42 72 62"
                  backgroundColor="#fffdf7"
                  borderRadius={22}
                  glowRadius={26}
                  glowIntensity={.8}
                  coneSpread={22}
                  colors={['#d6ad49', '#f3dca2', '#8fb8d8']}
                  fillOpacity={.18}
                >
                  <article className="timeline-card">
                    <header className="timeline-head">
                      <div className="timeline-head-main">
                        <h3>{item.company}</h3>
                        <p className="role">{item.role}</p>
                      </div>
                      <div className="timeline-head-meta">
                        <p className="time">{item.date}</p>
                        <p className="city">{item.city}</p>
                      </div>
                    </header>
                    <ul>
                      {item.points.map((point) => (
                        <li key={point.label}>
                          <b>{point.label}</b>
                          <span>{point.desc}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </BorderGlow>
              ))}
            </div>

            <div className="ability-board">
              <div className="skill-panel">
                <h3>专业技能 <span>expertise</span></h3>
                {skills.map((skill) => (
                  <div className="skill-row" key={skill.name} data-level={`${skill.level}`}>
                    <b>{skill.name}</b>
                    <div className="meter"><i style={{ width: `${skill.level}%` }} /></div>
                  </div>
                ))}
              </div>
              <div className="portrait-mark">
                <Sparkles size={40} />
                <strong>Creative<br />Operator</strong>
              </div>
              <div className="ability-panel">
                <h3>个人能力 <span>ability</span></h3>
                <div className="ability-tags">
                  {abilities.map((ability) => <span key={ability}>{ability}</span>)}
                </div>
              </div>
            </div>
          </section>
        </ContentFrame>
      ) : (
        <ContentFrame showContact={false}>
          <section className="page-block">
            <div className="section-heading">
              <p>WORK</p>
              <h2>营销策划 / 内容运营 / 拍摄剪辑</h2>
            </div>

            <div className="work-grid">
              {workSections.map((item) => (
                <button
                  className={activeWork === item.key ? 'work-tile active' : 'work-tile'}
                  key={item.key}
                  onClick={() => setActiveWork(item.key)}
                >
                  <span>{item.label}</span>
                  <b>{item.title}</b>
                  <img src={asset(item.image)} alt={item.title} />
                </button>
              ))}
            </div>

            <WorkDetail activeWork={activeWork} />
          </section>
        </ContentFrame>
      )}
    </main>
  );
}

function usePortfolioAnimations(mode, activeWork) {
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return undefined;

    const ctx = gsap.context(() => {
      if (mode === 'home') {
        const opening = gsap.timeline({ defaults: { ease: 'power4.out' } });
        opening
          .set(['.topbar', '.hero-bg', '.hero-shell'], { visibility: 'visible' })
          .fromTo('.topbar', { y: -46, autoAlpha: 0, scaleX: .72 }, { y: 0, autoAlpha: 1, scaleX: 1, duration: 1.15 })
          .fromTo('.hero-bg', { yPercent: 34, scaleY: .62, autoAlpha: 0, clipPath: 'inset(100% 0 0 0)' }, { yPercent: 0, scaleY: 1, autoAlpha: .72, clipPath: 'inset(0% 0 0 0)', duration: 1.35, stagger: .08 }, '-=.72')
          .fromTo('.cylinder-viewport', { y: 92, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.65, clearProps: 'clipPath' }, '-=.82')
          .fromTo('.reflection', { y: -24, scaleY: .36, autoAlpha: 0 }, { y: 0, scaleY: .78, autoAlpha: .34, duration: 1.2 }, '-=.88')
          .fromTo('.part-switch', { y: 34, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .9 }, '-=.58');
      } else {
        gsap.fromTo('.topbar', { y: -22, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .72, ease: 'power3.out' });

        gsap.utils.toArray('.section-heading').forEach((heading) => {
          const label = heading.querySelector('p');
          const title = heading.querySelector('h2');
          gsap.timeline({
            scrollTrigger: {
              trigger: heading,
              start: 'top 82%',
              once: true,
            },
          })
            .fromTo(label, { x: -72, autoAlpha: 0, clipPath: 'inset(0 100% 0 0)' }, { x: 0, autoAlpha: 1, clipPath: 'inset(0 0% 0 0)', duration: .95, ease: 'power4.out' })
            .fromTo(title, { y: 80, scaleY: .72, autoAlpha: 0, clipPath: 'inset(100% 0 0 0)' }, { y: 0, scaleY: 1, autoAlpha: 1, clipPath: 'inset(0% 0 0 0)', duration: 1.2, ease: 'power4.out' }, '-=.56');
        });

        animateStagger('.profile-intro', ['.profile-info > *', '.profile-photo']);
        animateStagger('.timeline', ['.timeline-glow-card']);
        animateStagger('.ability-board', ['.skill-panel', '.portrait-mark', '.ability-panel']);
        animateStagger('.work-grid', ['.work-tile']);
        animateStagger('.detail', ['.detail > header', '.case-preview-row', '.case-compact-grid', '.gallery-block', '.video-case', '.feature-card']);

        gsap.utils.toArray('.profile-photo img, .work-tile img, .case-preview img, .video-preview img').forEach((img) => {
          gsap.fromTo(img, { scale: 1.12, yPercent: 8 }, {
            scale: 1,
            yPercent: -4,
            ease: 'none',
            scrollTrigger: {
              trigger: img,
              start: 'top bottom',
              end: 'bottom top',
              scrub: .85,
            },
          });
        });
      }

      ScrollTrigger.refresh();
    });

    function animateStagger(triggerSelector, targetSelectors) {
      const trigger = document.querySelector(triggerSelector);
      if (!trigger) return;
      const targets = targetSelectors.flatMap((selector) => gsap.utils.toArray(selector, trigger));
      if (!targets.length) return;
      gsap.fromTo(targets, {
        y: 70,
        autoAlpha: 0,
        scale: .965,
        clipPath: 'inset(18% 0 18% 0 round 18px)',
      }, {
        y: 0,
        autoAlpha: 1,
        scale: 1,
        clipPath: 'inset(0% 0 0% 0 round 18px)',
        duration: 1.08,
        stagger: .13,
        ease: 'power4.out',
        scrollTrigger: {
          trigger,
          start: 'top 82%',
          once: true,
        },
      });
    }

    return () => ctx.revert();
  }, [mode, activeWork]);
}

function ContentFrame({ children, showContact = true }) {
  return (
    <div className="content-frame">
      <div className="content-scroll">
        {children}
        {showContact && (
          <section className="contact-section" id="contact">
            <div>
              <p>LET'S CREATE SOMETHING WITH TASTE</p>
              <h2>黄楚齐</h2>
              <span>内容运营 / 创意策划 / 视频表达</span>
            </div>
            <div className="contact-actions">
              <a href="tel:+8619892400358"><Phone size={18} />19892400358</a>
              <a href="mailto:2543257036@qq.com"><Mail size={18} />2543257036@qq.com</a>
              <a href={asset('/docs/resume.pdf')} target="_blank" rel="noreferrer"><ExternalLink size={18} />My resume</a>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function WorkDetail({ activeWork }) {
  const item = workSections.find((section) => section.key === activeWork);

  if (activeWork === 'operation') {
    return (
      <div className="detail operation-detail" id="operation-gallery">
        <header>
          <span>#002</span>
          <h3>内容运营作品</h3>
          <p>{item.description}</p>
        </header>
        <div className="gallery-block">
          <div className="block-title">官方抖音运营｜爆款素材案例</div>
          <div className="video-cards portrait">
            {[
              { title: '懒人记账APP来啦。钱不知不…', href: 'https://www.douyin.com/note/7540597340957134089', cover: '/assets/pages/operation-card-01.jpg' },
              { title: '谁懂啊！没钱愁到失眠？演唱…', href: 'https://www.douyin.com/video/7532117230251674931', cover: '/assets/pages/operation-card-02.jpg' },
              { title: '分享一个超级实用的记账app…', href: 'https://v.douyin.com/erjLFjB5fIk/', cover: '/assets/pages/operation-card-03.jpg' }
            ].map((card) => (
              <a href={card.href} target="_blank" rel="noreferrer" key={card.title}>
                <img src={asset(card.cover)} alt={card.title} />
                <b>{card.title}</b>
              </a>
            ))}
          </div>
        </div>
        <div className="gallery-block">
          <div className="block-title">IG达人合作｜打造可验证的爆款逻辑｜CPM低至1.09刀｜以港台地区为例</div>
          <div className="video-cards portrait four">
            {[
              { title: 'POV：當你決定整點讀書', href: 'https://www.instagram.com/reel/DShbljwEhrL/', cover: '/assets/pages/overseas-card-01.jpg' },
              { title: '明明有很多事情要做，當自律的人太難了…', href: 'https://www.instagram.com/reel/DSAR_v1j89_/', cover: '/assets/pages/overseas-card-02.jpg' },
              { title: '相信大家平常都跟我一樣', href: 'https://www.instagram.com/p/DTm5C1IEmwp/', cover: '/assets/pages/overseas-card-03.jpg' },
              { title: '它甚至可以自定義哦', href: null, cover: '/assets/pages/overseas-card-04.jpg' }
            ].map((card) => (
              <a
                href={card.href || '#'}
                onClick={card.href ? undefined : (e) => e.preventDefault()}
                target={card.href ? '_blank' : undefined}
                rel="noreferrer"
                key={card.title}
              >
                <img src={asset(card.cover)} alt={card.title} />
                <b>{card.title}</b>
              </a>
            ))}
          </div>
        </div>
        <div className="gallery-block">
          <div className="block-title">个人小红书内容运营｜从校园生活到流行文化的用户吸引力构建</div>
          <div className="video-cards portrait rednote">
            {[
              { title: '让我们一起 恭喜这位实习生', cover: '/assets/pages/rednote-card-01.jpg' },
              { title: '以前不觉得 entp 喜欢开地狱玩笑，今天发现…', cover: '/assets/pages/rednote-card-02.jpg' },
              { title: '！大学真的要走出寝室生活', cover: '/assets/pages/rednote-card-03.jpg' }
            ].map((card) => (
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                key={card.title}
              >
                <img src={asset(card.cover)} alt={card.title} />
                <b>{card.title}</b>
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (activeWork === 'video') {
    return (
      <div className="detail video-detail">
        <header>
          <span>#003</span>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </header>
        <VideoCase data={item.case} href={item.href} />
      </div>
    );
  }

  if (item.case) {
    return (
      <div className="detail strategy-detail">
        <header>
          <span>#001</span>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </header>
        <CaseStudy data={item.case} href={item.href} />
      </div>
    );
  }

  return (
    <div className="detail">
      <header>
        <span>{activeWork === 'strategy' ? '#001' : '#003'}</span>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </header>
      <div className="feature-card">
        <img src={asset(item.image)} alt={item.title} />
        <div>
          {item.cards.map((card) => <span key={card}>{card}</span>)}
          <a href={item.href} target="_blank" rel="noreferrer">查看作品 <ArrowRight size={18} /></a>
        </div>
      </div>
    </div>
  );
}

function VideoCase({ data, href }) {
  return (
    <section className="video-case">
      <div className="video-case-main">
        <p className="case-eyebrow">Video Editing</p>
        <h4>{data.heading}</h4>
        <p className="video-case-intro">{data.intro}</p>
      </div>

      <div className="video-preview">
        <img src={asset(data.cover)} alt="拍摄剪辑作品预览" />
        <a className="case-cta" href={href} target="_blank" rel="noreferrer">
          {data.linkLabel}
          <ArrowRight size={18} />
        </a>
      </div>
    </section>
  );
}

function CaseStudy({ data, href }) {
  return (
    <div className="case-study">
      <header className="case-head">
        <div className="case-head-main">
          <p className="case-eyebrow">— CASE STUDY</p>
          <h4 className="case-name">{data.name}</h4>
          <p className="case-tagline">{data.tagline}</p>
        </div>
        {data.award && (
          <div className="case-award">
            <p className="case-award-label">荣誉</p>
            <p className="case-award-text">{data.award}</p>
          </div>
        )}
      </header>

      <div className="case-preview-row">
        {data.preview && (
          <a className="case-preview" href={href} target="_blank" rel="noreferrer" aria-label="查看百岁山营销策划案">
            <img src={asset(data.preview)} alt={`${data.name}预览图`} />
          </a>
        )}

        <div className="case-preview-info">
          <section className="case-section purpose-section">
            <p className="case-section-label">营销目的</p>
            <div className="purpose-list">
              {data.purpose.map((p, i) => (
                <article key={p.label}>
                  <span className="purpose-num">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h5>{p.label}</h5>
                    <p>{p.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="case-section insight-section">
            <p className="case-section-label">核心洞察</p>
            <blockquote className="insight">{data.insight}</blockquote>
          </section>
        </div>
      </div>

      <div className="case-compact-grid">
        <section className="case-section strategy-section">
          <p className="case-section-label">营销策略</p>
          <div className="strategy-compact">
            <p className="strategy-text">{data.strategy}</p>
            <div className="strategy-flows">
              {data.flows.map((flow) => (
                <div key={flow.caption} className="strategy-flow">
                  <span className="flow-caption">{flow.caption}</span>
                  <div className="flow-steps">
                    {flow.steps.map((step, i) => (
                      <React.Fragment key={step}>
                        <span className="step">{step}</span>
                        {i < flow.steps.length - 1 && <span className="arrow">→</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="case-section finale-section">
          <p className="case-section-label">落点</p>
          <p className="finale">{data.finale}</p>
        </section>
      </div>

      <a className="case-cta" href={href} target="_blank" rel="noreferrer">
        查看完整策划案 <ArrowRight size={18} />
      </a>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
