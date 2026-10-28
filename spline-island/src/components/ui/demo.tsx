'use client'

import { useEffect, useState } from "react"
import { SplineScene } from "@/components/ui/splite"
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"

type Lang = "en" | "fr" | "bm"

const CONTENT: Record<Lang, { title: string; desc: string }> = {
  fr: {
    title: "L’Avenir du Monde",
    desc: "L’avenir du monde se trouve dans la jeunesse africaine formée à l’utilisation des nouvelles technologies.",
  },
  en: {
    title: "The Future of the World",
    desc: "The future of the world lies in African youth trained in the use of new technologies.",
  },
  bm: {
    title: "Duniya ka Siniɲasigi",
    desc: "Duniya siniɲasigi bɛ Farafinna denmisɛnw de bolo minnu kalanna teknolɔki kura waleyali la.",
  },
}

function getInitialLang(): Lang {
  if (typeof document !== "undefined") {
    const docLang = document.documentElement.lang?.toLowerCase() as Lang
    if (docLang === "fr" || docLang === "bm" || docLang === "en") return docLang
    try {
      const stored = localStorage.getItem("baara_lang")?.toLowerCase() as Lang
      if (stored === "fr" || stored === "bm" || stored === "en") return stored
    } catch {
      // ignore
    }
  }
  return "en"
}

export function SplineSceneBasic() {
  const [lang, setLang] = useState<Lang>(getInitialLang)

  useEffect(() => {
    const sync = () => {
      const cur = getInitialLang()
      setLang(cur)
    }
    sync()

    const observer = new MutationObserver(() => sync())
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    })

    const handleCustom = (e: Event) => {
      const detailLang = (e as CustomEvent<{ lang?: Lang }>)?.detail?.lang
      if (detailLang && CONTENT[detailLang]) {
        setLang(detailLang)
      } else {
        sync()
      }
    }
    window.addEventListener("baara:lang-change", handleCustom)

    return () => {
      observer.disconnect()
      window.removeEventListener("baara:lang-change", handleCustom)
    }
  }, [])

  const content = CONTENT[lang] || CONTENT.en

  return (
    <Card className="w-full min-h-[500px] md:h-[500px] bg-black/[0.96] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      
      <div className="flex h-full flex-col md:flex-row">
        {/* Left content */}
        <div className="flex-1 p-6 md:p-8 relative z-10 flex flex-col justify-center">
          <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            {content.title}
          </h1>
          <p className="mt-4 text-neutral-300 max-w-lg leading-relaxed text-base md:text-lg">
            {content.desc}
          </p>
        </div>

        {/* Right content */}
        <div className="flex-1 relative min-h-[280px] md:min-h-full">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </Card>
  )
}
