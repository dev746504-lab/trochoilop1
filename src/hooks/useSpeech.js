import { useCallback, useRef, useState } from 'react';

export function useSpeech() {
  const [muted, setMuted] = useState(false);
  const mutedRef = useRef(false);

  const speak = useCallback((text) => {
    if (mutedRef.current) return;
    try {
      if (!('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'vi-VN';
      utter.rate = 0.95;
      utter.pitch = 1.05;
      const voices = window.speechSynthesis.getVoices();
      const vi = voices.find((v) => v.lang && v.lang.toLowerCase().startsWith('vi'));
      if (vi) utter.voice = vi;
      window.speechSynthesis.speak(utter);
    } catch {
      // speech synthesis unavailable; fail silently
    }
  }, []);

  const toggleMuted = useCallback(() => {
    setMuted((m) => {
      const next = !m;
      mutedRef.current = next;
      if (next && 'speechSynthesis' in window) window.speechSynthesis.cancel();
      return next;
    });
  }, []);

  return { muted, mutedRef, speak, toggleMuted };
}
