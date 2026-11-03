// Web Speech API wrapper for German Text-to-Speech & Speech Recognition

export interface SpeechRecognitionResultPayload {
  transcript: string;
  confidence: number;
  isFinal: boolean;
}

export class GermanSpeechSynthesizer {
  private static instance: GermanSpeechSynthesizer;
  private voices: SpeechSynthesisVoice[] = [];
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private isMuted: boolean = false;
  private rate: number = 0.95; // Default slightly measured for learning clarity

  private constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.loadVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        this.loadVoices();
      };
    }
  }

  public static getInstance(): GermanSpeechSynthesizer {
    if (!GermanSpeechSynthesizer.instance) {
      GermanSpeechSynthesizer.instance = new GermanSpeechSynthesizer();
    }
    return GermanSpeechSynthesizer.instance;
  }

  private loadVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    this.voices = window.speechSynthesis.getVoices();
    // Prioritize natural German voices
    const deVoice = this.voices.find(
      (v) => (v.lang.startsWith('de') || v.lang.includes('DE')) && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Anna') || v.name.includes('Markus'))
    ) || this.voices.find((v) => v.lang.startsWith('de') || v.lang.includes('DE'));

    if (deVoice) {
      this.selectedVoice = deVoice;
    }
  }

  public setRate(newRate: number) {
    this.rate = Math.max(0.6, Math.min(1.5, newRate));
  }

  public getRate(): number {
    return this.rate;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  public speak(text: string, onEnd?: () => void, slow: boolean = false): void {
    if (this.isMuted || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      return;
    }

    window.speechSynthesis.cancel(); // Stop any pending speech

    const cleanText = text.replace(/[\[\]\(\)\*]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'de-DE';
    utterance.rate = slow ? 0.72 : this.rate;
    utterance.pitch = 1.0;

    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }

    utterance.onend = () => {
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);
  }

  public stop(): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export type SpeechRecognitionStatus = 'idle' | 'listening' | 'processing' | 'unsupported' | 'permission-denied' | 'error';

export interface SpeechRecognitionHandler {
  start: () => void;
  stop: () => void;
  abort: () => void;
  isSupported: boolean;
}

export function createGermanSpeechRecognizer(callbacks: {
  onStart?: () => void;
  onResult: (result: SpeechRecognitionResultPayload) => void;
  onError?: (errorMessage: string) => void;
  onEnd?: () => void;
}): SpeechRecognitionHandler {
  if (typeof window === 'undefined') {
    return {
      start: () => {},
      stop: () => {},
      abort: () => {},
      isSupported: false,
    };
  }

  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    return {
      start: () => {
        if (callbacks.onError) callbacks.onError('Speech Recognition is not supported in this browser. Please use Google Chrome, Edge, or use text input.');
      },
      stop: () => {},
      abort: () => {},
      isSupported: false,
    };
  }

  let recognition: any = null;

  try {
    recognition = new SpeechRecognition();
    recognition.lang = 'de-DE';
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      if (callbacks.onStart) callbacks.onStart();
    };

    recognition.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const item = event.results[i];
        if (item.isFinal) {
          finalTranscript += item[0].transcript;
        } else {
          interimTranscript += item[0].transcript;
        }
      }

      const activeTranscript = finalTranscript || interimTranscript;
      callbacks.onResult({
        transcript: activeTranscript,
        confidence: event.results[0] ? event.results[0][0].confidence : 0.9,
        isFinal: Boolean(finalTranscript),
      });
    };

    recognition.onerror = (event: any) => {
      console.warn('Speech recognition error event:', event.error);
      let errorMsg = 'Speech recognition error.';
      if (event.error === 'not-allowed') {
        errorMsg = 'Microphone permission denied. Please allow microphone access in your browser settings.';
      } else if (event.error === 'no-speech') {
        errorMsg = 'No speech detected. Please speak clearly into your microphone.';
      } else if (event.error === 'network') {
        errorMsg = 'Network error during speech recognition.';
      }
      if (callbacks.onError) callbacks.onError(errorMsg);
    };

    recognition.onend = () => {
      if (callbacks.onEnd) callbacks.onEnd();
    };
  } catch (err: any) {
    console.error('Failed to instantiate SpeechRecognition:', err);
  }

  return {
    start: () => {
      try {
        recognition?.start();
      } catch (e: any) {
        // Recognition already started or aborted
        console.warn('Recognition start caught:', e);
      }
    },
    stop: () => {
      try {
        recognition?.stop();
      } catch (e) {
        // Ignore
      }
    },
    abort: () => {
      try {
        recognition?.abort();
      } catch (e) {
        // Ignore
      }
    },
    isSupported: true,
  };
}
