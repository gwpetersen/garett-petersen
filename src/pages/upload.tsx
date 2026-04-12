import React, { useEffect, useRef, useState, useCallback } from "react"
import { navigate } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout/layout"
import { isLoggedIn, isBrowser } from "../services/auth"

// ─── styled components ───────────────────────────────────────────────────────

const Page = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 24px 0 48px;
`

const Title = styled.h1`
  font-family: "Playfair Display", serif;
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 32px;
  color: #1a1a1a;
`

const Section = styled.div`
  margin-bottom: 24px;
`

const Label = styled.label`
  display: block;
  font-family: "Playfair Display", serif;
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #888;
  margin-bottom: 10px;
`

const ToggleRow = styled.div`
  display: flex;
  gap: 10px;
`

const VisibilityPill = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 12px;
  border-radius: 8px;
  border: 1.5px solid ${({ active }) => (active ? "#1a1a1a" : "#d0d0d0")};
  background: ${({ active }) => (active ? "#1a1a1a" : "transparent")};
  color: ${({ active }) => (active ? "white" : "#555")};
  font-family: "Playfair Display", serif;
  font-size: 0.82rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s ease;
`

const TypeaheadWrapper = styled.div`
  position: relative;
`

const CategoryInput = styled.input<{ open: boolean }>`
  width: 100%;
  padding: 12px 14px;
  border: 1.5px solid ${({ open }) => (open ? "#1a1a1a" : "#d0d0d0")};
  border-radius: ${({ open }) => (open ? "8px 8px 0 0" : "8px")};
  font-family: "Playfair Display", serif;
  font-size: 0.95rem;
  color: #1a1a1a;
  box-sizing: border-box;
  outline: none;
  transition: border-color 0.2s ease;
  background: white;

  &::placeholder {
    color: #bbb;
  }
`

const Dropdown = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin: 0;
  padding: 4px 0;
  list-style: none;
  background: white;
  border: 1.5px solid #1a1a1a;
  border-top: none;
  border-radius: 0 0 8px 8px;
  max-height: 220px;
  overflow-y: auto;
  z-index: 100;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
`

const DropdownItem = styled.li<{ highlighted: boolean; isNew: boolean }>`
  padding: 11px 14px;
  font-family: "Playfair Display", serif;
  font-size: 0.9rem;
  color: ${({ isNew }) => (isNew ? "#888" : "#1a1a1a")};
  background: ${({ highlighted }) => (highlighted ? "#f5f5f5" : "transparent")};
  cursor: pointer;
  transition: background 0.1s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: #f5f5f5;
  }

  span.badge {
    font-size: 0.65rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #aaa;
    background: #f0f0f0;
    padding: 2px 6px;
    border-radius: 4px;
  }
`

const FileLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 16px;
  border: 1.5px dashed #d0d0d0;
  border-radius: 8px;
  background: #fafafa;
  cursor: pointer;
  font-family: "Playfair Display", serif;
  font-size: 0.85rem;
  color: #888;
  box-sizing: border-box;
  transition: border-color 0.2s ease, background 0.2s ease;

  &:hover {
    border-color: #aaa;
    background: #f5f5f5;
  }
`

const HiddenInput = styled.input`
  display: none;
`

const Preview = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 8px;
  margin-top: 12px;
  display: block;
`

const UploadButton = styled.button<{ disabled: boolean }>`
  width: 100%;
  padding: 16px;
  background: ${({ disabled }) => (disabled ? "#e0e0e0" : "#1a1a1a")};
  color: ${({ disabled }) => (disabled ? "#aaa" : "white")};
  border: none;
  border-radius: 8px;
  font-family: "Playfair Display", serif;
  font-size: 0.85rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background 0.2s ease;
  margin-top: 8px;
`

const StatusMessage = styled.div<{ type: "success" | "error" }>`
  margin-top: 20px;
  padding: 14px 16px;
  border-radius: 8px;
  background: ${({ type }) => (type === "success" ? "#f0faf4" : "#fff0f0")};
  border: 1px solid ${({ type }) => (type === "success" ? "#b2dfcb" : "#ffc0c0")};
  color: ${({ type }) => (type === "success" ? "#2e7d52" : "#c0392b")};
  font-family: "Playfair Display", serif;
  font-size: 0.88rem;
  line-height: 1.5;
`

const Hint = styled.p`
  font-family: "Playfair Display", serif;
  font-size: 0.75rem;
  color: #aaa;
  margin-top: 8px;
  line-height: 1.5;
`

const ProgressBar = styled.div<{ pct: number }>`
  height: 3px;
  background: #eee;
  border-radius: 2px;
  margin-top: 16px;
  overflow: hidden;

  &::after {
    content: "";
    display: block;
    height: 100%;
    width: ${({ pct }) => pct}%;
    background: #1a1a1a;
    transition: width 0.3s ease;
  }
`

// ─── helpers ─────────────────────────────────────────────────────────────────

function getCredentials() {
  try {
    const stored = JSON.parse(
      window.localStorage.getItem("gatsbyUser") ?? "{}"
    )
    return {
      "x-site-user": stored.username ?? "",
      "x-site-pass": stored.password ?? "",
    }
  } catch {
    return { "x-site-user": "", "x-site-pass": "" }
  }
}

// ─── main component ───────────────────────────────────────────────────────────

type UploadStatus = "idle" | "uploading" | "success" | "error"

export default function UploadPage() {
  useEffect(() => {
    if (isBrowser() && !isLoggedIn()) navigate("/login")
  })

  if (!isLoggedIn()) return <Layout><div /></Layout>

  return (
    <Layout>
      <Page>
        <Title>Upload Photo</Title>
        <UploadForm />
      </Page>
    </Layout>
  )
}

function UploadForm() {
  const [visibility, setVisibility] = useState<"public" | "private">("public")
  const [category, setCategory] = useState("")
  const [categories, setCategories] = useState<string[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [status, setStatus] = useState<UploadStatus>("idle")
  const [progress, setProgress] = useState(0)
  const [errorMsg, setErrorMsg] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const typeaheadRef = useRef<HTMLDivElement>(null)

  // close dropdown on outside click
  useEffect(() => {
    const onOutsideClick = (e: MouseEvent) => {
      if (typeaheadRef.current && !typeaheadRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
        setHighlightedIndex(-1)
      }
    }
    document.addEventListener("mousedown", onOutsideClick)
    return () => document.removeEventListener("mousedown", onOutsideClick)
  }, [])

  const filteredCategories = categories.filter(c =>
    c.toLowerCase().includes(category.toLowerCase())
  )
  const showNewOption =
    category.trim().length > 0 &&
    /^[a-zA-Z0-9-]+$/.test(category.trim()) &&
    !categories.some(c => c.toLowerCase() === category.trim().toLowerCase())

  const dropdownItems = [
    ...filteredCategories,
    ...(showNewOption ? [`__new__`] : []),
  ]


  const selectCategory = useCallback((value: string) => {
    setCategory(value)
    setShowDropdown(false)
    setHighlightedIndex(-1)
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown) {
      if (e.key === "ArrowDown") setShowDropdown(true)
      return
    }
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setHighlightedIndex(i => Math.min(i + 1, dropdownItems.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setHighlightedIndex(i => Math.max(i - 1, 0))
    } else if (e.key === "Enter") {
      e.preventDefault()
      if (highlightedIndex >= 0 && dropdownItems[highlightedIndex]) {
        const val = dropdownItems[highlightedIndex]
        selectCategory(val === "__new__" ? category.trim() : val)
      } else {
        setShowDropdown(false)
      }
    } else if (e.key === "Escape") {
      setShowDropdown(false)
      setHighlightedIndex(-1)
    }
  }

  // fetch categories whenever visibility changes
  useEffect(() => {
    setCategories([])
    setCategory("")
    const creds = getCredentials()
    fetch(`/.netlify/functions/get-categories?visibility=${visibility}`, {
      headers: creds,
    })
      .then(r => r.json())
      .then(data => setCategories(data.categories ?? []))
      .catch(() => {/* non-fatal */})
  }, [visibility])

  const handleFile = (f: File | null) => {
    setFile(f)
    if (preview) URL.revokeObjectURL(preview)
    setPreview(f ? URL.createObjectURL(f) : null)
  }

  const canUpload = !!file && category.trim().length > 0 && /^[a-zA-Z0-9-]+$/.test(category.trim())

  const handleUpload = async () => {
    if (!file || !canUpload) return
    setStatus("uploading")
    setProgress(10)
    setErrorMsg("")

    try {
      const creds = getCredentials()

      // 1. get presigned URL
      const urlRes = await fetch("/.netlify/functions/get-upload-url", {
        method: "POST",
        headers: { ...creds, "Content-Type": "application/json" },
        body: JSON.stringify({
          visibility,
          category: category.trim().toLowerCase(),
          filename: file.name,
          contentType: file.type || "image/jpeg",
        }),
      })

      if (!urlRes.ok) {
        throw new Error(await urlRes.text())
      }

      const { url } = await urlRes.json()
      setProgress(30)

      // 2. PUT directly to S3
      const putRes = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": file.type || "image/jpeg" },
        body: file,
      })

      if (!putRes.ok) {
        throw new Error(`S3 upload failed (${putRes.status})`)
      }

      setProgress(80)

      // 3. trigger Netlify rebuild
      await fetch("/.netlify/functions/trigger-deploy", {
        method: "POST",
        headers: creds,
      })

      setProgress(100)
      setStatus("success")
      setFile(null)
      setPreview(null)
      setCategory("")
      if (fileInputRef.current) fileInputRef.current.value = ""
    } catch (err: any) {
      setStatus("error")
      setErrorMsg(err?.message ?? "Something went wrong. Please try again.")
    }
  }

  return (
    <div>
      {/* Visibility */}
      <Section>
        <Label>Gallery</Label>
        <ToggleRow>
          <VisibilityPill active={visibility === "public"} onClick={() => setVisibility("public")}>
            Public
          </VisibilityPill>
          <VisibilityPill active={visibility === "private"} onClick={() => setVisibility("private")}>
            Private
          </VisibilityPill>
        </ToggleRow>
      </Section>

      {/* Category */}
      <Section>
        <Label>Category</Label>
        <TypeaheadWrapper ref={typeaheadRef}>
          <CategoryInput
            open={showDropdown}
            value={category}
            onChange={e => {
              setCategory(e.target.value)
              setShowDropdown(true)
              setHighlightedIndex(-1)
            }}
            onFocus={() => setShowDropdown(true)}
            onKeyDown={handleKeyDown}
            placeholder="Select or type a new category"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
          />
          {showDropdown && dropdownItems.length > 0 && (
            <Dropdown>
              {dropdownItems.map((item, i) => {
                const isNew = item === "__new__"
                const label = isNew ? category.trim() : item
                return (
                  <DropdownItem
                    key={item}
                    highlighted={i === highlightedIndex}
                    isNew={isNew}
                    onMouseDown={e => {
                      e.preventDefault()
                      selectCategory(label)
                    }}
                    onMouseEnter={() => setHighlightedIndex(i)}
                  >
                    {label}
                    {isNew && <span className="badge">new</span>}
                  </DropdownItem>
                )
              })}
            </Dropdown>
          )}
        </TypeaheadWrapper>
        <Hint>Select existing or type a new name to create a category.</Hint>
      </Section>

      {/* File picker */}
      <Section>
        <Label>Photo</Label>
        <FileLabel htmlFor="photo-input">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          {file ? file.name : "Choose photo or take one"}
        </FileLabel>
        <HiddenInput
          id="photo-input"
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={e => handleFile(e.target.files?.[0] ?? null)}
        />
        {preview && <Preview src={preview} alt="preview" />}
        <Hint>iPhone tip: Settings → Camera → Formats → Most Compatible (JPEG) for best results.</Hint>
      </Section>

      {/* Upload */}
      <UploadButton
        disabled={!canUpload || status === "uploading"}
        onClick={handleUpload}
      >
        {status === "uploading" ? "Uploading…" : "Upload"}
      </UploadButton>

      {status === "uploading" && <ProgressBar pct={progress} />}

      {status === "success" && (
        <StatusMessage type="success">
          Uploaded successfully. The gallery will update in approximately 3 minutes once the site rebuilds.
        </StatusMessage>
      )}

      {status === "error" && (
        <StatusMessage type="error">
          {errorMsg}
        </StatusMessage>
      )}
    </div>
  )
}
