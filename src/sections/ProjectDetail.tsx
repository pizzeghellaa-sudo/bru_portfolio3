import { useOutletContext, useNavigate, useParams, useLocation } from 'react-router-dom';
import { PROJECTS, StorySection } from '../types';
import { TRANSLATIONS } from '../translations';
import type { LayoutContext } from '../layouts/RootLayout';
import PageHead from '../components/PageHead';
import { buildBreadcrumbJsonLd } from '../seo/pageJsonLd';
import { buildCreativeWorkJsonLd } from '../seo/projectJsonLd';

export default function ProjectDetail() {
  const { language, onImageClick } = useOutletContext<LayoutContext>();
  const { slug, lang } = useParams<{ slug: string; lang: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const project = PROJECTS.find(p => p.slug === slug);
  const t = TRANSLATIONS[language].work;

  if (!project) return null;

  const langSegment = (lang ?? 'en') as 'en' | 'it';
  const pageTitle = `${project.title} — Bru Bulgarelli`;
  const pageDescription = project.metaDescription?.[language] ?? project.description[language].split('.')[0] + '.';
  const workSectionTitle = language === 'EN' ? 'Selected Works' : 'Lavori Selezionati';
  const jsonLd = [
    buildCreativeWorkJsonLd(project, language, location.pathname),
    buildBreadcrumbJsonLd([
      { name: 'Home', url: `/${lang}/` },
      { name: workSectionTitle, url: `/${lang}/selected-works` },
      { name: project.title, url: `/${lang}/selected-works/${project.slug}` },
    ]),
  ];

  const meta = project.meta;

  const handleImageClick = (index: number) => {
    const images = project.gallery.map(img => img.full);
    onImageClick(images, index);
  };

  // Render a single story section
  const renderSection = (section: StorySection, idx: number) => {
    const images = section.galleryIndices
      .map(i => project.gallery[i])
      .filter(Boolean);

    const textBlock = (
      <div className="flex flex-col gap-4 justify-center">
        <span className="text-5xl md:text-6xl font-black text-primary leading-none">{section.number}</span>
        <h4 className="text-xl font-bold text-ink uppercase tracking-tight">{section.title[language]}</h4>
        <p className="text-sm leading-[1.75] text-ink/80">{section.description[language]}</p>
      </div>
    );

    const imageBlock = (img: typeof project.gallery[0] | undefined, i: number) => img ? (
      <div
        key={i}
        className="overflow-hidden bg-paper cursor-zoom-in group"
        onClick={() => handleImageClick(section.galleryIndices[i])}
      >
        <img
          src={img.thumb}
          alt={`${project.title} ${section.number}`}
          className="w-full grayscale group-hover:grayscale-0 transition-all duration-700"
          referrerPolicy="no-referrer"
        />
      </div>
    ) : null;

    if (section.layout === 'text-image') {
      return (
        <div key={idx} className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-12 py-12 border-b border-ink/10">
          {textBlock}
          {imageBlock(images[0], 0)}
        </div>
      );
    }

    if (section.layout === 'image-text') {
      return (
        <div key={idx} className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-12 py-12 border-b border-ink/10">
          <div className="order-2 md:order-1">{imageBlock(images[0], 0)}</div>
          <div className="order-1 md:order-2">{textBlock}</div>
        </div>
      );
    }

    if (section.layout === 'full-grid') {
      const imageGrid = images.length === 1
        ? <div>{imageBlock(images[0], 0)}</div>
        : images.length === 2
          ? <div className="grid grid-cols-1 sm:grid-cols-[3fr_2fr] gap-4">{images.map((img, i) => imageBlock(img, i))}</div>
          : <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">{images.map((img, i) => imageBlock(img, i))}</div>;
      return (
        <div key={idx} className="flex flex-col gap-8 py-16 border-b border-ink/10">
          {textBlock}
          {imageGrid}
        </div>
      );
    }

    if (section.layout === 'diagram') {
      const img = images[0];
      return (
        <div key={idx} className="flex flex-col gap-6 pt-20 pb-28 border-b border-ink/10">
          <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">
            {section.title[language]}
          </span>
          {img && (
            <div
              className="overflow-hidden cursor-zoom-in group"
              onClick={() => handleImageClick(section.galleryIndices[0])}
            >
              <img
                src={img.full}
                alt={section.title[language]}
                className="w-full grayscale group-hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
          )}
          <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest text-center">
            {section.description[language]}
          </p>
        </div>
      );
    }

    if (section.layout === 'annotated-wireframe') {
      const annotationCallouts = (
        <div className="flex flex-col gap-6 justify-center w-[180px]">
          {(section.annotations || []).map((a, ai) => (
            <div key={ai} className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-primary flex-shrink-0" />
              <span className="font-mono text-xs text-ink uppercase tracking-wider">{a[language]}</span>
              <span className="ml-auto text-slate-500 text-sm hidden md:block">→</span>
            </div>
          ))}
        </div>
      );

      return (
        <div key={idx} className="flex flex-col gap-12 py-12 border-b border-ink/10">
          {/* Zone 1: Section header */}
          {textBlock}

          {/* Zone 2: Two annotated screenshot rows */}
          <div className="flex flex-col gap-10">
            {section.galleryIndices.map((galleryIdx, rowIdx) => {
              const img = project.gallery[galleryIdx];
              if (!img) return null;
              return (
                <div key={rowIdx} className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8 items-center">
                  {annotationCallouts}
                  <div
                    className="overflow-hidden bg-paper cursor-zoom-in group"
                    onClick={() => handleImageClick(galleryIdx)}
                  >
                    <img
                      src={img.thumb}
                      alt={`${project.title} ${section.number} screenshot ${rowIdx + 1}`}
                      className="w-full grayscale group-hover:grayscale-0 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Zone 3: Wireframe-to-interface comparison */}
          {section.comparison && (() => {
            const { heading, beforeIndex, afterIndex, beforeLabel, afterLabel } = section.comparison;
            const beforeImg = project.gallery[beforeIndex];
            const afterImg = project.gallery[afterIndex];
            return (
              <div className="flex flex-col gap-6">
                <p className="text-lg font-medium text-ink">{heading[language]}</p>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
                  <div className="flex flex-col gap-2">
                    {beforeImg && (
                      <div
                        className="overflow-hidden bg-paper cursor-zoom-in group"
                        onClick={() => handleImageClick(beforeIndex)}
                      >
                        <img
                          src={beforeImg.thumb}
                          alt={beforeLabel[language]}
                          className="w-full grayscale group-hover:grayscale-0 transition-all duration-700"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}
                    <p className="font-mono text-xs text-slate-400 uppercase tracking-widest text-center">{beforeLabel[language]}</p>
                  </div>

                  <span className="hidden md:block text-2xl text-slate-500 px-2">→</span>

                  <div className="flex flex-col gap-2">
                    {afterImg && (
                      <div
                        className="overflow-hidden bg-paper cursor-zoom-in group"
                        onClick={() => handleImageClick(afterIndex)}
                      >
                        <img
                          src={afterImg.thumb}
                          alt={afterLabel[language]}
                          className="w-full grayscale group-hover:grayscale-0 transition-all duration-700"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}
                    <p className="font-mono text-xs text-slate-400 uppercase tracking-widest text-center">{afterLabel[language]}</p>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      );
    }

    // 'half' — returned as-is; caller groups consecutive halves
    return null;
  };

  // Group consecutive 'half' sections into pairs
  const renderSections = () => {
    if (!meta) return null;
    const result = [];
    let i = 0;
    while (i < meta.sections.length) {
      const sec = meta.sections[i];
      if (sec.layout === 'half') {
        const pair = [sec];
        if (i + 1 < meta.sections.length && meta.sections[i + 1].layout === 'half') {
          pair.push(meta.sections[i + 1]);
          i += 2;
        } else {
          i += 1;
        }
        result.push(
          <div key={`half-${i}`} className={`grid grid-cols-1 ${pair.length === 2 ? 'md:grid-cols-2' : ''} gap-12 py-16 border-b border-ink/10`}>
            {pair.map((s, pi) => {
              const img = project.gallery[s.galleryIndices[0]];
              return (
                <div key={pi} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-4">
                    {s.number
                      ? <span className="text-5xl md:text-6xl font-black text-primary leading-none">{s.number}</span>
                      : <div className="w-12 h-0.5 bg-primary" />
                    }
                    <h4 className="text-xl font-bold text-ink uppercase tracking-tight">{s.title[language]}</h4>
                    <p className="text-sm leading-[1.75] text-ink/80">{s.description[language]}</p>
                  </div>
                  {img && (
                    <div
                      className="overflow-hidden bg-paper cursor-zoom-in group"
                      onClick={() => handleImageClick(s.galleryIndices[0])}
                    >
                      <img
                        src={img.thumb}
                        alt={`${project.title} ${s.number}`}
                        className="w-full grayscale group-hover:grayscale-0 transition-all duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      } else {
        result.push(renderSection(sec, i));
        i += 1;
      }
    }
    return result;
  };

  return (
    <>
      <PageHead
        title={pageTitle}
        description={pageDescription}
        path={location.pathname}
        lang={langSegment}
        jsonLd={jsonLd}
      />
      <div className="flex flex-col gap-12">
      {/* Hero Header */}
      <header className="flex flex-col gap-8">
        <button
          onClick={() => navigate(`/${lang}/selected-works`)}
          className="font-mono text-xs text-slate-400 hover:text-ink transition-colors uppercase tracking-widest flex items-center gap-2"
        >
          <span className="text-primary">←</span> {t.back}
        </button>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline gap-4">
          <div>
            <h2
              className="text-6xl md:text-8xl font-black tracking-tighter uppercase"
              style={{ color: 'rgb(179, 178, 178)' }}
            >
              {project.title}
            </h2>
            <p className="font-mono text-xs text-primary mt-2 uppercase tracking-widest">
              {meta ? meta.subtitle[language] : project.category}
            </p>
          </div>
          {meta && (
            <div className="font-mono text-xs text-slate-400 uppercase tracking-widest flex-shrink-0">
              {t.detail.year} — {meta.year}
            </div>
          )}
        </div>
      </header>

      {/* Separator */}
      <div className="w-full h-px bg-ink/10" />

      {/* Main grid */}
      {meta ? (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Sidebar */}
          <aside className="col-span-1 md:col-span-3 flex flex-col gap-10">
            {/* B1 / CONTEXT */}
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">B1 / {t.detail.context}</span>
              <p className="text-sm leading-relaxed text-ink/80">{meta.context[language]}</p>
            </div>
            {/* B2 / ROLE */}
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">B2 / {t.detail.role}</span>
              <ul className="flex flex-col gap-2">
                {meta.roles.map(role => (
                  <li key={role} className="flex items-center gap-3">
                    <span className="w-0.5 h-4 bg-primary flex-shrink-0" />
                    <span className="font-mono text-xs text-ink uppercase tracking-wider">{role}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* B3 / STACK */}
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">B3 / {t.detail.stack}</span>
              {meta.stackGroups ? (
                <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                  {meta.stackGroups.map(group => (
                    <div key={group.title} className="flex flex-col gap-1.5">
                      <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest">{group.title}</span>
                      <ul className="flex flex-col gap-1">
                        {group.items.map(item => (
                          <li key={item} className="font-mono text-xs text-ink">{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                  {meta.stack.map(item => (
                    <div key={item.label} className="flex flex-col gap-0.5">
                      <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest">{item.label}</span>
                      <span className="font-mono text-xs text-ink">{item.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </aside>

          {/* Story sections */}
          <div className="col-span-1 md:col-span-9">
            {renderSections()}
          </div>
        </div>
      ) : (
        /* Fallback layout for projects without meta */
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="col-span-1 md:col-span-3">
            <div className="w-12 h-0.5 bg-primary mb-8" />
            <p className="text-xl font-medium leading-tight text-ink whitespace-pre-line">
              {project.description[language]}
            </p>
            <div className="mt-12 flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span key={tag} className="px-3 py-1 border border-ink/10 font-mono text-[10px] text-slate-400 uppercase tracking-widest">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="col-span-1 md:col-span-9 flex flex-col gap-12">
            {project.gallery.map((img, i) => (
              <div
                key={i}
                className="overflow-hidden bg-paper cursor-zoom-in group"
                onClick={() => handleImageClick(i)}
              >
                <img
                  src={img.thumb}
                  alt={`${project.title} gallery ${i}`}
                  className="w-full grayscale group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    </>
  );
}
