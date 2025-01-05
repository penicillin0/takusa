import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from './Modal';
import { Sparkles, ArrowRight } from 'lucide-react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function OnboardingGuide({ isOpen, onClose }: Props) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step === 3) {
      navigate('/habits/new');
      onClose();
    } else {
      setStep(step + 1);
    }
  };

  const steps = [
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
      title: '準備は整いました',
      description:
        'あなたの習慣を記録する準備が整いました。早速、最初の習慣を登録してみましょう！',
      buttonText: '習慣を作成する',
    },
  ];

  const currentStep = steps[step - 1];

  return (
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
            {steps.map((_, index) => (
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
  );
}
