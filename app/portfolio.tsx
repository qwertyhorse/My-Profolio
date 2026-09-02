"use client";

import {
  ArrowDownRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Home,
  Images,
  Mail,
  Moon,
  NotebookPen,
  Sun,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

type SectionId = "top" | "work" | "about" | "notes" | "gallery";
type Theme = "dark" | "light";

type NavItem = { id: SectionId; label: string; icon: LucideIcon };
type Project = {
  title: string;
  label: string;
  description: string;
  category: string;
  year: string;
  artClass: string;
};
type Fact = { label: string; value: string };
type Note = { date: string; title: string; description: string };

const navItems: readonly NavItem[] = [
  { id: "top", label: "首页", icon: Home },
  { id: "work", label: "作品", icon: BriefcaseBusiness },
  { id: "about", label: "关于", icon: UserRound },
  { id: "notes", label: "随笔", icon: NotebookPen },
  { id: "gallery", label: "图集", icon: Images },
];

const projects: readonly Project[] = [
  { title: "Mori 家居 · 数字品牌", label: "MORI", description: "为一个慢生活品牌重做数字体验，让“留白”成为可感知的产品功能。", category: "品牌 / 体验", year: "2025", artClass: "art-a" },
  { title: "Flow · 团队协作工具", label: "FLOW", description: "把零散的工作流整理成一条顺畅、低压力的日常路径。", category: "产品 / 交互", year: "2025", artClass: "art-b" },
  { title: "Noon FM · 声音电台", label: "NOON", description: "一套围绕声音、时间和陪伴感展开的移动端视觉语言。", category: "视觉 / 开发", year: "2024", artClass: "art-c" },
  { title: "Open Archive · 开放档案", label: "OPEN", description: "为一座城市建立可漫游、可收藏的公共记忆入口。", category: "研究 / 网站", year: "2024", artClass: "art-d" },
];

const facts: readonly Fact[] = [
  { label: "所在地", value: "上海 / 远程" },
  { label: "专注领域", value: "品牌、产品、前端" },
  { label: "合作方式", value: "项目制 / 顾问" },
  { label: "可用语言", value: "中文 / English" },
];

const notes: readonly Note[] = [
  { date: "06.18.26", title: "为什么我总是先做一个很丑的版本", description: "关于速度、反馈，以及允许自己犯错。" },
  { date: "05.02.26", title: "数字产品里的“安静时刻”", description: "减少一点提示，也许能换来更多专注。" },
  { date: "03.27.26", title: "从一张旧海报开始的城市漫步", description: "收集路边被忽略的字体和颜色。" },
];

const galleryItems = ["01 / Light study", "02 / Material", "03 / Walk", "04 / Type", "05 / Found", "06 / Quiet"] as const;
const socialPlatforms = ["Instagram", "Are.na", "LinkedIn"] as const;

export function Portfolio() {
  const [activeSection, setActiveSection] = useState<SectionId>("top");

  useEffect(() => {
    const sections = navItems.map(({ id }) => document.getElementById(id)).filter((section): section is HTMLElement => section !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) setActiveSection(visibleEntry.target.id as SectionId);
      },
      { rootMargin: "-34% 0px -56% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  function toggleTheme() {
    const nextTheme: Theme = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("portfolio-theme", nextTheme);
  }

  return (
    <div className="page">
      <header className="topbar">
        <nav className="nav-shell" aria-label="主导航">
          {navItems.map(({ id, label, icon: Icon }) => (
            <a className={`nav-link${activeSection === id ? " active" : ""}`} href={`#${id}`} aria-current={activeSection === id ? "page" : undefined} key={id}>
              <Icon className="nav-icon" aria-hidden="true" />
              <span className="nav-label">{label}</span>
            </a>
          ))}
          <span className="nav-divider" aria-hidden="true" />
          <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label="切换明暗主题">
            <Sun className="theme-icon theme-icon-sun" aria-hidden="true" />
            <Moon className="theme-icon theme-icon-moon" aria-hidden="true" />
          </button>
        </nav>
      </header>

      <main>
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="eyebrow">Independent designer · 2026</div>
          <h1 id="hero-title">把复杂的东西，<em>做得清楚又有趣。</em></h1>
          <p className="hero-copy">你好，我是林默，一名设计工程师。我在品牌、产品和代码的交叉处工作，把模糊的想法变成可以被使用、被记住的体验。</p>
          <div className="hero-foot">
            <div className="scroll-note"><span aria-hidden="true" />向下探索</div>
            <a className="hero-link" href="#work">查看精选项目 <ArrowDownRight aria-hidden="true" /></a>
          </div>
        </section>

        <section id="work" aria-labelledby="work-title">
          <div className="section-head">
            <div><div className="section-kicker">01 / Selected work</div><h2 id="work-title">最近在做的事</h2></div>
            <p className="section-intro">从一个小小的交互，到完整的品牌系统。每个项目都在寻找更准确的表达方式。</p>
          </div>
          <div className="work-grid">
            {projects.map((project) => (
              <article className="project" key={project.title}>
                <div className={`project-art ${project.artClass}`} aria-hidden="true"><div className="art-card" /><span className="art-label">{project.label}</span></div>
                <div className="project-body">
                  <div><h3 className="project-title">{project.title}</h3><p className="project-desc">{project.description}</p></div>
                  <div className="project-meta"><span>{project.category}</span><span>{project.year}</span></div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="about" aria-labelledby="about-title">
          <div className="section-head compact"><div><div className="section-kicker">02 / About me</div><h2 id="about-title">关于我</h2></div></div>
          <div className="about-grid">
            <p className="about-lead">我相信好设计不是装饰，而是让人更快地理解、更自然地行动。<mark>我喜欢从问题本身开始。</mark></p>
            <div className="about-copy">
              <p>过去十年，我和不同规模的团队一起做过从 0 到 1 的产品，也做过成熟品牌的再定位。我的工作方式很简单：先倾听，再拆解，最后一起把它做出来。</p>
              <p>现在，我以独立设计师的身份工作，也开放短期合作与顾问项目。</p>
              <dl className="facts">{facts.map((fact) => <div className="fact" key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl>
            </div>
          </div>
        </section>

        <section id="notes" aria-labelledby="notes-title">
          <div className="section-head">
            <div><div className="section-kicker">03 / Notes</div><h2 id="notes-title">一些随笔</h2></div>
            <p className="section-intro">记录工作之外，我如何观察、阅读和保持好奇。</p>
          </div>
          <div className="notes">
            {notes.map((note) => <article className="note" key={note.title}><time>{note.date}</time><div><h3>{note.title}</h3><p>{note.description}</p></div><ArrowUpRight className="static-arrow" aria-hidden="true" /></article>)}
          </div>
        </section>

        <section id="gallery" aria-labelledby="gallery-title">
          <div className="section-head">
            <div><div className="section-kicker">04 / Visual diary</div><h2 id="gallery-title">视觉日记</h2></div>
            <p className="section-intro">工作台、路上看到的东西，以及一些暂时没有答案的实验。</p>
          </div>
          <div className="gallery-grid" aria-label="视觉日记图集">{galleryItems.map((item) => <div className="gallery-item" key={item}><span>{item}</span></div>)}</div>
        </section>

        <section className="contact" aria-labelledby="contact-title">
          <div><div className="section-kicker">05 / Say hello</div><h2 id="contact-title">有一个想法？<br />我们聊聊。</h2></div>
          <a className="contact-action" href="mailto:hello@linmo.studio"><Mail aria-hidden="true" />hello@linmo.studio<ArrowUpRight aria-hidden="true" /></a>
        </section>
      </main>

      <footer>
        <span>© 2026 Lin Mo. Built with curiosity.</span>
        <div className="socials" aria-label="社交平台">{socialPlatforms.map((platform) => <span key={platform}>{platform}</span>)}</div>
      </footer>
    </div>
  );
}
