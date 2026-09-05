// File location: app/data/blogs.ts

export type BlogCategory =
  | "100 Hour TTC"
  | "200 Hour TTC"
  | "300 Hour TTC"
  | "500 Hour TTC"
  | "Kundalini"
  | "Prenatal"
  | "Meditation"
  | "Ayurveda";

export const BLOG_CATEGORIES: BlogCategory[] = [
  "100 Hour TTC",
  "200 Hour TTC",
  "300 Hour TTC",
  "500 Hour TTC",
  "Kundalini",
  "Prenatal",
  "Meditation",
  "Ayurveda",
];

export type BlogSection = {
  heading: string;
  paragraphs: string[];
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: BlogSection[];
  coverImage: string;
  category: BlogCategory;
  author: string;
  authorImage: string;
  authorBio: string;
  date: string; // ISO date
  readTime: number; // minutes
  tags: string[];
};

export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    slug: "is-100-hour-ttc-enough-to-teach",
    title: "Is a 100-Hour YTT Enough to Start Teaching?",
    excerpt:
      "A honest look at what a 100-hour teacher training can and can't prepare you for, and who it's actually built for.",
    coverImage:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop",
    category: "100 Hour TTC",
    author: "Anjali Rawat",
    authorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    authorBio: "Senior Hatha instructor and lead faculty for AYM's foundation-level trainings.",
    date: "2026-08-12",
    readTime: 6,
    tags: ["teacher training", "beginners", "career"],
    content: [
      {
        heading: "What a 100-hour training actually promises",
        paragraphs: [
          "A 100-hour training is often the first real commitment a dedicated practitioner makes toward teaching. It isn't a shortcut to a 200-hour certification — it's a different, narrower promise: enough grounding in alignment, sequencing and voice to lead a beginner-friendly class with confidence.",
        ],
      },
      {
        heading: "What it does well",
        paragraphs: [
          "What it does well is compress the fundamentals. In two to three weeks of focused study, you'll cover foundational asana, basic anatomy, and the mechanics of cueing a room. For studio owners looking for someone to lead gentle community classes, that's often exactly the skill set needed.",
        ],
      },
      {
        heading: "Where it stops short",
        paragraphs: [
          "What it doesn't do is replace depth. Philosophy, subtle anatomy, and the judgment that comes from adjusting hundreds of different bodies over time — those come later, usually through a 200-hour program or years of mentored practice.",
        ],
      },
      {
        heading: "Who it's actually right for",
        paragraphs: [
          "If your goal is to deepen your own practice and dip a toe into teaching low-stakes classes, 100 hours is a genuinely good starting point. If your goal is a full-time teaching career, treat it as chapter one, not the whole book.",
        ],
      },
    ],
  },
  {
    id: "b2",
    slug: "200-hour-ytt-what-to-expect-week-by-week",
    title: "200-Hour YTT: What to Expect, Week by Week",
    excerpt:
      "From orientation jitters to your first taught class — a realistic week-by-week breakdown of a 200-hour teacher training.",
    coverImage:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",
    category: "200 Hour TTC",
    author: "Rishikesh Yogacharya",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    authorBio: "Founding teacher at AYM Yoga School, based in Rishikesh since 2011.",
    date: "2026-07-28",
    readTime: 9,
    tags: ["teacher training", "curriculum", "yoga alliance"],
    content: [
      {
        heading: "Week one: orientation and humility",
        paragraphs: [
          "Week one is orientation and humility. Most students arrive assuming they know their bodies well, then spend the first few days relearning basic alignment from the ground up — literally, starting with how weight moves through the feet in Tadasana.",
        ],
      },
      {
        heading: "Weeks two and three: asana and anatomy",
        paragraphs: [
          "Weeks two and three move into the bulk of asana study: standing poses, seated poses, backbends, and inversions, each paired with anatomy lectures that explain *why* a cue works, not just what the cue is.",
        ],
      },
      {
        heading: "Philosophy runs throughout",
        paragraphs: [
          "Philosophy threads through the whole month, usually in morning or evening sessions — the eight limbs, a close reading of selected Yoga Sutras, and enough history to place the physical practice in context.",
        ],
      },
      {
        heading: "Week four: practice-teaching",
        paragraphs: [
          "By week four, the focus shifts to you: practice-teaching in small groups, receiving blunt feedback, and running full classes for your cohort. It's the most uncomfortable week and, for most graduates, the most useful one.",
        ],
      },
    ],
  },
  {
    id: "b3",
    slug: "300-hour-training-who-its-really-for",
    title: "300-Hour Advanced Training: Who It's Really For",
    excerpt:
      "300-hour programs aren't just 'more of the 200-hour.' Here's what actually changes at the advanced level.",
    coverImage:
      "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=1200&auto=format&fit=crop",
    category: "300 Hour TTC",
    author: "Himalayan Siddha",
    authorImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop",
    authorBio: "Advanced-program lead, specialising in adjustments and Himalayan meditation traditions.",
    date: "2026-06-30",
    readTime: 7,
    tags: ["advanced training", "adjustments", "curriculum design"],
    content: [
      {
        heading: "It assumes you can already teach",
        paragraphs: [
          "A 300-hour training assumes you can already teach. The question it answers isn't 'how do I run a class' but 'how do I run a *good* class, consistently, for students who aren't beginners anymore.'",
        ],
      },
      {
        heading: "The biggest shift: adjustments",
        paragraphs: [
          "The biggest shift is in adjustments — moving from verbal cues to confident, safe hands-on assists, and knowing when not to touch a student at all.",
        ],
      },
      {
        heading: "Curriculum design, not just class planning",
        paragraphs: [
          "You'll also spend real time on curriculum design: building a six-week arc instead of a single 60-minute class, with intentional peak poses and a narrative that carries students from week one to week six.",
        ],
      },
      {
        heading: "Who should wait",
        paragraphs: [
          "It's not for everyone straight out of a 200-hour certificate. Most teachers benefit from a year or two of actual teaching experience first — the training goes further when you already have real questions to bring to it.",
        ],
      },
    ],
  },
  {
    id: "b4",
    slug: "500-hour-certification-worth-it",
    title: "Is a 500-Hour Certification Worth the Investment?",
    excerpt:
      "500-hour status opens doors in some studios and means nothing in others. Here's how to decide if it's worth your time and money.",
    coverImage:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop",
    category: "500 Hour TTC",
    author: "Rishikesh Yogacharya",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    authorBio: "Founding teacher at AYM Yoga School, based in Rishikesh since 2011.",
    date: "2026-05-18",
    readTime: 8,
    tags: ["500 hour", "career", "certification"],
    content: [
      {
        heading: "What actually changes at 500 hours",
        paragraphs: [
          "A combined 200+300 hour, or a dedicated 500-hour program, mostly changes two things: how studios list you, and how much you personally trust your own teaching.",
        ],
      },
      {
        heading: "The hiring effect: real but modest",
        paragraphs: [
          "For studio hiring, the effect is real but modest — it's a tiebreaker, not a golden ticket. Most directors care more about your actual teaching sample than the certificate hours.",
        ],
      },
      {
        heading: "The personal effect: usually larger",
        paragraphs: [
          "For your own development, the effect tends to be larger. Most 500-hour graduates describe a shift from 'teaching poses' to 'teaching people' — reading a room, adapting a sequence on the fly, and holding space for a wider range of bodies and experience levels.",
        ],
      },
      {
        heading: "How to decide",
        paragraphs: [
          "If you're chasing the credential purely for job listings, weigh the cost against what a strong teaching portfolio and word-of-mouth could get you instead. If you're chasing the depth, it's usually worth it.",
        ],
      },
    ],
  },
  {
    id: "b5",
    slug: "kundalini-awakening-myths-and-reality",
    title: "Kundalini Awakening: Separating the Myths from the Reality",
    excerpt:
      "Kundalini practice attracts more myth than almost any other yogic tradition. A grounded look at what's actually going on.",
    coverImage:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop&sat=-20",
    category: "Kundalini",
    author: "Suresh Bhatt",
    authorImage: "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=200&auto=format&fit=crop",
    authorBio: "Meditation teacher focused on breathwork and kundalini traditions.",
    date: "2026-08-02",
    readTime: 10,
    tags: ["kundalini", "philosophy", "practice"],
    content: [
      {
        heading: "The dramatic version you've probably heard",
        paragraphs: [
          "Kundalini is often described online in dramatic, almost supernatural terms — an energy 'exploding' up the spine, uncontrollable shaking, visions. Some of that has roots in real accounts, but a lot of it is exaggeration that scares off curious beginners for no good reason.",
        ],
      },
      {
        heading: "The traditional framing",
        paragraphs: [
          "In traditional framing, kundalini practice is a slow, structured process: breath, mantra, and specific kriyas designed to build steadiness before intensity. It's less 'lightning strike' and more 'training for a marathon.'",
        ],
      },
      {
        heading: "What practitioners actually report",
        paragraphs: [
          "Physically, most practitioners report subtler effects than the mythology suggests — increased sensitivity to breath and posture, emotional release during certain kriyas, and better sleep, rather than dramatic energetic events.",
        ],
      },
      {
        heading: "Practical advice if you're drawn to it",
        paragraphs: [
          "If you're drawn to kundalini yoga, the practical advice is the same as with any intense practice: start with a qualified teacher, build gradually, and treat any strong or destabilizing experience as a signal to slow down, not push through.",
        ],
      },
    ],
  },
  {
    id: "b6",
    slug: "prenatal-yoga-first-trimester-guide",
    title: "Prenatal Yoga in the First Trimester: A Gentle Guide",
    excerpt:
      "The first trimester calls for a completely different approach than the second or third. Here's what changes and why.",
    coverImage:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop&sat=-30",
    category: "Prenatal",
    author: "Kavita Sharma",
    authorImage: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?q=80&w=200&auto=format&fit=crop",
    authorBio: "Prenatal and postnatal specialist, trained in trauma-informed teaching practices.",
    date: "2026-07-10",
    readTime: 6,
    tags: ["prenatal", "first trimester", "safety"],
    content: [
      {
        heading: "The least visible, most important stage",
        paragraphs: [
          "The first trimester is often the least visibly 'pregnant' stage, which is exactly why it needs the most caution. Fatigue and nausea are common, and the instinct to push through a normal practice can do more harm than good.",
        ],
      },
      {
        heading: "What to avoid early on",
        paragraphs: [
          "Deep twists, strong core work, and anything that compresses the abdomen are typically avoided from the earliest weeks, well before a bump makes the pregnancy obvious to a teacher.",
        ],
      },
      {
        heading: "What to focus on instead",
        paragraphs: [
          "Instead, the focus shifts toward breath awareness, gentle hip openers, and rest — poses like supported Child's Pose and reclined bound angle become staples, not fillers.",
        ],
      },
      {
        heading: "A note for teachers",
        paragraphs: [
          "If you're a teacher and a student mentions they're newly pregnant mid-class, the safest move is a quiet, judgment-free conversation after class about modifications going forward, not a public correction in the moment.",
        ],
      },
    ],
  },
  {
    id: "b7",
    slug: "building-a-daily-meditation-habit-that-sticks",
    title: "Building a Daily Meditation Habit That Actually Sticks",
    excerpt:
      "Most meditation habits die in week two. Here's what the ones that survive actually have in common.",
    coverImage:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop",
    category: "Meditation",
    author: "Ananya Reddy",
    authorImage: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=200&auto=format&fit=crop",
    authorBio: "Mindfulness teacher and author of AYM's daily meditation program.",
    date: "2026-06-05",
    readTime: 5,
    tags: ["meditation", "habits", "daily practice"],
    content: [
      {
        heading: "Start absurdly small",
        paragraphs: [
          "The habits that survive rarely start with an ambitious 30-minute daily goal. They start absurdly small — two minutes, sometimes less — because the goal in month one is consistency, not depth.",
        ],
      },
      {
        heading: "Anchor it to something you already do",
        paragraphs: [
          "Anchoring the practice to an existing habit (right after brushing your teeth, right before your morning coffee) does more for consistency than any app reminder.",
        ],
      },
      {
        heading: "Expect the day-nine wall",
        paragraphs: [
          "Expect resistance around day nine or ten. That's not a sign the practice isn't working — it's usually the point where novelty wears off and the habit either gets reinforced or abandoned.",
        ],
      },
      {
        heading: "Lower the bar for 'success'",
        paragraphs: [
          "The practices that last also tend to have a low bar for 'success.' Two minutes of restless, distracted sitting still counts. The goal is showing up, not achieving stillness on demand.",
        ],
      },
    ],
  },
  {
    id: "b8",
    slug: "ayurveda-for-beginners-finding-your-dosha",
    title: "Ayurveda for Beginners: Finding Your Dosha",
    excerpt:
      "Vata, Pitta, Kapha — the three doshas explained simply, and how to start noticing your own patterns.",
    coverImage:
      "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=1200&auto=format&fit=crop&sat=-10",
    category: "Ayurveda",
    author: "Dr. Meera Kulkarni",
    authorImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&auto=format&fit=crop",
    authorBio: "Ayurvedic physician and faculty lead for AYM's Ayurveda foundations course.",
    date: "2026-08-20",
    readTime: 7,
    tags: ["ayurveda", "dosha", "beginners"],
    content: [
      {
        heading: "The three doshas, briefly",
        paragraphs: [
          "Ayurveda organizes the body's tendencies into three doshas — Vata, Pitta, and Kapha — each a combination of the five elements, and each showing up differently in digestion, energy, sleep, and even mood.",
        ],
      },
      {
        heading: "What each dosha tends to look like",
        paragraphs: [
          "Vata types tend to run light, quick, and variable — think fast talkers, irregular appetites, and a mind that jumps between ideas. Pitta types run hot and driven, with strong digestion and a sharp, sometimes fiery temperament. Kapha types run steady and grounded, with slower metabolism and a calm, sometimes sluggish disposition.",
        ],
      },
      {
        heading: "Most people are a blend",
        paragraphs: [
          "Most people are a blend of two doshas, with one usually dominant. The goal of noticing your dosha isn't to put yourself in a box — it's to notice which lifestyle choices tend to bring you back to balance versus push you further out of it.",
        ],
      },
      {
        heading: "A simple week-long exercise",
        paragraphs: [
          "A simple starting exercise: for one week, just observe your energy, appetite and mood at the same time each day, without trying to change anything. Patterns tend to reveal themselves faster than most people expect.",
        ],
      },
    ],
  },
  {
    id: "b9",
    slug: "sequencing-a-vinyasa-class-that-flows",
    title: "Sequencing a Vinyasa Class That Actually Flows",
    excerpt:
      "Good vinyasa sequencing isn't about clever transitions — it's about a peak pose the whole class was quietly building toward.",
    coverImage:
      "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?q=80&w=1200&auto=format&fit=crop",
    category: "200 Hour TTC",
    author: "Rohan Bisht",
    authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    authorBio: "Vinyasa instructor specialising in strength-focused, breath-led sequencing.",
    date: "2026-04-22",
    readTime: 6,
    tags: ["vinyasa", "sequencing", "teaching"],
    content: [
      {
        heading: "Design backward from the peak pose",
        paragraphs: [
          "The most common sequencing mistake new teachers make is choosing poses first and connecting them second. Strong sequences work backward: pick the peak pose, then design everything before it to prepare the body for that specific shape.",
        ],
      },
      {
        heading: "Warm-ups should target the right areas",
        paragraphs: [
          "Warm-ups should target the joints and muscles the peak pose will actually load — a backbend-focused class needs different opening work than a hip-opener-focused one, even if both start with sun salutations.",
        ],
      },
      {
        heading: "Give students a rhythm to anchor to",
        paragraphs: [
          "Transitions matter more than most beginners assume. A sequence that keeps returning to a 'home base' pose (like Downward Dog or a low lunge) gives students a rhythm to anchor to, which makes the whole class feel more coherent.",
        ],
      },
      {
        heading: "Don't skip the cool-down",
        paragraphs: [
          "Save real difficulty for the middle third of class, not the end. Cooling down properly — with counter-poses and a genuine Savasana — is part of the sequence, not an afterthought once the 'real' work is done.",
        ],
      },
    ],
  },
  {
    id: "b10",
    slug: "postnatal-recovery-what-no-one-tells-you",
    title: "Postnatal Recovery: What No One Tells You",
    excerpt:
      "The six-week clearance to 'return to exercise' rarely matches how the body actually feels. Here's a more honest timeline.",
    coverImage:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop&sat=-20",
    category: "Prenatal",
    author: "Kavita Sharma",
    authorImage: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?q=80&w=200&auto=format&fit=crop",
    authorBio: "Prenatal and postnatal specialist, trained in trauma-informed teaching practices.",
    date: "2026-03-14",
    readTime: 8,
    tags: ["postnatal", "recovery", "safety"],
    content: [
      {
        heading: "Six weeks is a floor, not a finish line",
        paragraphs: [
          "The standard six-week medical clearance is a floor, not a finish line. It tells you it's generally safe to begin gentle movement again — it says very little about whether your core, pelvic floor, or nervous system are actually ready for a full practice.",
        ],
      },
      {
        heading: "Check for diastasis recti first",
        paragraphs: [
          "Diastasis recti (abdominal separation) is common and often goes unassessed. Core-loading poses — full boat pose, deep backbends, some plank variations — are usually reintroduced gradually, and only after that healing is checked.",
        ],
      },
      {
        heading: "Postnatal fatigue is different",
        paragraphs: [
          "Fatigue in the postnatal period is not the same as pre-pregnancy tiredness. Many new mothers find their usual pre-baby practice leaves them depleted rather than energized for weeks or months longer than expected — that's normal, not a sign of weakness.",
        ],
      },
      {
        heading: "The most useful guidance isn't a pose list",
        paragraphs: [
          "The most useful postnatal guidance isn't a fixed pose list — it's permission to move at the pace your specific recovery actually requires, even if that's much slower than the six-week number suggests.",
        ],
      },
    ],
  },
];

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((b) => b.slug === slug);
}

export function getRelatedBlogs(post: BlogPost, limit = 3): BlogPost[] {
  return blogPosts
    .filter((b) => b.id !== post.id && b.category === post.category)
    .slice(0, limit);
}

export function getRecentBlogs(excludeId?: string, limit = 5) {
  return blogPosts
    .filter((b) => b.id !== excludeId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

// Slug-safe id for a heading, used for in-page table-of-contents anchors.
export function headingId(heading: string) {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}