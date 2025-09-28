"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { DELIVERY_WINDOWS, SERVICES, type ServiceId } from "@/lib/data";

type Region = "in" | "global";

const REGION_LABELS: Record<Region, string> = {
  in: "INR - Indian Rupee",
  global: "USD - United States Dollar",
};

const DOCUMENT_TYPES = [
  "Research Paper",
  "Case Report",
  "Manuscript",
  "Thesis/Dissertation",
  "Review Paper",
  "Technical Reports",
  "Others",
];

const SERVICE_LABELS: Record<ServiceId, string> = {
  proofreading: "Proofreading",
  substantive: "Substantive Editing",
  rewriting: "Rewriting",
};

const MAX_FILES = 5;

export function QuoteForm() {
  const [region, setRegion] = useState<Region>("global");
  const [service, setService] = useState<ServiceId>("substantive");
  const [wordCountInput, setWordCountInput] = useState<string>("");
  const [wordCount, setWordCount] = useState<number>(0);
  const [files, setFiles] = useState<File[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [needsCertificate, setNeedsCertificate] = useState<"yes" | "no" | "">("");
  const [manuscriptTitle, setManuscriptTitle] = useState("");
  const [authorNames, setAuthorNames] = useState("");
  const [englishVariant, setEnglishVariant] = useState<"british" | "us" | "">("");
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const detailsRef = useRef<HTMLDivElement | null>(null);
  const deliveryRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const locale = Intl.DateTimeFormat().resolvedOptions().locale.toLowerCase();
    if (locale.includes("in")) {
      setRegion("in");
    }
  }, []);

  useEffect(() => {
    if (!expanded) return;
    requestAnimationFrame(() => {
      deliveryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [expanded]);

  const activeRegion: Region = useMemo(() => {
    return region;
  }, [region]);

  const { priceLabel, deliveryLabel } = useMemo(() => {
    const serviceInfo = SERVICES.find((item) => item.id === service);
    if (!serviceInfo) {
      return { priceLabel: "-", deliveryLabel: "-" };
    }

    const sanitizedCount = wordCount;
    const rate = activeRegion === "in" ? serviceInfo.rateINR : serviceInfo.rateUSD;
    const price = sanitizedCount * rate;
    const formattedPrice = new Intl.NumberFormat(activeRegion === "in" ? "en-IN" : "en-US", {
      style: "currency",
      currency: activeRegion === "in" ? "INR" : "USD",
      minimumFractionDigits: 2,
    }).format(price);

    const deliveryBand = DELIVERY_WINDOWS[service]
      .slice()
      .sort((a, b) => a.min - b.min)
      .find((band) => sanitizedCount > 0 && sanitizedCount <= band.max);

    const delivery = sanitizedCount === 0
      ? "Enter word count"
      : deliveryBand
        ? `${deliveryBand.hours} hours from payment`
        : "Contact support";

    return {
      priceLabel: formattedPrice,
      deliveryLabel: delivery,
    };
  }, [service, wordCount, activeRegion]);

  const handleFiles = (list: FileList | null) => {
    if (!list) return;
    const acceptedTypes = [
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
      "text/plain",
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "application/vnd.ms-powerpoint",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    const filtered = Array.from(list)
      .filter((file) => acceptedTypes.some((type) => file.type === type))
      .slice(0, MAX_FILES);
    setFiles(filtered);
  };

  const markTouched = (field: string) =>
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));

  const showError = (field: string) => touched[field];

  return (
    <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:p-10">
      <div className="space-y-6">
        <form className="space-y-6" onSubmit={(event) => event.preventDefault()}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-slate-700">
                Select service <span className="text-red-500">*</span>
              </span>
              <select
                value={service}
                onChange={(event) => setService(event.target.value as ServiceId)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#174091] focus:ring-2 focus:ring-[#174091]/20"
              >
                {Object.entries(SERVICE_LABELS).map(([id, label]) => (
                  <option key={id} value={id}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-slate-700">
                Word count <span className="text-red-500">*</span>
              </span>
              <input
                type="number"
                min={0}
                max={10000}
                step={1}
                value={wordCountInput}
                onBlur={() => markTouched("wordCount")}
                onChange={(event) => {
                  const { value, valueAsNumber } = event.target;
                  setWordCountInput(value);
                  if (Number.isNaN(valueAsNumber)) {
                    setWordCount(0);
                  } else {
                    setWordCount(Math.max(Math.floor(valueAsNumber), 0));
                  }
                }}
                placeholder="Enter word count"
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#174091] focus:ring-2 focus:ring-[#174091]/20"
              />
              {showError("wordCount") && wordCount === 0 && (
                <span className="text-xs text-red-500">Enter a valid word count.</span>
              )}
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1 sm:col-span-1">
              <span className="text-sm font-medium text-slate-700">Currency</span>
              <select
                value={region}
                onChange={(event) => setRegion(event.target.value as Region)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#174091] focus:ring-2 focus:ring-[#174091]/20"
              >
                {Object.entries(REGION_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            {expanded && (
              <label className="flex flex-col gap-1">
                <span className="text-sm font-medium text-slate-700">Document type</span>
                <select
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#174091] focus:ring-2 focus:ring-[#174091]/20"
                  defaultValue="Essay"
                >
                  {DOCUMENT_TYPES.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </label>
            )}
          </div>

          <div className="h-px bg-slate-200" />

          <dl ref={deliveryRef} className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-100 px-6 py-5 text-center">
              <dt className="text-sm text-slate-500">Your price</dt>
              <dd className="mt-2 text-2xl font-semibold text-[#174091]">{priceLabel}</dd>
            </div>
            <div className="rounded-2xl bg-slate-100 px-6 py-5 text-center">
              <dt className="text-sm text-slate-500">Estimated delivery</dt>
              <dd className="mt-2 text-lg font-semibold text-[#174091]">{deliveryLabel}</dd>
            </div>
          </dl>
          <div className="h-px bg-slate-200" />

          {expanded && (
            <div ref={detailsRef} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-slate-700">
                    Name <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="text"
                    placeholder="Aisha Kumar"
                    onBlur={() => markTouched("name")}
                    required
                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#174091] focus:ring-2 focus:ring-[#174091]/20"
                  />
                  {showError("name") && (
                    <span className="text-xs text-red-500">Name is required.</span>
                  )}
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-slate-700">
                    Email <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="email"
                    placeholder="aisha@example.com"
                    onBlur={() => markTouched("email")}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#174091] focus:ring-2 focus:ring-[#174091]/20"
                    required
                  />
                  {showError("email") && (
                    <span className="text-xs text-red-500">Email is required.</span>
                  )}
                </label>
              </div>

              <label className="flex flex-col gap-1">
                <span className="text-sm font-medium text-slate-700">
                  Instructions to editor <span className="text-red-500">*</span>
                </span>
                <textarea
                  placeholder="Share style preferences, reference documents, or audience notes."
                  rows={4}
                  onBlur={() => markTouched("instructions")}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#174091] focus:ring-2 focus:ring-[#174091]/20"
                  required
                />
                <span className="text-xs text-slate-500">
                  Word count is automatically calculated from uploads; any manual override is recorded.
                </span>
                {showError("instructions") && (
                  <span className="text-xs text-red-500">Provide editing instructions.</span>
                )}
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-slate-700">
                  Upload files (max 5) <span className="text-red-500">*</span>
                </span>
                <input
                  type="file"
                  accept=".docx,.doc,.txt,.pdf,.ppt,.pptx,.xls,.xlsx"
                  multiple
                  onChange={(event) => handleFiles(event.target.files)}
                  onBlur={() => markTouched("files")}
                  className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm text-slate-600 shadow-sm file:mr-4 file:rounded-lg file:border-0 file:bg-[#174091]/10 file:px-4 file:py-2 file:font-medium file:text-[#174091]"
                  required
                />
                <ul className="flex flex-wrap gap-2 text-xs text-slate-500">
                  {files.map((file) => (
                    <li key={file.name} className="rounded-lg bg-slate-100 px-3 py-1 text-slate-700">
                      {file.name}
                    </li>
                  ))}
                  {files.length === 0 && (
                    <li className="rounded-lg bg-slate-100 px-3 py-1 text-slate-400">
                      No files selected yet
                    </li>
                  )}
                </ul>
                <span className="text-xs text-slate-400">
                  Accepted formats: Word, PDF, plain text, PowerPoint, and Excel. Files are encrypted at rest instantly after upload.
                </span>
                {showError("files") && files.length === 0 && (
                  <span className="text-xs text-red-500">Please upload at least one file.</span>
                )}
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-slate-700">
                    Do you need an editing certificate? <span className="text-red-500">*</span>
                  </span>
                  <div className="flex gap-4">
                    {[
                      { value: "yes", label: "Yes" },
                      { value: "no", label: "No" },
                    ].map(({ value, label }) => (
                      <label key={value} className="flex items-center gap-2 text-sm text-slate-700">
                        <input
                          type="radio"
                          name="certificate"
                          value={value}
                          checked={needsCertificate === value}
                          onChange={(event) => {
                            setNeedsCertificate(event.target.value as "yes" | "no");
                            markTouched("certificate");
                          }}
                          className="h-4 w-4 accent-[#174091]"
                          required
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                  {showError("certificate") && needsCertificate === "" && (
                    <span className="text-xs text-red-500">Select an option.</span>
                  )}
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-slate-700">
                    Select English version <span className="text-red-500">*</span>
                  </span>
                  <div className="flex gap-4">
                    {[
                      { value: "british", label: "British" },
                      { value: "us", label: "US" },
                    ].map(({ value, label }) => (
                      <label key={value} className="flex items-center gap-2 text-sm text-slate-700">
                        <input
                          type="radio"
                          name="englishVariant"
                          value={value}
                          checked={englishVariant === value}
                          onChange={(event) => {
                            setEnglishVariant(event.target.value as "british" | "us");
                            markTouched("englishVariant");
                          }}
                          className="h-4 w-4 accent-[#174091]"
                          required
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                  {showError("englishVariant") && englishVariant === "" && (
                    <span className="text-xs text-red-500">Choose your preferred English version.</span>
                  )}
                </label>
              </div>

              {needsCertificate === "yes" && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-1">
                    <span className="text-sm font-medium text-slate-700">
                      Manuscript title <span className="text-red-500">*</span>
                    </span>
                    <input
                      type="text"
                      value={manuscriptTitle}
                      onChange={(event) => setManuscriptTitle(event.target.value)}
                      onBlur={() => markTouched("manuscriptTitle")}
                      className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#174091] focus:ring-2 focus:ring-[#174091]/20"
                      required
                    />
                    {showError("manuscriptTitle") && manuscriptTitle.trim() === "" && (
                      <span className="text-xs text-red-500">Manuscript title required.</span>
                    )}
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="text-sm font-medium text-slate-700">
                      Author names <span className="text-red-500">*</span>
                    </span>
                    <input
                      type="text"
                      value={authorNames}
                      onChange={(event) => setAuthorNames(event.target.value)}
                      onBlur={() => markTouched("authorNames")}
                      className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#174091] focus:ring-2 focus:ring-[#174091]/20"
                      required
                    />
                    {showError("authorNames") && authorNames.trim() === "" && (
                      <span className="text-xs text-red-500">Author names required.</span>
                    )}
                  </label>
                </div>
              )}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#174091] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#123271] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4d73cc]"
                >
                  Submit Document &amp; Pay
                </button>
                <p className="text-xs text-slate-500">
                  Payment confirmation moves the job to <span className="font-semibold text-teal-600">Paid</span> and alerts managers immediately.
                </p>
              </div>
            </div>
          )}
        </form>

        {!expanded ? (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="rounded-xl bg-[#2dd06f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#28bd64] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2dd06f]/60"
          >
            Submit Document
          </button>
        ) : (
          <p className="text-xs text-[#134074]">
            Complete the form to upload your files and finish checkout.
          </p>
        )}
      </div>
    </section>
  );
}
