import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from './Modal';
import { Sparkles, ArrowRight, Plus } from 'lucide-react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const STEPS = [
  {
    title: 'Takusaへようこそ！',
    description:
      '習慣を育てることで、あなたの未来も一緒に育っていきます。まずは最初の一歩を踏み出しましょう。',
    buttonText: '次へ',
  },
  {
    title: '最初の習慣を作りましょう',
    description:
      '毎日続けたい習慣を1つ決めましょう。例えば「朝の散歩」や「読書」など、小さな目標から始めるのがおすすめです。',
    buttonText: '次へ',
  },
  {
    title: '新しい習慣を追加',
    description:
      '右下の「+」ボタンから、あなたの最初の習慣を登録してみましょう！',
    buttonText: '了解！',
    showFabHighlight: true,
  },
];

export function OnboardingGuide({ isOpen, onClose }: Props) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step === 3) {
      onClose();
    } else {
      setStep(step + 1);
    }
  };

  const currentStep = STEPS[step - 1];

  if (!isOpen) return null;

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} showCloseButton={false}>
        <div className="p-6">
          <div className="mb-4 flex items-center justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
              <Sparkles className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
          <h3 className="mb-2 text-center text-xl font-semibold text-gray-900">
            {currentStep.title}
          </h3>
          <p className="mb-6 text-center text-gray-600">
            {currentStep.description}
          </p>
          <div className="space-y-3">
            <button
              onClick={handleNext}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition-colors hover:bg-indigo-700"
            >
              {currentStep.buttonText}
              <ArrowRight className="h-4 w-4" />
            </button>
            <div className="flex justify-center gap-2">
              {STEPS.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 w-8 rounded-full transition-colors ${
                    step === index + 1 ? 'bg-indigo-600' : 'bg-indigo-100'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </Modal>

      {/* FABのハイライト */}
      {currentStep.showFabHighlight && (
        <>
          {/* オーバーレイ */}
          <div className="fixed inset-0 z-[60] bg-black/60" />

          {/* FABハイライト */}
          <div className="fixed bottom-8 right-8 z-[70] sm:bottom-8 sm:right-8">
            {/* 吹き出し */}
            <div className="absolute bottom-[calc(100%+1rem)] right-0 w-48 rounded-lg bg-white p-3 text-sm shadow-lg">
              <div className="relative">
                ここをタップして習慣を追加！
                <div className="absolute -bottom-[0.9rem] right-6 h-3 w-3 rotate-45 bg-white" />
              </div>
            </div>

            {/* FABのモック */}
            <button
              onClick={() => {
                onClose();
                navigate('/habits/new');
              }}
              className="group flex h-14 w-14 animate-bounce cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-lg ring-4 ring-indigo-300 ring-offset-2 transition-transform hover:scale-105 active:scale-95 sm:h-16 sm:w-16"
            >
              <Plus className="h-6 w-6 transition-transform group-hover:rotate-90 sm:h-7 sm:w-7" />
            </button>
          </div>
        </>
      )}
    </>
  );
}
