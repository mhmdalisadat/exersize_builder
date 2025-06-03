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

export const setTypeOptions: {
  value: SetType;
  label: string;
  description: string;
}[] = [
  {
    value: "straight",
    label: "ست معمولی",
    description: "اجرای یک تمرین خاص در چند ست با تعداد تکرار مشخص",
  },
  {
    value: "superset",
    label: "سوپرست",
    description: "اجرای دو تمرین پشت سر هم بدون استراحت",
  },
  {
    value: "triset",
    label: "تری‌ست",
    description: "انجام سه تمرین متوالی بدون استراحت",
  },
  {
    value: "giant",
    label: "جاینت ست",
    description: "اجرای 4 تمرین یا بیشتر برای یک گروه عضلانی",
  },
  {
    value: "drop",
    label: "دراپ‌ست",
    description: "شروع با وزنه سنگین و کاهش وزنه بعد از ناتوانی",
  },
  {
    value: "restPause",
    label: "رست-پاز",
    description: "انجام تا ناتوانی، استراحت کوتاه، و ادامه",
  },
  {
    value: "pyramid",
    label: "ست هرمی",
    description: "افزایش یا کاهش وزنه و تکرارها در هر ست",
  },
  {
    value: "fst7",
    label: "FST-7",
    description: "7 ست با استراحت کوتاه برای کشش فاشیا",
  },
  {
    value: "cluster",
    label: "کلسترال",
    description: "شکستن یک ست سنگین به چند مینی‌ست",
  },
  {
    value: "circuit",
    label: "سیرکویت",
    description: "زنجیره‌ای از تمرینات مختلف با حداقل استراحت",
  },
  {
    value: "hiit",
    label: "HIIT",
    description: "تناوب بین فاز شدید و فاز استراحت",
  },
  {
    value: "preExhaust",
    label: "پیش خستگی",
    description: "تمرین ایزوله قبل از تمرین ترکیبی",
  },
  {
    value: "postExhaust",
    label: "پس خستگی",
    description: "تمرین ترکیبی قبل از تمرین ایزوله",
  },
  {
    value: "tut",
    label: "زمان تحت فشار",
    description: "افزایش مدت زمانی که عضله تحت فشار است",
  },
  {
    value: "powerbuilding",
    label: "پاوربیلدینگ",
    description: "ترکیب قدرت و تمرینات حجمی",
  },
  {
    value: "mindMuscle",
    label: "تمرکز ذهن-عضله",
    description: "تمرکز بر ارتباط ذهن و عضله",
  },
];
