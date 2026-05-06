import { useState, useRef } from 'react'

export function useOrbNavigation() {
  const [isOrbActive,  setIsOrbActive]  = useState(false)
  const [activeNodeKey, setActiveNodeKey] = useState(null)
  const [frozenPath,   setFrozenPath]   = useState(null)
  const [arrived,      setArrived]      = useState(false)

  const activeNodeKeyRef = useRef(null)
  const targetSectionRef = useRef(null)

  function triggerOrb(nodeKey, sectionId, pathSnapshot) {
    activeNodeKeyRef.current = nodeKey
    targetSectionRef.current = sectionId
    setActiveNodeKey(nodeKey)
    setFrozenPath(pathSnapshot)
    setIsOrbActive(true)
    setArrived(false)
  }

  function handleArrived() {
    document.getElementById(targetSectionRef.current)?.scrollIntoView({ behavior: 'instant' })
    setArrived(true)
  }

  // Returns the active node key so caller can release the frozen edge
  function handleComplete() {
    const key = activeNodeKeyRef.current
    setIsOrbActive(false)
    setActiveNodeKey(null)
    setFrozenPath(null)
    setArrived(false)
    return key
  }

  return {
    isOrbActive,
    activeNodeKey,
    frozenPath,
    arrived,
    triggerOrb,
    handleArrived,
    handleComplete,
  }
}
