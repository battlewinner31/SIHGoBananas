import { useParams, Link, Navigate } from "react-router";
import { ArrowLeft, MapPin, Users, Calendar, Globe, CheckCircle, ArrowRight, ExternalLink, Info } from "lucide-react";
import { STARTUPS, SOLUTION_AREAS } from "../data";

const NA = "Not publicly disclosed";

function isNA(v?: string) {
  return !v || v === NA || v.trim() === "";
}

function MutedNA() {
  return <span className="text-gray-400 italic text-sm">{NA}</span>;
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-7">
      <h2 className="text-lg font-bold text-[#1a237e] mb-5">{title}</h2>
      {children}
    </div>
  );
}

function Badge({ text, subtle }: { text: string; subtle?: boolean }) {
  return (
    <span className={`inline-block text-sm font-medium px-3 py-1.5 rounded-lg ${subtle ? "bg-gray-100 text-gray-600" : "bg-[#1a237e]/8 text-[#1a237e]"}`}>
      {text}
    </span>
  );
}

function ExperienceTag({ text }: { text: string }) {
  return (
    <span className="inline-block text-sm px-3 py-1.5 rounded-full border border-[#1a237e]/20 text-[#1a237e] bg-[#1a237e]/4">
      {text}
    </span>
  );
}

export function StartupProfile() {
  const { id } = useParams();
  const startup = STARTUPS.find((s) => s.id === id);

  if (!startup) return <Navigate to="/solutions" replace />;

  const backArea = startup.areas[0] ?? "waste-management";

  return (
    <div>
      {/* Back nav */}
      <div className="bg-white border-b border-gray-200 py-3">
        <div className="container mx-auto px-4">
          <Link
            to={`/solutions/${backArea}`}
            className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#1a237e] transition-colors no-underline"
          >
            <ArrowLeft className="w-4 h-4" /> Back to{" "}
            {SOLUTION_AREAS.find((a) => a.id === backArea)?.label ?? "Solutions"}
          </Link>
        </div>
      </div>

      {/* Header */}
      <section className="bg-[#1a237e] text-white py-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-start gap-5 mb-6">
            {/* Logo mark */}
            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-[#1a237e] font-black text-2xl">{startup.name[0]}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl lg:text-3xl font-bold leading-tight mb-1">{startup.name}</h1>
              <p className="text-[#FF9933] font-medium text-sm mb-4">{startup.tagline}</p>
              <div className="flex flex-wrap gap-4 text-sm text-white/70">
                {!isNA(startup.location) && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#FF9933] flex-shrink-0" />
                    {startup.location}
                  </span>
                )}
                {!isNA(startup.teamSize) && (
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[#FF9933] flex-shrink-0" />
                    {startup.teamSize} employees
                  </span>
                )}
                {!isNA(startup.founded) && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#FF9933] flex-shrink-0" />
                    Founded: {startup.founded}
                  </span>
                )}
                {!isNA(startup.website) && (
                  <span className="flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-[#FF9933] flex-shrink-0" />
                    {startup.website.replace(/^https?:\/\//, "")}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Technology badges in header */}
          {startup.technologies.length > 0 && !isNA(startup.technologies[0]) && (
            <div className="flex flex-wrap gap-2">
              {startup.technologies.slice(0, 8).map((t) => (
                <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-white/90 border border-white/15">
                  {t}
                </span>
              ))}
              {startup.technologies.length > 8 && (
                <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-white/70">
                  +{startup.technologies.length - 8} more
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Body */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid lg:grid-cols-3 gap-8">

            {/* ── Main content ─────────────────────────────────── */}
            <div className="lg:col-span-2 space-y-7">

              {/* About */}
              <SectionCard title="About">
                {isNA(startup.about)
                  ? <MutedNA />
                  : <p className="text-gray-700 leading-relaxed text-sm">{startup.about}</p>}
              </SectionCard>

              {/* Our Solution */}
              <SectionCard title="Our Solution">
                {!isNA(startup.solution) && (
                  <p className="text-gray-700 leading-relaxed text-sm mb-6">{startup.solution}</p>
                )}
                {startup.solutionProducts && startup.solutionProducts.length > 0 && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {startup.solutionProducts.map((p) => (
                      <div key={p.name} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <p className="font-bold text-[#1a237e] text-sm mb-3">{p.name}</p>
                        <ul className="space-y-1.5">
                          {p.points.map((pt) => (
                            <li key={pt} className="flex items-start gap-2 text-xs text-gray-600">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#FF9933] flex-shrink-0 mt-1.5" />
                              {pt}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
                {isNA(startup.solution) && (!startup.solutionProducts || startup.solutionProducts.length === 0) && (
                  <MutedNA />
                )}
              </SectionCard>

              {/* Technologies & Capabilities */}
              <SectionCard title="Technologies & Capabilities">
                {startup.technologies.length === 0 || isNA(startup.technologies[0]) ? (
                  <MutedNA />
                ) : (
                  <>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {startup.technologies.map((t) => <Badge key={t} text={t} />)}
                    </div>
                    {startup.technologyNotes && (
                      <div className="flex items-start gap-2 mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                        <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-blue-800 leading-relaxed">{startup.technologyNotes}</p>
                      </div>
                    )}
                  </>
                )}
              </SectionCard>

              {/* Previous Deployments */}
              <SectionCard title="Previous Deployments">
                {startup.deploymentRecords && startup.deploymentRecords.length > 0 ? (
                  <div className="space-y-5">
                    {startup.deploymentRecords.map((d, i) => (
                      <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="bg-[#1a237e]/4 px-5 py-3 flex items-start justify-between gap-3">
                          <div>
                            <p className="font-bold text-[#1a237e] text-sm">{d.location}</p>
                            {d.date && <p className="text-xs text-gray-500 mt-0.5">{d.date}</p>}
                          </div>
                        </div>
                        <div className="px-5 py-4 space-y-4">
                          {d.description && (
                            <p className="text-sm text-gray-700 leading-relaxed">{d.description}</p>
                          )}
                          {d.stats && d.stats.length > 0 && (
                            <div className="flex flex-wrap gap-3">
                              {d.stats.map((s) => (
                                <div key={s.label} className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-center">
                                  <p className="text-base font-bold text-[#1a237e]">{s.value}</p>
                                  <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
                                </div>
                              ))}
                            </div>
                          )}
                          {d.results && d.results.length > 0 && (
                            <ul className="space-y-2">
                              {d.results.map((r) => (
                                <li key={r} className="flex items-start gap-2 text-sm text-gray-700">
                                  <CheckCircle className="w-4 h-4 text-[#1a237e] flex-shrink-0 mt-0.5" />
                                  {r}
                                </li>
                              ))}
                            </ul>
                          )}
                          {d.note && (
                            <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-lg border border-amber-100">
                              <Info className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                              <p className="text-xs text-amber-800">{d.note}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    {startup.deploymentNote && (
                      <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-lg border border-amber-100">
                        <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-amber-800 leading-relaxed">{startup.deploymentNote}</p>
                      </div>
                    )}
                  </div>
                ) : startup.deploymentNote ? (
                  <div className="flex items-start gap-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <Info className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-600 italic">{startup.deploymentNote}</p>
                  </div>
                ) : (
                  <MutedNA />
                )}
              </SectionCard>

              {/* Experience */}
              <SectionCard title="Experience">
                {startup.experienceItems && startup.experienceItems.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {startup.experienceItems.map((item) => (
                      <ExperienceTag key={item} text={item} />
                    ))}
                  </div>
                ) : isNA(startup.experience) ? (
                  <MutedNA />
                ) : (
                  <p className="text-gray-700 text-sm leading-relaxed">{startup.experience}</p>
                )}
              </SectionCard>

            </div>

            {/* ── Sidebar ──────────────────────────────────────── */}
            <div className="space-y-6">

              {/* Visit website CTA */}
              {!isNA(startup.website) && (
                <a
                  href={startup.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[#1a237e] text-white font-semibold rounded-xl hover:bg-[#283593] transition-colors no-underline text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Visit Company Website
                </a>
              )}

              {/* Company Information */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-[#1a237e] mb-4">Company Information</h3>
                <dl className="grid grid-cols-1 gap-4 text-sm">
                  {[
                    { label: "Registered Name", value: startup.name },
                    { label: "Founded", value: startup.founded },
                    { label: "Location", value: startup.location },
                    { label: "Team Size", value: startup.teamSize },
                    { label: "Sector", value: startup.sector },
                    startup.cin ? { label: "CIN", value: startup.cin } : null,
                    startup.dpiitNumber ? { label: "DPIIT Number", value: startup.dpiitNumber } : null,
                    startup.incubatedAt ? { label: "Incubated At", value: startup.incubatedAt } : null,
                    startup.trlLevel ? { label: "Technology Readiness", value: startup.trlLevel } : null,
                    startup.productsInDeployment ? { label: "Products in Deployment", value: startup.productsInDeployment } : null,
                    startup.patentsFiled ? { label: "Patents Filed", value: startup.patentsFiled } : null,
                    startup.fundingInfo ? { label: "Funding", value: startup.fundingInfo } : null,
                    startup.verifiedBy ? { label: "Verified By", value: startup.verifiedBy } : null,
                  ].filter(Boolean).map((item) => item && (
                    <div key={item.label} className="grid grid-cols-[auto_1fr] gap-x-3 items-start">
                      <dt className="text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap pt-0.5 w-32 flex-shrink-0">{item.label}</dt>
                      <dd className={`${isNA(item.value ?? "") ? "text-gray-400 italic" : "text-gray-800 font-medium"} text-xs leading-relaxed`}>
                        {isNA(item.value ?? "") ? NA : item.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                {/* Company figures note */}
                {startup.companyFiguresNote && (
                  <div className="mt-4 flex items-start gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <Info className="w-3.5 h-3.5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-blue-800 leading-relaxed">{startup.companyFiguresNote}</p>
                  </div>
                )}
              </div>

              {/* Founders */}
              {startup.founders && startup.founders.length > 0 && !isNA(startup.founders[0].name) && (
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="font-bold text-[#1a237e] mb-4">Leadership</h3>
                  <ul className="space-y-3">
                    {startup.founders.map((f, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#1a237e]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-[#1a237e]">{f.name[0]}</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{f.name}</p>
                          {f.role && <p className="text-xs text-gray-500">{f.role}</p>}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recognitions */}
              {startup.recognitions && startup.recognitions.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="font-bold text-[#1a237e] mb-4">Recognitions</h3>
                  <ul className="space-y-2">
                    {startup.recognitions.map((r) => (
                      <li key={r} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF9933] flex-shrink-0 mt-2" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Support programmes */}
              {startup.supportPrograms && startup.supportPrograms.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="font-bold text-[#1a237e] mb-3">Support Programmes</h3>
                  <p className="text-xs text-gray-500 italic mb-3">Association / incubation — not government contracts.</p>
                  <div className="flex flex-wrap gap-2">
                    {startup.supportPrograms.map((p) => (
                      <Badge key={p} text={p} subtle />
                    ))}
                  </div>
                </div>
              )}

              {/* Solution Areas */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-[#1a237e] mb-4">Solution Areas</h3>
                <ul className="space-y-2">
                  {SOLUTION_AREAS.map((area) => {
                    const matched = startup.areas.includes(area.id);
                    return (
                      <li key={area.id} className={`flex items-center gap-3 text-sm rounded-lg px-3 py-2 ${matched ? "bg-green-50 border border-green-200" : "text-gray-400"}`}>
                        <span className={`font-bold text-base w-5 text-center flex-shrink-0 ${matched ? "text-green-600" : "text-gray-300"}`}>
                          {matched ? "✓" : "—"}
                        </span>
                        <span className={matched ? "font-semibold text-green-800" : "text-gray-400"}>
                          {area.label}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Apply CTA */}
              <div className="bg-[#1a237e] rounded-xl p-6 text-white">
                <h3 className="font-bold text-base mb-2">Apply to a Challenge</h3>
                <p className="text-white/75 text-sm mb-4 leading-relaxed">
                  Browse open government challenges and submit this startup's solution.
                </p>
                <Link
                  to="/challenges"
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#FF9933] text-white font-semibold rounded-lg hover:bg-[#e8871e] transition-colors no-underline text-sm"
                >
                  View Challenges <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Verification disclaimer */}
          <div className="mt-10 flex items-start gap-3 p-5 bg-white border border-gray-200 rounded-xl">
            <Info className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-gray-500 leading-relaxed">
              <strong className="text-gray-600">Verification note:</strong>{" "}
              Information compiled from publicly available company and institutional sources. Company-reported claims, performance figures and deployment information should be independently verified during formal government evaluation.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
