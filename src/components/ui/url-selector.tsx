'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useOnboarding } from '@/context'
import { Check, X } from 'lucide-react'
import UrlLimitModal from '@/app/onboarding/modals/url-limit'
import { ModalTrigger } from './animated-modal'

const URL_LIMIT = 10

export default function UrlSelector() {
  const { urls, setUrls, foundUrls, setShowModal } = useOnboarding()

  const [isInitialized, setIsInitialized] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => setIsInitialized(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleUrlSelection = React.useCallback(
    (url: string) => {
      setUrls((prev) => {
        if (prev.includes(url)) return prev.filter((item) => item !== url)
        else {
          if (prev.length >= URL_LIMIT) {
            setShowModal('url-limit')
            return prev
          }

          return [...prev, url]
        }
      })
    },
    [urls]
  )

  const isUrlSelected = React.useCallback(
    (url: string) => {
      return urls.includes(url)
    },
    [urls]
  )

  return (
    <>
      <Command className="rounded-lg border">
        <CommandInput placeholder="URL keresése..." />
        <CommandList>
          <CommandEmpty>Nem található URL.</CommandEmpty>
          <CommandGroup>
            <ScrollArea className="h-[200px]">
              <AnimatePresence>
                {foundUrls && foundUrls.length > 0 ? (
                  foundUrls.map((url, index) => (
                    <motion.div
                      key={url}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInitialized ? { opacity: 1, y: 0 } : {}}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <CommandItem onSelect={() => handleUrlSelection(url)}>
                        <div className="flex items-center space-x-2">
                          <AnimatePresence mode="wait">
                            <div className="border p-1 rounded-md">
                              {isUrlSelected(url) ? (
                                <motion.div
                                  key="check"
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <Check className="size-4" />
                                </motion.div>
                              ) : (
                                <motion.div
                                  key="x"
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <div className="size-4"> </div>
                                </motion.div>
                              )}
                            </div>
                          </AnimatePresence>
                          <span>{url}</span>
                        </div>
                      </CommandItem>
                    </motion.div>
                  ))
                ) : (
                  <CommandItem>Nincsenek elérhető URL-ek.</CommandItem>
                )}
              </AnimatePresence>
            </ScrollArea>
          </CommandGroup>
        </CommandList>
      </Command>
    </>
  )
}
