import { useCallback, useRef, useState } from 'react';

// Voice narration (Google/Web Speech API) has been disabled site-wide.
// `speak` is kept as a no-op so call sites don't need to change, and
// `muted`/`mutedRef` still gate the synthesized sound effects in useAudio.
export function useSpeech() {
  const [muted, setMuted] = useState(false);
  const mutedRef = useRef(false);

  const speak = useCallback(() => {}, []);

  const toggleMuted = useCallback(() => {
    setMuted((m) => {
      const next = !m;
      mutedRef.current = next;
      return next;
    });
  }, []);

  return { muted, mutedRef, speak, toggleMuted };
}
