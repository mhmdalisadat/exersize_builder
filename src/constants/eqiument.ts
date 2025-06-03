const equipment = [
  {
    name: "Dumbbell",
    label: "دمبل",
  },
  {
    name: "Barbell",
    label: "هالتر",
  },
  {
    name: "Adjustable Bench",
    label: "نیمکت قابل تنظیم",
  },
  {
    name: "Flat Bench",
    label: "نیمکت صاف",
  },
  {
    name: "Incline Bench",
    label: "نیمکت شیب‌دار",
  },
  {
    name: "Decline Bench",
    label: "نیمکت شیب معکوس",
  },
  {
    name: "Power Rack",
    label: "قفسه قدرتی",
  },
  {
    name: "Squat Rack",
    label: "قفسه اسکوات",
  },
  {
    name: "Smith Machine",
    label: "خودکار هالتر (اسمیت ماشین)",
  },
  {
    name: "Leg Press Machine",
    label: "دستگاه پرس پا",
  },
  {
    name: "Hack Squat Machine",
    label: "دستگاه اسکوات هلتی",
  },
  {
    name: "Leg Extension Machine",
    label: "دستگاه پشت پا (اکستنشن پا)",
  },
  {
    name: "Leg Curl Machine",
    label: "دستگاه جلوپا (کرل پا)",
  },
  {
    name: "Calf Raise Machine",
    label: "دستگاه ساق پا",
  },
  {
    name: "Lat Pulldown Machine",
    label: "دستگاه لت",
  },
  {
    name: "Seated Row Machine",
    label: "دستگاه قایقی نشسته",
  },
  {
    name: "Cable Crossover Machine",
    label: "دستگاه کراس‌اور",
  },
  {
    name: "Chest Press Machine",
    label: "دستگاه پرس سینه",
  },
  {
    name: "Pec Deck Machine",
    label: "دستگاه فلای سینه (پک دک)",
  },
  {
    name: "Shoulder Press Machine",
    label: "دستگاه پرس شانه",
  },
  {
    name: "Smith Machine",
    label: "اسمیت ماشین",
  },
  {
    name: "Preacher Curl Bench",
    label: "نیمکت هالتر جلو بازو (پریچر کرل)",
  },
  {
    name: "Dip Station",
    label: "دستگاه دیپ",
  },
  {
    name: "Pull-Up Bar",
    label: "میله بارفیکس",
  },
  {
    name: "Cable Machine (Single Stack)",
    label: "دستگاه کابل تک استک",
  },
  {
    name: "Cable Machine (Dual Stack)",
    label: "دستگاه کابل دو استک",
  },
  {
    name: "Smith Machine with Cable Attachments",
    label: "اسمیت ماشین با اتصالات کابل",
  },
  {
    name: "Leg Drag Machine",
    label: "دستگاه لیفت پا (لیگ درگ)",
  },
  {
    name: "Roman Chair / Hyperextension Bench",
    label: "صندلی رومانیایی / دستگاه پشت کمر",
  },
  {
    name: "Smith Machine Squat to Press",
    label: "اسمیت ماشین اسکوات و پرس",
  },
  {
    name: "Landmine Attachment",
    label: "اتصال لندماین",
  },
  {
    name: "Kettlebell",
    label: "کتل‌بل",
  },
  {
    name: "Resistance Bands",
    label: "کش مقاومتی",
  },
  {
    name: "Pull-Through Cable",
    label: "کابل پول‌ترو",
  },
  {
    name: "Cable Tricep Pushdown Attachment",
    label: "اتصال کابل پشت بازو",
  },
  {
    name: "Dip Belt",
    label: "کمربند دیپ",
  },
  {
    name: "Weight Plates",
    label: "صفحه وزنه",
  },
  {
    name: "Plate Tree / Storage Rack",
    label: "استند نگهداری صفحه وزنه",
  },
  {
    name: "Adjustable Step Platform",
    label: "پلتفرم استپ قابل تنظیم",
  },
  {
    name: "Foam Roller",
    label: "فوم رولر",
  },
  {
    name: "Medicine Ball",
    label: "مدیسین بال",
  },
  {
    name: "Abdominal Crunch Machine",
    label: "دستگاه کرانچ شکم",
  },

  {
    name: "EZ Curl Bar",
    label: "میل خمیده",
  },
  {
    name: "Olympic Bar",
    label: "میل المپیکی",
  },
  {
    name: "Trap/Hex Bar",
    label: "میل تله‌ای/هگزاگون",
  },
  {
    name: "Cambered Bar",
    label: "میل منحنی شکل",
  },
  {
    name: "Safety Squat Bar",
    label: "میل اسکوات ایمنی",
  },
  {
    name: "Swiss/Football Bar",
    label: "میل سوئیسی/فوتبالی",
  },
  {
    name: "Buffalo Bar",
    label: "میل بوفالو",
  },
  {
    name: "Bumper Plates",
    label: "صفحه وزنه بامپر",
  },
  {
    name: "Glute-Ham Developer (GHD)",
    label: "دستگاه پشت‌باسن و همسترینگ",
  },
  {
    name: "Belt Squat Machine",
    label: "دستگاه اسکوات با کمربند",
  },
  {
    name: "Thigh Abductor/Adductor Machine",
    label: "دستگاه دورکن/نزدیک‌کننده ران",
  },
  {
    name: "Hip Thrust Bench",
    label: "نیمکت هیپ تراست",
  },
  {
    name: "Ab Wheel/Roller",
    label: "چرخ شکم",
  },
  {
    name: "Push-Up Bars/Handles",
    label: "دسته‌های شنا",
  },
  {
    name: "Parallettes",
    label: "پارالل کوچک",
  },
  {
    name: "Gymnastics Rings",
    label: "حلقه ژیمناستیک",
  },
  {
    name: "Power Tower",
    label: "برج قدرتی",
  },
  {
    name: "Battle Ropes",
    label: "طناب نبرد",
  },
  {
    name: "Plyometric Box",
    label: "جعبه پلیومتریک",
  },
  {
    name: "Sled/Prowler",
    label: "سِلِد/پراولر",
  },
  {
    name: "Sandbag",
    label: "کیسه شن",
  },
  {
    name: "Weighted Vest",
    label: "جلیقه وزنه‌دار",
  },
  {
    name: "Resistance Tubes/Bands",
    label: "لوله/کش مقاومتی",
  },
  {
    name: "TRX Suspension Trainer",
    label: "سیستم تعلیق TRX",
  },
  {
    name: "Dip Bars (Standalone)",
    label: "میله موازی ایستاده دیپ",
  },
  {
    name: "Pull-Up Assist Machine",
    label: "دستگاه کمکی بارفیکس",
  },
  {
    name: "Ankle Strap Attachment",
    label: "بند مچ پا برای کابل",
  },
  {
    name: "Tricep Rope Attachment",
    label: "بند کابل تمرین پشت بازو",
  },
  {
    name: "V-Bar Attachment",
    label: "بند کابل V شکل",
  },
  {
    name: "Lat Pulldown Bar (Straight)",
    label: "میله لت مستقیم",
  },
  {
    name: "D-Handle Attachment",
    label: "دسته D شکل برای کابل",
  },
  {
    name: "Single-Handle Attachment",
    label: "دسته تک برای کابل",
  },
  {
    name: "Abdominal Crunch Machine",
    label: "دستگاه کرانچ شکم",
  },
  {
    name: "Seated Calf Raise Machine",
    label: "دستگاه نشسته ساق پا",
  },
  {
    name: "Standing Calf Raise Machine",
    label: "دستگاه ایستاده ساق پا",
  },
  {
    name: "Hip Abductor/Adductor Machine",
    label: "دستگاه دورکن/نزدیک‌کننده لگن",
  },
  {
    name: "Glute Bridge Machine",
    label: "دستگاه گلوت بریج",
  },
  {
    name: "Lever Gym (Multi-Station)",
    label: "دستگاه بدنسازی چند ایستگاهه",
  },
  {
    name: "Smith Machine with Functional Trainer",
    label: "اسمیت ماشین با کارکرد چندمنظوره",
  },
  {
    name: "Power Sled with Harness",
    label: "سِلِد قدرتی با هارنس",
  },
  {
    name: "Landmine Attachment",
    label: "اتصال لندماین",
  },
  {
    name: "Dip Belt",
    label: "کمربند دیپ",
  },
  {
    name: "Weight Tree/Storage Rack",
    label: "استند نگهداری صفحه وزنه",
  },
  {
    name: "Gym Mat",
    label: "مت ورزشی",
  },
  {
    name: "Stretching Machine",
    label: "دستگاه کشش",
  },
  {
    name: "Adjustable Ab Bench",
    label: "نیمکت تنظیمی برای شکم",
  },
  {
    name: "Glute Ham Raise Machine",
    label: "دستگاه گلوت هم‌رِیز",
  },
  {
    name: "Roman Chair/Back Extension",
    label: "صندلی رومانیایی/دستگاه پشت کمر",
  },

  {
    name: "Weightlifting Belt",
    label: "کمربند وزنه‌برداری",
  },
  {
    name: "Wrist Wraps",
    label: "مچ‌بند",
  },
  {
    name: "Knee Sleeves",
    label: "آستین زانو",
  },
  {
    name: "Elbow Sleeves",
    label: "آستین آرنج",
  },
  {
    name: "Lifting Straps",
    label: "استرپ لیفتینگ",
  },
  {
    name: "Lifting Chalk",
    label: "پودر چاک",
  },
  {
    name: "Gym Gloves",
    label: "دستکش بدنسازی",
  },
  {
    name: "Weightlifting Shoes",
    label: "کفش وزنه‌برداری",
  },
  {
    name: "Jump Rope",
    label: "طناب پرش",
  },
  {
    name: "BOSU Ball",
    label: "توپ بوسو",
  },
  {
    name: "Stability Ball",
    label: "توپ تعادلی",
  },
  {
    name: "Balance Board",
    label: "تخته تعادلی",
  },
  {
    name: "Massage Gun",
    label: "ماساژور تفنگی",
  },
  {
    name: "Slam Ball",
    label: "مدیسین بال اسلم",
  },
  {
    name: "Calf Block",
    label: "بلوک ساق پا",
  },
  {
    name: "Kickback Machine",
    label: "دستگاه کیک بک",
  },
  {
    name: "Spider Curl Bench",
    label: "نیمکت کرل اسپایدر",
  },
  {
    name: "Yoke",
    label: "یوک",
  },
  {
    name: "Farmer's Walk Handles",
    label: "دسته‌های فارمِرز واک",
  },
  {
    name: "T-Bar Row Machine",
    label: "دستگاه تی بار رو",
  },
  {
    name: "Standing Leg Curl Machine",
    label: "دستگاه کرل پا ایستاده",
  },
  {
    name: "Hammer Strength Machine",
    label: "دستگاه همر استرنت",
  },
  {
    name: "Free Motion Machine",
    label: "دستگاه فری موشن",
  },
  {
    name: "Sandbell",
    label: "ساندبل",
  },
  {
    name: "Abmat",
    label: "ابمت",
  },
  {
    name: "Kettlebell Rack",
    label: "رک کتل‌بل",
  },
  {
    name: "Dumbbell Rack",
    label: "رک دمبل",
  },
  {
    name: "Barbell Rack",
    label: "رک هالتر",
  },
  {
    name: "Adjustable Cable Pulley",
    label: "پولی کابل قابل تنظیم",
  },
  {
    name: "Vibrating Platform",
    label: "پلتفرم ویبره",
  },
  {
    name: "ViPR",
    label: "وای‌پی‌آر",
  },
  {
    name: "Battle Rope Anchor",
    label: "قالب طناب نبرد",
  },
  {
    name: "Suspension Anchor",
    label: "لنگر تعلیق",
  },
  {
    name: "Chin-Up Assist Band",
    label: "کش کمکی بارفیکس",
  },
  {
    name: "Weighted Chains",
    label: "زنجیر وزنه‌دار",
  },
  {
    name: "Sledgehammer",
    label: "چکش ورزشی",
  },
  {
    name: "Tractor Tire",
    label: "لاستیک تراکتور",
  },
  {
    name: "Climbing Rope",
    label: "طناب صعود",
  },
  {
    name: "Weightlifting Platform",
    label: "سکو وزنه‌برداری",
  },
  {
    name: "Change Plates",
    label: "صفحه تغییر وزن",
  },
  {
    name: "Barbell Collars",
    label: "کالر هالتر",
  },
  {
    name: "J-Hooks",
    label: "جی هوک",
  },
  {
    name: "Spotter Arms",
    label: "بازوی اسپات",
  },
  {
    name: "Band Pegs",
    label: "پِگ بند",
  },
  {
    name: "Floor Protector Mats",
    label: "مت محافظ کف",
  },

  {
    name: "Vertical Leg Press",
    label: "پرس پا عمودی",
  },
  {
    name: "45-Degree Leg Press",
    label: "پرس پا ۴۵ درجه",
  },
  {
    name: "Plate-Loaded Hack Squat",
    label: "هک اسکوات صفحه‌ای",
  },
  {
    name: "Reverse Hyperextension Machine",
    label: "دستگاه پشت کمر معکوس",
  },
  {
    name: "Sissy Squat Machine",
    label: "دستگاه اسکوات سیزی",
  },
  {
    name: "Glute Isolation Machine",
    label: "دستگاه جداسازی عضله گلوته",
  },
  {
    name: "Seated Hamstring Curl Machine",
    label: "دستگاه کرل همسترینگ نشسته",
  },
  {
    name: "Preacher Curl Machine",
    label: "دستگاه کرل پیش‌آموز",
  },
  {
    name: "Standing Smith Calf Raise",
    label: "پرس ساق هالتر اسمیت ایستاده",
  },
  {
    name: "Hip Abductor/Adductor Plate-Loaded",
    label: "دستگاه دورکن/نزدیک‌کننده لگن صفحه‌ای",
  },
  {
    name: "Lever Row Machine",
    label: "دستگاه رو لِور",
  },
  {
    name: "Plate-Loaded Chest Press",
    label: "پرس سینه صفحه‌ای",
  },
  {
    name: "Rotary Torso Machine",
    label: "دستگاه چرخش تنه",
  },
  {
    name: "Back Extension Machine",
    label: "دستگاه پشت کمر",
  },
  {
    name: "Abduction/Adduction Cable Machine",
    label: "دستگاه کابل دورکن/نزدیک‌کننده",
  },
  {
    name: "Incline/Decline Bench Combo",
    label: "ترکیبی نیمکت شیب‌دار/شیب معکوس",
  },
  {
    name: "Adjustable Preacher Bench",
    label: "نیمکت پریچر قابل تنظیم",
  },
  {
    name: "Multi-Grip Pull-Up Bar",
    label: "میله بارفیکس چند دسته",
  },
  {
    name: "Landmine Foot Plate",
    label: "صفحه پا لندماین",
  },
  {
    name: "Chest Expander",
    label: "گسترش‌دهنده سینه",
  },
  {
    name: "Forearm Roller",
    label: "رولر ساعد",
  },
  {
    name: "Wrist Roller",
    label: "رولر مچ",
  },
  {
    name: "Neck Harness",
    label: "هارنس گردن",
  },
  {
    name: "Grip Strengthener",
    label: "مچ‌بند تقویت گرفتن",
  },
  {
    name: "Fat Gripz",
    label: "فت گریپس",
  },
  {
    name: "Reverse Grip Bar",
    label: "میله گریپ معکوس",
  },
  {
    name: "Monolift Attachment",
    label: "اتصال مونو لیفت",
  },
  {
    name: "Throwing Slam Ball",
    label: "توپ اسلم پرتابی",
  },
  {
    name: "Bulgarian Bag",
    label: "کیسه بلغاری",
  },
  {
    name: "Belt Squat Attachment",
    label: "اتصال اسکوات با کمربند",
  },
  {
    name: "Powerlifting Platform",
    label: "سکو پاورلیفتینگ",
  },
  {
    name: "Adjustable Plyo Box",
    label: "جعبه پلیومتریک قابل تنظیم",
  },
  {
    name: "Climbing Rope Anchor",
    label: "لنگر طناب صعود",
  },
  {
    name: "Inversion Table",
    label: "میز وارونگی",
  },
  {
    name: "Smith Machine Monolift",
    label: "اسمیت ماشین مونو لیفت",
  },
  {
    name: "Smith Machine Belt Squat",
    label: "اسمیت ماشین اسکوات کمربندی",
  },
  {
    name: "Plate-Loaded Leg Curl",
    label: "کرل پا صفحه‌ای",
  },
  {
    name: "Iso-Lateral Chest Press",
    label: "پرس سینه ایزو-لاترال",
  },
  {
    name: "Iso-Lateral Shoulder Press",
    label: "پرس شانه ایزو-لاترال",
  },
  {
    name: "Leverage Deadlift Machine",
    label: "دستگاه ددلیفت اهرمی",
  },
  {
    name: "Leverage Shoulder Press",
    label: "پرس شانه اهرمی",
  },
  {
    name: "Leverage Squat Machine",
    label: "دستگاه اسکوات اهرمی",
  },
  {
    name: "Seated Calf Press on Leg Press",
    label: "پرس ساق نشسته روی پرس پا",
  },
  {
    name: "Calf Raise Block (Plate-Loaded)",
    label: "بلوک ساق پا صفحه‌ای",
  },
  {
    name: "Band Peghooks for Power Rack",
    label: "قلاب بند برای قفسه قدرتی",
  },

  {
    name: "Treadmill",
    label: "تردمیل",
  },
  {
    name: "Stationary Bike",
    label: "دوچرخه ثابت",
  },
  {
    name: "Recumbent Bike",
    label: "دوچرخه خوابیده",
  },
  {
    name: "Elliptical Trainer",
    label: "الیپتیکال",
  },
  {
    name: "Rowing Machine",
    label: "دستگاه روئینگ",
  },
  {
    name: "Stair Climber",
    label: "دستگاه پلکان",
  },
  {
    name: "Ski Erg",
    label: "دستگاه اسکی ارگ",
  },
  {
    name: "Assault Bike",
    label: "بایک ایر",
  },
  {
    name: "Air Bike",
    label: "ایربایک",
  },
  {
    name: "Spin Bike",
    label: "دوچرخه اسپینینگ",
  },
  {
    name: "Upright Stationary Bike",
    label: "دوچرخه ثابت ایستاده",
  },
  {
    name: "Climbing Rope Wall",
    label: "دیوار طناب‌نوردی",
  },
  {
    name: "Battle Rope Stand",
    label: "پایه طناب نبرد",
  },
  {
    name: "Plyometric Step",
    label: "استپ پلیومتریک",
  },
  {
    name: "Agility Ladder",
    label: "نردبان چابکی",
  },
  {
    name: "Cones",
    label: "مخروط",
  },
  {
    name: "Slam Ball Stand",
    label: "پایه توپ اسلم",
  },
  {
    name: "Heavy Bag Stand",
    label: "پایه کیسه بوکس",
  },
  {
    name: "Speed Bag Platform",
    label: "پلتفرم اسپید بگ",
  },
  {
    name: "Double End Bag",
    label: "کیسه دو سر",
  },
  {
    name: "Boxing Gloves",
    label: "دستکش بوکس",
  },
  {
    name: "Punch Mitts",
    label: "دستکش پد",
  },
  {
    name: "Punching Bag",
    label: "کیسه بوکس",
  },
  {
    name: "Muay Thai Bag",
    label: "کیسه موی تای",
  },
  {
    name: "Reflex Bag",
    label: "کیسه رفلکس",
  },
  {
    name: "Headgear",
    label: "کلاه محافظ",
  },
  {
    name: "Mouthguard",
    label: "محافظ دهان",
  },
  {
    name: "Hand Wraps",
    label: "باند دست",
  },
  {
    name: "Jump Box",
    label: "جعبه پرش",
  },
  {
    name: "Yoga Mat",
    label: "مت یوگا",
  },
  {
    name: "Pilates Reformer",
    label: "ریفورمر پیلاتس",
  },
  {
    name: "Pilates Cadillac",
    label: "کادیلاک پیلاتس",
  },
  {
    name: "Foam Blocks",
    label: "بلوک فومی",
  },
  {
    name: "Yoga Wheel",
    label: "چرخ یوگا",
  },
  {
    name: "Yoga Strap",
    label: "بند یوگا",
  },
  {
    name: "Resistance Tube",
    label: "لوله مقاومتی",
  },
  {
    name: "Suspension Trainer Anchor",
    label: "لنگر تعلیق",
  },
  {
    name: "Push Sled Harness",
    label: "هارنس سِلِد",
  },
  {
    name: "Landmine Base",
    label: "پایه لندماین",
  },
  {
    name: "Olympic Lifting Platform",
    label: "سکو المپیک",
  },
  {
    name: "Deadlift Jack",
    label: "جک ددلیفت",
  },
  {
    name: "Bumper Plate Rack",
    label: "رک صفحات بامپر",
  },
  {
    name: "Kettlebell Dumbbell Combo Rack",
    label: "رک کتل‌بل و دمبل",
  },
  {
    name: "Medicine Ball Rack",
    label: "رک مدیسین بال",
  },
  {
    name: "Wall Ball Target",
    label: "هدف دیواری",
  },
  {
    name: "Wall Ball",
    label: "مدیسین بال دیواری",
  },
  {
    name: "Parallette Bars",
    label: "پارالت بار",
  },
  {
    name: "Plyometric Hurdles",
    label: "موانع پلیومتریک",
  },
  {
    name: "Speed Parachute",
    label: "چتر سرعت",
  },
  {
    name: "Weighted Vest Rack",
    label: "رک جلیقه وزنه‌دار",
  },
  {
    name: "Ab Roller",
    label: "چرخ تمرین شکم",
  },
  {
    name: "GHD Spare Pad",
    label: "پد اضافی GHD",
  },
  {
    name: "Adjustable Dumbbell",
    label: "دمبل قابل تنظیم",
  },
  {
    name: "Dipping Belt Handles",
    label: "دسته کمربند دیپ",
  },
  {
    name: "Grip Straps",
    label: "بند مچ دست",
  },
  {
    name: "Mobility Stick",
    label: "چوب تحرک",
  },
  {
    name: "Foam Plyo Mat",
    label: "مت پلیومتریک فومی",
  },
  {
    name: "Exercise Ball",
    label: "توپ ورزشی",
  },
  {
    name: "Balance Cushion",
    label: "بالشتک تعادلی",
  },
  {
    name: "Massage Table",
    label: "تخت ماساژ",
  },
  {
    name: "Inversion Chair",
    label: "صندلی وارونه‌سازی",
  },
  {
    name: "Rebounder Trampoline",
    label: "ترامپولین کوچک",
  },
  {
    name: "Soft Plyo Box",
    label: "جعبه پلیومتریک نرم",
  },
  {
    name: "Wall Mirror",
    label: "آینه دیواری",
  },
  {
    name: "Gym Clock",
    label: "ساعت باشگاهی",
  },
];
