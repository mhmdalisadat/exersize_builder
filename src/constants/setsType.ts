export type SetType =
  | "straight"
  | "superset"
  | "triset"
  | "giant"
  | "drop"
  | "restPause"
  | "pyramid"
  | "fst7"
  | "cluster"
  | "circuit"
  | "hiit"
  | "preExhaust"
  | "postExhaust"
  | "tut"
  | "powerbuilding"
  | "mindMuscle";

interface SetTypeConfig {
  value: SetType;
  label: string;
  description: string;
  requiredFields: string[];
  minMovements: number;
  maxMovements: number;
  restTimeRange: {
    min: number;
    max: number;
    step: number;
  };
  setCountRange: {
    min: number;
    max: number;
  };
  repCountRange: {
    min: number;
    max: number;
  };
  weightRequired: boolean;
  tempoRequired: boolean;
  category: 'strength' | 'hypertrophy' | 'endurance' | 'specialized';
}

export const setTypeConfigs: Record<SetType, SetTypeConfig> = {
  straight: {
    value: "straight",
    label: "ست معمولی",
    description: "اجرای یک تمرین خاص در چند ست با تعداد تکرار مشخص",
    requiredFields: ['name', 'set_count', 'rep_count', 'weight', 'rest_time'],
    minMovements: 1,
    maxMovements: 1,
    restTimeRange: { min: 30, max: 300, step: 5 },
    setCountRange: { min: 1, max: 20 },
    repCountRange: { min: 1, max: 100 },
    weightRequired: true,
    tempoRequired: false,
    category: 'strength'
  },
  superset: {
    value: "superset",
    label: "سوپرست",
    description: "اجرای دو تمرین پشت سر هم بدون استراحت",
    requiredFields: ['name', 'set_count', 'rep_count', 'weight', 'rest_time'],
    minMovements: 2,
    maxMovements: 2,
    restTimeRange: { min: 30, max: 300, step: 5 },
    setCountRange: { min: 1, max: 10 },
    repCountRange: { min: 1, max: 50 },
    weightRequired: true,
    tempoRequired: false,
    category: 'hypertrophy'
  },
  triset: {
    value: "triset",
    label: "تری‌ست",
    description: "انجام سه تمرین متوالی بدون استراحت",
    requiredFields: ['name', 'set_count', 'rep_count', 'weight', 'rest_time'],
    minMovements: 3,
    maxMovements: 3,
    restTimeRange: { min: 30, max: 300, step: 5 },
    setCountRange: { min: 1, max: 8 },
    repCountRange: { min: 1, max: 30 },
    weightRequired: true,
    tempoRequired: false,
    category: 'hypertrophy'
  },
  giant: {
    value: "giant",
    label: "جاینت ست",
    description: "اجرای 4 تمرین یا بیشتر برای یک گروه عضلانی",
    requiredFields: ['name', 'set_count', 'rep_count', 'weight', 'rest_time'],
    minMovements: 4,
    maxMovements: 6,
    restTimeRange: { min: 30, max: 300, step: 5 },
    setCountRange: { min: 1, max: 6 },
    repCountRange: { min: 1, max: 20 },
    weightRequired: true,
    tempoRequired: false,
    category: 'hypertrophy'
  },
  drop: {
    value: "drop",
    label: "دراپ‌ست",
    description: "شروع با وزنه سنگین و کاهش وزنه بعد از ناتوانی",
    requiredFields: ['name', 'set_count', 'rep_count', 'weight', 'rest_time'],
    minMovements: 1,
    maxMovements: 1,
    restTimeRange: { min: 0, max: 60, step: 5 },
    setCountRange: { min: 1, max: 5 },
    repCountRange: { min: 1, max: 30 },
    weightRequired: true,
    tempoRequired: false,
    category: 'hypertrophy'
  },
  restPause: {
    value: "restPause",
    label: "رست-پاز",
    description: "انجام تا ناتوانی، استراحت کوتاه، و ادامه",
    requiredFields: ['name', 'set_count', 'rep_count', 'weight', 'rest_time'],
    minMovements: 1,
    maxMovements: 1,
    restTimeRange: { min: 10, max: 30, step: 5 },
    setCountRange: { min: 1, max: 5 },
    repCountRange: { min: 1, max: 50 },
    weightRequired: true,
    tempoRequired: false,
    category: 'strength'
  },
  pyramid: {
    value: "pyramid",
    label: "ست هرمی",
    description: "افزایش یا کاهش وزنه و تکرارها در هر ست",
    requiredFields: ['name', 'set_count', 'rep_count', 'weight', 'rest_time'],
    minMovements: 1,
    maxMovements: 1,
    restTimeRange: { min: 60, max: 300, step: 5 },
    setCountRange: { min: 3, max: 8 },
    repCountRange: { min: 1, max: 20 },
    weightRequired: true,
    tempoRequired: false,
    category: 'strength'
  },
  fst7: {
    value: "fst7",
    label: "FST-7",
    description: "7 ست با استراحت کوتاه برای کشش فاشیا",
    requiredFields: ['name', 'set_count', 'rep_count', 'weight', 'rest_time'],
    minMovements: 1,
    maxMovements: 1,
    restTimeRange: { min: 30, max: 45, step: 5 },
    setCountRange: { min: 7, max: 7 },
    repCountRange: { min: 8, max: 15 },
    weightRequired: true,
    tempoRequired: false,
    category: 'hypertrophy'
  },
  cluster: {
    value: "cluster",
    label: "کلسترال",
    description: "شکستن یک ست سنگین به چند مینی‌ست",
    requiredFields: ['name', 'set_count', 'rep_count', 'weight', 'rest_time'],
    minMovements: 1,
    maxMovements: 1,
    restTimeRange: { min: 10, max: 30, step: 5 },
    setCountRange: { min: 1, max: 5 },
    repCountRange: { min: 1, max: 5 },
    weightRequired: true,
    tempoRequired: false,
    category: 'strength'
  },
  circuit: {
    value: "circuit",
    label: "سیرکویت",
    description: "زنجیره‌ای از تمرینات مختلف با حداقل استراحت",
    requiredFields: ['name', 'set_count', 'rep_count', 'weight', 'rest_time'],
    minMovements: 3,
    maxMovements: 6,
    restTimeRange: { min: 0, max: 60, step: 5 },
    setCountRange: { min: 1, max: 5 },
    repCountRange: { min: 1, max: 30 },
    weightRequired: true,
    tempoRequired: false,
    category: 'endurance'
  },
  hiit: {
    value: "hiit",
    label: "HIIT",
    description: "تناوب بین فاز شدید و فاز استراحت",
    requiredFields: ['name', 'set_count', 'rep_count', 'rest_time'],
    minMovements: 1,
    maxMovements: 2,
    restTimeRange: { min: 10, max: 60, step: 5 },
    setCountRange: { min: 1, max: 10 },
    repCountRange: { min: 1, max: 50 },
    weightRequired: false,
    tempoRequired: false,
    category: 'endurance'
  },
  preExhaust: {
    value: "preExhaust",
    label: "پیش خستگی",
    description: "تمرین ایزوله قبل از تمرین ترکیبی",
    requiredFields: ['name', 'set_count', 'rep_count', 'weight', 'rest_time'],
    minMovements: 2,
    maxMovements: 2,
    restTimeRange: { min: 30, max: 90, step: 5 },
    setCountRange: { min: 1, max: 3 },
    repCountRange: { min: 1, max: 20 },
    weightRequired: true,
    tempoRequired: false,
    category: 'hypertrophy'
  },
  postExhaust: {
    value: "postExhaust",
    label: "پس خستگی",
    description: "تمرین ترکیبی قبل از تمرین ایزوله",
    requiredFields: ['name', 'set_count', 'rep_count', 'weight', 'rest_time'],
    minMovements: 2,
    maxMovements: 2,
    restTimeRange: { min: 30, max: 90, step: 5 },
    setCountRange: { min: 1, max: 3 },
    repCountRange: { min: 1, max: 20 },
    weightRequired: true,
    tempoRequired: false,
    category: 'hypertrophy'
  },
  tut: {
    value: "tut",
    label: "زمان تحت فشار",
    description: "افزایش مدت زمانی که عضله تحت فشار است",
    requiredFields: ['name', 'set_count', 'rep_count', 'weight', 'tempo'],
    minMovements: 1,
    maxMovements: 1,
    restTimeRange: { min: 60, max: 180, step: 5 },
    setCountRange: { min: 1, max: 5 },
    repCountRange: { min: 1, max: 15 },
    weightRequired: true,
    tempoRequired: true,
    category: 'hypertrophy'
  },
  powerbuilding: {
    value: "powerbuilding",
    label: "پاوربیلدینگ",
    description: "ترکیب قدرت و تمرینات حجمی",
    requiredFields: ['name', 'set_count', 'rep_count', 'weight', 'rest_time'],
    minMovements: 1,
    maxMovements: 1,
    restTimeRange: { min: 120, max: 300, step: 5 },
    setCountRange: { min: 1, max: 8 },
    repCountRange: { min: 1, max: 20 },
    weightRequired: true,
    tempoRequired: false,
    category: 'strength'
  },
  mindMuscle: {
    value: "mindMuscle",
    label: "تمرکز ذهن-عضله",
    description: "تمرکز بر ارتباط ذهن و عضله",
    requiredFields: ['name', 'set_count', 'rep_count', 'weight', 'tempo'],
    minMovements: 1,
    maxMovements: 1,
    restTimeRange: { min: 60, max: 180, step: 5 },
    setCountRange: { min: 1, max: 5 },
    repCountRange: { min: 1, max: 15 },
    weightRequired: true,
    tempoRequired: true,
    category: 'hypertrophy'
  }
};

export const setTypeOptions = Object.values(setTypeConfigs).map(config => ({
  value: config.value,
  label: config.label,
  description: config.description
}));