"use client";

import React, { useState, useEffect } from "react";
import { Terminal, ShieldCheck, X, ChevronRight } from "lucide-react";
import { GAME_DEVELOPER_DATA } from "@/lib/game/gameData";
import { gameAudio } from "@/lib/game/gameAudio";

interface MainframePuzzleModalProps {
  onSuccess: () => void;
  onClose: () => void;
}

export default function MainframePuzzleModal({
  onSuccess,
  onClose,
}: MainframePuzzleModalProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const steps = GAME_DEVELOPER_DATA.debugPuzzle.steps;
  const currentStep = steps[currentStepIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleSelectOption = (idx: number) => {
    if (isAnswerChecked) return;
    gameAudio.playMenuClick();
    setSelectedOption(idx);
  };

  const handleVerify = () => {
    if (selectedOption === null) return;
    const isCorrect = currentStep.options[selectedOption].correct;

    setIsAnswerChecked(true);

    if (isCorrect) {
      gameAudio.playInteract();
      setFeedbackMsg(`✓ SOLUSI TEPAT: ${currentStep.explanation}`);
    } else {
      gameAudio.playMenuClick();
      setFeedbackMsg("✗ SOLUSI BELUM OPTIMAL: Pendekatan ini dapat memicu kegagalan runtime. Coba analisis kembali arsitekturnya!");
    }
  };

  const handleNextStep = () => {
    gameAudio.playMenuClick();
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
      setFeedbackMsg("");
    } else {
      setIsCompleted(true);
      gameAudio.playPuzzleSuccess();
      onSuccess();
    }
  };

  const handleRetry = () => {
    gameAudio.playMenuClick();
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setFeedbackMsg("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 overflow-y-auto select-none">
      {/* Backdrop */}
      <div
        className="fixed inset-0"
        onClick={() => {
          gameAudio.playMenuClick();
          onClose();
        }}
      />

      {/* Solid Retro Terminal Frame */}
      <div className="relative z-10 w-full max-w-xl bg-[#060a14] border-4 border-[#0891b2] p-5 sm:p-8 text-white shadow-[0_12px_40px_rgba(0,0,0,0.95)] my-auto">
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between pb-3.5 border-b-2 border-[#164e63] mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#082f49] border-2 border-[#0ea5e9] flex items-center justify-center text-[#38bdf8]">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-mono font-bold text-sm sm:text-base text-[#38bdf8] tracking-wider uppercase">
                [ MAINFRAME_DEBUG_TERMINAL.EXE ]
              </h3>
              <span className="text-[10px] font-mono text-[#64748b] block">
                PRODUCTION HOTFIX PROTOCOL // LEVEL 25 ARCHITECT
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              gameAudio.playMenuClick();
              onClose();
            }}
            className="w-8 h-8 bg-[#0c1929] border-2 border-[#164e63] hover:border-white text-[#94a3b8] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Puzzle Completion Screen */}
        {isCompleted ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 bg-[#064e3b] border-2 border-[#10b981] text-[#34d399] flex items-center justify-center mx-auto">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h4 className="font-mono font-bold text-lg sm:text-xl text-white uppercase">
              HOTFIX BERHASIL DIPUBLIKASIKAN!
            </h4>
            <p className="text-xs sm:text-sm text-[#cbd5e1] max-w-md mx-auto leading-relaxed font-sans">
              Selamat! Kamu berhasil memecahkan seluruh kendala bug produksi. Server Project Laboratory kembali stabil dan kamu mendapatkan reward <span className="font-bold text-[#f59e0b] font-mono">Production Master Key (+250 XP)</span>.
            </p>
            <button
              onClick={() => {
                gameAudio.playInteract();
                onClose();
              }}
              className="mt-4 px-5 py-2.5 bg-[#059669] hover:bg-[#10b981] active:translate-y-0.5 border-2 border-[#34d399] text-white font-mono text-xs font-bold transition-all cursor-pointer"
            >
              KLAIM REWARD & TUTUP TERMINAL
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Step Progress Blocks */}
            <div className="flex items-center gap-1.5 font-mono text-xs">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 py-1 text-center font-bold border ${
                    i < currentStepIndex
                      ? "bg-[#064e3b] border-[#10b981] text-[#34d399]"
                      : i === currentStepIndex
                      ? "bg-[#0c4a6e] border-[#38bdf8] text-white"
                      : "bg-[#0a0f1d] border-[#1e293b] text-[#475569]"
                  }`}
                >
                  PHASE {i + 1}
                </div>
              ))}
            </div>

            {/* Current Issue Prompt */}
            <div className="p-3.5 bg-[#071324] border-2 border-[#164e63]">
              <span className="text-[10px] font-mono font-bold text-[#38bdf8] block mb-1">
                KENDALA {currentStepIndex + 1} DARI {steps.length}:
              </span>
              <p className="text-xs sm:text-sm font-mono font-bold text-white leading-relaxed">
                {currentStep.issue}
              </p>
            </div>

            {/* Options List */}
            <div className="space-y-2">
              {currentStep.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const showSuccess = isAnswerChecked && isSelected && opt.correct;
                const showWrong = isAnswerChecked && isSelected && !opt.correct;

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-3 border-2 text-left text-xs font-mono transition-all cursor-pointer ${
                      showSuccess
                        ? "bg-[#064e3b] border-[#10b981] text-white"
                        : showWrong
                        ? "bg-[#450a0a] border-[#ef4444] text-[#fecaca]"
                        : isSelected
                        ? "bg-[#0c4a6e] border-[#38bdf8] text-white"
                        : "bg-[#080d19] border-[#1e293b] text-[#94a3b8] hover:border-[#38bdf8] hover:text-white"
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="font-bold text-[#38bdf8] shrink-0 mt-0.5">
                        [{String.fromCharCode(65 + idx)}]
                      </span>
                      <span className="leading-relaxed font-sans">{opt.text}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Feedback Message */}
            {isAnswerChecked && (
              <div
                className={`p-3 border-2 text-xs leading-relaxed font-sans ${
                  currentStep.options[selectedOption!].correct
                    ? "bg-[#064e3b] border-[#10b981] text-[#34d399]"
                    : "bg-[#450a0a] border-[#ef4444] text-[#fca5a5]"
                }`}
              >
                {feedbackMsg}
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 flex items-center justify-end gap-2">
              {!isAnswerChecked ? (
                <button
                  disabled={selectedOption === null}
                  onClick={handleVerify}
                  className="px-5 py-2.5 bg-[#0284c7] hover:bg-[#0369a1] active:translate-y-0.5 disabled:opacity-40 border-2 border-[#38bdf8] text-white font-mono text-xs font-bold transition-all cursor-pointer"
                >
                  EKSEKUSI SOLUSI [ENTER]
                </button>
              ) : currentStep.options[selectedOption!].correct ? (
                <button
                  onClick={handleNextStep}
                  className="px-5 py-2.5 bg-[#059669] hover:bg-[#10b981] active:translate-y-0.5 border-2 border-[#34d399] text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>
                    {currentStepIndex < steps.length - 1 ? "LANJUT TAHAP BERIKUTNYA" : "SELESAIKAN HOTFIX"}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleRetry}
                  className="px-5 py-2.5 bg-[#334155] hover:bg-[#475569] active:translate-y-0.5 border-2 border-[#64748b] text-white font-mono text-xs font-bold cursor-pointer"
                >
                  COBA PILIHAN LAIN
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
