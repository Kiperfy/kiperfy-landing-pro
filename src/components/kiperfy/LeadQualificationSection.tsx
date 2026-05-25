import { useState } from "react";
import { useLang } from "@/hooks/use-lang";
import type { CopyKey } from "@/lib/kiperfy-copy";
import { saveLeadResponse } from "@/lib/lead-qualification-storage";
import { cn } from "@/lib/utils";

type QuestionDef = { key: CopyKey; options: CopyKey[] };

const QUESTIONS: QuestionDef[] = [
  { key: "lead_q1", options: ["lead_q1_a", "lead_q1_b", "lead_q1_c", "lead_q1_d"] },
  { key: "lead_q2", options: ["lead_q2_a", "lead_q2_b", "lead_q2_c", "lead_q2_d"] },
  { key: "lead_q3", options: ["lead_q3_a", "lead_q3_b", "lead_q3_c", "lead_q3_d"] },
];

const TOTAL_QUESTIONS = QUESTIONS.length;

export function LeadQualificationSection() {
  const { t, lang } = useLang();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(["", "", ""]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onQuestion = step < TOTAL_QUESTIONS;
  const onForm = step === TOTAL_QUESTIONS && !submitted;
  const currentQ = QUESTIONS[step];

  const stepLabel = t("lead_step")
    .replace("{current}", String(Math.min(step + 1, TOTAL_QUESTIONS)))
    .replace("{total}", String(TOTAL_QUESTIONS));

  const selectOption = (value: string) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[step] = value;
      return next;
    });
  };

  const canNext = onQuestion && answers[step] !== "";
  const canSubmit = name.trim() !== "" && email.trim() !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    saveLeadResponse({
      lang,
      units: answers[0],
      challenge: answers[1],
      decision: answers[2],
      name: name.trim(),
      email: email.trim(),
      submittedAt: new Date().toISOString(),
    });
    setSubmitted(true);
    setStep(TOTAL_QUESTIONS + 1);
  };

  return (
    <section id="lead" className="border-y border-kiperfy-button/20 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-2xl px-6">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-kiperfy-text sm:text-4xl">
          {t("lead_title")}
        </h2>
        <p className="mt-4 text-center text-base text-kiperfy-grey sm:text-lg">{t("lead_subtitle")}</p>

        <div className="mt-10 rounded-2xl border border-kiperfy-button/25 bg-white p-6 shadow-md ring-1 ring-kiperfy-button/10 sm:p-8">
          {submitted ? (
            <p className="text-center text-base leading-relaxed text-kiperfy-text sm:text-lg">{t("lead_confirm")}</p>
          ) : (
            <>
              {onQuestion && currentQ && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-kiperfy-cyan">{stepLabel}</p>
                  <h3 className="mt-3 text-xl font-semibold text-kiperfy-text">{t(currentQ.key)}</h3>
                  <div className="mt-6 grid gap-2">
                    {currentQ.options.map((optKey) => {
                      const label = t(optKey);
                      const selected = answers[step] === label;
                      return (
                        <button
                          key={optKey}
                          type="button"
                          onClick={() => selectOption(label)}
                          className={cn(
                            "rounded-xl border-2 px-4 py-3 text-left text-sm font-semibold transition",
                            selected
                              ? "border-kiperfy-green bg-kiperfy-green/10 text-kiperfy-text"
                              : "border-kiperfy-button/30 text-kiperfy-grey hover:border-kiperfy-cyan",
                          )}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {onForm && (
                <form onSubmit={handleSubmit}>
                  <p className="text-xs font-semibold uppercase tracking-wide text-kiperfy-cyan">
                    {t("lead_step").replace("{current}", "3").replace("{total}", "3")}
                  </p>
                  <div className="mt-6 space-y-4">
                    <div>
                      <label htmlFor="lead-name" className="mb-1.5 block text-xs font-semibold text-kiperfy-text">
                        {t("lead_name")}
                      </label>
                      <input
                        id="lead-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="h-12 w-full rounded-xl border border-kiperfy-button/30 px-4 text-sm text-kiperfy-text outline-none focus:border-kiperfy-green focus:ring-2 focus:ring-kiperfy-green/20"
                      />
                    </div>
                    <div>
                      <label htmlFor="lead-email" className="mb-1.5 block text-xs font-semibold text-kiperfy-text">
                        {t("lead_email")}
                      </label>
                      <input
                        id="lead-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-12 w-full rounded-xl border border-kiperfy-button/30 px-4 text-sm text-kiperfy-text outline-none focus:border-kiperfy-green focus:ring-2 focus:ring-kiperfy-green/20"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className="mt-6 h-12 w-full rounded-xl bg-kiperfy-button text-sm font-semibold text-white shadow-md transition hover:bg-kiperfy-grey disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {t("lead_submit")}
                  </button>
                </form>
              )}

              {!submitted && (onQuestion || onForm) && (
                <div className="mt-8 flex items-center justify-between gap-3 border-t border-kiperfy-button/15 pt-6">
                  <button
                    type="button"
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                    disabled={step === 0}
                    className="rounded-full px-4 py-2 text-sm font-semibold text-kiperfy-grey transition hover:bg-kiperfy-button/15 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {t("lead_back")}
                  </button>
                  {onQuestion && (
                    <button
                      type="button"
                      onClick={() => setStep((s) => s + 1)}
                      disabled={!canNext}
                      className="rounded-full bg-kiperfy-button px-6 py-2.5 text-sm font-bold text-white transition hover:bg-kiperfy-grey disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {t("lead_next")}
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
