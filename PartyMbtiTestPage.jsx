import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronRight, ChevronLeft, RotateCcw, Sparkles } from 'lucide-react';

const parties = {
  A: {
    name: '관계·공존 정당',
    emoji: '🤝',
    color: 'bg-rose-100 text-rose-700',
    border: 'border-rose-200',
    desc: '친구들과 사이좋게 지내고, 서로 도우며 함께 웃는 반을 중요하게 생각해요.',
    slogan: '함께라서 더 좋은 우리 반!'
  },
  B: {
    name: '문화·즐거움 정당',
    emoji: '🎉',
    color: 'bg-amber-100 text-amber-700',
    border: 'border-amber-200',
    desc: '재미있는 활동, 축제, 체육, 취미처럼 신나고 활기찬 학교생활을 중요하게 생각해요.',
    slogan: '즐거움이 살아있는 우리 반!'
  },
  C: {
    name: '성장·미래 정당',
    emoji: '🚀',
    color: 'bg-sky-100 text-sky-700',
    border: 'border-sky-200',
    desc: '배움, 도전, 실력 키우기처럼 스스로 성장하는 기회를 중요하게 생각해요.',
    slogan: '오늘보다 내일 더 성장하는 우리 반!'
  },
  D: {
    name: '안전·지속가능 정당',
    emoji: '🌿',
    color: 'bg-emerald-100 text-emerald-700',
    border: 'border-emerald-200',
    desc: '다치지 않는 환경, 건강한 교실, 깨끗한 공간처럼 모두가 편안한 반을 중요하게 생각해요.',
    slogan: '안전하고 건강한 우리 반!'
  },
  E: {
    name: '공정·질서 정당',
    emoji: '⚖️',
    color: 'bg-violet-100 text-violet-700',
    border: 'border-violet-200',
    desc: '규칙이 공평하게 지켜지고, 모두에게 같은 기준이 적용되는 반을 중요하게 생각해요.',
    slogan: '약속이 지켜지는 우리 반!'
  }
};

const questions = [
  {
    id: 1,
    title: '뉴스를 본다면 어떤 이야기에 제일 눈길이 갈까요?',
    options: shuffle([
      { text: '친구들 사이에 갈등이 생겼다는 이야기', type: 'A' },
      { text: '유명한 사람이 즐거운 소식을 전하는 이야기', type: 'B' },
      { text: '새로운 직업이나 꿈을 소개하는 이야기', type: 'C' },
      { text: '사고나 위험한 상황이 발생한 이야기', type: 'D' },
      { text: '약속을 지키지 않아 문제가 생긴 이야기', type: 'E' }
    ])
  },
  {
    id: 2,
    title: '새로운 채널이 생긴다면 무엇이 가장 궁금할까요?',
    options: shuffle([
      { text: '사람이나 동물과 함께하는 따뜻한 이야기', type: 'A' },
      { text: '취미나 재미있는 활동을 보여주는 채널', type: 'B' },
      { text: '공부나 새로운 지식을 쉽게 알려주는 채널', type: 'C' },
      { text: '건강하고 안전하게 생활하는 방법을 알려주는 채널', type: 'D' },
      { text: '상황을 비교하고 판단하는 내용을 다루는 채널', type: 'E' }
    ])
  },
  {
    id: 3,
    title: '여행을 갔을 때 가장 아쉬울 것 같은 상황은?',
    options: shuffle([
      { text: '같이 간 친구와 어색해지는 순간', type: 'A' },
      { text: '생각보다 재미가 없는 여행', type: 'B' },
      { text: '새롭게 해볼 것이 없는 여행', type: 'C' },
      { text: '불편하거나 걱정되는 환경', type: 'D' },
      { text: '정해둔 계획이 잘 지켜지지 않는 상황', type: 'E' }
    ])
  },
  {
    id: 4,
    title: '다음 중 가장 끌리는 영화는?',
    options: shuffle([
      { text: '친구와의 관계가 깊어지는 이야기', type: 'A' },
      { text: '웃고 즐길 수 있는 모험 이야기', type: 'B' },
      { text: '주인공이 점점 변화하는 이야기', type: 'C' },
      { text: '위기 속에서 사람들을 지켜내는 이야기', type: 'D' },
      { text: '옳고 그름을 고민하게 만드는 이야기', type: 'E' }
    ])
  },
  {
    id: 5,
    title: '내가 해보고 싶은 학교 활동은?',
    options: shuffle([
      { text: '친구를 도와주거나 함께 활동하기', type: 'A' },
      { text: '행사나 재미있는 활동을 준비하기', type: 'B' },
      { text: '무언가를 배우거나 만들어보기', type: 'C' },
      { text: '안전하고 쾌적한 환경 만들기', type: 'D' },
      { text: '모두가 지킬 수 있는 약속 만들기', type: 'E' }
    ])
  },
  {
    id: 6,
    title: '우리 학교에 가장 먼저 생기면 좋을 것은?',
    options: shuffle([
      { text: '편하게 이야기할 수 있는 공간', type: 'A' },
      { text: '즐겁게 놀 수 있는 시설', type: 'B' },
      { text: '배움을 도와주는 도구', type: 'C' },
      { text: '건강과 안전을 위한 시설', type: 'D' },
      { text: '공평하게 운영되는 규칙 시스템', type: 'E' }
    ])
  },
  {
    id: 7,
    title: '게임 캐릭터를 고른다면?',
    options: shuffle([
      { text: '친구들과 잘 어울리는 캐릭터', type: 'A' },
      { text: '눈에 띄고 멋있는 캐릭터', type: 'B' },
      { text: '점점 성장하는 캐릭터', type: 'C' },
      { text: '오래 버티고 안정적인 캐릭터', type: 'D' },
      { text: '균형 잡힌 능력을 가진 캐릭터', type: 'E' }
    ])
  },
  {
    id: 8,
    title: '우리 반에 필요하다고 생각하는 것은?',
    options: shuffle([
      { text: '서로를 더 이해하는 시간', type: 'A' },
      { text: '즐겁게 활동하는 기회', type: 'B' },
      { text: '배움을 더 재미있게 만드는 방법', type: 'C' },
      { text: '위험하지 않은 생활 환경', type: 'D' },
      { text: '모두에게 같은 기준이 적용되는 규칙', type: 'E' }
    ])
  }
];

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function getResult(scores) {
  const entries = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const topScore = entries[0][1];
  const winners = entries.filter(([, score]) => score === topScore);
  return winners[0][0];
}

export default function PartyMbtiTestPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);

  const currentQuestion = questions[step];
  const isFinished = step >= questions.length;

  const scores = useMemo(() => {
    const base = { A: 0, B: 0, C: 0, D: 0, E: 0 };
    answers.forEach((type) => {
      base[type] += 1;
    });
    return base;
  }, [answers]);

  const resultKey = isFinished ? getResult(scores) : null;
  const result = resultKey ? parties[resultKey] : null;

  const handleNext = () => {
    if (!selected) return;
    const nextAnswers = [...answers, selected];
    setAnswers(nextAnswers);
    setSelected(null);
    setStep((prev) => prev + 1);
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers([]);
    setSelected(null);
  };

  const handlePrev = () => {
    if (step === 0) return;
    const prevSelected = answers[step - 1];
    const newAnswers = answers.slice(0, -1);
    setAnswers(newAnswers);
    setStep((prev) => prev - 1);
    setSelected(prevSelected);
  };

  const progress = (answers.length / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-indigo-50 p-4 md:p-8">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card className="rounded-3xl border-0 shadow-xl bg-white/90 backdrop-blur">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Sparkles className="h-4 w-4" />
                살기 좋은 우리 반을 위한 정당 찾기
              </div>
              <CardTitle className="text-2xl md:text-4xl font-black tracking-tight text-slate-800">
                나는 어떤 정당 스타일일까?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                나의 선택으로 내가 중요하게 생각하는 가치를 알아보아요.
                <br />
                질문을 읽고 <span className="font-semibold">가장 마음이 끌리는 보기</span>를 하나씩 눌러 보세요.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {!isFinished && (
          <div className="mb-5 space-y-2">
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>
                {step + 1} / {questions.length} 문항
              </span>
              <span>{Math.round(progress)}% 진행</span>
            </div>
            <Progress value={progress} className="h-3 rounded-full" />
          </div>
        )}

        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="rounded-3xl border-0 shadow-xl bg-white">
                <CardHeader>
                  <Badge className="w-fit rounded-full px-3 py-1 text-sm bg-slate-100 text-slate-700 hover:bg-slate-100">
                    질문 {currentQuestion.id}
                  </Badge>
                  <CardTitle className="text-xl md:text-2xl leading-snug text-slate-800">
                    {currentQuestion.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {currentQuestion.options.map((option, idx) => {
                    const info = parties[option.type];
                    const active = selected === option.type;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelected(option.type)}
                        className={`w-full rounded-2xl border-2 p-4 text-left transition-all ${
                          active
                            ? `${info.border} ${info.color} shadow-md scale-[1.01]`
                            : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="text-2xl">{idx + 1}</div>
                          <div className="flex-1">
                            <div className="font-semibold text-slate-800">{option.text}</div>
                          </div>
                          {active && <CheckCircle2 className="h-5 w-5 text-slate-700 mt-1" />}
                        </div>
                      </button>
                    );
                  })}

                  <div className="pt-3 flex justify-between">
                    <Button
                      onClick={handlePrev}
                      disabled={step === 0}
                      variant="outline"
                      className="rounded-2xl px-5 py-5 text-base font-semibold"
                    >
                      <ChevronLeft className="mr-1 h-4 w-4" />
                      이전으로
                    </Button>

                    <Button
                      onClick={handleNext}
                      disabled={!selected}
                      className="rounded-2xl px-6 py-6 text-base font-semibold"
                    >
                      다음으로
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-5"
            >
              <Card className={`rounded-3xl border-2 ${result.border} shadow-2xl bg-white overflow-hidden`}>
                <div className={`p-6 md:p-8 ${result.color}`}>
                  <div className="text-5xl mb-3">{result.emoji}</div>
                  <div className="text-sm font-semibold mb-2">테스트 결과</div>
                  <h2 className="text-2xl md:text-4xl font-black mb-3">당신은 {result.name}!</h2>
                  <p className="text-base md:text-lg leading-relaxed max-w-2xl">{result.desc}</p>
                </div>
                <CardContent className="p-6 md:p-8 space-y-6">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="text-sm text-slate-500 mb-1">우리 정당의 한마디</div>
                    <div className="text-xl font-bold text-slate-800">“{result.slogan}”</div>
                  </div>

                  <div>
                    <div className="text-lg font-bold text-slate-800 mb-3">나의 정당 점수</div>
                    <div className="grid gap-3">
                      {Object.entries(scores)
                        .sort((a, b) => b[1] - a[1])
                        .map(([key, score]) => {
                          const item = parties[key];
                          const width = `${(score / questions.length) * 100}%`;
                          return (
                            <div key={key} className="space-y-1">
                              <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2 text-slate-700">
                                  <span>{item.emoji}</span>
                                  <span>{item.name}</span>
                                </div>
                                <span className="font-semibold">{score}점</span>
                              </div>
                              <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                                <div className={`h-full ${item.color.split(' ')[0]}`} style={{ width }} />
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-slate-200 p-4">
                      <div className="font-bold text-slate-800 mb-2">이런 역할이 잘 어울려요</div>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {resultKey === 'A' && '친구 챙기기, 갈등 중재, 함께하는 활동 제안'}
                        {resultKey === 'B' && '축제 기획, 분위기 살리기, 즐거운 아이디어 내기'}
                        {resultKey === 'C' && '학습 도우미, 프로젝트 기획, 새로운 방법 찾기'}
                        {resultKey === 'D' && '안전 점검, 환경 지키기, 건강한 교실 만들기'}
                        {resultKey === 'E' && '규칙 정리, 공정한 기준 세우기, 약속 점검'}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 p-4">
                      <div className="font-bold text-slate-800 mb-2">정당 만들기 질문</div>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        우리 반에서 가장 먼저 바꾸고 싶은 것은 무엇인가요?
                        <br />
                        왜 그것이 중요하다고 생각하나요?
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button onClick={handleRestart} variant="outline" className="rounded-2xl">
                      <RotateCcw className="mr-2 h-4 w-4" />
                      다시 해보기
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
